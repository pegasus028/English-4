# English 4 Mission Control

The self-study portal and in-class Writing Room for **EN32102 English 4 · M5.1 · Satriwithaya EP · Semester 2 (Oct 2026 – Feb 2027)**. Four units (Phase 1 ships Units 5–6), each with a Grammar Ladder and Words in Action (3 levels × 3 modules), a unit triage and a unit check in test format, exit tickets per lesson, the Monday spiral, podcast and video nodes, ranks and awards — plus the **Writing Room**, the monitored writing module for the Guided Writing Protocol.

It runs on the Mission Control engine (as Fine Tuning and Postcards & Plans do). `engine.js`, `api.js`, `theme.css` and `content-export.js` are the engine, unchanged. Everything else is this course.

Built 21 Oct 2026 (workstream A). Status: engine and Writing Room complete and tested in local mode; Unit 5 loads from a **sample** item bank until workstream B delivers `Unit 5/U5-item-bank.json`; Unit 6 is an empty placeholder until workstream D delivers.

---

## Putting it online

Static site. Push the folder to the `English-4` repo, Settings → Pages → Deploy from a branch → `main` / (root), and it is live at `https://pegasus028.github.io/English-4/`. No build step.

| file | who it is for |
|---|---|
| `index.html` | the student app |
| `teacher.html` | the Staff Room — class progress and the Writing Room console, behind the teacher PIN |
| `podcasts.html` | listening-only page, no sign-in |

Add the student app to the iPad home screen (Share → Add to Home Screen): the manifest makes it open full-screen without the Safari bar, which is what Guided Access wants.

## Connecting the class server

Until you do this the app works against the browser's own storage: fine for a rehearsal on one device, useless for a class.

1. New Google Sheet named **English4** → Extensions → Apps Script → replace `Code.gs` with the `Code.gs` in this folder → save.
2. Project Settings → Script properties: `TEACHER_PIN` (your PIN; 1234 until set) and `SECRET` (any long random string).
3. Deploy → New deployment → Web app → Execute as **Me**, access **Anyone** → copy the `/exec` URL.
4. Paste it into **both** `index.html` and `teacher.html` on the line `window.MC_API_URL = '';` and push.

**After every edit of Code.gs:** Deploy → Manage deployments → pencil → New version → Deploy. Saving alone does not update the live URL.

The tabs are created on first use: Students, Attempts, Sessions, Mocks (the engine) and Rooms, Drafts, Ops, Events, Reviews, Published, Prompts (the Writing Room). Sealed prompt matrices live only in the Prompts tab — never in this public repo.

## The content pipeline

Questions are never written into this repo by hand. Each unit has one tagged item bank (`Unit N/UN-item-bank.json`, the schema in `docs/content-contracts.md`) and one module plan (`tools/unit-plans.js`: stages, levels, modules, the tags that feed each module, and the theory a student reads). The builder fills the plan from the bank:

```
node tools/build-content.js "Unit 5/U5-item-bank.json" "Unit 6/U6-item-bank.json"
node tools/validate.js
```

This writes `data/topic-u5.js`, `data/topic-u6.js`, `data/tests.js` (Unit 5 Triage, Unit 5 Unit Check, …) and `data/extras.js` (exit tickets and spiral sets), copies the banks to `data/banks/`, and reports every module, check or paper that is short of items. Held-out test items never reach the app. Then bump the `?v=` on the script tags in `index.html` and `teacher.html` and push.

`samples/U5-item-bank.SAMPLE.json` is the placeholder bank the app currently runs on (203 items written to exercise every module, not to teach).

## Lesson explanations at B1 · B2 · C1, read aloud by Sonia

Every lesson in the Stages tab opens with an explanation the student can read at **B1, B2 or C1** (buttons above the text, or Settings → Reading level). Each level teaches everything that lesson's questions test; only the English changes (B1: short sentences, hard words explained in brackets; C1: the full, precise version). The texts live in `lesson-levels.js` (`{ lessonId: { B1, B2, C1 } }`, each `{ key, body[], examples[{s, g}] }`) and override the theory in `data/topic-*.js`, so rebuilding the item banks never loses them. Written and checked 29 Oct 2026: a blind reader answered all 198 questions correctly from each level's text alone.

**Listen to this lesson** reads the chosen level in Microsoft Sonia (British English): the key sentence, each paragraph and each example, one recorded clip per part, with the part being read highlighted. Tap again to pause, again to resume; the bar at the bottom has previous / next part and stop; **Slower** plays at 85%. Reading stops when the student changes level, goes back, starts the questions or changes view. A part with no recording falls back to the device's own voice.

### Read-aloud recordings

Clips are `audio/lessons/<key>.mp3`; `lesson-audio.js` lists which exist. The key is a hash of the spoken text (`tts-clean.js`), so editing a sentence in `lesson-levels.js` needs a new clip for that sentence only.

- **Automatic:** push the edit to `main`. The GitHub workflow *Record read-aloud audio* (`.github/workflows/record-audio.yml`) records the changed clips, deletes clips that are no longer used and commits them back within a few minutes. You can also run it by hand from the Actions tab.
- **By hand:** `pip install edge-tts`, then `python tools/make-lesson-audio.py --prune`, commit `audio/lessons/` and `lesson-audio.js`, and bump `?v=` on `lesson-audio.js` and `lesson-levels.js` in `index.html`.
- Check: `node tools/lesson-tts-list.js --summary`; full browser test: `NODE_PATH=$(npm root -g) node tools/lesson-audio-test.js` (opens all 36 lessons at all three levels, checks every part has a clip, then play, pause, resume, skip, stop, fallback and phone width).

## Adding podcasts, videos, slides

`media.js` has one entry per stage (`u5g`, `u5w`, `u6g`, `u6w`). Put the MP3 in `audio/` and its path in `podcast` (grammar episodes 5a/5b/5c go in `more`); paste a YouTube link into `video`; a PDF path into `slides`. An empty field means no button. Nothing else needs touching.

## The roster and the calendar

`roster.js`: nicknames, 5-digit student numbers (the login ID) and roster bands 1–4 from the Semester 1 final; `LESSON_DATES` (lesson number → date) puts today's exit ticket and spiral at the top of the route screen; `EXAM_AT` drives the countdown.

## Checking

```
node tools/validate.js                       # content structure, tags, key balance
NODE_PATH=$(npm root -g) node tools/smoke.js # every view, a module, an exit ticket, a paper, phone width
NODE_PATH=$(npm root -g) node tools/e2e-write.js   # full Writing Room rehearsal: teacher + 2 students
node tools/gs-harness.js                     # runs Code.gs in Node against a mock Sheet
```

Screenshots land in `tools/shots/`.

## Files

| file | what |
|---|---|
| `lesson-levels.js` | the B1 / B2 / C1 explanation of every lesson |
| `reader.js`, `tts-clean.js`, `lessons.css` | the read-aloud player, its speech-text cleaner, and the level / Listen / player-bar styles |
| `lesson-audio.js`, `audio/lessons/` | the recorded Sonia clips (generated) |
| `student.js` | the student console (route, stages, modules, papers, fault list, record, settings, exit tickets, spiral) |
| `write.js`, `write.css` | the Writing Room: join, sealed prompt, writing box with input controls, away counter, Mark-structure toolbar, peer checklist, receipt, publish with retention %; plus the local server used without Apps Script |
| `teacher.js` | Staff Room · Progress tab (from Fine Tuning) |
| `teacher-write.js`, `teacher-write.css` | Staff Room · Writing Room tab: sessions, prompt import, live grid, submissions with flags, replay, pairing, exports, thresholds, purge |
| `content.js` | ranks, awards, the error-tag dictionary (hints + teacher notes) for Units 5–6 |
| `tools/unit-plans.js` | the module plan and theory for Units 5–6 |
| `tools/build-content.js` | item bank → app content |
| `Code.gs` | the Apps Script server |
| `docs/teacher-guide.md` | running a Writing Room session; threat model; PDPA; flags |
| `docs/content-contracts.md` | what workstreams B/D (item banks) and G (prompt matrices) must deliver |
| `prompts/U5-W1.sample.json` | a sample prompt matrix in the shape the console imports |
