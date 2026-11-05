import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE_PATH || 'playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'minh-chung');
await fs.mkdir(path.join(out,'giao-dien'),{recursive:true});
const report={startedAt:new Date().toISOString(),scope:'Automated tests of local coursework only; no external game completion.',checks:[],errors:[],screenshots:[]};
await fs.writeFile(path.join(out,'ket-qua-kiem-tra.json'),JSON.stringify({status:'running'}));
function check(name,pass,details){report.checks.push({name,pass,details});if(!pass)report.errors.push(name);}
const browser=await chromium.launch({channel:'chrome',headless:true});
report.browser=browser.version();
const context=await browser.newContext({locale:'vi-VN'});
const page=await context.newPage();
const network=[];
page.on('pageerror',e=>network.push(e.message));
page.on('response',r=>{if(r.status()>=400)network.push(`${r.status()} ${r.url()}`);});
page.on('requestfailed',r=>network.push(`${r.failure()?.errorText} ${r.url()}`));
const base=process.env.SITE_URL || 'http://127.0.0.1:8879/Tuan3/VeNha/';
const files=(await fs.readdir(root)).filter(f=>f.endsWith('.html')).sort();
const css=async(sel,props)=>page.locator(sel).first().evaluate((el,props)=>Object.fromEntries(props.map(k=>[k,getComputedStyle(el)[k]])),props);
for(const width of [1366,768,390,320]){
 await page.setViewportSize({width,height:1000});
 for(const file of files){
  const r=await page.goto(base+file,{waitUntil:'networkidle'});
  check(`${file} HTTP ${width}`,r.status()===200);
  const info=await page.evaluate(()=>({
   overflow:document.documentElement.scrollWidth>innerWidth,
   images:[...document.images].filter(x=>!x.complete||!x.naturalWidth).map(x=>x.src),
   missingAlt:[...document.images].filter(x=>!x.alt).length,
   ids:[...document.querySelectorAll('[id]')].map(x=>x.id),
   scripts:document.scripts.length,
   localLinks:[...document.querySelectorAll('[href],[src]')].map(x=>x.getAttribute('href')||x.getAttribute('src')).filter(x=>x&&!/^(https?:|#|data:|mailto:)/.test(x))
  }));
  check(`${file} layout and assets ${width}`,!info.overflow&&!info.images.length&&!info.missingAlt&&new Set(info.ids).size===info.ids.length&&info.scripts===0,info);
  if(width===1366){
   for(const link of new Set(info.localLinks)){
    const relative=decodeURIComponent(link.split('#')[0].split('?')[0]);
    const target=path.resolve(root,relative||'index.html');
    const stat=await fs.stat(target).catch(()=>null);
    check(`${file} link ${link}`,!!stat);
   }
  }
  if([1366,390].includes(width)){
   const name=`giao-dien/${file.replace('.html','')}-${width}.png`;
   await page.screenshot({path:path.join(out,name),fullPage:true});report.screenshots.push(name);
  }
  if(file==='BaiTap6.html'){
   const b=await page.locator('.galerry li').evaluateAll(es=>es.map(e=>({x:e.offsetLeft,y:e.offsetTop})));
   const n=b.filter(e=>e.y===b[0].y).length;
   check(`Portfolio 7 tabs, 9 images, columns ${width}`,await page.locator('.list-tab li').count()===7&&b.length===9&&n===(width>650?3:width>400?2:1),{columns:n});
  }
  if(file==='BaiTap8a.html'){
   const items=await page.locator('.hero-item .description').evaluateAll(es=>es.map(e=>({height:e.clientHeight,scroll:e.scrollHeight,rect:e.getBoundingClientRect().toJSON()})));
   check(`Heroes description fits ${width}`,items.every(x=>x.scroll<=x.height+1),items);
  }
 }
}
await page.setViewportSize({width:1366,height:1000});
await page.goto(base+'BaiTap2.html');
const a=await css('.ueh',['color','textAlign','fontWeight','textDecorationLine','fontSize']);
check('2a required typography',a.color==='rgb(0, 0, 255)'&&a.textAlign==='center'&&+a.fontWeight>=700&&a.textDecorationLine==='underline'&&a.fontSize==='30px',a);
const b=await css('.faculty',['color','textAlign','fontStyle','borderTopStyle','borderTopColor','borderRadius','backgroundColor','fontSize','opacity']);
check('2b text-only transparency and border',b.color==='rgba(255, 0, 0, 0.5)'&&b.textAlign==='right'&&b.fontStyle==='italic'&&b.borderTopStyle==='dotted'&&b.borderTopColor==='rgb(255, 255, 0)'&&b.borderRadius!=='0px'&&b.backgroundColor==='rgb(128, 128, 128)'&&b.fontSize==='15px'&&b.opacity==='1',b);
check('2c multiple text shadows',(await css('.shadow-text',['textShadow'])).textShadow!=='none');
const bg=await css('.repeat-logo',['backgroundSize','backgroundRepeat','backgroundAttachment','backgroundImage']);
check('2d repeat fixed logo 30px',bg.backgroundSize==='30px auto'&&bg.backgroundRepeat==='repeat'&&bg.backgroundAttachment==='fixed'&&bg.backgroundImage.includes('BIT_logo.png'),bg);
for(const sel of ['.hidden','.ellipsis','.nowrap']){
 const box=await css(sel,['width','height','overflow','whiteSpace','textOverflow']);
 check('2e box '+sel,box.width==='100px'&&box.height==='50px',box);
 if(sel==='.ellipsis')check('2e visible ellipsis conditions',box.textOverflow==='ellipsis'&&box.whiteSpace==='nowrap'&&box.overflow==='hidden');
 if(sel==='.hidden')check('2e hidden overflow',box.overflow==='hidden');
 if(sel==='.nowrap')check('2e nowrap',box.whiteSpace==='nowrap');
}
await page.goto(base+'BaiTap4.html');
const menu=await css('.menu-demo li',['display','backgroundColor']);
check('4 inline-block aqua menu',menu.display==='inline-block'&&menu.backgroundColor==='rgb(0, 255, 255)'&&await page.locator('.menu-demo li').count()===4,menu);
await page.goto(base+'BaiTap5.html');
check('5 200px logo',(await page.locator('.logo img').boundingBox()).width===200);
check('5 centered title and buttons',(await css('.best-shared',['textAlign'])).textAlign==='center'&&(await css('.btn-list li',['display'])).display==='inline-block'&&(await css('.btn-list a',['textDecorationLine'])).textDecorationLine==='none'&&await page.locator('.btn-list li').count()===2);
await page.goto(base+'BaiTap7.html');
const boxes=await page.locator('#wrapper > *').evaluateAll(es=>es.map(e=>({tag:e.tagName,x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y,w:e.getBoundingClientRect().width})));
check('7 semantic layout positions',boxes.map(x=>x.tag).join()==='HEADER,NAV,MAIN,FOOTER'&&boxes[0].y<boxes[1].y&&boxes[1].y===boxes[2].y&&boxes[1].x<boxes[2].x&&boxes[3].y>boxes[2].y&&boxes[0].w===boxes[3].w,boxes);
await page.goto(base+'BaiTap8a.html');
check('8a 960px width',(await page.locator('#root').boundingBox()).width===960);
check('8a four inline-block heroes',await page.locator('.hero-item').count()===4&&(await css('.hero-item',['display'])).display==='inline-block');
const desc=await css('.hero-item .description',['position','zIndex']);const img=await css('.hero-item img',['position','zIndex']);
check('8a positioned overlap layers',desc.position==='relative'&&img.position==='absolute'&&+desc.zIndex>+img.zIndex,{desc,img});
await page.goto(base+'BaiTap8b.html');
check('8b 1024px width',(await page.locator('#root').boundingBox()).width===1024);
const hero=page.locator('.superheroes li').nth(3);const read=hero.locator('a');
const normal=await hero.boundingBox();const normalStyle=await read.evaluate(e=>getComputedStyle(e).opacity);
await hero.hover();const hover=await hero.boundingBox();const hoverStyle=await read.evaluate(e=>({opacity:getComputedStyle(e).opacity,decoration:getComputedStyle(e).textDecorationLine}));
check('8b hover enlarges and reveals underline',hover.width>normal.width&&normalStyle==='0'&&hoverStyle.opacity==='1'&&hoverStyle.decoration==='underline',{normal:normal.width,hover:hover.width,normalStyle,hoverStyle});
await page.screenshot({path:path.join(out,'giao-dien/BaiTap8b-hover-1366.png'),fullPage:true});
await page.mouse.move(0,0);await page.locator('.course-bar a').focus();
for(let i=0;i<4;i++)await page.keyboard.press('Tab');
const focus=await page.evaluate(()=>({name:document.activeElement.getAttribute('aria-label'),opacity:getComputedStyle(document.activeElement).opacity,width:document.activeElement.parentElement.getBoundingClientRect().width,decoration:getComputedStyle(document.activeElement).textDecorationLine}));
check('8b Tab reveals Nightwing',focus.name==='Read more about Nightwing'&&focus.opacity==='1'&&focus.width>normal.width&&focus.decoration==='underline',focus);
await page.screenshot({path:path.join(out,'giao-dien/BaiTap8b-focus-1366.png'),fullPage:true});
await page.goto(base+'BaiTap9.html');await page.evaluate(()=>document.fonts.ready);
const icons=await page.locator('.icon-grid i').evaluateAll(es=>es.map(e=>({font:getComputedStyle(e,'::before').fontFamily,content:getComputedStyle(e,'::before').content,hidden:e.getAttribute('aria-hidden')})));
check('9 six real Font Awesome icons',icons.length===6&&icons.every(x=>x.font.includes('Font Awesome')&&x.content!=='none'&&x.hidden==='true')&&await page.evaluate(()=>document.fonts.check('900 36px "Font Awesome 5 Free"')&&document.fonts.check('400 36px "Font Awesome 5 Brands"')),icons);
// Verify one representative page also works directly from the filesystem with network disabled.
await context.setOffline(true);await page.goto('file:///'+root.replaceAll('\\','/')+'/BaiTap9.html');await page.evaluate(()=>document.fonts.ready);
check('offline local CSS and icons',await page.evaluate(()=>document.fonts.check('900 36px "Font Awesome 5 Free"')&&getComputedStyle(document.querySelector('.icon-grid')).display==='grid'));
await context.setOffline(false);
check('no runtime or HTTP errors',network.length===0,network);
report.finishedAt=new Date().toISOString();report.summary={total:report.checks.length,passed:report.checks.filter(x=>x.pass).length,failed:report.errors.length};
report.unfinished=['Two external selector games: per-level completion screenshots not captured','Week 3 GitHub publication not performed'];
await fs.writeFile(path.join(out,'ket-qua-kiem-tra.json'),JSON.stringify(report,null,2));
await browser.close();console.log(JSON.stringify({summary:report.summary,errors:report.errors,failed:report.checks.filter(x=>!x.pass)},null,2));
process.exitCode=report.errors.length?1:0;
