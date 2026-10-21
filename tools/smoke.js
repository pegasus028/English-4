/* Smoke test: serve the folder, log in offline, visit every view, open a
   module, answer, run an exit ticket, and screenshot. Run:
     NODE_PATH=$(npm root -g) node tools/smoke.js
   Needs: python3 -m http.server 8765 running in the app folder (the script
   starts one itself). */
'use strict';
var pw = require('playwright'), cp = require('child_process'), path = require('path'), fs = require('fs');
var ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'tools', 'shots'); if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);
var srv = cp.spawn('python3', ['-m', 'http.server', '8765'], { cwd: ROOT, stdio: 'ignore' });
function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
(async function () {
  await wait(800);
  var browser;
  try { browser = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--autoplay-policy=no-user-gesture-required'] }); }
  catch (e) { browser = await pw.chromium.launch(); }
  var errors = [];
  var ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  var page = await ctx.newPage();
  page.on('pageerror', function (e) { errors.push('pageerror: ' + e.message); });
  page.on('console', function (m) { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto('http://localhost:8765/index.html');
  await page.evaluate(function () { localStorage.setItem('mc.apiUrl', 'off'); });
  await page.reload();
  await page.screenshot({ path: OUT + '/01-login.png' });
  await page.selectOption('#f-pick', '51288');
  await page.fill('#f-pw', 'test1234');
  await page.click('#btn-go');
  await page.waitForSelector('#screen-app:not(.hidden)');
  await wait(400);
  await page.screenshot({ path: OUT + '/02-plan.png', fullPage: true });
  for (var v of ['map', 'write', 'revise', 'vids', 'pods', 'faults', 'record', 'settings']) {
    await page.click('.nav button[data-view="' + v + '"]'); await wait(300);
    await page.screenshot({ path: OUT + '/view-' + v + '.png', fullPage: true });
  }
  /* open a module and answer every question */
  await page.click('.nav button[data-view="map"]'); await wait(200);
  await page.click('[data-sys="u5g"]'); await wait(200);
  await page.click('[data-lvl="u5g1"]'); await wait(200);
  await page.click('[data-sub="u5g1s1"]'); await wait(300);
  await page.screenshot({ path: OUT + '/03-theory.png', fullPage: true });
  await page.click('#p-start'); await wait(300);
  for (var i = 0; i < 6; i++) {
    var opt = await page.$('.opt'); if (!opt) break;
    await opt.click(); await page.click('#p-check'); await wait(150);
    if (i === 0) await page.screenshot({ path: OUT + '/04-question.png', fullPage: true });
    await page.click('#p-check'); await wait(150);
  }
  await page.screenshot({ path: OUT + '/05-result.png', fullPage: true });
  /* exit ticket from the plan */
  await page.click('.nav button[data-view="plan"]'); await wait(200);
  var more = await page.$('#class-more'); if (more) { await more.click(); await wait(200); }
  var ex = await page.$('[data-exit]');
  if (ex) { await ex.click(); await wait(300); await page.screenshot({ path: OUT + '/06-exit.png', fullPage: true }); }
  /* triage */
  await page.click('.nav button[data-view="plan"]'); await wait(200);
  var sim = await page.$('[data-sim]');
  if (sim) { await sim.click(); await wait(200); await page.click('#sim-start'); await wait(300); await page.screenshot({ path: OUT + '/07-exam.png', fullPage: true }); }
  /* phone width */
  await page.setViewportSize({ width: 390, height: 844 });
  await page.click('.nav button[data-view="plan"]'); await wait(300);
  var overflow = await page.evaluate(function () { return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1; });
  await page.screenshot({ path: OUT + '/08-phone-plan.png', fullPage: true });
  await page.click('.nav button[data-view="write"]'); await wait(300);
  await page.screenshot({ path: OUT + '/09-phone-write.png', fullPage: true });
  console.log('horizontal overflow at 390px:', overflow);
  console.log('errors:', errors.length ? errors : 'none');
  await browser.close();
  srv.kill();
  process.exit(errors.length ? 1 : 0);
})().catch(function (e) { console.error(e); srv.kill(); process.exit(1); });
