"""Kiểm tra Buổi 2 bằng trình duyệt; không được tải bởi trang web.

Phụ thuộc công cụ: playwright, html5lib; Chromium đã cài trên máy.
Các thử nghiệm sửa CSS/alt chỉ ở DOM của trình duyệt, không sửa tệp dự án.
"""
import argparse
import asyncio
import hashlib
import json
import shutil
import re
from datetime import datetime, timezone
from pathlib import Path

import html5lib
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]


def contrast_ratio(foreground, background):
    def luminance(color):
        values=[int(x)/255 for x in re.findall(r'\d+',color)[:3]]
        values=[v/12.92 if v <= .04045 else ((v+.055)/1.055)**2.4 for v in values]
        return sum(a*b for a,b in zip(values,[.2126,.7152,.0722]))
    low,high=sorted([luminance(foreground),luminance(background)])
    return round((high+.05)/(low+.05),2)


async def run(args):
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    parser = html5lib.HTMLParser(strict=False)
    parser.parse((ROOT / 'index.html').read_text())
    assert not parser.errors, parser.errors
    data = json.loads((ROOT / 'products.json').read_text())
    result = {
        'date_utc': datetime.now(timezone.utc).isoformat(),
        'performed_by': 'Trợ lý trong phiên hỗ trợ; không phải xác nhận sinh viên tự kiểm tra',
        'html5lib_version': html5lib.__version__,
        'html5_parser_errors': [],
        'viewports': [],
    }
    errors, http_errors = [], []
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path=args.browser, headless=True,
            args=['--no-sandbox', '--disable-dev-shm-usage'])
        result['browser'] = browser.version
        page = await browser.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('response', lambda r: http_errors.append({'url': r.url, 'status': r.status}) if r.status >= 400 else None)

        async def load(width=1366):
            await page.set_viewport_size({'width': width, 'height': 1000})
            r = await page.goto(args.base_url.rstrip('/') + '/', wait_until='networkidle')
            assert r.status == 200
            return r

        for width in [1440, 1366, 1024, 768, 390, 375, 320]:
            await load(width)
            state = await page.evaluate('''() => {
              const grid=document.querySelector('.product-grid'), card=document.querySelector('.product-card'),
                content=card.querySelector('.product-content'), desc=card.querySelector('.product-description'),
                price=card.querySelector('.price-block');
              const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);
              const levels=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(x=>Number(x.tagName[1]));
              return {
                viewport:innerWidth, documentWidth:document.documentElement.scrollWidth,
                gridTag:grid.tagName, listItems:grid.querySelectorAll(':scope > li').length,
                gridColumns:getComputedStyle(grid).gridTemplateColumns,
                headings:levels, headingJump:levels.some((v,i)=>i>0&&v>levels[i-1]+1),
                duplicateIds:ids.filter((v,i)=>ids.indexOf(v)!==i), h1Count:document.querySelectorAll('h1').length,
                cssHref:document.querySelector('link[rel=stylesheet]').getAttribute('href'),
                cssLoaded:[...document.styleSheets].some(s=>s.href&&s.href.endsWith('/css/style.css')&&s.cssRules.length>0),
                bodyFont:getComputedStyle(document.body).fontFamily,
                imagesLoaded:[...grid.querySelectorAll('img')].every(x=>x.complete&&x.naturalWidth===640&&x.naturalHeight===480),
                imagesHaveAlt:[...grid.querySelectorAll('img')].every(x=>x.alt.trim()),
                imageRatios:[...grid.querySelectorAll('img')].map(x=>x.clientWidth/x.clientHeight),
                brokenFragments:[...document.querySelectorAll('a[href^="#"]')].filter(x=>!document.getElementById(x.hash.slice(1))).map(x=>x.hash),
                applicationScripts:document.scripts.length,
                cardHeight:card.getBoundingClientRect().height,
                contentPadding:getComputedStyle(content).padding,
                descriptionMinHeight:getComputedStyle(desc).minHeight,
                descriptionHeight:desc.getBoundingClientRect().height,
                priceMinHeight:getComputedStyle(price).minHeight,
                gridGap:getComputedStyle(grid).gap,
                listDefaultPadding:getComputedStyle(grid).paddingLeft
              };
            }''')
            assert state['documentWidth'] <= width
            assert state['gridTag'] == 'UL' and state['listItems'] == 4
            assert state['h1Count'] == 1 and not state['headingJump'] and not state['duplicateIds']
            assert state['cssHref'] == 'css/style.css' and state['cssLoaded']
            assert state['imagesLoaded'] and state['imagesHaveAlt'] and not state['brokenFragments']
            assert state['applicationScripts'] == 0 and state['listDefaultPadding'] == '0px'
            assert all(abs(x-4/3)<.02 for x in state['imageRatios'])
            expected_columns = 4 if width > 1100 else (2 if width > 580 else 1)
            assert len(state['gridColumns'].split()) == expected_columns
            state['filters'] = []
            for group, expected in [('input', 2), ('audio', 1), ('accessory', 1)]:
                await page.locator(f'label:has(#filter-{group})').click()
                categories = await page.locator('.product-item:visible').evaluate_all('xs=>xs.map(x=>x.dataset.category)')
                count = await page.locator('.product-card:visible').count()
                label = (await page.locator('.catalog-count').inner_text()).strip()
                assert count == expected and len(categories) == expected and all(x == group for x in categories)
                assert label == f'{expected} sản phẩm'
                positions = await page.locator('.product-item:visible').evaluate_all('xs=>xs.map(x=>({x:x.offsetLeft,y:x.offsetTop}))')
                state['filters'].append({'group': group, 'actual': count, 'expected': expected, 'categories': categories, 'label': label, 'positions': positions})
            await page.locator('.reset-button').click()
            assert await page.locator('.product-card:visible').count() == 4
            assert await page.locator('.product-item:visible').count() == 4
            state['reset_restores_four'] = True
            result['viewports'].append(state)
            # Tránh con trỏ còn nằm trên nút sau khi ảnh tự cuộn vào vùng nhìn.
            await page.mouse.move(0, 0)
            await page.wait_for_timeout(220)
            if width in [1366, 768, 390, 320]:
                await page.locator('.catalog-section').screenshot(path=str(out/f'catalog-{width}.png'))
                await page.locator('.product-card').first.screenshot(path=str(out/f'card-{width}.png'))
            if width == 1366:
                await page.screenshot(path=str(out/'desktop-full.png'), full_page=True)
                await page.locator('.site-header').screenshot(path=str(out/'header.png'))

        await load()
        nav = await page.locator('.main-nav-list').evaluate('x=>({tag:x.tagName,items:x.children.length,display:getComputedStyle(x).display,gap:getComputedStyle(x).gap})')
        assert nav['tag'] == 'UL' and nav['items'] == 3 and nav['display'] == 'flex'
        result['nav'] = nav
        result['keyboard_details'] = []
        for i in range(4):
            summary = page.locator('.product-toggle').nth(i)
            await summary.focus()
            await page.keyboard.press('Enter')
            assert await page.locator('.product-details').nth(i).evaluate('x=>x.open')
            if i == 0:
                await page.locator('.product-card').first.screenshot(path=str(out/'details-open.png'))
            await page.keyboard.press('Enter')
            assert not await page.locator('.product-details').nth(i).evaluate('x=>x.open')
            result['keyboard_details'].append({'card': i+1, 'open_close': True})
        await page.locator('#filter-all').focus()
        await page.keyboard.press('ArrowRight')
        assert await page.locator('#filter-input').is_checked()
        assert await page.locator('.product-card:visible').count() == 2
        await page.locator('.reset-button').focus()
        await page.keyboard.press('Enter')
        assert await page.locator('#filter-all').is_checked()
        result['keyboard_filter_and_reset'] = True
        await page.locator('.main-nav a').first.click()
        assert page.url.endswith('#san-pham')
        result['navigation_anchor'] = True

        await load()
        await page.emulate_media(reduced_motion='no-preference')
        summary = page.locator('.product-toggle').first
        await page.mouse.move(0, 0)
        normal = await summary.evaluate('x=>({background:getComputedStyle(x).backgroundColor,color:getComputedStyle(x).color,transition:getComputedStyle(x).transitionDuration,height:x.getBoundingClientRect().height})')
        await page.locator('.product-card').first.screenshot(path=str(out/'state-normal.png'))
        await summary.hover()
        await page.wait_for_timeout(220)
        hover = await summary.evaluate('x=>({background:getComputedStyle(x).backgroundColor,color:getComputedStyle(x).color,height:x.getBoundingClientRect().height})')
        assert hover['background'] != normal['background'] and hover['height'] == normal['height']
        assert normal['transition'] != '0s'
        await page.locator('.product-card').first.screenshot(path=str(out/'state-hover.png'))
        await page.mouse.move(0, 0)
        await page.keyboard.press('Tab')
        await summary.focus()
        await page.wait_for_timeout(220)
        focus = await summary.evaluate('x=>({matches:x.matches(":focus-visible"),outline:getComputedStyle(x).outlineStyle,width:getComputedStyle(x).outlineWidth,offset:getComputedStyle(x).outlineOffset})')
        assert focus['matches'] and focus['outline'] == 'solid' and focus['width'] == '3px'
        await page.locator('.product-card').first.screenshot(path=str(out/'state-focus.png'))
        result['states'] = {'normal': normal, 'hover': hover, 'focus': focus, 'layout_unchanged_on_hover': True}
        await page.emulate_media(reduced_motion='reduce')
        reduced = await summary.evaluate('x=>getComputedStyle(x).transitionDuration')
        assert reduced == '0s'
        result['reduced_motion_transition'] = reduced
        await page.emulate_media(reduced_motion='no-preference')

        await load()
        result['box_model'] = await page.locator('.product-card').first.evaluate('x=>{const c=x.querySelector(".product-content"),s=getComputedStyle(c);return {cardWidth:x.getBoundingClientRect().width,cardBorder:getComputedStyle(x).borderLeftWidth,cardMargin:getComputedStyle(x).margin,contentOuterWidth:c.getBoundingClientRect().width,contentPadding:s.padding,contentBoxSizing:s.boxSizing,contentWidth:c.getBoundingClientRect().width-parseFloat(s.paddingLeft)-parseFloat(s.paddingRight),descriptionMargin:getComputedStyle(x.querySelector(".product-description")).marginBottom,gridGap:getComputedStyle(document.querySelector(".product-grid")).gap}}')

        # Thí nghiệm Flexbox tại cùng một nút: chỉ sửa style tạm trong trình duyệt.
        result['flex_experiments'] = []
        for mode in ['flex-start', 'center', 'space-between']:
            await summary.evaluate('(x,v)=>x.style.justifyContent=v', mode)
            state = await summary.evaluate('x=>{const s=getComputedStyle(x),a=x.children[0].getBoundingClientRect(),b=x.children[1].getBoundingClientRect();return {display:s.display,justifyContent:s.justifyContent,alignItems:s.alignItems,gap:s.gap,actualSpace:b.left-a.right}}')
            result['flex_experiments'].append(state)
            await page.locator('.product-card').first.screenshot(path=str(out/f'flex-{mode}.png'))
        assert result['flex_experiments'][-1]['actualSpace'] > result['flex_experiments'][0]['actualSpace']

        result['grid_experiments'] = []
        for cols in [2, 3]:
            await load()
            await page.locator('.product-grid').evaluate('(x,n)=>x.style.gridTemplateColumns=`repeat(${n}, minmax(0, 1fr))`', cols)
            state = await page.locator('.product-grid').evaluate('x=>({display:getComputedStyle(x).display,columns:getComputedStyle(x).gridTemplateColumns,gap:getComputedStyle(x).gap})')
            assert len(state['columns'].split()) == cols
            result['grid_experiments'].append({'requested_columns': cols, **state})
            await page.locator('.product-grid').screenshot(path=str(out/f'grid-{cols}-columns.png'))
        await page.locator('.product-grid').evaluate('x=>x.style.display="block"')
        result['without_grid'] = await page.locator('.product-grid').evaluate('x=>({display:getComputedStyle(x).display,items:[...x.children].slice(0,2).map(c=>({left:c.getBoundingClientRect().left,top:c.getBoundingClientRect().top,width:c.getBoundingClientRect().width}))})')
        assert result['without_grid']['items'][1]['top'] > result['without_grid']['items'][0]['top']

        # Năm tình huống sửa mã trực tiếp do đề nêu. Không lưu sửa thử vào nguồn.
        await load()
        content = page.locator('.product-content').first
        before = await content.evaluate('x=>({width:x.getBoundingClientRect().width,padding:getComputedStyle(x).padding})')
        await content.evaluate('x=>x.style.padding="28px"')
        after = await content.evaluate('x=>({width:x.getBoundingClientRect().width,padding:getComputedStyle(x).padding})')
        assert before['width'] == after['width'] and after['padding'] == '28px'
        await page.locator('.product-card').first.screenshot(path=str(out/'practice-padding-28.png'))
        await load()
        price = page.locator('.price-value').first
        await price.evaluate('x=>x.style.color="#b33126"')
        assert await price.evaluate('x=>getComputedStyle(x).color') == 'rgb(179, 49, 38)'
        await page.locator('.product-card').first.screenshot(path=str(out/'practice-price-red.png'))
        await load()
        menu = page.locator('.main-nav-list')
        await menu.evaluate('x=>x.style.columnGap="36px"')
        assert await menu.evaluate('x=>getComputedStyle(x).columnGap') == '36px'
        await page.locator('.site-header').screenshot(path=str(out/'practice-menu-gap-36.png'))
        image = page.locator('.product-card img').first
        changed_alt = 'Bàn phím cơ K75 mẫu, phím màu kem và xanh'
        await image.evaluate('(x,v)=>x.alt=v', changed_alt)
        assert await image.get_attribute('alt') == changed_alt
        result['live_edit_practice'] = {
            'scope': 'Thí nghiệm trên DOM/CSS của trình duyệt do trợ lý chạy; không phải kiểm tra trực tiếp của sinh viên',
            'padding': {'before': before, 'after': after, 'passed': True},
            'price_color': {'after': 'rgb(179, 49, 38)', 'passed': True},
            'grid_columns': {'trials': [2, 3], 'passed': True},
            'menu_gap': {'after': '36px', 'passed': True},
            'image_alt': {'after': changed_alt, 'passed': True},
        }

        await load()
        result['price_arithmetic'] = []
        for product, item in zip(data, await page.locator('.product-item').all()):
            assert await item.get_attribute('data-category') == product['category']
            title = (await item.locator('h3').inner_text()).strip()
            price_text = await item.locator('.price-value').inner_text()
            displayed_price = int(''.join(c for c in price_text if c.isdigit()))
            assert title == product['name'] and displayed_price == product['price']
            ratio = (product['original'] - product['price']) / product['original'] * 100
            assert abs(ratio - product['discount']) < .001
            result['price_arithmetic'].append({'name': title, 'price': displayed_price, 'discount': ratio})
        currency_colors=await page.locator('.currency').evaluate_all('xs=>xs.map(x=>({foreground:getComputedStyle(x).color,background:getComputedStyle(x.closest(".product-card")).backgroundColor}))')
        for colors in currency_colors:
            colors['ratio']=contrast_ratio(colors['foreground'],colors['background'])
            assert colors['ratio']>=4.5
        result['manual_contrast_review']={'scope':'Four currency glyphs; computed colors and WCAG luminance formula, not full WCAG certification','elements':currency_colors,'passed':True}
        if args.axe:
            await page.add_script_tag(path=args.axe)
            result['accessibility'] = await page.evaluate('''async () => {
              const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});
              return {version:axe.version,passed:r.passes.length,violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))};
            }''')
            assert not result['accessibility']['violations']
        else:
            result['accessibility'] = {'status': 'not_run', 'reason': '--axe not supplied'}
        result['page_errors'] = errors
        result['http_errors'] = http_errors
        assert not errors and not http_errors
        await browser.close()

    result['source_sha256'] = {name: hashlib.sha256((ROOT/name).read_bytes()).hexdigest() for name in ['index.html', 'css/style.css', 'style.css', 'products.json']}
    result['status'] = 'passed'
    (out/'ui-check.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
    print(json.dumps({'status': result['status'], 'viewports': len(result['viewports']), 'filter_cases': sum(len(v['filters']) for v in result['viewports']), 'html5_parse_errors': 0, 'accessibility': result['accessibility'], 'output': str(out)}, ensure_ascii=False))


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--base-url', default='http://127.0.0.1:8892')
    ap.add_argument('--out', default=str(ROOT/'evidence/buoi2/after'))
    ap.add_argument('--browser', default=shutil.which('chromium') or shutil.which('google-chrome'))
    ap.add_argument('--axe', help='Đường dẫn bản axe-core dùng kiểm tra; không được thêm vào website')
    asyncio.run(run(ap.parse_args()))
