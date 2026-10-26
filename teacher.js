/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — teacher.js (progress tab; the Writing Room tab is teacher-write.js)  (The Console)
   =========================================================================== */
(function () {
  'use strict';
  var C = window.CONTENT, E = window.Engine, P = E.Progress, api = window.API;
  var $ = function (s) { return document.querySelector(s); };
  var esc = E.esc;
  var T = { roster: [], sel: null, detail: null, q: '', sort: 'ready', dir: -1 };

  function toast(m) {
    $('#toast-slot').innerHTML = '<div style="position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:60;background:var(--ink);color:var(--ground);padding:11px 18px;border-radius:99px;font-size:.9rem;font-weight:600;box-shadow:var(--shadow-l)">' + esc(m) + '</div>';
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { $('#toast-slot').innerHTML = ''; }, 2600);
  }
  function pct(x) { return Math.round((x || 0) * 100); }
  function ago(iso) {
    if (!iso) return '—';
    var d = Math.floor((Date.now() - new Date(iso)) / 86400000);
    if (d <= 0) return 'today';
    if (d === 1) return 'yesterday';
    if (d < 30) return d + 'd ago';
    return new Date(iso).toLocaleDateString();
  }
  function hhmm(sec) {
    if (!sec) return '—';
    var m = Math.floor(sec / 60), s = sec % 60;
    return m ? m + 'm ' + s + 's' : s + 's';
  }
  function stripTags(s) { return String(s == null ? '' : s).replace(/<[^>]+>/g, ''); }

  /* ------------------------------------------------------------- sign in */
  try { $('#url').value = api.url || ''; } catch (e) {}
  function enter() {
    var pin = $('#pin').value.trim();
    var url = $('#url').value.trim();
    if (url !== (api.url || '')) api.setUrl(url);
    api.teacherLogin(pin).then(function (r) {
      if (!r || !r.ok) {
        var m = $('#gate-msg'); m.classList.remove('hidden');
        m.textContent = (r && r.error) || 'Wrong PIN.';
        return;
      }
      $('#gate').classList.add('hidden');
      $('#app').classList.remove('hidden');
      paintMode(); load(); checkLink();
    });
  }
  $('#gate-go').addEventListener('click', enter);
  $('#pin').addEventListener('keydown', function (e) { if (e.key === 'Enter') enter(); });
  $('#t-out').addEventListener('click', function () { location.reload(); });
  $('#t-refresh').addEventListener('click', function () { load(); toast('Refreshed.'); });
  var qbox = $('#q');
  if (qbox) qbox.addEventListener('input', function () { T.q = qbox.value.trim(); paintRoster(); });

  /* A silent fall-back to local data is the one failure a teacher must not
     miss, so say which sheet is answering. */
  function checkLink() {
    if (!api.url) return;
    api.ping().then(function (r) {
      if (r.ok) {
        $('#top-sub').textContent = 'Connected · ' + (r.sheet || 'class sheet');
        toast('Connected to ' + (r.sheet || 'the class sheet') + '.');
      } else {
        $('#top-sub').textContent = 'Server not answering — showing local data';
        $('#modebar-slot').innerHTML = '<div class="wrap"><div class="modebar">' +
          '<span><b>Not connected</b> &nbsp;The class server did not answer, so this is local data only. ' +
          'Check the Apps Script deployment is <em>Execute as: Me</em> and <em>Access: Anyone</em>, ' +
          'and that you deployed a <em>new version</em> after your last edit.' +
          (r.error ? ' &nbsp;(' + esc(r.error) + ')' : '') + '</span></div></div>';
      }
    });
  }
  function paintMode() {
    $('#top-sub').textContent = api.mode === 'cloud' ? 'Connected to the class sheet' : 'Local data, this browser only';
    $('#modebar-slot').innerHTML = api.mode === 'cloud' ? '' :
      '<div class="wrap"><div class="modebar"><span><b>Offline</b> &nbsp;Showing data saved in this browser. ' +
      'Add your Apps Script URL on the sign-in screen to read the real class sheet.</span></div></div>';
  }

  /* ---------------------------------------------------------------- load */
  function load() {
    api.roster().then(function (r) {
      T.roster = (r && r.students) || [];
      paintStats(); paintRoster(); paintHeat(); paintSystems();
      if (T.sel) openStudent(T.sel);
    });
  }

  function bestMock(p) {
    var m = p.mocks || {}, b = 0;
    Object.keys(m).forEach(function (k) { if (m[k].best > b) b = m[k].best; });
    return b;
  }

  function paintStats() {
    var n = T.roster.length;
    var active = T.roster.filter(function (s) {
      return s.progress && s.progress.lastActiveDate && E.daysBetween(s.progress.lastActiveDate, E.today()) <= 7;
    }).length;
    var ready = n ? Math.round(T.roster.reduce(function (a, s) { return a + P.readiness(s.progress || P.blank(s.id)); }, 0) / n) : 0;
    var acc = (function () {
      var seen = 0, cor = 0;
      T.roster.forEach(function (s) { var st = (s.progress || {}).stats; if (st) { seen += st.seen; cor += st.correct; } });
      return seen ? Math.round(100 * cor / seen) : 0;
    })();
    var sat = T.roster.filter(function (s) { return Object.keys(((s.progress || {}).mocks) || {}).length; });
    var simMean = sat.length ? Math.round(100 * sat.reduce(function (a, s) { return a + bestMock(s.progress); }, 0) / sat.length) : 0;
    $('#stats').innerHTML =
      '<div class="stat"><b>' + n + '</b><span>Students</span></div>' +
      '<div class="stat"><b>' + active + '</b><span>Active this week</span></div>' +
      '<div class="stat"><b>' + ready + '%</b><span>Mean readiness</span></div>' +
      '<div class="stat"><b>' + acc + '%</b><span>Class accuracy</span></div>' +
      '<div class="stat"><b>' + (sat.length ? simMean + '%' : '—') + '</b><span>Mean best simulation</span></div>';
  }

  var COLS = [
    { k: 'name', t: 'Student' }, { k: 'rank', t: 'Rank' }, { k: 'ready', t: 'Readiness' },
    { k: 'acc', t: 'Accuracy' }, { k: 'sim', t: 'Best sim' }, { k: 'seen', t: 'Items' },
    { k: 'streak', t: 'Streak' }, { k: 'seen2', t: 'Last seen' }, { k: null, t: '' }
  ];

  function paintRoster() {
    $('#roster-n').textContent = T.roster.length + ' enrolled';
    if (!T.roster.length) {
      $('#roster').innerHTML = '<tbody><tr><td><div class="empty">No students yet. They appear here as soon as they create an account.</div></td></tr></tbody>';
      return;
    }
    var rows = T.roster.map(function (s) {
      var p = s.progress || P.blank(s.id, s.name);
      var stale = p.lastActiveDate ? E.daysBetween(p.lastActiveDate, E.today()) : 999;
      var cleared = P.checksCleared(p);
      var flag = '';
      if (!p.stats || p.stats.seen < 5) flag = '<span class="flag new">new</span>';
      else if (stale > 7) flag = '<span class="flag stall">stalled</span>';
      else if (cleared >= 18) flag = '<span class="flag fly">flying</span>';
      return {
        s: s, p: p, ready: P.readiness(p), rank: cleared, acc: P.accuracy(p),
        sim: Math.round(bestMock(p) * 100), flag: flag, stale: stale
      };
    });
    if (T.q) {
      var q = T.q.toLowerCase();
      rows = rows.filter(function (r) {
        return (r.p.displayName || '').toLowerCase().indexOf(q) >= 0 || r.s.id.toLowerCase().indexOf(q) >= 0;
      });
    }
    var key = T.sort, dir = T.dir;
    rows.sort(function (a, b) {
      var x, y;
      if (key === 'name') {
        x = (a.p.displayName || a.s.id).toLowerCase(); y = (b.p.displayName || b.s.id).toLowerCase();
        return x < y ? -dir : x > y ? dir : 0;
      }
      if (key === 'seen') { x = (a.p.stats || {}).seen || 0; y = (b.p.stats || {}).seen || 0; }
      else if (key === 'seen2') { x = -a.stale; y = -b.stale; }
      else if (key === 'streak') { x = a.p.streak || 0; y = b.p.streak || 0; }
      else { x = a[key] || 0; y = b[key] || 0; }
      return (x - y) * dir;
    });

    var html = '<thead><tr>' + COLS.map(function (c) {
      if (!c.k) return '<th></th>';
      var on = T.sort === c.k;
      return '<th class="sortable' + (on ? ' on' : '') + '" data-sort="' + c.k + '" tabindex="0">' +
        esc(c.t) + (on ? (dir < 0 ? ' ↓' : ' ↑') : '') + '</th>';
    }).join('') + '</tr></thead><tbody>';
    if (!rows.length) html += '<tr><td colspan="9"><div class="empty">No student matches that filter.</div></td></tr>';
    rows.forEach(function (r) {
      html += '<tr class="r' + (T.sel === r.s.id ? ' sel' : '') + '" data-id="' + esc(r.s.id) + '" tabindex="0">' +
        '<td><div class="who2"><b>' + esc(r.p.displayName || r.s.name) + '</b><span>' + esc(r.s.id) + '</span></div></td>' +
        '<td>' + esc(P.rank(r.p).name) + ' <span class="g" style="color:var(--ink-3);font-family:var(--f-mono);font-size:.75rem">' + r.rank + '/27</span></td>' +
        '<td><span class="mini"><i style="width:' + r.ready + '%"></i></span> <span style="font-family:var(--f-mono);font-size:.78rem">' + r.ready + '%</span></td>' +
        '<td class="num">' + r.acc + '%</td>' +
        '<td class="num">' + (r.sim ? r.sim + '%' : '—') + '</td>' +
        '<td class="num">' + ((r.p.stats || {}).seen || 0) + '</td>' +
        '<td class="num">' + (r.p.streak || 0) + '</td>' +
        '<td>' + esc(ago(r.p.lastActiveDate ? r.p.lastActiveDate + 'T12:00:00' : null)) + '</td>' +
        '<td>' + r.flag + '</td></tr>';
    });
    $('#roster').innerHTML = html + '</tbody>';
    $('#roster').querySelectorAll('tr.r').forEach(function (tr) {
      function open() { T.sel = tr.dataset.id; paintRoster(); openStudent(tr.dataset.id); }
      tr.addEventListener('click', open);
      tr.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    $('#roster').querySelectorAll('th.sortable').forEach(function (th) {
      function go() {
        var k = th.dataset.sort;
        if (T.sort === k) T.dir = -T.dir; else { T.sort = k; T.dir = k === 'name' ? 1 : -1; }
        paintRoster();
      }
      th.addEventListener('click', go);
      th.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  }

  function paintHeat() {
    var agg = {};
    T.roster.forEach(function (s) {
      var by = ((s.progress || {}).stats || {}).byTag || {};
      Object.keys(by).forEach(function (t) {
        var a = agg[t] || (agg[t] = { a: 0, c: 0 });
        a.a += by[t].a; a.c += by[t].c;
      });
    });
    var rows = Object.keys(agg).map(function (t) {
      var x = agg[t];
      return { tag: t, attempts: x.a, rate: x.a ? 1 - x.c / x.a : 0, name: (C.REMEDIATION[t] || {}).name || t };
    }).filter(function (r) { return r.attempts >= 3; });
    rows.sort(function (a, b) { return b.rate - a.rate; });
    rows = rows.slice(0, 8);
    if (!rows.length) { $('#heat').innerHTML = '<p class="tiny">Not enough answers yet to show a pattern.</p>'; return; }
    $('#heat').innerHTML = rows.map(function (r) {
      return '<div class="heat-row"><span>' + esc(r.name.split(' — ')[0]) + '</span>' +
        '<span class="heat-bar"><i style="width:' + Math.round(r.rate * 100) + '%"></i></span>' +
        '<span class="heat-n">' + Math.round(r.rate * 100) + '%</span></div>';
    }).join('') + '<p class="tiny" style="margin-top:8px">Error rate across the whole class, tags with at least three attempts. The top row is your best candidate for a whole-class lesson tomorrow.</p>';
  }

  function paintSystems() {
    if (!T.roster.length) { $('#sysbars').innerHTML = '<p class="tiny">No data yet.</p>'; return; }
    var sums = {};
    C.TOPICS.forEach(function (t) { sums[t.id] = 0; });
    T.roster.forEach(function (s) {
      var p = s.progress || P.blank(s.id);
      C.TOPICS.forEach(function (t) { sums[t.id] += P.topicPct(p, t); });
    });
    var n = T.roster.length;
    var rows = C.TOPICS.map(function (t) {
      return { code: t.code, name: t.name, pct: Math.round(sums[t.id] / n) };
    }).sort(function (a, b) { return a.pct - b.pct; });
    $('#sysbars').innerHTML = rows.map(function (r) {
      return '<div class="sysbar"><span>' + esc(r.name) + '</span>' +
        '<span class="sysbar-b"><i style="width:' + r.pct + '%"></i></span>' +
        '<span class="sysbar-n">' + r.pct + '%</span></div>';
    }).join('') + '<p class="tiny" style="margin-top:8px">Lowest first. This is coverage, not accuracy — a system at the top of this list is one the class has not worked through yet.</p>';
  }

  /* ------------------------------------------------------------- student */
  function openStudent(id) {
    api.detail(id).then(function (d) {
      if (!d || !d.ok) { $('#detail').innerHTML = '<div class="empty">Could not load that student.</div>'; return; }
      T.detail = d;
      var p = d.progress || P.blank(id);
      var weak = P.weakTags(p, 4), strong = P.strongTags(p, 4);
      var attempts = (d.attempts || []).filter(function (a) { return a && a.itemId; }).slice().reverse();
      var wrong = attempts.filter(function (a) { return a && a.itemId && !a.correct; });
      var sessions = (d.sessions || []).slice().reverse();
      var mocks = (d.mocks || []).slice().reverse();

      var h = '<div class="panel-h"><div><h2>' + esc(p.displayName || id) + '</h2>' +
        '<span class="kicker">' + esc(id) + ' · ' + esc(P.rank(p).name) + ' · ' +
        P.checksCleared(p) + '/27 checks · readiness ' + P.readiness(p) + '%</span></div>' +
        '<span class="pill' + (P.accuracy(p) >= 80 ? ' good' : P.accuracy(p) >= 60 ? '' : ' bad') + '">' +
        P.accuracy(p) + '% accurate</span></div>';

      /* ---- the stages, at a glance ---- */
      h += '<div class="sysbars" style="margin-bottom:16px">';
      P.systemScores(p).forEach(function (r) {
        h += '<div class="sysbar"><span>' + esc(r.code) + ' · ' + esc(r.name) + '</span>' +
          '<span class="sysbar-b"><i style="width:' + r.pct + '%"></i></span>' +
          '<span class="sysbar-n">' + r.pct + '%</span></div>';
      });
      h += '</div>';

      /* ---- teaching focus ---- */
      h += '<details class="disc" open><summary>Teaching focus<span class="count">' + weak.length + ' areas</span></summary><div class="disc-body">';
      if (!weak.length) {
        h += '<p class="tiny" style="padding-top:10px">No error pattern yet. Once this student has answered twenty or so questions, the weak areas appear here with reteach notes and activities.</p>';
      } else {
        h += '<p class="tiny" style="padding:10px 0 14px">Ranked by how much trouble each is actually causing — error rate weighted by how often it has come up, so one unlucky miss does not outrank a pattern of six.</p>';
        weak.forEach(function (w, i) {
          var info = w.info;
          h += '<div class="rep-block">' +
            '<div class="rep-h"><h4>' + (i + 1) + '. ' + esc(info.name || w.tag) + '</h4>' +
            '<span class="rep-rate">' + w.wrong + ' wrong of ' + w.attempts + ' · ' + Math.round(w.rate * 100) + '% error</span></div>' +
            '<p class="rep-p">' + esc(info.principle || '') + '</p>' +
            (info.reteach ? '<div class="rep-teach"><b>Say this at the board</b>' + esc(info.reteach) + '</div>' : '') +
            (info.activities ? '<ul class="rep-acts">' + info.activities.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>' : '') +
            '</div>';
        });
      }
      if (strong.length) {
        h += '<div class="rep-block good"><div class="rep-h"><h4>Secure</h4></div>' +
          '<p class="rep-p">' + strong.map(function (s) {
            return esc((s.info.name || s.tag).split(' — ')[0]) + ' (' + Math.round(s.rate * 100) + '%)';
          }).join(' · ') + '</p>' +
          '<p class="tiny">Safe to build on. Use these as the known half of a contrast when introducing something new.</p></div>';
      }
      h += '</div></details>';

      /* ---- simulations ---- */
      var mk = p.mocks || {};
      h += '<details class="disc" open><summary>Full simulations<span class="count">' +
        Object.keys(mk).length + ' of ' + (C.MOCKS || []).length + ' sat</span></summary><div class="disc-body">';
      if (!Object.keys(mk).length) {
        h += '<p class="tiny" style="padding-top:10px">No simulation sat yet. The section breakdown here is the single most useful page in this console once they have.</p>';
      } else {
        h += '<table class="mocktable"><thead><tr><th>Paper</th><th>Marks</th><th>%</th><th>Attempts</th><th>Last sat</th></tr></thead><tbody>';
        (C.MOCKS || []).forEach(function (m) {
          var r = mk[m.id];
          if (!r) return;
          h += '<tr' + (r.best < 0.6 ? ' class="low"' : '') + '><td>' + esc(m.name) + '</td>' +
            '<td class="n">' + r.marks + '/' + r.total + '</td>' +
            '<td class="n">' + pct(r.best) + '%</td>' +
            '<td class="n">' + r.attempts + '</td>' +
            '<td>' + esc(new Date(r.at).toLocaleDateString()) + '</td></tr>';
        });
        h += '</tbody></table>';
        /* the section breakdown of the most recent paper */
        var lastId = null, lastAt = 0;
        Object.keys(mk).forEach(function (k) {
          var t = new Date(mk[k].at).getTime();
          if (t > lastAt) { lastAt = t; lastId = k; }
        });
        var bs = lastId && mk[lastId].bySection;
        if (bs) {
          var mm = E.Bank.mock(lastId);
          h += '<p class="kicker" style="margin:14px 0 6px">Section breakdown · ' + esc(mm ? mm.name : lastId) + '</p>';
          h += '<table class="mocktable"><thead><tr><th>Section</th><th>Marks</th><th>Correct</th><th>%</th></tr></thead><tbody>';
          (mm ? mm.sections : []).forEach(function (s) {
            var b = bs[s.code];
            if (!b) return;
            var q = b.total ? b.got / b.total : 0;
            h += '<tr' + (q < 0.6 ? ' class="low"' : '') + '><td>' + esc(s.part.replace('PART ', '')) + ' — ' + esc(s.title) + '</td>' +
              '<td class="n">' + b.got + '/' + b.total + '</td>' +
              '<td class="n">' + b.right + '/' + b.n + '</td>' +
              '<td class="n">' + pct(q) + '%</td></tr>';
          });
          h += '</tbody></table>';
        }
        if (mocks.length) {
          h += '<p class="kicker" style="margin:14px 0 6px">Every sitting</p>' +
            '<div class="logscroll"><table class="logtable"><thead><tr><th>When</th><th>Paper</th><th>Marks</th><th>%</th><th>Time taken</th></tr></thead><tbody>';
          mocks.slice(0, 40).forEach(function (r) {
            h += '<tr><td class="g">' + esc(new Date(r.ts).toLocaleString()) + '</td><td>' + esc(r.mockId) + '</td>' +
              '<td>' + r.marks + '/' + r.total + '</td><td>' + Math.round(r.pct * 100) + '%</td>' +
              '<td>' + esc(hhmm(r.durationSec)) + '</td></tr>';
          });
          h += '</tbody></table></div>';
        }
      }
      h += '</div></details>';

      /* ---- stage introductions ---- */
      var md = p.media || {};
      var withMedia = C.TOPICS.filter(function (x) { return x.podcast || x.slides || x.video; });
      if (withMedia.length) {
        var touched = withMedia.filter(function (t) {
          var r = md[t.id] || {};
          return r.plays || r.slidesOpens || r.videoOpens;
        }).length;
        h += '<details class="disc"><summary>Stage introductions used<span class="count">' +
          touched + ' of ' + withMedia.length + ' opened</span></summary>' +
          '<div class="disc-body"><div class="logscroll"><table class="logtable">' +
          '<thead><tr><th>System</th><th>Podcast</th><th>Listened</th><th>Slides</th><th>Video</th><th>Last</th></tr></thead><tbody>';
        withMedia.forEach(function (t) {
          var r = md[t.id] || {};
          var untouched = !r.plays && !r.slidesOpens && !r.videoOpens;
          h += '<tr' + (untouched ? ' class="bad"' : '') + '><td>' + esc(t.code) + ' · ' + esc(t.name) + '</td>' +
            '<td>' + (t.podcast ? (r.done ? '✓ finished' : (r.plays || 0) + ' play' + (r.plays === 1 ? '' : 's')) : '<span class="g">—</span>') + '</td>' +
            '<td>' + (r.seconds ? Math.round(r.seconds / 60) + ' min' : '<span class="g">—</span>') + '</td>' +
            '<td>' + (t.slides ? (r.slidesOpens || 0) : '<span class="g">—</span>') + '</td>' +
            '<td>' + (t.video ? (r.videoOpens || 0) : '<span class="g">—</span>') + '</td>' +
            '<td class="g">' + (r.last ? esc(new Date(r.last).toLocaleDateString()) : '—') + '</td></tr>';
        });
        h += '</tbody></table></div><p class="tiny" style="margin-top:8px">' +
          'Rows in red are systems where this student opened none of the material. Somebody stuck on a ' +
          'system who never played its introduction is a different teaching problem from one who did.' +
          '</p></div></details>';
      }

      /* ---- set a paper ---- */
      var a = p.assignment;
      h += '<details class="disc"><summary>Set a paper<span class="count">' +
        (a ? (a.done ? pct(a.score) + '% submitted' : 'set, not taken') : 'none set') + '</span></summary><div class="disc-body">' +
        '<p class="tiny" style="padding:10px 0 12px">Builds a paper from the stage-check bank, weighted towards the tags this student is actually getting wrong. It appears on their console the next time they log in.</p>' +
        '<div style="display:flex;gap:9px;align-items:flex-end;flex-wrap:wrap">' +
        '<div class="field" style="max-width:220px"><label for="sysx">System</label>' +
        '<select id="sysx"><option value="">All stages</option>' +
        C.TOPICS.map(function (t) { return '<option value="' + t.id + '">' + esc(t.code + ' · ' + t.name) + '</option>'; }).join('') +
        '</select></div>' +
        '<div class="field" style="max-width:110px"><label for="nq">Questions</label>' +
        '<select id="nq"><option>8</option><option selected>12</option><option>16</option><option>20</option></select></div>' +
        '<button class="btn primary" id="assign">Set for this student</button>' +
        '<button class="btn" id="printtest">Printable + answer key</button></div>';
      if (a && a.done) {
        h += '<div style="margin-top:14px" class="rep-teach"><b>Result</b>Scored <strong>' + pct(a.score) + '%</strong> on a paper of ' +
          a.itemIds.length + ' questions, submitted ' + esc(new Date(a.completedAt).toLocaleString()) + '.</div>';
      }
      h += '</div></details>';

      /* ---- sessions ---- */
      h += '<details class="disc"><summary>Sessions<span class="count">' + sessions.length + '</span></summary><div class="disc-body"><div class="logscroll"><table class="logtable">' +
        '<thead><tr><th>In</th><th>Out</th><th>Duration</th><th>Items</th><th>Correct</th></tr></thead><tbody>';
      if (!sessions.length) h += '<tr><td colspan="5" class="g">No sessions recorded yet.</td></tr>';
      sessions.slice(0, 60).forEach(function (s) {
        h += '<tr><td>' + esc(new Date(s.loginTs).toLocaleString()) + '</td>' +
          '<td class="g">' + (s.logoutTs ? esc(new Date(s.logoutTs).toLocaleTimeString()) : 'open') + '</td>' +
          '<td>' + esc(hhmm(s.durationSec)) + '</td><td>' + (s.items || 0) + '</td><td>' + (s.correct || 0) + '</td></tr>';
      });
      h += '</tbody></table></div></div></details>';

      /* ---- wrong answers ---- */
      h += '<details class="disc"><summary>Incorrect answers<span class="count">' + wrong.length + '</span></summary><div class="disc-body"><div class="logscroll"><table class="logtable">' +
        '<thead><tr><th>When</th><th>Item</th><th>Their answer</th><th>Correct answer</th></tr></thead><tbody>';
      if (!wrong.length) h += '<tr><td colspan="4" class="g">Nothing wrong on record.</td></tr>';
      wrong.slice(0, 200).forEach(function (x) {
        h += '<tr class="bad"><td class="g">' + esc(new Date(x.ts).toLocaleDateString()) + '</td>' +
          '<td>' + esc(x.itemId) + '<br><span class="g">' + esc(String((C.REMEDIATION[x.tag] || {}).name || x.tag || '').split(' — ')[0]) + '</span></td>' +
          '<td>' + esc(String(x.given || '').slice(0, 80)) + '</td>' +
          '<td class="g">' + esc(String(x.expected || '').slice(0, 80)) + '</td></tr>';
      });
      h += '</tbody></table></div></div></details>';

      /* ---- full log ---- */
      h += '<details class="disc"><summary>Full answer log<span class="count">' + attempts.length + '</span></summary><div class="disc-body"><div class="logscroll"><table class="logtable">' +
        '<thead><tr><th>When</th><th>Item</th><th>Type</th><th>Mode</th><th>Time</th><th>Hint</th><th>✓</th></tr></thead><tbody>';
      attempts.slice(0, 400).forEach(function (x) {
        h += '<tr' + (x.correct ? '' : ' class="bad"') + '><td class="g">' + esc(new Date(x.ts).toLocaleString()) + '</td>' +
          '<td>' + esc(x.itemId) + '</td><td class="g">' + esc(x.type) + '</td><td class="g">' + esc(x.mode || '') + '</td>' +
          '<td>' + (x.ms ? Math.round(x.ms / 1000) + 's' : '—') + '</td><td>' + (x.hinted ? 'yes' : '') + '</td>' +
          '<td>' + (x.correct ? '✓' : '✕') + '</td></tr>';
      });
      if (!attempts.length) h += '<tr><td colspan="7" class="g">No answers recorded yet.</td></tr>';
      h += '</tbody></table></div></div></details>';

      $('#detail').innerHTML = h;

      $('#assign').addEventListener('click', function () {
        var n = +$('#nq').value, sys = $('#sysx').value || null;
        var paper = E.Bank.revisionPaper(p, n, sys);
        api.assign(id, {
          assignmentId: 'A' + Date.now().toString(36),
          topicId: sys || '', itemIds: paper.map(function (i) { return i.id; }),
          createdAt: new Date().toISOString(), done: false, score: 0, completedAt: ''
        }).then(function (r) {
          if (r && r.ok) { toast('Paper set — ' + n + ' questions.'); load(); }
          else toast('Could not set the paper.');
        });
      });
      $('#printtest').addEventListener('click', function () {
        printPaper(p, +$('#nq').value, $('#sysx').value || null);
      });
    });
  }

  /* ------------------------------------------------------- printed paper */
  function printPaper(p, n, sys) {
    var paper = E.Bank.revisionPaper(p, n, sys);
    var name = p.displayName || p.studentId;
    var h = '<h2>English 4 — revision paper</h2>' +
      '<p class="meta">' + esc(name) + ' &nbsp;·&nbsp; ' + paper.length + ' questions &nbsp;·&nbsp; ' +
      new Date().toLocaleDateString() + ' &nbsp;·&nbsp; Name: ________________</p>';

    paper.forEach(function (it, i) {
      h += '<div class="pq"><b>' + (i + 1) + '. ' + esc(stripTags(it.stem || '')) + '</b>';
      if (it.given) h += '<div class="ctx">Given: ' + esc(stripTags(it.given)) + '</div>';
      if (it.passage) h += '<div class="ctx">' + esc(stripTags(it.passage)) + '</div>';
      if (it.lines) h += '<div class="ctx">' + it.lines.map(function (l) {
        return esc(l.who) + ': ' + esc(String(l.text).replace(/___/g, '__________'));
      }).join('<br>') + '</div>';
      if (it.type === 'spot') h += '<div class="ctx">' + it.words.map(function (w, j) {
        return '(' + (j + 1) + ') ' + esc(w);
      }).join(' ') + '</div><div class="ctx">Write the number of the wrong part, and correct it.</div>';
      if (it.type === 'build') h += '<div class="ctx">Parts: ' + it.tiles.map(esc).join(' / ') + '</div>' +
        '<div class="ctx">_______________________________________________</div>';
      if (it.type === 'order') h += '<ol>' + it.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
        '</ol><div class="ctx">Write the letters in the correct order: ______</div>';
      if (it.type === 'sort') {
        h += '<div class="ctx">Cards: ' + it.items.map(function (x) { return esc(stripTags(x.text)); }).join(' / ') + '</div>' +
          '<table><tr>' + it.bins.map(function (b) { return '<th>' + esc(b.label) + '</th>'; }).join('') + '</tr>' +
          '<tr>' + it.bins.map(function () { return '<td style="height:44pt"></td>'; }).join('') + '</tr></table>';
      }
      if (it.options) h += '<ol>' + it.options.map(function (o) { return '<li>' + esc(stripTags(o)) + '</li>'; }).join('') + '</ol>';
      if (it.type === 'judge') h += '<ol><li>True</li><li>False</li><li>Can\'t tell</li></ol>';
      h += '</div>';
    });

    h += '<div class="key"><h2>Answer key and diagnosis</h2><p class="meta">' + esc(name) + '</p>';
    paper.forEach(function (it, i) {
      var ans;
      if (it.type === 'spot') ans = 'part ' + (it.answer + 1) + ' → ' + it.fix;
      else if (it.type === 'build') ans = it.solution;
      else if (it.type === 'order') ans = it.items.map(function (x, j) { return 'ABCD'[j]; }).join('-');
      else if (it.type === 'judge') ans = ['True', 'False', 'Can\'t tell'][it.answer];
      else if (it.type === 'sort') ans = it.bins.map(function (b) {
        return b.label + ': ' + it.items.filter(function (x) { return x.bin === b.key; })
          .map(function (x) { return stripTags(x.text); }).join(', ');
      }).join('  |  ');
      else ans = (it.answer + 1) + ') ' + stripTags(it.options[it.answer]);
      h += '<div class="pq"><b>' + (i + 1) + '. ' + esc(ans) + '</b>' +
        '<div class="ctx">' + esc(stripTags(it.why)) + '</div>' +
        '<div class="ctx">Tag: ' + esc((C.REMEDIATION[it.tag] || {}).name || it.tag) + ' · ' + esc(it.level) + '</div></div>';
    });
    h += '</div>';
    $('#printable').innerHTML = h;
    window.print();
  }

  /* ------------------------------------------------------------ CSV out */
  $('#t-csv').addEventListener('click', function () {
    var head = ['student_id', 'name', 'rank', 'checks_cleared', 'readiness_pct', 'accuracy_pct',
                'items_seen', 'items_correct', 'streak', 'longest_streak', 'xp', 'awards',
                'last_active', 'modules_cleared', 'fault_items', 'best_sim_pct', 'sims_sat', 'top_weakness'];
    C.TOPICS.forEach(function (t) { head.push('sys_' + t.n + '_pct'); });
    var rows = [head];
    T.roster.forEach(function (s) {
      var p = s.progress || P.blank(s.id, s.name);
      var w = P.weakTags(p, 1)[0];
      var row = [
        s.id, p.displayName || s.name, P.rank(p).name, P.checksCleared(p), P.readiness(p), P.accuracy(p),
        (p.stats || {}).seen || 0, (p.stats || {}).correct || 0, p.streak || 0, p.longestStreak || 0,
        p.xp || 0, (p.badges || []).length, p.lastActiveDate || '',
        Object.keys(p.subs || {}).filter(function (k) { return p.subs[k].best >= E.PASS_SUB; }).length,
        Object.keys(p.review || {}).length,
        Math.round(bestMock(p) * 100), Object.keys(p.mocks || {}).length,
        w ? (w.info.name || w.tag) : ''
      ];
      C.TOPICS.forEach(function (t) { row.push(P.topicPct(p, t)); });
      rows.push(row);
    });
    var csv = rows.map(function (r) {
      return r.map(function (c) {
        var v = String(c == null ? '' : c);
        return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(',');
    }).join('\n');
    var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'fine-tuning-' + E.today() + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
    toast('CSV downloaded.');
  });
})();
