/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — student.js
   The student console. Built on the Mission Control / Fine Tuning engine;
   the Writing Room (guided in-class writing) lives in write.js and is
   mounted into #view-write from here.
   =========================================================================== */
(function () {
  'use strict';
  var C = window.CONTENT, E = window.Engine, P = E.Progress, api = window.API;
  var $ = function (s) { return document.querySelector(s); };
  var esc = E.esc;

  var S = {
    p: null,
    sessItems: 0, sessCorrect: 0,
    run: null,          /* practice run */
    exam: null,         /* mock paper run */
    simple: false,
    sysOpen: null, lvlOpen: null, mapPainted: false, planReturn: false, celebrateTimer: null
  };

  /* ------------------------------------------------------------- helpers */
  function toast(msg, ms) {
    $('#toast-slot').innerHTML = '<div class="toast">' + esc(msg) + '</div>';
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { $('#toast-slot').innerHTML = ''; }, ms || 2600);
  }
  function modal(html) {
    var slot = $('#modal-slot');
    slot.innerHTML = '<div class="modal"><div class="modal-card">' + html + '</div></div>';
    slot.querySelector('.modal').addEventListener('click', function (ev) {
      if (ev.target === this) slot.innerHTML = '';
    });
    var b = slot.querySelector('[data-close]');
    if (b) b.addEventListener('click', function () { slot.innerHTML = ''; });
  }
  function pct(x) { return Math.round((x || 0) * 100); }
  function mmss(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  /* --------------------------------------------------------------- sync */
  function sync() {
    if (!S.p) return Promise.resolve();
    S.p._readiness = P.readiness(S.p);
    S.p._rank = P.rank(S.p).name;
    return api.save(S.p).catch(function () { return { ok: false }; });
  }
  var syncSoon = (function () {
    var t;
    return function () { clearTimeout(t); t = setTimeout(sync, 10000); };
  })();

  /* Students are never shown connection state. A dropped network is not their
     problem to solve: answers queue on the device the moment they are given,
     the app retries on its own, and a genuine outage surfaces on the teacher
     console where it belongs. Settings names the backlog if anyone looks. */
  api.onModeChange = function () {};
  setInterval(function () {
    if (!S.p) return;
    if (api.mode !== 'cloud') api.retryCloud();
    if (api.pendingCount()) sync();
  }, 15000);

  /* =====================================================================
     LOGIN
     ===================================================================== */
  var mode = 'in';
  function setMode(m) {
    mode = m;
    $('#tab-fast').classList.toggle('on', m === 'fast');
    $('#tab-in').classList.toggle('on', m === 'in');
    $('#tab-new').classList.toggle('on', m === 'new');
    $('#wrap-pick').classList.toggle('hidden', m !== 'fast');
    $('#wrap-id').classList.toggle('hidden', m === 'fast');
    $('#wrap-name').classList.toggle('hidden', m !== 'new');
    $('#btn-go').textContent = m === 'in' ? 'Log in' :
      m === 'new' ? 'Create my account' : 'Go';
    $('#f-pw').setAttribute('autocomplete', m === 'in' ? 'current-password' : 'new-password');
    $('#f-pw').setAttribute('placeholder', m === 'in'
      ? 'The password you chose'
      : 'Choose something you will remember');
    $('#login-tip').textContent = m === 'fast'
      ? 'Pick your name, then set a password the first time. After that it is the password you sign in with. Your teacher never sees it.'
      : 'Your ID and password are yours to choose. Your teacher can see your progress, never your password.';
    say('');
  }

  /* The class list, filled once from roster.js. Sorted by nickname, because a
     student is looking for their own name, not their number — and the number
     rides alongside so the two Plearns can tell themselves apart. */
  (function fillRoster() {
    var sel = $('#f-pick'), tab = $('#tab-fast');
    var list = (typeof ROSTER !== 'undefined' && ROSTER) ? ROSTER.slice() : [];
    if (!sel || !tab) return;
    if (!list.length) { tab.classList.add('hidden'); return; }
    if (typeof ROSTER_CLASS !== 'undefined' && ROSTER_CLASS) {
      tab.textContent = ROSTER_CLASS.replace(/^M\./, '') + ' Fast Access';
    }
    list.sort(function (a, b) {
      var x = String(a.name).toLowerCase(), y = String(b.name).toLowerCase();
      return x < y ? -1 : x > y ? 1 : (a.id < b.id ? -1 : 1);
    });
    var seen = {};
    list.forEach(function (r) { seen[r.name] = (seen[r.name] || 0) + 1; });
    list.forEach(function (r) {
      var o = document.createElement('option');
      o.value = String(r.id).toLowerCase();
      /* Only the students who share a nickname need their number showing. */
      o.textContent = seen[r.name] > 1 ? r.name + '  \u00b7  ' + r.id : r.name;
      o.dataset.name = r.name;
      sel.appendChild(o);
    });
  })();

  function say(text, bad) {
    var m = $('#login-msg');
    m.className = 'msg ' + (bad ? 'bad' : 'info') + (text ? '' : ' hidden');
    m.textContent = text;
  }
  $('#tab-fast').addEventListener('click', function () { setMode('fast'); });
  $('#tab-in').addEventListener('click', function () { setMode('in'); });
  $('#tab-new').addEventListener('click', function () { setMode('new'); });

  function go() {
    var pick = $('#f-pick');
    var fast = mode === 'fast';
    var id = fast ? pick.value : $('#f-id').value.trim().toLowerCase();
    var pw = $('#f-pw').value;
    var name = fast
      ? (pick.selectedIndex > 0 ? pick.options[pick.selectedIndex].dataset.name : '')
      : $('#f-name').value.trim();

    if (fast && !id) return say('Find your name in the list first.', true);
    if (!id) return say('Enter a student ID.', true);
    if (!/^[a-z0-9._-]{3,24}$/.test(id)) return say('Use 3-24 letters, numbers, dots or dashes, with no spaces.', true);
    if (pw.length < 4) return say('Your password needs at least 4 characters.', true);
    if (mode === 'new' && !name) return say('Enter the name your teacher will see.', true);

    $('#btn-go').disabled = true;
    say(mode === 'new' ? 'Creating your account\u2026' : 'Checking\u2026');
    var slow = setTimeout(function () {
      say('Still working \u2014 the class server is waking up. This can take a few seconds.');
    }, 4000);

    function done(r) {
      clearTimeout(slow);
      $('#btn-go').disabled = false;
      start(r.progress || P.blank(id, name || id));
    }
    function failed(msg) {
      clearTimeout(slow);
      $('#btn-go').disabled = false;
      say(msg || 'Something went wrong. Try again.', true);
    }
    function crashed(e) {
      clearTimeout(slow);
      $('#btn-go').disabled = false;
      say('Could not reach the server: ' + e.message, true);
    }

    /* Fast Access does not ask a student whether this is their first time \u2014
       they should not have to know. Try to sign them in; if there is no
       account yet, make one under the nickname the roster holds. If both
       fail, the sign-in error is the truthful one to show: it means the
       account exists and the password was wrong. */
    if (fast) {
      api.login(id, pw).then(function (r) {
        if (r && r.ok) return done(r);
        api.register(id, pw, name).then(function (r2) {
          if (r2 && r2.ok) return done(r2);
          failed((r && r.error) || (r2 && r2.error));
        }).catch(crashed);
      }).catch(crashed);
      return;
    }

    var req = mode === 'new' ? api.register(id, pw, name) : api.login(id, pw);
    req.then(function (r) {
      if (!r || !r.ok) return failed(r && r.error);
      done(r);
    }).catch(crashed);
  }
  $('#btn-go').addEventListener('click', go);
  ['f-id', 'f-pw', 'f-name'].forEach(function (k) {
    $('#' + k).addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
  });
  /* Picking a name should land on the password box, not leave a student
     hunting for the next thing to tap. */
  $('#f-pick').addEventListener('change', function () {
    say('');
    if (this.value) $('#f-pw').focus();
  });

  /* =====================================================================
     START
     ===================================================================== */
  function start(progress) {
    S.p = progress;
    if (window.WriteRoom) window.WriteRoom.setStudent(S.p);
    if (!S.p.stats) S.p.stats = { seen: 0, correct: 0, byTag: {} };
    if (!S.p.review) S.p.review = {};
    if (!S.p.badges) S.p.badges = [];
    if (!S.p.subs) S.p.subs = {};
    if (!S.p.checks) S.p.checks = {};
    if (!S.p.mocks) S.p.mocks = {};
    if (!S.p.media) S.p.media = {};
    var newDay = P.touchDay(S.p);
    $('#screen-login').classList.add('hidden');
    $('#screen-app').classList.remove('hidden');
    paintHeader();
    /* A link may name the screen to open: index.html#pods drops a student
       straight on the episodes without passing the route screen first. */
    var want = String(location.hash || '').replace('#', '');
    show(VIEWS.indexOf(want) >= 0 ? want : 'plan');
    api.startSession(S.p.studentId);
    var earned = P.checkBadges(S.p);
    sync();
    if (newDay && S.p.streak > 1) toast('Day ' + S.p.streak + ' in a row. Keep the streak alive.');
    if (earned.length) S.celebrateTimer = setTimeout(function () { celebrate(earned[0]); }, 900);
  }

  function logout() {
    if (S.exam && !confirm('You are in the middle of a test. Leaving now will lose it. Log out anyway?')) return;
    if (window.WriteRoom && window.WriteRoom.state.session && !confirm('You are in a writing session. Logging out leaves it. Continue?')) return;
    api.endSession(S.p.studentId, S.sessItems, S.sessCorrect);
    sync().then(function () { api.clearToken(); location.reload(); });
  }
  $('#btn-out').addEventListener('click', logout);
  function flushOnExit() {
    if (!S.p) return;
    api.endSession(S.p.studentId, S.sessItems, S.sessCorrect);
    if (!api.flushBeacon(S.p)) sync();
  }
  window.addEventListener('pagehide', flushOnExit);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && S.p && api.pendingCount()) api.flushBeacon(S.p);
  });

  /* ----------------------------------------------------------- header UI */
  function paintHeader() {
    var p = S.p, r = P.rank(p), ready = P.readiness(p);
    $('#hdr-name').textContent = p.displayName;
    $('#hdr-rank').textContent = r.name + ' · ' + P.checksCleared(p) + '/' + E.Bank.allLevels().length + ' checks';
    $('#hdr-ready').textContent = ready + '%';
    $('#hdr-bar').style.width = ready + '%';
    $('#hdr-streak').textContent = p.streak || 0;
    $('#hdr-xp').textContent = p.xp || 0;
    var due = P.dueReview(p).length;
    $('#nav-faults').textContent = due ? ' (' + due + ')' : '';
    $('#nav-record').textContent = p.assignment && !p.assignment.done ? ' •' : '';
  }

  /* --------------------------------------------------------------- views */
  var VIEWS = ['plan', 'map', 'play', 'review', 'write', 'revise', 'vids', 'pods', 'faults', 'record', 'settings'];
  function show(v) {
    /* An award card left open would sit on top of whatever comes next and
       swallow every click, so changing view clears it — and cancels any award
       still queued behind it. */
    clearTimeout(S.celebrateTimer);
    $('#modal-slot').innerHTML = '';
    if (v !== 'play') stopBeat();
    VIEWS.forEach(function (x) { $('#view-' + x).classList.toggle('hidden', x !== v); });
    document.querySelectorAll('.nav button[data-view]').forEach(function (b) {
      b.classList.toggle('on', b.dataset.view === v);
    });
    /* Keep the address bar in step, so whatever is on screen can be linked to. */
    try { if (location.hash.replace('#', '') !== v) history.replaceState(null, '', '#' + v); } catch (e) {}
    if (v === 'map') paintMap();
    if (v === 'plan') paintPlan();
    if (v === 'write' && window.WriteRoom) window.WriteRoom.paint();
    if (v === 'revise') paintRevise();
    if (v === 'vids') paintVids();
    if (v === 'pods') paintPods();
    if (v === 'faults') paintFaults();
    if (v === 'record') paintRecord();
    if (v === 'settings') paintSettings();
    window.scrollTo({ top: 0 });
  }
  document.querySelectorAll('.nav button[data-view]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (S.exam && !confirm('Leave the test? Your answers so far will be lost.')) return;
      S.exam = null;
      show(b.dataset.view);
    });
  });

  /* =====================================================================
     THE REVISION SHEET
     Every rule the app tests, on one page, in the order the stages run.
     Seventy-seven principles: about thirty minutes to read the first time
     and five to skim after that. It is the densest thing in the app —
     reading it once is worth more than an hour of clicking, because it
     touches every rule instead of a handful, and every question here is
     multiple choice, so recognising a rule is enough to use it.
     ===================================================================== */
  /* Summary slides sit above the written sheet: the same ground in pictures,
     for a student who will look before they read. They are in the document
     too, so the printed sheet carries them; only the live one is on screen.

     THE LIST IS EMPTY UNTIL THERE ARE SLIDES. To add them, save the images as
     slides/s-01.jpg, s-02.jpg … and write one caption per image below, in
     order. The strip then appears on its own; leave it empty and the revision
     sheet simply starts with the written rules. */
  var RVSLIDES = [
  ];

  function slideStrip() {
    if (!RVSLIDES.length) return '';
    var h = '<section class="rvslides" id="rvslides">' +
      '<div class="rvs-h"><h3>The summary slides</h3>' +
      '<span class="rvs-count" id="rvs-count">1 / ' + RVSLIDES.length + '</span></div>' +
      '<div class="rvs-stage" id="rvs-stage">';
    RVSLIDES.forEach(function (cap, i) {
      var n = (i < 9 ? '0' : '') + (i + 1);
      h += '<figure class="rvs-slide' + (i === 0 ? ' on' : '') + '">' +
        '<img src="slides/s-' + n + '.jpg" alt="' + esc(cap) + '">' +
        '<figcaption>' + esc(cap) + '</figcaption></figure>';
    });
    /* The arrows sit under the picture, not over it: these slides are text,
       and a button parked in the middle of the frame covers a line of it. */
    h += '</div><div class="rvs-bar">' +
      '<button class="rvs-nav" id="rvs-prev" type="button" aria-label="Previous slide">&#8249;</button>' +
      '<div class="rvs-dots" id="rvs-dots">';
    RVSLIDES.forEach(function (cap, i) {
      h += '<button class="rvs-dot' + (i === 0 ? ' on' : '') + '" type="button" data-i="' +
        i + '" aria-label="Slide ' + (i + 1) + ': ' + esc(cap) + '"></button>';
    });
    h += '</div><button class="rvs-nav" id="rvs-next" type="button" aria-label="Next slide">&#8250;</button></div>';
    h += '<p class="rvs-foot">Swipe, or use the arrows. Tap a slide to open it full screen. ' +
      'They all print with the sheet.</p></section>';
    return h;
  }

  function wireSlides() {
    var wrap = $('#rvslides');
    if (!wrap) return;
    var slides = wrap.querySelectorAll('.rvs-slide');
    var dots = wrap.querySelectorAll('.rvs-dot');
    var at = 0;

    function goTo(i) {
      at = (i + slides.length) % slides.length;
      for (var k = 0; k < slides.length; k++) {
        slides[k].className = 'rvs-slide' + (k === at ? ' on' : '');
        dots[k].className = 'rvs-dot' + (k === at ? ' on' : '');
      }
      $('#rvs-count').textContent = (at + 1) + ' / ' + slides.length;
    }

    $('#rvs-prev').addEventListener('click', function () { goTo(at - 1); });
    $('#rvs-next').addEventListener('click', function () { goTo(at + 1); });
    for (var d = 0; d < dots.length; d++) {
      dots[d].addEventListener('click', function () { goTo(Number(this.getAttribute('data-i'))); });
    }
    for (var s = 0; s < slides.length; s++) {
      slides[s].querySelector('img').addEventListener('click', function () {
        modal('<img class="rvs-big" src="' + this.getAttribute('src') + '" alt="">' +
          '<button class="btn sm" data-close style="margin-top:12px">Close</button>');
      });
    }

    /* a thumb dragged across the picture moves a slide, the way a phone
       expects it to */
    var stage = $('#rvs-stage'), x0 = null;
    stage.addEventListener('touchstart', function (ev) { x0 = ev.touches[0].clientX; });
    stage.addEventListener('touchend', function (ev) {
      if (x0 === null) return;
      var dx = ev.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) goTo(dx < 0 ? at + 1 : at - 1);
    });
  }

  function paintRevise() {
    var p = S.p;
    var html = '<div class="sect-h"><div><h2>Revision sheet</h2>' +
      '<p style="color:var(--ink-2);font-size:.92rem;margin-top:4px">Every rule in the app, on one page. ' +
      'Twenty minutes to read, five to skim again in the morning. No questions to answer.</p></div>' +
      '<button class="btn sm" id="rv-print">Print or save</button></div>';

    html += '<div class="rvwrap" id="rvwrap">';

    html += slideStrip();

    /* The six that cost the most: the rules that decide more marks than any
       others, gathered at the top so they are read even by a student who
       skims. Each one also appears again under its own stage. */
    var leadTags = ['deo-negcliff', 'epi-cant', 'dist-core', 'past-needpair', 'dyn-occasion', 'hedge-over'];
    var lead = leadTags.filter(function (tg) { return C.REMEDIATION[tg]; });
    if (lead.length) {
      html += '<section class="rvsec"><h3 class="rvh"><span class="rvh-n">A</span>The six that cost the most</h3>';
      lead.forEach(function (tag) {
        var rem = C.REMEDIATION[tag];
        html += '<div class="rvrule"><b>' + esc(rem.name) + '</b><p>' + rem.principle + '</p></div>';
      });
      html += '</section>';
    }

    /* Then each stage, in order, with the theory key of every module and
       the principle behind every rule it tests. */
    C.TOPICS.forEach(function (t, ti) {
      var mine = {};
      html += '<section class="rvsec"><h3 class="rvh"><span class="rvh-n">' +
        String(ti + 1) + '</span>' + esc(t.name) + '</h3>';
      html += '<p class="rvblurb">' + esc(t.blurb) + '</p>';

      t.levels.forEach(function (lv) {
        html += '<div class="rvlvl"><span class="rvlvl-n">Level ' + lv.n + '</span>' + esc(lv.name) + '</div>';
        lv.subs.forEach(function (sb) {
          var done = (p.subs[sb.id] || {}).best >= E.PASS_SUB;
          html += '<div class="rvkey' + (done ? ' done' : '') + '">' +
            '<b>' + esc(sb.name) + '</b>' + sb.theory.key + '</div>';
          sb.items.forEach(function (it) { mine[it.tag] = 1; });
        });
        lv.check.items.forEach(function (it) { mine[it.tag] = 1; });
      });

      var tags = Object.keys(mine).filter(function (tg) {
        return !!C.REMEDIATION[tg];
      });
      if (tags.length) {
        html += '<div class="rvrules"><span class="rvrules-h">The rules this stage is testing</span>';
        tags.forEach(function (tg) {
          var rem = C.REMEDIATION[tg];
          var st = (p.stats && p.stats.byTag && p.stats.byTag[tg]) || null;
          var shaky = st && st.a >= 2 && (st.c / st.a) < 0.6;
          html += '<div class="rvrule' + (shaky ? ' shaky' : '') + '">' +
            '<b>' + esc(rem.name) + (shaky ? '<span class="rvflag">you have missed this</span>' : '') + '</b>' +
            '<p>' + rem.principle + '</p></div>';
        });
        html += '</div>';
      }
      html += '</section>';
    });

    html += '</div>';
    html += '<p class="tiny" style="margin-top:14px">Anything you have already cleared is greyed. ' +
      'Anything you have got wrong more than once is flagged — read those twice.</p>';

    $('#view-revise').innerHTML = html;
    wireSlides();
    $('#rv-print').addEventListener('click', function () { window.print(); });
  }

  /* =====================================================================
     VIDEOS
     The stage videos, playing inside the app rather than throwing a student
     out to YouTube where the next thing is never grammar. Same shape as the
     podcast screen: the name of the stage and a player, nothing else to read.
     ===================================================================== */
  function paintVids() {
    var p = S.p;
    var withVideo = C.TOPICS.filter(function (t) { return t.video; });
    var html = '<div class="sect-h"><div><h2>Videos</h2>' +
      '<p style="color:var(--ink-2);font-size:.92rem;margin-top:4px">' +
      (withVideo.length
        ? 'Watch a stage explained. They play here — you do not have to leave the app.'
        : 'No videos have been added yet.') +
      '</p></div></div>';

    html += '<div class="vidlist">';
    withVideo.forEach(function (t) {
      var md = (p.media || {})[t.id] || {};
      var id = ytId(t.video);
      html += '<div class="vidrow' + (md.videoOpens ? ' done' : '') + '">' +
        '<h3>' + esc(t.name) + '</h3>' +
        (id
          ? '<div class="ytbox"><iframe loading="lazy" ' +
            'src="https://www.youtube-nocookie.com/embed/' + esc(id) + '?rel=0" ' +
            'title="' + esc(t.name) + '" frameborder="0" allowfullscreen ' +
            'allow="accelerometer; encrypted-media; picture-in-picture" ' +
            'data-vid-topic="' + t.id + '"></iframe></div>'
          : '<p class="tiny">This video could not be read.</p>') +
        '</div>';
    });
    html += '</div>';

    $('#view-vids').innerHTML = html;

    /* An embedded player gives no play event across origins, so count the
       first time a student puts their finger on it. Better an undercount
       than nothing at all. */
    $('#view-vids').querySelectorAll('iframe[data-vid-topic]').forEach(function (f) {
      var once = false;
      f.addEventListener('mouseenter', mark);
      f.addEventListener('touchstart', mark, { passive: true });
      function mark() {
        if (once) return;
        once = true;
        var r = mediaRec(f.dataset.vidTopic);
        r.videoOpens = (r.videoOpens || 0) + 1;
        r.last = new Date().toISOString();
        syncSoon();
      }
    });
  }

  /* =====================================================================
     PODCASTS
     Every stage introduction on one screen, nothing on it but the name and
     a play bar. A student on the bus cannot answer questions; they can
     listen. Plays are tracked exactly as they are on the map, so the
     teacher console still sees who has heard what.
     ===================================================================== */
  function paintPods() {
    var p = S.p;
    var html = '<div class="sect-h"><div><h2>Podcasts</h2>' +
      '<p style="color:var(--ink-2);font-size:.92rem;margin-top:4px">One episode for each grammar point and each word list. ' +
      'Nothing to answer \u2014 put them on for the ride to school.</p></div>' +
      '<a class="btn sm" href="podcasts.html">Open without signing in</a></div>';

    html += '<div class="podlist">';
    /* A stage may carry several episodes: the stage's own `podcast` plus the
       `more` list in media.js (5a, 5b, 5c). All are listened-to under the
       stage's media record. */
    C.TOPICS.forEach(function (t) {
      var st = (typeof MEDIA !== 'undefined' && MEDIA[t.id]) || {};
      var more = (st.more || []).filter(function (x) { return x.podcast; });
      /* The stage's own episode is usually also the first `more` entry (5a):
         list it once, under its episode title. */
      var same = more.filter(function (x) { return x.podcast === t.podcast; })[0];
      var extra = more.filter(function (x) { return x.podcast !== t.podcast; });
      if (!t.podcast && !extra.length) return;
      var md = (p.media || {})[t.id] || {};
      var eps = (t.podcast ? [{ title: same ? same.title : t.name, podcast: t.podcast,
                                duration: st.duration, transcript: st.transcript }] : []).concat(extra);
      eps.forEach(function (ep) {
        html += '<div class="podrow' + (md.done ? ' done' : '') + '">' +
          '<h3>' + esc(ep.title) + (ep.duration ? ' <span style="color:var(--ink-3);font-weight:400;font-size:.85em">· ' + esc(ep.duration) + '</span>' : '') + '</h3>' +
          '<audio class="pod-a" controls preload="none" data-pod-topic="' + t.id + '" ' +
          'src="' + esc(ep.podcast) + '"></audio>' +
          '<p class="podrow-miss">This episode has not been recorded yet</p>' +
          (ep.transcript ? '<details class="pod-tx" data-tx="' + esc(ep.transcript) + '"><summary style="cursor:pointer;color:var(--ink-2);font-size:.9rem">Read the transcript</summary>' +
            '<div class="pod-tx-body" style="margin-top:8px;max-height:320px;overflow-y:auto;font-size:.92rem;color:var(--ink-2)"></div></details>' : '') +
          '</div>';
      });
    });
    html += '</div>';

    $('#view-pods').innerHTML = html;
    $('#view-pods').querySelectorAll('audio[data-pod-topic]').forEach(function (a) {
      wirePodAudio(a, a.dataset.podTopic);
    });
    /* Transcripts are fetched only when a student opens one. */
    $('#view-pods').querySelectorAll('details.pod-tx').forEach(function (d) {
      d.addEventListener('toggle', function () {
        var body = d.querySelector('.pod-tx-body');
        if (!d.open || body.dataset.loaded) return;
        body.dataset.loaded = '1';
        body.textContent = 'Loading…';
        fetch(d.dataset.tx).then(function (r) { return r.ok ? r.text() : Promise.reject(); })
          .then(function (t) {
            body.innerHTML = t.split(/\n+/).filter(function (l) { return l.trim(); })
              .map(function (l) { return '<p style="margin:0 0 6px">' + esc(l) + '</p>'; }).join('');
          })
          .catch(function () { body.textContent = 'The transcript could not be loaded.'; body.dataset.loaded = ''; });
      });
    });
  }

  /* The listening bookkeeping, shared by every player in the app. */
  function wirePodAudio(a, topicId) {
    var r = mediaRec(topicId), mark = 0;
    a.addEventListener('error', function () {
      var row = a.closest ? a.closest('.podrow') : null;
      if (row) row.classList.add('missing');
      a.style.display = 'none';
    });
    if (r.seconds && !r.done) {
      a.addEventListener('loadedmetadata', function () {
        if (r.seconds < a.duration - 5) { a.currentTime = r.seconds; mark = r.seconds; }
      });
    }
    a.addEventListener('play', function () {
      r.plays = (r.plays || 0) + 1; r.last = new Date().toISOString(); syncSoon();
    });
    a.addEventListener('pause', syncSoon);
    a.addEventListener('timeupdate', function () {
      if (a.currentTime - mark < 10) return;
      r.seconds = Math.round((r.seconds || 0) + (a.currentTime - mark));
      mark = a.currentTime;
    });
    a.addEventListener('ended', function () { r.done = true; sync(); });
  }

  /* =====================================================================
     READING A PAPER BACK
     Every question as it was set, the option the student chose, the option
     that was right, and why. The answers are kept on the progress object;
     the questions come from the bank, so this works a week later too.
     ===================================================================== */
  function openReview(mockId, errorsOnly) {
    var m = E.Bank.mock(mockId), rec = (S.p.mocks || {})[mockId];
    if (!m || !rec || !rec.review) return;
    var given = {};
    rec.review.forEach(function (r) { given[r.i] = r.g; });

    var right = 0, n = 0;
    m.sections.forEach(function (sec) {
      sec.items.forEach(function (it) {
        n++;
        if (given[it.id] != null && given[it.id] === it.answer) right++;
      });
    });

    var missed = n - right;
    var html = '<div class="rev">';
    html += '<div class="rev-top"><div><p class="kicker">Reading the paper back</p>' +
      '<h2>' + esc(m.name) + '</h2>' +
      '<p class="rev-sub">' + right + ' of ' + n + ' right \u00b7 sat ' +
      esc(new Date(rec.at).toLocaleDateString()) + '. ' +
      (errorsOnly
        ? 'Showing only the ' + missed + ' you did not get right.'
        : 'Every question is here, with what you chose, what was right, and why.') +
      '</p></div>' +
      '<button class="btn" id="rev-back">Back</button></div>';

    /* Twenty questions is a lot to scroll when six of them are the point. */
    html += '<div class="rev-filter">' +
      '<button class="btn sm' + (errorsOnly ? '' : ' primary') + '" id="rev-all">' +
        'Every question (' + n + ')</button>' +
      '<button class="btn sm' + (errorsOnly ? ' primary' : '') + '" id="rev-errs"' +
        (missed ? '' : ' disabled') + '>Examine errors' +
        (missed ? ' (' + missed + ')' : ' \u2014 none') + '</button></div>';

    var qn = 0, lastPassage = null, lastLines = null;
    m.sections.forEach(function (sec) {
      var shown = sec.items.filter(function (it) {
        return !errorsOnly || given[it.id] == null || given[it.id] !== it.answer;
      });
      if (!shown.length) { qn += sec.items.length; return; }
      html += '<div class="rev-sec"><span class="rev-sec-p">' + esc(sec.part) + '</span>' +
        '<span class="rev-sec-t">' + esc(sec.title) + '</span>' +
        (errorsOnly ? '<span class="rev-sec-n">' + shown.length + ' of ' + sec.items.length + '</span>' : '') +
        '</div>';
      lastPassage = null; lastLines = null;
      sec.items.forEach(function (it) {
        qn++;
        var g = given[it.id], ok = g != null && g === it.answer;
        if (errorsOnly && ok) return;

        /* A shared passage or dialogue is printed once, above the questions
           that hang off it, exactly as the paper prints it. */
        if (it.passage && it.passage !== lastPassage) {
          lastPassage = it.passage;
          html += '<div class="rev-passage">' + passageHtml(it.passage) +
            (it.source ? '<p class="psource">' + esc(it.source) + '</p>' : '') + '</div>';
        }
        if (it.lines) {
          var key = JSON.stringify(it.lines);
          if (key !== lastLines) {
            lastLines = key;
            html += '<div class="rev-passage rev-dlg">' + it.lines.map(function (l) {
              return '<p><b>' + esc(l.who || '') + '</b> ' + passageHtml(l.text).replace(/^<p>|<\/p>$/g, '') + '</p>';
            }).join('') + '</div>';
          }
        }

        html += '<div class="revq' + (ok ? ' ok' : g == null ? ' blank' : ' bad') + '">';
        html += '<div class="revq-h"><span class="revq-n">' + qn + '</span>' +
          '<span class="revq-s">' + (ok ? 'Correct' : g == null ? 'Left blank' : 'Not right') + '</span></div>';

        if (it.blank && it.lines) {
          var own = it.lines.filter(function (l) { return l.text.indexOf('___' + it.blank + '___') >= 0; })[0];
          if (own) html += '<div class="revq-line"><b>' + esc(own.who || '') + '</b> ' +
            passageHtml(own.text, it.blank).replace(/^<p>|<\/p>$/g, '') + '</div>';
        }
        if (it.given) html += '<p class="revq-given">' + it.given + '</p>';
        if (it.stem) html += '<p class="revq-stem">' + it.stem + '</p>';

        if (Array.isArray(it.options)) {
          html += '<ol class="revq-opts">';
          it.options.forEach(function (o, k) {
            var cls = k === it.answer ? ' key' : '';
            if (g === k && k !== it.answer) cls = ' chose';
            html += '<li class="' + cls.trim() + '">' + esc(String(o)) +
              (k === it.answer ? '<span class="revq-tag key">correct</span>' : '') +
              (g === k && k !== it.answer ? '<span class="revq-tag chose">you chose this</span>' : '') +
              '</li>';
          });
          html += '</ol>';
        } else if (Array.isArray(it.words)) {
          html += '<ol class="revq-opts">';
          it.words.forEach(function (w, k) {
            var cls = k === it.answer ? ' key' : (g === k ? ' chose' : '');
            html += '<li class="' + cls.trim() + '">' + esc(String(w)) +
              (k === it.answer ? '<span class="revq-tag key">the wrong part</span>' : '') +
              (g === k && k !== it.answer ? '<span class="revq-tag chose">you chose this</span>' : '') +
              '</li>';
          });
          html += '</ol>';
          if (it.fix) html += '<p class="revq-fix">It should read: <b>' + esc(it.fix) + '</b></p>';
        }

        if (g == null) html += '<p class="revq-blank">You did not answer this one.</p>';
        html += '<div class="revq-why"><span class="revq-wh">Why</span>' + it.why + '</div>';
        var rem = C.REMEDIATION[it.tag];
        if (rem) {
          var sb = E.Bank.moduleForTag(it.tag);
          html += '<div class="revq-go">' + esc(rem.name) +
            (sb ? ' · <button class="linky" data-rev-sub="' + sb.id + '">open the module that teaches this</button>' : '') +
            '</div>';
        }
        html += '</div>';
      });
    });

    html += '<div style="display:flex;justify-content:center;margin:18px 0 6px">' +
      '<button class="btn primary" id="rev-back2">Back to your route</button></div>';
    html += '</div>';

    $('#view-review').innerHTML = html;
    show('review');
    window.scrollTo(0, 0);
    var b1 = $('#rev-back'), b2 = $('#rev-back2');
    if (b1) b1.addEventListener('click', function () { show('plan'); });
    if (b2) b2.addEventListener('click', function () { show('plan'); });
    var ba = $('#rev-all'), be = $('#rev-errs');
    if (ba) ba.addEventListener('click', function () { openReview(mockId, false); });
    if (be) be.addEventListener('click', function () { openReview(mockId, true); });
    $('#view-review').querySelectorAll('[data-rev-sub]').forEach(function (b) {
      b.addEventListener('click', function () {
        S.planReturn = true;
        openSub(b.dataset.revSub);
      });
    });
  }

  /* The exam renderer escapes a passage and turns blank lines into
     paragraphs. The review needs the same treatment. */
  function passageHtml(text, blank) {
    var h = esc(text).replace(/___\((\d+)\)___/g, function (m0, n) {
      var u = '&#95;&#95;&#95;';
      return '<span class="gapno' + (blank && ('(' + n + ')') === blank ? ' on' : '') + '">' +
        '<i>' + u + '</i>[' + n + ']<i>' + u + '</i></span>';
    });
    h = h.replace(/(&lt;br\s*\/?&gt;\s*){2,}/gi, '\n\n').replace(/&lt;br\s*\/?&gt;/gi, '\n');
    return '<p>' + h.replace(/\n\s*\n/g, '</p><p>').replace(/\n/g, ' ') + '</p>';
  }

  /* =====================================================================
     THE EXAM PLAN
     The landing screen. A student arrives, sits one paper, and the app turns
     what they got wrong into a short list of modules to work through. Clear
     the list and the next paper appears. Nothing else is offered until the
     first paper has been sat, because a nine-stage map is not an answer
     to "am I ready?".
     ===================================================================== */

  function planFor(p, mockId) { return (p.plans || {})[mockId] || null; }

  /* Built once, at the moment the paper is submitted, and then left alone:
     a plan that rewrote itself every time the student improved would never
     be finishable. */
  function buildPlan(p, mockId, results) {
    var missed = {};
    results.forEach(function (r) {
      if (r.correct) return;
      var sb = E.Bank.moduleForTag(r.item.tag);
      if (!sb) return;
      missed[sb.id] = (missed[sb.id] || 0) + 1;
    });
    var subs = Object.keys(missed).sort(function (a, b) {
      if (missed[b] !== missed[a]) return missed[b] - missed[a];
      return a < b ? -1 : 1;
    });
    if (!p.plans) p.plans = {};
    p.plans[mockId] = { at: new Date().toISOString(), subs: subs, missed: missed };
    return p.plans[mockId];
  }

  function subCleared(p, subId) {
    var r = p.subs[subId];
    return !!(r && r.best >= E.PASS_SUB);
  }
  function planDone(p, mockId) {
    var plan = planFor(p, mockId);
    if (!plan) return false;
    return plan.subs.every(function (id) { return subCleared(p, id); });
  }
  function planLeft(p, mockId) {
    var plan = planFor(p, mockId);
    if (!plan) return 0;
    return plan.subs.filter(function (id) { return !subCleared(p, id); }).length;
  }

  /* A paper opens when the one before it has been sat AND its checklist has
     been cleared. A perfect paper makes no checklist, so it opens the next
     one straight away. */
  /* Every paper is open from the start. The checklist is still the order we
     recommend, and the route still says so — but for self-study a locked
     paper is an obstacle rather than a guide. */
  function mockOpen() { return true; }

  /* =====================================================================
     THE LAST TWO DAYS
     A countdown, a coverage bar and one button. With hours rather than
     weeks left, the number that matters is not a score but how much of the
     paper's ground a student has stood on: a rule never met is a rule that
     cannot be recognised, and every question here is multiple choice, so recognising
     one is enough to use it.
     ===================================================================== */
  function hoursToExam() {
    if (typeof EXAM_AT === 'undefined' || !EXAM_AT) return null;
    var then = new Date(EXAM_AT);
    if (isNaN(then)) return null;
    var h = Math.round((then - Date.now()) / 3600000);
    return h > 0 ? h : 0;
  }
  function countdownWords() {
    var h = hoursToExam();
    if (h === null) return '';
    if (h === 0) return 'The paper is now';
    if (h < 24) return h + ' hour' + (h === 1 ? '' : 's') + ' to the paper';
    var d = Math.floor(h / 24);
    return d + ' day' + (d === 1 ? '' : 's') + ' and ' + (h - d * 24) + ' hours to go';
  }

  function startSpeed(n) {
    var ids = E.Bank.speedSet(S.p, n || 20);
    if (!ids.length) return toast('Nothing left to cover.');
    startRun('speed', ids.map(E.Bank.item), { title: 'Speed round' });
  }

  /* ------------------------------------------------- in-class modules
     Exit tickets (5 items, end of every teaching lesson) and the Monday
     spiral (6 items, 5 minutes) live in data/extras.js. The card shows the
     ones for today's lesson first (LESSON_DATES in roster.js), then the
     rest on request. Scores are kept in p.exits / p.spirals. */
  var EX = window.EXTRAS || { exits: [], spirals: [] };
  function lessonToday() {
    var d = E.today(), L = (typeof LESSON_DATES !== 'undefined' && LESSON_DATES) || {};
    var hit = null;
    Object.keys(L).forEach(function (n) { if (L[n] === d) hit = Number(n); });
    return hit;
  }
  function classCard(p) {
    var exits = EX.exits || [], spirals = EX.spirals || [];
    if (!exits.length && !spirals.length) return '';
    var today = lessonToday();
    var pe = p.exits || {}, ps = p.sprints || {};
    function row(kind, x) {
      var rec = kind === 'exit' ? pe[x.id] : ps[x.id];
      var done = !!rec;
      return '<button class="ckrow' + (done ? ' done' : '') + '" data-' + kind + '="' + x.id + '">' +
        '<span class="ck-box">' + (done ? '\u2713' : '') + '</span>' +
        '<span class="ck-txt"><span class="ck-name">' + esc(x.name) + '</span>' +
        '<span class="ck-sub">' + (kind === 'exit' ? x.items.length + ' questions \u00b7 hint after a miss' : x.items.length + ' questions \u00b7 ' + (x.minutes || 5) + ' minutes on the clock') +
        (x.lesson === today ? ' \u00b7 today' : '') + '</span></span>' +
        '<span class="ck-go">' + (done ? pct(rec.score != null ? rec.score : rec.last) + '%' : 'Open \u2192') + '</span></button>';
    }
    var todays = exits.filter(function (x) { return x.lesson === today; }).map(function (x) { return row('exit', x); })
      .concat(spirals.filter(function (x) { return x.lesson === today; }).map(function (x) { return row('spiral', x); }));
    var others = exits.filter(function (x) { return x.lesson !== today; }).map(function (x) { return row('exit', x); })
      .concat(spirals.filter(function (x) { return x.lesson !== today; }).map(function (x) { return row('spiral', x); }));
    var html = '<div class="card" style="padding:16px 18px;margin-bottom:14px;display:flex;flex-direction:column;gap:9px">' +
      '<div class="sect-h" style="margin-bottom:2px"><div><h2 style="font-size:1.15rem">In class</h2>' +
      '<p style="color:var(--ink-2);font-size:.88rem;margin-top:3px">' +
      (todays.length ? 'Today\'s exit ticket' + (todays.length > 1 ? ' and spiral' : '') + '. Your teacher opens them in the lesson.'
                     : 'No lesson today. Earlier tickets and spirals stay open for revision.') + '</p></div>' +
      (others.length ? '<button class="btn sm" id="class-more">' + (S.classAll ? 'Hide earlier' : 'Earlier ' + (others.length)) + '</button>' : '') + '</div>' +
      '<div class="ckstack">' + todays.join('') + (S.classAll ? others.join('') : '') + '</div></div>';
    return html;
  }
  function startExit(id) {
    var x = (EX.exits || []).filter(function (e) { return e.id === id; })[0];
    if (!x || !x.items.length) return toast('That ticket has no questions yet.');
    S.planReturn = true;
    startRun('exit', x.items, { title: x.name, sprintKey: x.id });
  }
  function startSpiral(id) {
    var x = (EX.spirals || []).filter(function (e) { return e.id === id; })[0];
    if (!x || !x.items.length) return toast('That spiral has no questions yet.');
    S.planReturn = true;
    startRun('sprint', x.items, { title: x.name, sprintKey: x.id, limitSec: (x.minutes || 5) * 60 });
  }

  function sprintCard(p) {
    var cov = P.tagsCovered(p);
    var pctCov = Math.round(100 * cov.seen / Math.max(1, cov.total));
    var words = countdownWords();
    var html = '<div class="sprint">';
    html += '<div class="sprint-h">' +
      (words ? '<span class="kicker">' + esc(words) + '</span>' : '') +
      '<span class="sprint-n">' + cov.seen + ' of ' + cov.total + ' rules covered</span>' +
      '<span class="sprint-s">' +
        (cov.seen === 0
          ? 'You have not met any of them yet. A speed round covers twenty in about six minutes.'
          : cov.seen >= cov.total
            ? 'Every rule in the course has been in front of you at least once. Read the revision sheet again and sit a final check.'
            : 'A speed round covers twenty more, one question each, no reading first. It is the quickest way to meet the rest.') +
      '</span></div>';
    html += '<div class="sprint-bar"><span style="width:' + pctCov + '%"></span></div>';
    html += '<div class="sprint-r">' +
      '<button class="btn primary" id="sp-go">Speed round</button>' +
      '<button class="btn" id="sp-read">Revision sheet</button>' +
      '</div></div>';
    return html;
  }

  /* --------------------------------------------------------- class board
     One class, one shared bar. Ranked on work done rather than on ability,
     so everyone can move a question count today,
     and a board that simply restates who is already good would discourage
     exactly the students who most need to keep the app open. */
  function paintBoard(p) {
    var host = $('#board');
    if (!host) return;
    api.roster().then(function (r) {
      var list = (r && r.students) || [];
      if (!list.length) { host.innerHTML = ''; return; }
      var rows = list.map(function (s) {
        var sp = s.progress || P.blank(s.id, s.name);
        var st = sp.stats || { seen: 0, correct: 0 };
        return {
          id: s.id, name: s.name || s.id,
          seen: st.seen || 0,
          cov: P.tagsCovered(sp).seen,
          ready: P.readiness(sp),
          me: s.id === p.studentId
        };
      }).sort(function (a, b) { return b.seen - a.seen || b.cov - a.cov; });

      var classSeen = rows.reduce(function (a, x) { return a + x.seen; }, 0);
      var goal = Math.max(2000, Math.ceil((classSeen + 1) / 1000) * 1000);
      var mine = rows.filter(function (x) { return x.me; })[0];
      var place = mine ? rows.indexOf(mine) + 1 : 0;

      var html = '<div class="sect-h"><div><h2 style="font-size:1.15rem">The class, right now</h2>' +
        '<p style="color:var(--ink-2);font-size:.88rem;margin-top:3px">' +
        classSeen.toLocaleString() + ' questions answered between all of you' +
        (place ? ' · you are ' + place + (place === 1 ? 'st' : place === 2 ? 'nd' : place === 3 ? 'rd' : 'th') : '') +
        '</p></div></div>';
      html += '<div class="boardbar"><span style="width:' +
        Math.min(100, Math.round(100 * classSeen / goal)) + '%"></span>' +
        '<i>' + goal.toLocaleString() + '</i></div>';
      html += '<ol class="board">';
      rows.slice(0, 12).forEach(function (x, i) {
        html += '<li class="' + (x.me ? 'me' : '') + '">' +
          '<span class="board-p">' + (i + 1) + '</span>' +
          '<span class="board-n">' + esc(x.name) + '</span>' +
          '<span class="board-c">' + x.cov + '<i>rules</i></span>' +
          '<span class="board-q">' + x.seen + '<i>answered</i></span></li>';
      });
      if (mine && place > 12) {
        html += '<li class="me apart"><span class="board-p">' + place + '</span>' +
          '<span class="board-n">' + esc(mine.name) + '</span>' +
          '<span class="board-c">' + mine.cov + '<i>rules</i></span>' +
          '<span class="board-q">' + mine.seen + '<i>answered</i></span></li>';
      }
      html += '</ol>';
      html += '<p class="tiny">Ranked on questions answered, not on marks — everybody can move this one today.</p>';
      host.innerHTML = html;
    }).catch(function () { host.innerHTML = ''; });
  }

  function showPace(mockId) {
    var m = E.Bank.mock(mockId), rec = (S.p.mocks || {})[mockId];
    if (!m || !rec || !rec.pace) return;
    var html = '<p class="kicker">' + esc(m.name) + '</p>' +
      '<h3 style="font-size:1.2rem">Where the time went</h3>' +
      '<table class="sectable"><thead><tr><th>Section</th><th>You took</th><th>Budget</th></tr></thead><tbody>';
    rec.pace.forEach(function (q) {
      html += '<tr' + (q.used > q.budget * 1.25 ? ' class="low"' : '') + '>' +
        '<td>' + esc(q.code) + ' \u2014 ' + esc(q.title) + '</td>' +
        '<td class="n">' + mmss(q.used) + '</td><td class="n">' + mmss(q.budget) + '</td></tr>';
    });
    html += '</tbody></table>' +
      '<p class="tiny">Every question carries one mark, so the budget is simply the time ' +
      'divided by twenty. Time lost in one section has to come out of another.</p>' +
      '<button class="btn ghost wide" data-close>Close</button>';
    modal(html);
  }

  function paintPlan() {
    var p = S.p, papers = C.MOCKS || [];
    var html = '';

    /* ---- nothing sat yet: one question, one button */
    if (!(p.mocks || {})[papers[0] && papers[0].id]) {
      html += classCard(p);
      html += sprintCard(p);
      html += '<div class="gate">' + E.artBand('sim', 'gate-art') +
        '<h2>Where should you start?</h2>' +
        '<p>Take the ' + esc(papers[0].name) + ' and find out.</p>' +
        '<p class="gate-sub">' + esc(papers[0].blurb || '') + ' ' +
        'It is not a score to be proud of or ashamed of \u2014 it is a map. Whatever you miss becomes a ' +
        'checklist pointing at the exact modules that will fix it, so the unit stops being a whole unit ' +
        'and becomes the three or four modules you actually need.</p>' +
        '<button class="btn primary lg" data-sim="' + papers[0].id + '">Start the ' + esc(papers[0].name) + '</button>' +
        '<p class="gate-alt"><button class="btn sm" data-go-pods>Podcasts</button>' +
        '<span>Not somewhere you can answer questions? Listen instead.</span></p>' +
        '</div>';
      html += '<div id="board" class="boardwrap"></div>';
      $('#view-plan').innerHTML = html;
      wirePlan();
      paintBoard(p);
      return;
    }

    html += classCard(p);
    html += sprintCard(p);
    html += '<div class="sect-h"><div><h2>Your route</h2>' +
      '<p style="color:var(--ink-2);font-size:.92rem;margin-top:4px">Each unit opens with a triage: sit it, clear what it finds, ' +
      'then take the unit check in test format. Every step on a checklist is there because you got something wrong, ' +
      'not because it was next in the book.</p></div>' +
      '<button class="btn sm" data-go-pods>Podcasts</button></div>';

    papers.forEach(function (m, idx) {
      var rec = (p.mocks || {})[m.id];
      var open = mockOpen(p, idx);
      var plan = planFor(p, m.id);

      /* ---------------------------------------------- the paper itself */
      html += '<div class="step' + (rec ? ' sat' : open ? ' open' : ' shut') + '">';
      html += '<div class="step-h"><span class="step-n">' + (idx + 1) + '</span>' +
        '<span class="step-t"><span class="step-name">' + esc(m.name) + '</span>' +
        '<span class="step-s">' +
          (rec ? 'Sat ' + esc(new Date(rec.at).toLocaleDateString()) + ' · ' + rec.marks + ' of ' + rec.total + ' marks'
               : open ? (m.total || 20) + ' questions · ' + m.minutes + ' minutes'
               : 'Clear the checklist above to open this paper') +
        '</span></span>' +
        (rec ? '<span class="step-pct' + (rec.best >= 0.7 ? ' good' : '') + '">' + pct(rec.best) + '%</span>'
             : open ? '<button class="btn primary sm" data-sim="' + m.id + '">Start</button>'
             : '<span class="step-lock">●</span>') +
        '</div>';
      if (rec) {
        html += '<div class="step-acts">' +
          (rec.review ? '<button class="btn sm" data-review="' + m.id + '">Read your answers</button>' +
                        '<button class="btn sm" data-errs="' + m.id + '">Examine errors</button>' : '') +
          (rec.pace ? '<button class="btn sm" data-pace="' + m.id + '">Where the time went</button>' : '') +
          '<button class="btn sm" data-sim="' + m.id + '">Sit it again</button></div>';
      }

      /* ---------------------------------------------------- the checklist */
      if (rec && plan) {
        if (!plan.subs.length) {
          html += '<div class="step-b"><p class="allclear">Nothing missed. There is no checklist for this ' +
            'paper — go straight on.</p></div>';
        } else {
          var left = planLeft(p, m.id);
          html += '<div class="step-b">';
          html += '<p class="ck-h">' + (left
            ? left + ' of ' + plan.subs.length + ' still to do. Work through these and the next paper opens.'
            : 'All ' + plan.subs.length + ' cleared.') + '</p>';
          /* One system usually costs a student two or three modules, and its
             introduction is one recording. So group the rows by system: a
             single Podcast button spanning the group, and the player once
             above it rather than after every row. Systems keep the order the
             paper put them in \u2014 the costliest first. */
          var groups = [], byTopic = {};
          plan.subs.forEach(function (subId) {
            var sb0 = E.Bank.sub(subId);
            if (!sb0) return;
            if (!byTopic[sb0.topicId]) {
              byTopic[sb0.topicId] = { topicId: sb0.topicId, subs: [] };
              groups.push(byTopic[sb0.topicId]);
            }
            byTopic[sb0.topicId].subs.push(subId);
          });

          groups.forEach(function (grp) {
            var t = E.Bank.topic(grp.topicId);
            var md = (p.media || {})[grp.topicId] || {};
            var dropKey = m.id + '-' + grp.topicId;
            html += '<div class="ckgroup">';
            /* The player, once, at the top of the system it belongs to. */
            html += '<div class="res-drop" id="ckdrop-' + dropKey + '"></div>';
            html += '<div class="ckgrid">';
            if (t && (t.podcast || t.video)) {
              html += '<div class="ckmedia">';
              if (t.podcast) {
                html += '<button class="ckpod' + (md.done ? ' done' : '') +
                  '" data-ck-pod="' + t.id + '" data-ck-drop="' + dropKey + '" ' +
                  'title="' + esc(t.name) + ' \u2014 the podcast">' +
                  '<span class="res-i">' + (md.done ? '\u2713' : '\u266A') + '</span>' +
                  '<span class="ckpod-l">Podcast</span></button>';
              }
              if (t.video) {
                html += '<button class="ckpod' + (md.videoOpens ? ' done' : '') +
                  '" data-ck-vid="' + t.id + '" ' +
                  'title="' + esc(t.name) + ' \u2014 the video">' +
                  '<span class="res-i">\u25B6</span>' +
                  '<span class="ckpod-l">Video</span></button>';
              }
              html += '</div>';
            }
            html += '<div class="ckstack">';
            grp.subs.forEach(function (subId) {
              var sb = E.Bank.sub(subId), done = subCleared(p, subId), r = p.subs[subId];
              html += '<button class="ckrow' + (done ? ' done' : '') + '" data-plan-sub="' + subId + '">' +
                '<span class="ck-box">' + (done ? '\u2713' : '') + '</span>' +
                '<span class="ck-txt"><span class="ck-name">' + esc(sb.name) + '</span>' +
                '<span class="ck-sub">' + esc(t ? t.code + ' \u00b7 ' + t.name : '') + ' \u00b7 ' +
                  plan.missed[subId] + (plan.missed[subId] === 1 ? ' question' : ' questions') + ' missed</span></span>' +
                '<span class="ck-go">' + (done ? pct(r.best) + '%' : 'Open \u2192') + '</span></button>';
            });
            html += '</div></div></div>';
          });
          html += '</div>';
        }
      }
      html += '</div>';
    });

    html += '<p class="tiny" style="margin-top:14px">A module counts as cleared at 60%. Everything on the ' +
      'unit map stays open the whole time — the checklist is the shortest route, not the only one.</p>';

    html += '<div id="board" class="boardwrap"></div>';
    $('#view-plan').innerHTML = html;
    wirePlan();
    paintBoard(p);
  }

  function wirePlan() {
    var sg = $('#sp-go'), sr = $('#sp-read');
    if (sg) sg.addEventListener('click', function () { startSpeed(20); });
    if (sr) sr.addEventListener('click', function () { show('revise'); });
    var dg = $('#drill-go');
    if (dg) dg.addEventListener('click', startDrill);
    $('#view-plan').querySelectorAll('[data-exit]').forEach(function (b) {
      b.addEventListener('click', function () { startExit(b.dataset.exit); });
    });
    $('#view-plan').querySelectorAll('[data-spiral]').forEach(function (b) {
      b.addEventListener('click', function () { startSpiral(b.dataset.spiral); });
    });
    var more = $('#class-more');
    if (more) more.addEventListener('click', function () { S.classAll = !S.classAll; paintPlan(); });
    $('#view-plan').querySelectorAll('[data-go-pods]').forEach(function (b) {
      b.addEventListener('click', function () { show('pods'); });
    });
    $('#view-plan').querySelectorAll('[data-sim]').forEach(function (b) {
      b.addEventListener('click', function () { confirmSim(b.dataset.sim); });
    });
    $('#view-plan').querySelectorAll('[data-review]').forEach(function (b) {
      b.addEventListener('click', function () { openReview(b.dataset.review, false); });
    });
    $('#view-plan').querySelectorAll('[data-pace]').forEach(function (b) {
      b.addEventListener('click', function () { showPace(b.dataset.pace); });
    });
    $('#view-plan').querySelectorAll('[data-errs]').forEach(function (b) {
      b.addEventListener('click', function () { openReview(b.dataset.errs, true); });
    });
    $('#view-plan').querySelectorAll('[data-ck-vid]').forEach(function (b) {
      b.addEventListener('click', function (ev) {
        ev.stopPropagation();
        playVideo(E.Bank.topic(b.dataset.ckVid));
      });
    });
    $('#view-plan').querySelectorAll('[data-ck-pod]').forEach(function (b) {
      b.addEventListener('click', function (ev) {
        ev.stopPropagation();
        togglePodcast($('#ckdrop-' + b.dataset.ckDrop), E.Bank.topic(b.dataset.ckPod));
      });
    });
    $('#view-plan').querySelectorAll('[data-plan-sub]').forEach(function (b) {
      b.addEventListener('click', function () {
        S.planReturn = true;
        openSub(b.dataset.planSub);
      });
    });
  }

  /* =====================================================================
     SYSTEMS MAP
     ===================================================================== */
  function nextAction(p) {
    if (p.assignment && !p.assignment.done) {
      return { kind: 'set', label: 'Take the paper your teacher set',
               sub: p.assignment.itemIds.length + ' questions' };
    }
    /* Until the first paper has been sat, it is the whole recommendation.
       Eight stages is a lot to face without knowing which one is weakest. */
    var papers = C.MOCKS || [];
    for (var q = 0; q < papers.length; q++) {
      var mk = papers[q];
      if (!(p.mocks || {})[mk.id]) {
        if (!mockOpen(p, q)) break;
        return { kind: 'sim', id: mk.id, label: mk.name,
                 sub: (mk.total || 20) + ' questions \u00b7 ' + mk.minutes + ' minutes \u00b7 it becomes your checklist' };
      }
      var pl = planFor(p, mk.id);
      if (pl && pl.subs.length && !planDone(p, mk.id)) {
        var nextSub = pl.subs.filter(function (id) { return !subCleared(p, id); })[0];
        var sb = E.Bank.sub(nextSub), lv = sb && E.Bank.level(sb.levelId), tp = sb && E.Bank.topic(sb.topicId);
        if (sb) return { kind: 'plansub', t: tp, lv: lv, id: sb.id, label: sb.name,
                         sub: planLeft(p, mk.id) + ' left on the checklist for ' + mk.name };
      }
    }
    for (var i = 0; i < C.TOPICS.length; i++) {
      var t = C.TOPICS[i];
      for (var j = 0; j < t.levels.length; j++) {
        var lv = t.levels[j];
        for (var k = 0; k < lv.subs.length; k++) {
          var s = lv.subs[k], rec = p.subs[s.id];
          if (!rec || rec.best < E.PASS_SUB) {
            return { kind: 'sub', t: t, lv: lv, id: s.id, label: s.name,
                     sub: t.code + ' · Level ' + lv.n + ' · ' + s.cefr };
          }
        }
        var ch = p.checks[lv.check.id];
        if (!ch || ch.best < E.PASS_CHECK) {
          return { kind: 'check', t: t, lv: lv, id: lv.id, label: lv.check.name,
                   sub: t.code + ' · pass at 75% to turn this level green' };
        }
      }
    }
    var due = P.dueReview(p).length;
    if (due) return { kind: 'faults', label: 'Clear your fault list',
                      sub: due + (due === 1 ? ' question is' : ' questions are') + ' due' };
    var un = (C.MOCKS || []).filter(function (m) { return !(p.mocks || {})[m.id]; })[0];
    if (un) return { kind: 'sim', id: un.id, label: un.name, sub: (un.total || 20) + ' questions · ' + un.minutes + ' minutes' };
    return null;
  }

  function paintMap() {
    var p = S.p;
    var next = nextAction(p);
    /* On the very first paint the map opens itself at the system the student
       should work on next. Only the first: after that a closed system stays
       closed, or the "Complete modules" button could never fold one away. */
    if (!S.mapPainted) {
      S.mapPainted = true;
      if (S.sysOpen === null && next && next.t) { S.sysOpen = next.t.id; S.lvlOpen = next.lv.id; }
    }

    var html = '';
    if (next) {
      html += '<button class="resume" id="resume">' +
        (next.t ? E.artBand(next.t.art, 'resume-art') : E.artBand('sim', 'resume-art')) +
        '<span class="resume-t">' +
          '<span class="kicker">' +
            (next.kind === 'check' ? 'Next stage check' : next.kind === 'set' ? 'From your teacher' :
             next.kind === 'faults' ? 'Fault list' : next.kind === 'sim' ? 'Start here' : next.kind === 'plansub' ? 'Next on your checklist' : 'Pick up where you left off') +
          '</span>' +
          '<span class="resume-n">' + esc(next.label) + '</span>' +
          '<span class="resume-s">' + esc(next.sub) + '</span>' +
        '</span><span class="resume-go">Start →</span></button>';
    } else {
      html += '<div class="resume done"><span class="resume-t">' +
        '<span class="kicker">Every stage green</span>' +
        '<span class="resume-n">' + esc(C.RANKS[C.RANKS.length - 1].name) + '</span>' +
        '<span class="resume-s">Nothing is outstanding. Replay a simulation to push the score higher.</span>' +
        '</span></div>';
    }

    html += '<div class="sect-h"><div><h2>Units and stages</h2>' +
      '<p style="color:var(--ink-2);font-size:.92rem;margin-top:4px">' + esc(P.rank(p).note) + '</p></div>' +
      '<span class="pill on">' + P.checksCleared(p) + ' of ' + E.Bank.allLevels().length + ' checks cleared</span></div>';

    html += '<div class="systems">';

    C.TOPICS.forEach(function (t) {
      var tp = P.topicPct(p, t);
      var allGreen = t.levels.every(function (lv) {
        var c = p.checks[lv.check.id]; return c && c.best >= E.PASS_CHECK;
      });
      var open = S.sysOpen === t.id;
      html += '<div class="sys' + (allGreen ? ' done' : '') + (open ? ' exp' : '') + '">';
      html += '<button class="sys-head" data-sys="' + t.id + '">' +
        E.artBand(t.art, 'sys-art') +
        '<span class="sys-meta">' +
          '<span class="sys-line1">' +
            '<span class="sys-code">' + esc(t.code) + '</span>' +
            '<span class="sys-name">' + esc(t.name) + '</span>' +
            '<span class="pill">' + esc(t.cefr) + '</span>' +
            (allGreen ? '<span class="pill good">Green</span>' : '') +
          '</span>' +
          '<span class="sys-blurb">' + esc(t.blurb) + '</span>' +
          '<span class="sys-prog"><span class="bar-line"><span style="width:' + tp + '%"></span></span>' +
          '<span class="sys-pct">' + tp + '%</span></span>' +
        '</span><span class="caret">›</span></button>';

      /* The introduction for this system. Buttons appear only for the media
         that exists, and the whole strip disappears if a system has none, so
         episodes can be added one at a time. */
      /* The strip always carries "Complete modules"; the media buttons appear
         only for the material that exists. */
      {
        var md = (p.media || {})[t.id] || {};
        html += '<div class="sys-res">';
        if (t.slides) {
          html += '<a class="res' + (md.slidesOpens ? ' done' : '') + '" href="' + esc(t.slides) + '" ' +
            'target="_blank" rel="noopener" data-act="pdf" data-topic="' + t.id + '">' +
            '<span class="res-i">\u2630</span>Slides</a>';
        }
        if (t.podcast) {
          html += '<button class="res' + (md.done ? ' done' : '') + '" data-act="pod" data-topic="' + t.id + '">' +
            '<span class="res-i">' + (md.done ? '\u2713' : '\u266A') + '</span>Podcast' +
            (md.done ? '' : md.seconds ? '<span class="res-x">' + Math.round(md.seconds / 60) + 'm in</span>' : '') +
            '</button>';
        }
        /* The video sits beside the podcast: two ways into the same stage, and
           a student picks whichever suits where they are. */
        if (t.video) {
          html += '<button class="res' + (md.videoOpens ? ' done' : '') + '" data-act="yt" data-topic="' + t.id + '">' +
            '<span class="res-i">\u25B6</span>Video</button>';
        }
        var totalSubs = 0, doneSubs = 0;
        t.levels.forEach(function (lv) {
          totalSubs += lv.subs.length;
          doneSubs += P.subsDone(p, lv);
        });
        html += '<button class="res go' + (doneSubs === totalSubs ? ' done' : '') +
          '" data-act="open" data-topic="' + t.id + '">' +
          '<span class="res-i">' + (doneSubs === totalSubs ? '\u2713' : '\u25A4') + '</span>' +
          'Complete modules' +
          '<span class="res-x">' + doneSubs + ' of ' + totalSubs + '</span></button>';
        html += '<div class="res-drop" id="drop-' + t.id + '"></div></div>';
      }

      if (open) {
        html += '<div class="sys-body">';
        t.levels.forEach(function (lv) {
          var lp = P.levelPct(p, lv);
          var ck = p.checks[lv.check.id];
          var green = ck && ck.best >= E.PASS_CHECK;
          var lopen = S.lvlOpen === lv.id;
          html += '<div class="lvl' + (green ? ' done' : '') + '">';
          html += '<button class="lvl-head" data-lvl="' + lv.id + '">' +
            '<span class="lvl-n">' + lv.n + '</span>' +
            '<span class="lvl-t"><span class="lvl-name">' + esc(lv.name) + '</span>' +
            '<span class="lvl-sub">' + esc(lv.cefr) + ' · ' + lv.subs.length + ' modules · ' +
              (green ? 'check cleared' : 'check ' + (ck ? pct(ck.best) + '%' : 'not taken')) + '</span></span>' +
            '<span class="lvl-pct">' + lp + '%</span></button>';
          if (lopen) {
            html += '<div class="lvl-body">';
            lv.subs.forEach(function (s) {
              var rec = p.subs[s.id];
              var done = rec && rec.best >= E.PASS_SUB;
              html += '<button class="mrow' + (done ? ' done' : '') + '" data-sub="' + s.id + '">' +
                '<span class="mrow-tick"></span>' +
                '<span class="mrow-txt"><span class="mrow-name">' + esc(s.name) + '</span>' +
                '<span class="mrow-sub">' + esc(s.cefr) + ' · ' + s.items.length + ' questions</span></span>' +
                '<span class="mrow-score">' + (rec ? pct(rec.best) + '%' : '') + '</span></button>';
            });
            var cu = P.checkUnlocked(p, lv);
            html += '<button class="mrow check' + (green ? ' done' : '') + '" data-check="' + lv.id + '"' + (cu ? '' : ' disabled') + '>' +
              '<span class="mrow-tick"></span>' +
              '<span class="mrow-txt"><span class="mrow-name">' + esc(lv.check.name) + '</span>' +
              '<span class="mrow-sub">' + (cu ? lv.check.items.length + ' questions · pass at 75%' : 'Clear all three modules to unlock') + '</span></span>' +
              '<span class="mrow-score">' + (ck ? pct(ck.best) + '%' : '') + '</span></button>';
            html += '</div>';
          }
          html += '</div>';
        });
        html += '</div>';
      }
      html += '</div>';
    });

    html += '</div>';
    $('#view-map').innerHTML = html;

    var res = $('#resume');
    if (res) res.addEventListener('click', function () {
      if (next.kind === 'sub') openSub(next.id);
      else if (next.kind === 'plansub') { S.planReturn = true; openSub(next.id); }
      else if (next.kind === 'check') startCheck(next.id);
      else if (next.kind === 'faults') show('faults');
      else if (next.kind === 'sim') confirmSim(next.id);
      else if (next.kind === 'set') show('record');
    });
    wireResources();
    $('#view-map').querySelectorAll('[data-sys]').forEach(function (b) {
      b.addEventListener('click', function () {
        S.sysOpen = S.sysOpen === b.dataset.sys ? null : b.dataset.sys;
        paintMap();
      });
    });
    $('#view-map').querySelectorAll('[data-lvl]').forEach(function (b) {
      b.addEventListener('click', function () {
        S.lvlOpen = S.lvlOpen === b.dataset.lvl ? null : b.dataset.lvl;
        paintMap();
      });
    });
    $('#view-map').querySelectorAll('[data-sub]').forEach(function (b) {
      b.addEventListener('click', function () { openSub(b.dataset.sub); });
    });
    $('#view-map').querySelectorAll('[data-check]').forEach(function (b) {
      b.addEventListener('click', function () { startCheck(b.dataset.check); });
    });
    $('#view-map').querySelectorAll('[data-sim]').forEach(function (b) {
      b.addEventListener('click', function () { confirmSim(b.dataset.sim); });
    });
  }

  /* ------------------------------------------------------- stage media
     Listening is progress too. A student stuck on a system who never played
     its introduction is a different teaching problem from one who did. */
  function mediaRec(topicId) {
    if (!S.p.media) S.p.media = {};
    return S.p.media[topicId] || (S.p.media[topicId] = { plays: 0, seconds: 0, done: false });
  }

  function ytId(url) {
    var m = String(url || '').match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/);
    return m ? m[1] : '';
  }
  /* Opening a video is tracked the same way as playing an episode, whichever
     button started it, so the teacher console counts them all. */
  function playVideo(t) {
    if (!t || !t.video) return;
    var r = mediaRec(t.id);
    r.videoOpens = (r.videoOpens || 0) + 1;
    r.last = new Date().toISOString();
    syncSoon();
    openVideo(t);
  }

  function openVideo(t) {
    var id = ytId(t.video);
    modal('<p class="kicker">' + esc(t.code) + ' \u00b7 video</p>' +
      '<h3 style="font-size:1.2rem">' + esc(t.name) + '</h3>' +
      (id ? '<div class="ytbox"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(id) + '?rel=0" ' +
        'title="' + esc(t.name) + '" frameborder="0" allowfullscreen ' +
        'allow="accelerometer; encrypted-media; picture-in-picture"></iframe></div>' : '') +
      '<a class="btn wide" href="' + esc(t.video) + '" target="_blank" rel="noopener">Open on YouTube</a>' +
      '<button class="btn ghost wide" data-close>Close</button>');
  }

  function wireResources() {
    $('#view-map').querySelectorAll('.res[data-act]').forEach(function (btn) {
      var tid = btn.dataset.topic, act = btn.dataset.act;
      var t = E.Bank.topic(tid);
      if (!t) return;

      if (act === 'open') {
        btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          if (S.sysOpen === tid) { S.sysOpen = null; paintMap(); return; }
          S.sysOpen = tid;
          /* Open the level this student should actually work on next, so the
             button lands them somewhere rather than on a list of three boxes. */
          var target = t.levels[0];
          for (var k = 0; k < t.levels.length; k++) {
            var lv = t.levels[k];
            var unfinished = lv.subs.some(function (sb) {
              var r = S.p.subs[sb.id];
              return !r || r.best < E.PASS_SUB;
            });
            var ck = S.p.checks[lv.check.id];
            if (unfinished || !ck || ck.best < E.PASS_CHECK) { target = lv; break; }
          }
          S.lvlOpen = target.id;
          paintMap();
          var el = document.querySelector('[data-lvl="' + target.id + '"]');
          if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        });
        return;
      }

      if (act === 'pdf') {
        btn.addEventListener('click', function () {
          var r = mediaRec(tid);
          r.slidesOpens = (r.slidesOpens || 0) + 1;
          r.last = new Date().toISOString();
          syncSoon();
        });
        return;
      }

      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var drop = $('#drop-' + tid);
        var r = mediaRec(tid);

        if (act === 'yt') { playVideo(t); return; }

        /* the podcast: an inline player under the strip, toggled */
        togglePodcast(drop, t);
      });
    });
  }

  /* The introduction player, mounted wherever it is wanted: under a system
     card on the map, or beside a row on the route checklist. Listening is
     tracked the same way from either place. */
  function togglePodcast(drop, t) {
    if (!drop || !t || !t.podcast) return;
    if (drop.dataset.open === 'pod') { drop.dataset.open = ''; drop.innerHTML = ''; return; }
    var r = mediaRec(t.id);
    drop.dataset.open = 'pod';
    drop.innerHTML = '<div class="pod"><div class="pod-t">' +
      '<span class="pod-n">' + esc(t.name) + ' \u2014 the introduction</span>' +
      '<span class="pod-s">' + (r.done ? 'You have listened to this one' :
        r.seconds ? 'Picked up ' + Math.round(r.seconds / 60) + ' min in' :
        'Listen before you start the modules') + '</span></div>' +
      '<audio class="pod-a" controls preload="none" src="' + esc(t.podcast) + '"></audio></div>';

    var a = drop.querySelector('audio');
    var mark = 0;
    a.addEventListener('error', function () {
      drop.querySelector('.pod-s').textContent = 'This episode has not been recorded yet';
      a.style.display = 'none';
    });
    if (r.seconds && !r.done) {
      a.addEventListener('loadedmetadata', function () {
        if (r.seconds < a.duration - 5) { a.currentTime = r.seconds; mark = r.seconds; }
      });
    }
    a.addEventListener('play', function () {
      r.plays = (r.plays || 0) + 1; r.last = new Date().toISOString(); syncSoon();
    });
    a.addEventListener('pause', syncSoon);
    a.addEventListener('timeupdate', function () {
      if (a.currentTime - mark < 10) return;
      r.seconds = Math.round((r.seconds || 0) + (a.currentTime - mark));
      mark = a.currentTime;
    });
    a.addEventListener('ended', function () {
      r.done = true; sync(); toast('Episode finished. Now try the modules.');
    });
    a.play().catch(function () {});
  }

  /* =====================================================================
     THEORY
     ===================================================================== */
  function openSub(subId) {
    var s = E.Bank.sub(subId);
    var t = E.Bank.topic(s.topicId);
    var lv = E.Bank.level(s.levelId);
    /* A lesson is a set of lenses on one idea. Every student gets the full
       explanation; the other tabs (lenses.js) are for whoever that explanation
       missed. A module with no lens entry simply shows fewer tabs. */
    var th = {}, k0;
    for (k0 in s.theory) th[k0] = s.theory[k0];
    var lens = (typeof LENSES !== 'undefined' && LENSES[subId]) || {};
    for (k0 in lens) if (!th[k0]) th[k0] = lens[k0];
    var tabs = [['explain', 'Explain']];
    if (th.simple) tabs.push(['simple', 'Simple English']);
    if (th.thai) tabs.push(['thai', 'ภาษาไทย']);
    if (th.map) tabs.push(['map', 'Mind map']);
    if (th.story) tabs.push(['story', 'Story']);
    if (th.chant) tabs.push(['chant', 'Chant']);
    if (th.moves) tabs.push(['moves', 'Moves']);
    var cur = S.lessonTab && tabs.some(function (x) { return x[0] === S.lessonTab; }) ? S.lessonTab : (S.simple && th.simple ? 'simple' : 'explain');
    function pane(k) {
      if (k === 'explain' || k === 'simple') {
        var paras = k === 'simple' ? th.simple : th.body;
        var h = '<div class="prose">' + paras.map(function (x) { return '<p>' + x + '</p>'; }).join('') + '</div>';
        if (th.analogy) h += '<div class="lens analogy"><div class="lens-k">Think of it like this · ' + esc(th.analogy.title || '') + '</div><p>' + th.analogy.text + '</p></div>';
        if (th.examples) h += '<div class="exlist">' + th.examples.map(function (x) {
          return '<div><div class="s">' + x.s + '</div><div class="g">' + esc(x.g) + '</div></div>'; }).join('') + '</div>';
        if (th.trap) h += '<div class="lens trap"><div class="lens-k">⚠ The trap</div><p>' + th.trap + '</p></div>';
        return h;
      }
      if (k === 'thai') return '<div class="lens thai"><div class="lens-k">สรุปภาษาไทย</div><p>' + esc(th.thai) + '</p></div>' +
        (th.trap ? '<div class="lens trap"><div class="lens-k">⚠ The trap</div><p>' + th.trap + '</p></div>' : '');
      if (k === 'map') return '<div class="mm-wrap">' + E.mindMapSvg(th.map) + '</div>' +
        '<div class="mm-list">' + th.map.branches.map(function (b) { return '<div><b>' + esc(b.label) + '</b> — ' + b.leaves.map(esc).join(' · ') + '</div>'; }).join('') + '</div>';
      if (k === 'story') return '<div class="story"><div class="lens-k">' + esc(th.story.title || 'Story') + '</div>' +
        th.story.panels.map(function (pn, i) {
          return '<div class="panel p' + (i % 4) + '"><span class="pn">' + (i + 1) + '</span><b>' + esc(pn.who) + '</b><p>' + pn.text + '</p></div>'; }).join('') +
        (th.story.moral ? '<div class="moral">★ ' + th.story.moral + '</div>' : '') + '</div>';
      if (k === 'chant') return '<div class="chant"><div class="lens-k">' + esc(th.chant.title || 'Chant') + '</div>' +
        (th.chant.beat ? '<div class="beat">Beat: ' + esc(th.chant.beat) + '</div>' : '') +
        '<div class="lyrics">' + th.chant.lines.map(function (l) { return '<div>' + l + '</div>'; }).join('') + '</div>' +
        '<button class="btn sm" id="p-beat">' + (beatTimer ? '■ Stop the beat' : '▶ Play the beat') + '</button></div>';
      if (k === 'moves') return '<div class="moves"><div class="lens-k">Stand up and do it</div>' + th.moves.map(function (m, i) {
        return '<div class="move"><span class="mn">' + (i + 1) + '</span><div><b>' + esc(m.move) + '</b><p>“' + m.says + '”</p></div></div>'; }).join('') + '</div>';
      return '';
    }
    var html = '<div class="play">' +
      '<div class="play-top"><button class="btn ghost sm" id="p-back">← Stages</button>' +
      '<span style="flex:1"></span><span class="qcount">' + esc(t.code) + ' · Level ' + lv.n + '</span></div>' +
      '<div class="card theory">' +
      E.artBand(t.art) +
      '<p class="kicker">' + esc(s.cefr) + ' · Module</p>' +
      '<h3>' + esc(s.name) + '</h3>' +
      '<p class="key">' + th.key + '</p>' +
      '<div class="lesson-tabs" role="tablist">' + tabs.map(function (x) {
        return '<button class="ltab' + (x[0] === cur ? ' on' : '') + '" role="tab" aria-selected="' + (x[0] === cur) + '" data-tab="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>' +
      '<div class="lesson-pane">' + pane(cur) + '</div>' +
      '<button class="btn primary wide" id="p-start">Start the ' + s.items.length + ' questions →</button>' +
      '</div></div>';
    $('#view-play').innerHTML = html;
    show('play');
    $('#p-back').addEventListener('click', function () { stopBeat(); show(S.planReturn ? 'plan' : 'map'); });
    Array.prototype.forEach.call(document.querySelectorAll('.ltab'), function (b) {
      b.addEventListener('click', function () {
        S.lessonTab = b.getAttribute('data-tab');
        if (S.lessonTab !== 'chant') stopBeat();
        var y = window.scrollY; openSub(subId); window.scrollTo(0, y);
      });
    });
    var beat = $('#p-beat');
    if (beat) beat.addEventListener('click', function () { playBeat(beat); });
    $('#p-start').addEventListener('click', function () {
      stopBeat();
      startRun('module', s.items, { subId: subId, title: s.name });
    });
  }

  /* A simple drum loop (kick–kick–clap) so a chant can be rapped, not just read. */
  var beatCtx = null, beatTimer = null;
  function stopBeat() { if (beatTimer) { clearInterval(beatTimer); beatTimer = null; } }
  function playBeat(btn) {
    if (beatTimer) { stopBeat(); btn.textContent = '▶ Play the beat'; return; }
    try { beatCtx = beatCtx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    if (beatCtx.state === 'suspended' && beatCtx.resume) beatCtx.resume();
    var n = 0;
    function hit(freq, dur, noise) {
      var t0 = beatCtx.currentTime, g = beatCtx.createGain();
      g.gain.setValueAtTime(0.6, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur); g.connect(beatCtx.destination);
      if (noise) {
        var b = beatCtx.createBuffer(1, Math.floor(beatCtx.sampleRate * dur), beatCtx.sampleRate), d = b.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        var src = beatCtx.createBufferSource(); src.buffer = b; src.connect(g); src.start(t0);
      } else {
        var o = beatCtx.createOscillator(); o.frequency.setValueAtTime(freq, t0); o.frequency.exponentialRampToValueAtTime(40, t0 + dur);
        o.connect(g); o.start(t0); o.stop(t0 + dur);
      }
    }
    beatTimer = setInterval(function () { var k = n % 4; if (k === 3) hit(0, 0.15, true); else hit(120, 0.2); n++; }, 400);
    btn.textContent = '■ Stop the beat';
  }

  /* =====================================================================
     PRACTICE RUNS
     ===================================================================== */
  function startRun(kind, items, meta) {
    S.run = {
      kind: kind, items: items.slice(), i: 0, results: [],
      subId: meta.subId, checkId: meta.checkId, title: meta.title,
      hintedAny: false, t0: 0, sprintKey: meta.sprintKey,
      deadline: meta.limitSec ? Date.now() + meta.limitSec * 1000 : 0, limitSec: meta.limitSec || 0, started: Date.now()
    };
    if (S.sprintClock) { clearInterval(S.sprintClock); S.sprintClock = null; }
    if (S.run.deadline) {
      S.sprintClock = setInterval(function () {
        var r = S.run; if (!r || !r.deadline) { clearInterval(S.sprintClock); S.sprintClock = null; return; }
        var left = Math.max(0, r.deadline - Date.now()), c = document.getElementById('sprint-clock');
        if (c) { c.textContent = mmss(Math.ceil(left / 1000)); c.classList.toggle('low', left < 30000); }
        if (!left) { clearInterval(S.sprintClock); S.sprintClock = null; r.timeUp = true; finishRun(); }
      }, 250);
    }
    if (kind === 'check' || kind === 'set') S.run.items = E.shuffle(S.run.items);
    show('play');
    renderQ();
  }
  function startCheck(levelId) {
    var lv = E.Bank.level(levelId);
    startRun('check', lv.check.items, { checkId: lv.check.id, title: lv.check.name });
  }

  var TIMED_TYPES = { choose: 1, equiv: 1, judge: 1, gap: 1, cloze: 1, table: 1, spot: 1 };

  function renderQ() {
    var r = S.run, item = r.items[r.i];
    if (r.cleanup) { r.cleanup(); r.cleanup = null; }
    var prog = Math.round(100 * r.i / r.items.length);
    var canHint = r.kind === 'module' || r.kind === 'faults' || r.kind === 'speed' || r.kind === 'exit' || r.kind === 'sprint';
    /* Reading items are never raced: the passage takes longer than the ring. */
    if (r.finished) return;
    var timed = r.kind !== 'set' && r.kind !== 'sprint' && !!TIMED_TYPES[item.type] && !item.passage;
    var combo = r.combo || 0;
    var limitMs = E.speedMs ? E.speedMs(item) : E.SPEED_MS, limitS = Math.round(limitMs / 1000);

    $('#view-play').innerHTML = '<div class="play">' +
      '<div class="play-top">' +
        '<button class="btn ghost sm" id="p-quit">✕</button>' +
        '<div class="bar-line thin"><span style="width:' + prog + '%"></span></div>' +
        (combo >= 3 ? '<span class="combo">▲ ' + combo + ' in a row</span>' : '') +
        '<span class="qcount">' + (r.i + 1) + ' / ' + r.items.length + '</span>' +
        (r.deadline ? '<span class="sprint-clock" id="sprint-clock">' + mmss(Math.ceil(Math.max(0, r.deadline - Date.now()) / 1000)) + '</span>' : '') +
        (timed ?
          '<div class="timer" id="timer" title="Answer inside ' + limitS + ' seconds for a time bonus">' +
            '<svg width="38" height="38" viewBox="0 0 38 38">' +
              '<circle class="track" cx="19" cy="19" r="15" fill="none" stroke-width="4"></circle>' +
              '<circle class="run" id="timer-run" cx="19" cy="19" r="15" fill="none" stroke-width="4" ' +
                'stroke-linecap="round" stroke-dasharray="94.2" stroke-dashoffset="0"></circle>' +
            '</svg><b id="timer-n">' + limitS + '</b></div>' : '') +
      '</div>' +
      '<div class="card qcard">' +
        '<div class="qtype"><span>' + esc(E.TYPE_LABEL[item.type] || 'Question') + '</span><span class="lv">' + esc(item.level) + '</span></div>' +
        '<div id="qhost"></div>' +
        '<div id="feedback" role="status" aria-live="polite"></div>' +
        '<div class="qfoot">' +
          (canHint ? '<button class="btn sm" id="p-hint">Hint</button>' : '') +
          '<span class="grow"></span>' +
          '<button class="btn primary" id="p-check" disabled>Check</button>' +
        '</div>' +
      '</div></div>';

    var host = $('#qhost');
    var view = E.mount(item, host);
    r.t0 = Date.now();
    var answered = false, tick = null;

    if (timed) {
      var ring = $('#timer-run'), num = $('#timer-n'), box = $('#timer');
      var CIRC = 94.2;
      tick = setInterval(function () {
        var left = Math.max(0, limitMs - (Date.now() - r.t0));
        ring.setAttribute('stroke-dashoffset', String(CIRC * (1 - left / limitMs)));
        if (left > 0) num.textContent = Math.ceil(left / 1000);
        else { box.classList.add('cold'); num.textContent = '—'; clearInterval(tick); tick = null; }
      }, 100);
    }
    function stopTimer() { if (tick) { clearInterval(tick); tick = null; } }

    host.addEventListener('respond', function () {
      if (!answered) $('#p-check').disabled = !view.hasResponse();
    });

    $('#p-quit').addEventListener('click', function () {
      if (r.results.length && !confirm('Leave now? This attempt will not be saved.')) return;
      stopTimer(); S.run = null;
      if (S.sprintClock) { clearInterval(S.sprintClock); S.sprintClock = null; }
      if (S.planReturn) { S.planReturn = false; show('plan'); } else show('map');
    });

    var hintBtn = $('#p-hint');
    if (hintBtn) hintBtn.addEventListener('click', function () {
      var rem = C.REMEDIATION[item.tag] || {};
      hintBtn.disabled = true;
      r.hintedAny = true; r.thisHinted = true;
      $('#feedback').innerHTML = '<div class="verdict" style="background:var(--gold-soft);border:1px solid var(--gold)">' +
        '<div class="verdict-h" style="color:var(--gold)">' + (item.hint ? 'Hint' : 'The principle behind this one') + '</div>' +
        '<div class="verdict-w">' + (item.hint ? esc(item.hint) : (rem.principle || '')) + '</div></div>';
    });

    $('#p-check').addEventListener('click', function () {
      if (answered) return next();
      answered = true;
      var ms = Date.now() - r.t0;
      stopTimer();
      var out = view.check();
      view.lock();
      var hinted = !!r.thisHinted; r.thisHinted = false;
      var fast = timed && !hinted && out.correct && ms <= limitMs;

      var row = P.recordAttempt(S.p, item, out.correct, ms, hinted, fast);
      row.given = String(out.givenText).slice(0, 180);
      row.expected = String(out.expectedText).slice(0, 180);
      row.mode = r.kind;
      api.enqueue([row]);
      S.sessItems++;
      if (out.correct) { S.sessCorrect++; r.combo = (r.combo || 0) + 1; } else { r.combo = 0; }
      r.results.push({ item: item, correct: out.correct, given: out.givenText, expected: out.expectedText });

      $('#feedback').innerHTML =
        '<div class="verdict ' + (out.correct ? 'ok' : 'no') + '">' +
          '<div class="verdict-h">' + (out.correct ? '✓ Correct' : '✕ Not quite') +
            (fast ? '<span class="bonus-note">time bonus +' + E.XP_SPEED + '</span>' : '') + '</div>' +
          (out.correct ? '' : '<div class="verdict-exp">You chose: ' + esc(out.givenText) +
            '<br>Answer: ' + esc(out.expectedText) + '</div>') +
          (!out.correct && item.fb && typeof view.response() === 'number' && item.fb[view.response()]
            ? '<div class="verdict-exp">' + esc(item.fb[view.response()]) + '</div>' : '') +
          '<div class="verdict-w">' + item.why + '</div>' +
        '</div>';

      if (out.correct && S.p.lastGain) {
        var f = E.el('span', 'xpfloat' + (fast ? '' : ' plain'), '+' + S.p.lastGain);
        $('.qfoot').appendChild(f);
        setTimeout(function () { if (f.parentNode) f.parentNode.removeChild(f); }, 1200);
      }

      var btn = $('#p-check');
      btn.textContent = r.i + 1 >= r.items.length ? 'See your result' : 'Next →';
      btn.disabled = false;
      paintHeader();
      syncSoon();
      $('#feedback').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });

    function next() {
      stopTimer();
      r.i++;
      if (r.i >= r.items.length) finishRun(); else renderQ();
    }
    function onKey(e) {
      if (e.key !== 'Enter' || e.target.tagName === 'INPUT') return;
      var btn = $('#p-check');
      if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
    }
    document.addEventListener('keydown', onKey);
    r.cleanup = function () { document.removeEventListener('keydown', onKey); };
  }

  /* =====================================================================
     PRACTICE RESULT
     ===================================================================== */
  function finishRun() {
    var r = S.run;
    if (!r) return;
    if (r.cleanup) { r.cleanup(); r.cleanup = null; }
    if (S.sprintClock) { clearInterval(S.sprintClock); S.sprintClock = null; }
    if (r.finished) return; r.finished = true;
    var correct = r.results.filter(function (x) { return x.correct; }).length;
    var score = correct / Math.max(1, r.kind === 'sprint' ? r.items.length : r.results.length);
    var passed, head, note;

    if (r.kind === 'module') {
      P.finishSub(S.p, r.subId, score);
      passed = score >= E.PASS_SUB;
      head = passed ? 'Module cleared' : 'Not yet — run it again';
      note = passed
        ? 'You need 60% to clear a module, and you have it. Anything you missed has gone onto your fault list and will come back.'
        : 'You need 60% to clear this one. Read the explanation again and retry — the questions stay the same, so the misses are worth studying.';
    } else if (r.kind === 'check') {
      P.finishCheck(S.p, r.checkId, score, r.hintedAny);
      passed = score >= E.PASS_CHECK;
      head = score >= 1 ? 'All green. Perfect check.' : passed ? 'Stage check cleared' : 'Check held';
      note = passed ? 'That level is green. Your rank has been recalculated.'
                    : 'You need 75% to clear a stage check. The modules you lost marks on are listed below.';
    } else if (r.kind === 'set') {
      if (!S.p.assignment) S.p.assignment = { itemIds: [] };
      S.p.assignment.done = true;
      S.p.assignment.score = score;
      S.p.assignment.completedAt = new Date().toISOString();
      passed = score >= 0.7;
      head = 'Paper submitted';
      note = 'Your teacher can see this result and the full breakdown.';
    } else if (r.kind === 'exit') {
      S.p.exits = S.p.exits || {};
      S.p.exits[r.sprintKey] = { score: score, at: new Date().toISOString(), n: r.items.length };
      passed = score >= 0.6;
      head = correct + ' of ' + r.items.length + ' on today\'s exit ticket';
      note = passed ? 'Ticket done. Anything you missed is on your fault list and in your teacher\'s weak-tag view for the next lesson.'
                    : 'Ticket done \u2014 read the explanations below. Your teacher will open the next lesson on whatever the class missed most.';
    } else if (r.kind === 'sprint') {
      var used = Math.round((Date.now() - r.started) / 1000);
      S.p.sprints = S.p.sprints || {};
      var rec = S.p.sprints[r.sprintKey] || { runs: 0, best: 0 };
      rec.runs++; rec.last = score; rec.lastSec = used; rec.at = new Date().toISOString();
      if (score > rec.best || (score === rec.best && (!rec.bestSec || used < rec.bestSec))) { rec.best = score; rec.bestSec = used; }
      S.p.sprints[r.sprintKey] = rec;
      passed = score >= 0.8;
      head = correct + ' of ' + r.items.length + (r.timeUp ? ' · time up' : ' in ' + mmss(used));
      note = r.timeUp ? 'The clock won. ' + (r.items.length - r.results.length) + ' question(s) were left unanswered — in a real paper those are free marks thrown away. Next time: answer, and move on.'
        : score >= 0.8 ? 'Fast and accurate. Try to beat ' + mmss(used) + ' next time without dropping a mark.'
        : 'You beat the clock but lost marks. Speed only counts once accuracy is there: read the explanations below, then run it again.';
    } else if (r.kind === 'speed') {
      var cov = P.tagsCovered(S.p);
      passed = true;
      head = correct + ' of ' + r.results.length;
      note = cov.seen >= cov.total
        ? 'That is every rule in the course met at least once. Read the revision sheet again, then sit a final check under the clock.'
        : 'You have now met ' + cov.seen + ' of the ' + cov.total + ' rules the course teaches. Another round covers twenty more.';
    } else {
      passed = true;
      head = 'Fault list cleared';
      note = 'A question you get right twice in a row leaves the list for good.';
    }

    var misses = r.results.filter(function (x) { return !x.correct; });
    var html = '<div class="play"><div class="card result">' +
      '<div class="score-ring" style="--p:' + pct(score) + '"><i>' + pct(score) + '%</i></div>' +
      '<h3>' + esc(head) + '</h3><p>' + esc(note) + '</p>';
    if (misses.length) {
      html += '<div class="misslist">' + misses.map(function (m) {
        var rem = C.REMEDIATION[m.item.tag];
        return '<div class="miss"><b>' + esc(rem ? rem.name : m.item.tag) + '</b>' + m.item.why + '</div>';
      }).join('') + '</div>';
    }
    html += '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">' +
      '<button class="btn primary" id="r-map">' +
        (r.kind === 'sprint' || r.kind === 'exit' || r.kind === 'speed' ? 'Back to your route' : S.planReturn ? 'Back to the checklist' : 'Back to the stages') +
      '</button>' +
      (r.kind === 'module' || r.kind === 'check' ? '<button class="btn" id="r-again">Try again</button>' : '') +
      (r.kind === 'speed' ? '<button class="btn primary" id="r-speed">Another twenty</button>' : '') +
      (r.kind === 'sprint' ? '<button class="btn primary" id="r-sprint">Run it again</button>' : '') +

      '</div></div></div>';

    $('#view-play').innerHTML = html;
    var earned = P.checkBadges(S.p);
    paintHeader();
    sync();
    var rs = $('#r-speed');
    if (rs) rs.addEventListener('click', function () { S.run = null; startSpeed(20); });
    var rsp = $('#r-sprint');
    if (rsp) rsp.addEventListener('click', function () { S.run = null; startSpiral(r.sprintKey); });
    $('#r-map').addEventListener('click', function () {
      var wasSpeed = r.kind === 'speed';
      S.run = null;
      if (r.kind === 'sprint' || r.kind === 'exit' || wasSpeed) { S.planReturn = false; show('plan'); return; }
      if (S.planReturn) { S.planReturn = false; show('plan'); } else show('map');
    });
    var again = $('#r-again');
    if (again) again.addEventListener('click', function () {
      if (r.kind === 'module') startRun('module', E.Bank.sub(r.subId).items, { subId: r.subId, title: r.title });
      else startRun('check', r.items, { checkId: r.checkId, title: r.title });
    });
    if (earned.length) S.celebrateTimer = setTimeout(function () { celebrate(earned[0], earned.slice(1)); }, 600);
  }

  function celebrate(badge, rest) {
    modal('<div class="seal">★</div>' +
      '<p class="kicker">Award unlocked</p>' +
      '<h3 style="font-size:1.4rem">' + esc(badge.name) + '</h3>' +
      '<p style="color:var(--ink-2);font-size:.95rem">' + esc(badge.perk) + '</p>' +
      '<p class="tiny">' + esc(badge.how) + '</p>' +
      '<button class="btn primary wide" data-close>Collect</button>');
    if (rest && rest.length) {
      var b = document.querySelector('[data-close]');
      b.addEventListener('click', function () {
        S.celebrateTimer = setTimeout(function () { celebrate(rest[0], rest.slice(1)); }, 260);
      });
    }
  }

  /* =====================================================================
     FAULT LIST
     ===================================================================== */
  function paintFaults() {
    var due = P.dueReview(S.p);
    var all = Object.keys(S.p.review).filter(function (id) { return E.Bank.item(id); });
    var html = '<div class="sect-h"><div><h2>Fault list</h2>' +
      '<p style="color:var(--ink-2);font-size:.92rem;margin-top:4px">Every question you get wrong is logged here and comes back a session or two later. Get one right twice in a row and it clears for good. The gap is the point.</p></div></div>';

    if (!all.length) {
      html += '<div class="card empty">Nothing logged. Every question you have answered wrong has been cleared.</div>';
    } else {
      html += '<div class="card" style="padding:var(--pad);display:flex;flex-direction:column;gap:12px">' +
        '<div style="display:flex;gap:14px;flex-wrap:wrap">' +
        '<span class="pill' + (due.length ? ' bad' : ' good') + '">' + due.length + ' due now</span>' +
        '<span class="pill">' + all.length + ' on the list</span>' +
        '<span class="pill gold">' + (S.p.reclaimed || 0) + ' cleared</span></div>';
      var tagCount = {};
      all.forEach(function (id) { var t = E.Bank.item(id).tag; tagCount[t] = (tagCount[t] || 0) + 1; });
      html += '<div style="display:flex;flex-direction:column;gap:7px">' +
        Object.keys(tagCount).sort(function (a, b) { return tagCount[b] - tagCount[a]; }).map(function (t) {
          return '<div style="display:flex;justify-content:space-between;gap:12px;font-size:.9rem">' +
            '<span>' + esc((C.REMEDIATION[t] || {}).name || t) + '</span>' +
            '<span style="color:var(--ink-3);font-family:var(--f-mono);font-size:.82rem">' + tagCount[t] + '</span></div>';
        }).join('') + '</div>';
      html += due.length
        ? '<button class="btn primary wide" id="fx-go">Clear ' + Math.min(due.length, 12) + ' now</button>'
        : '<p class="tiny">Nothing is due yet. Questions come back after a session or two.</p>';
      html += '</div>';
    }
    $('#view-faults').innerHTML = html;
    var g = $('#fx-go');
    if (g) g.addEventListener('click', function () {
      startRun('faults', E.shuffle(due).slice(0, 12).map(E.Bank.item), { title: 'Fault list' });
    });
  }

  /* =====================================================================
     MOCK PAPERS
     ===================================================================== */
  function confirmSim(mockId) {
    var m = E.Bank.mock(mockId);
    modal('<p class="kicker">Before you start</p>' +
      '<h3 style="font-size:1.25rem">' + esc(m.name) + '</h3>' +
      '<p style="color:var(--ink-2);font-size:.93rem">' + m.minutes + ' minutes for ' + (m.total || 20) + ' questions. ' +
      'The clock runs from the moment you press start and does not stop. You can move between questions freely, ' +
      'and the paper submits itself when the time is up.</p>' +
      '<button class="btn primary wide" id="sim-start">Start the clock</button>' +
      '<button class="btn ghost wide" data-close>Not now</button>');
    $('#sim-start').addEventListener('click', function () {
      $('#modal-slot').innerHTML = '';
      startExam(mockId);
    });
  }

  function startExam(mockId) {
    var m = E.Bank.mock(mockId);
    var items = E.Bank.mockItems(m);
    S.exam = {
      mock: m, items: items, i: 0,
      answers: new Array(items.length),
      endAt: Date.now() + m.minutes * 60000,
      startedAt: Date.now(), tick: null,
      /* Where the minutes actually go. Students lose this paper on the clock
         as often as on the grammar, and nothing in the app told them so. */
      spent: new Array(items.length), onQ: Date.now()
    };
    for (var z = 0; z < items.length; z++) S.exam.spent[z] = 0;
    show('play');
    renderExam();
    S.exam.tick = setInterval(function () {
      if (!S.exam) return;
      var left = Math.max(0, Math.round((S.exam.endAt - Date.now()) / 1000));
      var c = $('#exam-clock');
      if (c) { c.textContent = mmss(left); c.classList.toggle('low', left <= 300); }
      paintPace();
      if (left <= 0) { submitExam(true); }
    }, 1000);
  }

  /* Charge the elapsed time to the question the student is leaving. Called
     on every move, so the total is what they actually spent looking at it. */
  function chargeTime() {
    var x = S.exam;
    if (!x) return;
    var now = Date.now();
    x.spent[x.i] = (x.spent[x.i] || 0) + Math.round((now - x.onQ) / 1000);
    x.onQ = now;
  }

  /* One mark a question is the budget the paper sets: twenty marks across
     the paper's minutes, shared out in proportion to each section's size. */
  function paceOf(x) {
    var totalMarks = 0;
    x.mock.sections.forEach(function (s) { totalMarks += s.points * s.items.length; });
    var perMark = (x.mock.minutes * 60) / (totalMarks || 1);
    var used = 0, budget = 0, k = 0;
    x.mock.sections.forEach(function (sec) {
      sec.items.forEach(function () {
        if (x.answers[k] != null || k < x.i) budget += sec.points * perMark;
        used += x.spent[k] || 0;
        k++;
      });
    });
    return { used: used, budget: budget, perMark: perMark };
  }

  /* How far ahead or behind the budget they are, right now. Said in minutes,
     because "four minutes behind" is actionable and "83% pace" is not. */
  function paintPace() {
    var el = $('#exam-pace'), x = S.exam;
    if (!el || !x) return;
    var elapsed = Math.round((Date.now() - x.startedAt) / 1000);
    var answered = x.answers.filter(function (a) { return a != null; }).length;
    if (answered < 3) { el.textContent = ''; el.className = 'pace'; return; }
    var perQ = (x.mock.minutes * 60) / x.items.length;
    var should = answered * perQ;
    var diff = Math.round((should - elapsed) / 60);
    if (Math.abs(diff) < 2) { el.textContent = 'on pace'; el.className = 'pace ok'; return; }
    el.textContent = Math.abs(diff) + ' min ' + (diff > 0 ? 'ahead' : 'behind');
    el.className = 'pace ' + (diff > 0 ? 'ok' : 'low');
  }

  function sectionFor(item) {
    var m = S.exam.mock, out = null;
    m.sections.forEach(function (s) { if (s.items.indexOf(item) >= 0) out = s; });
    return out;
  }

  function renderExam() {
    var x = S.exam, item = x.items[x.i];
    var sec = sectionFor(item);
    var left = Math.max(0, Math.round((x.endAt - Date.now()) / 1000));

    var nav = '<div class="examnav">' + x.items.map(function (it, i) {
      var cls = i === x.i ? 'here' : (x.answers[i] != null ? 'ans' : '');
      return '<button class="' + cls + '" data-jump="' + i + '">' + (i + 1) + '</button>';
    }).join('') + '</div>';

    $('#view-play').innerHTML = '<div class="play">' +
      '<div class="examtop">' +
        '<span class="sec">' + esc(sec.part) + ' · ' + esc(sec.title) + '</span>' +
        '<span class="qcount">Question ' + (x.i + 1) + ' of ' + x.items.length + '</span>' +
        '<span class="clock' + (left <= 300 ? ' low' : '') + '" id="exam-clock">' + mmss(left) + '</span>' +
        '<span class="pace" id="exam-pace"></span>' +
      '</div>' +
      '<div class="instr"><b>Instructions</b>' + esc(sec.instructions) + '</div>' +
      '<div class="card qcard">' +
        '<div class="qtype"><span>' + esc(E.TYPE_LABEL[item.type] || 'Question') + '</span>' +
        '<span class="lv">' + (sec.points === 1 ? '1 mark' : sec.points + ' marks') + '</span></div>' +
        '<div id="qhost"></div>' +
        '<div class="qfoot">' +
          '<button class="btn sm" id="x-prev"' + (x.i === 0 ? ' disabled' : '') + '>← Back</button>' +
          '<span class="grow"></span>' +
          '<button class="btn sm ghost" id="x-submit">Submit paper</button>' +
          '<button class="btn primary" id="x-next">' + (x.i + 1 >= x.items.length ? 'Review' : 'Next →') + '</button>' +
        '</div>' +
      '</div>' + nav + '</div>';

    paintPace();
    var host = $('#qhost');
    E.mount(item, host);
    /* Restore a previous choice. Every mock item is a four-option or
       four-segment click, so the selection can simply be replayed. */
    var buttons = host.querySelectorAll('.opt, .seg');
    if (x.answers[x.i] != null && buttons[x.answers[x.i]]) buttons[x.answers[x.i]].click();
    host.addEventListener('respond', function () {
      var bs = host.querySelectorAll('.opt.sel, .seg.sel');
      if (!bs.length) return;
      var all = host.querySelectorAll('.opt, .seg');
      for (var i = 0; i < all.length; i++) if (all[i] === bs[0]) x.answers[x.i] = i;
      document.querySelectorAll('.examnav button')[x.i].classList.add('ans');
    });

    $('#x-prev').addEventListener('click', function () { if (x.i > 0) { chargeTime(); x.i--; renderExam(); } });
    $('#x-next').addEventListener('click', function () {
      chargeTime();
      if (x.i + 1 >= x.items.length) reviewExam(); else { x.i++; renderExam(); }
    });
    $('#x-submit').addEventListener('click', function () { chargeTime(); reviewExam(); });
    $('#view-play').querySelectorAll('[data-jump]').forEach(function (b) {
      b.addEventListener('click', function () { chargeTime(); x.i = +b.dataset.jump; renderExam(); });
    });
    window.scrollTo({ top: 0 });
  }

  function reviewExam() {
    var x = S.exam;
    var blank = [];
    x.answers.forEach(function (a, i) { if (a == null) blank.push(i + 1); });
    modal('<p class="kicker">Before you submit</p>' +
      '<h3 style="font-size:1.2rem">' + (blank.length ? blank.length + ' unanswered' : 'All 20 answered') + '</h3>' +
      '<p style="color:var(--ink-2);font-size:.92rem">' +
      (blank.length ? 'Questions ' + blank.slice(0, 14).join(', ') + (blank.length > 14 ? '…' : '') +
        ' are still blank. There is no penalty for a guess here, and a guess you get wrong still tells the app where to send you.'
        : 'Nothing is blank. You can still go back and change an answer.') + '</p>' +
      '<button class="btn primary wide" id="x-final">Submit and mark</button>' +
      '<button class="btn ghost wide" data-close>Keep working</button>');
    $('#x-final').addEventListener('click', function () {
      $('#modal-slot').innerHTML = '';
      submitExam(false);
    });
  }

  function submitExam(timedOut) {
    var x = S.exam;
    if (!x) return;
    clearInterval(x.tick);
    var rows = [], results = [];
    x.items.forEach(function (item, i) {
      var given = x.answers[i];
      var correct = given != null && given === item.answer;
      var row = P.recordAttempt(S.p, item, correct, 0, false, false);
      row.given = given == null ? '(blank)' : String(given + 1);
      row.expected = String(item.answer + 1);
      row.mode = 'mock:' + x.mock.id;
      rows.push(row);
      results.push({ item: item, correct: correct, given: given });
    });
    chargeTime();
    var scored = P.scoreMock(x.mock, results);
    var durationSec = Math.round((Date.now() - x.startedAt) / 1000);
    /* Seconds per section, against the one-mark-a-question budget the paper
       sets. Kept on the record so the student can look at it later. */
    var pace = [], qi = 0, totalMarks = 0;
    x.mock.sections.forEach(function (sec) { totalMarks += sec.points * sec.items.length; });
    var perMark = (x.mock.minutes * 60) / (totalMarks || 1);
    x.mock.sections.forEach(function (sec) {
      var used = 0;
      sec.items.forEach(function () { used += x.spent[qi] || 0; qi++; });
      pace.push({ code: sec.code, title: sec.title,
                  used: used, budget: Math.round(sec.points * sec.items.length * perMark) });
    });
    rows.push({
      kind: 'mock', ts: new Date().toISOString(), studentId: S.p.studentId,
      mockId: x.mock.id, marks: scored.got, total: scored.total,
      pct: Math.round(scored.pct * 1000) / 1000, durationSec: durationSec,
      sections: scored.bySection
    });
    api.enqueue(rows);
    S.sessItems += x.items.length;
    S.sessCorrect += results.filter(function (r) { return r.correct; }).length;
    P.finishMock(S.p, x.mock.id, scored);
    buildPlan(S.p, x.mock.id, results);
    /* Keep the answers, not the questions: the bank already holds those, so a
       student who comes back a week later can still read the whole paper back. */
    S.p.mocks[x.mock.id].pace = pace;
    S.p.mocks[x.mock.id].review = results.map(function (r) {
      return { i: r.item.id, g: r.given == null ? null : r.given };
    });
    var earned = P.checkBadges(S.p);
    paintHeader();
    sync();
    showExamResult(x.mock, scored, results, durationSec, timedOut, pace);
    S.exam = null;
    if (earned.length) S.celebrateTimer = setTimeout(function () { celebrate(earned[0], earned.slice(1)); }, 700);
  }

  function showExamResult(mock, scored, results, durationSec, timedOut, pace) {
    var order = [];
    mock.sections.forEach(function (s) {
      var b = scored.bySection[s.code] || { got: 0, total: 0, right: 0, n: 0 };
      order.push({ s: s, b: b });
    });
    var wrong = results.filter(function (r) { return !r.correct; });

    var html = '<div class="play"><div class="card result">' +
      '<div class="score-ring" style="--p:' + pct(scored.pct) + '"><i>' + pct(scored.pct) + '%</i></div>' +
      '<h3>' + esc(mock.name) + ' · ' + scored.got + ' / ' + scored.total + '</h3>' +
      '<p>' + (timedOut ? 'Time ran out and the paper submitted itself. ' : '') +
      'You took ' + mmss(durationSec) + ' of the ' + mock.minutes + ' minutes allowed. ' +
      (scored.pct >= 0.8 ? 'That is a strong paper.' : scored.pct >= 0.6 ? 'A solid pass with clear gaps — see the breakdown.' :
       'Work through the weakest section below before sitting another simulation.') + '</p>';

    html += '<table class="sectable"><thead><tr><th>Section</th><th>Marks</th><th>Correct</th><th>%</th></tr></thead><tbody>';
    order.forEach(function (o) {
      var p2 = o.b.total ? o.b.got / o.b.total : 0;
      html += '<tr' + (p2 < 0.6 ? ' class="low"' : '') + '><td>' + esc(o.s.part.replace('PART ', '')) + ' — ' + esc(o.s.title) + '</td>' +
        '<td class="n">' + o.b.got + '/' + o.b.total + '</td>' +
        '<td class="n">' + o.b.right + '/' + o.b.n + '</td>' +
        '<td class="n">' + pct(p2) + '%</td></tr>';
    });
    html += '</tbody></table>';

    /* Where the time went. Every question is worth one mark, so each section's
       budget is just its share of the clock. */
    if (pace && pace.length) {
      var over = pace.filter(function (q) { return q.used > q.budget * 1.25; });
      html += '<p class="kicker" style="align-self:flex-start;margin-top:10px">Where the time went</p>';
      html += '<table class="sectable"><thead><tr><th>Section</th><th>You took</th><th>Budget</th><th></th></tr></thead><tbody>';
      pace.forEach(function (q) {
        var late = q.used > q.budget * 1.25, early = q.used < q.budget * 0.5;
        html += '<tr' + (late ? ' class="low"' : '') + '><td>' + esc(q.code) + ' \u2014 ' + esc(q.title) + '</td>' +
          '<td class="n">' + mmss(q.used) + '</td><td class="n">' + mmss(q.budget) + '</td>' +
          '<td class="n">' + (late ? 'over' : early ? 'rushed' : 'fine') + '</td></tr>';
      });
      html += '</tbody></table>';
      html += '<p class="tiny">' + (timedOut
        ? 'The clock beat you. '
        : '') + (over.length
        ? 'You spent well over the budget on ' + over.map(function (q) { return q.code; }).join(' and ') +
          '. Under a clock that time has to come from somewhere, and it comes out of whatever you reach last.'
        : 'Your pacing is sound. Keep the longest section for last and give it the time it is budgeted.') + '</p>';
    }

    if (wrong.length) {
      html += '<p class="kicker" style="align-self:flex-start;margin-top:8px">Every question you missed</p>';
      html += '<div class="misslist">' + wrong.map(function (r) {
        var it = r.item, n = mock.sections.length;
        var num = String(it.id).split('-')[1];
        var rem = C.REMEDIATION[it.tag] || {};
        return '<div class="miss"><b>Q' + esc(num) + ' · ' + esc(rem.name || it.tag) + '</b>' +
          '<div style="font-family:var(--f-mono);font-size:.8rem;color:var(--ink-3);margin-bottom:6px">' +
          'You: ' + (r.given == null ? 'blank' : r.given + 1) + ' &nbsp;·&nbsp; Answer: ' + (it.answer + 1) + '</div>' +
          it.why + '</div>';
      }).join('') + '</div>';
      html += '<p class="tiny">Each of these has been added to your fault list, so they will come back in ordinary practice.</p>';
    }

    html += '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:6px">' +
      '<button class="btn primary" id="x-done">See what to work on</button>' +
      '<button class="btn" id="x-review">Read every question back</button>' +
      (wrong.length ? '<button class="btn" id="x-errs">Examine errors (' + wrong.length + ')</button>' : '') +
      '<button class="btn" id="x-sims">The stage map</button></div>' +
      '</div></div>';
    $('#view-play').innerHTML = html;
    $('#x-done').addEventListener('click', function () { show('plan'); });
    $('#x-review').addEventListener('click', function () { openReview(mock.id, false); });
    var xe = $('#x-errs');
    if (xe) xe.addEventListener('click', function () { openReview(mock.id, true); });
    $('#x-sims').addEventListener('click', function () { show('map'); });
  }

  /* =====================================================================
     RECORD
     ===================================================================== */
  function paintRecord() {
    var p = S.p;
    var a = p.assignment;
    var html = '<div class="sect-h"><div><h2>Record</h2>' +
      '<p style="color:var(--ink-2);font-size:.92rem;margin-top:4px">Where each of the nine stages stands, and what you have earned.</p></div>' +
      '<span class="pill gold">' + p.badges.length + ' of ' + C.BADGES.length + ' awards</span></div>';

    if (a) {
      html += '<div class="card" style="padding:var(--pad);margin-bottom:16px;display:flex;flex-direction:column;gap:10px">' +
        '<p class="kicker">Set by your teacher</p>' +
        (a.done
          ? '<h3 style="font-size:1.2rem">You scored ' + pct(a.score) + '%</h3><p class="tiny">Submitted ' +
            esc(new Date(a.completedAt).toLocaleDateString()) + ' · ' + a.itemIds.length + ' questions.</p>'
          : '<h3 style="font-size:1.2rem">' + a.itemIds.length + ' questions are waiting for you</h3>' +
            '<p style="color:var(--ink-2);font-size:.92rem">No hints on this one. Take it when you have twenty quiet minutes.</p>' +
            '<button class="btn primary" id="set-go" style="align-self:flex-start">Start</button>') +
        '</div>';
    }

    html += '<div class="card" style="padding:var(--pad);margin-bottom:16px">' +
      '<p class="kicker" style="margin-bottom:6px">Rank</p>' +
      '<h3 style="font-size:1.3rem">' + esc(P.rank(p).name) + '</h3>' +
      '<p style="color:var(--ink-2);font-size:.93rem;margin-top:4px">' + esc(P.rank(p).note) + '</p>' +
      '<div style="margin-top:12px"><div class="bar-line gold"><span style="width:' +
      (P.checksCleared(p) / E.Bank.allLevels().length * 100) + '%"></span></div></div></div>';

    html += '<div class="card" style="padding:var(--pad);margin-bottom:16px">' +
      '<p class="kicker" style="margin-bottom:12px">Stages</p><div class="sysgrid">';
    P.systemScores(p).forEach(function (r) {
      html += '<div class="systile' + (r.pct >= 90 ? ' done' : '') + '">' +
        '<span>' + esc(r.code) + '</span><b>' + esc(r.name) + '</b>' +
        '<div class="bar-line"><span style="width:' + r.pct + '%"></span></div>' +
        '<span>' + r.pct + '%</span></div>';
    });
    html += '</div></div>';

    html += '<p class="kicker" style="margin-bottom:10px">Awards</p><div class="awards">';
    C.BADGES.forEach(function (b) {
      var got = p.badges.indexOf(b.id) >= 0;
      html += '<div class="award ' + (got ? 'got' : 'locked') + '">' +
        '<span class="award-i">' + (got ? '★' : '·') + '</span>' +
        '<span><span class="award-n">' + esc(b.name) + '</span>' +
        '<span class="award-p">' + esc(b.perk) + '</span>' +
        '<span class="award-h">' + esc(b.how) + '</span></span></div>';
    });
    html += '</div>';
    $('#view-record').innerHTML = html;
    var g = $('#set-go');
    if (g) g.addEventListener('click', function () {
      var items = S.p.assignment.itemIds.map(E.Bank.item).filter(Boolean);
      startRun('set', items, { title: 'Set paper' });
    });
  }

  /* =====================================================================
     SETTINGS
     ===================================================================== */
  function paintSettings() {
    var pending = api.pendingCount();
    $('#view-settings').innerHTML = '<div class="sect-h"><h2>Settings</h2></div>' +
      '<div class="card settings">' +
        '<div class="field"><label>Signed in as</label>' +
        '<p style="font-weight:600">' + esc(S.p.displayName) + ' <span style="color:var(--ink-3);font-weight:400">(' + esc(S.p.studentId) + ')</span></p></div>' +
        '<div class="field"><label>Reading level</label>' +
        '<button class="btn sm" id="s-simple" style="align-self:flex-start">' +
        (S.simple ? 'Explanations are in simple English — switch back' : 'Use simpler English in the explanations') + '</button></div>' +
        '<div class="field"><label>Saving</label>' +
        '<p style="font-size:.9rem;color:var(--ink-2)">' +
        (!pending ? 'Everything you have answered has been sent to your teacher.'
          : 'You have ' + pending + ' answer' + (pending === 1 ? '' : 's') +
            ' waiting to be sent. They are saved on this device and go up on their own — you do not need to do anything.') +
        '</p></div>' +
        '<div class="field"><label>Account</label>' +
        '<button class="btn sm" id="s-out" style="align-self:flex-start">Log out</button></div>' +
      '</div>';
    $('#s-simple').addEventListener('click', function () { S.simple = !S.simple; paintSettings(); });
    $('#s-out').addEventListener('click', logout);
  }

  /* The ribbon is fixed, so the page starts below it — and it wraps to two
     lines on a narrow phone, so measure rather than assume. */
  function sizeRibbon() {
    var r = document.querySelector('.ribbon');
    if (r) document.documentElement.style.setProperty('--ribbon-h', r.offsetHeight + 'px');
  }
  sizeRibbon();
  window.addEventListener('resize', sizeRibbon);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeRibbon);

  /* Almost every visitor is on the roster, so open on the tab that costs them
     one tap instead of a typed ID. A class list that is empty or missing
     falls back to the ordinary sign-in. */
  setMode((typeof ROSTER !== 'undefined' && ROSTER && ROSTER.length) ? 'fast' : 'in');
})();
