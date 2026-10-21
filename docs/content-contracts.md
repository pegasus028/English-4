# Content contracts for the portal

What workstreams B/D (item banks) and G (prompt matrices) deliver so the portal loads them without hand-editing. Both are read by `tools/build-content.js` and the Staff Room importer respectively.

## 1 · Unit item bank (workstreams B, D) — `Unit N/UN-item-bank.json`

A JSON array of items (or `{ "items": [...] }`). The handover schema, plus the fields marked **+**:

```json
{
  "id": "U5-PV-012", "unit": 5, "lesson": 4,
  "grammarTag": "modal-passive", "errorTag": "E7",
  "type": "cloze",                       // cloze | errorid | closest | vocab | ordering | read
  "level": "B2",                         // B1 | B1+ | B2 | B2+ | C1
  "passage": "… ___(1)___ …",            // cloze/read only; optional for cloze
  "stem": "…____…",
  "options": [ { "text": "…", "errorType": "E7", "feedback": "…" }, … ],   // exactly 4
  "answerIndex": 0,
  "hint": "…",                            // never reveals the key
  "why": "…",                             // ≤ 35 words
  "source": "original",
  "heldout": false,
  "use": ["portal", "exit"],              // portal | exit | spiral | blooket | test — string or array
  "word": "mitigate",                     // + vocab items: the headword (maps to the u5-words-a/b/c tag)
  "kind": "meaning",                      // + vocab items: meaning | family | context
  "given": "…",                           // + closest: the sentence; stem is the question
  "fix": "were installed",                // + errorid: the correction (else the key option's feedback)
  "triage": true, "check": true           // + optional priority for the triage / level checks
}
```

Rules the builder relies on:
- **Tags** must be in `content.js` REMEDIATION. Unit 5: `form-tense, agent, active-correct, modal-passive, passive-infinitive, passive-gerund, reduced-relative, impersonal-passive, verb-restriction, two-object, stative-lookalike, u5-words-a/b/c`. Unit 6: `causative-have, causative-person, object-pattern, tone-words, u6-words-a/b/c`. Vocab items may omit `grammarTag`; the builder derives it from `word`.
- `heldout: true` or `use` containing `test` → the item never reaches the app (unit test, retest, midterm, final).
- `errorid` options are the **four segments** in sentence order; `answerIndex` is the wrong one.
- `ordering` options are the sentences **in the correct order**.
- `lesson` places exit-ticket items (5 per lesson, `use` includes `exit`) and spiral items (6 per Monday lesson, `use` includes `spiral`). Items may carry both `portal` and `exit`.

### How the portal spends the bank (Unit 5)

| destination | items | from |
|---|---|---|
| 9 Grammar Ladder modules | 5–6 each (45–54) | tag ∈ module tags, level ∈ module levels (see `tools/unit-plans.js`) |
| 9 Words in Action modules | 5–6 each | `word` group × `kind` (meaning / family / context) |
| 6 level checks | 6 each (36) | unused items across the level's tags; `check: true` first |
| Unit 5 Triage | 20 | one unused item per module (18) + 2; `triage: true` first |
| Unit 5 Unit Check | 20 | unused: 5 vocab, 5 cloze, 5 errorid, 5 closest |
| 8 exit tickets | 5 each | `use: exit` by lesson (may reuse placed items) |
| 4 spiral sets | 6 each | `use: spiral` by lesson |

Minimum **≈ 170 non-held-out items** fill every slot; the handover's ≈180 + 40 held-out test items is enough. Short slots are reported, never fatal. Module plans for Unit 6 (L10–L14) are in the same file; five exit tickets and three spirals.

Deliver the file, then: `node tools/build-content.js "Unit 5/U5-item-bank.json" && node tools/validate.js`, bump `?v=`, push.

## 2 · Sealed prompt matrix (workstream G) — `U5-W1.json`, `U5-W2.json`, `U6-W1.json`

Imported in the Staff Room (Writing Room → Import matrix). Stored on the class server only.

```json
{
  "writeId": "U5-W1", "name": "Newsroom Desk — rewriting flood bulletins", "unit": 5, "lesson": 3,
  "wordTargets": { "1": [150, 180], "2": [120, 150], "3": [120, 150], "4": [80, 110] },
  "prompts": [
    { "studentId": "51288", "desk": "Breaking News",
      "angle": "one-sentence task", "source": "the 60–80-word active bulletin (W1) ",
      "facts": ["planner-card fact 1", "…"],                 // W2 instead of source
      "quota": ["2 × present perfect passive", "…"],
      "words": ["evacuate", "submerged", "mitigate", "prolonged"],
      "frames": ["___ was/were ___ed by ___."],              // Band 4 only
      "target": [80, 110] }                                   // optional override
  ],
  "fallback": { "desk": "General", "angle": "…", "quota": ["…"], "words": ["…"] }
}
```

`studentId` is the 5-digit student number from `roster.js`. The band word target is applied automatically from the roster band the student joins with; `target` overrides it. `fallback` is shown to any student without a row (a new student, or a wrong number). See `prompts/U5-W1.sample.json`.
