/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — write.js
   The Writing Room: monitored in-class writing under the Guided Writing
   Protocol (lesson-plan tab A00; guided-access skill).

   What it does, honestly: it does NOT lock the iPad — a web page cannot.
   It detects, logs and shows. Time away from the page, blocked pastes, bulk
   inserts and the full keystroke timeline are recorded DURING A SESSION
   ONLY, INSIDE THE WRITING BOX ONLY, and the student sees the same numbers
   her teacher sees. Phones in the box and iPadOS Guided Access are the other
   two layers; this is the third.

   Flow for a student
     home   → join a session with the code the teacher shows
     lobby  → prompt sealed; protocol checklist; waiting for Start
     live   → her own prompt (angle · grammar quota · 4 words · word target),
              the writing box, the away counter, Mark-structure toolbar
     review → partner's draft read-only + the four-line checklist
     receipt→ words, time away, exits, blocked pastes, structures, words used
     later  → Publish: the polished text, with retention % against the draft

   Server: the same Apps Script as the rest of the app (Code.gs, actions
   w.*). With no server (API.mode !== 'cloud') everything runs against
   localStorage so the whole room can be rehearsed on one device — the
   teacher console in one tab, students in others.
   =========================================================================== */
(function (global) {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function mmss(sec) { sec = Math.max(0, Math.round(sec)); var m = Math.floor(sec / 60), s = sec % 60; return m + ':' + (s < 10 ? '0' : '') + s; }
  function nowIso() { return new Date().toISOString(); }
  function uid() { return 'W' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  /* ---------------------------------------------------------- the client
     Mirrors api.js: POST text/plain to the Apps Script URL in cloud mode,
     localStorage otherwise. Writing actions never fall back silently from
     cloud to local mid-session (that would split the class in two), so a
     failed call is retried on the next heartbeat instead. */
  var LS = 'e4.write.v1';
  function store() { try { return JSON.parse(localStorage.getItem(LS)) || { rooms: {}, drafts: {}, ops: {}, events: {}, reviews: {}, published: {}, prompts: {} }; } catch (e) { return { rooms: {}, drafts: {}, ops: {}, events: {}, reviews: {}, published: {}, prompts: {} }; } }
  function save(d) { try { localStorage.setItem(LS, JSON.stringify(d)); } catch (e) {} }
  function cloud() { return global.API && global.API.mode === 'cloud' && global.API.url; }
  function post(action, payload) {
    var tok = null; try { tok = localStorage.getItem('mc.token'); } catch (e) {}
    if (tok) payload.token = tok;
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null, timer;
    var req = fetch(global.API.url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: action, payload: payload }), redirect: 'follow', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
    var guard = new Promise(function (_, rej) { timer = setTimeout(function () { if (ctrl) { try { ctrl.abort(); } catch (e) {} } rej(new Error('timeout')); }, 14000); });
    return Promise.race([req, guard]).then(function (v) { clearTimeout(timer); return v; }, function (e) { clearTimeout(timer); throw e; });
  }
  function api(action, payload) {
    if (cloud()) return post(action, payload || {});
    return Promise.resolve(Local.handle(action, payload || {}));
  }

  /* ------------------------------------------------- shared text helpers */
  var MARK_OPEN = '⟦', MARK_CLOSE = '⟧';   /* ⟦ ⟧ around a marked structure */
  function plain(t) { return String(t || '').replace(/[⟦⟧]/g, ''); }
  function words(t) { return plain(t).split(/\s+/).filter(function (w) { return /[A-Za-z0-9฀-๿]/.test(w); }); }
  function wc(t) { return words(t).length; }
  function tokens(t) { return plain(t).toLowerCase().replace(/[^a-z0-9'\s]/g, ' ').split(/\s+/).filter(Boolean); }
  /* Retention: what share of the draft's words survive in the published text
     (multiset), plus the share of its word pairs. Both are shown; the first is
     the rule (≥ 80%). */
  function retention(draft, pub) {
    var a = tokens(draft), b = tokens(pub);
    if (!a.length) return { words: 0, pairs: 0 };
    var count = {}; b.forEach(function (w) { count[w] = (count[w] || 0) + 1; });
    var kept = 0; a.forEach(function (w) { if (count[w] > 0) { kept++; count[w]--; } });
    var pa = {}, pk = 0, pn = 0;
    for (var i = 0; i + 1 < b.length; i++) pa[b[i] + ' ' + b[i + 1]] = (pa[b[i] + ' ' + b[i + 1]] || 0) + 1;
    for (var j = 0; j + 1 < a.length; j++) { pn++; var k = a[j] + ' ' + a[j + 1]; if (pa[k] > 0) { pk++; pa[k]--; } }
    return { words: Math.round(100 * kept / a.length), pairs: pn ? Math.round(100 * pk / pn) : 0 };
  }
  function hash(s) { var h = 5381; s = String(s); for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return 'h' + h.toString(36); }
  function marksIn(t) { var m = String(t || '').match(/⟦[^⟦⟧]*⟧/g); return m ? m.length : 0; }
  function wordsUsed(t, list) {
    var low = plain(t).toLowerCase();
    return (list || []).map(function (w) {
      var stem = String(w).toLowerCase().replace(/\s+/g, ' ');
      /* accept inflections: evacuat-, submerg-, displac-, 'trying times' */
      var root = stem.length > 5 ? stem.slice(0, stem.length - 2) : stem;
      return { word: w, ok: low.indexOf(root) >= 0 };
    });
  }
  /* Rebuild a text from its op log — the integrity check the server runs,
     done here too so the receipt can say "log matches". */
  function replay(ops) {
    var t = '';
    for (var i = 0; i < ops.length; i++) {
      var o = ops[i], pos = o[1], del = o[2], ins = o[3] || '';
      t = t.slice(0, pos) + ins + t.slice(pos + del);
    }
    return t;
  }
  /* Flags from the log: evidence, never a verdict. Thresholds are the
     defaults; the teacher console can change them. */
  var DEFAULT_THRESHOLDS = { awaySec: 30, exits: 2, bulk: 25, revision: 0.08, burstChars: 120, burstSec: 20 };
  function analyse(rec, th) {
    th = th || DEFAULT_THRESHOLDS;
    var ev = rec.events || [], ops = rec.ops || [];
    var away = 0, exits = 0, longest = 0, pastes = 0, split = 0;
    ev.forEach(function (e) {
      if (e.type === 'away' || e.type === 'possibleSleep') { exits++; away += e.durationMs || 0; longest = Math.max(longest, e.durationMs || 0); }
      if (e.type === 'paste' || e.type === 'drop') pastes++;
      if (e.type === 'splitView') split++;
    });
    var ins = 0, del = 0, bulk = 0, bulkMax = 0, t = 0, lastT = 0, burst = 0, idleBefore = 0, bursts = 0, gaps = [];
    ops.forEach(function (o) {
      t += o[0]; var n = (o[3] || '').length;
      ins += n; del += o[2] || 0;
      if (n > th.bulk) { bulk++; bulkMax = Math.max(bulkMax, n); }
      if (o[0] > 20000) { idleBefore = o[0]; burst = 0; }
      burst += n;
      if (idleBefore && burst > th.burstChars && t - lastT < th.burstSec * 1000) { bursts++; idleBefore = 0; }
      if (o[0] > 20000) lastT = t;
      if (n === 1 && o[0] > 0 && o[0] < 2000) gaps.push(o[0]);
    });
    /* uniform rhythm: coefficient of variation of inter-key gaps over a long stretch */
    var cv = null;
    if (gaps.length > 80) {
      var mean = gaps.reduce(function (a, b) { return a + b; }, 0) / gaps.length;
      var sd = Math.sqrt(gaps.reduce(function (a, b) { return a + (b - mean) * (b - mean); }, 0) / gaps.length);
      cv = mean ? sd / mean : null;
    }
    var revision = ins ? del / ins : 0;
    var rebuilt = replay(ops);
    var mismatch = rec.text != null && plain(rebuilt) !== plain(rec.text);
    var flags = [];
    if (away / 1000 > th.awaySec) flags.push({ k: 'away', label: 'Away ' + mmss(away / 1000) + ' in ' + exits + (exits === 1 ? ' exit' : ' exits') + ', longest ' + mmss(longest / 1000) });
    else if (exits > th.exits) flags.push({ k: 'exits', label: exits + ' exits' });
    if (pastes) flags.push({ k: 'paste', label: pastes + ' blocked paste' + (pastes === 1 ? '' : 's') });
    if (split) flags.push({ k: 'split', label: 'Split View ' + split + '×' });
    if (bulk) flags.push({ k: 'bulk', label: bulk + ' bulk insert' + (bulk === 1 ? '' : 's') + ', largest ' + bulkMax + ' chars' });
    if (ins > 200 && revision < th.revision) flags.push({ k: 'revision', label: 'Revision ratio ' + Math.round(revision * 100) + '% (little editing)' });
    if (bursts) flags.push({ k: 'burst', label: bursts + ' idle-then-burst pattern' + (bursts === 1 ? '' : 's') });
    if (cv !== null && cv < 0.35) flags.push({ k: 'rhythm', label: 'Very uniform typing rhythm' });
    if (mismatch) flags.push({ k: 'mismatch', label: 'Log and text do not match' });
    return { away: away, exits: exits, longest: longest, pastes: pastes, split: split, ins: ins, del: del, revision: revision,
             bulk: bulk, bulkMax: bulkMax, bursts: bursts, cv: cv, mismatch: mismatch, flags: flags, wc: wc(rec.text || rebuilt) };
  }

  /* ========================================================= local server
     The same contract as Code.gs, against localStorage. Used with no server
     URL, and by the Playwright tests. */
  var Local = {
    handle: function (action, p) {
      var d = store(), r;
      switch (action) {
        case 'w.sessions': r = { ok: true, rooms: Object.keys(d.rooms).map(function (k) { return d.rooms[k]; }).sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; }) }; break;
        case 'w.create': {
          var room = { id: uid(), code: p.code || String(Math.floor(1000 + Math.random() * 9000)), name: p.name || 'Writing session', unit: p.unit || 5,
            writeId: p.writeId || '', minutes: p.minutes || 15, reviewMinutes: p.reviewMinutes || 5, status: 'lobby', createdAt: nowIso(),
            startedAt: '', endsAt: '', reviewEndsAt: '', endedAt: '', broadcast: '', pairs: {}, joined: {} };
          d.rooms[room.id] = room; save(d); r = { ok: true, room: room }; break;
        }
        case 'w.control': {
          var rm = d.rooms[p.sessionId]; if (!rm) { r = { ok: false, error: 'No such session' }; break; }
          var m = rm.minutes || 15;
          if (p.op === 'start') { rm.status = 'live'; rm.startedAt = nowIso(); rm.endsAt = new Date(Date.now() + m * 60000).toISOString(); }
          if (p.op === 'extend') { rm.endsAt = new Date(new Date(rm.endsAt || Date.now()).getTime() + (p.minutes || 2) * 60000).toISOString(); }
          if (p.op === 'review') { rm.status = 'review'; rm.reviewEndsAt = new Date(Date.now() + (rm.reviewMinutes || 5) * 60000).toISOString(); if (p.pairs) rm.pairs = p.pairs; }
          if (p.op === 'end') { rm.status = 'ended'; rm.endedAt = nowIso(); }
          if (p.op === 'reopen') { rm.status = 'live'; rm.endsAt = new Date(Date.now() + (p.minutes || 5) * 60000).toISOString(); }
          if (p.op === 'broadcast') rm.broadcast = p.message || '';
          if (p.op === 'pairs') rm.pairs = p.pairs || {};
          if (p.op === 'delete') { delete d.rooms[p.sessionId]; }
          save(d); r = { ok: true, room: rm }; break;
        }
        case 'w.prompts': { d.prompts[p.writeId] = p.matrix; save(d); r = { ok: true, count: (p.matrix.prompts || []).length }; break; }
        case 'w.promptsList': r = { ok: true, writeIds: Object.keys(d.prompts).map(function (k) { return { writeId: k, name: d.prompts[k].name, count: (d.prompts[k].prompts || []).length }; }) }; break;
        case 'w.join': {
          var rj = null; Object.keys(d.rooms).forEach(function (k) { if (String(d.rooms[k].code) === String(p.code).trim() && d.rooms[k].status !== 'ended') rj = d.rooms[k]; });
          if (!rj) { r = { ok: false, error: 'No open session has that code. Check the board and try again.' }; break; }
          rj.joined[p.studentId] = { name: p.name, at: nowIso() }; save(d);
          r = Local.stateFor(d, rj, p.studentId); break;
        }
        case 'w.beat': {
          var rb = d.rooms[p.sessionId]; if (!rb) { r = { ok: false, error: 'Session gone' }; break; }
          var key = rb.id + '|' + p.studentId;
          var dr = d.drafts[key] || (d.drafts[key] = { sessionId: rb.id, studentId: p.studentId, name: p.name, text: '', wc: 0, status: 'writing', seq: 0, submittedAt: '' });
          if (p.events && p.events.length) d.events[key] = (d.events[key] || []).concat(p.events);
          if (p.ops && p.ops.length) d.ops[key] = (d.ops[key] || []).concat(p.ops);
          if (typeof p.wc === 'number') dr.wc = p.wc;
          if (p.liveStatus) dr.live = p.liveStatus;
          if (p.text != null && dr.status !== 'submitted') dr.text = p.text;
          dr.lastSeen = nowIso(); dr.seq = p.seq || dr.seq;
          save(d); r = Local.stateFor(d, rb, p.studentId); break;
        }
        case 'w.submit': {
          var rs = d.rooms[p.sessionId]; if (!rs) { r = { ok: false, error: 'Session gone' }; break; }
          var ks = rs.id + '|' + p.studentId;
          var ds = d.drafts[ks] || (d.drafts[ks] = { sessionId: rs.id, studentId: p.studentId, name: p.name });
          if (p.events && p.events.length) d.events[ks] = (d.events[ks] || []).concat(p.events);
          if (p.ops && p.ops.length) d.ops[ks] = (d.ops[ks] || []).concat(p.ops);
          ds.text = p.text; ds.wc = wc(p.text); ds.status = 'submitted'; ds.submittedAt = nowIso(); ds.hash = hash(plain(p.text));
          ds.marks = marksIn(p.text); ds.wordsUsed = p.wordsUsed || []; ds.auto = !!p.auto;
          var an = analyse({ text: ds.text, events: d.events[ks] || [], ops: d.ops[ks] || [] });
          ds.summary = { away: an.away, exits: an.exits, pastes: an.pastes, bulk: an.bulk, mismatch: an.mismatch, flags: an.flags };
          save(d); r = { ok: true, receipt: ds }; break;
        }
        case 'w.review': {
          var kr = p.sessionId + '|' + p.reviewOf;
          d.reviews[kr] = { sessionId: p.sessionId, reviewOf: p.reviewOf, reviewer: p.studentId, reviewerName: p.name, checklist: p.checklist, at: nowIso() };
          save(d); r = { ok: true }; break;
        }
        case 'w.publish': {
          var kp = p.sessionId + '|' + p.studentId, dp = d.drafts[kp];
          if (!dp || dp.status !== 'submitted') { r = { ok: false, error: 'No submitted draft to publish from.' }; break; }
          var ret = retention(dp.text, p.text);
          d.published[kp] = { sessionId: p.sessionId, studentId: p.studentId, text: p.text, wc: wc(p.text), retention: ret, at: nowIso() };
          save(d); r = { ok: true, retention: ret }; break;
        }
        case 'w.mine': {
          var mine = [];
          Object.keys(d.drafts).forEach(function (k) {
            var dd = d.drafts[k]; if (dd.studentId !== p.studentId) return;
            var rmm = d.rooms[dd.sessionId] || {};
            mine.push({ sessionId: dd.sessionId, name: rmm.name || dd.sessionId, writeId: rmm.writeId || '', status: dd.status, submittedAt: dd.submittedAt, wc: dd.wc,
              summary: dd.summary || null, text: dd.text, roomStatus: rmm.status, published: d.published[k] || null, reviewed: !!d.reviews[k] });
          });
          mine.sort(function (a, b) { return a.submittedAt < b.submittedAt ? 1 : -1; });
          r = { ok: true, pieces: mine }; break;
        }
        /* teacher */
        case 'w.live': {
          var rl = d.rooms[p.sessionId]; if (!rl) { r = { ok: false, error: 'No such session' }; break; }
          var cards = Object.keys(rl.joined).map(function (sid) {
            var k2 = rl.id + '|' + sid, dr2 = d.drafts[k2] || {}, an2 = analyse({ text: dr2.text || '', events: d.events[k2] || [], ops: d.ops[k2] || [] });
            return { studentId: sid, name: rl.joined[sid].name, joinedAt: rl.joined[sid].at, lastSeen: dr2.lastSeen || '', live: dr2.live || 'joined', wc: dr2.wc || 0,
              status: dr2.status || 'writing', away: an2.away, exits: an2.exits, pastes: an2.pastes, bulk: an2.bulk, flags: an2.flags, submittedAt: dr2.submittedAt || '',
              reviewed: !!d.reviews[k2], published: !!d.published[k2], retention: d.published[k2] ? d.published[k2].retention : null };
          });
          r = { ok: true, room: rl, cards: cards }; break;
        }
        case 'w.detail': {
          var kd = p.sessionId + '|' + p.studentId;
          r = { ok: true, draft: d.drafts[kd] || null, ops: d.ops[kd] || [], events: d.events[kd] || [], review: d.reviews[kd] || null, published: d.published[kd] || null,
                prompt: Local.promptFor(d, d.rooms[p.sessionId], p.studentId) }; break;
        }
        case 'w.purge': { Object.keys(d.ops).forEach(function (k) { if (k.indexOf(p.sessionId + '|') === 0) delete d.ops[k]; }); save(d); r = { ok: true }; break; }
        default: r = { ok: false, error: 'Unknown action ' + action };
      }
      return r;
    },
    promptFor: function (d, room, studentId) {
      if (!room || !room.writeId) return null;
      var mx = d.prompts[room.writeId]; if (!mx) return null;
      var hit = (mx.prompts || []).filter(function (x) { return String(x.studentId) === String(studentId); })[0] || mx.fallback || null;
      if (!hit) return null;
      var out = {}; Object.keys(hit).forEach(function (k) { out[k] = hit[k]; });
      out.writeId = room.writeId; out.title = mx.name || room.writeId;
      if (!out.target && mx.wordTargets) {
        var band = out.band || (global.ROSTER || []).filter(function (s) { return String(s.id) === String(studentId); }).map(function (s) { return s.band; })[0] || 2;
        out.target = mx.wordTargets[band] || mx.wordTargets[2];
      }
      return out;
    },
    stateFor: function (d, room, studentId) {
      var k = room.id + '|' + studentId, dr = d.drafts[k] || null;
      var partner = (room.pairs || {})[studentId] || null, partnerDraft = null;
      if (room.status === 'review' && partner) { var pd = d.drafts[room.id + '|' + partner]; if (pd) partnerDraft = { studentId: partner, name: pd.name, text: pd.text, wc: pd.wc, marks: marksIn(pd.text || '') }; }
      return { ok: true, session: { id: room.id, code: room.code, name: room.name, unit: room.unit, writeId: room.writeId, status: room.status, startedAt: room.startedAt, endsAt: room.endsAt, reviewEndsAt: room.reviewEndsAt, broadcast: room.broadcast, minutes: room.minutes },
        prompt: room.status === 'live' || room.status === 'review' || room.status === 'ended' ? Local.promptFor(d, room, studentId) : null,
        draft: dr ? { status: dr.status, text: dr.text, submittedAt: dr.submittedAt, summary: dr.summary || null } : null,
        partner: partner, partnerDraft: partnerDraft, partnerPrompt: partner ? Local.promptFor(d, room, partner) : null,
        reviewed: !!d.reviews[k], reviewOfMe: d.reviews[k] ? d.reviews[k].checklist : null };
    }
  };

  /* ============================================================ student UI */
  var W = {
    p: null, band: 2, screen: 'home',
    session: null, prompt: null, draft: null, state: null,
    text: '', ops: [], events: [], pendingOps: [], pendingEvents: [], seq: 0,
    lastOpAt: 0, hiddenAt: 0, awayMs: 0, exits: 0, pastes: 0, hb: null, clock: null,
    submitted: false, receipt: null, pieces: [], partnerDraft: null, reviewed: false, splitOn: false
  };
  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function toast(msg) { var s = $('#toast-slot'); if (!s) return; s.innerHTML = '<div class="toast">' + esc(msg) + '</div>'; clearTimeout(toast._t); toast._t = setTimeout(function () { s.innerHTML = ''; }, 2600); }
  function host() { return $('#view-write'); }
  function band() { var r = (global.ROSTER || []).filter(function (s) { return W.p && String(s.id) === String(W.p.studentId); })[0]; return r ? r.band : 2; }

  function setStudent(p) {
    W.p = p; W.band = band();
    try { var saved = JSON.parse(sessionStorage.getItem('e4.write.room')); if (saved && saved.studentId === p.studentId) { W.resume = saved; } } catch (e) {}
  }
  function remember() { try { sessionStorage.setItem('e4.write.room', JSON.stringify({ studentId: W.p.studentId, sessionId: W.session.id, code: W.session.code })); } catch (e) {} }
  function forget() { try { sessionStorage.removeItem('e4.write.room'); } catch (e) {} }

  function paint() {
    if (!W.p) return;
    if (W.session) return paintRoom();
    if (W.resume && !W.resumeTried) { W.resumeTried = true; join(W.resume.code, true); return; }
    paintHome();
  }

  /* ------------------------------------------------------------- home */
  function paintHome() {
    var h = host();
    h.innerHTML = '<div class="sect-h"><div><h2>Writing Room</h2>' +
      '<p style="color:var(--ink-2);font-size:.92rem;margin-top:4px">In-class writing under the Guided Writing Protocol. Your teacher gives a four-digit code; the prompt stays sealed until she presses Start. During a session the app records what you type in the box, when you leave the page and any paste you try — and nothing else, nowhere else. You will see the same receipt your teacher sees.</p></div></div>' +
      '<div class="card wr-join"><label for="wr-code">Session code</label>' +
      '<div class="wr-join-row"><input id="wr-code" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="e.g. 4821" autocomplete="off">' +
      '<button class="btn primary" id="wr-go">Join</button></div><div id="wr-msg" class="msg bad hidden"></div></div>' +
      '<div class="wr-protocol card"><p class="kicker">Before you join</p><ol>' +
      '<li>Phone in the box at the door.</li><li>Open this app from the home screen and log in as yourself.</li>' +
      '<li>Join the session, then turn on <b>Guided Access</b> (triple-click the top button).</li>' +
      '<li>Auto-Lock: Never, for this period.</li></ol></div>' +
      '<div id="wr-mine"><p class="tiny">Loading your pieces…</p></div>';
    $('#wr-go').addEventListener('click', function () { join($('#wr-code').value); });
    $('#wr-code').addEventListener('keydown', function (e) { if (e.key === 'Enter') join($('#wr-code').value); });
    api('w.mine', { studentId: W.p.studentId }).then(function (r) {
      var box = $('#wr-mine'); if (!box) return;
      var pieces = (r && r.pieces) || [];
      W.pieces = pieces;
      if (!pieces.length) { box.innerHTML = '<p class="tiny">No pieces yet. Your first guided write is Newsroom Desk on Thursday 5 November.</p>'; return; }
      box.innerHTML = '<div class="sect-h" style="margin-top:18px"><h2 style="font-size:1.15rem">Your pieces</h2></div><div class="wr-pieces">' + pieces.map(function (pc, i) {
        var s = pc.summary || {};
        return '<div class="card wr-piece"><div class="wr-piece-h"><b>' + esc(pc.name) + '</b><span class="pill' + (pc.status === 'submitted' ? ' good' : '') + '">' + esc(pc.status) + '</span></div>' +
          '<div class="wr-piece-s">' + (pc.submittedAt ? new Date(pc.submittedAt).toLocaleString() + ' · ' : '') + pc.wc + ' words' +
          (s.away != null ? ' · away ' + mmss(s.away / 1000) + ' · ' + s.exits + ' exits' : '') +
          (pc.published ? ' · published, ' + pc.published.retention.words + '% kept' : '') + '</div>' +
          '<div class="wr-piece-a">' +
          (pc.status === 'submitted' && pc.roomStatus === 'ended' ? '<button class="btn sm primary" data-publish="' + i + '">' + (pc.published ? 'Update the published piece' : 'Publish the polished piece') + '</button>' : '') +
          '<button class="btn sm" data-draft="' + i + '">Read the draft</button></div></div>';
      }).join('') + '</div>';
      box.querySelectorAll('[data-publish]').forEach(function (b) { b.addEventListener('click', function () { paintPublish(pieces[Number(b.dataset.publish)]); }); });
      box.querySelectorAll('[data-draft]').forEach(function (b) { b.addEventListener('click', function () {
        var pc = pieces[Number(b.dataset.draft)];
        showModal('<p class="kicker">' + esc(pc.name) + ' · in-class draft</p><div class="wr-read">' + render(pc.text) + '</div><button class="btn wide" data-close>Close</button>');
      }); });
    });
  }
  function showModal(html) {
    var slot = $('#modal-slot'); slot.innerHTML = '<div class="modal"><div class="modal-card">' + html + '</div></div>';
    slot.querySelector('.modal').addEventListener('click', function (ev) { if (ev.target === this) slot.innerHTML = ''; });
    var b = slot.querySelector('[data-close]'); if (b) b.addEventListener('click', function () { slot.innerHTML = ''; });
  }
  /* The draft with marked structures shown as highlights. */
  function render(t) {
    return esc(t).replace(/⟦/g, '<mark class="wr-mark">').replace(/⟧/g, '</mark>').replace(/\n/g, '<br>');
  }

  /* ------------------------------------------------------------- join */
  function join(code, silent) {
    code = String(code || '').trim();
    if (!/^\d{4,6}$/.test(code)) { if (!silent) msg('Enter the four-digit code on the board.'); return; }
    api('w.join', { code: code, studentId: W.p.studentId, name: W.p.displayName, band: W.band }).then(function (r) {
      if (!r || !r.ok) { if (!silent) msg(r && r.error || 'Could not join.'); else { W.resume = null; paintHome(); } return; }
      enter(r);
    }).catch(function (e) { if (!silent) msg('Could not reach the class server: ' + e.message); else { W.resume = null; paintHome(); } });
  }
  function msg(t) { var m = $('#wr-msg'); if (m) { m.textContent = t; m.classList.remove('hidden'); } }
  function enter(r) {
    W.session = r.session; W.prompt = r.prompt; W.draft = r.draft; W.state = r;
    W.text = (r.draft && r.draft.text) || ''; W.submitted = !!(r.draft && r.draft.status === 'submitted');
    W.ops = []; W.events = []; W.pendingOps = []; W.pendingEvents = []; W.seq = 0; W.awayMs = 0; W.exits = 0; W.pastes = 0;
    W.receipt = W.submitted ? r.draft : null; W.reviewed = !!r.reviewed;
    remember(); attachMonitors(); startHeartbeat(); paintRoom();
    var n = $('#nav-write'); if (n) n.textContent = ' ●';
  }
  function leave() {
    stopHeartbeat(); detachMonitors(); forget();
    W.session = null; W.prompt = null; W.resume = null; W.partnerDraft = null;
    var n = $('#nav-write'); if (n) n.textContent = '';
    paintHome();
  }

  /* ---------------------------------------------------------- monitors
     Recorded only while a session is joined, and only for this page. */
  var onVis, onHide, onShow, onBlur, onFocus, onResize;
  function logEvent(type, extra) {
    var e = { type: type, t: nowIso() }; if (extra) Object.keys(extra).forEach(function (k) { e[k] = extra[k]; });
    W.events.push(e); W.pendingEvents.push(e); paintCounter();
  }
  function attachMonitors() {
    detachMonitors();
    onVis = function () {
      if (document.visibilityState === 'hidden') { W.hiddenAt = Date.now(); W.lastInputAt = W.lastOpAt; }
      else if (W.hiddenAt) { var d = Date.now() - W.hiddenAt; W.hiddenAt = 0; W.awayMs += d; W.exits++;
        /* a long gap with no input before it and the heartbeat stopped reads as the screen locking */
        logEvent(d > 120000 && Date.now() - W.lastOpAt > 150000 ? 'possibleSleep' : 'away', { durationMs: d }); }
    };
    onHide = function () { flush(true); };
    onBlur = function () { W.blurAt = Date.now(); };
    onFocus = function () { if (W.blurAt && !W.hiddenAt) { var d = Date.now() - W.blurAt; W.blurAt = 0; if (d > 1500) { W.awayMs += d; W.exits++; logEvent('blur', { durationMs: d }); } } };
    onResize = function () {
      var full = Math.max(screen.width, screen.height), w = Math.max(window.innerWidth, window.innerHeight);
      var split = w < full * 0.8 && /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
      if (split && !W.splitOn) { W.splitOn = true; logEvent('splitView', { width: window.innerWidth }); }
      if (!split && W.splitOn) { W.splitOn = false; logEvent('splitViewEnd'); }
      paintCounter();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pagehide', onHide);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    window.addEventListener('resize', onResize);
    onResize();
  }
  function detachMonitors() {
    if (onVis) document.removeEventListener('visibilitychange', onVis);
    if (onHide) window.removeEventListener('pagehide', onHide);
    if (onBlur) window.removeEventListener('blur', onBlur);
    if (onFocus) window.removeEventListener('focus', onFocus);
    if (onResize) window.removeEventListener('resize', onResize);
    onVis = onHide = onBlur = onFocus = onResize = null;
  }

  /* ---------------------------------------------------------- heartbeat
     Every 10 s: pending ops and events go up, the session state comes down.
     One call per student per 10 s keeps 30 students inside Apps Script's
     quota. On pagehide the same payload goes by sendBeacon. */
  function startHeartbeat() { stopHeartbeat(); W.hb = setInterval(beat, 10000); W.clock = setInterval(paintClock, 1000); beat(); }
  function stopHeartbeat() { if (W.hb) clearInterval(W.hb); if (W.clock) clearInterval(W.clock); W.hb = W.clock = null; }
  function liveStatus() {
    if (W.submitted) return 'submitted';
    if (W.hiddenAt) return 'away';
    if (W.splitOn) return 'split';
    if (Date.now() - W.lastOpAt > 60000) return 'idle';
    return 'writing';
  }
  function payload() {
    var ops = W.pendingOps, evs = W.pendingEvents;
    return { sessionId: W.session.id, studentId: W.p.studentId, name: W.p.displayName, seq: ++W.seq, wc: wc(W.text), liveStatus: liveStatus(),
      ops: ops, events: evs, text: W.session.status === 'live' && !W.submitted ? W.text : undefined };
  }
  function beat() {
    if (!W.session) return;
    var pl = payload(); var ops = pl.ops, evs = pl.events;
    W.pendingOps = []; W.pendingEvents = [];
    api('w.beat', pl).then(function (r) {
      if (!r || !r.ok) { W.pendingOps = ops.concat(W.pendingOps); W.pendingEvents = evs.concat(W.pendingEvents); return; }
      applyState(r);
    }).catch(function () { W.pendingOps = ops.concat(W.pendingOps); W.pendingEvents = evs.concat(W.pendingEvents); });
  }
  function flush(beacon) {
    if (!W.session) return;
    var pl = payload();
    if (beacon && cloud() && navigator.sendBeacon) {
      try { var tok = localStorage.getItem('mc.token'); pl.token = tok; var ok = navigator.sendBeacon(global.API.url, new Blob([JSON.stringify({ action: 'w.beat', payload: pl })], { type: 'text/plain;charset=utf-8' })); if (ok) { W.pendingOps = []; W.pendingEvents = []; } } catch (e) {}
    } else { W.pendingOps = []; W.pendingEvents = []; api('w.beat', pl).catch(function () {}); }
  }
  function applyState(r) {
    var before = W.session ? W.session.status : '';
    W.session = r.session; W.state = r;
    if (r.prompt) W.prompt = r.prompt;
    if (r.draft && r.draft.status === 'submitted' && !W.submitted) { W.submitted = true; W.receipt = r.draft; }
    W.partnerDraft = r.partnerDraft || null; W.reviewed = !!r.reviewed;
    if (r.session.status !== before) {
      if (r.session.status === 'live') { logEvent('start'); }
      if ((r.session.status === 'review' || r.session.status === 'ended') && !W.submitted && before === 'live') submit(true);
      paintRoom();
    } else {
      paintClock(); paintBroadcast();
      if (r.session.status === 'review' && !W.reviewed && W.partnerDraft && !$('#wr-review')) paintRoom();
    }
    if (r.session.status === 'live' && W.session.endsAt && Date.now() > new Date(W.session.endsAt).getTime() + 5000 && !W.submitted) submit(true);
  }

  /* ------------------------------------------------------------ room */
  function paintRoom() {
    var s = W.session, h = host();
    if (!s) return paintHome();
    var head = '<div class="wr-top"><div><p class="kicker">Writing Room · session ' + esc(s.code) + '</p><h2>' + esc(s.name) + '</h2></div>' +
      '<div class="wr-counter" id="wr-counter"></div></div>' +
      '<div id="wr-broadcast"></div>';
    var body = '';
    if (s.status === 'lobby') {
      body = '<div class="card wr-lobby"><div class="wr-seal">✉</div><h3>Prompt sealed</h3>' +
        '<p>Your teacher will press Start. Until then: phone boxed, Guided Access on, and keep this page open. The clock begins when the prompt opens.</p>' +
        '<p class="tiny">Joined as <b>' + esc(W.p.displayName) + '</b> (' + esc(W.p.studentId) + ')</p>' +
        '<button class="btn ghost sm" id="wr-leave">Leave the session</button></div>';
    } else if (s.status === 'live' && !W.submitted) {
      body = promptCard() + writerCard();
    } else if (s.status === 'live' && W.submitted) {
      body = receiptCard() + '<p class="tiny" style="margin-top:12px">Wait here. When your teacher starts the peer review, your partner\'s draft appears.</p>';
    } else if (s.status === 'review') {
      body = reviewCard();
    } else {
      body = receiptCard() + '<div class="card" style="padding:16px 18px;margin-top:12px"><p>Session ended. The draft and the receipt are saved. Publish the polished piece from the Writing Room home when you are ready — it must keep at least 80% of this draft.</p>' +
        '<button class="btn primary" id="wr-home">Back to the Writing Room</button></div>';
    }
    h.innerHTML = head + body;
    paintCounter(); paintClock(); paintBroadcast();
    var lv = $('#wr-leave'); if (lv) lv.addEventListener('click', function () { if (confirm('Leave the session? Your teacher will see you drop off the grid.')) leave(); });
    var hm = $('#wr-home'); if (hm) hm.addEventListener('click', leave);
    if (s.status === 'live' && !W.submitted) wireWriter();
    if (s.status === 'review') wireReview();
  }
  function paintCounter() {
    var c = $('#wr-counter'); if (!c) return;
    c.innerHTML = '<span class="wr-c' + (W.awayMs > 30000 ? ' bad' : '') + '"><b>' + mmss(W.awayMs / 1000) + '</b>time away</span>' +
      '<span class="wr-c"><b>' + W.exits + '</b>exits</span>' +
      (W.pastes ? '<span class="wr-c bad"><b>' + W.pastes + '</b>paste' + (W.pastes === 1 ? '' : 's') + ' blocked</span>' : '') +
      (W.splitOn ? '<span class="wr-c bad"><b>▣</b>Split View — go full screen</span>' : '');
  }
  function paintClock() {
    var k = $('#wr-clock'); if (!k || !W.session) return;
    var end = W.session.status === 'review' ? W.session.reviewEndsAt : W.session.endsAt;
    if (!end) { k.textContent = ''; return; }
    var left = Math.max(0, (new Date(end).getTime() - Date.now()) / 1000);
    k.textContent = mmss(left); k.classList.toggle('low', left < 60);
  }
  function paintBroadcast() {
    var b = $('#wr-broadcast'); if (!b) return;
    b.innerHTML = W.session && W.session.broadcast ? '<div class="wr-bc">☎ ' + esc(W.session.broadcast) + '</div>' : '';
  }

  function promptCard() {
    var pr = W.prompt;
    if (!pr) return '<div class="card wr-prompt"><p class="kicker">Your prompt</p><p>No prompt has been set for you in this session — tell your teacher. Write to the title on the board meanwhile.</p></div>';
    var tgt = pr.target || [120, 150];
    return '<div class="card wr-prompt"><div class="wr-prompt-h"><div><p class="kicker">' + esc(pr.title || pr.writeId || 'Your prompt') + (pr.desk ? ' · ' + esc(pr.desk) : '') + '</p>' +
      '<h3>' + esc(pr.angle || pr.task || '') + '</h3></div><span class="wr-clock" id="wr-clock"></span></div>' +
      (pr.source ? '<div class="wr-source"><p class="kicker">Source</p>' + esc(pr.source).replace(/\n/g, '<br>') + '</div>' : '') +
      (pr.facts ? '<div class="wr-source"><p class="kicker">Planner card</p><ul>' + pr.facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>' : '') +
      '<div class="wr-grid">' +
      '<div><p class="kicker">Grammar quota</p><ul class="wr-quota">' + (pr.quota || []).map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ul></div>' +
      '<div><p class="kicker">Use these words</p><div class="wr-words" id="wr-words"></div>' +
      '<p class="kicker" style="margin-top:10px">Word target</p><p class="wr-target" id="wr-target">' + tgt[0] + '–' + tgt[1] + '</p></div></div>' +
      (pr.frames && pr.frames.length ? '<div class="wr-frames"><p class="kicker">Sentence frames</p>' + pr.frames.map(function (f) { return '<code>' + esc(f) + '</code>'; }).join('') + '</div>' : '') +
      '</div>';
  }
  function writerCard() {
    return '<div class="card wr-writer">' +
      '<div class="wr-tools"><button class="btn sm" id="wr-mark" title="Select a structure from your quota, then press">⟦ Mark structure ⟧</button>' +
      '<button class="btn sm ghost" id="wr-unmark">Unmark</button><span class="grow"></span>' +
      '<span class="wr-stat"><b id="wr-wc">0</b> words</span><span class="wr-stat"><b id="wr-marks">0</b> marked</span></div>' +
      '<textarea id="wr-box" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" writingsuggestions="false" ' +
      'placeholder="Write here. Paste is blocked; your keystrokes are recorded for this session only.">' + esc(W.text) + '</textarea>' +
      '<div class="wr-preview" id="wr-preview"></div>' +
      '<div class="wr-foot"><p class="tiny">Marked structures show in yellow. Your partner checks them in the peer review.</p><span class="grow"></span>' +
      '<button class="btn primary" id="wr-submit">Submit my draft</button></div></div>';
  }
  function wireWriter() {
    var box = $('#wr-box'); if (!box) return;
    W.lastOpAt = Date.now(); var prev = box.value;
    function diff(a, b) {
      var i = 0, la = a.length, lb = b.length;
      while (i < la && i < lb && a.charCodeAt(i) === b.charCodeAt(i)) i++;
      var j = 0;
      while (j < la - i && j < lb - i && a.charCodeAt(la - 1 - j) === b.charCodeAt(lb - 1 - j)) j++;
      return [i, la - i - j, b.slice(i, lb - j)];
    }
    function onInput(ev) {
      var now = Date.now(), d = diff(prev, box.value);
      var op = [Math.min(now - W.lastOpAt, 600000), d[0], d[1], d[2]];
      W.lastOpAt = now; prev = box.value; W.text = box.value;
      W.ops.push(op); W.pendingOps.push(op);
      var it = ev && ev.inputType;
      if (it === 'insertReplacementText' || (d[2].length > DEFAULT_THRESHOLDS.bulk && it !== 'insertFromPaste')) logEvent('bulk', { chars: d[2].length, inputType: it || '' });
      paintStats();
    }
    box.addEventListener('input', onInput);
    box.addEventListener('beforeinput', function (ev) {
      var it = ev.inputType || '';
      if (it === 'insertFromPaste' || it === 'insertFromDrop' || it === 'insertFromYank') { ev.preventDefault(); W.pastes++; logEvent('paste', { inputType: it }); toast('Paste is off in the Writing Room.'); }
    });
    ['paste', 'drop'].forEach(function (k) { box.addEventListener(k, function (ev) { ev.preventDefault(); W.pastes++; logEvent(k); toast('Paste is off in the Writing Room.'); }); });
    box.addEventListener('dragover', function (ev) { ev.preventDefault(); });
    box.addEventListener('contextmenu', function (ev) { ev.preventDefault(); });
    $('#wr-mark').addEventListener('click', function () {
      var a = box.selectionStart, b = box.selectionEnd;
      if (a === b) { toast('Select the structure first, then press Mark.'); box.focus(); return; }
      var v = box.value;
      var next = v.slice(0, a) + MARK_OPEN + v.slice(a, b) + MARK_CLOSE + v.slice(b);
      box.value = next; onInput({ inputType: 'mark' }); box.focus(); box.setSelectionRange(b + 2, b + 2);
    });
    $('#wr-unmark').addEventListener('click', function () {
      var a = box.selectionStart, b = box.selectionEnd, v = box.value;
      var seg = v.slice(a, b).replace(/[⟦⟧]/g, '');
      if (a === b) { /* remove the mark around the caret */
        var o = v.lastIndexOf(MARK_OPEN, a), c = v.indexOf(MARK_CLOSE, a);
        if (o >= 0 && c >= 0) { v = v.slice(0, o) + v.slice(o + 1, c) + v.slice(c + 1); box.value = v; onInput({ inputType: 'mark' }); }
        box.focus(); return;
      }
      box.value = v.slice(0, a) + seg + v.slice(b); onInput({ inputType: 'mark' }); box.focus();
    });
    $('#wr-submit').addEventListener('click', function () {
      var n = wc(W.text), tgt = (W.prompt && W.prompt.target) || [0, 0];
      var warn = n < tgt[0] ? 'You have ' + n + ' words; the target is ' + tgt[0] + '–' + tgt[1] + '. ' : '';
      if (!confirm(warn + 'Submit your draft? You cannot edit it afterwards.')) return;
      submit(false);
    });
    paintStats();
  }
  function paintStats() {
    var w = $('#wr-wc'), m = $('#wr-marks'), pv = $('#wr-preview'), ww = $('#wr-words');
    if (w) w.textContent = wc(W.text);
    if (m) m.textContent = marksIn(W.text);
    if (pv) pv.innerHTML = W.text.indexOf(MARK_OPEN) >= 0 ? render(W.text) : '';
    if (ww && W.prompt) ww.innerHTML = wordsUsed(W.text, W.prompt.words).map(function (x) { return '<span class="wr-word' + (x.ok ? ' ok' : '') + '">' + (x.ok ? '✓ ' : '') + esc(x.word) + '</span>'; }).join('');
    var t = $('#wr-target'); if (t && W.prompt && W.prompt.target) { var n = wc(W.text), tg = W.prompt.target; t.classList.toggle('ok', n >= tg[0] && n <= tg[1]); }
  }
  function submit(auto) {
    if (W.submitted || !W.session) return;
    var box = $('#wr-box'); if (box) W.text = box.value;
    W.submitted = true;
    var used = W.prompt ? wordsUsed(W.text, W.prompt.words) : [];
    var pl = { sessionId: W.session.id, studentId: W.p.studentId, name: W.p.displayName, text: W.text, hash: hash(plain(W.text)), opsTotal: W.ops.length,
      ops: W.pendingOps, events: W.pendingEvents, wordsUsed: used, auto: !!auto };
    W.pendingOps = []; W.pendingEvents = [];
    api('w.submit', pl).then(function (r) {
      if (!r || !r.ok) { W.submitted = false; toast(r && r.error || 'Could not submit — trying again.'); setTimeout(function () { submit(auto); }, 4000); return; }
      W.receipt = r.receipt; logEvent('submitted'); paintRoom(); toast(auto ? 'Time is up. Your draft was submitted.' : 'Draft submitted.');
    }).catch(function () { W.submitted = false; toast('Could not reach the server — trying again.'); setTimeout(function () { submit(auto); }, 4000); });
  }
  function receiptCard() {
    var rc = W.receipt || W.draft || {}, s = rc.summary || {};
    var used = (rc.wordsUsed || []).filter(function (x) { return x.ok; }).length, total = (rc.wordsUsed || []).length || ((W.prompt && W.prompt.words) || []).length;
    return '<div class="card wr-receipt"><div class="wr-seal ok">✓</div><p class="kicker">Receipt' + (rc.auto ? ' · submitted when time ran out' : '') + '</p>' +
      '<h3>' + esc(W.p.displayName) + ' · ' + esc(W.session.name) + '</h3>' +
      '<div class="wr-rgrid">' +
      '<div><b>' + (rc.wc != null ? rc.wc : wc(rc.text || '')) + '</b>words</div>' +
      '<div><b>' + (rc.marks != null ? rc.marks : marksIn(rc.text || '')) + '</b>structures marked</div>' +
      '<div><b>' + used + '/' + total + '</b>required words</div>' +
      '<div><b>' + mmss((s.away || 0) / 1000) + '</b>time away</div>' +
      '<div><b>' + (s.exits || 0) + '</b>exits</div>' +
      '<div><b>' + (s.pastes || 0) + '</b>pastes blocked</div></div>' +
      '<p class="tiny">Submitted ' + (rc.submittedAt ? new Date(rc.submittedAt).toLocaleTimeString() : '') + '. These are the same numbers your teacher sees.' + (s.mismatch ? ' The keystroke log and the text differ — tell your teacher if the connection dropped.' : '') + '</p></div>';
  }

  /* ------------------------------------------------------------ review */
  function reviewCard() {
    var pd = W.partnerDraft, pp = W.state && W.state.partnerPrompt;
    var head = '<div class="wr-top" style="margin-top:0"><div><p class="kicker">Peer review</p><h3>' + (pd ? 'Reviewing ' + esc(pd.name) + '\'s draft' : 'Waiting for your partner') + '</h3></div><span class="wr-clock" id="wr-clock"></span></div>';
    if (!pd) return head + '<div class="card" style="padding:16px 18px"><p>Your teacher is pairing the class. Your partner\'s draft appears here in a moment.</p></div>' + (W.submitted ? '' : '');
    if (W.reviewed) return head + '<div class="card wr-receipt"><div class="wr-seal ok">✓</div><p>Review sent. Thank you — your partner sees your checklist with her receipt.</p></div>' + receiptCard();
    var quota = (pp && pp.quota) || (W.prompt && W.prompt.quota) || [], wordsL = (pp && pp.words) || [];
    return head + '<div class="card wr-read" id="wr-partner">' + render(pd.text || '') + '<p class="tiny">' + pd.wc + ' words · ' + pd.marks + ' structures marked</p></div>' +
      '<div class="card wr-checklist" id="wr-review"><p class="kicker">Four lines</p>' +
      '<label class="wr-q">1 · Are the quota structures there?' + (quota.length ? '<span class="tiny">' + esc(quota.join(' · ')) + '</span>' : '') + '<select id="rv1"><option value="">—</option><option value="all">All of them</option><option value="some">Some</option><option value="none">None</option></select></label>' +
      '<label class="wr-q">2 · Are they marked (yellow)?<select id="rv2"><option value="">—</option><option value="yes">Yes, clearly</option><option value="partly">Partly</option><option value="no">No</option></select></label>' +
      '<label class="wr-q">3 · Are the required words used?' + (wordsL.length ? '<span class="tiny">' + esc(wordsL.join(', ')) + '</span>' : '') + '<select id="rv3"><option value="">—</option><option value="4">All four</option><option value="3">Three</option><option value="2">Two or fewer</option></select></label>' +
      '<label class="wr-q">4 · One sentence to improve, and how<textarea id="rv4" rows="3" placeholder="Copy the sentence, then say what to change (tense? agent? word?)"></textarea></label>' +
      '<button class="btn primary wide" id="wr-send-review">Send the review</button></div>';
  }
  function wireReview() {
    var b = $('#wr-send-review'); if (!b) return;
    b.addEventListener('click', function () {
      var c = { structures: $('#rv1').value, marked: $('#rv2').value, words: $('#rv3').value, sentence: $('#rv4').value.trim() };
      if (!c.structures || !c.marked || !c.words) return toast('Answer the three questions first.');
      if (c.sentence.length < 10) return toast('Write the sentence to improve, and what to change.');
      b.disabled = true;
      api('w.review', { sessionId: W.session.id, studentId: W.p.studentId, name: W.p.displayName, reviewOf: W.partnerDraft.studentId, checklist: c }).then(function (r) {
        if (!r || !r.ok) { b.disabled = false; return toast('Could not send — try again.'); }
        W.reviewed = true; paintRoom(); toast('Review sent.');
      }).catch(function () { b.disabled = false; toast('Could not reach the server.'); });
    });
  }

  /* ----------------------------------------------------------- publish */
  function paintPublish(pc) {
    var h = host();
    h.innerHTML = '<div class="sect-h"><div><h2>Publish · ' + esc(pc.name) + '</h2>' +
      '<p style="color:var(--ink-2);font-size:.92rem;margin-top:4px">Polish your own in-class draft — with AI if you like — and paste the finished piece here. The published piece must keep at least <b>80%</b> of the draft\'s words. The app shows the percentage before you publish; your teacher sees it too.</p></div><button class="btn sm" id="wr-back">Back</button></div>' +
      '<div class="wr-pub"><div class="card wr-read"><p class="kicker">Your in-class draft · ' + pc.wc + ' words</p>' + render(pc.text) + '</div>' +
      '<div class="card wr-pubbox"><p class="kicker">Published version</p><textarea id="wr-pubtext" rows="14" placeholder="Paste or type the polished piece">' + esc(pc.published ? pc.published.text : plain(pc.text)) + '</textarea>' +
      '<div class="wr-ret" id="wr-ret"></div><button class="btn primary wide" id="wr-pubgo">Publish</button></div></div>';
    $('#wr-back').addEventListener('click', paintHome);
    var ta = $('#wr-pubtext');
    function upd() {
      var r = retention(pc.text, ta.value), ok = r.words >= 80;
      $('#wr-ret').innerHTML = '<div class="wr-retbar"><span style="width:' + r.words + '%" class="' + (ok ? 'ok' : 'low') + '"></span></div>' +
        '<p class="tiny"><b>' + r.words + '%</b> of the draft\'s words kept (' + r.pairs + '% of its word pairs) · ' + wc(ta.value) + ' words' + (ok ? '' : ' · below the 80% rule: the piece will be marked as over-polished') + '</p>';
      $('#wr-pubgo').textContent = ok ? 'Publish' : 'Publish anyway (below 80%)';
    }
    ta.addEventListener('input', upd); upd();
    $('#wr-pubgo').addEventListener('click', function () {
      if (wc(ta.value) < 20) return toast('That is too short to publish.');
      $('#wr-pubgo').disabled = true;
      api('w.publish', { sessionId: pc.sessionId, studentId: W.p.studentId, text: ta.value }).then(function (r) {
        if (!r || !r.ok) { $('#wr-pubgo').disabled = false; return toast(r && r.error || 'Could not publish.'); }
        toast('Published: ' + r.retention.words + '% of the draft kept.'); paintHome();
      }).catch(function () { $('#wr-pubgo').disabled = false; toast('Could not reach the server.'); });
    });
  }

  global.WriteRoom = { paint: paint, setStudent: setStudent, api: api, Local: Local, analyse: analyse, retention: retention, replay: replay, plain: plain, wc: wc, marksIn: marksIn, wordsUsed: wordsUsed, render: render, DEFAULT_THRESHOLDS: DEFAULT_THRESHOLDS, leave: leave, state: W };
})(window);
