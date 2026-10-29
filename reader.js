/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — reader.js
   Read-aloud for the lessons: recorded Microsoft Sonia (en-GB) MP3s, with the
   browser's own voice only as a fallback. One player for the whole app:
   a queue of parts (the key sentence, each paragraph, each example), ONE shared
   <audio> element (iPad Safari blocks a fresh Audio() started outside a tap, so
   chained parts would stop), pause / resume / stop, previous / next part,
   a "Slower" option, a player bar at the bottom of the screen, and the part
   being read highlighted on the page.

   Keys: ttsKey(ttsNorm(speechText(text))) from tts-clean.js — the same function
   tools/lesson-tts-list.js uses when recording, so keys never drift.
   Manifest: window.E4_LESSON_AUDIO (lesson-audio.js, written by
   tools/make-lesson-audio.py).

   window.Reader = { read(parts, opts), toggle(owner, start), stop(), paint() }
   parts: [{ text, el }]  opts: { owner, label }
   =========================================================================== */
(function () {
  'use strict';
  var A = window.E4_LESSON_AUDIO || {}, DIR = A.dir || 'audio/lessons/', HAVE = {};
  (A.keys || []).forEach(function (k) { HAVE[k] = 1; });
  var say = function (raw) { return window.ttsNorm(window.speechText(raw)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  function slow() { try { return localStorage.getItem('e4.read.slow') === '1'; } catch (e) { return false; } }
  function setSlow(on) { try { localStorage.setItem('e4.read.slow', on ? '1' : '0'); } catch (e) {} if (RD.el) RD.el.playbackRate = on ? 0.85 : 1; }

  /* the fallback voice: Sonia if the device has her, then a British female voice */
  function pickVoice() {
    var vs = []; try { vs = window.speechSynthesis.getVoices() || []; } catch (e) { return null; }
    var gb = vs.filter(function (v) { return /en[-_]GB/i.test(v.lang); });
    return gb.filter(function (v) { return /sonia/i.test(v.name); })[0] || vs.filter(function (v) { return /sonia/i.test(v.name); })[0] ||
      gb.filter(function (v) { return /libby|maisie|hollie|serena|kate|female|google uk english female/i.test(v.name); })[0] || gb[0] || null;
  }
  try { if (window.speechSynthesis) { speechSynthesis.getVoices(); speechSynthesis.addEventListener('voiceschanged', pickVoice); } } catch (e) {}

  var RD = { parts: [], i: 0, state: 'idle', owner: '', label: '', gen: 0, synth: false, el: null };
  function audio() { if (!RD.el) { try { RD.el = new Audio(); RD.el.preload = 'auto'; } catch (e) { RD.el = null; } } return RD.el; }
  function mark(on) { var p = RD.parts[RD.i]; if (p && p.el) p.el.classList.toggle('reading', on); }
  function synth(text, gen) {
    try {
      var u = new SpeechSynthesisUtterance(text); u.lang = 'en-GB'; u.rate = 0.9 * (slow() ? 0.9 : 1);
      var v = pickVoice(); if (v) { u.voice = v; u.lang = v.lang; }
      u.onend = function () { if (gen === RD.gen) next(); };
      u.onerror = function (e) { if (gen === RD.gen && e.error !== 'interrupted' && e.error !== 'canceled') next(); };
      RD.synth = true; speechSynthesis.cancel(); speechSynthesis.speak(u);
    } catch (e) { stop(); }
  }
  function play() {
    var gen = RD.gen, part = RD.parts[RD.i]; if (!part) return finish();
    mark(true); RD.state = 'playing'; RD.synth = false; paint();
    if (part.el) { var r = part.el.getBoundingClientRect(); if (r.top < 90 || r.bottom > window.innerHeight - 100) part.el.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
    var k = window.ttsKey(part.text), a = HAVE[k] ? audio() : null;
    if (!a) return synth(part.text, gen);
    var fell = false;
    var fallback = function () { if (fell || gen !== RD.gen) return; fell = true; synth(part.text, gen); };
    a.onended = function () { if (gen === RD.gen && !RD.synth) next(); };
    a.onerror = fallback;
    try {
      a.src = DIR + k + '.mp3'; a.playbackRate = slow() ? 0.85 : 1;
      var pr = a.play(); if (pr && pr.catch) pr.catch(function (e) { if (!e || e.name !== 'AbortError') fallback(); });
    } catch (e) { fallback(); }
  }
  function next() { mark(false); RD.i++; if (RD.i < RD.parts.length) play(); else finish(); }
  function finish() { mark(false); RD.gen++; RD.state = 'idle'; RD.owner = ''; RD.parts = []; paint(); }
  function halt() { try { if (RD.el) { RD.el.onended = RD.el.onerror = null; RD.el.pause(); } if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {} }
  function read(parts, opts) {
    opts = opts || {}; stop();
    RD.parts = (parts || []).map(function (p) { return { text: say(p.text), el: p.el || null }; }).filter(function (p) { return p.text; });
    if (!RD.parts.length) return;
    RD.i = 0; RD.gen++; RD.owner = opts.owner || 'read'; RD.label = opts.label || '';
    play();
  }
  function pause() { if (RD.state !== 'playing') return; RD.state = 'paused'; try { if (RD.synth) speechSynthesis.pause(); else if (RD.el) RD.el.pause(); } catch (e) {} paint(); }
  function resume() {
    if (RD.state !== 'paused') return; RD.state = 'playing';
    try { if (RD.synth) speechSynthesis.resume(); else if (RD.el) { var p = RD.el.play(); if (p && p.catch) p.catch(function () {}); } } catch (e) {}
    paint();
  }
  function stop() { halt(); mark(false); RD.gen++; RD.state = 'idle'; RD.owner = ''; RD.parts = []; RD.synth = false; paint(); }
  function skip(d) { if (RD.state === 'idle') return; var j = RD.i + d; if (j < 0 || j >= RD.parts.length) return; halt(); mark(false); RD.gen++; RD.i = j; play(); }
  /* one button: play, then pause / resume while it owns the player */
  function toggle(owner, start) {
    if (RD.owner === owner && RD.state === 'playing') return pause();
    if (RD.owner === owner && RD.state === 'paused') return resume();
    start();
  }

  function paint() {
    document.querySelectorAll('[data-rd]').forEach(function (b) {
      var st = b.getAttribute('data-rd') === RD.owner ? RD.state : 'idle';
      b.classList.toggle('playing', st === 'playing'); b.classList.toggle('paused', st === 'paused');
      var ic = b.querySelector('.lsay-ico'), lb = b.querySelector('.lsay-lbl');
      if (ic) ic.textContent = st === 'playing' ? '❚❚' : '▶';
      if (lb) lb.textContent = st === 'playing' ? 'Pause' : st === 'paused' ? 'Resume' : (b.getAttribute('data-label') || 'Listen');
      b.setAttribute('aria-label', st === 'playing' ? 'Pause reading' : st === 'paused' ? 'Resume reading' : 'Listen to this lesson read aloud');
    });
    var bar = document.getElementById('reader-bar'); if (!bar) return;
    var on = RD.state !== 'idle';
    document.body.classList.toggle('reader-on', on);
    if (!on) { bar.hidden = true; bar.innerHTML = ''; return; }
    bar.hidden = false;
    var n = RD.parts.length;
    bar.innerHTML = '<div class="rd-in"><span class="rd-wave' + (RD.state === 'playing' ? ' on' : '') + '" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' +
      '<div class="rd-txt"><b>' + esc(RD.label || 'Reading aloud') + '</b><span>' + (RD.state === 'paused' ? 'Paused' : 'Sonia is reading') + (n > 1 ? ' · part ' + (RD.i + 1) + ' of ' + n : '') + '</span></div>' +
      (n > 1 ? '<button class="rd-btn" id="rd-prev" aria-label="Previous part"' + (RD.i === 0 ? ' disabled' : '') + '>⏮</button>' : '') +
      '<button class="rd-btn main" id="rd-toggle" aria-label="' + (RD.state === 'playing' ? 'Pause' : 'Resume') + '">' + (RD.state === 'playing' ? '❚❚' : '▶') + '</button>' +
      (n > 1 ? '<button class="rd-btn" id="rd-next" aria-label="Next part"' + (RD.i >= n - 1 ? ' disabled' : '') + '>⏭</button>' : '') +
      '<button class="rd-btn" id="rd-stop" aria-label="Stop reading">■</button></div>';
    document.getElementById('rd-toggle').onclick = function () { if (RD.state === 'playing') pause(); else resume(); };
    document.getElementById('rd-stop').onclick = stop;
    var pv = document.getElementById('rd-prev'), nx = document.getElementById('rd-next');
    if (pv) pv.onclick = function () { skip(-1); };
    if (nx) nx.onclick = function () { skip(1); };
  }

  window.addEventListener('hashchange', stop);
  document.addEventListener('visibilitychange', function () { if (document.hidden && RD.synth) pause(); });

  window.Reader = { read: read, toggle: toggle, stop: stop, pause: pause, resume: resume, skip: skip, paint: paint,
    slow: slow, setSlow: setSlow, has: function (raw) { return !!HAVE[window.ttsKey(say(raw))]; }, state: function () { return RD; } };
})();
