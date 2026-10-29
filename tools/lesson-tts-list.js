/* English 4 Mission Control — tools/lesson-tts-list.js
   Prints (JSON) every text the lesson Listen button reads aloud, with its recording key:
   for every lesson in data/topic-*.js and every level in lesson-levels.js (B1, B2, C1),
   the parts student.js lessonParts() builds — "name. key", each paragraph, each
   example as "sentence. note". Keys come from tts-clean.js, as in the app.
   Used by tools/make-lesson-audio.py.  node tools/lesson-tts-list.js [--summary] */
const vm = require('vm'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const { speechText, ttsNorm, ttsKey } = require(path.join(ROOT, 'tts-clean.js'));
const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext('var TOPICS = [];', ctx);
fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^topic-.*\.js$/.test(f)).sort()
  .forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'), ctx, { filename: f }));
vm.runInContext(fs.readFileSync(path.join(ROOT, 'lesson-levels.js'), 'utf8'), ctx, { filename: 'lesson-levels.js' });
const LV = ctx.E4_LESSON_LEVELS || {}, LVLS = ['B1', 'B2', 'C1'];
const out = [], seen = {};
function add(text, ref) {
  const t = ttsNorm(speechText(text)); if (!t) return;
  const key = ttsKey(t);
  if (seen[key]) { if (seen[key] !== t) throw new Error('Key collision ' + key + ': ' + ref); return; }
  seen[key] = t; out.push({ key, ref, text: t });
}
for (const tp of ctx.TOPICS) for (const lv of tp.levels) for (const s of lv.subs) {
  const L = LV[s.id];
  for (const lvl of LVLS) {
    const x = L && L[lvl];
    const tx = x && x.body && x.body.length ? { key: x.key || s.theory.key, body: x.body, examples: x.examples || s.theory.examples || [] }
      : (lvl === 'C1' ? { key: s.theory.key, body: s.theory.body, examples: s.theory.examples || [] } : null);
    if (!tx) continue;
    const ref = s.id + ':' + lvl;
    add(s.name + '. ' + tx.key, ref + ':key');
    tx.body.forEach((b, i) => add(b, ref + ':p' + (i + 1)));
    tx.examples.forEach((e, i) => add(e.s + '. ' + e.g, ref + ':ex' + (i + 1)));
  }
}
if (process.argv.includes('--summary')) {
  const chars = out.reduce((a, b) => a + b.text.length, 0);
  console.log(out.length + ' clips, ' + chars + ' characters (about ' + Math.round(chars / 15 / 60) + ' minutes of speech)');
} else process.stdout.write(JSON.stringify(out));
