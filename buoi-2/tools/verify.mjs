import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE_PATH||'C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const url=process.env.SITE_URL||'http://127.0.0.1:8878/buoi-2/';
const out=process.env.EVIDENCE_DIR?path.resolve(process.env.EVIDENCE_DIR):path.join(root,'evidence/after');await fs.mkdir(out,{recursive:true});
const report={date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),startedAt:new Date().toISOString(),url,checks:[],errors:[],viewports:[],experiments:[]};
const check=(name,pass,details)=>{report.checks.push({name,pass,details});if(!pass)report.errors.push(name);};
const browser=await chromium.launch({channel:'chrome',headless:true});report.browser=browser.version();
const context=await browser.newContext({locale:'vi-VN',deviceScaleFactor:1,reducedMotion:'no-preference'});
const page=await context.newPage();
page.on('pageerror',e=>report.errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)report.errors.push(`HTTP ${r.status()} ${r.url()}`);});
page.on('requestfailed',r=>report.errors.push('request failed '+r.url()));
const widths=[1366,1101,1100,1024,768,581,580,390,375,320];
for(const width of widths){
  await page.setViewportSize({width,height:1000});await page.goto(url,{waitUntil:'networkidle'});
  const audit=await page.evaluate(()=>({
    overflow:document.documentElement.scrollWidth>innerWidth,
    columns:getComputedStyle(document.querySelector('.product-grid')).gridTemplateColumns.split(' ').length,
    imageCount:document.querySelectorAll('.product-card img').length,
    imagesLoaded:[...document.querySelectorAll('.product-card img')].every(i=>i.complete&&i.naturalWidth>0),
    badFragments:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href')),
    listChildren:[...document.querySelector('.product-grid').children].map(x=>x.tagName),
    gap:getComputedStyle(document.querySelector('.product-grid')).gap
  }));
  check(`layout ${width}`,!audit.overflow&&audit.columns===(width>1100?4:width>580?2:1),audit);
  check(`images and fragments ${width}`,audit.imageCount===4&&audit.imagesLoaded&&audit.badFragments.length===0);
  for(const [id,category,count] of [['filter-all',null,4],['filter-input','input',2],['filter-audio','audio',1],['filter-accessory','accessory',1]]){
    await page.locator(`label:has(#${id})`).click();
    const state=await page.locator('.product-item:visible').evaluateAll(es=>es.map(e=>e.dataset.category));
    const cards=await page.locator('.product-card:visible').count();
    const label=(await page.locator('.catalog-count').innerText()).trim();
    check(`filter ${id} ${width}`,state.length===count&&cards===count&&(!category||state.every(x=>x===category))&&label===`${count} sản phẩm`,{items:state,cards,label});
    if(width===1366&&id==='filter-audio'){
      const first=await page.locator('.product-item:visible').first().boundingBox();
      const grid=await page.locator('.product-grid').boundingBox();
      check('filtered card starts in first grid cell',Math.abs(first.x-grid.x)<1,{firstX:first.x,gridX:grid.x});
      await page.locator('#san-pham').screenshot({path:path.join(out,'filter-audio.png')});
    }
  }
  await page.getByRole('button',{name:'Đặt lại bộ lọc'}).click();
  check(`reset ${width}`,await page.locator('#filter-all').isChecked()&&(await page.locator('.product-item:visible').count())===4);
  report.viewports.push({width,...audit});
  if([1366,768,390,320].includes(width)){
    await page.screenshot({path:path.join(out,`page-${width}.png`),fullPage:true});
    if(width===1366)await page.locator('.product-grid').screenshot({path:path.join(out,'products-1366.png')});
    if(width===390)await page.locator('.product-card').first().screenshot({path:path.join(out,'card-390.png')});
  }
}
await page.setViewportSize({width:1366,height:1000});await page.goto(url,{waitUntil:'networkidle'});
const semantics=await page.evaluate(()=>({lang:document.documentElement.lang,h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,header:!!document.querySelector('header'),nav:!!document.querySelector('nav'),footer:!!document.querySelector('footer'),sections:[...document.querySelectorAll('section')].every(e=>!!e.querySelector('h2,h1')),list:document.querySelector('.product-grid').tagName,items:document.querySelectorAll('.product-grid > li > article').length,menu:document.querySelectorAll('nav > ul > li > a').length,alt:[...document.querySelectorAll('.product-card img')].every(x=>x.alt.trim().length>10),ids:[...document.querySelectorAll('[id]')].map(x=>x.id),css:document.querySelector('link[rel="stylesheet"]').getAttribute('href'),bodyFont:getComputedStyle(document.body).fontFamily,scripts:document.scripts.length}));
check('HTML semantics',semantics.lang==='vi'&&semantics.h1===1&&semantics.main===1&&semantics.header&&semantics.nav&&semantics.footer&&semantics.sections&&semantics.list==='UL'&&semantics.items===4&&semantics.menu===3&&semantics.alt&&new Set(semantics.ids).size===semantics.ids.length,semantics);
check('external CSS and no runtime JavaScript',semantics.css==='css/style.css'&&semantics.scripts===0&&semantics.bodyFont.includes('Arial'));
report.semantics=semantics;
for(let i=0;i<4;i++){
  const summary=page.locator('details summary').nth(i);await summary.focus();await page.keyboard.press('Enter');
  check(`details open by Enter ${i+1}`,await page.locator('details').nth(i).getAttribute('open')!==null);
  const imageLink=page.locator('.product-image-link').nth(i);
  const href=await imageLink.getAttribute('href');const response=await page.request.get(new URL(href,url).href);
  check(`image anchor resource ${i+1}`,response.status()===200&&(response.headers()['content-type']||'').includes('svg'));
  if(i===0){
    await page.keyboard.press('Tab');
    const focused=await imageLink.evaluate(e=>({active:document.activeElement===e,visible:e.matches(':focus-visible'),outline:getComputedStyle(e).outlineWidth}));
    check('keyboard focus visible on image link',focused.active&&focused.visible&&focused.outline==='3px',focused);
    await page.locator('.product-card').first().screenshot({path:path.join(out,'focus-keyboard.png')});
    const normal=await imageLink.evaluate(e=>getComputedStyle(e).backgroundColor);
    await page.mouse.move(0,0);await page.locator('h1').click();
    await imageLink.hover();await page.waitForTimeout(230);
    const hover=await imageLink.evaluate(e=>({bg:getComputedStyle(e).backgroundColor,transition:getComputedStyle(e).transitionDuration}));
    check('hover changes background with transition',normal!==hover.bg&&hover.transition.includes('0.18s'),{normal,...hover});
    await page.locator('.product-card').first().screenshot({path:path.join(out,'hover.png')});
    const [popup]=await Promise.all([context.waitForEvent('page'),imageLink.click()]);await popup.waitForLoadState();
    check('image anchor opens intended SVG',popup.url().endsWith('/images/keyboard.svg'),{url:popup.url()});await popup.close();
  }
  await summary.focus();await page.keyboard.press('Enter');
  check(`details close by Enter ${i+1}`,await page.locator('details').nth(i).getAttribute('open')===null);
}
await page.locator('#filter-all').focus();await page.keyboard.press('ArrowRight');check('radio keyboard changes category',await page.locator('#filter-input').isChecked()&&(await page.locator('.product-item:visible').count())===2);
await page.getByRole('button',{name:'Đặt lại bộ lọc'}).focus();await page.keyboard.press('Enter');check('reset works with keyboard',(await page.locator('.product-item:visible').count())===4);
report.boxModel=await page.evaluate(()=>{
  const select=s=>{const e=document.querySelector(s),c=getComputedStyle(e),r=e.getBoundingClientRect();return{selector:s,width:r.width,height:r.height,boxSizing:c.boxSizing,padding:[c.paddingTop,c.paddingRight,c.paddingBottom,c.paddingLeft],border:[c.borderTopWidth,c.borderRightWidth,c.borderBottomWidth,c.borderLeftWidth],margin:[c.marginTop,c.marginRight,c.marginBottom,c.marginLeft],fontSize:c.fontSize,borderRadius:c.borderRadius};};
  return{card:select('.product-card'),content:select('.product-content'),title:select('.product-title'),priceContext:select('.price-context'),gap:getComputedStyle(document.querySelector('.product-grid')).gap};
});
check('Box Model actual values',report.boxModel.card.boxSizing==='border-box'&&report.boxModel.card.border[0]==='1px'&&report.boxModel.card.padding.every(x=>x==='0px')&&report.boxModel.content.padding.every(x=>x==='24px')&&report.boxModel.title.margin[2]==='12px'&&report.boxModel.priceContext.fontSize==='12px',report.boxModel);
const products=JSON.parse(await fs.readFile(path.join(root,'products.json'),'utf8'));
const data=await page.locator('.product-card').evaluateAll(es=>es.map(e=>({name:e.querySelector('h3').textContent.trim(),price:e.querySelector('.price-value').textContent,old:e.querySelector('.previous-price s').textContent,saving:e.querySelector('.previous-price > span:not(.sr-only)').textContent})));
for(let i=0;i<4;i++){const n=s=>Number(s.replace(/\D/g,'')),p=products[i],v=data[i];check(`product values ${p.slug}`,v.name===p.name&&n(v.price)===p.price&&n(v.old)===p.original&&n(v.saving)===p.original-p.price&&p.discount===Math.round((p.original-p.price)/p.original*100));}
for(const columns of [2,3]){
  const style=await page.addStyleTag({content:`.product-grid { grid-template-columns: repeat(${columns}, minmax(0,1fr)) !important; }`});
  const count=await page.locator('.product-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);
  check(`Grid experiment ${columns} columns`,count===columns);report.experiments.push({type:'grid',columns:count});
  await page.locator('.product-grid').screenshot({path:path.join(out,`experiment-grid-${columns}.png`)});await style.evaluate(e=>e.remove());
}
for(const value of ['flex-start','space-between']){
  const style=await page.addStyleTag({content:`.main-nav-list { width: 620px; justify-content: ${value} !important; }`});
  const positions=await page.locator('.main-nav-list > li').evaluateAll(es=>es.map(e=>({x:e.getBoundingClientRect().x,width:e.getBoundingClientRect().width})));
  const computed=await page.locator('.main-nav-list').evaluate(e=>({display:getComputedStyle(e).display,justify:getComputedStyle(e).justifyContent,align:getComputedStyle(e).alignItems,gap:getComputedStyle(e).gap}));
  check(`Flexbox experiment ${value}`,computed.display==='flex'&&computed.justify===value&&computed.align==='center');report.experiments.push({type:'flex',value,positions,...computed});
  await page.locator('.main-nav-list').screenshot({path:path.join(out,`experiment-flex-${value}.png`)});await style.evaluate(e=>e.remove());
}
for(const value of ['flex-start','flex-end']){
  const style=await page.addStyleTag({content:`.main-nav-list { width: 620px; height: 100px; align-items: ${value} !important; }`});
  const state=await page.locator('.main-nav-list').evaluate(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return{align:c.alignItems,height:r.height,items:[...e.children].map(x=>{const b=x.getBoundingClientRect();return{top:b.top-r.top,bottom:r.bottom-b.bottom,height:b.height};})};});
  check(`Flexbox align-items experiment ${value}`,state.align===value&&state.items.every(x=>Math.abs(value==='flex-start'?x.top:x.bottom)<1),state);
  report.experiments.push({type:'align-items',value,...state});
  await page.locator('.main-nav-list').screenshot({path:path.join(out,`experiment-align-${value}.png`)});await style.evaluate(e=>e.remove());
}
const blockStyle=await page.addStyleTag({content:'.product-grid { display: block !important; }'});
report.withoutGrid=await page.locator('.product-item').evaluateAll(es=>es.map(e=>({x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y,width:e.getBoundingClientRect().width})));
check('without Grid items stack vertically',report.withoutGrid.every((x,i)=>i===0||(x.y>report.withoutGrid[i-1].y&&Math.abs(x.x-report.withoutGrid[0].x)<1)));
await blockStyle.evaluate(e=>e.remove());
await page.emulateMedia({reducedMotion:'reduce'});const reduced=await page.locator('.product-image-link').first().evaluate(e=>getComputedStyle(e).transitionDuration);check('reduced motion removes transition',reduced==='0s');
const file=await context.newPage();await file.goto(pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
check('file protocol loads styles and images',await file.evaluate(()=>getComputedStyle(document.querySelector('.product-grid')).display==='grid'&&[...document.querySelectorAll('.product-card img')].every(e=>e.complete&&e.naturalWidth>0)));
await file.locator('label:has(#filter-audio)').click();check('file protocol filtering',(await file.locator('.product-item:visible').count())===1);
await file.getByRole('button',{name:'Đặt lại bộ lọc'}).click();check('file protocol reset',(await file.locator('.product-item:visible').count())===4);
await browser.close();report.summary={total:report.checks.length,passed:report.checks.filter(c=>c.pass).length,failed:report.checks.filter(c=>!c.pass).length};
await fs.writeFile(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({summary:report.summary,errors:report.errors,boxModel:report.boxModel,browser:report.browser},null,2));if(report.errors.length)process.exitCode=1;
