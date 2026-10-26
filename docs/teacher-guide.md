# Writing Room — teacher guide

The Writing Room is the app side of the **Guided Writing Protocol** (lesson-plan tab A00). It is one of three layers, and it is honest about being the weakest-looking one:

1. **Phones in the box at the door.** The app cannot see a phone.
2. **Guided Access on the iPad.** The student triple-clicks inside the app; leaving Guided Access is itself a visible act. Auto-Lock: Never.
3. **The Writing Room.** It does not lock anything. It detects, logs and shows — and the student sees the same numbers you see.

## What it catches

| Route to AI | Caught? | How |
|---|---|---|
| Switching to another app or tab | Yes | time away and exits, counted on screen and logged |
| Pasting text from anywhere | Yes | paste and drop are blocked and counted |
| Split View / Slide Over beside the page | Partly | window narrower than the screen is logged as Split View and shown as a banner; Slide Over can be invisible to a web page |
| Dictation, Scribble, Apple Intelligence Writing Tools | Partly | inserts over 25 characters in one go and text replacements are flagged as bulk inserts |
| Reading AI text on a **phone** and retyping it | **No** | only the phone box stops this; the replay may show suspiciously even typing, which is weak evidence |
| Memorising an essay at home | No | the sealed, per-student prompt |

## Running a session (25 minutes)

Before the lesson: Staff Room → Writing Room → **Import matrix** (the prompt JSON from the project pack) once per write; then **New session** (name, unit, the matrix, 15 min write, 5 min review). A four-digit code appears.

| min | you | they |
|---|---|---|
| 2 | write the code on the board; open the session; watch cards appear | phones boxed; app open from the home screen; log in; Writing Room → code → Join; Guided Access on |
| 1 | **Start — unseal prompts** | read her prompt: angle, grammar quota, four words, word target (Band 4 sees sentence frames) |
| 15 | watch the live grid; red card = away; a quiet word at 30 s; **+2 min** if needed; **Message the class** for a broadcast line | write; mark quota structures with ⟦ Mark structure ⟧; the away counter stays on screen |
| 5 | **Pair & review** — pairs Band 1 with Band 3/4 where possible; unsubmitted drafts are submitted as they stand | reviewer reads the partner's draft (marks in yellow) and completes the four lines |
| 2 | **End session**; export CSV / drafts if you want them now | receipt: words, structures marked, required words, time away, exits, pastes blocked |

Later, at home, the student opens the Writing Room home → **Publish the polished piece**. AI polishing is allowed; the published piece must keep **≥ 80 %** of the draft's words, and the app shows the percentage before she publishes. Below 80 % it still publishes, marked so you see it.

Marking per the protocol: grammar quota + vocab on the in-class draft (Export drafts gives you every draft with its prompt and quota); content + peer audit on the published piece.

## Flags — evidence, never a verdict

Each submission carries chips: away time and exits, blocked pastes, Split View, bulk inserts, a low revision ratio (deleted ÷ typed characters — real drafting is usually well above zero), an idle-then-burst pattern, a very uniform typing rhythm, and log/text mismatch (the keystroke log does not rebuild into the submitted text — usually a dropped connection). Thresholds are on the sessions page.

The wording in the app is "worth a look". The follow-up is the one-minute oral check from tab A00: she explains one of her own sentences. Marks follow the conversation.

**Replay:** open a submission → the keystroke replay plays at 1×–64× with a scrubber; the timeline shows away periods in red, Split View in amber, blocked pastes as triangles and bulk inserts as dots.

## Privacy (PDPA)

Students are minors. Before the first session the parent notice (workstream G) says what is recorded, why, who sees it, and for how long. The app records, **during a joined session only and inside the writing box only**: keystrokes (for the replay), time away from the page, blocked paste attempts, bulk inserts. Nothing is recorded on any other screen of the app, and nothing on the device. A student can see her own receipt at any time and may ask to see her replay.

Retention: **Purge logs** on a session deletes its keystroke and event logs and keeps the drafts, receipts and flag summaries. At the end of the semester run `purgeSemester()` from the Apps Script editor to clear all logs at once.

## Before the first real class (Thursday 5 November)

Test on a real iPad in Safari and from the home screen, not on a laptop:
- app switch, Home gesture, Control Centre, Notification Centre, Split View, Slide Over, Stage Manager, screen lock, aeroplane mode mid-session;
- paste via the keyboard, the long-press menu and drag-and-drop; dictation; Scribble; Writing Tools if available;
- confirm each produces the expected counter or flag, that the console matches the student's receipt, and that the replay rebuilds the submitted text;
- a full dry run with the Semester 1 class or a handful of students against the live Apps Script, to see the heartbeat (one call per student per 10 s) hold at 25–30 students.

Record which routes are caught, flagged or invisible and correct the table above if an iPadOS update changes anything.

## Without the class server

With no Apps Script URL the whole room runs inside one browser (the console in one tab, students in others) — good for a rehearsal, useless across devices. The Staff Room says "Local data, this browser only" when that is the case.
