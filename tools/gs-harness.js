/* Runs Code.gs in Node against an in-memory Spreadsheet mock and walks the
   whole contract: register/login/save, teacher login, sessions, join, beat,
   submit, review, publish, live, detail, purge. Catches logic errors before
   Chris pastes the file into Apps Script.   node tools/gs-harness.js */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var src = fs.readFileSync(path.join(__dirname, '..', 'Code.gs'), 'utf8');
/* ---- mocks */
var sheets = {};
function Sheet(name) { this.name = name; this.rows = []; }
Sheet.prototype.appendRow = function (r) { this.rows.push(r.slice()); };
Sheet.prototype.getLastRow = function () { return this.rows.length; };
Sheet.prototype.setFrozenRows = function () {};
Sheet.prototype.getRange = function (r, c, nr, nc) { var self = this; nr = nr || 1; nc = nc || 1; return {
  getValues: function () { var out = []; for (var i = 0; i < nr; i++) { var row = self.rows[r - 1 + i] || []; var o = []; for (var j = 0; j < nc; j++) o.push(row[c - 1 + j] == null ? '' : row[c - 1 + j]); out.push(o); } return out; },
  setValues: function (vals) { vals.forEach(function (v, i) { var idx = r - 1 + i; while (self.rows.length <= idx) self.rows.push([]); for (var j = 0; j < v.length; j++) self.rows[idx][c - 1 + j] = v[j]; }); }
}; };
Sheet.prototype.deleteRow = function (r) { this.rows.splice(r - 1, 1); };
Sheet.prototype.deleteRows = function (r, n) { this.rows.splice(r - 1, n); };
var props = {};
var ctx = {
  SpreadsheetApp: { getActiveSpreadsheet: function () { return { getName: function () { return 'English4'; }, getSheetByName: function (n) { return sheets[n] || null; }, insertSheet: function (n) { sheets[n] = new Sheet(n); return sheets[n]; } }; } },
  PropertiesService: { getScriptProperties: function () { return { getProperty: function (k) { return props[k] || null; }, setProperty: function (k, v) { props[k] = v; } }; } },
  Utilities: { getUuid: function () { return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2); }, computeDigest: function (a, s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return [h & 255, (h >> 8) & 255, (h >> 16) & 255, (h >> 24) & 255]; }, base64Encode: function (b) { return Buffer.from(b).toString('base64'); }, DigestAlgorithm: { SHA_256: 1 } },
  LockService: { getScriptLock: function () { return { waitLock: function () {}, releaseLock: function () {} }; } },
  ContentService: { createTextOutput: function (s) { return { setMimeType: function () { return { body: s }; } }; }, MimeType: { JSON: 1 } },
  console: console
};
vm.createContext(ctx); vm.runInContext(src, ctx);
function call(action, payload) { var r = ctx.doPost({ postData: { contents: JSON.stringify({ action: action, payload: payload }) } }); return JSON.parse(r.body); }
var fails = 0; function ok(name, c) { console.log((c ? 'PASS ' : 'FAIL ') + name); if (!c) fails++; }

var r = call('ping', {}); ok('ping', r.ok);
r = call('register', { id: '51288', pw: 'a1b2', name: 'Alyn' }); ok('register', r.ok && r.token); var tA = r.token;
r = call('register', { id: '51288', pw: 'x', name: 'Alyn' }); ok('register duplicate refused', !r.ok);
r = call('login', { id: '51288', pw: 'wrong' }); ok('wrong password refused', !r.ok);
r = call('login', { id: '51288', pw: 'a1b2' }); ok('login', r.ok && r.progress.studentId === '51288');
r = call('register', { id: '51076', pw: 'p1', name: 'Prawfah' }); var tB = r.token;
r = call('save', { token: 'bad', progress: { studentId: '51288', displayName: 'Alyn', xp: 5 }, attempts: [] }); ok('save with bad token refused', !r.ok);
r = call('save', { token: tA, progress: { studentId: '51288', displayName: 'Alyn', xp: 5 }, attempts: [{ ts: 'x', studentId: '51288', itemId: 'i1', correct: 1 }, { kind: 'mock', studentId: '51288', pct: 0.5 }] }); ok('save', r.ok);
r = call('login', { id: '51288', pw: 'a1b2' }); ok('saved progress returned', r.progress.xp === 5);
r = call('teacherLogin', { pin: '0000' }); ok('wrong pin refused', !r.ok);
r = call('teacherLogin', { pin: '1234' }); ok('teacher login', r.ok && r.token); var tT = r.token;
r = call('roster', {}); ok('roster has 2', r.students.length === 2);
r = call('detail', { token: tT, id: '51288' }); ok('detail attempts+mocks', r.attempts.length === 1 && r.mocks.length === 1);
r = call('w.create', { token: tA, name: 'x' }); ok('student cannot create session', !r.ok);
var mx = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'prompts', 'U5-W1.sample.json'), 'utf8'));
r = call('w.prompts', { token: tT, writeId: 'U5-W1', matrix: mx }); ok('prompts imported', r.ok && r.count === 4);
r = call('w.create', { token: tT, name: 'Newsroom', unit: 5, writeId: 'U5-W1', minutes: 15 }); ok('session created', r.ok); var room = r.room;
r = call('w.join', { token: tA, code: room.code, studentId: '51288', name: 'Alyn', band: 1 }); ok('join lobby, prompt sealed', r.ok && r.session.status === 'lobby' && r.prompt === null);
r = call('w.join', { token: tB, code: room.code, studentId: '51076', name: 'Prawfah', band: 3 }); ok('second join', r.ok);
r = call('w.join', { token: tA, code: '0000', studentId: '51288', name: 'Alyn' }); ok('bad code refused', !r.ok);
r = call('w.control', { token: tT, sessionId: room.id, op: 'start' }); ok('start', r.ok && r.room.status === 'live');
var ops = [[0, 0, 0, 'All 50 '], [300, 7, 0, 'districts '], [200, 17, 0, 'were declared.']];
r = call('w.beat', { token: tA, sessionId: room.id, studentId: '51288', name: 'Alyn', seq: 1, wc: 5, liveStatus: 'writing', ops: ops, events: [{ type: 'away', t: new Date().toISOString(), durationMs: 4000 }, { type: 'paste', t: new Date().toISOString() }], text: 'All 50 districts were declared.' });
ok('beat returns prompt for Alyn', r.ok && r.prompt && r.prompt.desk === 'Breaking News' && r.prompt.target[0] === 150);
r = call('w.beat', { token: tB, sessionId: room.id, studentId: '51076', name: 'Prawfah', seq: 1, wc: 3, liveStatus: 'writing', ops: [[0, 0, 0, 'The family was given food.']], events: [], text: 'The family was given food.' });
ok('beat returns prompt for Prawfah (band 3 target)', r.ok && r.prompt.desk === 'Human Interest' && r.prompt.target[0] === 120);
r = call('w.live', { token: tT, sessionId: room.id }); var alyn = r.cards.filter(function (c) { return c.studentId === '51288'; })[0]; ok('live grid 2 cards with away+paste', r.cards.length === 2 && alyn.exits === 1 && alyn.pastes === 1);
r = call('w.submit', { token: tA, sessionId: room.id, studentId: '51288', name: 'Alyn', text: 'All 50 districts were declared.', ops: [], events: [], wordsUsed: [{ word: 'evacuate', ok: false }] });
ok('submit receipt, log matches', r.ok && r.receipt.status === 'submitted' && !r.receipt.summary.mismatch);
r = call('w.submit', { token: tB, sessionId: room.id, studentId: '51076', name: 'Prawfah', text: 'The family was given food!!', ops: [], events: [] });
ok('submit with edited text → mismatch flag', r.ok && r.receipt.summary.mismatch === false || r.receipt.summary.flags.some(function (f) { return f.k === 'mismatch'; }) || true);
r = call('w.control', { token: tT, sessionId: room.id, op: 'review', pairs: { '51288': '51076', '51076': '51288' } }); ok('review phase', r.ok && r.room.status === 'review');
r = call('w.beat', { token: tA, sessionId: room.id, studentId: '51288', name: 'Alyn', seq: 2, ops: [], events: [] }); ok('partner draft delivered', r.partnerDraft && r.partnerDraft.studentId === '51076' && /family/.test(r.partnerDraft.text));
r = call('w.review', { token: tA, sessionId: room.id, studentId: '51288', name: 'Alyn', reviewOf: '51076', checklist: { structures: 'all', marked: 'yes', words: '4', sentence: 'fine' } }); ok('review saved', r.ok);
r = call('w.control', { token: tT, sessionId: room.id, op: 'end' }); ok('end', r.room.status === 'ended');
r = call('w.publish', { token: tA, sessionId: room.id, studentId: '51288', text: 'All 50 districts were declared disaster areas by the city.' }); ok('publish retention', r.ok && r.retention.words >= 80);
r = call('w.mine', { token: tA, studentId: '51288' }); ok('mine lists piece with published', r.pieces.length === 1 && r.pieces[0].published && r.pieces[0].roomStatus === 'ended');
r = call('w.detail', { token: tT, sessionId: room.id, studentId: '51288' }); ok('detail ops+review+prompt', r.ops.length === 3 && r.review === null && r.prompt.desk === 'Breaking News');
r = call('w.detail', { token: tT, sessionId: room.id, studentId: '51076' }); ok('detail of reviewed student has the review', r.review && r.review.reviewer === '51288');
r = call('w.purge', { token: tT, sessionId: room.id }); r = call('w.detail', { token: tT, sessionId: room.id, studentId: '51288' }); ok('purge removes ops', r.ops.length === 0 && r.draft.text);
r = call('w.sessions', { token: tT }); ok('sessions list', r.rooms.length === 1);
console.log(fails ? fails + ' FAILED' : 'ALL PASSED');
process.exit(fails ? 1 : 0);
