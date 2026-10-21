/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — content.js  (core)
   EN32102 English 4 · M5.1 · Satriwithaya EP · Semester 2 2026
   ---------------------------------------------------------------------------
   This file holds everything that is NOT question content: the rank ladder,
   the awards, and the error-tag dictionary that drives the hints, the fault
   list and the teacher report.

   The questions live in the unit files, which are GENERATED from each unit's
   item bank by tools/build-content.js and loaded after this one:

     data/topic-u5.js   Unit 5  When the Water Came      (Grammar Ladder + Words in Action)
     data/topic-u6.js   Unit 6  Thailand Welcomes the World
     data/topic-u7.js   Unit 7  Schools of Tomorrow        (Phase 2)
     data/topic-u8.js   Unit 8  "A New Study Finds…"       (Phase 2)
     data/tests.js      one triage + one unit check per unit (MOCKS)
     data/extras.js     exit tickets and Monday spiral sets

   Do not edit the generated files by hand: edit the item bank
   (Unit N/UN-item-bank.json) or the module plan (tools/unit-plans.js) and
   rebuild with  node tools/build-content.js

   ---------------------------------------------------------------------------
   SHAPE OF A STAGE (the engine calls a stage a "topic")

   { id:'u5g', n:1, code:'Unit 5 · Grammar', art:'layers', cefr:'B1–C1', name:'…', blurb:'…',
     levels:[ { id:'u5g1', n:1, name:'…', cefr:'B1', blurb:'…',
                subs:[ { id:'u5g1s1', name:'…', cefr:'B1',
                         theory:{ key:'…', body:['<p-worth of html>'], simple:[…], examples:[{s,g}] },
                         items:[ …5–7… ] }, … ],
                check:{ id:'u5g1ck', name:'Level check · …', items:[ …6… ] } }, … ] }

   ITEM TYPES  (engine.js renders these)
     choose  {stem, options[], answer}                    multiple choice / vocabulary
     equiv   {given, stem, options[], answer}             closest in meaning
     cloze   {passage, blank, stem, options[], answer}     gap in a text
     gap     {lines:[{who,text}], stem, options[], answer} dialogue gap-fill
     read    {passage, source, stem, options[], answer}    reading question
     spot    {stem, words[], answer, fix}                  error identification
     order   {stem, items[] IN CORRECT ORDER}              paragraph ordering

   Every item carries: id · type · tag (must exist in REMEDIATION) · level
   (a CEFR band) · why (what a student reads after answering) · hint.
   =========================================================================== */

var CEFR = ['B1', 'B1+', 'B2', 'B2+', 'C1', 'C1+'];

/* --------------------------------------------------------------------------
   RANKS — one rung per band of level checks cleared. Four units × two stages
   × three levels = 24 checks in all; Phase 1 ships 12 (Units 5–6).
   The ladder is a newsroom: a student rises from Reader to Editor-in-Chief.
   -------------------------------------------------------------------------- */
var RANKS = [
  { min: 0,  name: 'Reader',          note: 'Nothing checked yet. Open a unit and start with its triage.' },
  { min: 1,  name: 'Trainee',         note: 'A first level check cleared. The desk has noticed you.' },
  { min: 3,  name: 'Junior Reporter', note: 'You can name the forms and say what they do.' },
  { min: 6,  name: 'Reporter',        note: 'A whole unit\'s grammar holds without thinking.' },
  { min: 9,  name: 'Senior Reporter', note: 'You can say why a wrong answer is wrong.' },
  { min: 12, name: 'Sub-editor',      note: 'Units 5 and 6 green — the midterm ground is yours.' },
  { min: 16, name: 'Desk Editor',     note: 'The modal system is open and holding.' },
  { min: 20, name: 'News Editor',     note: 'Exam-ready on nearly everything.' },
  { min: 24, name: 'Editor-in-Chief', note: 'Every level green. The whole semester is yours.' }
];

/* --------------------------------------------------------------------------
   AWARDS — the fifteen ids are fixed by the engine; only the wording is ours.
   -------------------------------------------------------------------------- */
var BADGES = [
  { id: 'poweron',   name: 'First Byline',      perk: 'Your first module is in print.',       how: 'Finish your first module.' },
  { id: 'streak3',   name: 'Three-Day Run',     perk: 'Momentum is a skill.',                 how: 'Study 3 days in a row.' },
  { id: 'streak7',   name: 'Weekly Edition',    perk: 'Seven days, no gap.',                  how: 'Study 7 days in a row.' },
  { id: 'streak14',  name: 'Fortnightly',       perk: 'Two weeks without a gap.',             how: 'Study 14 days in a row.' },
  { id: 'allgreen',  name: 'Clean Copy',        perk: 'A flawless level check.',              how: 'Score 100% on any level check.' },
  { id: 'triple',    name: 'Triple Clean',      perk: 'Three flawless checks.',               how: 'Score 100% on three level checks.' },
  { id: 'nohelp',    name: 'Unaided',           perk: 'No hints, no help.',                   how: 'Clear a level check without using a hint.' },
  { id: 'recovered', name: 'Corrections Column',perk: 'You fixed what you broke.',            how: 'Fix 5 questions on your fault list.' },
  { id: 'run10',     name: 'Ten Clean',         perk: 'Ten in a row.',                        how: 'Answer 10 questions correctly in a row.' },
  { id: 'reflight',  name: 'Second Edition',    perk: 'A second attempt, taken.',             how: 'Pass a level check you previously failed.' },
  { id: 'quick',     name: 'Deadline Beater',   perk: 'Reading speed counts in the exam.',    how: 'Earn 25 time bonuses by answering before the ring runs out.' },
  { id: 'sim1',      name: 'First Paper',       perk: 'You have seen a whole paper.',         how: 'Finish any triage or unit check.' },
  { id: 'sim70',     name: 'Seventy Up',        perk: '70% on a full paper.',                 how: 'Score 70% or more on any triage or unit check.' },
  { id: 'simall',    name: 'Every Paper',       perk: 'Every triage and unit check, done.',   how: 'Finish every paper in the app.' },
  { id: 'director',  name: 'Editor-in-Chief',   perk: 'Every level green.',                   how: 'Clear every level check.' }
];

/* --------------------------------------------------------------------------
   ERROR TAGS
   Every item names one. `principle` is what a student sees if they press
   Hint (it must never give a particular answer away). `reteach` and
   `activities` appear only in the teacher console.
   Tag names match the grammarTag field of the unit item banks.
   -------------------------------------------------------------------------- */
var REMEDIATION = {

  /* ======================================= UNIT 5 · the passive in flood news */
  'form-tense': {
    name: 'Passive form: be in the right tense + past participle',
    principle: 'A passive is <em>be</em> + past participle (V3). Only <em>be</em> changes for tense — <em>is / was / has been / is being / had been / will be</em> — and the V3 never changes. Find the time marker, choose the tense of <em>be</em>, then add V3. Continuous needs <em>being</em>; perfect needs <em>been</em>.',
    reteach: 'The student is building the passive as one chunk and changing the wrong half: <em>was wrote</em>, <em>has written</em> for a passive, <em>is being flood</em>. Separate the two jobs on the board — <em>be</em> carries the tense, V3 carries the meaning — and drill the tense ladder on one verb (<em>is declared, was declared, has been declared, is being declared, had been declared, will be declared</em>). It is fixed when the student can take any time marker and produce the right <em>be</em> without changing the participle.',
    activities: ['Tense ladder race: one verb, six time markers on cards, teams build the six passives on mini-whiteboards.', 'Bulletin surgery: a flood bulletin with every passive in the wrong tense; pairs fix the <em>be</em> only.']
  },
  'agent': {
    name: 'Keep the by-agent only when it adds information',
    principle: 'Most passives have no <em>by</em>-phrase. Keep the agent only when the doer is new or important (<em>was photographed by a passing drone</em>); drop it when the doer is unknown, obvious or unimportant (<em>Residents were evacuated</em>, not <em>by people</em>). After <em>known / seen / described</em>, a role noun takes <em>as</em>, not <em>by</em>.',
    reteach: 'The student has learnt "passive = add <em>by</em>" and bolts <em>by people / by someone / by them</em> onto every sentence. Show real news passives and count the agents — four in five have none. Then give the two reasons an agent stays: it is new information, or the sentence is meaningless without it. Fixed when the student can delete a vague agent and explain why one named agent must stay.',
    activities: ['Agent audit: students read a real report and highlight every <em>by</em>; the class decides which could be cut.', 'Keep-or-drop sort: twelve sentences with agents, two bins.']
  },
  'active-correct': {
    name: 'When the active is right: the subject does the action',
    principle: 'Ask one question: does the subject <em>do</em> the action or <em>receive</em> it? A thing can be a doer — <em>Extreme weather inundated the drainage system</em>. If a direct object follows the verb, the verb is active. "The subject is a thing, so it must be passive" is not a rule.',
    reteach: 'The student picks the passive whenever the subject is inanimate. Put an inanimate doer on the board with its object (<em>the rain flooded the road</em>) and ask what the road did — nothing; it received. Then swap subjects and watch the voice change. Fixed when the student can spot the object after the gap and choose the active without hesitation.',
    activities: ['Doer or receiver: fast whole-class vote on twenty sentences, thumbs up for doer.', 'Rewrite a passive paragraph into the active and name the doer that each rewrite had to invent.']
  },
  'modal-passive': {
    name: 'Modal passive: modal + be + V3 (and modal + have been + V3 for the past)',
    principle: 'After a modal, the passive is <em>be</em> + V3 — <em>must be evacuated, could be prevented, should be repaired</em>. For a past judgement it is modal + <em>have been</em> + V3: <em>could have been prevented</em>. The modal never changes and <em>be</em> stays bare.',
    reteach: 'The student writes <em>must evacuated</em>, <em>could be prevent</em> or <em>should been repaired</em>. Three slots on the board: MODAL · be / have been · V3. Fill them with the flood vocabulary until the shape is automatic, then contrast present (<em>must be done</em>) with past criticism (<em>should have been done</em>). Fixed when the student can turn a recommendation into a past regret and back without losing <em>be</em>.',
    activities: ['Flood Response Planner cards: what must / should / could be done, then what could have been prevented.', 'Slot analysis: for each gap in a TCAS passage, say which of the three slots is missing.']
  },
  'passive-infinitive': {
    name: 'Passive infinitive: to be + V3 after verbs, adjectives and nouns',
    principle: 'After verbs like <em>expect, allow, need, want, be likely</em> and after nouns (<em>the first dam to be opened</em>), a passive meaning takes <em>to be</em> + V3: <em>are expected to be repaired</em>, <em>allow water to be released</em>. If the subject receives the action, the infinitive is passive.',
    reteach: 'The student drops <em>be</em> (<em>expected to repair</em>) or uses a bare V3. Ask who repairs: not the roads, so the roads are receivers and the infinitive must be passive. Pair each verb with both forms (<em>expected to repair / expected to be repaired</em>) and decide by the subject. Fixed when the student chooses the infinitive by asking the doer question, not by habit.',
    activities: ['Two-column card match: subject + verb on the left, active or passive infinitive on the right.', 'Headline expansion: turn "Roads to be repaired" into full sentences with <em>expected / due / likely</em>.']
  },
  'passive-gerund': {
    name: 'Passive gerund: being + V3 after prepositions and certain verbs',
    principle: 'Where English needs an <em>-ing</em> form and the meaning is passive, use <em>being</em> + V3: <em>avoid being cut off</em>, <em>angry about being left without power</em>, <em>after being rescued</em>. The V3 does not change; <em>being</em> carries the passive.',
    reteach: 'The student writes <em>avoid cutting off</em> for a passive meaning, or <em>being cut</em> after a verb that takes an infinitive. Fix the two decisions separately: first, does this slot need <em>-ing</em> (after a preposition or <em>avoid / risk / enjoy / remember</em>)? Then, does the subject receive the action? Both yes → <em>being</em> + V3. Fixed when the student can explain both decisions for one sentence.',
    activities: ['Preposition prompts: <em>after / without / about / despite</em> + a flood event, students supply <em>being</em> + V3.', 'Error clinic on real drafts from the Writing Room.']
  },
  'reduced-relative': {
    name: 'Reduced relative: a past participle straight after the noun',
    principle: 'A passive relative clause can lose <em>who / which + be</em>: <em>families (who were) displaced by the water</em>, <em>a vendor (who was) forced to close</em>. The clause already has its main verb, so the gap after the noun takes a bare V3, not <em>was</em> + V3 and not V-ing.',
    reteach: 'The student adds a second finite verb (<em>families were displaced by the water are</em>…) or uses V-ing for a passive meaning (<em>families displacing</em>). Teach the one-finite-verb rule: find the main verb first; if the clause has one, the participle after the noun is reduced. Then the doer test chooses V3 (receiver) or V-ing (doer). Fixed when the student can expand and reduce the same clause in both directions.',
    activities: ['Expand it: pairs restore <em>who were / which is</em> to a paragraph of reduced clauses, then reduce it again.', 'Gazette headlines: noun + V3 phrases for the Human Interest desk.']
  },
  'impersonal-passive': {
    name: 'Impersonal and reporting passive: It is thought that… / X is said to…',
    principle: 'News distances a claim with two patterns. <em>It is thought / known / reported that</em> + clause. Or the subject moves up: <em>Villages are said to be paying the price</em>; for an earlier event, <em>is thought to have been</em> + V3. <em>Suggest</em> and <em>announce</em> only take the <em>It is … that</em> pattern.',
    reteach: 'The student mixes the two patterns (<em>It is said villages to pay</em>) or forgets the perfect infinitive for a past event. Draw the two shapes as two trains: IT + is + V3 + that + clause; SUBJECT + is + V3 + to + infinitive. Then show that <em>to have been</em> + V3 moves the event into the past. Fixed when the student can convert a plain claim into both shapes and choose the infinitive tense correctly.',
    activities: ['Who says? Students rewrite five facts from the flood reports as unattributed claims using both patterns.', 'Analysis desk: a model paragraph with every impersonal passive underlined.']
  },
  'verb-restriction': {
    name: 'Verbs with no passive: happen, occur, rise, subside, die, arrive…',
    principle: 'A verb can only be passive if it takes an object in that meaning. <em>Happen, occur, appear, disappear, die, arrive, exist, become, seem, belong, subside, rise</em> have no object, so they stay active: <em>The water subsided</em>, never <em>was subsided</em>. For a passive-friendly version use a verb that does take an object: <em>was caused by</em>.',
    reteach: 'The student passivises <em>happen</em> and <em>subside</em> because "the subject did not do it on purpose". Purpose is not the test; the object is. Ask: can you <em>subside something</em>? No object, no passive. List the Unit 5 no-passive verbs on the wall and keep adding. Fixed when the student rejects <em>was happened</em> on the object test, not on feel.',
    activities: ['Object test relay: a verb is called, teams shout a sentence with an object or "no object!".', 'Two-way verbs sort: <em>rise / raise, subside / lower, flood / be flooded</em>.']
  },
  /* ---- Monday spiral and conversation tags (Semester 1 review items; Workstream B bank, 21 Oct) ---- */
  'conversation': {
    name: 'Conversations: the function behind the line',
    principle: 'TCAS Section I asks what a speaker is doing — agreeing, declining, suggesting, checking. Read the line before the gap for the move it needs, then pick the reply with that function and the right register.',
    reteach: 'Name the function first (offer, refusal, request, suggestion), then the form. Practise with pairs reading the exchange aloud before choosing.',
    activities: ['Function sort: eight replies into four functions.', 'Register swap: say the same move politely and casually.']
  },
  'paragraph-ordering': {
    name: 'Paragraph ordering: follow the references',
    principle: 'The first sentence introduces the topic with a full noun phrase; later sentences point back with <em>this, these, such, it</em> and time words. Find the sentence that cannot come first, then chain the references.',
    reteach: 'Underline every pronoun and time marker, draw the arrow to what it refers to, then order.',
    activities: ['Reference arrows on four sentences.', 'First-sentence veto: which three cannot open the paragraph?']
  },
  'spiral-gerund-infinitive': { name: 'Review: gerund or infinitive after the verb', principle: 'Semester 1 verb patterns: <em>avoid being cut off</em>, <em>expect to be repaired</em>. The verb before the gap decides the form; the meaning decides the voice.', reteach: 'Return to the Semester 1 verb-pattern list; test the verb before the gap first, then voice.', activities: ['Verb-pattern sort with passive forms added.'] },
  'spiral-participle': { name: 'Review: participle clauses', principle: '<em>Having been warned</em>, <em>Trained on the data</em>: a participle clause shares the subject of the main clause and its voice is chosen by meaning.', reteach: 'Check the subject of the main clause first; V-ing if it does the action, V3 if it receives it.', activities: ['Dangling-participle hunt in six sentences.'] },
  'spiral-conditional': { name: 'Review: conditionals', principle: 'Mixed and inverted conditionals from Semester 1: <em>Had the drains been cleared, the street would be dry today</em>.', reteach: 'Map time of condition and time of result separately before choosing the forms.', activities: ['Two-clock drill: label each clause past or present.'] },
  'spiral-comparison': { name: 'Review: comparison and degree', principle: 'Comparatives, <em>as … as</em>, <em>the … the</em>, <em>too / enough</em> from Semester 1.', reteach: 'Identify the two things compared and the degree word before choosing the form.', activities: ['Degree ladder: rank five sentences by strength.'] },
  'spiral-nominalisation': { name: 'Review: nominalisation', principle: 'Turning verbs and adjectives into nouns to combine ideas: <em>the restriction of dam releases</em>.', reteach: 'Find the verb, find its noun, keep the agent as a possessive or <em>of</em>-phrase.', activities: ['Combine two sentences into one with a nominalised subject.'] },
  'spiral-inversion': { name: 'Review: inversion after negative adverbials', principle: '<em>Rarely has a city been flooded so fast</em>: negative or limiting adverbial first, then auxiliary before subject.', reteach: 'Find the auxiliary; if there is none, add <em>do / does / did</em>.', activities: ['Flip it: eight sentences to invert and back.'] },
  'two-object': {
    name: 'Two-object verbs: the person usually becomes the subject',
    principle: 'Verbs like <em>give, send, offer, show, tell, promise</em> take two objects, so two passives are possible. News prefers the person as subject: <em>Families were given food parcels</em>. With <em>explain, describe, suggest, say, report</em> the person needs <em>to</em>, so the person cannot be the subject: <em>The rule was explained to residents</em>, not <em>Residents were explained</em>.',
    reteach: 'The student writes <em>I was explained the plan</em> or <em>Food was given families</em>. Separate the true two-object verbs from the <em>to</em>-only verbs with one list each, then practise promoting the person with the first list only. Fixed when the student can say which list a verb is on.',
    activities: ['Promote the person: ten sentences, pairs choose the subject that news would use and say why.', 'Spot the to-verb: a paragraph with three impossible person-subjects to find.']
  },
  'stative-lookalike': {
    name: 'Adjective look-alikes: is located, is interested, is submerged as a state',
    principle: 'Some <em>be</em> + V3 forms describe a state, not an action: <em>The village is located upstream</em>, <em>roads were submerged for days</em>. Treat them as adjectives — they take no agent and often no time of action. They are correct; do not force a <em>by</em>-phrase or a continuous form onto them.',
    reteach: 'The student either rejects these as "not a real passive" or adds an agent to make them one. Show the pair <em>The road was closed (by police at 6 a.m.)</em> / <em>The road was closed all day</em> — the same words, one an event and one a state. Fixed when the student can say which reading a sentence has from its context.',
    activities: ['State or event: twelve sentences from the flood reports, two columns, justify each.', 'Add the context: students write a time phrase that forces each reading.']
  },
  'u5-words-a': {
    name: 'Unit 5 words 1–5: evacuate, submerged, inundate, displaced, aftermath',
    principle: 'Think of the word\'s picture and its grammar: <em>evacuate</em> people <em>from</em> a place (and the passive <em>were evacuated to shelters</em>); <em>submerged</em> is a state after <em>be</em>; <em>inundate</em> = flood, literal or with requests; <em>displaced</em> people have lost their homes; <em>the aftermath of</em> an event is what comes after.',
    reteach: 'Confusions seen: <em>evacuate</em> used for the water, <em>inundate</em> only in the literal sense, <em>displaced</em> as "moved" with no loss. Teach each word with its collocation and one sentence in the unit grammar, as in the vocabulary journal.',
    activities: ['Word-family grid: noun, verb, adjective for each word.', 'Collocation bingo with the flood reports.']
  },
  'u5-words-b': {
    name: 'Unit 5 words 6–10: devastate, resilient, mitigate, exacerbate, prolonged',
    principle: '<em>Devastate</em> destroys (<em>devastating floods</em>); <em>resilient</em> people recover; <em>mitigate</em> makes something bad less serious; <em>exacerbate</em> makes it worse; <em>prolonged</em> = lasting a long time. Two of these are opposites — decide which direction the sentence needs.',
    reteach: 'The usual slip is <em>mitigate</em> / <em>exacerbate</em> reversed, and <em>resilient</em> used for things that simply survive. Drill the direction with arrows up and down, and give <em>resilient</em> its "bounce back" picture.',
    activities: ['Better or worse: students sort verbs by direction, then write one <em>could have been mitigated</em> sentence.', 'Prefix hunt: <em>pro-, de-, ex-</em> in the five words.']
  },
  'u5-words-c': {
    name: 'Unit 5 words 11–15: unprecedented, discharge, relief, subside, trying times',
    principle: '<em>Unprecedented</em> = never seen before (a flood "hardly unprecedented" happens every year); <em>discharge</em> is water released from a dam, or the act of releasing it; <em>relief</em> is help for victims, or the feeling; <em>subside</em> = go down, and it has no passive; <em>trying times</em> are a difficult period.',
    reteach: 'Watch <em>relief</em> and <em>inundate</em>, the two-meaning words, and <em>subside</em> in the passive. Teach <em>discharge</em> as noun and verb together, with a number (<em>a discharge of 2,500 cubic metres a second</em>).',
    activities: ['Two meanings: students write one sentence per meaning of <em>relief</em> and <em>inundate</em>.', 'No-passive wall: <em>subside</em> joins <em>happen</em> and <em>rise</em>.']
  },

  /* ================================ UNIT 6 · causatives and verb patterns */
  'causative-have': {
    name: 'have / get something done: someone else does it for you',
    principle: '<em>Have</em> + object + V3 means someone else does the job: <em>The hotel had the pool cleaned</em> (service) or <em>Guests had their bags stolen</em> (bad experience). <em>Get</em> + object + V3 means the same, less formally. The doer is not named. Compare the plain passive: <em>The pool was cleaned</em> — same job, no "arranged it" meaning.',
    reteach: 'The student confuses <em>I had my hair cut</em> with the past perfect <em>I\'d cut my hair</em>, or writes <em>have it to clean</em>. Put the three slots up — have/get · object · V3 — and contrast "I did it" with "I arranged it". Questions and negatives use <em>do</em>: <em>Did you have it fixed?</em> Fixed when the student can turn a plain passive into a causative and say who did the work.',
    activities: ['Concierge Desk: guests ask for things to be done; the concierge reports back with <em>had / got … done</em>.', 'Who did it? Sort: past perfect vs causative pairs.']
  },
  'causative-person': {
    name: 'have sb do / get sb to do / make sb do / be made to do',
    principle: 'When the doer is named: <em>have</em> + person + bare verb (<em>had the porter carry the bags</em>); <em>get</em> + person + <em>to</em> + verb (<em>got the manager to call</em>); <em>make</em> + person + bare verb, but the passive is <em>be made to</em> (<em>staff were made to work late</em>). <em>Let</em> has no passive: use <em>be allowed to</em>.',
    reteach: 'The student puts <em>to</em> after <em>have</em> and <em>make</em>, drops it after <em>get</em>, or writes <em>was made work</em>. One table, four rows, and the passive of <em>make</em> and <em>let</em> as the two surprises. Fixed when the student can convert <em>They made us wait</em> into the passive correctly.',
    activities: ['Review Remix: a hotel review in four tones, each using one of the four patterns.', 'Passive flip: make/let sentences into <em>be made to / be allowed to</em>.']
  },
  'object-pattern': {
    name: 'Object verb patterns: allow sb to do · prevent sb from doing · need doing',
    principle: 'Learn the verb with its pattern. <em>Allow / enable / require / persuade / encourage</em> + object + <em>to</em> + verb. <em>Prevent / stop / ban / discourage</em> + object + <em>from</em> + V-ing. <em>Need</em> + V-ing = <em>need to be</em> + V3 (<em>The room needs cleaning</em>). In the passive these keep their pattern: <em>were prevented from entering</em>, <em>are required to wear</em>.',
    reteach: 'The student mixes the two families (<em>prevent them to enter</em>, <em>allow them from entering</em>) or writes <em>need to clean</em> for a passive meaning. Two colours on the board for the two families; <em>need doing</em> as its own card. Fixed when the student can produce the passive of each pattern with the preposition intact.',
    activities: ['Pattern pairs: match verb to <em>to</em> or <em>from -ing</em> at speed.', 'Etiquette box: temple and hotel rules written with <em>are required to / are prevented from</em>.']
  },
  'tone-words': {
    name: 'Tone and attitude in reviews: nostalgic, sarcastic, skeptical, ambivalent',
    principle: 'A reviewer\'s tone is in the word choice, not the facts. <em>Nostalgic</em> looks back warmly; <em>sarcastic</em> says the opposite of what it means to mock; <em>skeptical</em> doubts the claims; <em>ambivalent</em> has mixed feelings. Read for signals: praise that is too strong, hedges, "used to", "I\'m not convinced".',
    reteach: 'The student reads a sarcastic review as praise and an ambivalent one as negative. Teach the signal words for each tone and have students write the same hotel in four tones, as in Review Remix. Fixed when the student can name the tone from two sentences and point to the signal.',
    activities: ['One hotel, four tones: rewrite the same facts in each voice.', 'Tone detector: ten short reviews, name the tone and the giveaway word.']
  },
  'u6-words-a': {
    name: 'Unit 6 words 1–5: amenities, complimentary, hospitality, nostalgic, sarcastic',
    principle: '<em>Amenities</em> are the facilities a place offers; <em>complimentary</em> = free, not "complementary"; <em>hospitality</em> is the welcome given to guests (and the industry); <em>nostalgic</em> and <em>sarcastic</em> are tones, not facts.',
    reteach: 'Watch <em>complimentary / complementary</em> and <em>hospitality</em> for the industry sense. Teach with hotel ads and reviews, as the midterm does.',
    activities: ['Ad rewrite: students add three amenities and one complimentary item to a hotel ad.', 'Tone tag: label review sentences nostalgic or sarcastic.']
  },
  'u6-words-b': {
    name: 'Unit 6 words 6–10: skeptical, heritage, etiquette, gig economy, bespoke',
    principle: '<em>Skeptical</em> doubts; <em>heritage</em> is what a culture inherits (sites, food, crafts); <em>etiquette</em> is the rules of polite behaviour; the <em>gig economy</em> is short jobs through apps; <em>bespoke</em> = made to order for one customer.',
    reteach: 'Etiquette vs manners, heritage as uncountable, bespoke as an adjective before the noun. Use etiquette notices and tour descriptions.',
    activities: ['Etiquette box: five rules for a temple visit using the word.', 'Gig economy debate: tuk-tuk apps and delivery riders in two sentences each.']
  },
  'u6-words-c': {
    name: 'Unit 6 words 11–15: cater to, ambivalent, courteous, attire, live up to',
    principle: '<em>Cater to</em> a group = provide what they want; <em>ambivalent</em> = mixed feelings; <em>courteous</em> = politely respectful; <em>attire</em> = clothing for an occasion (formal word); <em>live up to</em> expectations = be as good as promised.',
    reteach: 'The phrasal verbs need their particles: <em>cater to</em>, <em>live up to</em>. <em>Attire</em> appears in dress-code notices; <em>courteous</em> in reviews of staff.',
    activities: ['Review Remix sentence bank: one sentence per word in a review.', 'Dress code notice: rewrite a sign with <em>attire</em> and <em>are required to</em>.']
  }
};

/* The unit files push onto these; data/tests.js pushes onto MOCKS. The first
   MOCK is the diagnostic the route screen opens with (Unit 5 Triage). */
var TOPICS = [];
var MOCKS = [];
