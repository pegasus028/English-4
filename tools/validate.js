#!/usr/bin/env node
/* Structural check of the generated content. Exits non-zero on errors.
     node tools/validate.js */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var ROOT = path.join(__dirname, '..');
var ctx = { window: {}, console: console }; ctx.window = ctx; vm.createContext(ctx);
['content.js', 'data/topic-u5.js', 'data/topic-u6.js', 'media.js', 'data/tests.js', 'data/extras.js', 'content-export.js'].forEach(function (f) {
  var p = path.join(ROOT, f); if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f });
});
var C = ctx.CONTENT, EX = ctx.EXTRAS || { exits: [], spirals: [] };
var errors = [], warns = [], ids = {}, pos = [0, 0, 0, 0], longest = 0, mcq = 0, tagUse = {};
function err(m) { errors.push(m); } function warn(m) { warns.push(m); }
function checkItem(it, where) {
  if (!it.id) return err(where + ': item without id');
  if (ids[it.id]) err(where + ': duplicate id ' + it.id); ids[it.id] = 1;
  if (!it.tag || !C.REMEDIATION[it.tag]) err(it.id + ': tag "' + it.tag + '" not in REMEDIATION');
  tagUse[it.tag] = (tagUse[it.tag] || 0) + 1;
  if (!it.why) warn(it.id + ': no why');
  if (it.why && it.why.replace(/<[^>]+>/g, '').split(/\s+/).length > 45) warn(it.id + ': why longer than 45 words');
  if (/\boption [1-4]\b|\(1\)|\(2\)|\(3\)|\(4\)/i.test(it.hint || '')) warn(it.id + ': hint names an option');
  if (it.type === 'spot') {
    if (!it.words || it.words.length !== 4) err(it.id + ': spot needs 4 segments');
    if (typeof it.answer !== 'number' || it.answer < 0 || it.answer > 3) err(it.id + ': spot answer out of range');
    if (!it.fix) warn(it.id + ': spot without fix');
    pos[it.answer]++; mcq++;
  } else if (it.type === 'order') {
    if (!it.items || it.items.length < 3) err(it.id + ': order needs 3+ sentences');
  } else {
    if (!it.options || it.options.length !== 4) err(it.id + ': needs exactly 4 options');
    else {
      var seen = {}; it.options.forEach(function (o) { var k = String(o).trim().toLowerCase(); if (seen[k]) err(it.id + ': duplicate option "' + o + '"'); seen[k] = 1; });
      if (typeof it.answer !== 'number' || it.answer < 0 || it.answer > 3) err(it.id + ': answer out of range');
      else { pos[it.answer]++; mcq++; var L = it.options.map(function (o) { return String(o).replace(/<[^>]+>/g, '').length; }); if (L[it.answer] === Math.max.apply(null, L) && L.filter(function (x) { return x === L[it.answer]; }).length === 1) longest++; }
    }
    if (it.type === 'cloze' && it.passage && !/___\(\d+\)___/.test(it.passage)) err(it.id + ': cloze passage has no ___(n)___ marker');
    if (it.type === 'cloze' && !it.passage && !/____/.test(it.stem || '')) warn(it.id + ': cloze stem has no ____ gap');
    if (!it.stem && !it.given) err(it.id + ': no stem');
  }
}
C.TOPICS.forEach(function (t) {
  if (!t.levels || !t.levels.length) err(t.id + ': no levels');
  t.levels.forEach(function (lv) {
    lv.subs.forEach(function (s) {
      if (!s.theory || !s.theory.key) err(s.id + ': no theory key');
      if (s.items.length < 4) warn(s.id + ': only ' + s.items.length + ' items');
      s.items.forEach(function (it) { checkItem(it, s.id); });
    });
    if (!lv.check || lv.check.items.length < 5) warn(lv.id + ': check has ' + (lv.check ? lv.check.items.length : 0) + ' items');
    (lv.check ? lv.check.items : []).forEach(function (it) { checkItem(it, lv.check.id); });
  });
});
(C.MOCKS || []).forEach(function (m) {
  var n = 0; m.sections.forEach(function (s) { n += s.items.length; s.items.forEach(function (it) { checkItem(it, m.id); }); });
  if (n < 10) warn(m.id + ': only ' + n + ' items');
});
(EX.exits || []).concat(EX.spirals || []).forEach(function (x) {
  if (!x.items.length) warn(x.id + ': empty'); x.items.forEach(function (it) { if (!it.tag || !C.REMEDIATION[it.tag]) err(x.id + ': ' + it.id + ' tag missing'); if (it.options && it.options.length !== 4 && it.type !== 'order') err(x.id + ': ' + it.id + ' options'); });
});
Object.keys(C.REMEDIATION).forEach(function (t) { if (!tagUse[t]) warn('tag "' + t + '" has no items yet'); });
var ranks = C.RANKS.slice().sort(function (a, b) { return a.min - b.min; }); if (ranks[0].min !== 0) err('first rank must start at 0');
C.BADGES.forEach(function (b) { if (['poweron','streak3','streak7','streak14','allgreen','triple','nohelp','recovered','run10','reflight','quick','sim1','sim70','simall','director'].indexOf(b.id) < 0) err('unknown badge id ' + b.id); });
console.log('items: ' + Object.keys(ids).length + ' · key positions: ' + pos.map(function (n) { return Math.round(100 * n / Math.max(1, mcq)) + '%'; }).join(' / ') + ' · key is longest: ' + Math.round(100 * longest / Math.max(1, mcq)) + '%');
pos.forEach(function (n, i) { var share = n / Math.max(1, mcq); if (mcq > 40 && (share < 0.17 || share > 0.33)) warn('key position ' + (i + 1) + ' holds ' + Math.round(share * 100) + '% of keys (aim 25%)'); });
if (mcq > 40 && longest / mcq > 0.32) warn('key is the longest option ' + Math.round(100 * longest / mcq) + '% of the time (aim ~25%)');
warns.forEach(function (w) { console.log('warn: ' + w); });
errors.forEach(function (e) { console.log('ERROR: ' + e); });
console.log(errors.length ? errors.length + ' error(s)' : 'OK, no errors' + (warns.length ? ' (' + warns.length + ' warnings)' : ''));
process.exit(errors.length ? 1 : 0);
