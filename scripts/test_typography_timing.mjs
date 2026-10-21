import assert from "node:assert/strict";
import {resolve} from "node:path";
import {pathToFileURL} from "node:url";
import {chromium} from "playwright";

const url=pathToFileURL(resolve("promo-studio-assets/cards/typography-playground/preview.html")).href;
const browser=await chromium.launch({headless:true});
async function check(viewportWidth,reduce=false){
 const context=await browser.newContext({viewport:{width:viewportWidth,height:850},reducedMotion:reduce?"reduce":"no-preference"});
 const page=await context.newPage();
 await page.goto(url);
 await page.locator("#demo").waitFor();
 await page.waitForFunction(()=>Array.from(document.querySelectorAll("#demo img")).every(i=>i.complete&&i.naturalWidth>0),null,{timeout:10000});
 const read=async()=>page.evaluate(()=>{
  const sel=document.querySelector(".layer-selector"),h=sel.getBoundingClientRect().height,style=getComputedStyle(sel);
  const layers=["modern","serif","bold"].map(k=>Number(getComputedStyle(document.querySelector(".layer-type-"+k)).opacity));
  return {selected:layers.indexOf(Math.max(...layers)),opacities:layers,ratio:(new DOMMatrixReadOnly(style.transform).m42)/h}
 });
 let idle=await read();
 assert.equal(idle.selected,0,"default preview must be Modern Sans");
 assert.ok(Math.abs(idle.ratio)<.005,"default selector must line up with Modern Sans");
 await page.locator("#demo").hover({force:true});
 if(reduce){
  await page.waitForTimeout(500);
  let p=await read();
  assert.equal(p.selected,0,"reduced motion should remain static Modern Sans");
  assert.ok(Math.abs(p.ratio)<.005,"reduced motion outline should not wander");
 }else{
  await page.waitForTimeout(250);
  let p=await read();
  assert.equal(p.selected,0,"modern style should be selected initially");
  assert.ok(Math.abs(p.ratio)<.02,"outline should be on Modern Sans in opening frame");
  await page.waitForTimeout(980);
  p=await read();
  assert.equal(p.selected,1,"elegant-serif style must match second selector position");
  assert.ok(Math.abs(p.ratio-49/360)<.025,"selector must align with Elegant Serif at responsive width "+viewportWidth+"; found "+p.ratio);
  await page.waitForTimeout(1010);
  p=await read();
  assert.equal(p.selected,2,"bold style must match final selected chip");
  assert.ok(Math.abs(p.ratio-98/360)<.025,"selector must align with Big & Bold at responsive width "+viewportWidth+"; found "+p.ratio);
  const shot="typography-"+viewportWidth+".png";await page.screenshot({path:shot});
  await page.locator("#demo").focus();
 }
 console.log("PASS",viewportWidth,"reduced-motion="+reduce);
 await context.close();
}
try{
 await check(1050);
 await check(460);
 await check(1050,true);
}finally{await browser.close();}
