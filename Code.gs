/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — Code.gs  (Google Apps Script class server)
   ---------------------------------------------------------------------------
   SET-UP (once)
   1. Make a new Google Sheet called "English4".
   2. Extensions → Apps Script. Delete the default code, paste this whole
      file, save.
   3. Project Settings → Script properties → add TEACHER_PIN (your PIN) and
      SECRET (any long random string). Until you do, the PIN is 1234.
   4. Deploy → New deployment → Web app → Execute as: Me · Who has access:
      Anyone → Deploy. Copy the /exec URL.
   5. Paste that URL into index.html and teacher.html on the line
        window.MC_API_URL = '';
      push, and the app is live against this sheet.
   The sheets (tabs) are created on first use: Students, Attempts, Sessions,
   Mocks, Rooms, Drafts, Ops, Events, Reviews, Published, Prompts.

   AFTER EVERY EDIT OF THIS FILE: Deploy → Manage deployments → pencil →
   New version → Deploy. Saving alone does not change the live /exec URL.

   PRIVACY (PDPA). Writing-room keystroke logs (Ops) and page events
   (Events) are recorded only inside a session and only for the writing
   box. Run purgeSemester() from the editor at the end of the semester: it
   clears Ops and Events and keeps drafts, receipts and flag summaries.
   =========================================================================== */

var PROPS = PropertiesService.getScriptProperties();
function pin_() { return PROPS.getProperty('TEACHER_PIN') || '1234'; }
function secret_() { var s = PROPS.getProperty('SECRET'); if (!s) { s = Utilities.getUuid() + Utilities.getUuid(); PROPS.setProperty('SECRET', s); } return s; }

/* ------------------------------------------------------------ sheets */
var HEAD = {
  Students: ['id', 'name', 'pw', 'created', 'token', 'progress', 'updated'],
  Attempts: ['ts', 'studentId', 'itemId', 'topic', 'level', 'type', 'tag', 'cefr', 'correct', 'ms', 'hinted', 'fast', 'mode', 'given', 'expected'],
  Sessions: ['sessionId', 'studentId', 'loginTs', 'logoutTs', 'durationSec', 'items', 'correct'],
  Mocks: ['ts', 'studentId', 'json'],
  Rooms: ['id', 'code', 'name', 'unit', 'writeId', 'minutes', 'reviewMinutes', 'status', 'createdAt', 'startedAt', 'endsAt', 'reviewEndsAt', 'endedAt', 'broadcast', 'pairs', 'joined'],
  Drafts: ['key', 'sessionId', 'studentId', 'name', 'status', 'text', 'wc', 'marks', 'wordsUsed', 'submittedAt', 'auto', 'hash', 'live', 'lastSeen', 'seq', 'awayMs', 'exits', 'pastes', 'bulk', 'split', 'flags'],
  Ops: ['key', 'seq', 'ts', 'json'],
  Events: ['key', 'seq', 'ts', 'json'],
  Reviews: ['key', 'sessionId', 'reviewOf', 'reviewer', 'reviewerName', 'checklist', 'at'],
  Published: ['key', 'sessionId', 'studentId', 'text', 'wc', 'retention', 'at'],
  Prompts: ['writeId', 'name', 'json', 'updated']
};
function ss_() { return SpreadsheetApp.getActiveSpreadsheet(); }
function sheet_(name) {
  var ss = ss_(), sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(HEAD[name]); sh.setFrozenRows(1); }
  return sh;
}
function rows_(name) {
  var sh = sheet_(name), last = sh.getLastRow();
  if (last < 2) return [];
  var vals = sh.getRange(2, 1, last - 1, HEAD[name].length).getValues(), head = HEAD[name];
  return vals.map(function (r, i) { var o = { _row: i + 2 }; head.forEach(function (h, j) { o[h] = r[j]; }); return o; });
}
function writeRow_(name, obj, row) {
  var sh = sheet_(name), head = HEAD[name];
  var vals = head.map(function (h) { var v = obj[h]; return v == null ? '' : (typeof v === 'object' ? JSON.stringify(v) : v); });
  if (row) sh.getRange(row, 1, 1, head.length).setValues([vals]); else sh.appendRow(vals);
}
function findRow_(name, col, val) {
  var all = rows_(name);
  for (var i = 0; i < all.length; i++) if (String(all[i][col]) === String(val)) return all[i];
  return null;
}
function J(s, d) { try { return s ? JSON.parse(s) : d; } catch (e) { return d; } }
function hash_(s) { return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s) + '|' + secret_())); }
function studentToken_(id) { return 's.' + id + '.' + hash_('student|' + id).slice(0, 24).replace(/[^A-Za-z0-9]/g, 'x'); }
function teacherToken_() { return 't.' + hash_('teacher|' + pin_()).slice(0, 32).replace(/[^A-Za-z0-9]/g, 'x'); }
function isTeacher_(p) { return p && p.token === teacherToken_(); }
function isStudent_(p, id) { return p && id && p.token === studentToken_(id); }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function now_() { return new Date().toISOString(); }

/* ------------------------------------------------------------ entry */
function doGet() { return out_({ ok: true, app: 'English 4 Mission Control', sheet: ss_().getName() }); }
function doPost(e) {
  var body; try { body = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'Bad request' }); }
  var action = body.action, p = body.payload || {};
  var lock = LockService.getScriptLock();
  try { lock.waitLock(20000); } catch (err) { return out_({ ok: false, error: 'Busy, try again' }); }
  try {
    var fn = ACTIONS[action];
    if (!fn) return out_({ ok: false, error: 'Unknown action ' + action });
    return out_(fn(p));
  } catch (err) {
    return out_({ ok: false, error: String(err && err.message || err) });
  } finally { lock.releaseLock(); }
}

/* ============================================= Mission Control engine */
var ACTIONS = {
  ping: function () { return { ok: true, sheet: ss_().getName(), students: Math.max(0, sheet_('Students').getLastRow() - 1) }; },

  register: function (p) {
    var id = String(p.id || '').toLowerCase().trim();
    if (!/^[a-z0-9._-]{3,24}$/.test(id)) return { ok: false, error: 'Bad ID' };
    if (findRow_('Students', 'id', id)) return { ok: false, error: 'That student ID is already taken. Try logging in instead.' };
    var tok = studentToken_(id);
    var prog = blank_(id, p.name || id);
    writeRow_('Students', { id: id, name: p.name || id, pw: hash_(p.pw), created: now_(), token: tok, progress: prog, updated: now_() });
    return { ok: true, progress: prog, token: tok };
  },
  login: function (p) {
    var id = String(p.id || '').toLowerCase().trim();
    var s = findRow_('Students', 'id', id);
    if (!s) return { ok: false, error: 'No account with that ID. Create one first.' };
    if (s.pw !== hash_(p.pw)) return { ok: false, error: 'Wrong password.' };
    return { ok: true, progress: J(s.progress, blank_(id, s.name)), token: studentToken_(id) };
  },
  save: function (p) {
    var prog = p.progress || {}, id = prog.studentId;
    if (!isStudent_(p, id) && !isTeacher_(p)) return { ok: false, error: 'Not signed in' };
    var s = findRow_('Students', 'id', id);
    if (!s) { writeRow_('Students', { id: id, name: prog.displayName, pw: hash_('offline'), created: now_(), token: studentToken_(id), progress: prog, updated: now_() }); }
    else writeRow_('Students', { id: id, name: prog.displayName || s.name, pw: s.pw, created: s.created, token: s.token, progress: prog, updated: now_() }, s._row);
    var att = [], mocks = [];
    (p.attempts || []).forEach(function (a) { if (!a) return; if (a.kind === 'mock') mocks.push([now_(), a.studentId || id, JSON.stringify(a)]); else att.push(HEAD.Attempts.map(function (h) { return a[h] == null ? '' : a[h]; })); });
    if (att.length) { var sh = sheet_('Attempts'); sh.getRange(sh.getLastRow() + 1, 1, att.length, HEAD.Attempts.length).setValues(att); }
    if (mocks.length) { var sm = sheet_('Mocks'); sm.getRange(sm.getLastRow() + 1, 1, mocks.length, 3).setValues(mocks); }
    return { ok: true };
  },
  session: function (p) {
    var r = p.row || {};
    if (p.kind === 'start') writeRow_('Sessions', r);
    else { var ex = findRow_('Sessions', 'sessionId', r.sessionId); if (ex) { ex.logoutTs = r.logoutTs; ex.durationSec = r.durationSec; ex.items = r.items; ex.correct = r.correct; writeRow_('Sessions', ex, ex._row); } }
    return { ok: true };
  },
  teacherLogin: function (p) {
    if (String(p.pin) !== pin_()) return { ok: false, error: 'Wrong teacher PIN.' };
    return { ok: true, token: teacherToken_() };
  },
  roster: function () {
    return { ok: true, students: rows_('Students').map(function (s) { return { id: s.id, name: s.name, created: s.created, progress: J(s.progress, null) }; }) };
  },
  /* detail and assign are open, as in Mission Control: api.js sends the
     student token loaded at page start, so the teacher console cannot
     present its teacher token on these two calls. They expose progress
     only — never passwords, prompts or drafts. */
  detail: function (p) {
    var s = findRow_('Students', 'id', p.id); if (!s) return { ok: false, error: 'Not found' };
    return { ok: true, student: { id: s.id, name: s.name, created: s.created }, progress: J(s.progress, null),
      attempts: rows_('Attempts').filter(function (a) { return String(a.studentId) === String(p.id); }).map(function (a) { delete a._row; return a; }),
      sessions: rows_('Sessions').filter(function (x) { return String(x.studentId) === String(p.id); }),
      mocks: rows_('Mocks').filter(function (x) { return String(x.studentId) === String(p.id); }).map(function (x) { return J(x.json, {}); }) };
  },
  assign: function (p) {
    var s = findRow_('Students', 'id', p.id); if (!s) return { ok: false, error: 'Not found' };
    var prog = J(s.progress, blank_(s.id, s.name)); prog.assignment = p.paper;
    s.progress = prog; writeRow_('Students', s, s._row);
    return { ok: true };
  },

  /* ===================================================== Writing Room */
  'w.sessions': function (p) {
    if (!isTeacher_(p)) return { ok: false, error: 'Teacher only' };
    return { ok: true, rooms: rows_('Rooms').map(room_).sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; }) };
  },
  'w.create': function (p) {
    if (!isTeacher_(p)) return { ok: false, error: 'Teacher only' };
    var codes = rows_('Rooms').filter(function (r) { return r.status !== 'ended'; }).map(function (r) { return String(r.code); }), code;
    do { code = String(Math.floor(1000 + Math.random() * 9000)); } while (codes.indexOf(code) >= 0);
    var room = { id: 'W' + Utilities.getUuid().slice(0, 8), code: code, name: p.name || 'Writing session', unit: p.unit || 5, writeId: p.writeId || '',
      minutes: p.minutes || 15, reviewMinutes: p.reviewMinutes || 5, status: 'lobby', createdAt: now_(), startedAt: '', endsAt: '', reviewEndsAt: '', endedAt: '', broadcast: '', pairs: {}, joined: {} };
    writeRow_('Rooms', room); return { ok: true, room: room };
  },
  'w.control': function (p) {
    if (!isTeacher_(p)) return { ok: false, error: 'Teacher only' };
    var raw = findRow_('Rooms', 'id', p.sessionId); if (!raw) return { ok: false, error: 'No such session' };
    var rm = room_(raw), m = rm.minutes || 15;
    switch (p.op) {
      case 'start': rm.status = 'live'; rm.startedAt = now_(); rm.endsAt = new Date(Date.now() + m * 60000).toISOString(); break;
      case 'extend': rm.endsAt = new Date(new Date(rm.endsAt || Date.now()).getTime() + (p.minutes || 2) * 60000).toISOString(); break;
      case 'review': rm.status = 'review'; rm.reviewEndsAt = new Date(Date.now() + (rm.reviewMinutes || 5) * 60000).toISOString(); if (p.pairs) rm.pairs = p.pairs; break;
      case 'end': rm.status = 'ended'; rm.endedAt = now_(); break;
      case 'reopen': rm.status = 'live'; rm.endsAt = new Date(Date.now() + (p.minutes || 5) * 60000).toISOString(); break;
      case 'broadcast': rm.broadcast = p.message || ''; break;
      case 'pairs': rm.pairs = p.pairs || {}; break;
      case 'delete': sheet_('Rooms').deleteRow(raw._row); return { ok: true };
    }
    rm._row = raw._row; writeRow_('Rooms', rm, raw._row); delete rm._row;
    return { ok: true, room: rm };
  },
  'w.prompts': function (p) {
    if (!isTeacher_(p)) return { ok: false, error: 'Teacher only' };
    var ex = findRow_('Prompts', 'writeId', p.writeId);
    var row = { writeId: p.writeId, name: (p.matrix && p.matrix.name) || '', json: p.matrix, updated: now_() };
    writeRow_('Prompts', row, ex ? ex._row : null);
    return { ok: true, count: ((p.matrix && p.matrix.prompts) || []).length };
  },
  'w.promptsList': function (p) {
    if (!isTeacher_(p)) return { ok: false, error: 'Teacher only' };
    return { ok: true, writeIds: rows_('Prompts').map(function (r) { var mx = J(r.json, {}); return { writeId: r.writeId, name: r.name, count: (mx.prompts || []).length }; }) };
  },
  'w.join': function (p) {
    if (!isStudent_(p, p.studentId)) return { ok: false, error: 'Not signed in' };
    var raw = null; rows_('Rooms').forEach(function (r) { if (String(r.code) === String(p.code).trim() && r.status !== 'ended') raw = r; });
    if (!raw) return { ok: false, error: 'No open session has that code. Check the board and try again.' };
    var rm = room_(raw); rm.joined[p.studentId] = { name: p.name, at: now_(), band: p.band || null };
    writeRow_('Rooms', rm, raw._row);
    return state_(rm, p.studentId);
  },
  'w.beat': function (p) {
    if (!isStudent_(p, p.studentId)) return { ok: false, error: 'Not signed in' };
    var raw = findRow_('Rooms', 'id', p.sessionId); if (!raw) return { ok: false, error: 'Session gone' };
    var rm = room_(raw), key = rm.id + '|' + p.studentId;
    var dr = findRow_('Drafts', 'key', key) || { key: key, sessionId: rm.id, studentId: p.studentId, name: p.name, status: 'writing', text: '', wc: 0, awayMs: 0, exits: 0, pastes: 0, bulk: 0, split: 0 };
    ingest_(dr, key, p);
    if (typeof p.wc === 'number') dr.wc = p.wc;
    if (p.liveStatus) dr.live = p.liveStatus;
    if (p.text != null && dr.status !== 'submitted' && rm.status === 'live') dr.text = p.text;
    dr.lastSeen = now_(); dr.seq = p.seq || dr.seq;
    writeRow_('Drafts', dr, dr._row);
    return state_(rm, p.studentId);
  },
  'w.submit': function (p) {
    if (!isStudent_(p, p.studentId)) return { ok: false, error: 'Not signed in' };
    var raw = findRow_('Rooms', 'id', p.sessionId); if (!raw) return { ok: false, error: 'Session gone' };
    var rm = room_(raw), key = rm.id + '|' + p.studentId;
    var dr = findRow_('Drafts', 'key', key) || { key: key, sessionId: rm.id, studentId: p.studentId, name: p.name, awayMs: 0, exits: 0, pastes: 0, bulk: 0, split: 0 };
    ingest_(dr, key, p);
    if (dr.status === 'submitted') return { ok: true, receipt: receipt_(dr) };
    dr.text = p.text || ''; dr.wc = wc_(dr.text); dr.status = 'submitted'; dr.submittedAt = now_(); dr.auto = !!p.auto;
    dr.hash = hash32_(plain_(dr.text)); dr.marks = marks_(dr.text); dr.wordsUsed = p.wordsUsed || [];
    /* integrity: rebuild the text from the whole op log */
    var ops = opsFor_(key), rebuilt = replay_(ops);
    var mismatch = plain_(rebuilt) !== plain_(dr.text);
    dr.flags = flags_(dr, mismatch);
    writeRow_('Drafts', dr, dr._row);
    return { ok: true, receipt: receipt_(dr) };
  },
  'w.review': function (p) {
    if (!isStudent_(p, p.studentId)) return { ok: false, error: 'Not signed in' };
    var key = p.sessionId + '|' + p.reviewOf, ex = findRow_('Reviews', 'key', key);
    writeRow_('Reviews', { key: key, sessionId: p.sessionId, reviewOf: p.reviewOf, reviewer: p.studentId, reviewerName: p.name, checklist: p.checklist, at: now_() }, ex ? ex._row : null);
    return { ok: true };
  },
  'w.publish': function (p) {
    if (!isStudent_(p, p.studentId)) return { ok: false, error: 'Not signed in' };
    var key = p.sessionId + '|' + p.studentId, dr = findRow_('Drafts', 'key', key);
    if (!dr || dr.status !== 'submitted') return { ok: false, error: 'No submitted draft to publish from.' };
    var ret = retention_(dr.text, p.text), ex = findRow_('Published', 'key', key);
    writeRow_('Published', { key: key, sessionId: p.sessionId, studentId: p.studentId, text: p.text, wc: wc_(p.text), retention: ret, at: now_() }, ex ? ex._row : null);
    return { ok: true, retention: ret };
  },
  'w.mine': function (p) {
    if (!isStudent_(p, p.studentId)) return { ok: false, error: 'Not signed in' };
    var rooms = {}; rows_('Rooms').forEach(function (r) { rooms[r.id] = r; });
    var pub = {}; rows_('Published').forEach(function (r) { pub[r.key] = r; });
    var rev = {}; rows_('Reviews').forEach(function (r) { rev[r.key] = 1; });
    var mine = rows_('Drafts').filter(function (d) { return String(d.studentId) === String(p.studentId); }).map(function (d) {
      var rm = rooms[d.sessionId] || {}, pb = pub[d.key];
      return { sessionId: d.sessionId, name: rm.name || d.sessionId, writeId: rm.writeId || '', status: d.status, submittedAt: d.submittedAt, wc: d.wc, text: d.text,
        summary: summary_(d), roomStatus: rm.status, published: pb ? { text: pb.text, retention: J(pb.retention, {}), at: pb.at } : null, reviewed: !!rev[d.key] };
    });
    mine.sort(function (a, b) { return a.submittedAt < b.submittedAt ? 1 : -1; });
    return { ok: true, pieces: mine };
  },
  'w.live': function (p) {
    if (!isTeacher_(p)) return { ok: false, error: 'Teacher only' };
    var raw = findRow_('Rooms', 'id', p.sessionId); if (!raw) return { ok: false, error: 'No such session' };
    var rm = room_(raw);
    var drafts = {}; rows_('Drafts').forEach(function (d) { if (d.sessionId === rm.id) drafts[d.studentId] = d; });
    var pub = {}; rows_('Published').forEach(function (r) { if (r.sessionId === rm.id) pub[r.studentId] = r; });
    var rev = {}; rows_('Reviews').forEach(function (r) { if (r.sessionId === rm.id) rev[r.reviewOf] = 1; });
    var cards = Object.keys(rm.joined).map(function (sid) {
      var d = drafts[sid] || {}, pb = pub[sid];
      return { studentId: sid, name: rm.joined[sid].name, joinedAt: rm.joined[sid].at, lastSeen: d.lastSeen || '', live: d.live || 'joined', wc: d.wc || 0,
        status: d.status || 'writing', away: d.awayMs || 0, exits: d.exits || 0, pastes: d.pastes || 0, bulk: d.bulk || 0, flags: J(d.flags, []) .length ? J(d.flags, []) : liveFlags_(d),
        submittedAt: d.submittedAt || '', reviewed: !!rev[sid], published: !!pb, retention: pb ? J(pb.retention, null) : null };
    });
    return { ok: true, room: rm, cards: cards };
  },
  'w.detail': function (p) {
    if (!isTeacher_(p)) return { ok: false, error: 'Teacher only' };
    var key = p.sessionId + '|' + p.studentId, raw = findRow_('Rooms', 'id', p.sessionId);
    var d = findRow_('Drafts', 'key', key), rv = findRow_('Reviews', 'key', key), pb = findRow_('Published', 'key', key);
    if (d) { delete d._row; d.wordsUsed = J(d.wordsUsed, []); d.flags = J(d.flags, []); }
    return { ok: true, draft: d || null, ops: opsFor_(key), events: eventsFor_(key),
      review: rv ? { reviewer: rv.reviewer, reviewerName: rv.reviewerName, checklist: J(rv.checklist, {}), at: rv.at } : null,
      published: pb ? { text: pb.text, wc: pb.wc, retention: J(pb.retention, {}), at: pb.at } : null,
      prompt: raw ? promptFor_(room_(raw), p.studentId) : null };
  },
  'w.purge': function (p) {
    if (!isTeacher_(p)) return { ok: false, error: 'Teacher only' };
    ['Ops', 'Events'].forEach(function (name) {
      var sh = sheet_(name), all = rows_(name);
      for (var i = all.length - 1; i >= 0; i--) if (String(all[i].key).indexOf(p.sessionId + '|') === 0) sh.deleteRow(all[i]._row);
    });
    return { ok: true };
  }
};

/* ------------------------------------------------------- room helpers */
function room_(r) {
  return { id: r.id, code: String(r.code), name: r.name, unit: r.unit, writeId: r.writeId, minutes: Number(r.minutes) || 15, reviewMinutes: Number(r.reviewMinutes) || 5, status: r.status,
    createdAt: r.createdAt, startedAt: r.startedAt, endsAt: r.endsAt, reviewEndsAt: r.reviewEndsAt, endedAt: r.endedAt, broadcast: r.broadcast, pairs: J(r.pairs, {}), joined: J(r.joined, {}) };
}
function promptFor_(room, studentId) {
  if (!room.writeId) return null;
  var pr = findRow_('Prompts', 'writeId', room.writeId); if (!pr) return null;
  var mx = J(pr.json, {});
  var hit = (mx.prompts || []).filter(function (x) { return String(x.studentId) === String(studentId); })[0] || mx.fallback || null;
  if (!hit) return null;
  var out = {}; Object.keys(hit).forEach(function (k) { out[k] = hit[k]; });
  out.writeId = room.writeId; out.title = mx.name || room.writeId;
  if (!out.target && mx.wordTargets) out.target = mx.wordTargets[String(out.band || (room.joined[studentId] || {}).band || bandOf_(studentId) || 2)] || mx.wordTargets['2'];
  return out;
}
/* Bands come from the roster the teacher keeps in the Prompts matrix
   (band per prompt) or, failing that, a BANDS script property
   "51288:1,50990:1,…". */
function bandOf_(id) { var b = PROPS.getProperty('BANDS') || ''; var m = new RegExp('(^|,)' + id + ':(\\d)').exec(b); return m ? Number(m[2]) : null; }
function state_(rm, studentId) {
  var key = rm.id + '|' + studentId, dr = findRow_('Drafts', 'key', key);
  var partner = rm.pairs[studentId] || null, pd = null;
  if (rm.status === 'review' && partner) { var pr = findRow_('Drafts', 'key', rm.id + '|' + partner); if (pr) pd = { studentId: partner, name: pr.name, text: pr.text, wc: pr.wc, marks: marks_(pr.text || '') }; }
  var open = rm.status === 'live' || rm.status === 'review' || rm.status === 'ended';
  return { ok: true, session: { id: rm.id, code: rm.code, name: rm.name, unit: rm.unit, writeId: rm.writeId, status: rm.status, startedAt: rm.startedAt, endsAt: rm.endsAt, reviewEndsAt: rm.reviewEndsAt, broadcast: rm.broadcast, minutes: rm.minutes },
    prompt: open ? promptFor_(rm, studentId) : null,
    draft: dr ? { status: dr.status, text: dr.text, submittedAt: dr.submittedAt, summary: summary_(dr), wc: dr.wc, marks: dr.marks, wordsUsed: J(dr.wordsUsed, []), auto: dr.auto } : null,
    partner: partner, partnerDraft: pd, partnerPrompt: partner ? promptFor_(rm, partner) : null,
    reviewed: !!findRow_('Reviews', 'key', key) };
}
function ingest_(dr, key, p) {
  if (p.events && p.events.length) {
    writeRow_('Events', { key: key, seq: p.seq || 0, ts: now_(), json: p.events });
    p.events.forEach(function (e) {
      if (e.type === 'away' || e.type === 'blur' || e.type === 'possibleSleep') { dr.exits = (Number(dr.exits) || 0) + 1; dr.awayMs = (Number(dr.awayMs) || 0) + (e.durationMs || 0); }
      if (e.type === 'paste' || e.type === 'drop') dr.pastes = (Number(dr.pastes) || 0) + 1;
      if (e.type === 'bulk') dr.bulk = (Number(dr.bulk) || 0) + 1;
      if (e.type === 'splitView') dr.split = (Number(dr.split) || 0) + 1;
    });
  }
  if (p.ops && p.ops.length) {
    /* keep each cell under the 50,000-character limit */
    var chunk = [], size = 0;
    p.ops.forEach(function (o) { var s = JSON.stringify(o); if (size + s.length > 45000) { writeRow_('Ops', { key: key, seq: p.seq || 0, ts: now_(), json: chunk }); chunk = []; size = 0; } chunk.push(o); size += s.length + 1; });
    if (chunk.length) writeRow_('Ops', { key: key, seq: p.seq || 0, ts: now_(), json: chunk });
  }
}
function opsFor_(key) { var out = []; rows_('Ops').forEach(function (r) { if (r.key === key) out = out.concat(J(r.json, [])); }); return out; }
function eventsFor_(key) { var out = []; rows_('Events').forEach(function (r) { if (r.key === key) out = out.concat(J(r.json, [])); }); return out; }
function summary_(d) { return { away: Number(d.awayMs) || 0, exits: Number(d.exits) || 0, pastes: Number(d.pastes) || 0, bulk: Number(d.bulk) || 0, split: Number(d.split) || 0, mismatch: J(d.flags, []).some(function (f) { return f.k === 'mismatch'; }), flags: J(d.flags, []) }; }
function receipt_(d) { return { status: d.status, text: d.text, wc: d.wc, marks: d.marks, wordsUsed: J(d.wordsUsed, []), submittedAt: d.submittedAt, auto: d.auto, summary: summary_(d) }; }
function liveFlags_(d) { return flags_(d, false); }
function flags_(d, mismatch) {
  var f = [], away = Number(d.awayMs) || 0, exits = Number(d.exits) || 0, pastes = Number(d.pastes) || 0, bulk = Number(d.bulk) || 0, split = Number(d.split) || 0;
  if (away / 1000 > 30) f.push({ k: 'away', label: 'Away ' + mmss_(away / 1000) + ' in ' + exits + (exits === 1 ? ' exit' : ' exits') });
  else if (exits > 2) f.push({ k: 'exits', label: exits + ' exits' });
  if (pastes) f.push({ k: 'paste', label: pastes + ' blocked paste' + (pastes === 1 ? '' : 's') });
  if (split) f.push({ k: 'split', label: 'Split View ' + split + '×' });
  if (bulk) f.push({ k: 'bulk', label: bulk + ' bulk insert' + (bulk === 1 ? '' : 's') });
  if (mismatch) f.push({ k: 'mismatch', label: 'Log and text do not match' });
  return f;
}

/* ------------------------------------------------------- text helpers */
function plain_(t) { return String(t || '').replace(/[⟦⟧]/g, ''); }
function wc_(t) { return plain_(t).split(/\s+/).filter(function (w) { return /[A-Za-z0-9฀-๿]/.test(w); }).length; }
function marks_(t) { var m = String(t || '').match(/⟦[^⟦⟧]*⟧/g); return m ? m.length : 0; }
function tokens_(t) { return plain_(t).toLowerCase().replace(/[^a-z0-9'\s]/g, ' ').split(/\s+/).filter(Boolean); }
function retention_(draft, pub) {
  var a = tokens_(draft), b = tokens_(pub); if (!a.length) return { words: 0, pairs: 0 };
  var c = {}; b.forEach(function (w) { c[w] = (c[w] || 0) + 1; });
  var kept = 0; a.forEach(function (w) { if (c[w] > 0) { kept++; c[w]--; } });
  var pa = {}, pk = 0, pn = 0;
  for (var i = 0; i + 1 < b.length; i++) pa[b[i] + ' ' + b[i + 1]] = (pa[b[i] + ' ' + b[i + 1]] || 0) + 1;
  for (var j = 0; j + 1 < a.length; j++) { pn++; var k = a[j] + ' ' + a[j + 1]; if (pa[k] > 0) { pk++; pa[k]--; } }
  return { words: Math.round(100 * kept / a.length), pairs: pn ? Math.round(100 * pk / pn) : 0 };
}
function replay_(ops) { var t = ''; ops.forEach(function (o) { t = t.slice(0, o[1]) + (o[3] || '') + t.slice(o[1] + o[2]); }); return t; }
function hash32_(s) { var h = 5381; s = String(s); for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return 'h' + h.toString(36); }
function mmss_(sec) { sec = Math.max(0, Math.round(sec)); var m = Math.floor(sec / 60), s = sec % 60; return m + ':' + (s < 10 ? '0' : '') + s; }
function blank_(id, name) {
  return { studentId: id, displayName: name || id, xp: 0, streak: 0, longestStreak: 0, lastActiveDate: null, sessions: 0, runBest: 0, run: 0, reclaimed: 0, speedBonuses: 0,
    subs: {}, checks: {}, mocks: {}, plans: {}, badges: [], review: {}, stats: { seen: 0, correct: 0, byTag: {} }, assignment: null, created: now_() };
}

/* ------------------------------------------------------ maintenance
   Run these from the Apps Script editor (Run ▸ function). Nothing here is
   reachable over the network. */
function purgeSemester() {
  ['Ops', 'Events'].forEach(function (n) { var sh = sheet_(n); if (sh.getLastRow() > 1) sh.deleteRows(2, sh.getLastRow() - 1); });
}
var TO_PURGE = [];   /* student ids to remove entirely, e.g. ['test1', 'test2'] */
function purgeListed() {
  TO_PURGE.forEach(function (id) {
    ['Students', 'Attempts', 'Sessions', 'Mocks'].forEach(function (n) {
      var sh = sheet_(n), all = rows_(n), col = n === 'Students' ? 'id' : 'studentId';
      for (var i = all.length - 1; i >= 0; i--) if (String(all[i][col]) === String(id)) sh.deleteRow(all[i]._row);
    });
  });
}
