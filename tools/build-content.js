#!/usr/bin/env node
/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — tools/build-content.js
   Turns a unit's item bank (the JSON workstream B/D delivers) into the files
   the app loads: data/topic-uN.js, data/tests.js and data/extras.js.

     node tools/build-content.js "Unit 5/U5-item-bank.json" "Unit 6/U6-item-bank.json"

   Every bank named on the command line is rebuilt; banks not named keep
   their existing data file. tests.js and extras.js are rewritten for every
   unit that has a bank in data/banks/ (the tool copies each bank there).

   ITEM CONTRACT (docs/item-bank-contract.md is the readable version)
     { id, unit, lesson, grammarTag, errorTag, type, level, passage?, stem,
       options:[{text, errorType?, feedback}], answerIndex, hint, why,
       source, heldout, use }
     type   cloze | errorid | closest | vocab | ordering
     use    "portal" | "exit" | "spiral" | "blooket" | "test"  (string or array)
     plus:  word (vocab headword), kind (meaning|family|context),
            given (the sentence for closest-in-meaning), fix (errorid),
            triage:true / check:true  (priority flags)
   Held-out items (heldout:true, or use test) never reach the app.
   =========================================================================== */
'use strict';
var fs = require('fs'), path = require('path');
var ROOT = path.join(__dirname, '..');
var PLANS = require('./unit-plans.js');

/* ------------------------------------------------------------------ util */
function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function uses(it) {
  var u = it.use == null ? ['portal'] : it.use;
  if (typeof u === 'string') u = u.split(/[,\s]+/);
  return u.map(function (x) { return String(x).toLowerCase(); }).filter(Boolean);
}
function inApp(it) {
  if (it.heldout) return false;
  var u = uses(it);
  if (u.indexOf('test') >= 0) return false;
  return u.some(function (x) { return x === 'portal' || x === 'exit' || x === 'spiral'; });
}
function optText(o) { return typeof o === 'string' ? o : (o && o.text) || ''; }
function optFb(o) { return typeof o === 'string' ? '' : (o && o.feedback) || ''; }
function wordGroup(plan, word) {
  var w = String(word || '').toLowerCase().trim();
  var keys = Object.keys(plan.words);
  for (var i = 0; i < keys.length; i++) {
    if (plan.words[keys[i]].some(function (x) { return x.toLowerCase() === w; })) return 'u' + plan.unit + '-words-' + keys[i];
  }
  return null;
}
function tagOf(plan, it) {
  if (it.grammarTag) return it.grammarTag;
  if (it.type === 'vocab') return wordGroup(plan, it.word) || ('u' + plan.unit + '-words-a');
  return 'untagged';
}


/* ------------------------------------------------------- bank adapter
   Workstream B's Unit 5 bank (21 Oct) uses a few labels the module plan does
   not know. Map them here rather than editing the bank, so B/D files stay
   the single source. */
var TAG_ALIAS = {
  'reporting-passive': 'impersonal-passive',
  'stative-adjective': 'stative-lookalike',
  'elliptical-passive': 'reduced-relative',
  'get-passive': 'form-tense'
};
var VOCAB_KIND_BY_PREFIX = { VO: 'meaning', VG: 'context', VF: 'family' };
function normalise(it) {
  if (!it || !it.id) return it;
  if (TAG_ALIAS[it.grammarTag]) it.grammarTag = TAG_ALIAS[it.grammarTag];
  if (it.correction && !it.fix) it.fix = it.correction;
  if (it.type === 'vocab') {
    if (it.grammarTag === 'vocab') it.grammarTag = null;
    if (!it.word) {
      var m = /\[([^\]]+)\]/.exec(it.stem || '');
      var key = it.options && it.options[it.answerIndex];
      it.word = (m ? m[1] : optText(key)).toLowerCase().replace(/[^a-z\- ]/g, '').trim();
    }
    if (!it.kind) {
      var pre = /^U\d-([A-Z]+)-/.exec(it.id);
      if (pre && VOCAB_KIND_BY_PREFIX[pre[1]]) it.kind = VOCAB_KIND_BY_PREFIX[pre[1]];
    }
  }
  return it;
}

/* Convert one bank item into an engine item. */
function convert(plan, it) {
  var base = { id: it.id, tag: tagOf(plan, it), level: it.level || 'B2', why: it.why || '', hint: it.hint || '' };
  var opts = (it.options || []).map(optText);
  var fb = (it.options || []).map(optFb);
  if (fb.some(Boolean)) base.fb = fb;
  if (it.errorTag) base.err = it.errorTag;
  if (it.lesson) base.lesson = it.lesson;
  switch (it.type) {
    case 'cloze':
      base.type = 'cloze';
      if (it.passage) {
        base.passage = it.passage;
        var m = /___\((\d+)\)___/.exec(it.passage);
        base.blank = it.blank || (m ? '(' + m[1] + ')' : undefined);
      }
      base.stem = it.stem || 'Choose the word or phrase that best fills the gap.';
      base.options = opts; base.answer = it.answerIndex; break;
    case 'errorid':
      base.type = 'spot';
      base.stem = it.stem || 'One of the four parts is wrong. Find it.';
      base.words = opts; base.answer = it.answerIndex;
      base.fix = it.fix || fb[it.answerIndex] || ''; break;
    case 'closest':
      base.type = 'equiv';
      base.given = it.given || it.stem;
      base.stem = it.given ? (it.stem || 'Which sentence is closest in meaning?') : 'Which sentence is closest in meaning?';
      base.options = opts; base.answer = it.answerIndex; break;
    case 'ordering':
      base.type = 'order';
      base.stem = it.stem || 'Put the sentences in the best order.';
      base.items = opts; break;
    case 'read':
      base.type = 'read'; base.passage = it.passage; base.source = it.source;
      base.stem = it.stem; base.options = opts; base.answer = it.answerIndex; break;
    default: /* vocab, choose */
      base.type = 'choose';
      base.stem = it.stem; base.options = opts; base.answer = it.answerIndex;
      if (it.word) base.word = it.word;
      if (it.kind) base.kind = it.kind;
  }
  return base;
}

/* ------------------------------------------------------- allocation */
function build(plan, bank, report) {
  var all = bank.map(normalise).filter(inApp).map(function (it) { var c = convert(plan, it); c._src = it; return c; });
  var used = {};
  function take(pool, n, prefer) {
    var out = [];
    if (prefer) pool = pool.slice().sort(function (a, b) { return (prefer(b) ? 1 : 0) - (prefer(a) ? 1 : 0); });
    pool.forEach(function (it) { if (out.length < n && !used[it.id]) { used[it.id] = 1; out.push(it); } });
    return out;
  }
  function note(msg) { report.push('U' + plan.unit + ': ' + msg); }
  var GRAMMAR_TYPES = { cloze: 1, spot: 1, equiv: 1, order: 1, read: 1, choose: 1 };

  function fillModule(mod, isWords) {
    var pool = all.filter(function (it) {
      if (used[it.id]) return false;
      if (mod.tags.indexOf(it.tag) < 0) return false;
      if (isWords ? it.type !== 'choose' && it.type !== 'equiv' : !GRAMMAR_TYPES[it.type]) return false;
      if (isWords && mod.kinds && it.kind && mod.kinds.indexOf(it.kind) < 0) return false;
      return true;
    });
    var inLevel = pool.filter(function (it) { return mod.levels.indexOf(it.level) >= 0; });
    var items = take(inLevel, 6);
    if (items.length < 5) items = items.concat(take(pool, 5 - items.length));
    if (items.length < 5) note('module ' + mod.id + ' has only ' + items.length + ' items (tags ' + mod.tags.join(', ') + ')');
    return items;
  }
  function fillCheck(level, isWords) {
    var tags = [];
    level.modules.forEach(function (m) { m.tags.forEach(function (t) { if (tags.indexOf(t) < 0) tags.push(t); }); });
    var pool = all.filter(function (it) { return !used[it.id] && tags.indexOf(it.tag) >= 0 && (isWords ? it.type === 'choose' || it.type === 'equiv' : true); });
    /* round-robin over tags so a check covers every module */
    var out = [], i = 0;
    while (out.length < 6 && i < 12) {
      var tag = tags[i % tags.length];
      var cand = pool.filter(function (it) { return !used[it.id] && it.tag === tag; })
        .sort(function (a, b) { return ((b._src.check ? 1 : 0) - (a._src.check ? 1 : 0)); });
      if (cand.length) out = out.concat(take([cand[0]], 1));
      i++;
      if (i >= tags.length && !pool.some(function (it) { return !used[it.id]; })) break;
    }
    if (out.length < 5) note('level check ' + level.id + ' has only ' + out.length + ' items');
    return out;
  }
  function makeStage(def, isWords) {
    var stage = { id: def.id, n: isWords ? 2 : 1, code: def.code, art: def.art, cefr: def.cefr, name: def.name, blurb: def.blurb, levels: [] };
    def.levels.forEach(function (lv) {
      var level = { id: lv.id, n: lv.n, name: lv.name, cefr: lv.cefr, blurb: lv.blurb, subs: [], check: null };
      lv.modules.forEach(function (mod) {
        var theory = mod.theory || wordTheory(plan, mod);
        level.subs.push({ id: mod.id, name: mod.name, cefr: mod.cefr, theory: theory, items: fillModule(mod, isWords) });
      });
      level.check = { id: lv.id + 'ck', name: lv.check.name, items: fillCheck(lv, isWords) };
      stage.levels.push(level);
    });
    return stage;
  }
  var grammar = makeStage(plan.grammar, false);
  var words = makeStage(plan.wordsStage, true);

  /* triage: one item per module first, then top up */
  var triageItems = [];
  [grammar, words].forEach(function (st) {
    st.levels.forEach(function (lv) {
      lv.subs.forEach(function (sb) {
        var tags = (plan.grammar.levels.concat(plan.wordsStage.levels)).reduce(function (acc, l) {
          l.modules.forEach(function (m) { if (m.id === sb.id) acc = m.tags; }); return acc; }, []);
        var cand = all.filter(function (it) { return !used[it.id] && tags.indexOf(it.tag) >= 0; });
        triageItems = triageItems.concat(take(cand, 1, function (it) { return it._src.triage; }));
      });
    });
  });
  if (triageItems.length < plan.triage.total) {
    triageItems = triageItems.concat(take(all.filter(function (it) { return !used[it.id] && it.type !== 'order'; }),
      plan.triage.total - triageItems.length, function (it) { return it._src.triage; }));
  }
  if (triageItems.length < plan.triage.total) note('triage has only ' + triageItems.length + ' of ' + plan.triage.total);

  /* unit check in test format: 5 vocab, 5 cloze, 5 errorid, 5 closest */
  var uc = [];
  [['choose', 'Part A · Vocabulary', 'A'], ['cloze', 'Part B1 · Cloze', 'B1'], ['spot', 'Part B2 · Error identification', 'B2'], ['equiv', 'Part B3 · Closest in meaning', 'B3']].forEach(function (spec) {
    var cand = all.filter(function (it) { return !used[it.id] && it.type === spec[0]; });
    var got = take(cand, 5);
    if (got.length < 5) note('unit check ' + spec[1] + ' has only ' + got.length + ' of 5');
    uc.push({ code: spec[2], part: spec[1].toUpperCase(), title: spec[1].split(' · ')[1], points: 1,
      instructions: spec[0] === 'spot' ? 'One part of each sentence is wrong. Find it.' : 'Choose the best answer.', items: got });
  });

  var mocks = [
    { id: 'u' + plan.unit + '-triage', name: plan.triage.name, blurb: plan.triage.blurb, minutes: plan.triage.minutes, total: triageItems.length,
      sections: [{ code: 'T', part: 'TRIAGE', title: plan.triage.name, points: 1,
        instructions: 'One question per module. Answer every one; a guess you get wrong still tells the app where to send you.', items: triageItems }] },
    { id: 'u' + plan.unit + '-check', name: plan.unitCheck.name, blurb: plan.unitCheck.blurb, minutes: plan.unitCheck.minutes,
      total: uc.reduce(function (a, s) { return a + s.items.length; }, 0), sections: uc }
  ];

  /* exit tickets and spirals: full item copies, may reuse placed items */
  function pickFor(def, useKey, n, extra) {
    var cand = all.filter(function (it) { return uses(it._src).indexOf(useKey) >= 0 && it._src.lesson === def.lesson; });
    var out = cand.slice(0, n);
    if (out.length < n && extra) {
      var more = all.filter(function (it) { return out.indexOf(it) < 0 && it._src.lesson === def.lesson && it.type !== 'order'; });
      out = out.concat(more.slice(0, n - out.length));
    }
    if (out.length < n) note(useKey + ' ' + def.id + ' has only ' + out.length + ' of ' + n);
    return out.map(strip);
  }
  var exits = plan.exits.map(function (d) { return { id: d.id, unit: plan.unit, lesson: d.lesson, name: d.name, items: pickFor(d, 'exit', 5, true) }; });
  var spirals = plan.spirals.map(function (d) { return { id: d.id, unit: plan.unit, lesson: d.lesson, name: d.name, minutes: 5, items: pickFor(d, 'spiral', 6, true) }; });

  var unused = all.filter(function (it) { return !used[it.id]; }).length;
  note(all.length + ' items in the app, ' + unused + ' not placed in a module, check or paper (still usable by exits and spirals)');
  return { stages: [grammar, words], mocks: mocks, exits: exits, spirals: spirals };
}
function strip(it) { var o = {}; Object.keys(it).forEach(function (k) { if (k !== '_src') o[k] = it[k]; }); return o; }
function stripDeep(x) { return JSON.parse(JSON.stringify(x, function (k, v) { return k === '_src' ? undefined : v; })); }

function wordTheory(plan, mod) {
  var groupKey = mod.tags[0].slice(-1);
  var words = plan.words[groupKey] || [];
  var kind = (mod.kinds || ['meaning'])[0];
  var body = {
    meaning: ['Five words, one picture each. Say the word, say what it means in one short English phrase, then put it in a sentence about the unit theme. The questions ask for the closest synonym and for the gap a word fills.'],
    family: ['Every word has relatives: the noun, the verb, the adjective, the adverb. Learn the family together with the two or three words that usually sit next to it (<em>a devastating flood</em>, <em>mitigate the damage</em>). The questions test the right form in the right slot.'],
    context: ['The words inside real sentences in the unit grammar — the way the midterm will meet you with them. Read the whole sentence, decide what the gap needs by meaning and by grammar, then choose.']
  }[kind];
  return {
    key: 'Words: ' + words.join(', ') + '.',
    body: body,
    simple: ['Say it. Give the meaning in a few words. Use it in one sentence.'],
    examples: words.map(function (w) { return { s: '<b>' + w + '</b>', g: 'see the vocabulary journal and the keyword slides for this word.' }; })
  };
}

/* ------------------------------------------------------------ emit files */
function js(v) { return JSON.stringify(v, null, 1).replace(/\n\s*/g, ' ').replace(/^ /, ''); }
function emitTopic(plan, stages) {
  var out = '/* GENERATED by tools/build-content.js from the Unit ' + plan.unit + ' item bank — do not edit by hand.\n   ' +
    'Rebuild: node tools/build-content.js "Unit ' + plan.unit + '/U' + plan.unit + '-item-bank.json" */\n';
  stages.forEach(function (st) {
    out += 'var ' + st.id.toUpperCase() + ' = ' + JSON.stringify(stripDeep(st), null, 1) + ';\nTOPICS.push(' + st.id.toUpperCase() + ');\n';
  });
  fs.writeFileSync(path.join(ROOT, 'data', 'topic-u' + plan.unit + '.js'), out);
}

function main(args) {
  var report = [];
  var bankDir = path.join(ROOT, 'data', 'banks');
  if (!fs.existsSync(bankDir)) fs.mkdirSync(bankDir, { recursive: true });
  args.forEach(function (p) {
    var bank = readJson(p);
    if (!Array.isArray(bank)) bank = bank.items || [];
    var unit = bank.length ? bank[0].unit : null;
    if (!unit || !PLANS[unit]) throw new Error('No plan for unit ' + unit + ' in ' + p);
    fs.writeFileSync(path.join(bankDir, 'u' + unit + '.json'), JSON.stringify(bank));
  });
  var allMocks = [], allExits = [], allSpirals = [];
  Object.keys(PLANS).sort().forEach(function (u) {
    var bp = path.join(bankDir, 'u' + u + '.json');
    if (!fs.existsSync(bp)) return;
    var built = build(PLANS[u], readJson(bp), report);
    emitTopic(PLANS[u], built.stages);
    allMocks = allMocks.concat(built.mocks);
    allExits = allExits.concat(built.exits);
    allSpirals = allSpirals.concat(built.spirals);
  });
  var tests = '/* GENERATED by tools/build-content.js — do not edit by hand. The first paper is the diagnostic the route opens with. */\n';
  allMocks.forEach(function (m) { tests += 'MOCKS.push(' + JSON.stringify(stripDeep(m), null, 1) + ');\n'; });
  fs.writeFileSync(path.join(ROOT, 'data', 'tests.js'), tests);
  fs.writeFileSync(path.join(ROOT, 'data', 'extras.js'),
    '/* GENERATED by tools/build-content.js — exit tickets and Monday spiral sets. */\nwindow.EXTRAS = ' +
    JSON.stringify(stripDeep({ exits: allExits, spirals: allSpirals }), null, 1) + ';\n');
  report.forEach(function (l) { console.log(l); });
  console.log('Wrote data/topic-u*.js, data/tests.js, data/extras.js');
}

if (require.main === module) {
  var args = process.argv.slice(2);
  if (!args.length && !fs.existsSync(path.join(ROOT, 'data', 'banks'))) {
    console.error('Usage: node tools/build-content.js "Unit 5/U5-item-bank.json" [more banks]'); process.exit(1);
  }
  main(args);
}
module.exports = { build: build, convert: convert };
