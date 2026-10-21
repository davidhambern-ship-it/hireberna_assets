#!/usr/bin/env node
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const manifest=JSON.parse(fs.readFileSync('promo-studio-assets/manifest.json','utf8'));
const expected=manifest.cards.reduce((n,c)=>n+c.visual_layers.length,0);
assert.equal(manifest.cards.length,6);
assert.equal(expected,57);

for(const [filename,html] of [
 ['repo',fs.readFileSync('promo-studio-preview/v3/index.html','utf8')],
 ...((fs.existsSync('/tmp/promo-studio-live.html')) ? [['live',fs.readFileSync('/tmp/promo-studio-live.html','utf8')]] : [])
]){
 const scripts=[...html.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
 assert.equal(scripts.length,1, filename+': expected one application script');
 new vm.Script(scripts[0],{filename:filename+'-app.js'});
 assert.match(html,/FEATURE_MOTION_KITS=/,filename+': integration missing');
 assert.match(html,/object-fit:contain/,filename+': must fit not crop');
 assert.match(html,/prefers-reduced-motion:reduce/,filename+': reduced motion missing');
 assert.match(html,/\.animated-feature \.feature-art/,filename+': art stage missing');
 assert.match(html,/\.animated-feature \.feature-content/,filename+': text content area missing');
 assert.match(html,/aria-pressed/,filename+': interaction not accessible');
 assert.match(html,/classList\.toggle\('is-active'\)/,filename+': touch support missing');
 const start=scripts[0].indexOf('const FEATURE_MOTION_KITS=');
 const end=scripts[0].indexOf(';\nconst FEATURE_MOTION_ROOT=',start);
 assert.ok(start>=0 && end>start,filename+': unable to locate motion inventory');
 const kits=JSON.parse(scripts[0].slice(start+'const FEATURE_MOTION_KITS='.length,end));
 assert.equal(Object.keys(kits).length,6);
 for(const card of manifest.cards){
   const kit=kits[card.title];
   assert.ok(kit,filename+': missing '+card.title);
   assert.equal(kit.slug,card.slug);
   assert.deepEqual(kit.files,card.visual_layers,filename+': sprite count mismatch '+card.title);
   assert.ok(html.includes('#feature-'+card.slug+' .feature-art'),filename+': missing scoped CSS '+card.slug);
   for(const sprite of kit.files){
     assert.ok(fs.existsSync('promo-studio-assets/cards/'+kit.slug+'/'+sprite),'GitHub kit missing '+kit.slug+'/'+sprite);
   }
 }
 console.log('PASS '+filename+': JS parse, 6 cards, 57 asset mappings, independent motion, keyboard/tap, reduced motion and noncropping');
}
