/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — tools/unit-plans.js
   The module plan for each unit: which stages, levels and modules exist,
   which item-bank tags feed each module, and the theory a student reads
   before the questions. tools/build-content.js fills the plan from the
   unit's item bank and writes data/topic-uN.js, data/tests.js, data/extras.js.

   Theory text follows the passive-voice skill (Decision Test, agent rule,
   no-passive verbs, causative family). Examples from the Unit 5 flood
   reports are quoted as published.
   =========================================================================== */

var UNIT_PLANS = {

  /* ======================================================================= */
  5: {
    unit: 5, name: 'When the Water Came', short: 'U5',
    lessons: [1, 2, 3, 4, 5, 6, 7, 8],
    words: {
      a: ['evacuate', 'submerged', 'inundate', 'displaced', 'aftermath'],
      b: ['devastate', 'resilient', 'mitigate', 'exacerbate', 'prolonged'],
      c: ['unprecedented', 'discharge', 'relief', 'subside', 'trying times']
    },
    triage: { name: 'Unit 5 Triage', minutes: 20, total: 20,
      blurb: 'Twenty questions across every passive form in Unit 5. What you miss becomes your checklist.' },
    unitCheck: { name: 'Unit 5 Unit Check', minutes: 20, total: 20,
      blurb: 'Test format: 5 vocabulary, 5 cloze, 5 error identification, 5 closest in meaning. Twenty minutes, like the real paper.' },
    grammar: {
      id: 'u5g', code: 'Unit 5 · Grammar Ladder', art: 'layers', cefr: 'B1–C1',
      name: 'The passive in flood news',
      blurb: 'Every form of the passive, from be + V3 to It is thought that…, learnt from the way the 2026 floods were reported.',
      levels: [
        { id: 'u5g1', n: 1, name: 'Form, tense and the agent', cefr: 'B1',
          blurb: 'Be carries the tense, V3 carries the meaning, and most passives have no by.',
          modules: [
            { id: 'u5g1s1', name: 'Present and past: is declared, was evacuated, has been affected', cefr: 'B1',
              tags: ['form-tense'], levels: ['B1', 'B1+'],
              theory: {
                key: 'A passive is be + past participle. Only be changes for the tense; the participle never does.',
                body: [
                  'News on 26 September: <em>All 50 Bangkok districts <b>were declared</b> disaster areas</em>. The next day: <em>almost 4,900 people <b>had been evacuated</b> to shelters</em>. By mid-October: <em>about 329,000 households <b>were found</b> to have been affected</em>. Three tenses, one shape: a form of <em>be</em> and then the past participle (V3).',
                  'The tense lives in <em>be</em>. <em>is declared</em> (present simple, a general fact or a headline), <em>was declared</em> (past simple, one finished event), <em>has been declared</em> (present perfect: it happened, and it matters now — the tense news uses for "the latest"). The participle <em>declared</em> never changes, whichever tense you choose.',
                  'Read the time marker first, choose the tense of <em>be</em>, then add V3. That order stops the two commonest errors: changing the participle (<s>was wrote</s>) and dropping <em>been</em> from the perfect (<s>has written</s> for a passive meaning).'
                ],
                simple: [
                  'Passive = <em>be</em> + V3. Change <em>be</em> for the tense. Never change V3.',
                  '<em>is evacuated</em> (now, in general) · <em>was evacuated</em> (one past event) · <em>has been evacuated</em> (news now).'
                ],
                examples: [
                  { s: 'All 50 Bangkok districts <b>were declared</b> disaster areas on 26 September.', g: 'past simple: one finished event, dated.' },
                  { s: 'Twenty provinces <b>have been affected</b> by the floods.', g: 'present perfect: the situation is still news.' },
                  { s: 'Floodwater <b>is pumped</b> out of the city every rainy season.', g: 'present simple: a general fact.' }
                ]
              } },
            { id: 'u5g1s2', name: 'Continuous and perfect: is being delivered, had been expanded', cefr: 'B1+',
              tags: ['form-tense'], levels: ['B1+', 'B2'],
              theory: {
                key: 'Continuous passives need being; perfect passives need been. Both still end in V3.',
                body: [
                  '<em>Relief <b>is still being delivered</b> to families displaced by the water</em>: present continuous passive, an action in progress now. <em>Discharges from the dam <b>were being increased</b></em>: past continuous, in progress at a past moment. The marker of a continuous passive is <em>being</em> between <em>be</em> and V3.',
                  'The perfect passives add <em>been</em>: <em>embankments <b>have been expanded</b></em> (present perfect, since 2011), <em>people <b>had been evacuated</b></em> (past perfect, before 27 September), <em>the road <b>will have been reopened</b></em> by Monday (future perfect).',
                  'Two forms exist but are avoided in writing: the perfect continuous passive (<em>has been being built</em>) and the future continuous passive (<em>will be being repaired</em>). You will not be asked to produce them; choose the simple perfect or simple future instead.'
                ],
                simple: [
                  'In progress → <em>be</em> + <em>being</em> + V3: <em>is being delivered</em>, <em>was being increased</em>.',
                  'Finished before now / before then → <em>have/has/had been</em> + V3: <em>has been expanded</em>, <em>had been evacuated</em>.'
                ],
                examples: [
                  { s: 'Relief <b>is still being delivered</b> to families in Nonthaburi.', g: 'present continuous passive: happening now.' },
                  { s: 'Since the floods of 2011, embankments <b>have been expanded</b> to protect the capital.', g: 'present perfect passive: from 2011 to now.' },
                  { s: 'By 27 September, almost 4,900 people <b>had been evacuated</b>.', g: 'past perfect passive: completed before a past date.' }
                ]
              } },
            { id: 'u5g1s3', name: 'Doer or receiver? The active, and keeping the agent', cefr: 'B1+',
              tags: ['active-correct', 'agent'], levels: ['B1', 'B1+', 'B2'],
              theory: {
                key: 'Ask whether the subject does or receives the action. A thing can be a doer — then the verb is active. Keep by only when the doer adds information.',
                body: [
                  '<em>Extreme weather <b>inundated</b> the drainage system</em>. The subject is a thing, and the verb is active, because the weather did the inundating and <em>the drainage system</em> is sitting there as the object. "The subject is a thing, so use the passive" is not a rule. The only question is: does the subject do it or receive it? If an object follows the verb, the verb is active.',
                  'Most passives carry no <em>by</em>-phrase at all — about four in five in real news. <em>Residents were evacuated</em>: by whom is unknown, obvious or unimportant, so it is left out. Keep the agent only when it is the news: <em>The leak was first reported <b>by a street vendor</b></em>. Never add <s>by people</s> or <s>by someone</s>.',
                  'After <em>known, seen, described, regarded</em>, a role noun takes <em>as</em>, not <em>by</em>: <em>the area is known <b>as</b> the floodplain</em>. <em>By</em> is for the doer, and only the doer.'
                ],
                simple: [
                  'Does the subject do it? → active. Receive it? → passive. Things can do things.',
                  'Leave out <em>by</em> unless the doer is new or important.'
                ],
                examples: [
                  { s: 'Extreme weather <b>inundated</b> the drainage system.', g: 'active: the weather did it; the system is the object.' },
                  { s: 'Many canals <b>are blocked</b> with rubbish.', g: 'passive, no agent: who blocked them is unknown.' },
                  { s: 'The dam\'s discharge figures <b>were released by</b> the Royal Irrigation Department.', g: 'agent kept: the source is the news.' }
                ]
              } }
          ],
          check: { name: 'Level check · Form, tense and the agent' } },

        { id: 'u5g2', n: 2, name: 'Modals, infinitives and gerunds', cefr: 'B2',
          blurb: 'What must be done, what could have been prevented, what is expected to be repaired, what to avoid being caught by.',
          modules: [
            { id: 'u5g2s1', name: 'Modal passive: must be done, could have been prevented', cefr: 'B2',
              tags: ['modal-passive'], levels: ['B1+', 'B2'],
              theory: {
                key: 'Modal + be + V3 for now and the future; modal + have been + V3 for a judgement about the past.',
                body: [
                  '<em>Critics say more <b>must be done</b> to mitigate future flooding</em>. After a modal the passive is <em>be</em> + V3, and <em>be</em> stays bare: <em>should be repaired, can be pumped, will be reopened, might be extended</em>.',
                  'For the past, the modal takes <em>have been</em> + V3: <em>the damage <b>could have been prevented</b></em>, <em>the canals <b>should have been cleared</b></em>. This is the form of criticism and regret — exactly what an Analysis desk piece needs.',
                  'Three slots, always in this order: MODAL · <em>be</em> / <em>have been</em> · V3. The errors are all a missing slot: <s>must evacuated</s>, <s>could be prevent</s>, <s>should been repaired</s>.'
                ],
                simple: [
                  'Now / future: modal + <em>be</em> + V3 — <em>must be done</em>.',
                  'Past: modal + <em>have been</em> + V3 — <em>could have been prevented</em>.'
                ],
                examples: [
                  { s: 'More <b>must be done</b> to mitigate future flooding.', g: 'obligation about the future.' },
                  { s: 'Much of the damage <b>could have been prevented</b>.', g: 'past: it was possible, and it did not happen.' },
                  { s: 'The embankment <b>should be raised</b> before next year.', g: 'recommendation.' }
                ]
              } },
            { id: 'u5g2s2', name: 'Passive infinitive: expected to be repaired, the first dam to be opened', cefr: 'B2',
              tags: ['passive-infinitive'], levels: ['B2', 'B2+'],
              theory: {
                key: 'When the subject receives the action, the infinitive is to be + V3.',
                body: [
                  '<em>The roads <b>are expected to be repaired</b> by November</em>. Who repairs them? Not the roads. The roads receive the action, so the infinitive after <em>expected</em> is passive: <em>to be</em> + V3.',
                  'The same decision after <em>allow, need, want, hope, be likely, be due, be about</em>: <em>officials allowed water <b>to be released</b></em>; <em>the shelter is due <b>to be closed</b></em>. And after a noun: <em>the first dam <b>to be opened</b></em>, <em>the next district <b>to be declared</b></em> a disaster area.',
                  'Decide by the subject every time. <em>Residents expect to return</em> — the residents do the returning, so the infinitive stays active. The verb before the gap does not tell you; the doer does.'
                ],
                simple: [
                  'Subject receives the action → <em>to be</em> + V3: <em>expected to be repaired</em>.',
                  'Subject does the action → <em>to</em> + verb: <em>expect to return</em>.'
                ],
                examples: [
                  { s: 'The roads <b>are expected to be repaired</b> by November.', g: 'the roads receive the repairing.' },
                  { s: 'The plan allows water <b>to be released</b> slowly.', g: 'water receives the releasing.' },
                  { s: 'Villagers hope <b>to return</b> home this week.', g: 'active infinitive: the villagers do the returning.' }
                ]
              } },
            { id: 'u5g2s3', name: 'Passive gerund: avoid being cut off, angry about being left', cefr: 'B2+',
              tags: ['passive-gerund'], levels: ['B2', 'B2+', 'C1'],
              theory: {
                key: 'Where the slot needs -ing and the meaning is passive, use being + V3.',
                body: [
                  '<em>Many residents were angry about <b>being left</b> without power</em>. After a preposition (<em>about, after, without, despite, for</em>) English needs an <em>-ing</em> form; the residents did not do the leaving, so the gerund is passive: <em>being</em> + V3.',
                  'The same after verbs that take a gerund: <em>avoid, risk, remember, mind, enjoy, keep</em>. <em>Drivers should avoid <b>being caught</b> in deep water</em>; <em>the vendor remembers <b>being told</b> to close</em>.',
                  'Two decisions, in order. Does this slot need <em>-ing</em>? Does the subject receive the action? Both yes → <em>being</em> + V3. Only the first → an active gerund (<em>avoid driving</em>). Only the second but the slot needs an infinitive → <em>to be</em> + V3 (the previous module).'
                ],
                simple: [
                  'After a preposition or <em>avoid / risk / enjoy</em>, use <em>-ing</em>.',
                  'If the subject receives the action, that <em>-ing</em> is <em>being</em> + V3: <em>avoid being cut off</em>.'
                ],
                examples: [
                  { s: 'Residents were angry about <b>being left</b> without power.', g: 'after a preposition; they received the leaving.' },
                  { s: 'Drivers should avoid <b>being caught</b> in deep water.', g: 'after <em>avoid</em>; passive meaning.' },
                  { s: 'After <b>being rescued</b>, the family moved to a shelter.', g: 'passive gerund opening a sentence.' }
                ]
              } }
          ],
          check: { name: 'Level check · Modals, infinitives and gerunds' } },

        { id: 'u5g3', n: 3, name: 'Reduced, reported and restricted', cefr: 'C1',
          blurb: 'Families displaced by the water; It is thought that…; and the verbs that can never be passive.',
          modules: [
            { id: 'u5g3s1', name: 'Reduced relatives: families displaced by the water', cefr: 'B2+',
              tags: ['reduced-relative'], levels: ['B2', 'B2+', 'C1'],
              theory: {
                key: 'A passive relative clause can drop who/which + be: the noun is followed straight by V3.',
                body: [
                  '<em>Relief is still being delivered to families <b>displaced</b> by the water</em>. The full clause is <em>families <u>who were</u> displaced by the water</em>; news drops <em>who were</em> and keeps the participle. <em>One street vendor, <b>forced</b> to close for 15 days, has reopened</em> — the same reduction.',
                  'The test is the finite verb. The clause already has its main verb (<em>is being delivered</em>, <em>has reopened</em>), so the gap after the noun cannot hold a second one: not <s>families were displaced</s>, and not V-ing, because the families did not do the displacing. V3 it is.',
                  'In a TCAS passage this is the trap of the bare participle that "looks like past tense". <em>a trend <b>known</b> as…</em>, <em>products <b>made</b> in Thailand</em>, <em>schools <b>affected</b> by the floods</em>: all reduced passives, all V3 after the noun.'
                ],
                simple: [
                  'Noun + V3 = a short way of saying noun + <em>who/which was</em> + V3.',
                  'Use it when the clause already has its main verb.'
                ],
                examples: [
                  { s: 'Relief is being delivered to families <b>displaced</b> by the water.', g: '= families who were displaced.' },
                  { s: 'One street vendor, <b>forced</b> to close for 15 days, has reopened.', g: '= who was forced; the main verb is <em>has reopened</em>.' },
                  { s: 'Schools <b>affected</b> by the floods will reopen on Monday.', g: '= which were affected.' }
                ]
              } },
            { id: 'u5g3s2', name: 'Impersonal and reporting passive: It is known that…, are said to be…', cefr: 'C1',
              tags: ['impersonal-passive'], levels: ['B2+', 'C1'],
              theory: {
                key: 'Two shapes keep a claim at arm\'s length: It is thought that + clause, or Subject + is thought to + infinitive.',
                body: [
                  '<em><b>It is known that</b> many canals are blocked with rubbish</em>. Shape one: <em>It</em> + <em>be</em> + V3 + <em>that</em> + a full clause. The reporter is not saying who knows.',
                  '<em>Villages upstream <b>are said to be paying</b> the price</em>. Shape two: the subject moves to the front and the claim becomes an infinitive. For an event before the reporting, the infinitive goes perfect: <em>households <b>were found to have been affected</b></em>, <em>the leak <b>is thought to have started</b></em> on Friday.',
                  'Both shapes work with <em>say, think, know, believe, report, expect, find</em>. <em>Suggest</em> and <em>announce</em> take only shape one (<em>It is suggested that</em>, never <s>is suggested to</s>). And <em>inform</em> keeps the person as subject: <em>Residents were informed that</em>…'
                ],
                simple: [
                  '<em>It is said that</em> + sentence.',
                  'Or: <em>X is said to</em> + verb. Past event → <em>is said to have</em> + V3.'
                ],
                examples: [
                  { s: '<b>It is known that</b> many canals are blocked with rubbish.', g: 'shape one: It + is known + that-clause.' },
                  { s: 'Villages upstream <b>are said to be paying</b> the price.', g: 'shape two: subject + are said + to-infinitive.' },
                  { s: 'About 329,000 households <b>were found to have been affected</b>.', g: 'perfect infinitive: the effect came before the finding.' }
                ]
              } },
            { id: 'u5g3s3', name: 'No passive here: subside, happen, rise; two objects; adjective look-alikes', cefr: 'C1',
              tags: ['verb-restriction', 'two-object', 'stative-lookalike'], levels: ['B2', 'B2+', 'C1'],
              theory: {
                key: 'A verb with no object has no passive. Two-object verbs put the person first. Some be + V3 forms are states, not actions.',
                body: [
                  '<em>Floodwaters slowly <b>subside</b></em>. You cannot <em>subside something</em>, so <em>subside</em> has no object and no passive — <s>was subsided</s> is impossible. The same for <em>happen, occur, rise, fall, die, arrive, disappear, exist, become, seem, belong</em>. To put such an event in a passive-friendly shape, change the verb: <em>the flooding <b>was caused</b> by heavy rain</em>.',
                  'Verbs with two objects (<em>give, send, offer, show, tell</em>) allow two passives, and news prefers the person: <em>Families <b>were given</b> food parcels</em>. But <em>explain, describe, suggest, say, report</em> need <em>to</em> before the person, so the person cannot be the subject: <em>The plan <b>was explained to</b> residents</em>, not <s>Residents were explained</s>.',
                  'Finally, some <em>be</em> + V3 forms describe a state: <em>the village <b>is located</b> upstream</em>, <em>roads <b>were submerged</b> for days</em>, <em>residents <b>are worried</b></em>. They are correct as they stand. Do not force a <em>by</em>-phrase or a continuous form onto them; read them as adjectives.'
                ],
                simple: [
                  'No object → no passive: <em>the water subsided</em> (never <s>was subsided</s>).',
                  '<em>give / send / offer</em>: the person can be the subject. <em>explain / say / suggest</em>: the person needs <em>to</em>.',
                  '<em>is located, is submerged, is interested</em>: states, no agent needed.'
                ],
                examples: [
                  { s: 'Floodwaters slowly <b>subside</b> in the capital.', g: 'active only: no object to promote.' },
                  { s: 'Families <b>were given</b> food parcels at the shelter.', g: 'two-object verb, person as subject.' },
                  { s: 'The dam <b>is located</b> 100 km upstream.', g: 'a state; no event, no agent.' }
                ]
              } }
          ],
          check: { name: 'Level check · Reduced, reported and restricted' } }
      ]
    },
    wordsStage: {
      id: 'u5w', code: 'Unit 5 · Words in Action', art: 'lexicon', cefr: 'B1–C1',
      name: 'Fifteen flood words',
      blurb: 'evacuate, submerged, inundate, displaced, aftermath, devastate, resilient, mitigate, exacerbate, prolonged, unprecedented, discharge, relief, subside, trying times.',
      levels: [
        { id: 'u5w1', n: 1, name: 'Meaning', cefr: 'B1', blurb: 'Closest synonym, the gap in a sentence, the picture behind the word.',
          modules: [
            { id: 'u5w1s1', name: 'Words 1–5: evacuate … aftermath', cefr: 'B1', tags: ['u5-words-a'], levels: ['B1', 'B1+'], kinds: ['meaning'] },
            { id: 'u5w1s2', name: 'Words 6–10: devastate … prolonged', cefr: 'B1', tags: ['u5-words-b'], levels: ['B1', 'B1+'], kinds: ['meaning'] },
            { id: 'u5w1s3', name: 'Words 11–15: unprecedented … trying times', cefr: 'B1', tags: ['u5-words-c'], levels: ['B1', 'B1+'], kinds: ['meaning'] }
          ],
          check: { name: 'Level check · Meaning' } },
        { id: 'u5w2', n: 2, name: 'Word family and collocation', cefr: 'B2', blurb: 'The noun, the verb, the adjective — and the words that sit next to each one.',
          modules: [
            { id: 'u5w2s1', name: 'Words 1–5 in their families', cefr: 'B2', tags: ['u5-words-a'], levels: ['B2', 'B2+'], kinds: ['family'] },
            { id: 'u5w2s2', name: 'Words 6–10 in their families', cefr: 'B2', tags: ['u5-words-b'], levels: ['B2', 'B2+'], kinds: ['family'] },
            { id: 'u5w2s3', name: 'Words 11–15 in their families', cefr: 'B2', tags: ['u5-words-c'], levels: ['B2', 'B2+'], kinds: ['family'] }
          ],
          check: { name: 'Level check · Family and collocation' } },
        { id: 'u5w3', n: 3, name: 'Words in the passive', cefr: 'C1', blurb: 'The fifteen words inside real flood sentences, in the unit grammar.',
          modules: [
            { id: 'u5w3s1', name: 'Words 1–5 in context', cefr: 'C1', tags: ['u5-words-a'], levels: ['B2+', 'C1'], kinds: ['context'] },
            { id: 'u5w3s2', name: 'Words 6–10 in context', cefr: 'C1', tags: ['u5-words-b'], levels: ['B2+', 'C1'], kinds: ['context'] },
            { id: 'u5w3s3', name: 'Words 11–15 in context', cefr: 'C1', tags: ['u5-words-c'], levels: ['B2+', 'C1'], kinds: ['context'] }
          ],
          check: { name: 'Level check · Words in context' } }
      ]
    },
    /* Exit tickets (one per teaching lesson) and Monday spiral sets. */
    exits: [
      { id: 'u5-x1', lesson: 1, name: 'L1 · Passive form and use' },
      { id: 'u5-x2', lesson: 2, name: 'L2 · The passive in all tenses' },
      { id: 'u5-x3', lesson: 3, name: 'L3 · Newsroom Desk' },
      { id: 'u5-x4', lesson: 4, name: 'L4 · Modal passive, infinitives and gerunds' },
      { id: 'u5-x5', lesson: 5, name: 'L5 · Flood Response Planner' },
      { id: 'u5-x6', lesson: 6, name: 'L6 · Reduced relatives and the impersonal passive' },
      { id: 'u5-x7', lesson: 7, name: 'L7 · Production day' },
      { id: 'u5-x8', lesson: 8, name: 'L8 · Unit 5 review' }
    ],
    spirals: [
      { id: 'u5-sp2', lesson: 2, name: 'Monday spiral · 2 Nov' },
      { id: 'u5-sp4', lesson: 4, name: 'Monday spiral · 9 Nov' },
      { id: 'u5-sp6', lesson: 6, name: 'Monday spiral · 16 Nov' },
      { id: 'u5-sp8', lesson: 8, name: 'Monday spiral · 23 Nov' }
    ]
  },

  /* ======================================================================= */
  6: {
    unit: 6, name: 'Thailand Welcomes the World', short: 'U6',
    lessons: [10, 11, 12, 13, 14],
    words: {
      a: ['amenities', 'complimentary', 'hospitality', 'nostalgic', 'sarcastic'],
      b: ['skeptical', 'heritage', 'etiquette', 'gig economy', 'bespoke'],
      c: ['cater to', 'ambivalent', 'courteous', 'attire', 'live up to']
    },
    triage: { name: 'Unit 6 Triage', minutes: 20, total: 20,
      blurb: 'Twenty questions on causatives, verb patterns and the tone of reviews. What you miss becomes your checklist.' },
    unitCheck: { name: 'Unit 6 Unit Check', minutes: 20, total: 20,
      blurb: 'Test format: 5 vocabulary, 5 cloze, 5 error identification, 5 closest in meaning, in hotel ads, reviews and etiquette notices.' },
    grammar: {
      id: 'u6g', code: 'Unit 6 · Grammar Ladder', art: 'stack', cefr: 'B1–C1',
      name: 'Causatives and verb patterns',
      blurb: 'The suit was made / He had the suit made; have sb do and get sb to do; be made to; allow … to and prevent … from; need doing.',
      levels: [
        { id: 'u6g1', n: 1, name: 'Plain passive or causative?', cefr: 'B1+',
          blurb: 'The pool was cleaned, or the hotel had the pool cleaned: same job, different meaning.',
          modules: [
            { id: 'u6g1s1', name: 'The suit was made / He had the suit made', cefr: 'B1+',
              tags: ['causative-have'], levels: ['B1', 'B1+'],
              theory: {
                key: 'The plain passive reports the job; have + object + V3 says the subject arranged for someone else to do it.',
                body: [
                  '<em>The suit <b>was made</b> in Bangkok</em>: a passive, reporting a job. <em>He <b>had the suit made</b> in Bangkok</em>: a causative — he arranged it, a tailor did it, and the tailor is not named. Both end in V3; the difference is who the sentence is about.',
                  'The three slots are <em>have</em> · object · V3, and the tense lives in <em>have</em>: <em>has the rooms cleaned</em> daily, <em>had the lobby repainted</em> last year, <em>is having the pool resurfaced</em>. The object sits between <em>have</em> and the participle; nothing else goes there.',
                  'Do not confuse <em>I had my hair cut</em> (someone cut it) with the past perfect <em>I\'d cut my hair</em> (I did). The object in the middle is the signal.'
                ],
                simple: [
                  '<em>The room was cleaned</em> = someone cleaned it. <em>I had the room cleaned</em> = I asked for it to be done.',
                  '<em>have</em> + thing + V3. Change <em>have</em> for the tense.'
                ],
                examples: [
                  { s: 'The lobby <b>was repainted</b> last year.', g: 'plain passive: a job was done.' },
                  { s: 'The owners <b>had the lobby repainted</b> last year.', g: 'causative: the owners arranged it.' },
                  { s: 'Guests can <b>have breakfast delivered</b> to the room.', g: 'modal + have + object + V3.' }
                ]
              } },
            { id: 'u6g1s2', name: 'get something done; a bad experience: had their bags stolen', cefr: 'B1+',
              tags: ['causative-have'], levels: ['B1+', 'B2'],
              theory: {
                key: 'get + object + V3 is the informal twin of have; the same pattern also reports something bad that happened to the subject.',
                body: [
                  '<em>We <b>got the air conditioning fixed</b> in an hour</em>. <em>Get</em> + object + V3 means the same as <em>have</em>, in a more spoken register — the one you hear in reviews and at the front desk.',
                  'The same shape has a second sense: something was done <em>to</em> the subject. <em>Two guests <b>had their bags stolen</b> from the lobby</em>; <em>she <b>got her passport confiscated</b></em>. Nobody arranged it; the pattern simply keeps the victim as the subject.',
                  'Questions and negatives use <em>do</em>: <em>Did you have it fixed?</em> <em>We didn\'t get it repaired</em>. Not <s>Had you it fixed?</s> — <em>have</em> here is an ordinary verb.'
                ],
                simple: [
                  '<em>get</em> + thing + V3 = <em>have</em> + thing + V3, less formal.',
                  'A bad experience: <em>had my phone stolen</em> — it happened to me.'
                ],
                examples: [
                  { s: 'We <b>got the air conditioning fixed</b> in an hour.', g: 'service, informal.' },
                  { s: 'Two guests <b>had their bags stolen</b> from the lobby.', g: 'bad experience: it happened to them.' },
                  { s: '<b>Did</b> you <b>have</b> the room <b>cleaned</b> today?', g: 'question with <em>do</em>.' }
                ]
              } },
            { id: 'u6g1s3', name: 'Which one? Reading the difference in ads and reviews', cefr: 'B2',
              tags: ['causative-have', 'form-tense'], levels: ['B1+', 'B2'],
              theory: {
                key: 'Choose by the subject: a job reported about a thing is a passive; a person who arranged (or suffered) it is a causative.',
                body: [
                  'A hotel ad says <em>Rooms <b>are cleaned</b> daily</em> — the room is the subject, the job is the news. A review says <em>We <b>had our room cleaned</b> twice a day</em> — the guests are the subject, and the service done for them is the point. Same job, two sentences, two meanings.',
                  'The causative never appears without its object between <em>have/get</em> and V3. If you see <em>have</em> + V3 with nothing in between, it is the present perfect: <em>They <b>have cleaned</b> the room</em> (active) or <em>The room <b>has been cleaned</b></em> (passive).',
                  'In a text-completion item, read the subject and look for an object after <em>have</em>. Subject receives, no object → passive. Subject arranges, object in the middle → causative.'
                ],
                simple: [
                  'Thing as subject → passive: <em>Rooms are cleaned daily</em>.',
                  'Person + <em>have</em> + thing + V3 → causative: <em>We had our room cleaned</em>.'
                ],
                examples: [
                  { s: 'Towels <b>are changed</b> every morning.', g: 'passive: an ad reporting the service.' },
                  { s: 'We <b>had our towels changed</b> every morning.', g: 'causative: the guests had it done.' },
                  { s: 'The staff <b>have changed</b> the towels already.', g: 'present perfect active — no object between <em>have</em> and V3.' }
                ]
              } }
          ],
          check: { name: 'Level check · Plain passive or causative?' } },

        { id: 'u6g2', n: 2, name: 'Naming the doer', cefr: 'B2',
          blurb: 'have the porter carry it, get the manager to call, be made to wait, be allowed to leave.',
          modules: [
            { id: 'u6g2s1', name: 'have sb do: the doer is named, no to', cefr: 'B2',
              tags: ['causative-person'], levels: ['B1+', 'B2'],
              theory: {
                key: 'have + person + bare verb gives an instruction to a named doer.',
                body: [
                  '<em>The manager <b>had the porter carry</b> our bags upstairs</em>. When the doer is named, <em>have</em> takes the person and then the bare verb — no <em>to</em>, no <em>-ing</em>.',
                  'Compare the two causatives with <em>have</em>: <em>had the bags carried</em> (doer not named, V3) and <em>had the porter carry the bags</em> (doer named, bare verb). The grammar after the object tells you which one you are reading.',
                  'This is the formal, "I am in charge" pattern of hotels, hospitals and offices: <em>I\'ll have reception call you a taxi</em>. In speech the next module\'s <em>get</em> is more common.'
                ],
                simple: [
                  '<em>have</em> + person + verb (no <em>to</em>): <em>I had the porter carry the bags</em>.',
                  '<em>have</em> + thing + V3: <em>I had the bags carried</em>.'
                ],
                examples: [
                  { s: 'The manager <b>had the porter carry</b> our bags upstairs.', g: 'named doer, bare verb.' },
                  { s: 'I\'ll <b>have reception call</b> you a taxi.', g: 'instruction through a named doer.' },
                  { s: 'We <b>had the bags carried</b> upstairs.', g: 'doer not named: back to V3.' }
                ]
              } },
            { id: 'u6g2s2', name: 'get sb to do: persuade, and always with to', cefr: 'B2',
              tags: ['causative-person'], levels: ['B2', 'B2+'],
              theory: {
                key: 'get + person + to-infinitive means persuade or cause someone to do something; the to never drops.',
                body: [
                  '<em>We <b>got the manager to call</b> the airline for us</em>. <em>Get</em> + person + <em>to</em> + verb: the subject persuaded or arranged for a named person to act, often with some effort.',
                  'The <em>to</em> is the whole difference from <em>have</em>: <em>had the manager call</em> (instruction, bare verb) versus <em>got the manager to call</em> (persuasion, <em>to</em>). Dropping it, <s>got the manager call</s>, is the most frequent error in this family.',
                  'And with a thing as object, <em>get</em> goes back to V3: <em>got the key replaced</em>. Person → <em>to</em> + verb; thing → V3.'
                ],
                simple: [
                  '<em>get</em> + person + <em>to</em> + verb: <em>I got my friend to help</em>.',
                  '<em>get</em> + thing + V3: <em>I got the key replaced</em>.'
                ],
                examples: [
                  { s: 'We <b>got the manager to call</b> the airline for us.', g: 'persuade: person + <em>to</em>.' },
                  { s: 'The tour leader <b>got everyone to remove</b> their shoes.', g: 'cause a named group to act.' },
                  { s: 'She <b>got her key card replaced</b> at reception.', g: 'thing as object: V3.' }
                ]
              } },
            { id: 'u6g2s3', name: 'make and let: made us wait → were made to wait; let → be allowed to', cefr: 'B2+',
              tags: ['causative-person'], levels: ['B2', 'B2+', 'C1'],
              theory: {
                key: 'make + person + bare verb in the active becomes be made to + verb in the passive; let has no passive at all.',
                body: [
                  '<em>The hotel <b>made us wait</b> an hour for the room</em>: <em>make</em> + person + bare verb. Turn it round and the <em>to</em> appears: <em>We <b>were made to wait</b> an hour</em>. Only in the passive, and never <s>were made wait</s>.',
                  '<em>Let</em> works the same way in the active — <em>the staff <b>let us leave</b> our bags</em> — but it has no passive form. The passive idea uses <em>be allowed to</em>: <em>We <b>were allowed to leave</b> our bags</em>. <s>Were let leave</s> and <s>were let to leave</s> do not exist.',
                  'In reviews these two patterns carry the complaint or the praise: <em>made to pay twice</em>, <em>not allowed to use the pool</em>. In a text-completion item the clue is the passive <em>be</em> before the gap.'
                ],
                simple: [
                  'Active: <em>made us wait</em> (no <em>to</em>). Passive: <em>we were made to wait</em> (with <em>to</em>).',
                  '<em>let</em> has no passive → use <em>be allowed to</em>.'
                ],
                examples: [
                  { s: 'The hotel <b>made us wait</b> an hour for the room.', g: 'active: make + person + bare verb.' },
                  { s: 'We <b>were made to wait</b> an hour for the room.', g: 'passive: be made + to-infinitive.' },
                  { s: 'Guests <b>are not allowed to use</b> the pool after 10 p.m.', g: 'the passive of <em>let</em>.' }
                ]
              } }
          ],
          check: { name: 'Level check · Naming the doer' } },

        { id: 'u6g3', n: 3, name: 'Verb patterns and tone', cefr: 'C1',
          blurb: 'allow … to, prevent … from, need doing — and the words that give a review its tone.',
          modules: [
            { id: 'u6g3s1', name: 'allow / require / persuade sb to do', cefr: 'B2+',
              tags: ['object-pattern'], levels: ['B2', 'B2+'],
              theory: {
                key: 'allow, enable, require, persuade, encourage and expect take object + to-infinitive, and keep the to in the passive.',
                body: [
                  '<em>The temple <b>requires visitors to cover</b> their shoulders</em>. One family of verbs — <em>allow, enable, permit, require, persuade, encourage, expect, remind, advise</em> — takes an object and then <em>to</em> + verb.',
                  'In the passive the pattern survives intact: <em>Visitors <b>are required to cover</b> their shoulders</em>; <em>guests <b>are allowed to check in</b> early</em>. That is the shape of every etiquette notice and dress code you will read.',
                  'Do not borrow the other family\'s preposition: <s>allow them from entering</s>. If the verb permits or obliges, it takes <em>to</em>.'
                ],
                simple: [
                  '<em>allow / require / persuade</em> + person + <em>to</em> + verb.',
                  'Passive: <em>are required to</em>, <em>are allowed to</em>.'
                ],
                examples: [
                  { s: 'The temple <b>requires visitors to cover</b> their shoulders.', g: 'active: object + to-infinitive.' },
                  { s: 'Visitors <b>are required to cover</b> their shoulders.', g: 'passive keeps <em>to</em>.' },
                  { s: 'The guide <b>persuaded us to try</b> the street food.', g: 'persuade + person + to.' }
                ]
              } },
            { id: 'u6g3s2', name: 'prevent / ban sb from doing; need doing', cefr: 'C1',
              tags: ['object-pattern'], levels: ['B2+', 'C1'],
              theory: {
                key: 'prevent, stop, ban, discourage and prohibit take object + from + V-ing; need + V-ing means need to be + V3.',
                body: [
                  '<em>Rules <b>prevent guests from smoking</b> in the rooms</em>. The second family — <em>prevent, stop, ban, bar, discourage, prohibit, keep</em> — takes an object and then <em>from</em> + V-ing. In the passive: <em>Guests <b>are prevented from smoking</b></em>; <em>drones <b>were banned from flying</b></em> over the palace.',
                  '<em>Need</em> + V-ing is a passive in disguise: <em>The carpet <b>needs cleaning</b></em> = <em>needs to be cleaned</em>. Both are correct and mean the same; the <em>-ing</em> form is the one reviewers use. <em>Want</em> + object + V3 is its cousin: <em>I want the room cleaned by noon</em>.',
                  'Two families, two prepositions: permission and obligation take <em>to</em>; prevention takes <em>from</em> + <em>-ing</em>. A text-completion gap after one of these verbs is a vocabulary question as much as a grammar one — learn the verb with its pattern.'
                ],
                simple: [
                  '<em>prevent / stop / ban</em> + person + <em>from</em> + V-ing.',
                  '<em>The room needs cleaning</em> = <em>needs to be cleaned</em>.'
                ],
                examples: [
                  { s: 'Rules <b>prevent guests from smoking</b> in the rooms.', g: 'active: object + from + V-ing.' },
                  { s: 'Guests <b>are prevented from smoking</b> in the rooms.', g: 'passive keeps <em>from</em>.' },
                  { s: 'The lift <b>needs repairing</b>.', g: '= needs to be repaired.' }
                ]
              } },
            { id: 'u6g3s3', name: 'Tone and attitude words in reviews', cefr: 'C1',
              tags: ['tone-words'], levels: ['B2', 'B2+', 'C1'],
              theory: {
                key: 'The tone of a review is in its word choice: nostalgic, sarcastic, skeptical or ambivalent are read from signals, not stated.',
                body: [
                  'Four reviews of one hotel can agree on every fact and disagree on everything that matters. A <em>nostalgic</em> reviewer looks back warmly (<em>just as it was twenty years ago</em>). A <em>sarcastic</em> one praises in order to mock (<em>a "complimentary" breakfast of one slice of toast</em>). A <em>skeptical</em> one doubts the claims (<em>the "heritage" is a 2019 extension</em>). An <em>ambivalent</em> one cannot decide (<em>charming, if you forgive the plumbing</em>).',
                  'Read for the signals: inverted commas around a claim, praise that is too strong to be true, <em>used to</em> and <em>once</em>, hedges such as <em>if</em> and <em>I suppose</em>, a compliment followed by <em>but</em>. The tone word in a TCAS reading question is answered by pointing at one of these.',
                  'The Visitor\'s Brief asks you to write a review in an assigned tone and a manager\'s reply that stays <em>courteous</em> whatever the tone. Both are grammar tasks as well as vocabulary ones: the causatives and verb patterns of this unit are the reviewer\'s evidence.'
                ],
                simple: [
                  'nostalgic = warm about the past · sarcastic = says the opposite to mock · skeptical = doesn\'t believe it · ambivalent = can\'t decide.',
                  'Find the giveaway word before you name the tone.'
                ],
                examples: [
                  { s: 'The lobby is just as it was in 2005 — and I mean that kindly.', g: 'nostalgic.' },
                  { s: 'A "complimentary" breakfast of one slice of toast. Generous.', g: 'sarcastic: praise that means the opposite.' },
                  { s: 'Lovely staff, awful plumbing. Would I return? Possibly.', g: 'ambivalent.' }
                ]
              } }
          ],
          check: { name: 'Level check · Verb patterns and tone' } }
      ]
    },
    wordsStage: {
      id: 'u6w', code: 'Unit 6 · Words in Action', art: 'lexicon', cefr: 'B1–C1',
      name: 'Fifteen hospitality words',
      blurb: 'amenities, complimentary, hospitality, nostalgic, sarcastic, skeptical, heritage, etiquette, gig economy, bespoke, cater to, ambivalent, courteous, attire, live up to.',
      levels: [
        { id: 'u6w1', n: 1, name: 'Meaning', cefr: 'B1', blurb: 'Closest synonym and the gap in an ad or a review.',
          modules: [
            { id: 'u6w1s1', name: 'Words 1–5: amenities … sarcastic', cefr: 'B1', tags: ['u6-words-a'], levels: ['B1', 'B1+'], kinds: ['meaning'] },
            { id: 'u6w1s2', name: 'Words 6–10: skeptical … bespoke', cefr: 'B1', tags: ['u6-words-b'], levels: ['B1', 'B1+'], kinds: ['meaning'] },
            { id: 'u6w1s3', name: 'Words 11–15: cater to … live up to', cefr: 'B1', tags: ['u6-words-c'], levels: ['B1', 'B1+'], kinds: ['meaning'] }
          ],
          check: { name: 'Level check · Meaning' } },
        { id: 'u6w2', n: 2, name: 'Word family and collocation', cefr: 'B2', blurb: 'Nouns, adjectives, particles and the words beside them.',
          modules: [
            { id: 'u6w2s1', name: 'Words 1–5 in their families', cefr: 'B2', tags: ['u6-words-a'], levels: ['B2', 'B2+'], kinds: ['family'] },
            { id: 'u6w2s2', name: 'Words 6–10 in their families', cefr: 'B2', tags: ['u6-words-b'], levels: ['B2', 'B2+'], kinds: ['family'] },
            { id: 'u6w2s3', name: 'Words 11–15 in their families', cefr: 'B2', tags: ['u6-words-c'], levels: ['B2', 'B2+'], kinds: ['family'] }
          ],
          check: { name: 'Level check · Family and collocation' } },
        { id: 'u6w3', n: 3, name: 'Words in ads, reviews and notices', cefr: 'C1', blurb: 'The fifteen words inside the texts the midterm uses.',
          modules: [
            { id: 'u6w3s1', name: 'Words 1–5 in context', cefr: 'C1', tags: ['u6-words-a'], levels: ['B2+', 'C1'], kinds: ['context'] },
            { id: 'u6w3s2', name: 'Words 6–10 in context', cefr: 'C1', tags: ['u6-words-b'], levels: ['B2+', 'C1'], kinds: ['context'] },
            { id: 'u6w3s3', name: 'Words 11–15 in context', cefr: 'C1', tags: ['u6-words-c'], levels: ['B2+', 'C1'], kinds: ['context'] }
          ],
          check: { name: 'Level check · Words in context' } }
      ]
    },
    exits: [
      { id: 'u6-x10', lesson: 10, name: 'L10 · Passive vs causative' },
      { id: 'u6-x11', lesson: 11, name: 'L11 · have sb do, be made to, tone words' },
      { id: 'u6-x12', lesson: 12, name: 'L12 · Object verb patterns; need doing' },
      { id: 'u6-x13', lesson: 13, name: 'L13 · Verb-pattern clinic' }
    ],
    spirals: [
      { id: 'u6-sp10', lesson: 10, name: 'Monday spiral · 30 Nov' },
      { id: 'u6-sp12', lesson: 12, name: 'Monday spiral · 7 Dec' },
      { id: 'u6-sp13', lesson: 13, name: 'Monday spiral · 14 Dec' }
    ]
  }
};

if (typeof module !== 'undefined') module.exports = UNIT_PLANS;
