/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — roster.js
   The class list behind the "5.1 Fast Access" tab on the sign-in screen,
   the lesson calendar, and the exam date.

   A student picks her nickname instead of typing an ID. Her ID is her
   5-digit student number (from M5-1-Class-Roster-15102026.xlsx). Two
   students are called Plearn; the dropdown shows the number beside each.

   band = roster band from the Semester 1 final (1 strongest … 4), used by
   the Writing Room to pick the word target and sentence frames, and by the
   teacher console for pairing. Nothing here is secret: nicknames and
   student numbers only. Edit this list when the class changes.
   =========================================================================== */

var ROSTER_CLASS = 'M.5.1';

/* The final examination week. The countdown on the route screen reads it. */
var EXAM_AT = '2027-02-15T08:00';

/* One row per student: { id: student number, name: nickname, band: 1–4 }. */
var ROSTER = [
  { id: '51288', name: 'Alyn',    band: 1 },
  { id: '50990', name: 'Plearn',  band: 1 },
  { id: '51092', name: 'Sand',    band: 1 },
  { id: '50828', name: 'Cinta',   band: 1 },
  { id: '50952', name: 'Niran',   band: 1 },
  { id: '51110', name: 'Haitai',  band: 1 },
  { id: '51223', name: 'Huisan',  band: 1 },
  { id: '53185', name: 'Tubtim',  band: 1 },
  { id: '53170', name: 'Nana',    band: 2 },
  { id: '50823', name: 'Prai',    band: 2 },
  { id: '51070', name: 'PunPun',  band: 2 },
  { id: '53168', name: 'Cho',     band: 2 },
  { id: '51249', name: 'Lily',    band: 2 },
  { id: '51076', name: 'Prawfah', band: 3 },
  { id: '53179', name: 'Mobile',  band: 3 },
  { id: '50934', name: 'Peach',   band: 3 },
  { id: '50830', name: 'Nammon',  band: 3 },
  { id: '51022', name: 'Proud',   band: 3 },
  { id: '50824', name: 'Pud',     band: 3 },
  { id: '53224', name: 'Amie',    band: 3 },
  { id: '53223', name: 'Jia',     band: 4 },
  { id: '53210', name: 'Plearn',  band: 4 },
  { id: '51058', name: 'Pine',    band: 4 },
  { id: '53214', name: 'Ob-oon',  band: 4 },
  { id: '53156', name: 'Grand',   band: 4 }
];

/* Lesson number → date (Bangkok). The route screen uses this to put today's
   exit ticket and Monday spiral at the top. Keep it in step with the lesson
   plan if a lesson moves. */
var LESSON_DATES = {
  1: '2026-10-29', 2: '2026-11-02', 3: '2026-11-05', 4: '2026-11-09', 5: '2026-11-12',
  6: '2026-11-16', 7: '2026-11-19', 8: '2026-11-23', 9: '2026-11-26',
  10: '2026-11-30', 11: '2026-12-03', 12: '2026-12-07', 13: '2026-12-14', 14: '2026-12-17',
  15: '2026-12-28', 16: '2027-01-04', 17: '2027-01-07', 18: '2027-01-11', 19: '2027-01-14',
  20: '2027-01-18', 21: '2027-01-21', 22: '2027-01-25', 23: '2027-01-28', 24: '2027-02-01',
  25: '2027-02-04', 26: '2027-02-08', 27: '2027-02-11'
};
