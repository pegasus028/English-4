/* Lesson levels + read-aloud test. Serves the folder, logs in offline, and for
   EVERY lesson in the Stages tab: opens it at B1, B2 and C1, checks the text is
   there (no placeholder), that every part the Listen button reads has a Sonia
   clip in lesson-audio.js, and (on a sample) that Listen plays an MP3 with the
   part highlighted, pauses, resumes, skips, stops; then the settings picker,
   phone width (390 px) in light and dark, with screenshots in tools/shots/.
     NODE_PATH=$(npm root -g) node tools/lesson-audio-test.js */
'use strict';
var pw = require('playwright'), cp = require('child_process'), path = require('path'), fs = require('fs');
var ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'tools', 'shots'); if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);
var PORT = 8766, srv = cp.spawn('python3', ['-m', 'http.server', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
var fails = [], notes = [];
function check(ok, msg) { if (!ok) fails.push(msg); }
(async function () {
  await wait(900);
  var browser;
  try { browser = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); }
  catch (e) { browser = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux/chrome', args: ['--autoplay-policy=no-user-gesture-required'] }); }
  var errors = [];
  var ctx = await browser.newContext({ viewport: { width: 1024, height: 900 } });
  await ctx.addInitScript(function () {
    window.__plays = []; window.__synth = 0;
    var op = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () { window.__plays.push(this.src); return op.call(this); };
    try { var os = speechSynthesis.speak.bind(speechSynthesis); speechSynthesis.speak = function (u) { window.__synth++; return os(u); }; } catch (e) {}
  });
  var p = await ctx.newPage();
  var ev = function (f, a) { return p.evaluate(f, a); };
  p.on('pageerror', function (e) { errors.push('pageerror: ' + e.message); });
  p.on('console', function (m) { if (m.type() === 'error' && !/favicon|Failed to load resource/.test(m.text())) errors.push('console: ' + m.text()); });
  await p.goto('http://127.0.0.1:' + PORT + '/index.html');
  await ev(function () { localStorage.setItem('mc.apiUrl', 'off'); });
  await p.reload();
  await p.selectOption('#f-pick', '51288'); await p.fill('#f-pw', 'test1234'); await p.click('#btn-go');
  await p.waitForSelector('#screen-app:not(.hidden)'); await wait(300);

  async function openLesson(id) {
    await p.click('.nav button[data-view="map"]'); await wait(60);
    var sys = id.slice(0, 3), lv = id.slice(0, 4);
    if (!(await p.$('[data-sub="' + id + '"]'))) {
      if (!(await p.$('#view-map [data-lvl="' + lv + '"]'))) { await p.click('[data-sys="' + sys + '"]'); await wait(80); }
      if (!(await p.$('[data-sub="' + id + '"]'))) { await p.click('#view-map [data-lvl="' + lv + '"]'); await wait(80); }
    }
    await p.click('[data-sub="' + id + '"]'); await wait(120);
  }
  var subs = await ev(function () { var o = []; window.TOPICS.forEach(function (t) { t.levels.forEach(function (l) { l.subs.forEach(function (s) { o.push(s.id); }); }); }); return o; });
  notes.push(subs.length + ' lessons');
  var missingClips = 0, totalParts = 0;
  for (var lvl of ['B1', 'B2', 'C1']) {
    await ev(function (l) { localStorage.setItem('e4.explain.lvl', l); }, lvl);
    for (var id of subs) {
      await openLesson(id);
      var info = await ev(function () {
        var on = document.querySelector('#view-play .lvl-btn.on');
        var text = document.querySelector('#view-play .theory').innerText;
        var parts = [document.querySelector('#view-play .key')].concat([].slice.call(document.querySelectorAll('#view-play .prose p'))).concat([].slice.call(document.querySelectorAll('#view-play .exlist > div')));
        return { on: on && on.textContent, placeholder: /vocabulary journal|keyword slides/i.test(text), paras: document.querySelectorAll('#view-play .prose p').length, ex: document.querySelectorAll('#view-play .exlist > div').length, nParts: parts.length };
      });
      check(info.on === lvl, id + ' ' + lvl + ': level button shows ' + info.on);
      check(!info.placeholder, id + ' ' + lvl + ': placeholder text still shown');
      check(info.paras >= 2, id + ' ' + lvl + ': only ' + info.paras + ' paragraphs');
      check(info.ex >= 3, id + ' ' + lvl + ': only ' + info.ex + ' examples');
      /* every part the Listen button would read has a clip */
      var miss = await ev(function (a) {
        var s = Engine.Bank.sub(a.id), L = (window.E4_LESSON_LEVELS || {})[a.id], x = L && L[a.lvl]; if (!x) return ['no level text'];
        var t = [s.name + '. ' + x.key].concat(x.body).concat((x.examples || []).map(function (e) { return e.s + '. ' + e.g; }));
        return t.filter(function (q) { return !Reader.has(q); }).map(function (q) { return q.slice(0, 50); });
      }, { id: id, lvl: lvl });
      totalParts += info.nParts; missingClips += miss.length;
      check(!miss.length, id + ' ' + lvl + ': ' + miss.length + ' part(s) with no clip, e.g. ' + miss[0]);
    }
  }
  notes.push(totalParts + ' parts checked across 3 levels; ' + missingClips + ' without a clip');

  /* the player on one lesson */
  await ev(function () { localStorage.setItem('e4.explain.lvl', 'B1'); });
  await openLesson('u5w1s2'); await wait(100);
  await p.screenshot({ path: OUT + '/lesson-b1.png', fullPage: true });
  await ev(function () { window.__plays = []; window.__synth = 0; });
  await p.click('#p-say'); await wait(700);
  var st = await ev(function () { var a = Reader.state(); return { state: a.state, i: a.i, n: a.parts.length, plays: window.__plays.slice(), synth: window.__synth, reading: !!document.querySelector('#view-play .reading'), bar: !document.getElementById('reader-bar').hidden, lbl: document.querySelector('#p-say .lsay-lbl').textContent }; });
  check(st.state === 'playing', 'Listen did not start playing: ' + st.state);
  check(st.plays.length >= 1 && /audio\/lessons\/[0-9a-f]{8}\.mp3$/.test(st.plays[0]), 'Listen did not play a recorded MP3: ' + st.plays[0]);
  check(st.synth === 0, 'browser voice used ' + st.synth + ' times');
  check(st.reading, 'no part highlighted'); check(st.bar, 'player bar not shown'); check(st.lbl === 'Pause', 'button label ' + st.lbl);
  await p.screenshot({ path: OUT + '/lesson-playing.png' });
  await p.click('#p-say'); await wait(200);
  st = await ev(function () { return { state: Reader.state().state, paused: Reader.state().el && Reader.state().el.paused, lbl: document.querySelector('#p-say .lsay-lbl').textContent }; });
  check(st.state === 'paused' && st.paused && st.lbl === 'Resume', 'second tap did not pause: ' + JSON.stringify(st));
  await p.screenshot({ path: OUT + '/lesson-paused.png' });
  await p.click('#rd-toggle'); await wait(300);
  check((await ev(function () { return Reader.state().state; })) === 'playing', 'bar did not resume');
  await p.click('#rd-next'); await wait(300);
  st = await ev(function () { return { i: Reader.state().i, hl: [].indexOf.call(document.querySelectorAll('#view-play .prose p'), document.querySelector('#view-play .prose p.reading')) }; });
  check(st.i === 1 && st.hl === 0, 'next did not move to paragraph 1: ' + JSON.stringify(st));
  /* step to the end quickly by firing ended */
  for (var k = 0; k < 40; k++) { var more = await ev(function () { var a = Reader.state(); if (a.state === 'idle') return false; a.el.dispatchEvent(new Event('ended')); return true; }); if (!more) break; await wait(30); }
  check((await ev(function () { return Reader.state().state; })) === 'idle', 'reading did not finish after the last part');
  await p.click('#p-say'); await wait(300); await p.click('#rd-stop'); await wait(150);
  st = await ev(function () { return { state: Reader.state().state, bar: document.getElementById('reader-bar').hidden, hl: !!document.querySelector('.reading') }; });
  check(st.state === 'idle' && st.bar && !st.hl, 'stop did not stop: ' + JSON.stringify(st));
  /* level change stops reading and re-renders */
  await p.click('#p-say'); await wait(300); await p.click('#view-play [data-xlvl="C1"]'); await wait(200);
  check((await ev(function () { return Reader.state().state; })) === 'idle', 'level change did not stop reading');
  check((await ev(function () { return localStorage.getItem('e4.explain.lvl'); })) === 'C1', 'level not saved');
  /* leaving the lesson stops reading */
  await p.click('#p-say'); await wait(300); await p.click('#p-back'); await wait(150);
  check((await ev(function () { return Reader.state().state; })) === 'idle', 'back did not stop reading');
  /* fallback for an unrecorded text */
  await ev(function () { window.__synth = 0; Reader.read([{ text: 'A sentence that was never recorded ' + Date.now() }], { owner: 'x' }); });
  await wait(200);
  check((await ev(function () { return window.__synth; })) === 1, 'unrecorded text did not fall back to the browser voice');
  await ev(function () { Reader.stop(); });
  /* settings picker */
  await p.click('.nav button[data-view="settings"]'); await wait(150);
  await p.click('#view-settings [data-xlvl="B2"]'); await wait(150);
  check((await ev(function () { return localStorage.getItem('e4.explain.lvl') + '|' + document.querySelector('#view-settings .lvl-btn.on').textContent; })) === 'B2|B2', 'settings picker failed');
  await p.screenshot({ path: OUT + '/settings-level.png', fullPage: true });

  /* phone width, light and dark, bar open */
  for (var scheme of ['light', 'dark']) {
    await p.emulateMedia({ colorScheme: scheme });
    await p.setViewportSize({ width: 390, height: 844 });
    await openLesson('u6g2s1'); await wait(100);
    await p.click('#p-say'); await wait(500); await p.click('#p-say'); await wait(150);
    var ov = await ev(function () { return document.documentElement.scrollWidth - window.innerWidth; });
    check(ov <= 0, scheme + ' 390px: horizontal overflow ' + ov + 'px');
    await p.screenshot({ path: OUT + '/phone-' + scheme + '.png', fullPage: false });
    await ev(function () { Reader.stop(); });
  }
  check(!errors.length, 'page errors: ' + errors.slice(0, 5).join(' | '));
  console.log(notes.join('\n'));
  console.log(fails.length ? 'FAILS (' + fails.length + '):\n' + fails.slice(0, 60).join('\n') : 'ALL CHECKS PASSED');
  await browser.close(); srv.kill(); process.exit(fails.length ? 1 : 0);
})().catch(function (e) { console.error(e); srv.kill(); process.exit(2); });
