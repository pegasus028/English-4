/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — teacher-write.js
   The Writing Room tab of the Staff Room: sessions, the live grid,
   submissions with flags, the keystroke replay, peer reviews, retention
   and exports. Talks to the server through WriteRoom.api (write.js), so it
   runs against Apps Script in cloud mode and localStorage otherwise.
   =========================================================================== */
(function () {
  'use strict';
  var WR = window.WriteRoom, api = WR.api, esc = window.Engine.esc;
  /* The class server answers teacherLogin with a teacher token; api.js does
     not keep it, so keep it here. Teacher-only actions (sessions, live grid,
     prompts, replays) need it. */
  (function () {
    var A = window.API, orig = A.teacherLogin;
    A.teacherLogin = function (pin) { return orig(pin).then(function (r) { if (r && r.ok && r.token) { try { localStorage.setItem('mc.token', r.token); } catch (e) {} } return r; }); };
  })();
  var $ = function (s) { return document.querySelector(s); };
  function mmss(sec) { sec = Math.max(0, Math.round(sec)); var m = Math.floor(sec / 60), s = sec % 60; return m + ':' + (s < 10 ? '0' : '') + s; }
  function ago(iso) { if (!iso) return 'never'; var s = Math.round((Date.now() - new Date(iso)) / 1000); return s < 60 ? s + 's ago' : s < 3600 ? Math.round(s / 60) + 'm ago' : Math.round(s / 3600) + 'h ago'; }
  function toast(m) { $('#toast-slot').innerHTML = '<div class="toast">' + esc(m) + '</div>'; clearTimeout(toast._t); toast._t = setTimeout(function () { $('#toast-slot').innerHTML = ''; }, 2600); }
  var T = { tab: 'progress', rooms: [], sel: null, room: null, cards: [], poll: null, detail: null, replay: null, th: null, prompts: [] };
  try { T.th = JSON.parse(localStorage.getItem('e4.thresholds')) || null; } catch (e) {}
  T.th = T.th || JSON.parse(JSON.stringify(WR.DEFAULT_THRESHOLDS));
  function bandOf(id) { var r = (window.ROSTER || []).filter(function (s) { return String(s.id) === String(id); })[0]; return r ? r.band : null; }

  /* ----------------------------------------------------------- tabs */
  document.querySelectorAll('.ttab').forEach(function (b) {
    b.addEventListener('click', function () {
      T.tab = b.dataset.tab;
      document.querySelectorAll('.ttab').forEach(function (x) { x.classList.toggle('on', x === b); });
      $('#tab-progress').classList.toggle('hidden', T.tab !== 'progress');
      $('#tab-write').classList.toggle('hidden', T.tab !== 'write');
      if (T.tab === 'write') { loadRooms(); loadPrompts(); } else stopPoll();
    });
  });

  /* -------------------------------------------------------- sessions */
  function loadRooms() {
    api('w.sessions', {}).then(function (r) { T.rooms = (r && r.rooms) || []; paint(); });
  }
  function loadPrompts() { api('w.promptsList', {}).then(function (r) { T.prompts = (r && r.writeIds) || []; var s = $('#ns-write'); if (s) fillWriteIds(s); }); }
  function fillWriteIds(sel) {
    var cur = sel.value;
    sel.innerHTML = '<option value="">— no sealed prompts (title on the board) —</option>' + T.prompts.map(function (p) { return '<option value="' + esc(p.writeId) + '">' + esc(p.writeId) + ' · ' + esc(p.name || '') + ' (' + p.count + ' prompts)</option>'; }).join('');
    sel.value = cur;
  }
  function paint() {
    var h = $('#tab-write');
    if (!T.sel) return paintList(h);
    paintRoom(h);
  }
  function paintList(h) {
    h.innerHTML = '<div class="grid wr-tgrid">' +
      '<div class="card panel"><div class="panel-h"><h2>Writing sessions</h2><span class="kicker">' + T.rooms.length + '</span></div>' +
      (T.rooms.length ? '<div class="wr-rooms">' + T.rooms.map(function (r) {
        return '<button class="wr-room" data-open="' + r.id + '"><span class="wr-room-code">' + esc(r.code) + '</span><span class="wr-room-t"><b>' + esc(r.name) + '</b><span>' +
          esc(r.writeId || 'no prompts') + ' · ' + Object.keys(r.joined || {}).length + ' joined · ' + new Date(r.createdAt).toLocaleDateString() + '</span></span><span class="pill' + (r.status === 'live' ? ' bad' : r.status === 'ended' ? '' : ' on') + '">' + esc(r.status) + '</span></button>';
      }).join('') + '</div>' : '<div class="empty">No sessions yet. Create one on the right, write the code on the board, and the class joins from the Writing Room tab.</div>') +
      '<div style="margin-top:18px"><div class="panel-h"><h2 style="font-size:.98rem">Flag thresholds</h2><span class="tiny">evidence, never a verdict</span></div><div class="wr-th" id="wr-th"></div></div></div>' +
      '<div class="card panel"><div class="panel-h"><h2>New session</h2></div>' +
      '<div class="field"><label>Name</label><input id="ns-name" placeholder="Newsroom Desk · L3"></div>' +
      '<div class="field"><label>Sealed prompts</label><select id="ns-write"></select></div>' +
      '<div class="wr-two"><div class="field"><label>Unit</label><select id="ns-unit"><option>5</option><option>6</option><option>7</option><option>8</option></select></div>' +
      '<div class="field"><label>Writing minutes</label><input id="ns-min" type="number" value="15" min="3" max="60"></div>' +
      '<div class="field"><label>Review minutes</label><input id="ns-rev" type="number" value="5" min="2" max="20"></div></div>' +
      '<button class="btn primary wide" id="ns-go">Create session</button>' +
      '<p class="tiny">A four-digit code is generated. Students join with it; the prompt stays sealed until you press Start.</p>' +
      '<div style="margin-top:18px"><div class="panel-h"><h2 style="font-size:.98rem">Sealed prompt matrices</h2></div>' +
      '<p class="tiny">Paste a prompt matrix (JSON from the project pack: writeId, name, wordTargets, prompts[]). It is stored on the class server, never in the public app, and each student sees only her own prompt once the session is live.</p>' +
      '<textarea id="pm-json" rows="5" placeholder=\'{"writeId":"U5-W1","name":"Newsroom Desk","wordTargets":{"1":[150,180],"2":[120,150],"3":[120,150],"4":[80,110]},"prompts":[{"studentId":"51288","desk":"Breaking News","angle":"…","quota":["…"],"words":["…"]}]}\'></textarea>' +
      '<div style="display:flex;gap:8px;margin-top:8px"><button class="btn sm" id="pm-go">Import matrix</button><span class="tiny" id="pm-list"></span></div></div></div></div>';
    h.querySelectorAll('[data-open]').forEach(function (b) { b.addEventListener('click', function () { open(b.dataset.open); }); });
    fillWriteIds($('#ns-write'));
    $('#pm-list').textContent = T.prompts.length ? 'Loaded: ' + T.prompts.map(function (p) { return p.writeId; }).join(', ') : 'None loaded yet.';
    $('#ns-go').addEventListener('click', function () {
      var name = $('#ns-name').value.trim(); if (!name) return toast('Give the session a name.');
      api('w.create', { name: name, unit: Number($('#ns-unit').value), writeId: $('#ns-write').value, minutes: Number($('#ns-min').value) || 15, reviewMinutes: Number($('#ns-rev').value) || 5 })
        .then(function (r) { if (!r || !r.ok) return toast(r && r.error || 'Could not create.'); toast('Session ' + r.room.code + ' created.'); open(r.room.id); });
    });
    $('#pm-go').addEventListener('click', function () {
      var mx; try { mx = JSON.parse($('#pm-json').value); } catch (e) { return toast('That is not valid JSON.'); }
      if (!mx.writeId || !Array.isArray(mx.prompts)) return toast('The matrix needs writeId and prompts[].');
      api('w.prompts', { writeId: mx.writeId, matrix: mx }).then(function (r) { if (!r || !r.ok) return toast(r && r.error || 'Import failed.'); toast('Imported ' + r.count + ' prompts for ' + mx.writeId + '.'); $('#pm-json').value = ''; loadPrompts(); });
    });
    paintThresholds();
  }
  function paintThresholds() {
    var box = $('#wr-th'); if (!box) return;
    var rows = [['awaySec', 'Away more than (seconds)'], ['exits', 'More exits than'], ['bulk', 'Bulk insert over (characters)'], ['revision', 'Revision ratio under (0–1)'], ['burstChars', 'Burst: characters after a 20 s idle'], ['burstSec', '… typed within (seconds)']];
    box.innerHTML = rows.map(function (r) { return '<label class="wr-thr"><span>' + r[1] + '</span><input type="number" step="any" data-th="' + r[0] + '" value="' + T.th[r[0]] + '"></label>'; }).join('') +
      '<button class="btn sm" id="th-reset">Reset to defaults</button>';
    box.querySelectorAll('[data-th]').forEach(function (i) { i.addEventListener('change', function () { T.th[i.dataset.th] = Number(i.value); try { localStorage.setItem('e4.thresholds', JSON.stringify(T.th)); } catch (e) {} toast('Thresholds saved (this browser).'); }); });
    $('#th-reset').addEventListener('click', function () { T.th = JSON.parse(JSON.stringify(WR.DEFAULT_THRESHOLDS)); try { localStorage.removeItem('e4.thresholds'); } catch (e) {} paintThresholds(); });
  }

  /* ------------------------------------------------------------ room */
  function open(id) { T.sel = id; T.detail = null; stopPoll(); refresh(); T.poll = setInterval(refresh, 5000); }
  function stopPoll() { if (T.poll) clearInterval(T.poll); T.poll = null; }
  function refresh() {
    if (!T.sel) return;
    api('w.live', { sessionId: T.sel }).then(function (r) {
      if (!r || !r.ok) { toast(r && r.error || 'Could not load the session.'); T.sel = null; stopPoll(); loadRooms(); return; }
      T.room = r.room; T.cards = r.cards || [];
      if (!T.detail) paintRoom($('#tab-write')); else paintLiveOnly();
    });
  }
  function status(c) {
    if (c.status === 'submitted') return 'submitted';
    if (c.lastSeen && Date.now() - new Date(c.lastSeen) > 25000) return 'offline';
    return c.live || 'joined';
  }
  function control(op, extra) {
    var pl = { sessionId: T.sel, op: op }; if (extra) Object.keys(extra).forEach(function (k) { pl[k] = extra[k]; });
    return api('w.control', pl).then(function (r) { if (!r || !r.ok) toast(r && r.error || 'Failed.'); else refresh(); return r; });
  }
  /* Pair Band 1 with Band 3/4 where possible, among those who submitted. */
  function autoPairs() {
    var done = T.cards.filter(function (c) { return c.status === 'submitted'; }).map(function (c) { return { id: c.studentId, band: bandOf(c.studentId) || 2 }; });
    var strong = done.filter(function (s) { return s.band <= 2; }).sort(function (a, b) { return a.band - b.band; });
    var weak = done.filter(function (s) { return s.band >= 3; }).sort(function (a, b) { return b.band - a.band; });
    var pairs = {}, left = [];
    while (strong.length && weak.length) { var a = strong.shift(), b = weak.shift(); pairs[a.id] = b.id; pairs[b.id] = a.id; }
    left = strong.concat(weak);
    while (left.length >= 2) { var x = left.shift(), y = left.shift(); pairs[x.id] = y.id; pairs[y.id] = x.id; }
    if (left.length === 1 && done.length >= 3) { var solo = left[0], first = done[0].id === solo.id ? done[1].id : done[0].id; pairs[solo.id] = first; /* a triangle: the odd one reviews the first; nobody reviews her twice */ }
    return pairs;
  }
  function paintRoom(h) {
    var r = T.room; if (!r) return;
    var joined = T.cards.length, sub = T.cards.filter(function (c) { return c.status === 'submitted'; }).length;
    var clockEnd = r.status === 'review' ? r.reviewEndsAt : r.endsAt;
    h.innerHTML = '<div class="wr-head card"><button class="btn sm ghost" id="wr-backlist">← Sessions</button>' +
      '<div class="wr-code">' + esc(r.code) + '</div><div class="wr-head-t"><h2>' + esc(r.name) + '</h2><span class="tiny">' + esc(r.writeId || 'no sealed prompts') + ' · Unit ' + r.unit + ' · ' + r.minutes + ' min write · ' + (r.reviewMinutes || 5) + ' min review</span></div>' +
      '<div class="wr-head-s"><span class="pill' + (r.status === 'live' ? ' bad' : r.status === 'ended' ? '' : ' on') + '">' + esc(r.status) + '</span><span class="wr-clock" id="t-clock">' + (clockEnd ? mmss((new Date(clockEnd) - Date.now()) / 1000) : '') + '</span></div>' +
      '<div class="wr-ctrl">' +
      (r.status === 'lobby' ? '<button class="btn primary" data-op="start">Start — unseal prompts</button>' : '') +
      (r.status === 'live' ? '<button class="btn" data-op="extend">+2 min</button><button class="btn primary" data-op="review">Pair &amp; review</button>' : '') +
      (r.status === 'review' ? '<button class="btn" data-op="extend-review">+2 min review</button><button class="btn primary" data-op="end">End session</button>' : '') +
      (r.status === 'ended' ? '<button class="btn" data-op="reopen">Reopen 5 min</button>' : '') +
      (r.status !== 'ended' ? '<button class="btn" data-op="end">End</button>' : '') +
      '<button class="btn" data-op="broadcast">Message the class</button>' +
      '<button class="btn" id="wr-csv">Export CSV</button><button class="btn" id="wr-txt">Export drafts</button>' +
      '<button class="btn ghost" data-op="purge" title="Deletes the keystroke logs of this session (PDPA retention). Drafts, receipts and flag summaries stay.">Purge logs</button>' +
      '<button class="btn ghost" data-op="delete">Delete</button></div>' +
      (r.broadcast ? '<div class="wr-bc">☎ ' + esc(r.broadcast) + '</div>' : '') + '</div>' +
      '<div class="wr-stat5"><div class="stat"><b>' + joined + '</b><span>Joined</span></div><div class="stat"><b>' + T.cards.filter(function (c) { return status(c) === 'writing'; }).length + '</b><span>Writing now</span></div>' +
      '<div class="stat"><b>' + T.cards.filter(function (c) { return status(c) === 'away' || status(c) === 'split'; }).length + '</b><span>Away / split</span></div>' +
      '<div class="stat"><b>' + sub + '</b><span>Submitted</span></div><div class="stat"><b>' + T.cards.filter(function (c) { return c.flags && c.flags.length; }).length + '</b><span>Worth a look</span></div></div>' +
      '<div class="card panel"><div class="panel-h"><h2>Live grid</h2><span class="tiny">updates every 5 s · a red card is away from the page</span></div><div class="wr-cards" id="wr-cards"></div></div>' +
      '<div class="card panel" id="wr-subs"></div>' +
      '<div id="wr-detail"></div>';
    $('#wr-backlist').addEventListener('click', function () { T.sel = null; T.room = null; stopPoll(); loadRooms(); });
    h.querySelectorAll('[data-op]').forEach(function (b) {
      b.addEventListener('click', function () {
        var op = b.dataset.op;
        if (op === 'start') { if (!confirm('Start the session? Prompts unseal and the ' + r.minutes + '-minute clock begins.')) return; control('start'); }
        else if (op === 'extend') control('extend', { minutes: 2 });
        else if (op === 'extend-review') control('review', { pairs: r.pairs });
        else if (op === 'review') { var pr = autoPairs(); if (!Object.keys(pr).length) return toast('Nobody has submitted yet. Wait for the clock, or end the writing time with +0.'); if (!confirm('Pair the class and start the ' + (r.reviewMinutes || 5) + '-minute peer review? Students who have not submitted are submitted automatically.')) return; control('review', { pairs: pr }); }
        else if (op === 'end') { if (!confirm('End the session? Unsubmitted drafts are submitted as they stand.')) return; control('end'); }
        else if (op === 'reopen') control('reopen', { minutes: 5 });
        else if (op === 'broadcast') { var m = prompt('Message to every student\'s screen (empty to clear):', r.broadcast || ''); if (m !== null) control('broadcast', { message: m }); }
        else if (op === 'purge') { if (!confirm('Delete the keystroke logs for this session? Replays will no longer be available. Drafts, receipts and flag summaries are kept.')) return; api('w.purge', { sessionId: T.sel }).then(function () { toast('Logs purged.'); refresh(); }); }
        else if (op === 'delete') { if (!confirm('Delete this session and everything in it?')) return; control('delete').then(function () { T.sel = null; stopPoll(); loadRooms(); }); }
      });
    });
    $('#wr-csv').addEventListener('click', exportCsv);
    $('#wr-txt').addEventListener('click', exportDrafts);
    paintLiveOnly();
  }
  function paintLiveOnly() {
    var r = T.room, k = $('#t-clock');
    if (k) { var end = r.status === 'review' ? r.reviewEndsAt : r.endsAt; k.textContent = end && r.status !== 'ended' && r.status !== 'lobby' ? mmss((new Date(end) - Date.now()) / 1000) : ''; }
    var grid = $('#wr-cards'); if (!grid) return;
    if (!T.cards.length) { grid.innerHTML = '<div class="empty">Nobody has joined yet. The code is <b>' + esc(r.code) + '</b>.</div>'; }
    else {
      var cards = T.cards.slice().sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); });
      grid.innerHTML = cards.map(function (c) {
        var st = status(c);
        return '<button class="wr-card st-' + st + '" data-student="' + esc(c.studentId) + '"><span class="wr-card-n">' + esc(c.name || c.studentId) + '</span>' +
          '<span class="wr-card-s">' + st + '</span><span class="wr-card-m"><b>' + c.wc + '</b> words · <b>' + mmss(c.away / 1000) + '</b> away · <b>' + c.exits + '</b> exits' + (c.pastes ? ' · <b>' + c.pastes + '</b> paste' : '') + '</span>' +
          '<span class="tiny">' + ago(c.lastSeen) + (c.flags && c.flags.length ? ' · ⚠ ' + c.flags.length : '') + '</span></button>';
      }).join('');
      grid.querySelectorAll('[data-student]').forEach(function (b) { b.addEventListener('click', function () { openDetail(b.dataset.student); }); });
    }
    paintSubs();
  }
  function paintSubs() {
    var box = $('#wr-subs'); if (!box) return;
    var subs = T.cards.filter(function (c) { return c.status === 'submitted'; }).sort(function (a, b) { return (b.flags.length - a.flags.length) || String(a.name).localeCompare(String(b.name)); });
    if (!subs.length) { box.innerHTML = '<div class="panel-h"><h2>Submissions</h2></div><div class="empty">Submissions appear here with their receipts and flags.</div>'; return; }
    box.innerHTML = '<div class="panel-h"><h2>Submissions</h2><span class="tiny">' + subs.length + ' · flags are "worth a look", never a verdict — the follow-up is a one-minute oral check</span></div>' +
      '<div class="roster-scroll"><table class="roster"><thead><tr><th>Student</th><th>Words</th><th>Away</th><th>Exits</th><th>Pastes</th><th>Bulk</th><th>Review</th><th>Published</th><th>Worth a look</th></tr></thead><tbody>' +
      subs.map(function (c) {
        var band = bandOf(c.studentId);
        return '<tr class="r" data-student="' + esc(c.studentId) + '"><td><b>' + esc(c.name) + '</b>' + (band ? ' <span class="tiny">B' + band + '</span>' : '') + '</td><td>' + c.wc + '</td><td>' + mmss(c.away / 1000) + '</td><td>' + c.exits + '</td><td>' + c.pastes + '</td><td>' + c.bulk + '</td>' +
          '<td>' + (c.reviewed ? '✓' : '—') + '</td><td>' + (c.published ? c.retention.words + '%' + (c.retention.words < 80 ? ' ⚠' : '') : '—') + '</td>' +
          '<td>' + (c.flags.length ? c.flags.map(function (f) { return '<span class="flag stall">' + esc(f.label) + '</span>'; }).join(' ') : '<span class="flag fly">clean</span>') + '</td></tr>';
      }).join('') + '</tbody></table></div>';
    box.querySelectorAll('tr.r').forEach(function (tr) { tr.addEventListener('click', function () { openDetail(tr.dataset.student); }); });
  }

  /* ---------------------------------------------------------- detail */
  function openDetail(studentId) {
    api('w.detail', { sessionId: T.sel, studentId: studentId }).then(function (r) {
      if (!r || !r.ok) return toast('Could not load.');
      T.detail = r; T.detail.studentId = studentId; paintDetail();
      var d = $('#wr-detail'); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  function paintDetail() {
    var box = $('#wr-detail'), d = T.detail; if (!box || !d) return;
    var dr = d.draft || {}, an = WR.analyse({ text: dr.text || '', events: d.events, ops: d.ops }, T.th);
    var name = (T.cards.filter(function (c) { return c.studentId === d.studentId; })[0] || {}).name || d.studentId;
    var pr = d.prompt;
    box.innerHTML = '<div class="card panel"><div class="panel-h"><h2>' + esc(name) + ' <span class="tiny">' + esc(d.studentId) + (bandOf(d.studentId) ? ' · Band ' + bandOf(d.studentId) : '') + '</span></h2><button class="btn sm ghost" id="wr-close">Close</button></div>' +
      '<div class="wr-dgrid">' +
      '<div><div class="wr-stat5 small"><div class="stat"><b>' + an.wc + '</b><span>Words</span></div><div class="stat"><b>' + WR.marksIn(dr.text || '') + '</b><span>Marked</span></div><div class="stat"><b>' + mmss(an.away / 1000) + '</b><span>Away</span></div><div class="stat"><b>' + an.exits + '</b><span>Exits</span></div><div class="stat"><b>' + an.pastes + '</b><span>Pastes</span></div><div class="stat"><b>' + Math.round(an.revision * 100) + '%</b><span>Revision</span></div></div>' +
      '<div class="wr-flags">' + (an.flags.length ? an.flags.map(function (f) { return '<span class="flag stall">' + esc(f.label) + '</span>'; }).join(' ') : '<span class="flag fly">Nothing worth a look</span>') + '</div>' +
      (pr ? '<div class="wr-source"><p class="kicker">Her prompt · ' + esc(pr.title || pr.writeId || '') + (pr.desk ? ' · ' + esc(pr.desk) : '') + '</p><b>' + esc(pr.angle || pr.task || '') + '</b>' +
        (pr.quota ? '<ul class="wr-quota">' + pr.quota.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ul>' : '') +
        (pr.words ? '<p class="tiny">Words: ' + esc(pr.words.join(', ')) + (dr.wordsUsed ? ' · used ' + dr.wordsUsed.filter(function (w) { return w.ok; }).length + '/' + dr.wordsUsed.length : '') + '</p>' : '') + '</div>' : '') +
      '<p class="kicker" style="margin-top:12px">In-class draft' + (dr.submittedAt ? ' · ' + new Date(dr.submittedAt).toLocaleTimeString() + (dr.auto ? ' (auto)' : '') : ' · not submitted') + '</p>' +
      '<div class="wr-read">' + (dr.text ? WR.render(dr.text) : '<span class="tiny">empty</span>') + '</div>' +
      (d.review ? '<p class="kicker">Peer review by ' + esc(d.review.reviewerName || d.review.reviewer) + '</p><div class="wr-source"><div>Quota structures: <b>' + esc(d.review.checklist.structures) + '</b> · marked: <b>' + esc(d.review.checklist.marked) + '</b> · words: <b>' + esc(d.review.checklist.words) + '</b></div><div style="margin-top:6px">' + esc(d.review.checklist.sentence) + '</div></div>' : '<p class="tiny">No peer review yet.</p>') +
      (d.published ? '<p class="kicker" style="margin-top:12px">Published · ' + new Date(d.published.at).toLocaleString() + ' · <b>' + d.published.retention.words + '%</b> of the draft kept (' + d.published.retention.pairs + '% of word pairs)' + (d.published.retention.words < 80 ? ' · <span class="flag stall">below 80%</span>' : '') + '</p><div class="wr-read">' + esc(d.published.text).replace(/\n/g, '<br>') + '</div>' : '<p class="tiny">Not published yet.</p>') +
      '</div>' +
      '<div><p class="kicker">Replay</p><div class="wr-replay" id="wr-replay">' + (d.ops.length ? '' : '<div class="empty">No keystroke log (purged, or nothing typed).</div>') + '</div></div>' +
      '</div></div>';
    $('#wr-close').addEventListener('click', function () { T.detail = null; stopReplay(); box.innerHTML = ''; });
    if (d.ops.length) mountReplay(d);
  }

  /* --------------------------------------------------------- replay
     The op log is [dt, pos, del, ins]. The timeline bar is the session's
     wall clock from the first op to the last; away periods are shaded red,
     Split View amber, blocked pastes and bulk inserts are tick marks. */
  function stopReplay() { if (T.replay && T.replay.timer) clearInterval(T.replay.timer); T.replay = null; }
  function mountReplay(d) {
    stopReplay();
    var ops = d.ops, total = ops.reduce(function (a, o) { return a + o[0]; }, 0);
    var t0 = null; /* absolute start: first event 'start' or first op time unknown → we use relative ms */
    var R = T.replay = { ops: ops, i: 0, elapsed: 0, speed: 4, timer: null, total: total, text: '' };
    var box = $('#wr-replay');
    /* Marks from events, placed on the relative clock: events carry ISO times;
       ops only carry deltas. Anchor the clock on the 'start' event if there is
       one, else on the first event. */
    var evs = d.events || [], anchor = null;
    evs.forEach(function (e) { if (e.type === 'start' && !anchor) anchor = new Date(e.t).getTime(); });
    if (!anchor && evs.length) anchor = new Date(evs[0].t).getTime();
    var span = Math.max(total, 1);
    var marks = evs.map(function (e) {
      if (!anchor) return '';
      var at = new Date(e.t).getTime() - anchor; if (at < 0 || at > span * 1.2) return '';
      var left = Math.min(100, 100 * at / span);
      if (e.type === 'away' || e.type === 'blur' || e.type === 'possibleSleep') { var w = Math.min(100 - left, 100 * (e.durationMs || 0) / span); return '<i class="rp-away" style="left:' + (left - w) + '%;width:' + Math.max(w, .4) + '%" title="' + e.type + ' ' + mmss((e.durationMs || 0) / 1000) + '"></i>'; }
      if (e.type === 'splitView') return '<i class="rp-split" style="left:' + left + '%" title="Split View"></i>';
      if (e.type === 'paste' || e.type === 'drop') return '<i class="rp-paste" style="left:' + left + '%" title="blocked paste"></i>';
      if (e.type === 'bulk') return '<i class="rp-bulk" style="left:' + left + '%" title="bulk insert ' + (e.chars || '') + ' chars"></i>';
      return '';
    }).join('');
    box.innerHTML = '<div class="rp-bar" id="rp-bar">' + marks + '<i class="rp-head" id="rp-head"></i></div>' +
      '<div class="rp-ctl"><button class="btn sm" id="rp-play">▶ Play</button>' +
      '<select id="rp-speed"><option value="1">1×</option><option value="4" selected>4×</option><option value="16">16×</option><option value="64">64×</option></select>' +
      '<input type="range" id="rp-scrub" min="0" max="1000" value="0"><span class="tiny" id="rp-time">0:00 / ' + mmss(total / 1000) + '</span></div>' +
      '<div class="rp-text" id="rp-text"></div><p class="tiny">Red = away from the page · amber = Split View · ▲ paste blocked · ● bulk insert. Marked structures appear as ⟦ ⟧ while typing.</p>';
    function render(upTo) {
      var t = '', acc = 0, i;
      for (i = 0; i < ops.length; i++) { acc += ops[i][0]; if (acc > upTo) break; var o = ops[i]; t = t.slice(0, o[1]) + (o[3] || '') + t.slice(o[1] + o[2]); }
      R.i = i; R.text = t;
      $('#rp-text').textContent = t;
      $('#rp-head').style.left = (100 * Math.min(upTo, total) / span) + '%';
      $('#rp-scrub').value = Math.round(1000 * Math.min(upTo, total) / span);
      $('#rp-time').textContent = mmss(upTo / 1000) + ' / ' + mmss(total / 1000);
    }
    function tick() { R.elapsed += 250 * R.speed; if (R.elapsed >= total) { R.elapsed = total; stop(); } render(R.elapsed); }
    function play() { if (R.elapsed >= total) R.elapsed = 0; R.timer = setInterval(tick, 250); $('#rp-play').textContent = '❚❚ Pause'; }
    function stop() { if (R.timer) clearInterval(R.timer); R.timer = null; var b = $('#rp-play'); if (b) b.textContent = '▶ Play'; }
    $('#rp-play').addEventListener('click', function () { if (R.timer) stop(); else play(); });
    $('#rp-speed').addEventListener('change', function () { R.speed = Number(this.value); });
    $('#rp-scrub').addEventListener('input', function () { stop(); R.elapsed = total * Number(this.value) / 1000; render(R.elapsed); });
    render(0);
  }

  /* --------------------------------------------------------- exports */
  function csvCell(v) { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function download(name, text, type) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: type || 'text/plain' })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { document.body.removeChild(a); }, 100);
  }
  function exportCsv() {
    var r = T.room, rows = [['session', 'code', 'studentId', 'name', 'band', 'status', 'words', 'awaySec', 'exits', 'pastes', 'bulk', 'reviewed', 'published', 'retention%', 'flags', 'submittedAt']];
    T.cards.forEach(function (c) { rows.push([r.name, r.code, c.studentId, c.name, bandOf(c.studentId) || '', c.status, c.wc, Math.round(c.away / 1000), c.exits, c.pastes, c.bulk, c.reviewed ? 1 : 0, c.published ? 1 : 0, c.retention ? c.retention.words : '', c.flags.map(function (f) { return f.label; }).join('; '), c.submittedAt]); });
    download('E4-writing-' + r.code + '.csv', rows.map(function (row) { return row.map(csvCell).join(','); }).join('\n'), 'text/csv');
  }
  function exportDrafts() {
    var subs = T.cards.filter(function (c) { return c.status === 'submitted'; });
    if (!subs.length) return toast('Nothing submitted yet.');
    Promise.all(subs.map(function (c) { return api('w.detail', { sessionId: T.sel, studentId: c.studentId }); })).then(function (all) {
      var out = all.map(function (d, i) {
        var c = subs[i], dr = d.draft || {};
        return '=== ' + c.name + ' (' + c.studentId + ') · ' + (dr.wc || 0) + ' words · away ' + mmss(c.away / 1000) + ' · exits ' + c.exits + ' · pastes ' + c.pastes + '\n' +
          (d.prompt ? 'PROMPT: ' + (d.prompt.angle || d.prompt.task || '') + '\nQUOTA: ' + (d.prompt.quota || []).join(' | ') + '\nWORDS: ' + (d.prompt.words || []).join(', ') + '\n' : '') +
          '--- draft ---\n' + (dr.text || '') + '\n' + (d.review ? '--- peer review (' + (d.review.reviewerName || '') + ') ---\n' + JSON.stringify(d.review.checklist) + '\n' : '') +
          (d.published ? '--- published (' + d.published.retention.words + '% kept) ---\n' + d.published.text + '\n' : '') + '\n';
      }).join('\n');
      download('E4-drafts-' + T.room.code + '.txt', out);
    });
  }
})();
