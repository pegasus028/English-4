/* End-to-end rehearsal of the Writing Room in local mode (no server):
   teacher tab creates a session and imports prompts; two students join,
   write, one tries to paste and leaves the page; teacher starts the review;
   students review each other; teacher ends; a student publishes; teacher
   opens the detail and the replay. Screenshots in tools/shots/.
     NODE_PATH=$(npm root -g) node tools/e2e-write.js */
'use strict';
var pw = require('playwright'), cp = require('child_process'), path = require('path'), fs = require('fs');
var ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'tools', 'shots'); if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);
var srv = cp.spawn('python3', ['-m', 'http.server', '8766'], { cwd: ROOT, stdio: 'ignore' });
function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
var BASE = 'http://localhost:8766/';
var errors = [], checks = [];
function check(name, ok) { checks.push((ok ? 'PASS ' : 'FAIL ') + name); if (!ok) errors.push('check failed: ' + name); }

(async function () {
  await wait(800);
  var browser;
  try { browser = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }); }
  catch (e) { browser = await pw.chromium.launch(); }
  var ctx = await browser.newContext({ viewport: { width: 1100, height: 800 } });
  function track(page) { page.on('pageerror', function (e) { errors.push('pageerror: ' + e.message); }); page.on('console', function (m) { if (m.type() === 'error') errors.push('console: ' + m.text()); }); }

  /* ---- teacher */
  var t = await ctx.newPage(); track(t);
  await t.goto(BASE + 'teacher.html');
  await t.evaluate(function () { localStorage.setItem('mc.apiUrl', 'off'); localStorage.removeItem('e4.write.v1'); });
  await t.reload();
  await t.fill('#url', ''); await t.fill('#pin', '1234'); await t.click('#gate-go');
  await t.waitForSelector('#app:not(.hidden)');
  await t.click('.ttab[data-tab="write"]'); await wait(300);
  var matrix = fs.readFileSync(path.join(ROOT, 'prompts', 'U5-W1.sample.json'), 'utf8');
  await t.fill('#pm-json', matrix); await t.click('#pm-go'); await wait(300);
  await t.fill('#ns-name', 'Newsroom Desk · L3 rehearsal');
  await t.selectOption('#ns-write', 'U5-W1');
  await t.fill('#ns-min', '1');
  await t.click('#ns-go'); await wait(500);
  var code = await t.textContent('.wr-code');
  check('session created with a 4-digit code', /^\d{4}$/.test(code.trim()));
  await t.screenshot({ path: OUT + '/w01-teacher-lobby.png', fullPage: true });

  /* ---- two students (same context = same localStorage) */
  async function student(id, pw) {
    var p = await ctx.newPage(); track(p);
    await p.goto(BASE + 'index.html');
    await p.selectOption('#f-pick', id); await p.fill('#f-pw', pw); await p.click('#btn-go');
    await p.waitForSelector('#screen-app:not(.hidden)');
    await p.click('.nav button[data-view="write"]'); await wait(200);
    await p.fill('#wr-code', code.trim()); await p.click('#wr-go'); await wait(500);
    return p;
  }
  var s1 = await student('51288', 'alyn1234');   /* Alyn, band 1, has a prompt */
  var s2 = await student('51076', 'praw1234');   /* Prawfah, band 3, has a prompt */
  check('student 1 in the lobby', !!(await s1.$('.wr-lobby')));
  await s1.screenshot({ path: OUT + '/w02-student-lobby.png', fullPage: true });
  await wait(600);
  await t.evaluate(function () { return true; });
  var joined = await t.evaluate(function () { return document.querySelectorAll('.wr-card').length; });
  await wait(5200); joined = await t.evaluate(function () { return document.querySelectorAll('.wr-card').length; });
  check('teacher sees 2 joined cards', joined === 2);

  /* ---- start */
  t.once('dialog', function (d) { d.accept(); });
  await t.click('[data-op="start"]'); await wait(800);
  await wait(10500); /* students heartbeat every 10 s */
  check('student 1 sees her prompt', !!(await s1.$('.wr-prompt')));
  var angle = await s1.textContent('.wr-prompt h3');
  check('prompt is Alyn\'s (Breaking News)', /tense for each event/.test(angle));
  var angle2 = await s2.textContent('.wr-prompt h3');
  check('prompt is Prawfah\'s (Human Interest)', /human-interest/.test(angle2));
  await s1.screenshot({ path: OUT + '/w03-student-live.png', fullPage: true });

  /* ---- type (real key events), mark a structure, try a paste, go away */
  var text1 = 'All 50 districts have been declared disaster areas. Almost 4,900 people have been evacuated to shelters, and roads were left submerged for days. Discharges from the dam were being increased overnight. It is reported that relief is still being delivered after the prolonged flooding, which officials hope to mitigate next year.';
  await s1.click('#wr-box');
  await s1.keyboard.type(text1, { delay: 4 });
  /* select "have been declared" and mark it */
  await s1.evaluate(function () { var b = document.getElementById('wr-box'); var i = b.value.indexOf('have been declared'); b.setSelectionRange(i, i + 'have been declared'.length); });
  await s1.click('#wr-mark'); await wait(100);
  check('one structure marked', (await s1.textContent('#wr-marks')) === '1');
  /* a paste attempt */
  await s1.evaluate(function () { var b = document.getElementById('wr-box'); b.focus(); var ev = new ClipboardEvent('paste', { bubbles: true, cancelable: true }); b.dispatchEvent(ev); });
  await wait(100);
  check('paste blocked and counted', /1/.test(await s1.textContent('.wr-counter')));
  /* leave the page for 1.5 s */
  await s1.evaluate(function () { Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  await wait(1500);
  await s1.evaluate(function () { Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  await wait(200);
  check('exit counted', /1exits/.test((await s1.textContent('.wr-counter')).replace(/\s+/g, '')));
  await s1.screenshot({ path: OUT + '/w04-student-writing.png', fullPage: true });

  await s2.click('#wr-box');
  await s2.keyboard.type('The Srisuk family was cut off for a week. They were given food by neighbours and have been left without power. A new fridge was given to the family by a charity in these trying times. They were displaced but resilient, and relief arrived.', { delay: 2 });

  /* ---- submit both */
  s1.once('dialog', function (d) { d.accept(); });
  await s1.click('#wr-submit'); await wait(600);
  check('student 1 sees a receipt', !!(await s1.$('.wr-receipt')));
  await s1.screenshot({ path: OUT + '/w05-receipt.png', fullPage: true });
  s2.once('dialog', function (d) { d.accept(); });
  await s2.click('#wr-submit'); await wait(600);

  /* ---- teacher: review */
  await wait(5200);
  await t.screenshot({ path: OUT + '/w06-teacher-live.png', fullPage: true });
  var subs = await t.evaluate(function () { return document.querySelectorAll('#wr-subs tr.r').length; });
  check('teacher sees 2 submissions', subs === 2);
  t.once('dialog', function (d) { d.accept(); });
  await t.click('[data-op="review"]'); await wait(800);
  await wait(10500);
  check('student 1 sees partner draft', !!(await s1.$('#wr-partner')));
  await s1.selectOption('#rv1', 'some'); await s1.selectOption('#rv2', 'yes'); await s1.selectOption('#rv3', '4');
  await s1.fill('#rv4', 'A new fridge was given to the family by a charity — put the family first: The family was given a new fridge by a charity.');
  await s1.click('#wr-send-review'); await wait(400);
  await s1.screenshot({ path: OUT + '/w07-review-sent.png', fullPage: true });
  await s2.selectOption('#rv1', 'all'); await s2.selectOption('#rv2', 'partly'); await s2.selectOption('#rv3', '4');
  await s2.fill('#rv4', 'roads were left submerged for days — maybe past perfect: had been left.');
  await s2.click('#wr-send-review'); await wait(400);

  /* ---- end */
  t.once('dialog', function (d) { d.accept(); });
  await t.click('[data-op="end"]'); await wait(800);
  await wait(10500);
  check('student 1 sees session ended', /Session ended/.test(await s1.textContent('#view-write')));
  await s1.click('#wr-home'); await wait(500);
  check('piece listed on the home screen', !!(await s1.$('[data-publish]')));
  await s1.click('[data-publish]'); await wait(300);
  await s1.fill('#wr-pubtext', text1 + ' The city has promised that the canals will be cleared before the next rainy season.');
  await wait(100);
  var ret = await s1.textContent('#wr-ret');
  check('retention shown ≥ 80%', /\b(8\d|9\d|100)%/.test(ret));
  await s1.screenshot({ path: OUT + '/w08-publish.png', fullPage: true });
  await s1.click('#wr-pubgo'); await wait(500);

  /* ---- teacher detail + replay */
  await wait(5200);
  await t.click('#wr-subs tr.r'); await wait(500);
  check('detail shows the draft', !!(await t.$('#wr-detail .wr-read')));
  check('replay mounted', !!(await t.$('#rp-play')));
  await t.selectOption('#rp-speed', '64'); await t.click('#rp-play'); await wait(2500);
  var rp = await t.textContent('#rp-text');
  check('replay reproduces typed text', rp.indexOf('disaster areas') >= 0);
  await t.screenshot({ path: OUT + '/w09-teacher-detail.png', fullPage: true });
  await t.click('#wr-csv'); await wait(300);

  console.log(checks.join('\n'));
  console.log('errors:', errors.length ? errors : 'none');
  await browser.close(); srv.kill();
  process.exit(errors.length ? 1 : 0);
})().catch(function (e) { console.error(e); console.log(checks.join('\n')); srv.kill(); process.exit(1); });
