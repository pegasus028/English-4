/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — lesson-levels.js
   The explanation for every lesson in the Stages tab at three reading levels:
   B1 · B2 · C1. student.js shows the level the student picks with the buttons
   on each lesson page (or in Settings); the Listen button reads that level
   aloud in Sonia's recorded voice (audio/lessons/, tools/make-lesson-audio.py).
   Every level teaches everything the lesson's questions test; only the English
   changes. Checked 29 Oct 2026: a blind reader answered all 198 questions
   correctly from each level's text alone.
   Shape: { subId: { B1: { key, body:[paragraph…], examples:[{s, g}…] }, B2, C1 } }
   Allowed tags: <em> <b> <strong> <s> (a struck-out wrong form, read as "…, wrong").
   After an edit: push — GitHub re-records the changed clips by itself.
   =========================================================================== */
window.E4_LESSON_LEVELS = {
 "u5g1s1": {
  "B1": {
   "key": "A passive is <strong>be</strong> plus the <strong>past participle</strong> (V3, the third form of the verb). Only <em>be</em> changes for the tense; the V3 never changes.",
   "body": [
    "Use the <strong>passive</strong> when the subject <strong>receives</strong> the action (something is done to it). A road cannot repair itself. A letter cannot write itself. So we say <em>the road <b>was repaired</b></em>. First ask: does the subject do the action, or receive it? If it receives it, use the passive.",
    "The passive has two parts. First comes a form of <em>be</em>: <em>am, is, are, was, were, has been, have been</em>. Then comes the V3. Only <em>be</em> shows the time. <em>Be</em> must also <strong>agree</strong> with the subject (match it). One thing takes <em>is</em> or <em>was</em>. Two or more things take <em>are</em> or <em>were</em>.",
    "Read the <strong>time words</strong> first. <em>Every week, every day, usually</em>: present simple, <em>is</em> or <em>are</em> plus V3. <em>Yesterday, last month, in 2019</em>: finished past time, so past simple, <em>was</em> or <em>were</em> plus V3. Do not use <em>has been</em> with finished past time. If a sentence has both kinds of time words, like <em>every morning last week</em>, the finished time wins: use the past simple. Words for this very moment, like <em>now, at the moment</em> or <em>Listen!</em>: present continuous, <em>is being</em> or <em>are being</em> plus V3. Latest news with no finished time: <em>has been</em> or <em>have been</em> plus V3.",
    "Many verbs are <strong>irregular</strong> (they do not add -ed). Learn all three forms: <em>build, built, built</em>; <em>make, made, made</em>; <em>give, gave, given</em>; <em>take, took, taken</em>; <em>write, wrote, written</em>. After <em>be</em>, always use the third form (V3), not the second form (V2). Write <em>was written</em>, not <s>was wrote</s>. There is no <s>builded</s>.",
    "Watch for four more mistakes. One: V3 with no <em>be</em> when the sentence has no other verb, like <s>The food delivered every day</s>. Two: <em>be</em> plus the base form, like <s>are deliver</s>. Three: <em>be</em> plus -ing, like <em>were delivering</em>. That is active: it means the subject did the delivering. Four: <em>has</em> or <em>have</em> plus V3 without <em>been</em>, like <em>have delivered</em>. That is active too.",
    "When two passive verbs share one subject, you can say <em>be</em> only once: <em>the bags <b>were filled</b> and carried to the river</em>. But the first verb still needs <em>be</em>."
   ],
   "examples": [
    {
     "s": "Rice and water <b>are delivered</b> to the shelter every morning.",
     "g": "Present simple: a regular action. Plural subject, so <em>are</em>."
    },
    {
     "s": "The canal near Mint’s house <b>was cleaned</b> last Friday.",
     "g": "Past simple: <em>last Friday</em> is finished time."
    },
    {
     "s": "At the moment, the flooded cars <b>are being pulled</b> out of the water.",
     "g": "Present continuous: happening now, so <em>are being</em> plus V3."
    },
    {
     "s": "Twenty provinces <b>have been affected</b> by the floods.",
     "g": "Present perfect: the news is still true now."
    },
    {
     "s": "The first warning <b>was written</b> in Thai and English.",
     "g": "Irregular verb: write, wrote, written. V3 after <em>be</em>."
    }
   ]
  },
  "B2": {
   "key": "A passive is <em>be</em> plus the past participle (V3). The tense and agreement are carried by <em>be</em>; the participle never changes.",
   "body": [
    "Choose the passive when the subject is the <strong>receiver</strong> of the action, not the doer. A road, a letter or a phone cannot perform the verb, so the sentence needs <em>be</em> plus V3. The first check is always: does the subject do this, or is it done to the subject?",
    "News on 26 September said that all 50 Bangkok districts <b>were declared</b> disaster areas. Later reports said that thousands of people <b>had been evacuated</b> and that many households <b>had been affected</b>. Different tenses, one shape: a form of <em>be</em>, then V3. <em>Be</em> also agrees with the subject: <em>was</em> or <em>is</em> for a singular subject, <em>were</em> or <em>are</em> for a plural one.",
    "Let the <strong>time marker</strong> choose the tense of <em>be</em>. Habits and regular events (<em>every week, every rainy season</em>) take the present simple: <em>are checked</em>. Finished past time (<em>yesterday, last month, in 2019</em>) takes the past simple: <em>was checked</em>; the present perfect clashes with a finished time. When a frequency phrase sits inside a finished period (<em>every morning last week</em>), the finished period decides: past simple. An action in progress now (<em>now, at the moment, Listen!</em>) takes the present continuous: <em>is being checked</em>. The latest news with no finished time takes the present perfect: <em>has been checked</em>.",
    "After <em>be</em> you need the past participle, not the past simple. Irregular verbs are where this goes wrong: <em>build, built, built</em>; <em>give, gave, given</em>; <em>take, took, taken</em>; <em>make, made, made</em>; <em>write, wrote, written</em>. So <em>was written</em>, not <s>was wrote</s>; and never invent a regular form like <s>builded</s>.",
    "Four errors to rule out: a bare V3 when the clause has no other finite verb (<s>The meals delivered every day</s>); <em>be</em> plus the base form (<s>is deliver</s>); <em>be</em> plus -ing, which makes the subject the doer (<em>were delivering</em>); V2 in place of V3 (<s>was wrote</s>); and a perfect without <em>been</em> (<em>have delivered</em>), which is active. In a list of two passive verbs, <em>be</em> can be shared: <em>the relief boxes <b>were packed</b> at the school and delivered by noon</em>."
   ],
   "examples": [
    {
     "s": "Floodwater <b>is pumped</b> out of the city every rainy season.",
     "g": "Present simple passive: a regular, general fact."
    },
    {
     "s": "All 50 Bangkok districts <b>were declared</b> disaster areas on 26 September.",
     "g": "Past simple passive: one finished, dated event."
    },
    {
     "s": "At the moment, a broken-down bus <b>is being towed</b> away.",
     "g": "Present continuous passive: in progress now."
    },
    {
     "s": "Free meals <b>have been served</b> at the temple for families who lost their homes.",
     "g": "Present perfect passive: recent news, no finished time."
    },
    {
     "s": "The first warning <b>was written</b> in Thai and English.",
     "g": "Irregular: write, wrote, written. V3, not V2, after <em>be</em>."
    }
   ]
  },
  "C1": {
   "key": "A passive is <em>be</em> plus V3. Tense, aspect and agreement all live in <em>be</em>; the participle is fixed, so every error is either the wrong <em>be</em> or the wrong participle.",
   "body": [
    "The passive is chosen when the grammatical subject is the <strong>patient</strong> of the action (the receiver), typically because the doer is unknown, obvious or beside the point. News on 26 September: <em>All 50 Bangkok districts <b>were declared</b> disaster areas</em>. Later: <em>almost 4,900 people <b>had been evacuated</b></em>, and around 329,000 households <b>had been affected</b>. Three tenses, one shape.",
    "The tense lives in <em>be</em>. <em>Is declared</em>: present simple, for routines, general facts and headlines. <em>Was declared</em>: past simple, for a finished event anchored by a past time marker. <em>Has been declared</em>: present perfect, the news tense for ‘the latest’, which cannot co-occur with a finished time such as <em>last month</em> or <em>in 2019</em>; a frequency adverbial inside a finished period (<em>every morning last week</em>) still takes the past simple. <em>Is being declared</em>: present continuous, for something visibly in progress (<em>now, at the moment</em>). Agreement follows the head noun: singular <em>was, is, has</em>; plural <em>were, are, have</em>.",
    "Read the time marker first, choose the tense and number of <em>be</em>, then add V3. That order prevents the four classic errors: a bare V3 standing in for a finite verb (<s>The meals delivered every day</s>), <em>be</em> plus the base form (<s>is deliver</s>), <em>be</em> plus -ing, which turns the subject into the doer (<em>were delivering</em>), and the past simple where the participle is required (<s>was wrote</s>). A perfect without <em>been</em> (<em>have delivered</em>) is simply an active perfect.",
    "Irregular participles need to be known cold: <em>built, made, given, taken, written, run, done, seen</em>. Thai learners often regularise them, but there is no <s>builded</s> or <s>taked</s>. When two passive verbs share one subject, <em>be</em> is usually stated once and understood with the second: <em>the relief boxes <b>were packed</b> at the school and delivered by noon</em>. The first verb still needs its <em>be</em>; only the second may drop it."
   ],
   "examples": [
    {
     "s": "Floodwater <b>is pumped</b> out of the city every rainy season.",
     "g": "Present simple: a routine; the pumpers are obvious."
    },
    {
     "s": "All 50 Bangkok districts <b>were declared</b> disaster areas on 26 September.",
     "g": "Past simple: a dated, finished event."
    },
    {
     "s": "At the moment, a broken-down bus <b>is being towed</b> away.",
     "g": "Present continuous: in progress at the moment of speaking."
    },
    {
     "s": "Twenty provinces <b>have been affected</b> by the floods.",
     "g": "Present perfect: current relevance, no finished time marker."
    },
    {
     "s": "The relief boxes <b>were packed</b> at the school and delivered by noon.",
     "g": "Coordinated passives: <em>were</em> is shared by both participles."
    }
   ]
  }
 },
 "u5g1s2": {
  "B1": {
   "key": "Continuous passives use <strong>being</strong>; perfect passives use <strong>been</strong>. Both still end with the V3.",
   "body": [
    "The <strong>continuous passive</strong> shows an action <strong>in progress</strong> (happening at that moment). The shape is <em>be</em>, then <em>being</em>, then V3. Now: <em>is being</em> or <em>are being</em> plus V3. At a moment in the past: <em>was being</em> or <em>were being</em> plus V3. If the rest of the sentence is about the past, the action in progress is past too: <em>The boats <b>were being repaired</b> when the second storm arrived</em>.",
    "The <strong>present perfect passive</strong> is <em>has been</em> or <em>have been</em> plus V3. Use it with <em>since</em> (a starting point, like <em>since June</em>) and <em>for</em> (a length of time). These words join the past to now, so do not use the past simple with them. One thing takes <em>has</em>; many things take <em>have</em>. Read the whole subject: <em>the pump at the market</em> is one pump.",
    "The <strong>past perfect passive</strong> is <em>had been</em> plus V3. Use it for an action finished <strong>before</strong> another moment in the past. Look for <em>by the time</em> plus a past verb, or <em>by</em> plus a past date. Use <em>had</em>, not <em>have</em>, because that moment is in the past: <em>By the time Ploy got home, her books <b>had been moved</b> upstairs</em>.",
    "Don’t forget <em>been</em>. Without it the verb becomes <strong>active</strong> (the subject does the action). <em>The family has moved</em>: the family did it. <em>The family has been moved</em>: somebody moved them. In the same way, <em>be</em> plus -ing (<em>were moving</em>) makes the subject the doer. And every passive ends with the V3, never the base form (<s>were move</s>).",
    "Some verbs, like <em>close</em> and <em>open</em>, are quick actions. A quick action cannot continue for days. So with <em>since</em> or <em>for</em>, talk about the <strong>state</strong> (the situation) that continues: <em>The shop <b>has been closed</b> for a week</em>, not <s>The shop has closed for a week</s>. Also learn <em>be left without</em> something: it means you have no water, power or food after something happened. It works in any tense: <em>is left, was left, has been left</em>.",
    "Two very rare forms exist: <em>has been being built</em> and <em>will be being repaired</em>. You will not need them."
   ],
   "examples": [
    {
     "s": "Relief <b>is still being delivered</b> to families in Nonthaburi.",
     "g": "Present continuous passive: happening now."
    },
    {
     "s": "While the bridge <b>was being inspected</b>, the buses waited on the other side.",
     "g": "Past continuous passive: a background action in the past."
    },
    {
     "s": "Since June, two new pumping stations <b>have been built</b> in our district.",
     "g": "Present perfect: from June until now; plural, so <em>have</em>."
    },
    {
     "s": "By the time the water went down, Fern’s school <b>had been closed</b> for two weeks.",
     "g": "Past perfect: before a past moment."
    },
    {
     "s": "After the storm, the whole village <b>was left without</b> clean water.",
     "g": "Past simple passive: <em>be left without</em> means it had none."
    }
   ]
  },
  "B2": {
   "key": "Continuous passives add <em>being</em>; perfect passives add <em>been</em>. Choose the form from the time marker and make <em>be</em> agree with the subject.",
   "body": [
    "The continuous passive (<em>be</em> plus <em>being</em> plus V3) shows an action in progress. <em>Relief <b>is still being delivered</b></em> describes now; <em>the levels <b>were being monitored</b></em> describes a moment in the past. In a sentence with <em>while</em> or <em>when</em>, the two clauses share the same time frame: if the other clause is past, the passive background action is past continuous too, <em>was being</em> or <em>were being</em>.",
    "The present perfect passive (<em>has been</em> or <em>have been</em> plus V3) links the past to now, so it is the natural choice with <em>since</em> plus a starting point and <em>for</em> plus a period. The past simple does not fit with <em>since</em>. Agreement matters: find the head noun (<em>the tunnel</em>, <em>the families</em>) and choose <em>has</em> or <em>have</em> from it.",
    "The past perfect passive (<em>had been</em> plus V3) places one action before another past moment, typically signalled by <em>by the time</em> plus a past simple verb, or <em>by</em> plus a past date. <em>Have been</em> would wrongly connect the action to now.",
    "Leaving out <em>been</em> changes the voice: <em>has moved</em> or <em>had flooded</em> is active, so the subject becomes the doer and the verb needs an object. Likewise <em>be</em> plus -ing (<em>were moving</em>) makes the subject perform the action. And every passive ends in V3, never the base form (<s>were move</s>).",
    "Watch quick-action verbs like <em>close, open</em> and <em>leave</em>. The action is over in a moment, so it cannot last <em>since last week</em>; what lasts is the resulting state, expressed with a perfect passive: <em>the gym <b>has been closed</b> for ten days</em>, not <s>has closed for ten days</s>. <em>Be left without</em> describes a resulting lack, and it works in any tense: <em>is left, was left, has been left without</em> something.",
    "The perfect continuous passive (<em>has been being built</em>) and future continuous passive (<em>will be being repaired</em>) exist but are avoided; use the simple perfect or simple future."
   ],
   "examples": [
    {
     "s": "Relief <b>is still being delivered</b> to families in Nonthaburi.",
     "g": "Present continuous passive: in progress now."
    },
    {
     "s": "While the bridge <b>was being inspected</b>, buses waited on the other bank.",
     "g": "Past continuous passive matching a past background."
    },
    {
     "s": "Since the start of the rainy season, three new pumping stations <b>have been built</b>.",
     "g": "Present perfect with <em>since</em>; plural subject, <em>have</em>."
    },
    {
     "s": "By the time the water went down, Fern’s school <b>had been closed</b> for two weeks.",
     "g": "Past perfect: a state lasting up to a past moment."
    },
    {
     "s": "After the storm, the village <b>was left without</b> clean water for days.",
     "g": "Past simple passive describing the resulting lack."
    }
   ]
  },
  "C1": {
   "key": "Aspect in the passive is carried by <em>being</em> (continuous) and <em>been</em> (perfect); drop either and you change the meaning or the voice.",
   "body": [
    "<em>Relief <b>is still being delivered</b> to people forced from their homes</em>: present continuous passive, an action in progress now. <em>Discharges from the dam <b>were being increased</b></em>: past continuous, in progress at a past moment, which is why it often sets the background to another past action in a <em>while</em> or <em>when</em> sentence. The marker of a continuous passive is <em>being</em> between <em>be</em> and V3, and both clauses of such a sentence share one time frame.",
    "Perfect passives add <em>been</em>. The present perfect (<em>has</em> or <em>have been</em> plus V3) is required with <em>since</em> and <em>for</em> because they measure a period running up to now; agreement is with the head noun, not with the nearest noun. The past perfect (<em>had been</em> plus V3) locates completion before a past reference point, typically <em>by the time</em> plus past simple. The future perfect (<em>will have been reopened by Monday</em>) does the same for a future point.",
    "Without <em>been</em>, a perfect is active: <em>had flooded</em>, <em>have moved</em> and the like make the subject the agent and demand an object; <em>be</em> plus -ing does the same, and <em>be</em> plus a base form is not a passive at all. With non-durative verbs such as <em>close</em>, <em>open</em> or <em>leave</em>, a period adverbial measures the resulting state, not the event, so English uses the perfect passive (stative reading): <em>the gym <b>has been closed</b> for ten days</em>, not <s>has closed for ten days</s>. <em>Be left without</em> plus a noun reports a resulting deprivation (<em>left without power</em>, meaning having none), in any tense.",
    "Two forms exist but are avoided in writing: the perfect continuous passive (<em>has been being built</em>) and the future continuous passive (<em>will be being repaired</em>). Never choose them; prefer the simple perfect or the simple future."
   ],
   "examples": [
    {
     "s": "Relief <b>is still being delivered</b> to families in Nonthaburi.",
     "g": "Present continuous passive: ongoing now."
    },
    {
     "s": "While the bridge <b>was being inspected</b>, buses waited on the other bank.",
     "g": "Past continuous passive as a past background action."
    },
    {
     "s": "By 27 September, almost 4,900 people <b>had been evacuated</b>.",
     "g": "Past perfect passive: completed before a past date."
    },
    {
     "s": "The canal path <b>has been closed</b> for ten days.",
     "g": "Perfect passive of a state; <em>has closed for ten days</em> is impossible."
    },
    {
     "s": "The road <b>will have been reopened</b> by Monday.",
     "g": "Future perfect passive: complete before a future point."
    }
   ]
  }
 },
 "u5g1s3": {
  "B1": {
   "key": "Ask if the subject <strong>does</strong> or <strong>receives</strong> the action. Things can be doers. Use <strong>by</strong> only when the doer is new or important.",
   "body": [
    "Ask one question: does the subject <strong>do</strong> the action, or <strong>receive</strong> it? A thing can be a doer. <em>The storm <b>damaged</b> the roof</em> is active: the storm did it, and <em>the roof</em> is the <strong>object</strong> (the thing that receives the action). If an object comes straight after the verb, the verb is usually active. So don’t think ‘the subject is a thing, so it must be passive.’ And don’t put <em>be</em> in an active sentence: <s>The girl was cleaned the room</s>.",
    "The <strong>agent</strong> (the doer) comes after <strong>by</strong>: <em>the roof was damaged <b>by</b> the storm</em>. <em>By</em> can introduce a person, or a thing that caused the action, like a storm or a fire. No other small word can do this job. Words like <em>at, in, on, of</em> or <em>for</em> show other things, such as a place, a time or a reason.",
    "Most passives have <strong>no</strong> <em>by</em> phrase. Leave it out when the doer is unknown, obvious or not important. Never add <s>by people</s> or <s>by someone</s>: they tell the reader nothing. Also remember that a passive always needs <em>be</em>. A passive with no <em>be</em> is not correct English, and an empty doer only makes a sentence longer.",
    "Keep <em>by</em> when the doer is <strong>new or surprising</strong>, the real news: <em>The relief kitchen <b>was started by</b> a ninety-year-old grandmother</em>. A reader wants to know that. But <em>the fire was put out by firefighters</em> tells us nothing new, because firefighters always do that. Ask: would the reader be surprised by this doer? If not, drop the <em>by</em> phrase.",
    "After <em>known, seen, described, regarded</em>, a role, a name or a label (what something is called, or what it stands for) takes <strong>as</strong>, not <em>by</em>: <em>Ayutthaya is known <b>as</b> the old capital</em>. Use <em>by</em> only for the doer. No other small word gives the role.",
    "Learn these irregular verbs: <em>take, took, taken</em>; <em>run, ran, run</em>; <em>draw, drew, drawn</em>. After <em>be</em>, always use the third form, never the second (<s>was drew</s>). <em>Run</em> can mean manage (be in charge of): <em>the night market <b>was run</b> by Praew’s aunt for ten years</em>. Two forms make the subject the doer: <em>be</em> plus -ing, and <em>has</em> or <em>have</em> plus V3 without <em>been</em>."
   ],
   "examples": [
    {
     "s": "Extreme weather <b>inundated</b> the drainage system.",
     "g": "Active: the weather did it. The system is the object."
    },
    {
     "s": "Many canals <b>are blocked</b> with rubbish.",
     "g": "Passive with no <em>by</em>: who blocked them is unknown."
    },
    {
     "s": "The relief kitchen <b>was started by</b> a ninety-year-old grandmother.",
     "g": "<em>By</em> kept: a surprising doer."
    },
    {
     "s": "The night market <b>was run</b> by Praew’s aunt for ten years.",
     "g": "Run, ran, run: <em>is run</em>. The doer is useful news."
    },
    {
     "s": "Wat Arun is known <b>as</b> the Temple of Dawn.",
     "g": "<em>Known as</em> plus a name or role, not <em>by</em>."
    }
   ]
  },
  "B2": {
   "key": "Decide the voice by asking whether the subject does or receives the action; inanimate subjects can be doers. Include a <em>by</em>-phrase only when the agent is new or important.",
   "body": [
    "<em>Extreme weather <b>inundated</b> the drainage system</em> has an inanimate subject and an active verb, because the weather performed the action and <em>the drainage system</em> follows as the object. ‘The subject is a thing, so use the passive’ is not a rule. If a direct object follows the verb, it is active; and an active sentence never takes <em>be</em> before the main verb (<s>Someone was cleaned the room</s>).",
    "In a passive, the doer or cause is introduced by <em>by</em>: <em>knocked down <b>by</b> the wind</em>. No other preposition marks the agent; words like <em>at, in, of</em> and <em>for</em> express place, time, purpose or reason.",
    "Most passives carry no <em>by</em>-phrase at all, about four in five in real news. Drop it when the doer is unknown, obvious or unimportant, and never add empty agents like <s>by people</s> or <s>by someone</s>. A passive always keeps its <em>be</em>; only the agent is optional.",
    "Keep the agent when it is the news: surprising, new or essential to the meaning. <em>The relief kitchen <b>was started by</b> a ninety-year-old grandmother</em> earns its <em>by</em>-phrase; <em>the fire was put out by firefighters</em> does not, because the doer is predictable from the verb. Test it by asking whether a reader would be surprised.",
    "After <em>known, seen, regarded, described</em>, a role, label or symbol takes <em>as</em>: <em>Ayutthaya is known <b>as</b> the old capital</em>. <em>By</em> would introduce the people doing the seeing or knowing; no other preposition gives a role. Finally, check irregular participles: <em>take, took, taken</em>; <em>run, ran, run</em>; <em>draw, drew, drawn</em>. <em>Run</em> can mean manage: <em>the night market <b>was run</b> by Praew’s aunt</em>. Three forms are not passives: V3 with no <em>be</em>; <em>be</em> plus -ing, which makes the subject the doer; and <em>have</em> plus V3 without <em>been</em>, which is active."
   ],
   "examples": [
    {
     "s": "Extreme weather <b>inundated</b> the drainage system.",
     "g": "Active with a thing as doer; an object follows."
    },
    {
     "s": "Many canals <b>are blocked</b> with rubbish.",
     "g": "Agentless passive: the doer is unknown."
    },
    {
     "s": "The dam’s discharge figures <b>were released by</b> the Royal Irrigation Department.",
     "g": "Agent kept: the source is the news."
    },
    {
     "s": "The night market <b>was run</b> by Praew’s aunt for ten years.",
     "g": "<em>Run</em> meaning managed; irregular V3."
    },
    {
     "s": "Wat Arun is known <b>as</b> the Temple of Dawn.",
     "g": "Role or name after <em>known</em> takes <em>as</em>."
    }
   ]
  },
  "C1": {
   "key": "Voice is decided by the subject’s role, not its animacy; the agent is included only when it carries new or important information.",
   "body": [
    "<em>Extreme weather <b>inundated</b> the drainage system</em>: an inanimate subject with an active verb, because the weather is the causer and <em>the drainage system</em> occupies the object slot. The only question is whether the subject performs or undergoes the action, and a following direct object is decisive evidence for the active. Inserting <em>be</em> into such a clause (<s>Someone was cleaned the classroom</s>) produces neither voice.",
    "The agent or cause is introduced by <em>by</em> (<em>knocked down <b>by</b> the wind</em>); no other preposition can mark it. Yet most passives are agentless: corpus studies put the figure at around 80 per cent or more in news. The agent is omitted when it is unknown, obvious from the verb or irrelevant, and vague agents (<s>by people</s>, <s>by someone</s>) are always redundant. A passive without <em>be</em> fails on grammar; one with an empty agent fails on style.",
    "The agent earns its place through <strong>end-focus</strong>: English puts new information last, so a <em>by</em>-phrase is worth keeping when the doer is surprising or newsworthy (<em>started <b>by</b> a ninety-year-old grandmother</em>), and redundant when it is predictable from the verb (a fire put out by firefighters, a test marked by a teacher, meals served by waiters).",
    "After verbs of classification (<em>known, seen, regarded, described</em>), the complement naming a role or category takes <em>as</em>; <em>by</em> would introduce the perceivers, and no other preposition expresses the role. Irregular participles must be exact (<em>taken, run, drawn</em>, never the V2), and <em>run</em> often means managed. Note that an active perfect (<em>have</em> plus V3) or a progressive (<em>be</em> plus -ing) would recast the subject as the agent."
   ],
   "examples": [
    {
     "s": "Extreme weather <b>inundated</b> the drainage system.",
     "g": "Active: inanimate causer, object present."
    },
    {
     "s": "Many canals <b>are blocked</b> with rubbish.",
     "g": "Agentless: the doer is unknown and irrelevant."
    },
    {
     "s": "The dam’s discharge figures <b>were released by</b> the Royal Irrigation Department.",
     "g": "Agent as end-focus: the source is the news."
    },
    {
     "s": "The night market <b>was run</b> by Praew’s aunt for ten years.",
     "g": "Irregular participle <em>run</em>; informative agent."
    },
    {
     "s": "Wat Arun is known <b>as</b> the Temple of Dawn.",
     "g": "Classification verb plus <em>as</em> plus a name or role."
    }
   ]
  }
 },
 "u5g2s1": {
  "B1": {
   "key": "After a modal, the passive is <strong>be</strong> plus V3. For the past, it is <strong>have been</strong> plus V3.",
   "body": [
    "<strong>Modals</strong> are small verbs like <em>can, could, must, should, may, might, will</em>. After a modal, use the base form <em>be</em>, never <em>is</em> or <em>was</em>. Then add V3: <em>the pumps <b>can be fixed</b></em>, <em>the school <b>will be closed</b></em>. Use this for now or the future. If nothing comes after the verb and the subject receives the action, you need the passive, not the active. Also, modal plus <em>be</em> plus -ing (<em>could be cleaning</em>) is active: the subject is doing it.",
    "To talk about the <strong>past</strong>, use the modal, then <em>have been</em>, then V3: <em>could have been saved</em>. After a modal, always write <em>have</em>, never <em>had</em> or <em>has</em>. Don’t forget <em>been</em>. <em>Could have closed</em> is active (the subject closed something). <em>Could have been closed</em> is passive.",
    "Each modal has its own meaning. <em>Must</em>: it is necessary. <em>Should</em>: it is a good idea. <em>Can, could, may, might</em>: it is possible. <em>Must</em> is much stronger than <em>may</em> or <em>might</em>. So when you change an active sentence into a passive, keep the <strong>same modal</strong>. If the modal changes, for example from <em>should</em> to <em>can</em>, the meaning changes too. When you compare two sentences, look at the modal first.",
    "In the past, the modals mean this. <em>Could have been</em> plus V3: it was possible, but it did not happen. <em>Should have been</em> plus V3: it was the right thing, but it did not happen (a criticism). <em>Must have been</em> plus V3: I am almost sure it happened, because I can see the result (a confident guess). <em>May</em> or <em>might have been</em> plus V3: perhaps it happened. A past time phrase, or an <em>if</em> clause about the past, tells you to use the past form.",
    "To change active to passive: the object becomes the subject; keep the modal and the time; add <em>be</em> or <em>have been</em>; add V3; add <em>by</em> plus the doer if needed. <em>A careless driver could have caused the accident</em> becomes <em>The accident <b>could have been caused</b> by a careless driver</em>. Don’t swap the doer and the receiver.",
    "Common mistakes: <s>must cleaned</s>, <s>can be repair</s>, <s>should been checked</s>, <s>could had been</s>, <s>could being</s>, <s>could have be</s>. The right order is always: modal, then <em>be</em> or <em>have been</em>, then V3."
   ],
   "examples": [
    {
     "s": "More <b>must be done</b> to protect the city from floods.",
     "g": "Modal plus <em>be</em> plus V3: necessary, now or future."
    },
    {
     "s": "The canals <b>should be cleared</b> before the rainy season.",
     "g": "<em>Should</em>: a recommendation about the future."
    },
    {
     "s": "The traffic chaos <b>could have been avoided</b>.",
     "g": "Past: it was possible, but it did not happen."
    },
    {
     "s": "Mint’s phone has a new screen, so it <b>must have been repaired</b>.",
     "g": "<em>Must have been</em>: a confident guess about the past."
    },
    {
     "s": "The accident <b>could have been caused</b> by a careless driver.",
     "g": "Active to passive: same modal, same time."
    }
   ]
  },
  "B2": {
   "key": "Modal plus <em>be</em> plus V3 for the present and future; modal plus <em>have been</em> plus V3 for a judgement about the past. The modal itself carries the meaning, so it never changes in a transformation.",
   "body": [
    "<em>Critics say more <b>must be done</b> to mitigate future flooding</em>. After a modal, the passive is bare <em>be</em> plus V3: <em>should be repaired, can be pumped, will be reopened, might be extended</em>. When nothing follows the verb and the subject undergoes the action, the passive is required; an active such as <em>could close</em> would leave the verb without its object, and a progressive such as <em>could be closing</em> makes the subject the doer.",
    "For the past, the modal takes <em>have been</em> plus V3: <em>the canals <b>should have been cleared</b></em>. After a modal the auxiliary is always bare <em>have</em>, never <em>had</em>; and dropping <em>been</em> (<em>could have closed</em>) makes the subject the doer.",
    "The modal sets the meaning. <em>Could have been</em> plus V3: possible in the past but did not happen, often with an <em>if</em> clause about the past or a phrase saying what could have been different. <em>Should have been</em>: criticism. <em>Must have been</em>: deduction, a confident conclusion from present evidence, not obligation. <em>May</em> or <em>might have been</em>: a possibility. A past time phrase, or a condition about the past, rules out the present form <em>must be</em> or <em>could be</em>.",
    "In an active-to-passive transformation, only the voice changes: the object becomes the subject, the modal and the time stay identical, and the agent may follow <em>by</em>. <em>A careless driver could have caused the accident</em> becomes <em>The accident <b>could have been caused</b> by a careless driver</em>. Changing the modal, for example <em>should</em> (advisable) to <em>can</em> (possible), or <em>might</em> (possible) to <em>will</em> (certain), changes the meaning, even if the passive is perfectly formed; so does moving from a past form to a present one, or swapping doer and receiver.",
    "Every error is a missing or wrong slot in the sequence modal, <em>be</em> or <em>have been</em>, V3: <s>must evacuated</s>, <s>could be prevent</s>, <s>should been repaired</s>, <s>could had been</s>, <s>could have be</s>."
   ],
   "examples": [
    {
     "s": "More <b>must be done</b> to mitigate future flooding.",
     "g": "Obligation about the future."
    },
    {
     "s": "The embankment <b>should be raised</b> before next year.",
     "g": "Recommendation: modal plus <em>be</em> plus V3."
    },
    {
     "s": "The traffic chaos <b>could have been avoided</b>.",
     "g": "Past possibility that was not realised."
    },
    {
     "s": "Mint’s phone has a new screen, so it <b>must have been repaired</b>.",
     "g": "Deduction about the past from present evidence."
    },
    {
     "s": "The accident <b>could have been caused</b> by a careless driver.",
     "g": "Transformation keeps the same modal and time."
    }
   ]
  },
  "C1": {
   "key": "Modal plus <em>be</em> plus V3 for present and future reference; modal plus <em>have been</em> plus V3 for past reference. The modal encodes the speaker’s stance, so it is never altered when the voice changes.",
   "body": [
    "<em>Critics say more <b>must be done</b> to mitigate future flooding</em>. After a modal, the passive is bare <em>be</em> plus V3: <em>should be repaired, can be pumped, will be reopened, might be extended</em>. In a clause with no following object and a patient subject, the modal passive is the only grammatical option; an active (<em>could close</em>) or progressive (<em>could be closing</em>) recasts the subject as agent.",
    "For past reference the modal takes the perfect infinitive, <em>have been</em> plus V3: <em>the chaos <b>could have been avoided</b></em>. This is the form of retrospective evaluation, exactly what an analysis piece needs. Modals are followed only by bare infinitives, so <s>could had been</s> is impossible, and omitting <em>been</em> yields an active perfect.",
    "Stance is carried by the modal. <em>Could have been</em> plus V3 denotes an unrealised past possibility, typically with a counterfactual condition (<em>if the warning had come earlier</em>). <em>Should have been</em> criticises. <em>Must have been</em> is epistemic: a confident inference from evidence, not an obligation. <em>May</em> or <em>might have been</em> is tentative. A past time adverbial excludes the simple modal passive.",
    "Transformation preserves everything but voice. <em>A stray dog might have knocked over the bins</em> has an exact passive counterpart only with <em>the bins might have been knocked over by a stray dog</em>; substituting a stronger modal turns a possibility into near-certainty, a present-reference form loses the past, swapping the noun phrases reverses who did what, and a shift between deontic and epistemic modals (necessity versus possibility) alters the proposition entirely. When comparing two versions, look first at the modal: that is usually where the meaning has moved."
   ],
   "examples": [
    {
     "s": "More <b>must be done</b> to mitigate future flooding.",
     "g": "Deontic <em>must</em>: present or future necessity."
    },
    {
     "s": "The traffic chaos <b>could have been avoided</b>.",
     "g": "Unrealised past possibility."
    },
    {
     "s": "The canals <b>should have been cleared</b> months ago.",
     "g": "Retrospective criticism."
    },
    {
     "s": "Mint’s phone has a new screen, so it <b>must have been repaired</b>.",
     "g": "Epistemic <em>must</em>: inference from evidence."
    },
    {
     "s": "The bins <b>might have been knocked over</b> by a stray dog.",
     "g": "Voice changes; modal and time reference do not."
    }
   ]
  }
 },
 "u5g2s2": {
  "B1": {
   "key": "If the subject <strong>receives</strong> the action, use the passive infinitive: <strong>to be</strong> plus V3.",
   "body": [
    "The <strong>infinitive</strong> is <em>to</em> plus a verb: <em>to help</em>. The <strong>passive infinitive</strong> is <em>to be</em> plus V3: <em>to be helped</em>. Use it when the person or thing receives the action. <em>Nan wants to help</em>: Nan does the helping. <em>Nan wants to be helped</em>: somebody helps her. Some verbs always need an object, for example <em>compensate</em> (pay somebody for something they lost). So if a person receives the money, use the passive: <em>the shop owners <b>were compensated</b></em>.",
    "Some verbs take a to-infinitive straight after them: <em>expect, hope, want, need, plan</em>. <em>Ploy expects <b>to be chosen</b> for the team</em>: somebody will choose her. Other verbs take an <strong>object</strong> first, then the to-infinitive: <em>want, allow, ask, expect</em> plus object plus <em>to</em>. <em>The teacher allowed the test <b>to be taken</b> again</em>. Don’t drop <em>to</em>, and don’t use -ing after these verbs. (<em>Need</em> has one special -ing pattern: see below.)",
    "After a noun, especially after <em>the first, the last, the next</em> or <em>the only</em>, we often use the passive infinitive: <em>the first student <b>to be interviewed</b></em> means the first student who was interviewed. <em>The next canal <b>to be cleaned</b></em> means the next canal that will be cleaned.",
    "Check each part. After <em>to</em>, use the base form <em>be</em>: never <s>to been</s> or <s>to being</s>. After <em>be</em>, use V3: never <s>to be fix</s>. And <em>to have</em> plus V3 without <em>been</em> is active: <em>to have sent</em> means the subject sent something.",
    "<em>Need</em> works the same way. <em>I need to wash my shirt</em>: I do it. <em>My shirt needs <b>to be washed</b></em>: a shirt cannot wash anything. Don’t write <s>My shirt needs to wash</s>. In British English you can also say <em>my shirt needs washing</em>, with the same passive meaning.",
    "Decide by the <strong>doer</strong>, not by the verb before the gap. <em>The villagers hope to return</em>: they do the returning, so it is active. <em>The villagers hope to be rescued</em>: somebody else rescues them, so it is passive."
   ],
   "examples": [
    {
     "s": "The roads <b>are expected to be repaired</b> by November.",
     "g": "The roads receive the repairing: <em>to be</em> plus V3."
    },
    {
     "s": "The new rule allows phones <b>to be used</b> in the library.",
     "g": "<em>Allow</em> plus object plus <em>to be</em> plus V3."
    },
    {
     "s": "Fern was the last student <b>to be interviewed</b> for the job.",
     "g": "Noun after <em>the last</em> plus passive infinitive."
    },
    {
     "s": "Ploy’s bike needs <b>to be fixed</b> this weekend.",
     "g": "A bike cannot fix itself: <em>needs to be fixed</em>."
    },
    {
     "s": "Villagers hope <b>to return</b> home this week.",
     "g": "Active infinitive: the villagers do the returning."
    }
   ]
  },
  "B2": {
   "key": "When the subject or object of the infinitive receives the action, the infinitive is <em>to be</em> plus V3.",
   "body": [
    "<em>The roads <b>are expected to be repaired</b> by November</em>. The roads do not repair anything; they receive the action, so the infinitive is passive. The same reasoning applies to people: <em>compensate</em> (pay somebody for a loss) is transitive, so the person who receives the money is its object: <em>the shop owners <b>were compensated</b></em>, never <s>the shop owners compensated</s> with that meaning.",
    "Know the verb patterns. <em>Expect, hope, need, want, plan</em> and <em>be likely, be due, be about</em> take a to-infinitive directly. <em>Want, allow, ask, expect, need</em> can also take an object and then a to-infinitive: <em>officials allowed water <b>to be released</b></em>. These verbs do not take an -ing form here (the one exception, <em>need</em> plus -ing, comes below), and they do not drop <em>to</em>; <em>allow</em> plus object plus bare <em>be</em> is wrong.",
    "After a noun, especially one modified by <em>the first, the last, the next, the only</em>, a passive infinitive identifies which one undergoes the action: <em>the first dam <b>to be opened</b></em>, <em>the next district <b>to be declared</b></em> a disaster area. This pattern has appeared in A-Level papers.",
    "Check the form part by part: <em>to</em>, then bare <em>be</em> (never <s>to been</s>, <s>to being</s>), then V3 (never <s>to be repair</s>). <em>To have</em> plus V3 without <em>been</em> is an active perfect infinitive.",
    "<em>Need</em> is a classic error point: <s>The fan needs to fix</s> says the fan will do the fixing. The correct form is <em>needs to be fixed</em>, or in British English <em>needs fixing</em>, which has the same passive meaning. Always decide by the doer: <em>residents expect to return</em> stays active because the residents act."
   ],
   "examples": [
    {
     "s": "The roads <b>are expected to be repaired</b> by November.",
     "g": "The subject receives the action."
    },
    {
     "s": "The new rule allows phones <b>to be used</b> in the library.",
     "g": "Verb plus object plus passive infinitive."
    },
    {
     "s": "Fern was the last student <b>to be interviewed</b> for the job.",
     "g": "Noun plus passive infinitive after <em>the last</em>."
    },
    {
     "s": "The school roof needs <b>to be checked</b>, or needs <b>checking</b>.",
     "g": "Two ways to express a passive need."
    },
    {
     "s": "Villagers hope <b>to return</b> home this week.",
     "g": "Active: the villagers perform the action."
    }
   ]
  },
  "C1": {
   "key": "The infinitive takes the passive, <em>to be</em> plus V3, whenever its understood subject is the patient; the governing verb tells you the pattern, but only the doer tells you the voice.",
   "body": [
    "<em>The roads <b>are expected to be repaired</b> by November</em>. The understood subject of <em>repair</em> is <em>the roads</em>, which cannot be agents, so the infinitive is passive. The same applies to human subjects of transitive verbs: <em>compensate</em> (pay somebody for a loss) requires an object, so the people paid are its patient: <em>the shop owners <b>were compensated</b></em>.",
    "Governing verbs fix the complement pattern, not the voice. <em>Expect, hope, need, want, plan, be likely, be due</em> take a to-infinitive; <em>want, allow, ask, expect, need</em> also take object plus to-infinitive (<em>allowed water <b>to be released</b></em>). None of these takes a gerund in this slot except <em>need</em> (see below), and <em>allow</em> or <em>want</em> plus object cannot drop <em>to</em>.",
    "The post-nominal passive infinitive after <em>the first, the last, the next, the only</em> or a superlative identifies a member of a series by what happens to it: <em>the first dam <b>to be opened</b></em>, <em>the next foundation to be questioned</em>, an exhibit from the A-Level 2569 paper. Form errors cluster in the non-finite chain: <s>to been</s>, <s>to being</s>, <s>to be repair</s>; and <em>to have</em> plus V3 without <em>been</em> is an active perfect.",
    "<em>Need</em> takes either <em>to be</em> plus V3 or, in British English, a gerund with passive meaning (<em>the gutters need clearing</em>); the two are effectively equivalent. <s>The gutters need to clear</s>: this makes the gutters the agent. Decide by the doer every time: <em>residents expect to return</em> remains active."
   ],
   "examples": [
    {
     "s": "The roads <b>are expected to be repaired</b> by November.",
     "g": "Patient subject, passive infinitive."
    },
    {
     "s": "The new rule allows phones <b>to be used</b> in the library.",
     "g": "Object plus passive infinitive after <em>allow</em>."
    },
    {
     "s": "Fern was the last student <b>to be interviewed</b> for the job.",
     "g": "Post-nominal passive infinitive after <em>the last</em>."
    },
    {
     "s": "The gutters need <b>clearing</b> before the storm.",
     "g": "<em>Need</em> plus gerund: passive meaning, British usage."
    },
    {
     "s": "Villagers hope <b>to return</b> home this week.",
     "g": "Agentive subject, active infinitive."
    }
   ]
  }
 },
 "u5g2s3": {
  "B1": {
   "key": "If a place in the sentence needs an <strong>-ing</strong> form and the subject receives the action, use <strong>being</strong> plus V3.",
   "body": [
    "Some places in a sentence need the <strong>-ing form</strong> (a <strong>gerund</strong>, a verb used like a noun). First, after a <strong>preposition</strong> (a small word like <em>about, after, before, without, of, for, despite</em>). Second, after some verbs: <em>avoid, mind</em> (be unhappy about; <em>I don’t mind</em> means it is OK for me), <em>enjoy, risk, remember, keep, deny</em> (say you did not do something). <em>Like</em> and <em>hate</em> can take -ing too. After a preposition, and after <em>avoid, mind</em> and <em>deny</em>, don’t use <em>to</em> plus a verb.",
    "Then ask: does the subject do the action or receive it? If she does it, use the normal -ing form: <em>Fern enjoys <b>helping</b> at the shelter</em>. If she receives it, use <em>being</em> plus V3: <em>Praew doesn’t mind <b>being photographed</b></em> (somebody photographs her).",
    "Use <em>being</em>, not <em>been</em>, after a preposition or these verbs: <em>after <b>being rescued</b></em>, never <s>after been rescued</s>. Don’t use V3 alone either: <s>without told</s> should be <em>without being told</em>. Don’t use <em>be</em> plus V3 here (<s>avoid be seen</s>). Keep the small word of a phrasal verb: <em>being picked up</em>, <em>being turned away</em> (sent away).",
    "Sometimes the passive action happened <strong>before</strong> the main verb. Then you can use <em>having been</em> plus V3 (the perfect passive gerund). <em>The student denied <b>having been shown</b> the answers</em>: she says nobody showed them to her before. <em>Having shown</em> is active: she showed them to somebody. Never write <s>having being</s>.",
    "So, two steps. One: does this place need -ing? Two: does the subject receive the action? Yes and yes: <em>being</em> plus V3. Only the first yes: normal -ing (<em>avoid driving</em>). If the place needs <em>to</em>, use <em>to be</em> plus V3 instead."
   ],
   "examples": [
    {
     "s": "Mint was upset about <b>being ignored</b> in the group chat.",
     "g": "After the preposition <em>about</em>; she received the action."
    },
    {
     "s": "After <b>being rescued</b>, the dog was taken to a vet.",
     "g": "After a preposition: <em>being</em>, not <em>been</em>."
    },
    {
     "s": "Drivers should avoid <b>being caught</b> in deep water.",
     "g": "<em>Avoid</em> plus -ing; passive meaning."
    },
    {
     "s": "Praew doesn’t mind <b>being photographed</b>.",
     "g": "<em>Mind</em> plus -ing; somebody photographs her."
    },
    {
     "s": "The student denied <b>having been shown</b> the answers.",
     "g": "Earlier action, passive: <em>having been</em> plus V3."
    }
   ]
  },
  "B2": {
   "key": "Where the slot needs an -ing form and the meaning is passive, use <em>being</em> plus V3; for an earlier passive action, <em>having been</em> plus V3.",
   "body": [
    "Two kinds of slot need a gerund. After a preposition (<em>about, after, before, without, despite, for, of</em>) English uses -ing, never a to-infinitive. Certain verbs also take a gerund: <em>avoid, mind, enjoy, risk, remember, keep, deny</em>; <em>like</em> and <em>hate</em> accept either a gerund or a to-infinitive. <em>Avoid, mind</em> and <em>deny</em> never take <em>to</em>.",
    "If the subject receives the action, the gerund is passive: <em>being</em> plus V3. <em>Praew doesn’t mind <b>being photographed</b></em>; <em>drivers should avoid <b>being caught</b> in deep water</em>. An active gerund (<em>photographing, catching</em>) would make the subject the doer. A bare V3, <em>been</em> plus V3, or <em>be</em> plus V3 are all wrong in a gerund slot. Phrasal verbs keep their particle: <em>being turned away</em>, <em>being picked up</em>.",
    "When the passive action is earlier than the main verb, use the perfect passive gerund, <em>having been</em> plus V3. <em>Deny</em> often takes it: <em>The student denied <b>having been shown</b> the answers in advance</em>. <em>Having shown</em> is active, <em>having being</em> is malformed, and <em>deny</em> does not take <em>to have been</em>.",
    "Two decisions, in order. Does this slot need -ing? Does the subject receive the action? Both yes: <em>being</em> plus V3. Only the first: an active gerund. Only the second, but the slot needs an infinitive: <em>to be</em> plus V3, as in the previous lesson."
   ],
   "examples": [
    {
     "s": "Mint was upset about <b>being ignored</b> in the group chat.",
     "g": "Preposition plus passive gerund."
    },
    {
     "s": "After <b>being rescued</b>, the family moved to a shelter.",
     "g": "Passive gerund opening a sentence."
    },
    {
     "s": "Drivers should avoid <b>being caught</b> in deep water.",
     "g": "<em>Avoid</em> plus gerund, passive meaning."
    },
    {
     "s": "Praew doesn’t mind <b>being photographed</b>.",
     "g": "<em>Mind</em> plus passive gerund."
    },
    {
     "s": "The student denied <b>having been shown</b> the answers in advance.",
     "g": "Perfect passive gerund: earlier and passive."
    }
   ]
  },
  "C1": {
   "key": "In a gerund slot, passive meaning requires <em>being</em> plus V3, and anteriority plus passive meaning requires <em>having been</em> plus V3.",
   "body": [
    "Gerund slots arise after prepositions (<em>about, after, without, despite, for, of</em>) and after verbs that select -ing complements: <em>avoid, mind, enjoy, risk, deny, keep, resent, remember</em>; <em>like</em> and <em>hate</em> accept both gerund and infinitive. A to-infinitive is impossible after a preposition and after <em>avoid, mind, deny</em>.",
    "When the understood subject of the gerund is its patient, the gerund is passive: <em>Praew doesn’t mind <b>being photographed</b></em>, <em>drivers should avoid <b>being caught</b> in deep water</em>. The usual errors are predictable: an active gerund (agent reading), a bare V3 (no gerund), <em>been</em> plus V3 (perfect without its auxiliary) and <em>be</em> plus V3 (an infinitive in a gerund slot). Phrasal verbs retain their particle (<em>being turned away</em>, <em>being picked up</em>).",
    "If the passive event precedes the main verb, the perfect passive gerund, <em>having been</em> plus V3, marks both anteriority and voice: <em>the student denied <b>having been shown</b> the answers in advance</em>. <em>Having shown</em> reverses the roles; <em>having being</em> is malformed; <em>deny</em> does not license a to-infinitive. In practice a simple passive gerund is also common when the time relation is obvious, but the perfect form makes it explicit.",
    "The decision is two-stage: first the slot (gerund or infinitive), then the voice (agent or patient). Both answers together give you <em>being</em> plus V3, <em>having been</em> plus V3, <em>to be</em> plus V3, or an active form."
   ],
   "examples": [
    {
     "s": "Mint was upset about <b>being ignored</b> in the group chat.",
     "g": "Preposition plus passive gerund."
    },
    {
     "s": "After <b>being rescued</b>, the family moved to a shelter.",
     "g": "Passive gerund in a fronted adverbial."
    },
    {
     "s": "Drivers should avoid <b>being caught</b> in deep water.",
     "g": "Gerund-taking verb, patient subject."
    },
    {
     "s": "The student denied <b>having been shown</b> the answers in advance.",
     "g": "Anterior passive: <em>having been</em> plus V3."
    }
   ]
  }
 },
 "u5g3s1": {
  "B1": {
   "key": "A <strong>reduced relative clause</strong> is a short form: drop <em>who, which</em> or <em>that</em> plus <em>be</em>, and keep only the V3 after the noun.",
   "body": [
    "A <strong>relative clause</strong> gives more information about a noun: <em>the students <b>who were evacuated</b> from the dormitory</em>. News writers make it shorter. They drop <em>who were</em> and keep only the V3: <em>the students <b>evacuated</b> from the dormitory</em>. This is a <strong>reduced passive clause</strong>. The meaning is the same.",
    "First, find the <strong>main verb</strong> (the verb that makes the sentence complete). One subject needs only one main verb. In <em>The students evacuated from the dormitory <b>are sleeping</b> in the gym</em>, the main verb is <em>are sleeping</em>. So the space after the noun cannot hold a second main verb like <s>were evacuated</s> or <s>is located</s>. Use V3 alone.",
    "Second, ask: does the noun do the action or receive it? Receives it: use V3 (<em>photos <b>taken</b> by Mint</em>). Does it: use -ing (<em>a girl <b>taking</b> photos</em>). Be careful with <em>who</em> or <em>which</em> plus V3 with no <em>be</em>. <em>The girl who painted the wall</em> means she did the painting. If the noun receives the action, keep the whole clause (<em>which was painted</em>) or drop both words (<em>painted</em>). <s>a song which written by Ploy</s> is wrong.",
    "The short clause can go straight after the noun, or between commas for extra information: <em>Our gym, <b>painted</b> only last year, is now full of mud</em>. It also works for the present: <em>a temple <b>located</b> on higher ground</em> means a temple that is located there. Here <em>located</em> means ‘in this place’, not ‘found’.",
    "You can also add a noun plus V3 after a <strong>complete sentence</strong> and a comma. It gives the whole event a name: <em>The lights went out for six hours, <b>a problem caused</b> by a fallen tree</em>. You need both the noun (<em>a problem</em>) and the V3 (<em>caused</em>). Don’t start a new main verb after the comma (<s>a problem was caused</s>), and don’t use -ing for a passive meaning.",
    "In exams, this V3 often looks like a past tense verb. It is not. Count the main verbs first."
   ],
   "examples": [
    {
     "s": "The students <b>evacuated</b> from the dormitory are sleeping in the gym.",
     "g": "Means ‘who were evacuated’. Main verb: <em>are sleeping</em>."
    },
    {
     "s": "Schools <b>affected</b> by the floods will reopen on Monday.",
     "g": "Means ‘which were affected’. Main verb: <em>will reopen</em>."
    },
    {
     "s": "Our gym, <b>painted</b> only last year, is now full of mud.",
     "g": "Extra information between commas."
    },
    {
     "s": "The lights went out for six hours, <b>a problem caused</b> by a fallen tree.",
     "g": "Noun plus V3 after a complete sentence: a label."
    }
   ]
  },
  "B2": {
   "key": "A passive relative clause can drop <em>who</em> or <em>which</em> plus <em>be</em>, leaving the noun followed directly by V3.",
   "body": [
    "<em>Relief is still being delivered to people <b>forced</b> from their homes</em>. The full clause is <em>people who were forced from their homes</em>; news drops <em>who were</em> and keeps the participle. <em>One street vendor, <b>forced</b> to close for 15 days, has reopened</em> shows the same reduction between commas, adding non-essential information.",
    "The test is the finite verb. If the sentence already has its main verb (<em>is being delivered</em>, <em>has reopened</em>, <em>will reopen</em>), the gap after the noun cannot hold a second one: no <em>was</em> or <em>is</em> plus V3. And it cannot be -ing, because -ing is active: the noun would be doing the action. V3 is the passive choice. A present state works the same way: <em>a temple <b>located</b> on higher ground</em> stands for <em>that is located</em>.",
    "Keep or drop the relative word as a pair. <em>Which was painted</em> and <em>painted</em> are both passive; <em>which painted</em> is active (the noun did the painting) and <s>which written</s> has no finite verb at all.",
    "After a complete clause, a noun plus a reduced passive can sum up the whole event: <em>The lights went out for six hours, <b>a problem caused</b> by a fallen tree</em>. This avoids a comma splice: <s>a problem was caused</s> would add a second main clause without a conjunction.",
    "In an exam passage this is the trap of the bare participle that ‘looks like past tense’: <em>a trend <b>known</b> as…</em>, <em>products <b>made</b> in Thailand</em>, <em>schools <b>affected</b> by the floods</em>. All are reduced passives after a noun."
   ],
   "examples": [
    {
     "s": "Relief is being delivered to people <b>forced</b> from their homes.",
     "g": "Means ‘who were forced’; main verb <em>is being delivered</em>."
    },
    {
     "s": "One street vendor, <b>forced</b> to close for 15 days, has reopened.",
     "g": "Non-essential reduced clause between commas."
    },
    {
     "s": "Schools <b>affected</b> by the floods will reopen on Monday.",
     "g": "Means ‘which were affected’."
    },
    {
     "s": "The lights went out for six hours, <b>a problem caused</b> by a fallen tree.",
     "g": "Summative noun plus participle after a full clause."
    }
   ]
  },
  "C1": {
   "key": "A reduced passive relative is noun plus V3, standing for noun plus relative pronoun plus <em>be</em> plus V3; it is only possible because the clause already has its finite verb.",
   "body": [
    "<em>Relief is still being delivered to people <b>forced</b> from their homes</em>: the full form is <em>who were forced</em>, and news writing deletes the relative pronoun and <em>be</em> together. Between commas, the same reduction carries non-defining information: <em>One street vendor, <b>forced</b> to close for 15 days, has reopened</em>. Stative participles reduce in the same way: <em>a temple <b>located</b> on higher ground</em>, where <em>located</em> means situated, not discovered.",
    "The decisive test is finiteness. Once the clause has its main verb, the post-nominal slot cannot host a second finite verb (<em>was</em> or <em>is</em> plus V3), and an -ing participle would assign an active role to the noun. A relative pronoun plus V3 without <em>be</em> is either an active relative (<em>which painted</em>: the noun as agent) or ungrammatical (<s>which written</s>). Pronoun and <em>be</em> stand or fall together.",
    "A related structure is the <strong>summative appositive</strong>: after a complete clause, a noun phrase with a reduced passive labels the whole preceding event. <em>The lights went out for six hours, <b>a problem caused</b> by a fallen tree</em>. Both the head noun and the participle are required; a finite verb after the comma creates a comma splice.",
    "In exam passages these bare participles ‘look like past tense’, and that is the trap: <em>a trend <b>known</b> as…</em>, <em>products <b>made</b> in Thailand</em>. Count the finite verbs before choosing."
   ],
   "examples": [
    {
     "s": "Relief is being delivered to people <b>forced</b> from their homes.",
     "g": "Defining reduction of ‘who were forced’."
    },
    {
     "s": "One street vendor, <b>forced</b> to close for 15 days, has reopened.",
     "g": "Non-defining reduction; finite verb <em>has reopened</em>."
    },
    {
     "s": "A temple <b>located</b> on higher ground now shelters 200 people.",
     "g": "Stative participle: ‘that is located’."
    },
    {
     "s": "The lights went out for six hours, <b>a problem caused</b> by a fallen tree.",
     "g": "Summative appositive labelling the whole event."
    }
   ]
  }
 },
 "u5g3s2": {
  "B1": {
   "key": "Two ways to report what people say or think: <strong>It is said that</strong> plus a sentence, or <strong>Subject is said to</strong> plus a verb.",
   "body": [
    "News often reports what people say, think or know, without saying who. <strong>Shape one</strong>: <em>It</em>, then a passive reporting verb, then <em>that</em>, then a full sentence. <em><b>It is believed that</b> the old bridge is unsafe.</em> Here <em>it</em> is empty (it means nothing). Because <em>it</em> is singular, use <em>is, was</em> or <em>has been</em>, then V3: <em>It <b>has been reported</b> that</em>…, never <s>It have been reported</s>.",
    "<strong>Shape two</strong>: the real subject comes first, then the passive reporting verb, then a <strong>to-infinitive</strong> (to plus a verb). <em>The old bridge <b>is believed to be</b> unsafe.</em> After <em>is said, is believed, are reported, is thought</em>, always use <em>to</em>, never -ing (<s>is said being</s>).",
    "Choose the infinitive by <strong>time</strong>. Same time: <em>to be</em>, or <em>to</em> plus a verb. In progress: <em>to be</em> plus -ing. <strong>Earlier</strong> than the reporting (a past time, or a period from the past until now, like <em>for ten years</em> or <em>since then</em>): <em>to have</em> plus V3. Earlier <strong>and</strong> passive (the subject received the action): <em>to have been</em> plus V3. <em>The temple <b>is thought to have been built</b> 300 years ago</em>: people think so now, the building was long ago, and somebody built it.",
    "Inside the infinitive, still ask: did the subject do it or receive it? Some words show that a person did the action, for example <em>deliberately</em> (by choice: a person chose to do it). <em>The fire is thought <b>to have been started</b> deliberately</em>: somebody started it. <em>To have started</em> would make the fire the doer. And <em>to be</em> plus -ing would also make the subject the doer.",
    "With <em>there</em>: <em>There <b>is said to be</b> a problem</em>. <em>There <b>are believed to be</b> more than 500 dogs at the shelter.</em> Choose <em>is</em> or <em>are</em> by the noun after <em>to be</em>, because that is the real subject.",
    "Verbs for both shapes: <em>say, think, believe, know, report, expect, find, consider</em>. <em>Announce</em> and <em>suggest</em> use shape one: <em>It <b>was announced</b> that</em>… But <em>tell, inform</em> (give information) and <em>warn</em> need a person as the subject: <em>Parents <b>were informed</b> that</em>…, <em>We <b>were warned</b> that</em>… These three verbs never follow an empty <em>it</em>: never write <s>It was warned that</s>."
   ],
   "examples": [
    {
     "s": "<b>It is known that</b> many canals are blocked with rubbish.",
     "g": "Shape one: <em>It</em> plus passive plus <em>that</em> plus a sentence."
    },
    {
     "s": "The old bridge <b>is believed to be</b> unsafe.",
     "g": "Shape two: subject plus passive plus to-infinitive."
    },
    {
     "s": "The temple <b>is thought to have been built</b> 300 years ago.",
     "g": "Earlier and passive: <em>to have been</em> plus V3."
    },
    {
     "s": "There <b>are believed to be</b> more than 500 dogs at the shelter.",
     "g": "<em>Are</em> agrees with <em>dogs</em>, the real subject."
    },
    {
     "s": "<b>It was reported that</b> the night market would reopen on Sunday.",
     "g": "<em>Report</em> works with <em>It</em>; <em>inform</em> and <em>tell</em> do not."
    }
   ]
  },
  "B2": {
   "key": "The reporting passive has two shapes: <em>It</em> plus passive plus <em>that</em>-clause, or subject plus passive plus to-infinitive, with the infinitive chosen by time and voice.",
   "body": [
    "Shape one: <em><b>It is known that</b> many canals are blocked with rubbish</em>. <em>It</em> is an empty subject, so <em>be</em> is singular (<em>is, was, has been</em>), followed by V3 and a full <em>that</em>-clause. The reporter does not say who knows, which creates distance from the claim.",
    "Shape two moves the topic to the front and turns the claim into a to-infinitive: <em>The old bridge <b>is believed to be</b> unsafe</em>. Reporting passives are followed by <em>to</em>, not by an -ing form or a perfect participle.",
    "The infinitive shows time relative to the reporting verb. Same time: <em>to be</em> or <em>to</em> plus verb. In progress: <em>to be</em> plus -ing. Earlier: <em>to have</em> plus V3. Earlier and passive: <em>to have been</em> plus V3, as in <em>households <b>were found to have been affected</b></em>. A past time phrase, or a period running from the past up to now, signals the perfect infinitive. Voice is decided as usual: a word such as <em>deliberately</em> (by choice) implies a human agent, so <em>the fire is thought <b>to have been started</b> deliberately</em>, not <em>to have started</em>, which would make the fire the doer. A continuous active infinitive (<em>to be starting</em>) also makes the subject the doer.",
    "<em>There</em> also has a reporting form: <em>There <b>are thought to be</b> too many obstacles</em>. The verb agrees with the noun after <em>to be</em>, the notional subject.",
    "Verb choice matters. <em>Say, think, believe, know, report, expect, find, consider</em> work in both shapes. <em>Announce</em> and <em>suggest</em> work only in shape one (<em>It was announced that</em>…; never <s>is suggested to</s>). <em>Tell, inform</em> and <em>warn</em> need the person as subject: <em>Residents <b>were informed</b> that</em>…, not <s>It was informed that</s>."
   ],
   "examples": [
    {
     "s": "<b>It is known that</b> many canals are blocked with rubbish.",
     "g": "Shape one: empty <em>it</em>, that-clause."
    },
    {
     "s": "Villages upstream <b>are said to be paying</b> a heavy price.",
     "g": "Shape two with a continuous infinitive: ongoing now."
    },
    {
     "s": "About 329,000 households <b>were found to have been affected</b>.",
     "g": "Perfect passive infinitive: affected before the finding."
    },
    {
     "s": "There <b>are believed to be</b> more than 500 dogs at the shelter.",
     "g": "<em>There</em> pattern; <em>are</em> agrees with <em>dogs</em>."
    },
    {
     "s": "Residents <b>were informed that</b> the water would be cut off.",
     "g": "<em>Inform</em> needs a person subject."
    }
   ]
  },
  "C1": {
   "key": "Reporting passives distance the writer from a claim: <em>It</em> plus passive plus <em>that</em>-clause, or subject plus passive plus to-infinitive, whose form encodes time and voice relative to the report.",
   "body": [
    "<em><b>It is known that</b> many canals are blocked with rubbish</em>. Shape one uses an anticipatory <em>it</em>, so <em>be</em> is singular, followed by V3 and a finite <em>that</em>-clause; in academic register <em>It has been found that</em>… and <em>It can be argued that</em>… are typical. The agent of the reporting verb is suppressed, which is the point: the writer neither owns nor attributes the claim.",
    "Shape two raises the subject of the reported clause: <em>Villages upstream <b>are said to be paying</b> the price</em>. The infinitive marks time relative to the reporting verb: simultaneous (<em>to be</em>), progressive (<em>to be paying</em>), anterior (<em>to have started</em>), anterior and passive (<em>to have been affected</em>). A past time adverbial, or a period running up to now, requires the perfect infinitive. Voice inside the infinitive follows the usual test: an adverbial of intention (<em>deliberately, intentionally</em>) presupposes a human agent, so a patient subject needs <em>to have been</em> plus V3 (<em>the fire is thought to have been started deliberately</em>). Reporting passives never take a participle complement (<s>is said having been</s>).",
    "Existential <em>there</em> can also be raised: <em>There <b>are thought to be</b> too many obstacles</em>. Agreement is with the notional subject after <em>to be</em>.",
    "Verb restrictions matter. <em>Say, think, believe, know, report, expect, find, consider</em> take both shapes. <em>Announce, suggest, propose, recommend</em> take only shape one. <em>Inform, tell, warn, remind, reassure</em> are never used with anticipatory <em>it</em>, because their person object must become the passive subject: <em>We <b>have been informed</b> that</em>…, not <s>It has been informed that</s>."
   ],
   "examples": [
    {
     "s": "<b>It has been found that</b> the pumps were switched off too early.",
     "g": "Academic <em>it</em>-passive; singular <em>has</em>."
    },
    {
     "s": "Villages upstream <b>are said to be paying</b> a heavy price.",
     "g": "Raised subject, progressive infinitive."
    },
    {
     "s": "About 329,000 households <b>were found to have been affected</b>.",
     "g": "Anterior passive infinitive."
    },
    {
     "s": "There <b>are thought to be</b> too many obstacles to a quick recovery.",
     "g": "Raised <em>there</em>; agreement with <em>obstacles</em>."
    },
    {
     "s": "Residents <b>were informed that</b> the water would be cut off.",
     "g": "<em>Inform</em>: person subject only."
    }
   ]
  }
 },
 "u5g3s3": {
  "B1": {
   "key": "A verb with no <strong>object</strong> has no passive. Some verbs have two objects. Some <em>be</em> plus V3 forms are just states.",
   "body": [
    "The passive turns an <strong>object</strong> (the thing that receives the action) into the subject. So a verb with no object has <strong>no passive</strong>. These verbs never take an object: <em>happen, occur</em> (happen), <em>die, arrive, appear, disappear, rise, fall, exist, become, seem</em>. Write <em>The accident happened</em>, never <s>was happened</s> or <s>has been occurred</s>. Also find the real subject: in <em>The lights in the classroom go off</em>, the subject is <em>lights</em> (plural), not <em>classroom</em>.",
    "For a passive meaning, use a different verb that takes an object. <em>Die</em> has no object, but <em>kill</em> does: <em>Our goldfish <b>died</b></em>, or <em>The plants <b>were killed</b> by the frost</em>. In the active, <em>kill</em> needs an object after it. Another pair: <em>rise</em> (rose, risen) has no object: <em>the water <b>rose</b></em>. <em>Raise</em> (raised, raised) needs one: <em>workers <b>raised</b> the road</em>. If an object comes after the verb, the verb must be active, so use <em>raise</em>. A passive verb does not have an object straight after it. And <em>rise</em> has no passive at all.",
    "Some verbs work both ways: <em>melt, grow, open, close, break, increase, change</em>. Ask: did it happen <strong>by itself</strong>? Then use the active: <em>The chocolate <b>melted</b> in the hot car</em>. Did a person do it? Then you can use the passive: <em>The butter <b>was melted</b> in a pan</em>. After <em>had</em>, use the V3, not the base form or -ing: <em>had grown</em>.",
    "<strong>State verbs</strong> (verbs about a situation, not an action) have no passive and are not usually continuous: <em>belong to, resemble</em> (look like), <em>lack</em> (not have), <em>suit</em>, <em>have</em> (own). Write <em>This bag <b>belongs</b> to Fern</em>, never <s>is belonged</s> or <s>is belonging</s>.",
    "Some verbs have two objects, a person and a thing: <em>give, send, offer, show, tell, teach</em>. In the passive, the person can be the subject: <em>Each student <b>was given</b> a map</em>; <em>Nan <b>was offered</b> a place at the university</em>. But <em>explain, describe, suggest, say</em> need <em>to</em> before the person, so the person cannot be the subject: <em>The rules <b>were explained to</b> us</em>, never <s>We were explained the rules</s>.",
    "Some <em>be</em> plus V3 forms describe a state, like adjectives: <em>is located</em> (is in a place), <em>are worried</em>, <em>was submerged</em> (under water). They are correct. You don’t need a <em>by</em> phrase."
   ],
   "examples": [
    {
     "s": "Floodwaters slowly <b>subside</b> in the capital.",
     "g": "Active only: <em>subside</em> (go down) has no object."
    },
    {
     "s": "The river <b>rose</b> by half a metre overnight.",
     "g": "<em>Rise</em>, rose, risen: no object, no passive."
    },
    {
     "s": "The chocolate <b>melted</b> in the hot car.",
     "g": "It happened by itself, so active."
    },
    {
     "s": "Each student <b>was given</b> a map of the safe routes.",
     "g": "Two-object verb: the person is the subject."
    },
    {
     "s": "The dam <b>is located</b> 100 kilometres upstream.",
     "g": "A state, like an adjective. No <em>by</em> needed."
    }
   ]
  },
  "B2": {
   "key": "No object means no passive; two-object verbs usually make the person the passive subject; and some <em>be</em> plus V3 forms are adjectival states.",
   "body": [
    "<em>Floodwaters slowly <b>subside</b></em>. You cannot <em>subside something</em>, so the verb has no object to promote and no passive. The same is true of <em>happen, occur, rise, fall, die, arrive, appear, disappear, exist, become, seem</em>: <s>was happened</s> and <s>has been occurred</s> are impossible. Find the true subject for agreement; in <em>the roof of the old houses leaks</em>, the head is <em>roof</em>, not <em>houses</em>.",
    "To get a passive meaning, switch to a transitive verb: <em>die</em> versus <em>kill</em> (<em>were killed</em>; but active <em>killed</em> needs an object), <em>happen</em> versus <em>cause</em> (<em>was caused by heavy rain</em>). <em>Rise</em> (rose, risen) is intransitive; <em>raise</em> (raised, raised) is transitive. An object after the verb demands an active transitive verb, so <em>raise</em>; and <em>rise</em> has no passive at all.",
    "Two-way verbs such as <em>melt, grow, open, close, break, increase</em> are active when the change happens by itself (<em>the chocolate <b>melted</b></em>) and passive only when an outside doer is stated or clearly implied (<em>the butter was melted in a pan</em>). Ask: by itself, or by someone?",
    "State verbs like <em>belong, resemble, lack, suit</em> and <em>have</em> (own) have no passive and are not normally continuous.",
    "Verbs with two objects (<em>give, send, offer, show, tell, teach</em>) allow two passives, and the person-first version is more common: <em>Families <b>were given</b> food parcels</em>; <em>Mint <b>was sent</b> a link to the new timetable</em>. But <em>explain, describe, suggest, say, report</em> take <em>to</em> before the person, so the person cannot be the subject: <em>The plan <b>was explained to</b> residents</em>, not <s>Residents were explained the plan</s>.",
    "Finally, forms like <em>is located, were submerged, are worried</em> describe states. They are correct as they stand; do not force a <em>by</em>-phrase or a continuous form onto them."
   ],
   "examples": [
    {
     "s": "Floodwaters slowly <b>subside</b> in the capital.",
     "g": "Intransitive: no passive is possible."
    },
    {
     "s": "The flooding <b>was caused</b> by three days of heavy rain.",
     "g": "Use a transitive verb for a passive meaning."
    },
    {
     "s": "Workers <b>raised</b> the road by 30 centimetres.",
     "g": "<em>Raise</em> takes an object; <em>rise</em> cannot."
    },
    {
     "s": "Families <b>were given</b> food parcels at the shelter.",
     "g": "Two-object verb, person as subject."
    },
    {
     "s": "The dam <b>is located</b> 100 kilometres upstream.",
     "g": "Adjectival state; no event, no agent."
    }
   ]
  },
  "C1": {
   "key": "Only transitive uses passivise: intransitive and stative verbs have no passive, two-way verbs passivise only with an external agent, and two-object verbs differ in which object can be promoted.",
   "body": [
    "<em>Floodwaters slowly <b>subside</b></em>. The passive promotes an object to subject, so verbs with no object have none: unaccusatives such as <em>happen, occur, arise, rise, fall, die, arrive, appear, disappear, emerge</em> and linking verbs such as <em>become, seem</em>. <em>Appear, happen</em> and <em>occur</em> are among the verbs Thai learners most often wrongly passivise. Agreement goes with the head noun, not with a noun inside a following prepositional phrase.",
    "Where a passive meaning is wanted, choose a transitive partner: <em>die</em> and <em>kill</em>, <em>happen</em> and <em>cause</em>, <em>rise</em> (rose, risen) and <em>raise</em> (raised, raised). A following object rules out the intransitive member and also the passive, which has no object slot left; the transitive member in the active must have its object.",
    "Ergative or two-way verbs (<em>melt, grow, open, close, break, increase, sink</em>) are active when the change is spontaneous and passive only with an external, at least implied, agent: <em>the chocolate in Fern’s bag <b>had melted</b></em> is spontaneous; <em>the chocolate was melted over hot water</em> has a cook. Stative verbs (<em>belong, resemble, lack, suit, have</em> meaning own) resist both the passive and the progressive.",
    "Ditransitives (<em>give, send, offer, show, tell, teach</em>) allow either object to be promoted, and English prefers the person: <em>Families <b>were given</b> food parcels</em>; <em>Mint <b>was sent</b> a link to the new timetable</em>. Verbs that take a <em>to</em>-phrase for the person (<em>explain, describe, suggest, say, report, mention</em>) allow only the thing to be promoted: <em>The plan <b>was explained to</b> residents</em>. Finally, adjectival passives (<em>is located, were submerged, are worried</em>) describe states; read them as adjectives and leave them without an agent."
   ],
   "examples": [
    {
     "s": "Floodwaters slowly <b>subside</b> in the capital.",
     "g": "Unaccusative: nothing to promote."
    },
    {
     "s": "The flooding <b>was caused</b> by three days of heavy rain.",
     "g": "Transitive partner supplies the passive."
    },
    {
     "s": "Workers <b>raised</b> the road by 30 centimetres.",
     "g": "Transitive <em>raise</em> with its object."
    },
    {
     "s": "The plan <b>was explained to</b> residents at the temple.",
     "g": "<em>Explain</em>: only the thing can be subject."
    },
    {
     "s": "The dam <b>is located</b> 100 kilometres upstream.",
     "g": "Adjectival passive: a state."
    }
   ]
  }
 },
 "u5w1s1": {
  "B1": {
   "key": "Five flood words: two are about people leaving (evacuate, displaced), two are about water covering things (submerged, inundate), and one is the time after (aftermath).",
   "body": [
    "For each word, learn four things. Learn its meaning and its <strong>part of speech</strong> (word type: noun, verb or adjective). Learn a close word, and a word people often confuse it with. The questions put the word in a sentence and ask for the closest meaning. First, read the whole sentence. Then ask: which option says the same thing? Some wrong options fit a flood story, but they do not mean the same.",
    "<strong>Evacuate</strong> (verb) means to leave a dangerous place quickly, or to move everyone out of it. It works in two ways. When <strong>residents</strong> (the people who live there) evacuate their village, they <strong>leave</strong> it for safety. When officials evacuate a building, they get everyone out, so the building is <strong>emptied</strong> (made empty) of people. It is about people going out. Nobody stays inside.",
    "<strong>Submerged</strong> (adjective, from the verb <em>submerge</em>) means completely <strong>under water</strong>. A close word is <strong>underwater</strong>. A submerged road has water over the top of it. The road may also be damaged, but that is a result, not the meaning. Submerged tells you one thing only: the water is over it.",
    "<strong>Inundate</strong> (verb) has two meanings. First, it means to <strong>flood</strong> a place, to cover it with a lot of water. Second, it means to give somebody <strong>far too much</strong> of something. A close word for this is <strong>swamped</strong>. We say ‘be inundated <strong>with</strong>’ emails, questions or requests. This meaning is about the huge number, not about water.",
    "<strong>Displaced</strong> (adjective) describes people who were <strong>forced to leave their homes</strong>, for example by a flood or a war. Displaced families often stay in shelters or with relatives for a while. We use it for people, not for places. A street is submerged, but a family is displaced.",
    "<strong>Aftermath</strong> (noun) means <strong>the period after</strong> a bad event. In this time, people deal with its effects, like cleaning and repairs. It always comes after the event. The usual phrase is ‘in the aftermath of’ a storm, a fire or a flood."
   ],
   "examples": [
    {
     "s": "<b>evacuate</b> (verb)",
     "g": "When the canal rose, Ploy’s family <b>evacuated</b> their house and went to stay with her aunt."
    },
    {
     "s": "<b>submerged</b> (adjective)",
     "g": "The football pitch behind our school was <b>submerged</b>, so PE moved indoors."
    },
    {
     "s": "<b>inundate</b> (verb)",
     "g": "After the school changed the exam dates, the teachers were <b>inundated</b> with messages from worried parents."
    },
    {
     "s": "<b>displaced</b> (adjective)",
     "g": "Mint’s class collected rice and blankets for <b>displaced</b> people at the temple shelter."
    },
    {
     "s": "<b>aftermath</b> (noun)",
     "g": "In the <b>aftermath</b> of the market fire, the traders spent months rebuilding their stalls."
    }
   ]
  },
  "B2": {
   "key": "Evacuate and displaced are about people leaving home, submerged and inundate are about being covered or overwhelmed, and aftermath is the difficult period after a disaster.",
   "body": [
    "In this lesson each question gives you a word inside a sentence and asks for its closest meaning. Read the whole sentence, decide what job the word is doing there, then pick the option that could replace it without changing the meaning. Watch out for options that fit the situation, or describe a result, but do not mean the same thing.",
    "<strong>Evacuate</strong> (verb) means to leave a dangerous place, or to move everyone out of it, for safety. It works in two directions. When residents evacuate a district, they <strong>leave</strong> it. When the authorities evacuate a building, they <strong>empty</strong> it of people, so ‘empty’ is the closest meaning when the object is a building. Evacuation is always about getting people out. Collocations: evacuate residents, evacuate an area, an evacuation order.",
    "<strong>Submerged</strong> (adjective, from the verb <em>submerge</em>) means completely under water, so <strong>underwater</strong> is the closest meaning. A submerged street may also be damaged, but that is a possible result, not the meaning. Collocations: fully submerged, partly submerged, submerged roads.",
    "<strong>Inundate</strong> (verb) has two meanings. The literal one is to flood an area with a large amount of water. The second, very common in the news, is to give somebody more of something than they can deal with: <em>be inundated with</em> emails, complaints or requests. Here the closest meaning is <strong>swamped</strong> or overwhelmed. The point is the huge number.",
    "<strong>Displaced</strong> (adjective) describes people forced to leave their homes by a disaster or a conflict. It is used for people and communities, not for places: houses are submerged, but families are displaced. Collocations: displaced families, displaced residents.",
    "<strong>Aftermath</strong> (noun) is the period after a bad event, when people deal with its effects. It always comes after the event, never before or during it. It almost always appears in the phrase <em>in the aftermath of</em> a flood, fire or crisis."
   ],
   "examples": [
    {
     "s": "<b>evacuate</b> (verb)",
     "g": "Rescue teams <b>evacuated</b> the riverside condo block before the second wave of water arrived."
    },
    {
     "s": "<b>submerged</b> (adjective)",
     "g": "Only the roof of the bus stop was visible; the rest was <b>submerged</b>."
    },
    {
     "s": "<b>inundate</b> (verb)",
     "g": "The new bubble-tea shop was <b>inundated</b> with orders on its opening day."
    },
    {
     "s": "<b>displaced</b> (adjective)",
     "g": "Volunteers set up a free clinic for <b>displaced</b> residents at the district office."
    },
    {
     "s": "<b>aftermath</b> (noun)",
     "g": "In the <b>aftermath</b> of the fire, the community raised money to rebuild the library."
    }
   ]
  },
  "C1": {
   "key": "These five words trace a flood story: people are moved out (evacuate), the land goes under water (submerged, inundate), families lose their homes (displaced), and recovery follows (aftermath).",
   "body": [
    "In closest-meaning questions the test is substitution: the right option can replace the word without changing what the sentence asserts. Distractors usually name a consequence or a related situation, not the meaning itself, so check each option against the sentence rather than against the topic.",
    "<strong>Evacuate</strong> (verb) means to leave, or to remove people from, a place of danger. Its object can be the place, as in <em>evacuate the building</em>, which is close to <em>empty</em> it of people, or the people, as in <em>evacuate residents</em>, often in the passive. Used of the residents themselves, it simply means <strong>leave</strong>. Its core is removal: nobody remains. Collocations: an evacuation order, evacuate to higher ground.",
    "<strong>Submerged</strong> (adjective or past participle, from <em>submerge</em>; the Latin <em>sub</em> means under) means completely beneath the surface of water, so <strong>underwater</strong> is the exact paraphrase. Damage may accompany submersion, but it is a consequence, not the meaning. Collocations: fully or partially submerged, remain submerged for days.",
    "<strong>Inundate</strong> (verb, rather formal) literally means to flood land with water. Its figurative sense is just as frequent: to overwhelm somebody with more than they can handle, nearly always in the passive with <em>with</em>: <em>be inundated with</em> applications, complaints or enquiries. The closest paraphrase is <strong>swamped</strong>, itself a water metaphor. The point is volume, not water.",
    "<strong>Displaced</strong> (adjective) describes people forced from their homes by disaster or conflict, as in <em>displaced families</em> or the formal <em>internally displaced persons</em>. It is a people word: land is submerged or inundated, whereas people are displaced.",
    "<strong>Aftermath</strong> (noun) means the period following a damaging event, together with the consequences people must deal with in it. It is fixed after the event, never before or during it, and nearly always appears as <em>in the aftermath of</em> plus the event. It implies difficulty: nobody speaks of the aftermath of a birthday party."
   ],
   "examples": [
    {
     "s": "<b>evacuate</b> (verb)",
     "g": "Hospital staff <b>evacuated</b> the ground-floor wards overnight, moving every patient to the upper floors."
    },
    {
     "s": "<b>submerged</b> (adjective)",
     "g": "Fern’s scooter remained <b>submerged</b> for three days and never started again."
    },
    {
     "s": "<b>inundate</b> (verb)",
     "g": "The admissions office was <b>inundated</b> with enquiries as soon as the scholarship was announced."
    },
    {
     "s": "<b>displaced</b> (adjective)",
     "g": "The temple became home to more than two hundred <b>displaced</b> villagers for most of October."
    },
    {
     "s": "<b>aftermath</b> (noun)",
     "g": "In the <b>aftermath</b> of the landslide, the main concern was clean drinking water."
    }
   ]
  }
 },
 "u5w1s2": {
  "B1": {
   "key": "Devastate means destroy, resilient means tough and quick to recover, mitigate means reduce, exacerbate means make worse, and prolonged means lasting a long time.",
   "body": [
    "Read the whole sentence before you choose. Many wrong options could appear in a flood story. But they do not mean the same as the word. Ask: can this option replace the word and keep the meaning?",
    "<strong>Devastate</strong> (verb) means to damage something very badly, or to <strong>destroy</strong> it. It is a very strong word. ‘Affect’ (change something in some way) is much too weak. A storm that devastates a village leaves it in ruins. Note: a person who feels <em>devastated</em> is very, very sad.",
    "<strong>Resilient</strong> (adjective) describes people or things that can <strong>recover quickly</strong> (become normal again) after a hard time. A close word is <strong>tough</strong>. Resilient people get up again after a problem and start again. The key idea is <strong>recovery</strong>: coming back after trouble.",
    "<strong>Mitigate</strong> (verb) means to make something bad <strong>less harmful</strong> or less serious. A close word is <strong>reduce</strong>. We mitigate the effects, the damage or the risk. Its opposite is exacerbate (make worse).",
    "<strong>Exacerbate</strong> (verb) means to make a bad situation <strong>worse</strong>. A close word is <strong>worsen</strong>. It is the opposite of mitigate. Be careful: exacerbate does not mean cause. First, the problem already exists. Then something else makes it bigger. Rain causes a flood; other things can exacerbate it.",
    "<strong>Prolonged</strong> (adjective) means <strong>lasting a long time</strong>, often longer than you want. A close word is <strong>long</strong>. It describes <strong>time</strong> (how long something lasts): a prolonged drought, a prolonged stay in hospital. Short is the opposite."
   ],
   "examples": [
    {
     "s": "<b>devastate</b> (verb)",
     "g": "The fire <b>devastated</b> the old wooden market, and almost nothing was left."
    },
    {
     "s": "<b>resilient</b> (adjective)",
     "g": "Nan is very <b>resilient</b>: she lost the speech contest but entered again the next month."
    },
    {
     "s": "<b>mitigate</b> (verb)",
     "g": "Ploy wears a hat and sunscreen to <b>mitigate</b> the effects of the strong sun."
    },
    {
     "s": "<b>exacerbate</b> (verb)",
     "g": "Staying up late <b>exacerbated</b> Fern’s cold, and she felt much worse the next day."
    },
    {
     "s": "<b>prolonged</b> (adjective)",
     "g": "After a <b>prolonged</b> power cut, all the food in our fridge went bad."
    }
   ]
  },
  "B2": {
   "key": "Devastate is stronger than affect, resilient is about bouncing back, mitigate and exacerbate are opposites (reduce and worsen), and prolonged is about length of time.",
   "body": [
    "For each question, test every option by putting it in place of the word. The right one keeps the meaning; the wrong ones usually describe something else that might happen in the same story, or the opposite meaning.",
    "<strong>Devastate</strong> (verb) means to damage very badly or <strong>destroy</strong>. Its strength matters: <em>affect</em> is much too weak, because a place can be affected only slightly. A person can also feel <em>devastated</em>, meaning extremely upset. Collocations: devastate a region, devastate a crop.",
    "<strong>Resilient</strong> (adjective) describes people, communities or systems that can recover quickly from difficulty. The closest everyday word is <strong>tough</strong>. Resilience is about bouncing back after trouble, so it describes strength, not the bad luck that caused the trouble.",
    "<strong>Mitigate</strong> (verb) means to make something bad less harmful or less serious, so <strong>reduce</strong> or lessen is closest. Typical objects are the effects, the damage, the impact and the risk. Its opposite is exacerbate or increase.",
    "<strong>Exacerbate</strong> (verb) means to make a problem worse: <strong>worsen</strong> is closest. The key point is that the problem already exists. Exacerbate does not mean cause: heavy rain causes the flooding, while a high tide or a broken pump can exacerbate it. It is the opposite of reduce.",
    "<strong>Prolonged</strong> (adjective) means lasting a long time, often longer than expected or wanted, so <strong>long</strong> is closest. It describes duration, and short is its opposite. Collocations: a prolonged drought, a prolonged absence, a prolonged illness."
   ],
   "examples": [
    {
     "s": "<b>devastate</b> (verb)",
     "g": "The typhoon <b>devastated</b> the island’s coconut farms, and it took years for them to recover."
    },
    {
     "s": "<b>resilient</b> (adjective)",
     "g": "Small street-food businesses in our soi are remarkably <b>resilient</b>; most reopen within days of any crisis."
    },
    {
     "s": "<b>mitigate</b> (verb)",
     "g": "Planting trees along the road can <b>mitigate</b> the heat in the hottest months."
    },
    {
     "s": "<b>exacerbate</b> (verb)",
     "g": "Scrolling on her phone at midnight only <b>exacerbated</b> Mint’s exam stress."
    },
    {
     "s": "<b>prolonged</b> (adjective)",
     "g": "The <b>prolonged</b> drought forced the farmers to change crops."
    }
   ]
  },
  "C1": {
   "key": "Devastate denotes destruction, not mere effect; resilient means able to recover; mitigate and exacerbate act on an existing problem in opposite directions; prolonged concerns duration.",
   "body": [
    "Each question asks for the closest paraphrase in context. Distractors tend to be either too weak, a related idea from the same scenario, or the antonym, so judge by intensity and direction as well as by topic.",
    "<strong>Devastate</strong> (verb) means to cause severe damage or total destruction, so <strong>destroy</strong> is the nearest paraphrase. Intensity is the trap: <em>affect</em> is neutral and could describe minor damage. Figuratively, <em>devastated</em> describes a person who is overwhelmed with grief or shock, but the verb applied to a place is about physical ruin. Family note: <em>devastating</em> describes the cause, <em>devastated</em> the victim.",
    "<strong>Resilient</strong> (adjective) describes the capacity to recover quickly from adversity, whether in people, communities, materials or systems; <strong>tough</strong> captures it in everyday English. It denotes recovery, a quality of the people or system, not the misfortune they suffered.",
    "<strong>Mitigate</strong> (verb, formal) means to make something harmful less severe; <strong>reduce</strong> or alleviate is closest. It collocates with <em>effects, impact, damage, risk</em> and <em>consequences</em>. It implies the problem cannot be removed entirely, only lessened. Its antonym is increase or exacerbate. Do not confuse it with <em>militate</em> (to work against), a different word.",
    "<strong>Exacerbate</strong> (verb, formal) means to make an existing problem, condition or tension worse; <strong>worsen</strong> or aggravate is the paraphrase. The presupposition is essential: exacerbate never means cause, because the problem must already be there. A storm causes flooding; a high tide or a failed pumping station exacerbates it. It is therefore the opposite of mitigate.",
    "<strong>Prolonged</strong> (adjective) means continuing for a long time, usually longer than is wanted or expected, so <strong>long</strong> is the plain paraphrase. It is a duration word, and short is its antonym. Strong collocations: a prolonged drought, prolonged negotiations, a prolonged absence."
   ],
   "examples": [
    {
     "s": "<b>devastate</b> (verb)",
     "g": "A single night of hail <b>devastated</b> the orchid nursery, wiping out a whole season’s stock."
    },
    {
     "s": "<b>resilient</b> (adjective)",
     "g": "Coral that survives warm seasons tends to be more <b>resilient</b> when the next heatwave arrives."
    },
    {
     "s": "<b>mitigate</b> (verb)",
     "g": "Rotating shifts helped <b>mitigate</b> the exhaustion of the volunteers at the shelter."
    },
    {
     "s": "<b>exacerbate</b> (verb)",
     "g": "The rumour <b>exacerbated</b> the panic that the power cut had already caused."
    },
    {
     "s": "<b>prolonged</b> (adjective)",
     "g": "<b>Prolonged</b> exposure to loud music can permanently damage your hearing."
    }
   ]
  }
 },
 "u5w1s3": {
  "B1": {
   "key": "Subside means go down or get weaker, relief can be the good feeling when worry ends, unprecedented means never before, discharge means let water out, and trying times are hard times.",
   "body": [
    "As before, read the whole sentence first. Then try each option in place of the word. The right option keeps the meaning. Some wrong options are opposites, and some are just about something different.",
    "<strong>Subside</strong> (verb) means to <strong>go down</strong> or to <strong>become less strong</strong>. Close words are <strong>fall</strong> and <strong>ease</strong> (become less bad). We use it for water, and also for pain, storms, wind and anger. When floodwater subsides, the level falls. When a pain subsides, it gets better. Its opposite is rise or grow stronger.",
    "<strong>Relief</strong> (noun) has two meanings. First, it is help for people in trouble, like food, water and money. Second, it is the <strong>good feeling when a worry ends</strong>. A close word is <strong>comfort</strong>. People say ‘What a relief!’ when bad news does not come. Relief always needs a worry first; a surprise does not.",
    "<strong>Unprecedented</strong> (adjective) means <strong>never happened before</strong>. A close word is <strong>record</strong>, as in a record level: the highest ever. Be careful: it is about <strong>history</strong> (nothing like it before), not about how bad or risky something is.",
    "<strong>Discharge</strong> (verb) means to <strong>let water or another liquid flow out</strong>. Dams, pipes and factories discharge water. A close word is <strong>release</strong>. Its opposite is to keep the water in.",
    "<strong>Trying times</strong> (phrase) means a <strong>difficult and stressful period</strong>. Here, <em>trying</em> is an adjective that means hard. It is common in speeches, the news and formal messages."
   ],
   "examples": [
    {
     "s": "<b>subside</b> (verb)",
     "g": "Ice waited in the car until the thunderstorm <b>subsided</b>, then ran into the school."
    },
    {
     "s": "<b>relief</b> (noun)",
     "g": "Praew felt huge <b>relief</b> when she found her lost phone in the library."
    },
    {
     "s": "<b>unprecedented</b> (adjective)",
     "g": "The concert sold out in two minutes, which was <b>unprecedented</b> for our school."
    },
    {
     "s": "<b>discharge</b> (verb)",
     "g": "The pump station <b>discharges</b> water from the canal into the river."
    },
    {
     "s": "<b>trying times</b> (phrase)",
     "g": "Our class group chat kept everyone smiling in those <b>trying times</b>."
    }
   ]
  },
  "B2": {
   "key": "Subside means fall or ease, relief can mean comfort after worry, unprecedented means never seen before, discharge means release a liquid, and trying times are difficult periods.",
   "body": [
    "Substitute each option into the sentence. The key keeps the meaning; distractors are usually opposites (rise, store, normal) or words for a different idea (a different feeling, a different quality).",
    "<strong>Subside</strong> (verb) means to go down or become less intense, so <strong>fall</strong> or <strong>ease</strong> is closest. It is used for water levels, but also for pain, storms, wind, noise and anger. It is the opposite of rise or grow stronger. It has no object: water subsides; you cannot subside something.",
    "<strong>Relief</strong> (noun) has two meanings. The first is practical help for victims: relief supplies, flood relief. The second is the pleasant feeling when anxiety or pain ends, so <strong>comfort</strong> is close. It differs from surprise, which is about something unexpected rather than a worry ending. Collocations: a sigh of relief, to everyone’s relief, what a relief.",
    "<strong>Unprecedented</strong> (adjective) means never having happened or existed before, so <strong>record</strong> is the closest choice when we talk about levels or numbers. It is about being the first time ever, not about how risky or serious something is.",
    "<strong>Discharge</strong> (verb) means to let a liquid or gas flow out of something, so <strong>release</strong> is closest. Dams, pipes and factories discharge water. The opposite is hold back.",
    "<strong>Trying times</strong> (phrase) means a difficult, stressful period. The adjective <em>trying</em> means testing your patience or strength. The phrase is common in speeches, the news and formal messages."
   ],
   "examples": [
    {
     "s": "<b>subside</b> (verb)",
     "g": "Mint’s anger <b>subsided</b> once her friend explained what had really happened."
    },
    {
     "s": "<b>relief</b> (noun)",
     "g": "To everyone’s <b>relief</b>, the school bus arrived safely after the storm."
    },
    {
     "s": "<b>unprecedented</b> (adjective)",
     "g": "The number of applicants this year is <b>unprecedented</b>; nobody has seen so many before."
    },
    {
     "s": "<b>discharge</b> (verb)",
     "g": "The new treatment plant will <b>discharge</b> only clean water into the canal."
    },
    {
     "s": "<b>trying times</b> (phrase)",
     "g": "The noodle shop stayed open through those <b>trying times</b>, even when customers were few."
    }
   ]
  },
  "C1": {
   "key": "Subside denotes falling or easing, relief is either aid or the release from anxiety, unprecedented means without earlier example, discharge means release, and trying times are periods that test endurance.",
   "body": [
    "These items reward precise denotation. Distractors are typically antonyms or neighbouring ideas from the same scene, so confirm that your choice matches both the direction and the type of meaning.",
    "<strong>Subside</strong> (verb, intransitive) means to sink to a lower level or become less intense; <strong>fall</strong> or <strong>ease</strong> is the paraphrase depending on the subject. Floodwater, swelling, pain, storms, unrest and anger all subside. Its antonyms are rise and intensify. Because it takes no object, it has no passive.",
    "<strong>Relief</strong> (noun) is polysemous. In disaster contexts it often means aid: food, water and money for victims, as in <em>relief operations</em>. Its other sense is the release from anxiety or pain, where <strong>comfort</strong> is the closest paraphrase. That sense depends on a worry ending, which distinguishes it from surprise (mere unexpectedness). Collocations: breathe a sigh of relief, to her great relief.",
    "<strong>Unprecedented</strong> (adjective) literally means having no precedent, no earlier example. Applied to levels or figures it is equivalent to <strong>record</strong>. Note the trap: something can be serious or risky without being unprecedented; the word concerns historical comparison, not risk. It is often overused in the media, which is worth noticing.",
    "<strong>Discharge</strong> (verb) means to release a liquid or gas, so <strong>release</strong> is closest; the antonym is retain. It has other senses in other fields: a hospital discharges a patient (lets her go home), and a debt or duty can be discharged. All share the idea of letting something go.",
    "<strong>Trying times</strong> (phrase) means a difficult period that tests people’s patience and strength. The adjective <em>trying</em> comes from the older sense of <em>try</em>, to test or strain, not from <em>try</em> meaning attempt; it means hard to bear. The phrase is slightly formal and typical of speeches, editorials and official notices."
   ],
   "examples": [
    {
     "s": "<b>subside</b> (verb)",
     "g": "The swelling in Fern’s ankle took a week to <b>subside</b> after the netball match."
    },
    {
     "s": "<b>relief</b> (noun)",
     "g": "Nan breathed a sigh of <b>relief</b> when the last name on the list was hers."
    },
    {
     "s": "<b>unprecedented</b> (adjective)",
     "g": "Sales of electric scooters in Bangkok grew at an <b>unprecedented</b> rate last year."
    },
    {
     "s": "<b>discharge</b> (verb)",
     "g": "The plant was fined for <b>discharging</b> untreated waste into the river."
    },
    {
     "s": "<b>trying times</b> (phrase)",
     "g": "The principal reminded the staff that <b>trying times</b> call for calm leadership."
    }
   ]
  }
 },
 "u5w2s1": {
  "B1": {
   "key": "Find the slot first: a noun after ‘the’ and before ‘of’, the base verb after a modal, and always ‘in the aftermath of’.",
   "body": [
    "First, look at the words around the gap. They tell you the <strong>part of speech</strong> (word type) you need. Between <em>the</em> and <em>of</em>, you need a <strong>noun</strong>. A noun can be the <strong>subject</strong> (the ‘who’ or ‘what’ before the main verb). After a <strong>modal</strong> (can, will, must, should), use the <strong>base form</strong>: the verb with no -s, -ed or -ing. Then choose the family member that fits.",
    "The <strong>evacuate</strong> family has four members. <em>Evacuate</em> is the verb. <em>Evacuation</em> (noun) is the process of moving everyone out. <em>Evacuee</em> (noun) is a person who is moved out. <em>Evacuated</em> is a verb form or adjective. Be careful with the two nouns. The evacuation is the action. An evacuee is a person. If the sentence is about the action itself, use <em>evacuation</em>. If it is about the people who were moved, use <em>evacuee</em>.",
    "The <strong>submerge</strong> family: <em>submerge</em> (verb, to cover with water) and <em>submerged</em> (adjective or past participle, under water). After a modal, always use the base form. Write <em>will submerge</em> and <em>might submerge</em>. Do not write <s>will submerges</s>, <s>will submerged</s> or <s>will submerging</s>.",
    "The <strong>inundate</strong> family: <em>inundate</em> (verb), <em>inundation</em> (noun, flooding) and <em>inundated</em> (verb form or adjective). <em>Inundate</em>, <em>inundates</em> and <em>inundated</em> are verb forms. A verb form cannot sit between <em>the</em> and <em>of</em>. Only the noun ending in <strong>-ion</strong> can.",
    "The <strong>displace</strong> family: <em>displace</em> (verb, force people out of their homes), <em>displacement</em> (noun) and <em>displaced</em> (adjective, as in displaced people). The noun ends in <strong>-ment</strong>. Do not use <em>displace</em>, <em>displaces</em> or <em>displaced</em> as the subject.",
    "<strong>Aftermath</strong> is only a noun. It lives in one fixed phrase: <strong>in the aftermath of</strong> plus an event. Always use <em>in</em>. Do not write <s>at the aftermath</s>, <s>on the aftermath</s> or <s>by the aftermath</s>."
   ],
   "examples": [
    {
     "s": "<b>evacuation</b> (noun)",
     "g": "Everyone had practised the fire drill, so the <b>evacuation</b> of our condo was calm."
    },
    {
     "s": "<b>submerge</b> (verb)",
     "g": "A king tide will <b>submerge</b> the beach path twice this week."
    },
    {
     "s": "<b>inundation</b> (noun)",
     "g": "The <b>inundation</b> of the night market forced the vendors to move to the temple car park."
    },
    {
     "s": "<b>displacement</b> (noun)",
     "g": "The flood caused the <b>displacement</b> of many villagers, and the local school was almost empty."
    },
    {
     "s": "<b>aftermath</b> (noun)",
     "g": "<b>In the aftermath of</b> the power cut, Praew’s family bought a small generator."
    }
   ]
  },
  "B2": {
   "key": "Read the slot: a determiner before the gap and ‘of’ after it need a noun, a modal needs the base form, and aftermath only works in ‘in the aftermath of’.",
   "body": [
    "Word-family questions test the right form in the right slot. Check the grammar around the gap: <em>the … of</em> and a gap that is the subject of the sentence both need a <strong>noun</strong>; a modal verb (can, could, will, may, must) needs the <strong>bare infinitive</strong>, with no -s, -ed or -ing. Once you know the part of speech, the suffix usually tells you which option it is.",
    "<strong>evacuate</strong> (verb), <strong>evacuation</strong> (noun: the process), <strong>evacuee</strong> (noun: a person), <strong>evacuated</strong> (past participle or adjective). The two nouns are the trap. If the sentence describes the operation itself, you need the process noun ending in -tion; the -ee noun is for the people moved.",
    "<strong>submerge</strong> (verb), <strong>submerged</strong> (adjective or past participle). After a modal, use the base form: <em>could submerge, may submerge</em>. Third-person -s, the past participle and the -ing form are all wrong straight after a modal.",
    "<strong>inundate</strong> (verb), <strong>inundation</strong> (noun, flooding), <strong>inundated</strong> (participle or adjective). In the slot <em>the … of</em> the noun is required; none of the verb forms can be the head of a subject noun phrase.",
    "<strong>displace</strong> (verb), <strong>displacement</strong> (noun), <strong>displaced</strong> (adjective). The -ment noun names the event of people being forced from their homes and can be the subject of a sentence; <em>displaced</em> goes before a noun (<em>displaced families</em>) or after <em>be</em>.",
    "<strong>aftermath</strong> (noun only) is used in the fixed phrase <strong>in the aftermath of</strong> plus an event. The preposition is always <em>in</em>; <s>at the aftermath</s>, <s>on the aftermath</s> and <s>by the aftermath</s> are not used."
   ],
   "examples": [
    {
     "s": "<b>evacuation</b> (noun)",
     "g": "The <b>evacuation</b> of the night market went smoothly thanks to clear signs."
    },
    {
     "s": "<b>submerge</b> (verb)",
     "g": "Engineers warned that a high tide could <b>submerge</b> the new pier."
    },
    {
     "s": "<b>inundation</b> (noun)",
     "g": "The <b>inundation</b> of the industrial estate halted production for a month."
    },
    {
     "s": "<b>displacement</b> (noun)",
     "g": "The <b>displacement</b> of riverside communities is a recurring problem in the rainy season."
    },
    {
     "s": "<b>aftermath</b> (noun)",
     "g": "<b>In the aftermath of</b> the scandal, the company replaced its whole board."
    }
   ]
  },
  "C1": {
   "key": "Identify the slot before the word: a noun head after a determiner and before ‘of’, a bare infinitive after a modal, and the fixed frame ‘in the aftermath of’.",
   "body": [
    "Each item isolates one syntactic slot. A gap that heads a noun phrase, especially between a determiner and an <em>of</em>-phrase, or a gap that functions as the subject, demands a noun; a gap after a modal demands the bare infinitive. Suffixes then do the rest: <em>-tion</em> and <em>-ment</em> mark nouns, <em>-ee</em> marks a person, <em>-ed</em> marks a participle or adjective.",
    "<strong>evacuate</strong> (verb) gives <strong>evacuation</strong> (the process or operation), <strong>evacuee</strong> (the person evacuated, like <em>employee</em> or <em>trainee</em>) and <strong>evacuated</strong>. Choose between the nouns by meaning: an event or operation is an evacuation; a person is an evacuee, so it cannot be described as taking place or going smoothly.",
    "<strong>submerge</strong> (verb) and <strong>submerged</strong> (participle or adjective), with the rarer noun <em>submersion</em>. After a modal only the bare infinitive is grammatical; an inflected form (-s, -ed, -ing) is an agreement or form error.",
    "<strong>inundate</strong> (verb), <strong>inundation</strong> (noun, the flooding of an area) and <strong>inundated</strong>. As the head of a subject noun phrase, only the nominalisation works; nominalisations like this are typical of formal and academic reporting.",
    "<strong>displace</strong> (verb), <strong>displacement</strong> (noun) and <strong>displaced</strong> (adjective or participle). The -ment noun can head the subject and take an <em>of</em>-phrase naming the people affected; it is the standard term in humanitarian reports.",
    "<strong>aftermath</strong> is a noun used almost exclusively in the frame <strong>in the aftermath of</strong> plus an event; <em>immediate</em> often modifies it. The preposition is fixed: <s>at</s>, <s>on</s> and <s>by the aftermath</s> are not idiomatic."
   ],
   "examples": [
    {
     "s": "<b>evacuation</b> (noun)",
     "g": "The <b>evacuation</b> of the island’s tourists was completed before the ferry service stopped."
    },
    {
     "s": "<b>submerge</b> (verb)",
     "g": "Rising sea levels may eventually <b>submerge</b> parts of the coastal highway."
    },
    {
     "s": "<b>inundation</b> (noun)",
     "g": "Seasonal <b>inundation</b> of the plains has always shaped farming in the region."
    },
    {
     "s": "<b>displacement</b> (noun)",
     "g": "Prolonged <b>displacement</b> disrupts children’s schooling long after the water has gone."
    },
    {
     "s": "<b>aftermath</b> (noun)",
     "g": "<b>In the immediate aftermath of</b> the earthquake, phone networks collapsed."
    }
   ]
  }
 },
 "u5w2s2": {
  "B1": {
   "key": "Find the slot: a noun after a possessive, after ‘a’ plus an adjective, or after ‘for’; the base verb after ‘to’; and an -ing adjective for the cause.",
   "body": [
    "First, find the slot. After a <strong>possessive</strong> (a word with ’s, like the city’s or Ploy’s), use a <strong>noun</strong>. After <em>a</em> or <em>an</em> plus an adjective, like ‘a big’, use a noun. After <em>to</em>, as in ‘want to’ or ‘need to’, use the <strong>base form</strong>. That is the verb with no -s, -ed or -ing. After <em>be</em>, you often need an <strong>adjective</strong> (a describing word).",
    "The <strong>devastate</strong> family: <em>devastate</em> (verb), <em>devastation</em> (noun), <em>devastating</em> and <em>devastated</em> (adjectives). Here is the key rule. The <strong>-ing</strong> adjective describes the <strong>cause</strong>, the thing that does the damage. The <strong>-ed</strong> adjective describes the <strong>receiver</strong>: people who feel very upset, or places that were badly damaged. So a storm is devastating, and the families are devastated. After <em>be</em>, choose an adjective, not the verb or the noun.",
    "The <strong>resilient</strong> family: <em>resilient</em> (adjective), <em>resilience</em> (noun, the ability to recover) and <em>resiliently</em> (adverb). After a possessive, use the noun ending in <strong>-ence</strong>. ‘A resilient’ is not complete; it needs a noun after it.",
    "The <strong>mitigate</strong> family: <em>mitigate</em> (verb) and <em>mitigation</em> (noun, work to make something less harmful). Two nouns can sit together, like ‘school bus’. So we say <strong>risk mitigation</strong> and <em>mitigation plans</em>. After ‘for’, you need a noun, not a verb.",
    "The <strong>exacerbate</strong> family: <em>exacerbate</em> (verb) and <em>exacerbation</em> (noun, a worsening). After <em>a</em> plus an adjective, like ‘a sudden’, the gap needs a noun. <em>Exacerbated</em> and <em>exacerbating</em> are verb forms, so they cannot go there.",
    "The <strong>prolong</strong> family: <em>prolong</em> (verb, to make something last longer) and <em>prolonged</em> (adjective, long-lasting). After <em>to</em>, use the base form <em>prolong</em>. Do not add -s, -ed or -ing after <em>to</em>."
   ],
   "examples": [
    {
     "s": "<b>devastating</b> (adjective)",
     "g": "The news of the fire was <b>devastating</b>, and the <b>devastated</b> owner cried on TV."
    },
    {
     "s": "<b>resilience</b> (noun)",
     "g": "Nan’s <b>resilience</b> after her injury inspired the whole volleyball team."
    },
    {
     "s": "<b>mitigation</b> (noun)",
     "g": "Shade trees are a cheap form of heat <b>mitigation</b> in our district."
    },
    {
     "s": "<b>exacerbation</b> (noun)",
     "g": "Doctors noticed a sharp <b>exacerbation</b> of breathing problems during the haze season."
    },
    {
     "s": "<b>prolong</b> (verb)",
     "g": "The teacher decided to <b>prolong</b> the break because the hall was too hot."
    }
   ]
  },
  "B2": {
   "key": "A possessive, a determiner plus adjective, or a noun-modifier slot needs a noun; ‘to’ needs the base verb; and -ing adjectives describe causes while -ed adjectives describe those affected.",
   "body": [
    "Identify the slot before looking at the options. A possessive (<em>the region’s</em>) and a determiner plus adjective (<em>a sudden</em>) are followed by a <strong>noun</strong>; a preposition such as <em>for</em> also needs a noun phrase, which can be a compound of two nouns. <em>To</em> after verbs like <em>hope, plan, need</em> takes the <strong>base form</strong>. After <em>be</em>, a gap describing the subject usually needs an <strong>adjective</strong>.",
    "<strong>devastate</strong> (verb), <strong>devastation</strong> (noun), <strong>devastating</strong> and <strong>devastated</strong> (adjectives), <strong>devastatingly</strong> (adverb). The -ing adjective describes the cause of the damage or shock; the -ed adjective describes those who suffer it: people who are very upset, or places that are badly damaged. A subject that causes the destruction therefore takes the -ing form after <em>be</em>; the noun and the verb cannot follow <em>be</em> to describe it.",
    "<strong>resilient</strong> (adjective), <strong>resilience</strong> (noun), <strong>resiliently</strong> (adverb). After a possessive you need the noun; the adverb modifies a verb, and <em>a resilient</em> is incomplete without a following noun.",
    "<strong>mitigate</strong> (verb), <strong>mitigation</strong> (noun). The noun forms common compounds: <em>risk mitigation, mitigation measures, heat mitigation</em>. After a preposition, the verb forms are impossible.",
    "<strong>exacerbate</strong> (verb), <strong>exacerbation</strong> (noun, a worsening). After a determiner plus adjective the head must be a noun; <em>exacerbated</em> and <em>exacerbating</em> are verb forms and cannot head the phrase.",
    "<strong>prolong</strong> (verb, to make something last longer), <strong>prolonged</strong> (adjective, lasting a long time). After <em>to</em> use the base form; the past form and the -ing form are wrong in that slot."
   ],
   "examples": [
    {
     "s": "<b>devastating</b> (adjective)",
     "g": "The <b>devastating</b> wildfire left hundreds of <b>devastated</b> families without homes."
    },
    {
     "s": "<b>resilience</b> (noun)",
     "g": "The team’s <b>resilience</b> in the second half turned a heavy defeat into a draw."
    },
    {
     "s": "<b>mitigation</b> (noun)",
     "g": "The city has invested heavily in heat <b>mitigation</b>, from green roofs to shaded walkways."
    },
    {
     "s": "<b>exacerbation</b> (noun)",
     "g": "The haze caused a noticeable <b>exacerbation</b> of asthma cases in the district."
    },
    {
     "s": "<b>prolong</b> (verb)",
     "g": "The organisers hope to <b>prolong</b> the festival by two days next year."
    }
   ]
  },
  "C1": {
   "key": "Read each gap as a syntactic slot: noun heads after possessives, determiner-plus-adjective and prepositions; the bare infinitive after ‘to’; participial adjectives chosen by cause versus experiencer.",
   "body": [
    "These items test morphology in context. A possessive determiner, a determiner followed by an adjective, and a preposition all require a noun head, sometimes inside a noun-noun compound. An infinitive marker requires the base verb. After a copula, the gap typically takes an adjective, and with participial adjectives the choice depends on whether the subject causes or experiences the state.",
    "<strong>devastate</strong> gives <strong>devastation</strong>, <strong>devastating</strong>, <strong>devastated</strong> and <strong>devastatingly</strong>. The present participle adjective is causative in meaning: a devastating storm causes ruin. The past participle adjective describes the experiencer or patient: devastated survivors, a devastated coastline. So a subject that inflicts destruction takes <em>devastating</em> after the copula; the bare verb and the noun cannot function as complements here.",
    "<strong>resilient</strong>, <strong>resilience</strong>, <strong>resiliently</strong>. After a possessive only the noun can head the phrase; the adverb has no head to attach to, and <em>a resilient</em> lacks one too.",
    "<strong>mitigate</strong>, <strong>mitigation</strong>. The nominalisation is standard in policy language and readily forms compounds: <em>climate mitigation, risk mitigation, mitigation strategies</em>. A preposition cannot be followed by a finite verb form.",
    "<strong>exacerbate</strong>, <strong>exacerbation</strong>. The noun, meaning a worsening, often appears in the frame <em>an exacerbation of</em> plus the problem and takes adjectives such as <em>sharp, sudden</em> or <em>further</em>. After such an adjective the verb forms, finite or non-finite, are impossible.",
    "<strong>prolong</strong> (verb, to extend in time) and <strong>prolonged</strong> (adjective). After <em>to</em>, including in frames such as <em>is likely to</em> or <em>is set to</em>, only the bare infinitive is grammatical."
   ],
   "examples": [
    {
     "s": "<b>devastating</b> (adjective)",
     "g": "The report described the cyclone as <b>devastating</b> and the coastal towns as utterly <b>devastated</b>."
    },
    {
     "s": "<b>resilience</b> (noun)",
     "g": "Bangkok’s <b>resilience</b> depends as much on its communities as on its pumps."
    },
    {
     "s": "<b>mitigation</b> (noun)",
     "g": "Most climate <b>mitigation</b> funding goes to energy rather than to adaptation."
    },
    {
     "s": "<b>exacerbation</b> (noun)",
     "g": "Analysts warned of a sharp <b>exacerbation</b> of inequality after the factory closures."
    },
    {
     "s": "<b>prolong</b> (verb)",
     "g": "The heavy fighting is likely to <b>prolong</b> the shortage of medicine in the region."
    }
   ]
  }
 },
 "u5w2s3": {
  "B1": {
   "key": "After ‘was’ for a passive and after ‘has’ use the past participle; after ‘very’ or ‘so’ use an adjective; after ‘no’ use a noun.",
   "body": [
    "First, look at the word before the gap. After <em>was</em> or <em>were</em> in a <strong>passive</strong> (the subject receives the action), use the <strong>past participle</strong> (V3). After <em>has</em> or <em>have</em>, also use V3. After <em>very</em>, <em>so</em> or <em>felt</em>, you usually need an <strong>adjective</strong>. After <em>a</em>, <em>the</em> or <em>no</em>, you need a <strong>noun</strong>.",
    "<strong>Discharge</strong> is a verb (let water flow out) and also a noun. Its V3 is <em>discharged</em>. Water does not let itself out; people or a dam let it out. So when the doer comes after <em>by</em>, use the passive: <em>was</em> plus <em>discharged</em>. Do not write <s>was discharge</s>. <em>Was discharging</em> is wrong here too, because it makes the water the doer.",
    "<strong>Trying</strong> (adjective) means <strong>difficult and stressful</strong>, as in <em>trying times</em>. The other forms are different: <em>try</em> (verb or noun), <em>tries</em> (verb or plural noun) and <em>tried</em> (verb form). None of them can describe a hard period. So when the gap needs an adjective for a hard time, only <em>trying</em> works.",
    "<strong>Unprecedented</strong> is built from <em>un-</em> (not), <em>precedent</em> and <em>-ed</em>. A <strong>precedent</strong> (noun) is an earlier example. So something <em>without precedent</em> never happened before. People can also <em>set a precedent</em> (do something first, so others can follow). Do not confuse it with <em>president</em> (a leader of a country), which sounds similar. <em>Precedence</em> (noun) means priority, as in ‘take precedence over’. After <em>a</em>, <em>the</em> or <em>no</em>, you need the noun, not the adjective <em>unprecedented</em>.",
    "The <strong>relief</strong> family: <em>relief</em> (noun), <em>relieve</em> (verb, make pain or worry less) and <em>relieved</em> (adjective). Use <strong>relieved</strong> for <strong>how a person feels</strong> after a worry ends. An <em>-ing</em> form would describe the situation, not the feeling. After <em>so</em>, the noun and the verb do not fit.",
    "<strong>Subside</strong> (verb, go down). Its forms are <em>subside</em>, <em>subsides</em>, <em>subsided</em> and <em>subsiding</em>. In the <strong>present perfect</strong> (has or have plus V3), use <em>has subsided</em>. Subside has no object, so it has <strong>no passive</strong>. Do not write <s>was subsided</s>."
   ],
   "examples": [
    {
     "s": "<b>discharged</b> (past participle)",
     "g": "Waste water is <b>discharged</b> into the sea through a long pipe."
    },
    {
     "s": "<b>trying</b> (adjective)",
     "g": "Exam week was a <b>trying</b> time for Ice, but she stayed calm."
    },
    {
     "s": "<b>precedent</b> (noun)",
     "g": "Mint’s request set a <b>precedent</b>: now every class can ask for a longer lunch on sports day."
    },
    {
     "s": "<b>relieved</b> (adjective)",
     "g": "Fern was <b>relieved</b> to see her name on the results board."
    },
    {
     "s": "<b>subsided</b> (past participle)",
     "g": "The ferries are running again because the wind has <b>subsided</b>."
    }
   ]
  },
  "B2": {
   "key": "Passive be and the present perfect both take the past participle, ‘very’ or ‘so’ before a gap usually signals an adjective, and ‘no’ signals a noun.",
   "body": [
    "Check the word just before the gap. A passive (<em>was, were, is being</em>) and the perfect (<em>has, have, had</em>) both need the <strong>past participle</strong>. Degree words like <em>very</em> and <em>so</em> point to an <strong>adjective</strong>; for feelings, use the -ed adjective. A quantifier such as <em>no</em> points to a <strong>noun</strong>.",
    "<strong>discharge</strong> is both a verb (let liquid flow out) and a noun (a discharge of water). Water is let out by a dam or by engineers, so with a <em>by</em>-agent the clause is passive: <em>be</em> plus <em>discharged</em>. The base form and the -s form are wrong after <em>was</em>, and <em>was discharging</em> is active: it would present the water as the doer.",
    "<strong>trying</strong> (adjective) means difficult and stressful; <em>trying times</em> is the fixed phrase, and <em>a trying day</em> or <em>a trying period</em> are also common. <em>Try</em>, <em>tries</em> and <em>tried</em> are verb (or noun) forms, and <em>tried</em> does not describe a difficult period.",
    "<strong>unprecedented</strong> contains the noun <strong>precedent</strong>, an earlier example of the same kind. Something <em>without precedent</em> has never happened before; you can also <em>set a precedent</em> or <em>break with precedent</em>. Do not confuse it with <em>president</em>, a leader, or <em>precedence</em>, which means priority (<em>take precedence over</em>). After a determiner such as <em>a</em>, <em>the</em> or <em>no</em>, the noun is needed, not the adjective.",
    "<strong>relief</strong> (noun), <strong>relieve</strong> (verb), <strong>relieved</strong> (adjective: how someone feels). After <em>so</em> or <em>felt</em>, describing people, use the -ed adjective. <em>Relieving</em> would describe the situation, not the feeling, and is rare in this sense.",
    "<strong>subside</strong> (verb) has the forms <em>subside, subsides, subsided, subsiding</em>. The present perfect needs <em>has subsided</em>. Because subside is intransitive, it has no passive: <s>was subsided</s> is impossible."
   ],
   "examples": [
    {
     "s": "<b>discharged</b> (past participle)",
     "g": "Treated water is <b>discharged</b> into the river every night after testing."
    },
    {
     "s": "<b>trying</b> (adjective)",
     "g": "The three-hour delay at the airport was a very <b>trying</b> experience for the team."
    },
    {
     "s": "<b>precedent</b> (noun)",
     "g": "The court’s decision created a <b>precedent</b> for similar cases in the future."
    },
    {
     "s": "<b>relieved</b> (adjective)",
     "g": "Praew was hugely <b>relieved</b> to hear that the X-ray was clear."
    },
    {
     "s": "<b>subsided</b> (past participle)",
     "g": "Now that the protests have <b>subsided</b>, the shops on the main road are open again."
    }
   ]
  },
  "C1": {
   "key": "Let the left context decide: auxiliary be or perfect have selects the past participle, a degree adverb selects an adjective, and the quantifier ‘no’ selects a noun.",
   "body": [
    "In these items the word immediately before the gap is decisive. Passive <em>be</em> and perfect <em>have</em> both select the <strong>past participle</strong>. Degree adverbs (<em>very, so, extremely</em>) select an <strong>adjective</strong>, and for emotional states the -ed participle adjective describes the experiencer. The negative quantifier <em>no</em> selects a <strong>noun</strong>.",
    "<strong>discharge</strong> (verb and noun). With a <em>by</em>-phrase naming the people who release the water, the structure is passive: <em>be</em> plus <em>discharged</em>. <em>Was discharging</em> would be an active progressive, and presenting the water as the agent of its own release contradicts the <em>by</em>-agent. The bare and -s forms cannot follow auxiliary <em>be</em>.",
    "<strong>trying</strong> (adjective) means taxing or stressful, a meaning distinct from the verb <em>try</em> (attempt). It collocates with <em>times, period, day, circumstances</em>. Only the adjective fits after <em>very</em>; <em>tried</em> works as an adjective mainly in <em>tried and tested</em>, meaning proven, which is the wrong meaning here.",
    "<strong>unprecedented</strong> derives from <strong>precedent</strong>, a previous instance used as a model or comparison: <em>set a precedent</em>, <em>without precedent</em>, <em>break with precedent</em>. Beware the paronyms: <em>president</em> (a head of state) and <em>precedence</em> (priority, as in <em>take precedence over</em>). The adjective cannot head a noun phrase after a determiner or quantifier.",
    "<strong>relief</strong> (noun), <strong>relieve</strong> (verb), <strong>relieved</strong> (adjective, the experiencer’s feeling). The -ing form describes a stimulus rather than a feeling and is marginal in this sense, so after <em>so</em> describing people, the -ed adjective is required.",
    "<strong>subside</strong> is intransitive, so it forms the perfect (<em>has subsided</em>) but never the passive: <s>was subsided</s> is ungrammatical, like <s>was happened</s>. If you need a passive, change the verb: the water <em>was pumped out</em>."
   ],
   "examples": [
    {
     "s": "<b>discharged</b> (past participle)",
     "g": "Excess water is <b>discharged</b> from the reservoir only when levels approach the safety limit."
    },
    {
     "s": "<b>trying</b> (adjective)",
     "g": "Two months in a relative’s spare room made it a <b>trying</b> period for Nan."
    },
    {
     "s": "<b>precedent</b> (noun)",
     "g": "There is little <b>precedent</b> for a student council negotiating directly with the ministry."
    },
    {
     "s": "<b>relieved</b> (adjective)",
     "g": "The organisers were so <b>relieved</b> that the rain held off until the final speech."
    },
    {
     "s": "<b>subsided</b> (past participle)",
     "g": "Public anger has largely <b>subsided</b> since the minister apologised."
    }
   ]
  }
 },
 "u5w3s1": {
  "B1": {
   "key": "In a sentence, check two things: what kind of thing the word goes with (people, a place, water, a problem, a time), and whether the word needs an object.",
   "body": [
    "Here the words sit in real sentences. Choose by meaning and by grammar. First, ask what the word is about: people, a place, water, a problem or a period of time. Then ask if the verb needs an <strong>object</strong> (a thing after the verb). News often uses the <strong>passive</strong> (be plus V3) with these words. The passive puts the people or places that suffer first.",
    "<strong>Evacuate</strong> takes <strong>people or a place</strong> as its object. Officials evacuate <strong>residents</strong> (the people who live there). Staff evacuate a building, which means they get everyone out quickly. In the passive: the residents <em>were evacuated</em>, the building <em>was evacuated</em>. A place is evacuated <strong>of</strong> people, never ‘with’ things. The subject is people, like officials or staff, never water or weather.",
    "<strong>Inundate</strong> has two uses. First, water or rain inundates a <strong>place</strong>: it floods low land. Second, <strong>be inundated with</strong> something means you get far too much of it, like emails, complaints or orders. The passive with ‘with’ is very common for this second meaning.",
    "<strong>Displaced</strong> is for <strong>people</strong> forced to leave their homes: displaced families, displaced residents. In the passive: thousands of people <em>were displaced</em> by the floods. Not places: places are <strong>submerged</strong> (under water). Families are not submerged.",
    "<strong>Aftermath</strong> (noun) is the period after a disaster: <strong>in the aftermath of</strong> the storm. It is a period of time. Do not mix it up with <em>relief</em>, which is help or a good feeling, not a period.",
    "Remember how the other unit words work. <em>Mitigate</em> takes a <strong>problem</strong> as its object, like the damage or the risk. It never takes a place or a person. <em>Devastate</em> means destroy. <em>Subside</em> means go down, and it has <strong>no object</strong>. <em>Prolonged</em> describes events or periods that last a long time. <em>Unprecedented</em> describes events that never happened before, not people."
   ],
   "examples": [
    {
     "s": "<b>were evacuated</b> (passive verb)",
     "g": "Two hundred students <b>were evacuated</b> from the science building after a gas leak."
    },
    {
     "s": "<b>be inundated with</b> (phrase)",
     "g": "Praew’s food stall <b>was inundated with</b> orders after a famous YouTuber visited."
    },
    {
     "s": "<b>inundate</b> (verb)",
     "g": "Every rainy season, the river <b>inundates</b> the rice fields near Ayutthaya."
    },
    {
     "s": "<b>were displaced</b> (passive verb)",
     "g": "Many fishing families <b>were displaced</b> when the sea wall broke."
    },
    {
     "s": "<b>aftermath</b> (noun)",
     "g": "In the <b>aftermath</b> of the floods, Ice’s family slept at the district office for a week."
    }
   ]
  },
  "B2": {
   "key": "Choose by meaning and by grammar: what the word collocates with (people, places, water, problems, periods) and whether it needs an object; several of these words are typically passive in flood news.",
   "body": [
    "In context questions the meaning must fit and so must the grammar. Ask what the subject or object is: people, a place, water, a problem or a period of time. Then ask whether the verb is transitive (needs an object). Flood reports often use these words in the <strong>passive</strong>, because the people and places affected matter more than the doer.",
    "<strong>Evacuate</strong> takes people or a place as object: <em>evacuate residents, evacuate a building</em>, meaning get everyone out quickly. Passive: <em>residents were evacuated, the school was evacuated</em>. A place is evacuated <em>of</em> people, never <em>with</em> things. Residents can also evacuate intransitively, meaning leave, but the subject is always human, never water or weather.",
    "<strong>Inundate</strong> has a literal use, where water or rain inundates a place (floods low land near a river or the sea), and a figurative use, <strong>be inundated with</strong> plus a large number of things such as calls, applications or complaints, meaning receive far more than you can handle. The figurative use is almost always passive.",
    "<strong>Displaced</strong> describes people forced from their homes: <em>displaced families</em>; in the passive, <em>thousands were displaced</em>. It does not describe places or periods. Places are <strong>submerged</strong> (under water); people are not submerged in this sense.",
    "<strong>Aftermath</strong> is the period after a disaster: <em>in the aftermath of</em> plus the event. It names a period, so do not confuse it with <em>relief</em> (aid or a feeling) or <em>discharge</em> (water released from a dam).",
    "How the other unit words behave: <em>mitigate</em> takes a problem as object (effects, damage, risk), never a place or a person; <em>devastate</em> means destroy; <em>subside</em> is intransitive and means go down; <em>prolonged</em> describes long-lasting events or periods; <em>unprecedented</em> describes events never seen before, not people."
   ],
   "examples": [
    {
     "s": "<b>was evacuated</b> (passive verb)",
     "g": "The shopping mall <b>was evacuated</b> within minutes when the fire alarm went off."
    },
    {
     "s": "<b>be inundated with</b> (phrase)",
     "g": "After the video went viral, the café <b>was inundated with</b> bookings for the weekend."
    },
    {
     "s": "<b>inundate</b> (verb)",
     "g": "Seasonal storms regularly <b>inundate</b> the coastal villages south of Hua Hin."
    },
    {
     "s": "<b>were displaced</b> (passive verb)",
     "g": "Around a thousand residents <b>were displaced</b> when the river burst its banks."
    },
    {
     "s": "<b>aftermath</b> (noun)",
     "g": "In the <b>aftermath</b> of the flood, Mint’s school became a distribution centre for supplies."
    }
   ]
  },
  "C1": {
   "key": "Context items combine selection restrictions (what each word can combine with) and valency (whether it takes an object); these words also show which ones news writers habitually passivise.",
   "body": [
    "Decide by semantic fit and by syntax together. Each word has selection restrictions: some take people, some places, some liquids, some problems, some periods. Transitivity matters too, since an intransitive verb cannot take an object or a passive. In flood reporting several of these words occur mainly in the <strong>passive</strong>, because the affected people and places are the topic and the agent is obvious or unimportant.",
    "<strong>Evacuate</strong> is transitive with a human or locative object, <em>evacuate residents, evacuate a ward</em>, and frequently passive: <em>residents were evacuated</em>. The locative passive takes <em>of</em> (<em>the building was evacuated of all staff</em>), never <em>with</em>. Its intransitive use (<em>residents evacuated</em>) requires a human subject; rain or water cannot evacuate anyone.",
    "<strong>Inundate</strong> has a literal sense, water flooding a place (<em>the storm surge inundated the coast</em>), and a figurative sense, <strong>be inundated with</strong> plus a mass of things (requests, complaints, applications), meaning to be overwhelmed by their number. The figurative sense is overwhelmingly passive and at least as frequent as the literal one in general English.",
    "<strong>Displaced</strong> selects human referents: displaced families or communities, and in the passive <em>thousands were displaced by the flooding</em>. It does not apply to places or periods; locations are <strong>submerged</strong>, a word that selects physical objects and land, not people as a group.",
    "<strong>Aftermath</strong> collocates almost exclusively in <em>in the aftermath of</em> plus an event. It denotes a period with its consequences, which is why <em>relief</em> (aid or the end of anxiety) and <em>discharge</em> (a release of liquid) cannot occupy that frame.",
    "The other unit words differ in selection or valency: <em>mitigate</em> needs a problem as object (impact, damage, risk), <em>devastate</em> means destroy, <em>subside</em> is intransitive (go down), <em>prolonged</em> modifies events and periods, and <em>unprecedented</em> modifies events or quantities, not people."
   ],
   "examples": [
    {
     "s": "<b>was evacuated</b> (passive verb)",
     "g": "The entire ward <b>was evacuated</b> of patients before the generators failed."
    },
    {
     "s": "<b>be inundated with</b> (phrase)",
     "g": "The ticket website <b>was inundated with</b> requests within a minute of the concert announcement."
    },
    {
     "s": "<b>inundate</b> (verb)",
     "g": "A tidal surge <b>inundated</b> the low-lying fish farms along the coast."
    },
    {
     "s": "<b>were displaced</b> (passive verb)",
     "g": "Entire communities <b>were displaced</b> when the reservoir was built in the 1970s."
    },
    {
     "s": "<b>aftermath</b> (noun)",
     "g": "In the <b>aftermath</b> of the cyclone, aid agencies struggled to reach the outer islands."
    }
   ]
  }
 },
 "u5w3s2": {
  "B1": {
   "key": "Decide the direction first: does the sentence make a problem worse (exacerbate) or less bad (mitigate)? Then check what each adjective can describe.",
   "body": [
    "First, decide the <strong>direction</strong> of the sentence. Is something bad getting worse, or less bad? Ask: is the subject something harmful, or something people do to help? Next, look at what the word goes with: a problem, people, or a period of time. In the news, these words are often <strong>passive</strong> (be plus V3). For example: <em>was devastated by</em>, <em>was exacerbated by</em>. Use what you know about floods, too. Forests, canals and <strong>wetlands</strong> (low, wet land) hold rainwater like a sponge. Destroying them or covering them with concrete is harmful. Pumps, drains and flood walls help.",
    "<strong>Exacerbate</strong> means make a problem <strong>worse</strong>. Its object is a problem, a risk or a situation. The subject is the thing that makes it worse. For example, cutting down trees can exacerbate landslides. Passive: the problem <em>was exacerbated by</em> something.",
    "<strong>Mitigate</strong> means make a problem <strong>less serious</strong>. Its object is the effect, the damage, the impact or the risk. People and plans mitigate things. Passive: the risk <em>can be mitigated</em>. If the people in the sentence want a smaller bad effect, mitigate fits.",
    "<strong>Devastate</strong> means destroy, and it is often passive: <em>the town was devastated by the storm</em>. <strong>Prolonged</strong> (adjective) means lasting a long time. It goes before words of time or experience: a prolonged period, prolonged rain. <strong>Prolonged exposure</strong> means being in contact with something harmful for a long time.",
    "<strong>Resilient</strong> describes <strong>people, communities or systems</strong> that recover. It cannot describe a period or exposure. <strong>Displaced</strong> describes people forced from home. <strong>Submerged</strong> means under water, so it describes things and places. A period of time or an exposure cannot be under water.",
    "Remember the other unit words: <em>subside</em> (go down) has <strong>no object</strong>. <em>Evacuate</em> takes people or places as its object. <em>Discharge</em> is for <strong>liquids</strong>, like water, not for risks or effects. <em>Inundate</em> means flood."
   ],
   "examples": [
    {
     "s": "<b>exacerbate</b> (verb)",
     "g": "Shouting at the referee <b>exacerbated</b> the bad feeling on the court."
    },
    {
     "s": "<b>be mitigated</b> (passive verb)",
     "g": "The heat in the classroom <b>can be mitigated</b> with fans and thick curtains."
    },
    {
     "s": "<b>was devastated</b> (passive verb)",
     "g": "The orchard <b>was devastated</b> by a single night of hail."
    },
    {
     "s": "<b>prolonged</b> (adjective)",
     "g": "<b>Prolonged</b> use of a phone screen at night can hurt your sleep."
    },
    {
     "s": "<b>resilient</b> (adjective)",
     "g": "Fern’s little sister is <b>resilient</b>; she was back at school a week after her operation."
    }
   ]
  },
  "B2": {
   "key": "First establish the direction (worse or less bad), then check selection: exacerbate and mitigate take problems, resilient describes people and systems, prolonged describes durations.",
   "body": [
    "Work out the direction of the sentence first. Is a problem getting worse or being reduced? A harmful action as subject points to worsening; a purpose like <em>to protect</em> or <em>to help</em> points to reducing. Then check what each word can combine with. In the news these words are often passive: <em>was devastated by</em>, <em>was exacerbated by</em>, <em>can be mitigated</em>. Bring in what you know about how floods work: forests, canals and wetlands absorb and carry rainwater, so destroying them or covering them with concrete is harmful, while pumps, drains and embankments are protective.",
    "<strong>Exacerbate</strong> means make an existing problem worse. Its object is a problem or risk (<em>exacerbate the shortage, exacerbate the risk</em>), and its subject is the harmful cause, often a gerund such as <em>cutting down</em> or <em>dumping</em>. Passive: <em>the shortage was exacerbated by panic buying</em>.",
    "<strong>Mitigate</strong> means reduce the harm of something; it takes objects like <em>the effects, the impact, the damage, the risk</em>. People, plans or projects are its subject, and it often follows <em>to</em> when expressing a purpose. Passive: <em>the impact can be mitigated</em>.",
    "<strong>Devastate</strong> means destroy and is typically passive with a <em>by</em>-agent. <strong>Prolonged</strong> modifies durations and experiences: <em>a prolonged period, prolonged rain, prolonged exposure</em>, which means long contact with something harmful. The verb <em>prolong</em> can also be passive: <em>the crisis was prolonged by delays</em>.",
    "<strong>Resilient</strong> describes people, communities or systems that recover, not periods or exposure. <strong>Displaced</strong> describes people forced from home. <strong>Submerged</strong> describes physical things under water, so it cannot describe a period or an exposure.",
    "The other unit words: <em>subside</em> is intransitive, so it cannot take an object; <em>evacuate</em> takes people or places; <em>discharge</em> is used for liquids, not risks or effects; <em>inundate</em> means flood."
   ],
   "examples": [
    {
     "s": "<b>exacerbate</b> (verb)",
     "g": "Cutting down the mangroves has <b>exacerbated</b> erosion along the coast."
    },
    {
     "s": "<b>be mitigated</b> (passive verb)",
     "g": "The impact of the haze <b>can be mitigated</b> by wearing proper masks outdoors."
    },
    {
     "s": "<b>was devastated</b> (passive verb)",
     "g": "The small island <b>was devastated</b> by the 2004 tsunami."
    },
    {
     "s": "<b>prolonged</b> (adjective)",
     "g": "<b>Prolonged</b> sitting without breaks can cause back pain in students."
    },
    {
     "s": "<b>resilient</b> (adjective)",
     "g": "A <b>resilient</b> power grid can restore electricity within hours of a storm."
    }
   ]
  },
  "C1": {
   "key": "Determine polarity first, worsening versus alleviation, then apply selection restrictions: exacerbate and mitigate take problems as objects, resilient takes recoverable entities, prolonged takes durations.",
   "body": [
    "Establish the polarity of the clause before reading the options. A harmful activity as subject signals aggravation; purpose clauses with aims like protecting or helping signal alleviation. Then test selection restrictions. In reporting, these verbs frequently appear in the passive, with the cause in a <em>by</em>-phrase when it is new information: <em>was exacerbated by</em>, <em>was devastated by</em>, <em>could be mitigated</em>. Apply real-world knowledge of flood hydrology here: forests, canals and wetlands absorb and channel rainwater, so clearing, filling or paving them aggravates risk, whereas pumping stations, retention ponds and embankments are mitigation measures.",
    "<strong>Exacerbate</strong> takes an existing problem as object (<em>exacerbate the risk, the shortage, tensions</em>); its subject is the aggravating factor, often a gerund clause describing a harmful practice. Passive: <em>the crisis was exacerbated by poor communication</em>.",
    "<strong>Mitigate</strong> takes the harm itself as object (<em>impact, effects, damage, risk</em>) and an agent with an intention, such as researchers, authorities or a scheme; it often appears in a purpose infinitive. Passive: <em>the damage could have been mitigated</em>.",
    "<strong>Devastate</strong> is most common in the passive with a <em>by</em>-agent naming the event. <strong>Prolonged</strong> modifies nouns of duration or experience: <em>a prolonged period, prolonged drought, prolonged exposure</em> (sustained contact with something harmful), a standard medical and scientific collocation. The verb <em>prolong</em> also passivises: <em>the shortage was prolonged by delays</em>.",
    "<strong>Resilient</strong> selects entities capable of recovery: people, communities, ecosystems, infrastructure. <strong>Displaced</strong> selects people. <strong>Submerged</strong> selects physical objects or land; a period or an exposure cannot be under water.",
    "The other unit words differ in valency or selection: <em>subside</em> is intransitive and cannot take a direct object; <em>evacuate</em> takes people or places; <em>discharge</em> takes liquids or gases, not abstract risks or effects; <em>inundate</em> means flood or overwhelm."
   ],
   "examples": [
    {
     "s": "<b>exacerbate</b> (verb)",
     "g": "Paving over the city’s green spaces has <b>exacerbated</b> the urban heat island effect."
    },
    {
     "s": "<b>be mitigated</b> (passive verb)",
     "g": "Much of the economic damage <b>could have been mitigated</b> by earlier warnings."
    },
    {
     "s": "<b>was devastated</b> (passive verb)",
     "g": "The tourist economy of the island <b>was devastated</b> by two years of border closures."
    },
    {
     "s": "<b>prolonged</b> (adjective)",
     "g": "Outdoor workers now take shade breaks every hour to avoid <b>prolonged</b> exposure to the midday heat."
    },
    {
     "s": "<b>resilient</b> (adjective)",
     "g": "Mixed farming makes rural households more <b>resilient</b> to failed harvests."
    }
   ]
  }
 },
 "u5w3s3": {
  "B1": {
   "key": "Check the grammar and the type of meaning: discharge takes a liquid, subside has no object, relief can be a feeling, trying times is a hard period, and unprecedented means never before.",
   "body": [
    "Read the whole sentence. First ask what the gap needs. Is it a verb with an object, or a verb with no object? Is it a feeling, a period of time, or a describing word? Then match the meaning. Some of these words are often <strong>passive</strong> in news: water <em>was discharged</em>, help <em>is being delivered</em>. One word, <em>subside</em>, can <strong>never</strong> be passive.",
    "<strong>Discharge</strong> takes a <strong>liquid</strong> as its object: discharge water, discharge waste. We often say <strong>discharge</strong> something <strong>into</strong> a river or the sea. Passive: the water <em>was discharged</em>. Compare: <em>inundate</em> takes a place as its object, so you cannot ‘inundate water into’ something. <em>Mitigate</em> takes a problem. <em>Devastate</em> means destroy.",
    "<strong>Subside</strong> means go down, and it has <strong>no object</strong>. Water subsides, pain subsides, and a storm subsides. Nothing comes after it, so the sentence can end with it. Do not write <s>was subsided</s>. <em>Inundate</em> and <em>devastate</em> need an object after them. People evacuate, but water does not.",
    "<strong>Relief</strong> can be help for victims, or the <strong>good feeling</strong> when a worry ends. Common phrases are <strong>a sigh of relief</strong> and <strong>a wave of relief</strong>. Some nouns are not feelings. The <em>aftermath</em> is a period after a disaster. <em>Trying times</em> is a difficult period. A <em>discharge</em> is water let out.",
    "<strong>Trying times</strong> (phrase) means a <strong>difficult, stressful period</strong>. It is a set phrase, so do not change the words. It sounds formal and kind, so you find it in speeches, notices and letters. It is never a happy or easy time.",
    "<strong>Unprecedented</strong> means it <strong>never happened before</strong>. Compare: <em>prolonged</em> is about <strong>how long</strong> something lasts, not about the first time. <em>Resilient</em> and <em>displaced</em> describe people."
   ],
   "examples": [
    {
     "s": "<b>discharge</b> (verb)",
     "g": "The farm was told to stop <b>discharging</b> pig waste into the stream."
    },
    {
     "s": "<b>subside</b> (verb)",
     "g": "We waited in the hall for the noise to <b>subside</b> before the show began."
    },
    {
     "s": "<b>relief</b> (noun)",
     "g": "Ploy felt a wave of <b>relief</b> when her sister’s train arrived on time."
    },
    {
     "s": "<b>trying times</b> (phrase)",
     "g": "Our teacher sent the class a kind message about staying strong in <b>trying times</b>."
    },
    {
     "s": "<b>unprecedented</b> (adjective)",
     "g": "Nan’s team scored <b>unprecedented</b> marks; no class had ever done so well."
    }
   ]
  },
  "B2": {
   "key": "Use valency and meaning together: discharge takes a liquid object, subside takes none and has no passive, relief can name a feeling, trying times names a hard period, and unprecedented means never before.",
   "body": [
    "Check what the gap needs grammatically: a transitive verb with an object, an intransitive verb, a noun for a feeling or for a period, or an adjective. Then check the meaning. In flood reporting, <em>discharge</em> and the noun <em>relief</em> often appear in passive clauses (<em>water was discharged, relief is being delivered</em>), while <em>subside</em> can never be passive.",
    "<strong>Discharge</strong> takes a liquid or gas as object, often with <em>into</em>: <em>discharge waste water into the river</em>. Passive: <em>water was discharged</em>. <em>Inundate</em> takes a place, not water, as its object, so ‘inundate water into’ is impossible; <em>mitigate</em> takes a problem; <em>devastate</em> means destroy.",
    "<strong>Subside</strong> is intransitive: the level <em>slowly subsides</em>, and the clause is complete without an object. <s>Was subsided</s> is impossible. By contrast, <em>inundate</em> and <em>devastate</em> need an object, and <em>evacuate</em> is something people do, not water.",
    "<strong>Relief</strong> means aid, or the pleasant feeling when anxiety ends: <em>a sigh of relief, to our relief</em>. Other nouns in the options are not feelings: the <em>aftermath</em> is a period after a disaster, <em>trying times</em> is a difficult period, and a <em>discharge</em> is a release of water.",
    "<strong>Trying times</strong> is a fixed phrase for a difficult, stressful period, often with <em>these</em>. It is typical of formal letters, notices and speeches, and it always implies hardship, never a pleasant or ordinary period.",
    "<strong>Unprecedented</strong> means never having happened before, so it is about history and comparison: nothing like it before. <em>Prolonged</em> concerns duration, not novelty, and <em>resilient</em> and <em>displaced</em> describe people, not events."
   ],
   "examples": [
    {
     "s": "<b>discharge</b> (verb)",
     "g": "The resort was fined for <b>discharging</b> sewage into the bay."
    },
    {
     "s": "<b>subside</b> (verb)",
     "g": "The tour guide said the boat trip would go ahead once the waves <b>subsided</b>."
    },
    {
     "s": "<b>relief</b> (noun)",
     "g": "To the hotel manager’s <b>relief</b>, the power came back before dinner service."
    },
    {
     "s": "<b>trying times</b> (phrase)",
     "g": "Many small guesthouses on the island closed during those <b>trying times</b>."
    },
    {
     "s": "<b>unprecedented</b> (adjective)",
     "g": "The festival attracted an <b>unprecedented</b> crowd; nothing on that scale had been seen before."
    }
   ]
  },
  "C1": {
   "key": "Valency and semantic type decide these items: discharge is transitive with a liquid object, subside is intransitive with no passive, relief can denote a feeling, trying times a hard period, and unprecedented novelty rather than duration.",
   "body": [
    "Analyse the frame around the gap: transitive or intransitive verb, a noun denoting an emotion or a period, or an adjective of novelty versus duration. In flood reporting, <em>discharge</em> and <em>relief</em> are common in passive clauses, as in <em>water was discharged</em> and <em>relief is still being delivered</em>, whereas the intransitive <em>subside</em> has no passive at all.",
    "<strong>Discharge</strong> is transitive with a liquid or gaseous object, frequently with a goal phrase in <em>into</em>: <em>discharge effluent into the sea</em>; passive <em>was discharged</em>. <em>Inundate</em> takes the flooded place as object, so ‘inundate water into’ is ill-formed; <em>mitigate</em> takes a harm; <em>devastate</em> means destroy and cannot take a goal phrase.",
    "<strong>Subside</strong> is intransitive, so it completes a clause on its own (<em>the swell gradually subsided</em>) and cannot be passivised: <s>was subsided</s>. Transitive verbs such as <em>inundate</em> and <em>devastate</em> would be left without their object, and <em>evacuate</em> requires a human subject when intransitive.",
    "<strong>Relief</strong> denotes either aid or the emotional release when anxiety ends, with collocations such as <em>a sigh of relief</em> and <em>to her great relief</em>. Nouns denoting periods or events cannot stand in for an emotion: <em>aftermath</em> and <em>trying times</em> are periods, <em>discharge</em> is a physical release.",
    "<strong>Trying times</strong> is a fixed, slightly formal phrase for a period of hardship, often with the demonstrative <em>these</em>, and conventional in formal letters, notices and speeches. Its defining feature is the implication of hardship: it never describes a neutral or pleasant period.",
    "<strong>Unprecedented</strong> concerns novelty: there has been no earlier comparable case, so it is a claim about historical comparison. <em>Prolonged</em> concerns duration, and <em>resilient</em> and <em>displaced</em> select human referents, not events or phenomena."
   ],
   "examples": [
    {
     "s": "<b>discharge</b> (verb)",
     "g": "Upstream dams began <b>discharging</b> water into the river earlier than usual this year."
    },
    {
     "s": "<b>subside</b> (verb)",
     "g": "The gusts <b>subsided</b> within an hour, and the hikers continued to the summit."
    },
    {
     "s": "<b>relief</b> (noun)",
     "g": "There was an audible sigh of <b>relief</b> in the hall when the examiner announced the extension."
    },
    {
     "s": "<b>trying times</b> (phrase)",
     "g": "In these <b>trying times</b>, the hotel’s owner chose to cut her own salary rather than her staff’s."
    },
    {
     "s": "<b>unprecedented</b> (adjective)",
     "g": "The heatwave produced <b>unprecedented</b> demand for electricity; the grid had never been tested like that."
    }
   ]
  }
 },
 "u6g1s1": {
  "B1": {
   "key": "A plain passive says a job was done; <strong>have + object + V3</strong> says a person arranged for somebody else to do it.",
   "body": [
    "Look at two sentences. <em>The curtains <b>were washed</b> on Monday.</em> This is a <strong>plain passive</strong> (be + V3). It only reports the job. <em>Fern <b>had the curtains washed</b> on Monday.</em> This is a <strong>causative</strong> (a pattern for a job that another person does for you). Fern arranged it, and a laundry did the work. We do not name the laundry.",
    "Build the causative in three parts. First, <em>have</em>. Then the <strong>object</strong> (the thing that gets the job). Last, the <strong>V3</strong> (the past participle, like <em>washed, fixed, ironed, printed</em>). The object always sits in the middle. After the object, do not use the base verb, <em>to</em> or <em>-ing</em>. Write <em>had the curtains washed</em>, not <s>had the curtains wash</s> or <s>had the curtains to wash</s>.",
    "Watch the word order. If nothing comes between <em>had</em> and the V3, it is a different tense. <em>Nan had fixed her bike</em> is the <strong>past perfect</strong> (an earlier past). It means Nan fixed it herself. <em>Nan had her bike fixed</em> means a mechanic fixed it. The past perfect also needs a second, later past moment: something happened <em>before</em> another past event. With only one finished time, such as <em>yesterday</em> or <em>in June</em>, and no later event, the past perfect does not fit. So ask one question: did the subject do the work? If the answer is no, put the object in the middle.",
    "Only <em>have</em> changes for time. The V3 never changes. Every week: <em>She has her uniform ironed.</em> Now: <em>She is having her uniform ironed.</em> Last week: <em>She had her uniform ironed.</em> A plan: <em>She is going to have her uniform ironed.</em> A polite request: <em>Could I have my uniform ironed, please?</em> Use the time words in the sentence, like <em>yesterday</em> or <em>every week</em>, to choose the form of <em>have</em>.",
    "The causative needs a person, or a hotel or school, that arranges the job. If the subject is a thing, like windows or a car, use the plain passive: <em>The windows were cleaned.</em> A thing cannot arrange a service. A thing cannot be the doer either. So an active verb is wrong here: <s>The windows had cleaned</s>. Remember that <em>was</em> or <em>were</em> + <em>-ing</em> is active too. It means the subject was doing something. Also, a plain passive cannot have an object after it. Write <em>We had our photos printed</em>, not <s>We were printed our photos</s>.",
    "Negatives and questions use <em>do, does</em> or <em>did</em>, like normal verbs such as <em>eat</em> or <em>go</em>. Here <em>have</em> is not a helper verb, so it cannot make its own negative. <em>I didn't have my bike fixed, so I walked.</em> <em>Did you have your bike fixed?</em> Do not use any other helper: <s>I haven't my bike fixed</s> is wrong."
   ],
   "examples": [
    {
     "s": "The classroom fans <b>were cleaned</b> on Friday.",
     "g": "Plain passive. The subject is a thing, and the sentence just reports the job."
    },
    {
     "s": "Our teacher <b>had the classroom fans cleaned</b> on Friday.",
     "g": "Causative. The teacher arranged it; somebody else cleaned them."
    },
    {
     "s": "Mint <b>had painted</b> the poster herself before the art teacher saw it.",
     "g": "Past perfect. Nothing between had and V3, so Mint did it."
    },
    {
     "s": "Could I <b>have this shirt ironed</b> before dinner, please?",
     "g": "A polite request for a service: could I have + object + V3."
    },
    {
     "s": "I <b>didn't have</b> my passport photo <b>taken</b>, so I couldn't apply.",
     "g": "Negative with didn't, then have + object + V3."
    }
   ]
  },
  "B2": {
   "key": "The plain passive reports a job; <strong>have + object + V3</strong> says the subject arranged for somebody else to do it.",
   "body": [
    "<em>The curtains <b>were washed</b> on Monday</em> is a plain passive: it reports a job and the curtains are the subject. <em>Fern <b>had the curtains washed</b> on Monday</em> is a <strong>causative</strong>: Fern arranged the job, a laundry did it, and the doer is not named. Both contain a V3; the difference is whether the subject is the thing that receives the job or the person who arranged it.",
    "The causative has three fixed slots: <em>have</em>, then the object, then the V3. The object must sit between <em>have</em> and the participle, and the participle is always a V3 — never the base form, never <em>to</em> + verb, never <em>-ing</em>. <s>had the curtains wash</s> and <s>had the curtains to wash</s> are both wrong.",
    "Word order is also what separates the causative from the perfect tenses. <em>Nan had fixed her bike</em>, with nothing between <em>had</em> and the V3, is the past perfect: Nan did the repair herself, before another past moment. <em>Nan had her bike fixed</em> means a mechanic did it. If the context shows the subject could not or did not do the work (she has no skill or no tools, or the sentence names another doer), you need the object in the middle.",
    "The tense lives entirely in <em>have</em>: <em>has her uniform ironed</em> (routine), <em>is having it ironed</em> (now), <em>had it ironed</em> (finished past, with markers such as <em>yesterday</em> or <em>in 2025</em>), <em>is going to have it ironed</em> (plan), <em>Could I have it ironed?</em> (request for a service).",
    "If the subject is a thing that receives the action, use the plain passive (<em>The windows were cleaned</em>), not a causative: windows cannot arrange anything. Any active form wrongly makes the thing the doer, and that includes the continuous: <em>were cleaning</em> is active, just like <s>had cleaned</s>. And a passive verb cannot take an object after it: <s>We were printed our photos</s> should be <em>We had our photos printed</em>.",
    "Here <em>have</em> is an ordinary main verb, not a helper, so negatives and questions need <em>do, does</em> or <em>did</em>: <em>I didn't have my bike fixed</em>; <em>Did you have it fixed?</em> No other auxiliary can do this job, so a form such as <s>I haven't my bike fixed</s> is wrong."
   ],
   "examples": [
    {
     "s": "The classroom fans <b>were cleaned</b> on Friday.",
     "g": "Plain passive: the fans receive the job."
    },
    {
     "s": "Our teacher <b>had the classroom fans cleaned</b> on Friday.",
     "g": "Causative: the teacher arranged it; the cleaner is not named."
    },
    {
     "s": "Mint <b>had painted</b> the poster herself before the art teacher saw it.",
     "g": "Past perfect: no object in the middle, so Mint was the painter."
    },
    {
     "s": "Could I <b>have this shirt ironed</b> before dinner, please?",
     "g": "Request for a service: modal + have + object + V3."
    },
    {
     "s": "I <b>didn't have</b> my passport photo <b>taken</b>, so I couldn't apply.",
     "g": "Causative have takes did in the negative."
    }
   ]
  },
  "C1": {
   "key": "The plain passive reports the job done to a thing; <strong>have + object + V3</strong> keeps the person who arranged it as subject and leaves the doer unnamed.",
   "body": [
    "<em>The curtains <b>were washed</b> on Monday</em> is a plain passive: the thing that undergoes the action is the subject, and the job itself is the news. <em>Fern <b>had the curtains washed</b> on Monday</em> is the <strong>causative</strong>, a close relative of the passive: the subject is still not the doer, but she is the person who arranged the service. The laundry that did the work is left unnamed, which is exactly why the pattern exists.",
    "The form has three fixed slots — <em>have</em>, object, V3 — and nothing else may replace the participle: <s>had the curtains wash</s>, <s>had the curtains to wash</s> and <em>-ing</em> after the object are all errors. The tense is carried by <em>have</em> alone: <em>has it ironed</em> (routine), <em>is having it ironed</em> (in progress), <em>had it ironed</em> (finished, with a past time marker), <em>is going to have it ironed</em> (plan), <em>Could I have it ironed?</em> (a polite request for a service).",
    "Position is the signal that separates the causative from the perfect. <em>Nan had fixed her bike</em> — auxiliary <em>had</em> plus V3, object after — is the past perfect, so Nan did the repair herself. <em>Nan had her bike fixed</em> means somebody else did. The past perfect also presupposes a later past reference point; with a single finished time adverbial and no subsequent event, it is unmotivated, which leaves the causative as the natural reading. When the context tells you the subject lacked the skill or the tools, only the version with the object in the middle is logical.",
    "Choose the plain passive when the subject is the thing that receives the action: <em>The windows were cleaned</em>. A causative needs a person or an organisation able to arrange (or suffer) something, so a causative with a thing as subject is nonsense, and any active form, whether past perfect (<s>The windows had cleaned</s>) or past continuous (<em>were cleaning</em>), turns the windows into the doer. Note also that a passive verb leaves no room for a direct object: <s>We were printed our photos</s> must become <em>We had our photos printed</em>.",
    "Because causative <em>have</em> is a lexical verb, not an auxiliary, it takes <em>do</em>-support: <em>I didn't have my bike fixed</em>, <em>Did you have it fixed?</em> Any form that treats this <em>have</em> as an auxiliary, or borrows <em>be</em> or perfect <em>have</em> to carry the negative (<s>I haven't my bike fixed</s>), is ungrammatical."
   ],
   "examples": [
    {
     "s": "The classroom fans <b>were cleaned</b> on Friday.",
     "g": "Plain passive: topic is the thing; the job is the news."
    },
    {
     "s": "Our teacher <b>had the classroom fans cleaned</b> on Friday.",
     "g": "Causative: arranger as subject, doer unnamed."
    },
    {
     "s": "Mint <b>had painted</b> the poster herself before the art teacher saw it.",
     "g": "Past perfect: auxiliary had, object after the V3, so Mint did it."
    },
    {
     "s": "Could I <b>have this shirt ironed</b> before dinner, please?",
     "g": "Service request; the tense or modal sits on have."
    },
    {
     "s": "I <b>didn't have</b> my passport photo <b>taken</b>, so I couldn't apply.",
     "g": "Lexical have takes do-support."
    }
   ]
  }
 },
 "u6g1s2": {
  "B1": {
   "key": "<strong>get + object + V3</strong> means the same as <em>have</em>, and the same pattern can also tell us that something bad was done to the subject.",
   "body": [
    "<em>Get</em> + object + V3 (the past participle, like <em>fixed</em>) means the same as <em>have</em> + object + V3. It is a little less formal (more like speaking). <em>We <b>got the Wi-Fi fixed</b> in ten minutes.</em> Somebody else fixed it for us. Use the V3 after the object, not the base verb, <em>to</em> or <em>-ing</em>.",
    "The pattern has a second meaning: a <strong>bad experience</strong>. Something bad was done to the subject by another person. <em>Ice <b>had her phone stolen</b> at the bus station.</em> Ice did not steal anything, and she did not arrange it. It just happened to her. Do not write <em>Ice had stolen her phone</em>. That is the past perfect, and it says Ice was the thief. <em>Ice was stealing a phone</em> is also wrong here: <em>was</em> + <em>-ing</em> is active, so Ice is doing it.",
    "Usually we do not say who did the job. But if the doer is important, add <em>by</em> + the doer at the end. <em>The school had its new mural painted <b>by a well-known artist</b>.</em>",
    "Change <em>have</em> for the time. Then check who is doing the work. <em>We are having the kitchen rebuilt</em> (now, by builders; it is not finished). <em>We are rebuilding the kitchen</em> means we are doing it ourselves. <em>I have had my laptop repaired</em> is the <strong>present perfect</strong> (finished, and the result is important now). The first <em>have</em> is the present perfect helper, and <em>had</em> is the V3 of causative <em>have</em>. Use it with <em>since</em>, <em>so far</em> or <em>this month</em> too.",
    "Questions use <em>do</em>, <em>does</em> or <em>did</em>, because causative <em>have</em> is a normal verb, not a helper. After <em>did</em>, use the base form <em>have</em>. <em>Did you have your school shoes repaired?</em> Do not start the question with <em>have</em> or <em>had</em> itself: <s>Had you your shoes repaired?</s> is wrong.",
    "A passive cannot have an object after it. A person is not stolen; the thing is. So do not write <s>We have been stolen our phones</s>. Write <em>We have had our phones stolen</em>, or <em>Our phones have been stolen</em>. Also, keep the object in the middle. Sometimes <em>have</em> or <em>had</em> comes straight before the V3. Then it is a perfect tense, and the subject did the job. <em>I have repaired my laptop</em> means I did it myself."
   ],
   "examples": [
    {
     "s": "We <b>got the Wi-Fi fixed</b> in ten minutes.",
     "g": "Service, less formal: get + object + V3."
    },
    {
     "s": "Ice <b>had her phone stolen</b> at the bus station.",
     "g": "Bad experience: it happened to Ice; she is not the thief."
    },
    {
     "s": "Mint's family <b>is having their kitchen rebuilt</b>, so they are eating at Grandma's.",
     "g": "Now, by another company: is having + object + V3."
    },
    {
     "s": "Our class <b>has had three umbrellas stolen</b> from the corridor this term.",
     "g": "Bad experience, present perfect: have had + object + V3."
    },
    {
     "s": "<b>Did</b> you <b>have</b> your school shoes <b>repaired</b> in the end?",
     "g": "Question: did + have (base form)."
    }
   ]
  },
  "B2": {
   "key": "<strong>get + object + V3</strong> is the informal twin of <em>have</em>, and the same shape also reports something bad that somebody did to the subject.",
   "body": [
    "<em>We <b>got the Wi-Fi fixed</b> in ten minutes.</em> <em>Get</em> + object + V3 means exactly the same as <em>have</em> + object + V3, in a more spoken register — the one you meet in reviews and at the front desk. The participle is still a V3, never the base form.",
    "The same pattern has a second sense: a <strong>bad experience</strong> caused by somebody else. <em>Ice <b>had her phone stolen</b> at the bus station</em> — nobody arranged this; the pattern simply keeps the victim as the subject. Compare <em>Ice had stolen a phone</em> (past perfect: Ice is the thief) and <em>Ice was stealing a phone</em> (Ice was doing it).",
    "The doer is normally left out, but when it matters you can add it at the end with <em>by</em>: <em>The school had its new mural painted <b>by a well-known artist</b></em>. This is the clue in many items: a <em>by</em>-phrase tells you somebody other than the subject did the work.",
    "Tense still lives in <em>have</em>, and each tense has a reason. Present continuous for an arrangement in progress: <em>We are having the kitchen rebuilt</em> (builders are doing it; the job is not finished). Present perfect for a finished job with a result now, or with <em>since</em>, <em>so far</em>, <em>this month</em>: <em>I have had my laptop repaired, and it is fast again</em>. Past simple for a finished past time: <em>had it repaired last week</em>. Watch the doer: <em>We are rebuilding the kitchen</em> or <em>I have repaired my laptop</em> means we did it ourselves.",
    "Causative <em>have</em> is an ordinary verb, so it takes <em>do</em>-support: <em>Did you have your school shoes repaired?</em> It cannot move to the front like a helper verb (<s>Had you your shoes repaired?</s>), and after <em>did</em> it stays in the base form.",
    "A passive cannot keep an object after it, and people are not the things stolen: <s>We have been stolen our phones</s> is wrong. Say <em>We have had our phones stolen</em> or <em>Our phones have been stolen</em>."
   ],
   "examples": [
    {
     "s": "We <b>got the Wi-Fi fixed</b> in ten minutes.",
     "g": "get + object + V3: a service, informal."
    },
    {
     "s": "Ice <b>had her phone stolen</b> at the bus station.",
     "g": "Experience sense: the subject suffered it."
    },
    {
     "s": "Mint's family <b>is having their kitchen rebuilt</b>, so they are eating at Grandma's.",
     "g": "Present continuous: arrangement in progress, outside workers."
    },
    {
     "s": "Our class <b>has had three umbrellas stolen</b> from the corridor this term.",
     "g": "Present perfect with this month: have had + object + V3."
    },
    {
     "s": "<b>Did</b> you <b>have</b> your school shoes <b>repaired</b> in the end?",
     "g": "do-support; base form have after did."
    }
   ]
  },
  "C1": {
   "key": "<strong>get + object + V3</strong> is the less formal equivalent of <em>have</em>; both also carry an adversity sense, in which something is done to the subject rather than arranged by her.",
   "body": [
    "<em>We <b>got the Wi-Fi fixed</b> in ten minutes</em> is synonymous with <em>had the Wi-Fi fixed</em>; <em>get</em> simply belongs to a more spoken register, which is why reviews and front-desk conversation favour it. The structure is identical: object, then V3.",
    "Both verbs also carry an <strong>adversity</strong> (bad experience) sense. <em>Ice <b>had her phone stolen</b> at the bus station</em> does not mean she arranged the theft; the pattern lets the victim stay in subject position while the culprit stays unnamed. The past perfect <em>Ice had stolen a phone</em> and the active continuous <em>was stealing</em> both make her the thief, so the position of the object is decisive.",
    "An agent can be added in final position when it is new or important information: <em>The school had its new mural painted <b>by a well-known artist</b></em>. A <em>by</em>-phrase is therefore strong evidence that the subject did not do the work, and it clashes with any reading in which she did.",
    "The aspect of <em>have</em> carries real meaning. The present continuous causative presents an arrangement in progress (<em>We are having the kitchen rebuilt</em> — builders are at work, the job unfinished); the present perfect causative presents a completed job with present relevance or a period up to now (<em>I have had my laptop repaired</em>; <em>our class has had three umbrellas stolen this term</em>), where the first <em>have</em> is the perfect auxiliary and <em>had</em> the participle of causative <em>have</em>. Active <em>are repairing</em> or <em>have repaired</em> would claim the subject did the work.",
    "As a lexical verb, causative <em>have</em> takes <em>do</em>-support with the base form after the auxiliary: <em>Did you have your school shoes repaired?</em> Inverting <em>have</em> itself (<s>Had you your shoes repaired?</s>) or marking the past twice after <em>did</em> is ungrammatical.",
    "A passive cannot keep a direct object, and in theft the thing, not the person, is what is stolen: <s>We have been stolen our phones</s> must be recast as <em>We have had our phones stolen</em> or <em>Our phones have been stolen</em>."
   ],
   "examples": [
    {
     "s": "We <b>got the Wi-Fi fixed</b> in ten minutes.",
     "g": "get-causative: same meaning as have, more spoken."
    },
    {
     "s": "Ice <b>had her phone stolen</b> at the bus station.",
     "g": "Adversity sense: victim as subject, culprit unnamed."
    },
    {
     "s": "Mint's family <b>is having their kitchen rebuilt</b>, so they are eating at Grandma's.",
     "g": "Continuous causative: arrangement in progress."
    },
    {
     "s": "Our class <b>has had three umbrellas stolen</b> from the corridor this term.",
     "g": "Perfect causative over a period up to now."
    },
    {
     "s": "The school <b>had its new mural painted by a well-known artist</b>.",
     "g": "Agent added in final position because it is newsworthy."
    }
   ]
  }
 },
 "u6g1s3": {
  "B1": {
   "key": "Look at the subject: a thing that gets the job takes a plain passive; a person who arranged it, or suffered it, takes <strong>have or get + object + V3</strong>.",
   "body": [
    "Hotel adverts and reviews often talk about the same job in two ways. An advert says <em>Bicycles <b>are checked</b> every week.</em> The thing is the subject, so it is a <strong>plain passive</strong>. A review says <em>We <b>had our bicycles checked</b> before the ride.</em> The guests are the subject, and someone else did the job for them. That is the <strong>causative</strong>.",
    "So, first look at the subject. Is it a thing that gets the job, like a banner, a cake or a room? Use <em>be</em> + V3 (the past participle): <em>The banner <b>was printed</b> in one day.</em> Do not write <em>The banner had printed</em>. That makes the banner the doer. A banner cannot print anything.",
    "Next, look for an <strong>object</strong> (the thing that gets the job) after <em>have</em> or <em>get</em>. The causative always has one in the middle: <em>had the chairs moved</em>. If <em>have</em> comes straight before a V3, it is a perfect tense. Then the subject did the work: <em>we had moved the chairs</em> (past perfect). It is the same after modal verbs like <em>can</em> or <em>must</em>. <em>Visitors can have their bags stored at reception</em> is a service. But modal + <em>have</em> + V3, with no object in the middle, is different. It is a guess about the past: <em>She must have forgotten.</em>",
    "<em>Get</em> works like <em>have</em>, and it is less formal: <em>Ploy gets her school bag repaired at the market.</em> After the object, use the V3. Do not use the base verb, <em>-ing</em> or <em>to</em>. A plain passive cannot have an object after it, so <s>We were fixed our bikes</s> is wrong.",
    "Questions use <em>do</em>, <em>does</em> or <em>did</em>. Present: <em>Does your family have the air conditioner serviced every year?</em> <em>Do you get your bag repaired there?</em> Do not start with <s>Has your family the air conditioner…</s>",
    "Some questions ask for the sentence with the closest meaning. Check three things: who did the action, who it happened to, and when. If <em>someone broke Praew's glasses during the match</em>, then <em>Praew had her glasses broken during the match.</em> Praew did not break them. The time must stay the same too."
   ],
   "examples": [
    {
     "s": "Bicycles <b>are checked</b> every week.",
     "g": "An advert: the thing is the subject, so plain passive."
    },
    {
     "s": "We <b>had our bicycles checked</b> before the ride.",
     "g": "A review: the guests arranged it, so causative."
    },
    {
     "s": "The banner <b>was printed</b> in one day.",
     "g": "A thing cannot print, so the thing takes be + V3."
    },
    {
     "s": "You can <b>have your name printed</b> on the cup for free.",
     "g": "can + have + object + V3: a service on offer."
    },
    {
     "s": "<b>Does</b> Ploy <b>get</b> her school bag <b>repaired</b> at the market?",
     "g": "Present question: does + get + object + V3."
    }
   ]
  },
  "B2": {
   "key": "Choose by the subject: a thing that receives the job takes the plain passive; a person who arranged or suffered it takes <strong>have or get + object + V3</strong>.",
   "body": [
    "An advert says <em>Bicycles <b>are checked</b> every week</em> — the bicycles are the subject and the job is the news, so it is a plain passive. A review says <em>We <b>had our bicycles checked</b> before the ride</em> — the guests are the subject and the service done for them is the point, so it is a causative. Same job, two sentences, two meanings.",
    "Step one, then, is the subject. A thing that receives the action needs <em>be</em> + V3: <em>The banner <b>was printed</b> in one day</em>. <em>The banner had printed</em> is active and makes the banner the printer — impossible.",
    "Step two is the object. A causative always has its object between <em>have</em> or <em>get</em> and the V3: <em>had the chairs moved</em>. If <em>have</em> is followed directly by a V3, you are reading a perfect tense in which the subject did the work: <em>we had moved the chairs</em>. The same applies after modals: <em>Visitors can have their bags stored at reception</em> offers a service, while modal + <em>have</em> + V3 with no object in the middle (<em>must have forgotten</em>, <em>could have left</em>) is a modal perfect, a guess about the past.",
    "<em>Get</em> + object + V3 is the informal equivalent: <em>Ploy gets her school bag repaired at the market</em>. The participle is always a V3 — not the base form, not <em>-ing</em>, not <em>to</em> + verb. And because a passive cannot keep an object, <s>We were fixed our bikes</s> is wrong.",
    "In the present simple, questions use <em>do</em> or <em>does</em>: <em>Does your family have the air conditioner serviced every year?</em> not <s>Has your family the air conditioner serviced?</s>",
    "In closest-meaning items, test who did it, who it happened to, and when. <em>Someone broke Praew's glasses during the match</em> matches <em>Praew had her glasses broken during the match</em> — a bad experience, with Praew as victim and the time kept. Any option that makes her the doer, or changes the time, changes the meaning."
   ],
   "examples": [
    {
     "s": "Bicycles <b>are checked</b> every week.",
     "g": "Advert: thing as subject, plain passive."
    },
    {
     "s": "We <b>had our bicycles checked</b> before the ride.",
     "g": "Review: guests arranged it, causative."
    },
    {
     "s": "The chef <b>had moved</b> the tables before the guests arrived.",
     "g": "Past perfect: no object in the middle, the chef did it."
    },
    {
     "s": "You can <b>have your name printed</b> on the cup for free.",
     "g": "Modal + have + object + V3: a service."
    },
    {
     "s": "<b>Does</b> Ploy <b>get</b> her school bag <b>repaired</b> at the market?",
     "g": "Present simple question with does."
    }
   ]
  },
  "C1": {
   "key": "Decide by the subject and the position of the object: a recipient subject takes the plain passive; an arranging or suffering subject takes <strong>have or get + object + V3</strong>.",
   "body": [
    "<em>Bicycles <b>are checked</b> every week</em> and <em>We <b>had our bicycles checked</b> before the ride</em> describe the same job from two perspectives. The advert foregrounds the thing and reports the job (plain passive); the review foregrounds the guests and the service done for them (causative). Register and genre often predict the choice, but the subject decides it.",
    "If the subject is a thing that undergoes the action, only <em>be</em> + V3 is possible: <em>The banner <b>was printed</b> in one day</em>. <em>The banner had printed</em> is an active past perfect that casts the banner as agent.",
    "A causative is impossible without its object between <em>have</em> or <em>get</em> and the participle. Where <em>have</em> immediately precedes a V3, it is an auxiliary: <em>we had moved the chairs</em> (past perfect, we did it); after a modal, <em>must have</em> or <em>could have</em> + V3 is a modal perfect expressing speculation about the past, whereas <em>Visitors can have their bags stored at reception</em> offers a service. A passive likewise leaves no slot for an object: <s>We were fixed our bikes</s>.",
    "<em>Get</em> + object + V3 (<em>Ploy gets her school bag repaired at the market</em>) is the informal variant; the complement is always a V3, never the bare infinitive, <em>-ing</em> or <em>to</em> + verb. Being lexical, causative <em>have</em> takes <em>do</em>-support in present questions too: <em>Does your family have the air conditioner serviced every year?</em>, never <s>Has your family the air conditioner serviced?</s>",
    "Paraphrase items reward a three-part check: agent, affected person, time. <em>Someone broke Praew's glasses during the match</em> is equivalent to <em>Praew had her glasses broken during the match</em> (adversity sense); any version that shifts the time, or makes her the agent, says something else."
   ],
   "examples": [
    {
     "s": "Bicycles <b>are checked</b> every week.",
     "g": "Advert: the thing is topic; plain passive."
    },
    {
     "s": "We <b>had our bicycles checked</b> before the ride.",
     "g": "Review: guests as topic; causative."
    },
    {
     "s": "The chef <b>had moved</b> the tables before the guests arrived.",
     "g": "Auxiliary had: past perfect, chef as agent."
    },
    {
     "s": "You can <b>have your name printed</b> on the cup for free.",
     "g": "Modal + causative, not a modal perfect."
    },
    {
     "s": "Praew <b>had her glasses broken</b> during the match.",
     "g": "Adversity sense paraphrasing an active with an unknown doer."
    }
   ]
  }
 },
 "u6g2s1": {
  "B1": {
   "key": "<strong>have, make</strong> and <strong>let</strong> + person + base verb have no <em>to</em>; most other verbs, like <em>get, ask</em> and <em>allow</em>, need <em>to</em>.",
   "body": [
    "Sometimes we name the person who does the job. Then we use <em>have</em> + person + <strong>base verb</strong> (the simple form, like <em>carry, check, show</em>). <em>The manager <b>had the porter carry</b> our bags.</em> This is an instruction. For an instruction, there is no <em>to</em> and no <em>-ing</em>. Compare: <em>We had our bags carried</em> (a thing, then V3; the doer is not named).",
    "Three verbs take person + base verb: <em>have</em> (give an instruction), <em>make</em> (force) and <em>let</em> (give permission). <em>The coach <b>made us run</b> five laps.</em> <em>Mum <b>lets me stay</b> up late on Fridays.</em> <em>Wouldn't let</em> means somebody refused to give permission: <em>The guard wouldn't let us take photos inside.</em>",
    "Many other verbs take person + <em>to</em> + verb: <em>get</em> (persuade), <em>ask, tell, want, allow, permit, force, persuade</em>. <em>I <b>got my cousin to lend</b> me her camera.</em> <em>The guide <b>asked us to wait</b>.</em> So look at the verb after the person. Base verb? The answer is <em>have, make</em> or <em>let</em>. <em>To</em> + verb? The answer is <em>get, ask, allow</em> and so on. Then choose by meaning.",
    "<em>Make</em> changes in the <strong>passive</strong> (be + V3, the past participle). The <em>to</em> comes back. Active: <em>The coach made us run.</em> Passive: <em>We <b>were made to run</b>.</em> This is true in every tense: <em>had been made to run</em>, <em>will be made to run</em>. Never write <s>were made run</s>.",
    "<em>Let</em> + person + verb has no passive. Use <em>be allowed to</em>: <em>We <b>were allowed to swim</b>.</em> In this passive, the person moves to the front and becomes the subject. So nothing comes between <em>allowed</em> and <em>to</em>. In the active, <em>allow</em> and <em>permit</em> + person need <em>to</em>: <em>The guard allowed us to sit there.</em>"
   ],
   "examples": [
    {
     "s": "The manager <b>had the porter carry</b> our bags upstairs.",
     "g": "have + person + base verb: an instruction, no to."
    },
    {
     "s": "The coach <b>made us run</b> five laps in the rain.",
     "g": "make + person + base verb: force."
    },
    {
     "s": "We <b>were made to run</b> five laps in the rain.",
     "g": "Passive make: be made + to + verb."
    },
    {
     "s": "I finally <b>got my cousin to lend</b> me her camera.",
     "g": "get + person + to + verb: persuade."
    },
    {
     "s": "Guests <b>are not allowed to bring</b> pets into the hotel.",
     "g": "The passive idea of let: be allowed to."
    }
   ]
  },
  "B2": {
   "key": "<strong>have, make</strong> and <strong>let</strong> take person + bare infinitive; <em>get</em> and most other verbs take person + to-infinitive; passive <em>make</em> adds <em>to</em>.",
   "body": [
    "When the doer is named, <em>have</em> takes the person and then the bare infinitive (base verb): <em>The manager <b>had the porter carry</b> our bags upstairs</em>. This is an instruction from someone in charge. Compare <em>We had our bags carried</em>, where the doer is not named and a V3 follows the thing. The form after the object tells you which one you are reading.",
    "Only three common verbs take person + bare infinitive: <em>have</em> (instruct), <em>make</em> (force) and <em>let</em> (permit). <em>The coach <b>made us run</b> five laps</em>; <em>Mum <b>lets me stay</b> up late on Fridays</em>; <em>The guard wouldn't let us take photos inside</em> (she refused permission).",
    "Almost every other causative-type verb takes person + <em>to</em>-infinitive: <em>get</em> (persuade), <em>ask, tell, want, allow, permit, force, persuade</em>. So in a gap before a person, look at what follows: a bare verb points to <em>have</em>, <em>make</em> or <em>let</em>; <em>to</em> + verb points to <em>get</em>, <em>ask</em>, <em>allow</em> or <em>force</em>. Then let the meaning decide — <em>get</em> for persuading somebody reluctant, <em>let</em> for permission, <em>make</em> for force.",
    "In the passive, <em>make</em> takes <em>to</em>: <em>We <b>were made to run</b> five laps</em>. This holds in every tense — <em>had been made to run</em>, <em>will be made to run</em> — and <s>were made run</s> is always wrong.",
    "<em>Let</em> + person + verb has no passive; use <em>be allowed to</em>: <em>We <b>were allowed to swim</b></em>. In the passive the person becomes the subject, so no object can follow <em>allowed</em>: either <em>She didn't allow us to swim</em> (active) or <em>We weren't allowed to swim</em> (passive)."
   ],
   "examples": [
    {
     "s": "The manager <b>had the porter carry</b> our bags upstairs.",
     "g": "Named doer: have + person + bare infinitive."
    },
    {
     "s": "The coach <b>made us run</b> five laps in the rain.",
     "g": "Active make: no to."
    },
    {
     "s": "We <b>were made to run</b> five laps in the rain.",
     "g": "Passive make: to appears."
    },
    {
     "s": "I finally <b>got my cousin to lend</b> me her camera.",
     "g": "get + person + to: persuasion."
    },
    {
     "s": "Guests <b>are not allowed to bring</b> pets into the hotel.",
     "g": "No passive of let: be allowed to instead."
    }
   ]
  },
  "C1": {
   "key": "Only <strong>have, make</strong> and <strong>let</strong> take person + bare infinitive; <em>get</em> and verbs such as <em>ask, allow, force, persuade</em> take the to-infinitive, and passive <em>make</em> restores <em>to</em>.",
   "body": [
    "With a named doer, causative <em>have</em> takes object + bare infinitive: <em>The manager <b>had the porter carry</b> our bags upstairs</em>. It presents the action as an instruction within an expected hierarchy — guest to staff, manager to porter — and is common in service English. Contrast <em>We had our bags carried</em>, where the doer is suppressed and a V3 follows the thing.",
    "The bare infinitive after an object is the signature of a very small set: <em>have</em> (instruction), <em>make</em> (compulsion) and <em>let</em> (permission), plus perception verbs such as <em>see</em> and <em>hear</em>. <em>Wouldn't let</em> expresses refusal of permission, typically by someone in authority: <em>The guard wouldn't let us take photos inside</em>.",
    "Semantically close verbs — <em>get</em> (persuade, often with effort), <em>ask, tell, want, allow, permit, force, persuade, compel</em> — all require the <em>to</em>-infinitive. In a gap before an object, the complement is therefore the deciding evidence: a bare verb leaves only <em>have</em>, <em>make</em> or <em>let</em>, and meaning then selects one; a <em>to</em>-infinitive excludes all three.",
    "Passivisation exposes the difference: <em>make</em> takes a bare infinitive in the active but a <em>to</em>-infinitive in the passive, in every tense — <em>We <b>were made to run</b></em>, <em>had been made to run</em>. <s>were made run</s> is an error.",
    "<em>Let</em> + object + verb has no passive (fixed phrases such as <em>be let in</em> or <em>be let go</em> are a different pattern), so the passive idea is supplied by <em>be allowed to</em>. Since the passive of <em>allow</em> promotes the person to subject, no object can follow <em>allowed</em>, and a sentence with the permission-giver as subject and a passive verb mixes the two voices; the options are <em>She didn't allow us to swim</em> or <em>We weren't allowed to swim</em>."
   ],
   "examples": [
    {
     "s": "The manager <b>had the porter carry</b> our bags upstairs.",
     "g": "Instruction within a hierarchy: bare infinitive."
    },
    {
     "s": "We <b>were made to run</b> five laps in the rain.",
     "g": "Passive make restores to."
    },
    {
     "s": "I finally <b>got my cousin to lend</b> me her camera.",
     "g": "get + object + to: persuasion with effort."
    },
    {
     "s": "The guard <b>wouldn't let us take</b> photos inside the palace.",
     "g": "Refused permission: let + bare infinitive."
    },
    {
     "s": "Guests <b>are not allowed to bring</b> pets into the hotel.",
     "g": "Suppletive passive for let."
    }
   ]
  }
 },
 "u6g2s2": {
  "B1": {
   "key": "<strong>get + person + to + verb</strong> means persuade somebody; <em>have, make</em> and <em>let</em> + person never take <em>to</em>.",
   "body": [
    "<em>Get</em> + person + <em>to</em> + verb means you <strong>persuade</strong> (talk somebody into) doing something, often with some effort. <em>Fern <b>got her grandma to download</b> a ride app.</em> Fern persuaded her grandma, and her grandma downloaded it. Always keep the <em>to</em>. Hotels also use it for jobs they arrange: <em>Last year the resort got a local artist to teach the guests batik.</em>",
    "<em>Have</em> + person + <strong>base verb</strong> (the simple form) gives an instruction. Hotel staff often use it to promise help: <em>The manager will have a porter bring your bags down.</em> Be careful. <em>Have</em> + person + V3 (the past participle) changes the meaning. <em>She had the porter paid</em> means someone paid the porter. So for an instruction, always use the base verb.",
    "<em>Let</em> (permit) and <em>make</em> (force) also take person + base verb, with no <em>to</em>: <em>The guard <b>let us park</b> near the gate.</em> <em>The teacher <b>made us repeat</b> the song.</em> This is still true after a modal verb: <em>Nobody can make my little cousin eat vegetables.</em> Check sentences for this mistake. Look for an extra <em>to</em> after <em>let</em>, <em>have</em> or <em>make</em> + person. Write <em>let us park</em>, not <s>let us to park</s>.",
    "With a thing, <em>get</em> goes back to the V3: <em>She <b>got her key card replaced</b>.</em> So: person after <em>get</em>, use <em>to</em> + verb; thing after <em>get</em>, use V3.",
    "Some questions ask for the closest meaning. Think about who persuaded whom, and who did the action. <em>Get</em> means persuade. <em>Let</em> means give permission, which is different. If the people change places, the meaning changes too. <em>Fern got her grandma to download it</em> is different from <em>Her grandma got Fern to download it</em>."
   ],
   "examples": [
    {
     "s": "Fern <b>got her grandma to download</b> a ride app at last.",
     "g": "get + person + to + verb: Fern persuaded her."
    },
    {
     "s": "The manager will <b>have a porter bring</b> your bags down.",
     "g": "have + person + base verb: an instruction to staff."
    },
    {
     "s": "The guard <b>let us park</b> near the gate.",
     "g": "let + person + base verb: permission, no to."
    },
    {
     "s": "Nobody can <b>make my little cousin eat</b> vegetables.",
     "g": "make + person + base verb, even after a modal."
    },
    {
     "s": "She <b>got her key card replaced</b> at reception.",
     "g": "get + thing + V3: a service."
    }
   ]
  },
  "B2": {
   "key": "<strong>get + person + to-infinitive</strong> means persuade or arrange for someone to act; the <em>to</em> never drops, while <em>have, make</em> and <em>let</em> + person never take it.",
   "body": [
    "<em>Fern <b>got her grandma to download</b> a ride app</em>: <em>get</em> + person + <em>to</em> + verb says the subject persuaded or arranged for a named person to act, often with some effort. Hotels use it for arrangements too: <em>Last year the resort got a local artist to teach the guests batik</em>. The <em>to</em> is obligatory.",
    "<em>Have</em> + person + bare infinitive is the instruction pattern of service English: <em>The manager will have a porter bring your bags down</em>. Keep the base verb; a V3 reverses the roles, so <em>She had the porter paid</em> means somebody paid the porter, not that the porter did anything.",
    "<em>Let</em> and <em>make</em> also take person + bare infinitive, in any tense or after a modal: <em>The guard <b>let us park</b> near the gate</em>; <em>Nobody can make my little cousin eat vegetables</em>. In error-spotting items, the classic mistake is an extra <em>to</em> after <em>let, have</em> or active <em>make</em> + person: <s>let us to park</s>, <s>had the driver to wait</s>.",
    "With a thing as object, <em>get</em> reverts to V3: <em>She <b>got her key card replaced</b> at reception</em>. Person, then <em>to</em> + verb; thing, then V3.",
    "In meaning items, separate the verbs by sense — <em>get</em> means persuade, <em>let</em> means permit, <em>make</em> means force, <em>have</em> means instruct — and check who acts on whom. <em>Fern got her grandma to download it</em> and <em>Her grandma got Fern to download it</em> describe opposite situations."
   ],
   "examples": [
    {
     "s": "Fern <b>got her grandma to download</b> a ride app at last.",
     "g": "Persuasion: get + person + to."
    },
    {
     "s": "The manager will <b>have a porter bring</b> your bags down.",
     "g": "Instruction: have + person + bare infinitive."
    },
    {
     "s": "The guard <b>let us park</b> near the gate.",
     "g": "Permission: no to after let + person."
    },
    {
     "s": "Nobody can <b>make my little cousin eat</b> vegetables.",
     "g": "Active make: bare infinitive after a modal too."
    },
    {
     "s": "She <b>got her key card replaced</b> at reception.",
     "g": "Thing as object: V3."
    }
   ]
  },
  "C1": {
   "key": "<strong>get + person + to-infinitive</strong> expresses persuasion or arrangement and always keeps <em>to</em>; it contrasts in form with <em>have, make</em> and <em>let</em>, which take the bare infinitive.",
   "body": [
    "<em>Fern <b>got her grandma to download</b> a ride app</em> implies that some persuasion was needed. The pattern also covers arranging somebody else's action, as in hotel copy: <em>Last year the resort got a local artist to teach the guests batik</em>. Omitting <em>to</em> (<s>got her grandma try</s>) is the most frequent error in this family.",
    "Causative <em>have</em> with a person is the instruction pattern, typical of staff speaking on behalf of an organisation: <em>The manager will have a porter bring your bags down</em>. Its complement must be a bare infinitive. A V3 here produces a grammatical sentence with the opposite meaning: <em>She had the porter paid</em> makes the porter the one acted upon.",
    "<em>Let</em> (permission) and active <em>make</em> (compulsion) share the bare infinitive, whatever precedes them: <em>The guard <b>let us park</b> near the gate</em>; <em>Nobody can make my little cousin eat vegetables</em>. In error identification, a <em>to</em> inserted after <em>let, have</em> or active <em>make</em> + person is the segment to correct — the governing verb itself is not the error.",
    "With an inanimate object, <em>get</em> switches to the V3 of the service causative: <em>She <b>got her key card replaced</b></em>. Animate doer, <em>to</em>-infinitive; thing acted on, V3.",
    "Paraphrase items turn on lexical meaning and roles: <em>get</em> entails persuasion, <em>let</em> mere permission, <em>make</em> compulsion. Swapping subject and object (<em>Her grandma got Fern to download it</em>) or the verb's sense yields a different proposition, even when the vocabulary overlaps."
   ],
   "examples": [
    {
     "s": "Fern <b>got her grandma to download</b> a ride app at last.",
     "g": "Persuasion implied; to obligatory."
    },
    {
     "s": "The manager will <b>have a porter bring</b> your bags down.",
     "g": "Staff instruction; bare infinitive."
    },
    {
     "s": "The guard <b>let us park</b> near the gate.",
     "g": "Permission; bare infinitive."
    },
    {
     "s": "Nobody can <b>make my little cousin eat</b> vegetables.",
     "g": "Compulsion; bare infinitive after a modal too."
    },
    {
     "s": "She <b>got her key card replaced</b> at reception.",
     "g": "Inanimate object: V3."
    }
   ]
  }
 },
 "u6g2s3": {
  "B1": {
   "key": "<strong>make + person + base verb</strong> becomes <strong>be made to</strong> in the passive; <em>let</em> has no passive, so use <strong>be allowed to</strong>.",
   "body": [
    "<em>Make</em> + person + base verb means <strong>force</strong> somebody: <em>The librarian <b>made us switch off</b> our phones.</em> There is no <em>to</em>. Only three common verbs work like this: <em>make, have</em> and <em>let</em>. Almost every other verb needs <em>to</em>, even when it means the same as <em>make</em>: <em>The rain forced us to stay inside.</em>",
    "In the <strong>passive</strong> (be + V3, the past participle), <em>make</em> takes <em>to</em>: <em>We <b>were made to switch off</b> our phones.</em> Never write <s>were made switch off</s>. <em>Let</em> + person + verb has no passive. Use <em>be allowed to</em>: <em>We <b>were allowed to use</b> the gym.</em>",
    "<em>Have</em> + person + base verb gives an instruction: <em>The manager had the driver wait at the gate.</em> The driver did the waiting. <em>Have</em> + person + V3 (the past participle) changes the meaning. <em>She had the driver paid</em> means someone paid the driver. <em>Have</em> + person + <em>-ing</em> is different again. It means you <strong>cause</strong> people to be doing something for a while: <em>The magician <b>had the children screaming</b> with joy.</em> So after <em>have</em> + person, choose the form by meaning. <em>To</em> is never possible.",
    "Choose the verb by meaning too. <em>Get</em> + person + <em>to</em> means persuade. It often shows effort: you ask again and again until the person says yes. <em>Nan <b>got her sister to lend</b> her a raincoat.</em> <em>Make</em> means force. <em>Let</em> means give permission, and only someone in charge can give it, like a parent, a teacher or a manager.",
    "In meaning questions, find two people: who gave the instruction, and who did the job. <em>The coach had the team captain collect the shirts</em> means the coach told the captain, and the captain collected them. If the two people swap places, the meaning changes. If someone is forced, it changes too. <em>Have</em> + person + verb is a normal instruction, not force.",
    "In a short dialogue, read the next line before you choose. The reply in the gap must make sense with it. What does the next speaker agree to, wait for or answer? Check the time too. If the next line is about now or soon, a reply about the past does not fit."
   ],
   "examples": [
    {
     "s": "The librarian <b>made us switch off</b> our phones.",
     "g": "Active make: force, with no to."
    },
    {
     "s": "We <b>were made to switch off</b> our phones.",
     "g": "Passive make: be made to + verb."
    },
    {
     "s": "We <b>were allowed to use</b> the gym after nine.",
     "g": "No passive of let, so be allowed to."
    },
    {
     "s": "The magician <b>had the children screaming</b> with joy.",
     "g": "have + person + -ing: caused them to be doing it."
    },
    {
     "s": "The manager <b>had the driver wait</b> at the gate.",
     "g": "have + person + base verb: the driver waits."
    }
   ]
  },
  "B2": {
   "key": "Active <strong>make + person + bare verb</strong> becomes <strong>be made to + verb</strong>; <em>let</em> has no passive, so the passive idea is <strong>be allowed to</strong>.",
   "body": [
    "<em>The librarian <b>made us switch off</b> our phones</em>: <em>make</em> + person + bare infinitive expresses force. Its near-synonyms behave differently: <em>force</em>, <em>order</em> and almost every other verb need <em>to</em> (<em>The rain forced us to stay inside</em>). Only <em>make</em>, <em>have</em> and <em>let</em> take person + bare verb.",
    "Turn it round and the <em>to</em> appears: <em>We <b>were made to switch off</b> our phones</em>, never <s>were made switch off</s>. <em>Let</em> + person + verb has no passive at all; use <em>be allowed to</em>: <em>We <b>were allowed to use</b> the gym after nine</em>.",
    "<em>Have</em> + person has three complements with three meanings. Bare infinitive: an instruction, the person acts (<em>The manager had the driver wait at the gate</em>). V3: the person is acted on (<em>She had the driver paid</em>). <em>-ing</em>: the subject causes people to be doing something over a period (<em>The magician <b>had the children screaming</b> with joy</em>). <em>To</em> is never possible.",
    "Meaning narrows the choice further. <em>Get</em> + person + <em>to</em> means persuade, often after some effort: <em>Nan got her sister to lend her a raincoat</em>. <em>Make</em> implies force; <em>let</em> means permission, which only someone with authority over the other person can give.",
    "In paraphrase items, identify who instructed and who acted. <em>The coach had the team captain collect the shirts</em> means the coach gave the instruction and the captain carried it out; swapping the roles, or adding force, changes the meaning.",
    "In dialogue completion, the following line is the key: the gap must make sense as the turn before it, in meaning and in time. Check what the next speaker agrees to, waits for or answers."
   ],
   "examples": [
    {
     "s": "The librarian <b>made us switch off</b> our phones.",
     "g": "make + person + bare infinitive: force."
    },
    {
     "s": "We <b>were made to switch off</b> our phones.",
     "g": "Passive make adds to."
    },
    {
     "s": "We <b>were allowed to use</b> the gym after nine.",
     "g": "be allowed to replaces a passive of let."
    },
    {
     "s": "The magician <b>had the children screaming</b> with joy.",
     "g": "have + person + -ing: caused an ongoing reaction."
    },
    {
     "s": "The manager <b>had the driver wait</b> at the gate.",
     "g": "Bare infinitive: the driver acts."
    }
   ]
  },
  "C1": {
   "key": "<strong>make</strong> takes a bare infinitive in the active and <strong>be made to</strong> in the passive; <em>let</em> has no passive and borrows <strong>be allowed to</strong>; <em>have</em> + person varies its complement with meaning.",
   "body": [
    "<em>The librarian <b>made us switch off</b> our phones</em> — <em>make</em> is the only verb of compulsion with a bare infinitive; <em>force, compel, oblige, order</em>, and the softer verbs of request and persuasion, take <em>to</em>. Apart from <em>have</em>, <em>let</em> and perception verbs, a gap followed by object + bare verb excludes every other verb on form alone.",
    "The passive restores <em>to</em>: <em>We <b>were made to switch off</b> our phones</em> (not <s>were made switch off</s>). <em>Let</em> + object + verb has no passive, so <em>be allowed to</em> fills the gap: <em>We <b>were allowed to use</b> the gym after nine</em>. In reviews these carry the complaint or the praise.",
    "<em>Have</em> + person takes three complements, each with its own meaning: a bare infinitive for an instruction in which the person acts (<em>The manager had the driver wait at the gate</em>); a V3 in which the person is acted upon (<em>She had the driver paid</em>), a reversal often used as a trap; and <em>-ing</em> for causing people to be in an ongoing state or activity (<em>The magician <b>had the children screaming</b> with joy</em>). The <em>to</em>-infinitive is never available after <em>have</em> + object.",
    "Pragmatics settles the remaining options. <em>Get</em> + object + <em>to</em> implies persuasion, typically after some effort (<em>Nan got her sister to lend her a raincoat</em>); <em>make</em> implies coercion; <em>let</em> presupposes authority over the other person, so it cannot describe someone who has no power over the doer.",
    "Paraphrase items test role assignment: in <em>The coach had the team captain collect the shirts</em>, the subject instructs and the object acts, with no implication of coercion. Reversing the arguments or recasting it as compulsion is not equivalent. In dialogue completion, the turn that follows constrains the gap: the line you choose must be one to which the next speaker's words are a natural response, in meaning and in time."
   ],
   "examples": [
    {
     "s": "The librarian <b>made us switch off</b> our phones.",
     "g": "The one compulsion verb with a bare infinitive."
    },
    {
     "s": "We <b>were made to switch off</b> our phones.",
     "g": "Passive restores to."
    },
    {
     "s": "We <b>were allowed to use</b> the gym after nine.",
     "g": "Suppletive passive for let."
    },
    {
     "s": "The magician <b>had the children screaming</b> with joy.",
     "g": "have + object + -ing: induced ongoing activity."
    },
    {
     "s": "She <b>had the driver paid</b> before she left.",
     "g": "have + person + V3: the driver is acted upon."
    }
   ]
  }
 },
 "u6g3s1": {
  "B1": {
   "key": "<strong>allow, require, persuade, encourage</strong> and <strong>enable</strong> take person + <em>to</em> + verb; <strong>ban, stop</strong> and <strong>prevent</strong> take person + <em>from</em> + verb-ing.",
   "body": [
    "Many verbs take a person and then <em>to</em> + verb. Learn this group: <em>allow, permit, enable</em> (make it possible), <em>require</em> (make it a rule), <em>ask, advise, persuade, encourage, expect, remind</em>. <em>The school <b>requires students to wear</b> a name badge.</em> <em>Free Wi-Fi <b>enables guests to work</b> from their rooms.</em>",
    "A second group means the opposite: stop somebody doing something. These verbs take person + <em>from</em> + verb-ing: <em>ban, stop, prevent, discourage, prohibit</em>. <em>The pool <b>bans swimmers from diving</b>.</em> Notice the pairs. <em>Encourage</em> takes <em>to</em>; <em>discourage</em> takes <em>from</em>. <em>Allow</em> takes <em>to</em>; <em>ban</em> takes <em>from</em>.",
    "So in a gap before a person, look at what comes after the person. Is it <em>to</em> + verb? Choose a verb from the first group. Is it <em>from</em> + verb-ing? Choose from the second group. Then check the meaning: is it a rule, a permission or a ban?",
    "Both groups keep their pattern in the <strong>passive</strong> (be + V3, the past participle): <em>Students <b>are required to wear</b> a badge.</em> <em>Swimmers <b>are banned from diving</b>.</em> Hotel notices use these a lot.",
    "<em>Want</em> is special. It has two patterns. If the object does the action, use <em>to</em> + verb: <em>I want my sister to come.</em> Sometimes the object receives the action (somebody else does the job to it). Then use the V3: <em>The chef <b>wants the vegetables chopped</b> by six.</em> You can also say <em>wants the vegetables to be chopped</em>. But <em>to</em> + verb alone makes the vegetables the doer, and vegetables cannot chop. For a job like this, do not use the base verb or <em>-ing</em> after the object."
   ],
   "examples": [
    {
     "s": "The school <b>requires students to wear</b> a name badge.",
     "g": "require + person + to + verb: a rule."
    },
    {
     "s": "The pool <b>bans swimmers from diving</b> at the shallow end.",
     "g": "ban + person + from + verb-ing."
    },
    {
     "s": "Mint's mother <b>encouraged her to enter</b> the speech contest.",
     "g": "encourage + person + to; discourage would take from."
    },
    {
     "s": "Students <b>are required to wear</b> a name badge.",
     "g": "Passive: the to stays."
    },
    {
     "s": "The chef <b>wants the vegetables chopped</b> by six.",
     "g": "want + thing + V3: someone else does the job."
    }
   ]
  },
  "B2": {
   "key": "Verbs of permission, obligation and persuasion take object + <strong>to</strong>-infinitive; verbs of prevention take object + <strong>from</strong> + -ing, and both keep the pattern in the passive.",
   "body": [
    "One family takes object + <em>to</em>-infinitive: <em>allow, permit, enable, require, ask, advise, persuade, encourage, expect, remind, force</em>. <em>The school <b>requires students to wear</b> a name badge</em>; <em>free Wi-Fi <b>enables guests to work</b> from their rooms</em>.",
    "The other family — <em>ban, prevent, stop, discourage, prohibit</em> — takes object + <em>from</em> + -ing: <em>The pool <b>bans swimmers from diving</b></em>. Several pairs are opposites, so meaning and form go together: <em>encourage to</em> versus <em>discourage from</em>, <em>allow to</em> versus <em>ban from</em>.",
    "In a gap before an object, therefore, read the complement first: <em>to</em> + verb means the first family, <em>from</em> + -ing the second. Then check the meaning against the context — a rule, a permission, a ban.",
    "The pattern survives in the passive, which is the shape of etiquette notices and dress codes: <em>Students <b>are required to wear</b> a badge</em>; <em>swimmers <b>are banned from diving</b></em>.",
    "<em>Want</em> takes object + <em>to</em>-infinitive when the object is the doer (<em>I want my sister to come</em>), but object + V3, or object + <em>to be</em> + V3, when the object receives the job (<em>The chef <b>wants the vegetables chopped</b> by six</em>). A plain <em>to</em>-infinitive there would make the vegetables the choppers, and a bare verb or <em>-ing</em> after the object does not express a job done to it."
   ],
   "examples": [
    {
     "s": "The school <b>requires students to wear</b> a name badge.",
     "g": "Obligation: object + to-infinitive."
    },
    {
     "s": "The pool <b>bans swimmers from diving</b> at the shallow end.",
     "g": "Prevention: object + from + -ing."
    },
    {
     "s": "Mint's mother <b>encouraged her to enter</b> the speech contest.",
     "g": "encourage to, opposite discourage from."
    },
    {
     "s": "Students <b>are required to wear</b> a name badge.",
     "g": "Passive keeps to."
    },
    {
     "s": "The chef <b>wants the vegetables chopped</b> by six.",
     "g": "want + object + V3: object receives the job."
    }
   ]
  },
  "C1": {
   "key": "Permission, enablement, obligation and persuasion verbs take object + <strong>to</strong>-infinitive; prevention verbs take object + <strong>from</strong> + gerund — learn each verb with its complement.",
   "body": [
    "The <em>to</em>-infinitive family is broad: <em>allow, permit, enable, require, ask, advise, persuade, encourage, expect, remind, force, oblige</em>. The infinitive points forward to an action the object is made able, obliged or inclined to perform: <em>The school <b>requires students to wear</b> a name badge</em>; <em>free Wi-Fi <b>enables guests to work</b> from their rooms</em>.",
    "The prevention family — <em>ban, bar, prevent, stop, discourage, prohibit, keep</em> — takes object + <em>from</em> + gerund, the preposition encoding separation from the action: <em>The pool <b>bans swimmers from diving</b></em>. Antonymous pairs split across the two families (<em>encourage to</em> against <em>discourage from</em>, <em>allow to</em> against <em>ban from</em>), so a text-completion gap before an object is as much a vocabulary question as a grammar one.",
    "Read the complement before choosing the verb: <em>to</em> + verb rules out the prevention verbs; <em>from</em> + -ing rules out the rest. Context then selects among the survivors.",
    "Both patterns passivise intact, which is why notices are full of them: <em>Students <b>are required to wear</b> a badge</em>; <em>swimmers <b>are banned from diving</b></em>.",
    "<em>Want</em> distinguishes the role of its object: <em>to</em>-infinitive when the object is the agent (<em>I want my sister to come</em>), V3 (or <em>to be</em> + V3) when it is the patient (<em>The chef <b>wants the vegetables chopped</b> by six</em>), a cousin of the causative. A bare infinitive after the object is ungrammatical. <em>Want</em> + object + <em>-ing</em> does exist (<em>I don't want you getting lost</em>), but it describes an ongoing activity of the object, never a job done to it; <em>wants the floor cleaning</em> is northern British dialect, not standard."
   ],
   "examples": [
    {
     "s": "Free Wi-Fi <b>enables guests to work</b> from their rooms.",
     "g": "Enablement: object + to-infinitive."
    },
    {
     "s": "The pool <b>bans swimmers from diving</b> at the shallow end.",
     "g": "Prevention: object + from + gerund."
    },
    {
     "s": "Mint's mother <b>encouraged her to enter</b> the speech contest.",
     "g": "Antonym discourage would need from."
    },
    {
     "s": "Students <b>are required to wear</b> a name badge.",
     "g": "Passive of the to-family."
    },
    {
     "s": "The chef <b>wants the vegetables chopped</b> by six.",
     "g": "want + patient object + V3."
    }
   ]
  }
 },
 "u6g3s2": {
  "B1": {
   "key": "<strong>ban</strong> + person + <strong>from</strong> + verb-ing; <strong>need + verb-ing</strong> means <em>need to be</em> + V3; and some verbs, like <em>suggest, allow</em> and <em>stop</em>, have their own patterns.",
   "body": [
    "<em>Ban, prevent, stop, discourage</em> and <em>prohibit</em> take an object + <em>from</em> + verb-ing. The object (the person or thing) goes straight after the verb, before <em>from</em>: <em>Our school <b>bans students from using</b> phones in class.</em> With <em>ban</em>, you must always use <em>from</em>. Never use <em>to</em> + verb with these verbs.",
    "<em>Allow</em> has two patterns. With a person: <em>allow</em> + person + <em>to</em> + verb. <em>The library allows students to borrow five books.</em> With no person: <em>allow</em> + verb-ing. <em>The hotel allows <b>swimming</b> in the pool only until eight.</em> <em>Permit</em> works the same way.",
    "<em>Suggest</em> takes verb-ing or a <em>that</em> clause: <em>Mint <b>suggested taking</b> the boat.</em> <em>Mint suggested that we take the boat.</em> Do not write <s>suggested to take</s> or <s>suggested us to take</s>.",
    "<em>Stop</em> has two meanings. <em>Stop</em> + verb-ing means you finish or give up an activity: <em>We stopped talking.</em> <em>Stop</em> + <em>to</em> + verb tells you the purpose (why you stopped): <em>We <b>stopped to take</b> photos of the sunset.</em> We stopped walking in order to take photos. <em>Stop</em> + person + <em>from</em> + verb-ing means prevent.",
    "<em>Need</em> + verb-ing has a passive meaning: <em>The curtains <b>need washing</b></em> means they <em>need to be washed</em> (V3 is the past participle). The curtains do not wash anything. Do not write <s>need washed</s> or <s>need wash</s>. <em>Need to wash</em> means the subject does the washing. So use it only for a person: <em>I need to wash my uniform.</em>",
    "Some verbs end in the <strong>preposition</strong> (a small linking word) <em>to</em>: <em>object to</em> (disagree with), <em>look forward to</em>, <em>be used to</em>. After this <em>to</em>, use verb-ing, not the base verb. If the subject receives the action, use <em>being</em> + V3: <em>My cousin objects to <b>being called</b> by her childhood nickname.</em>"
   ],
   "examples": [
    {
     "s": "Our school <b>bans students from using</b> phones in class.",
     "g": "ban + object + from + verb-ing, object straight after ban."
    },
    {
     "s": "The hotel <b>allows swimming</b> in the pool only until eight.",
     "g": "allow + verb-ing when no person is named."
    },
    {
     "s": "Mint <b>suggested taking</b> the boat instead of a taxi.",
     "g": "suggest + verb-ing, never suggest + person + to."
    },
    {
     "s": "We <b>stopped to take</b> photos of the sunset.",
     "g": "stop + to + verb: the purpose of stopping."
    },
    {
     "s": "The old curtains <b>need washing</b>.",
     "g": "need + verb-ing means need to be washed."
    }
   ]
  },
  "B2": {
   "key": "Prevention verbs take object + <strong>from</strong> + -ing; <strong>need + -ing</strong> has a passive meaning; <em>suggest, allow, stop</em> and <em>object to</em> each have patterns worth learning on their own.",
   "body": [
    "<em>Ban, prevent, stop, discourage, prohibit</em> take object + <em>from</em> + -ing, with the object straight after the verb: <em>Our school <b>bans students from using</b> phones in class</em>. <em>Ban</em> always needs <em>from</em>, and none of these verbs takes a <em>to</em>-infinitive or puts its object after the -ing. (With <em>prevent</em> and <em>stop</em>, British English sometimes drops <em>from</em>, but never with <em>ban</em>.)",
    "<em>Allow</em> and <em>permit</em> take person + <em>to</em>-infinitive, but -ing when no person is named: <em>The library allows students to borrow five books</em>; <em>The hotel <b>allows swimming</b> in the pool only until eight</em>. <s>allows to swim</s> is wrong.",
    "<em>Suggest</em> takes -ing or a <em>that</em>-clause, never a <em>to</em>-infinitive or person + <em>to</em>: <em>Mint <b>suggested taking</b> the boat</em>, <em>Mint suggested (that) we take the boat</em> — not <s>suggested us to take</s>.",
    "<em>Stop</em> changes meaning with its complement: <em>stop</em> + -ing is to give up or end an activity; <em>stop</em> + <em>to</em>-infinitive gives the purpose of stopping (<em>We <b>stopped to take</b> photos of the sunset</em>); <em>stop</em> + person + <em>from</em> + -ing means prevent.",
    "<em>Need</em> + -ing is a passive in disguise: <em>The curtains <b>need washing</b></em> means <em>need to be washed</em>. <em>Need washed</em> and <em>need wash</em> are not standard English, and <em>need to wash</em> makes the subject the doer, which only works for a person.",
    "When <em>to</em> is a preposition — <em>object to, look forward to, be used to</em> — a gerund follows. If the subject receives the action, use the passive gerund <em>being</em> + V3: <em>My cousin objects to <b>being called</b> by her childhood nickname</em>."
   ],
   "examples": [
    {
     "s": "Our school <b>bans students from using</b> phones in class.",
     "g": "ban + object + from + -ing."
    },
    {
     "s": "The hotel <b>allows swimming</b> in the pool only until eight.",
     "g": "allow + -ing with no person."
    },
    {
     "s": "Mint <b>suggested taking</b> the boat instead of a taxi.",
     "g": "suggest + -ing."
    },
    {
     "s": "We <b>stopped to take</b> photos of the sunset.",
     "g": "stop + to-infinitive: purpose."
    },
    {
     "s": "My cousin objects to <b>being called</b> by her childhood nickname.",
     "g": "Preposition to + passive gerund."
    }
   ]
  },
  "C1": {
   "key": "Prevention verbs take object + <strong>from</strong> + gerund; <strong>need + -ing</strong> is passive in meaning; and <em>suggest, allow, stop</em> and prepositional <em>to</em> each select their own complement.",
   "body": [
    "<em>Ban, bar, prevent, stop, discourage, prohibit</em> take object + <em>from</em> + gerund, with the object directly after the verb: <em>Our school <b>bans students from using</b> phones in class</em>. <em>Prevent</em> and <em>stop</em> can drop <em>from</em> in British English, but <em>ban</em>, <em>discourage</em> and <em>prohibit</em> cannot, and neither family accepts a <em>to</em>-infinitive or an object placed after the gerund.",
    "<em>Allow, permit</em> (and <em>advise</em>) alternate: object + <em>to</em>-infinitive when the person is named, a bare gerund when it is not — <em>The hotel <b>allows swimming</b> in the pool only until eight</em> versus <em>allows students to borrow five books</em>. <s>allows to swim</s> is the hybrid error.",
    "<em>Suggest</em> (like <em>recommend</em>) takes a gerund or a <em>that</em>-clause, often with the subjunctive: <em>Mint <b>suggested taking</b> the boat</em>; <em>suggested that we take</em>. <s>suggested us to take</s> borrows the pattern of <em>advise</em>.",
    "<em>Stop</em> is one of the verbs whose complement changes the meaning: <em>stop</em> + gerund ends the activity; <em>stop</em> + <em>to</em>-infinitive is an adjunct of purpose (<em>We <b>stopped to take</b> photos</em> — we stopped walking in order to photograph); <em>stop</em> + object + <em>from</em> + gerund means prevent.",
    "<em>Need</em> + gerund carries passive meaning: <em>The curtains <b>need washing</b></em> equals <em>need to be washed</em>. <em>Need washed</em> is regional, not standard, and a bare <em>need wash</em> is wrong; <em>need to wash</em> assigns agency to the subject.",
    "Where <em>to</em> is a preposition — <em>object to, look forward to, be used to, be committed to</em> — the complement is a gerund, and a passive gerund (<em>being</em> + V3) when the subject undergoes the action: <em>My cousin objects to <b>being called</b> by her childhood nickname</em>."
   ],
   "examples": [
    {
     "s": "Our school <b>bans students from using</b> phones in class.",
     "g": "ban never drops from; object precedes from."
    },
    {
     "s": "The hotel <b>allows swimming</b> in the pool only until eight.",
     "g": "No named person: allow + gerund."
    },
    {
     "s": "Mint <b>suggested taking</b> the boat instead of a taxi.",
     "g": "suggest + gerund, not object + to."
    },
    {
     "s": "The old curtains <b>need washing</b>.",
     "g": "Passive meaning: need to be washed."
    },
    {
     "s": "My cousin objects to <b>being called</b> by her childhood nickname.",
     "g": "Prepositional to + passive gerund."
    }
   ]
  }
 },
 "u6g3s3": {
  "B1": {
   "key": "The <strong>tone</strong> of a review is the writer's feeling; find the signal words, then choose the tone word.",
   "body": [
    "The <strong>tone</strong> (the writer's feeling or attitude) is not written as a word. You find it in the details. Use three questions. First: does the writer give good points, bad points, or both? Second: how strong are the feelings? Third: does the writer mean the words, or the opposite?",
    "Only bad points: the writer is <strong>critical</strong> (finds faults). Very angry: <strong>furious</strong>. Only good points: <strong>enthusiastic</strong> (excited and keen), <strong>delighted</strong> (very pleased), <strong>admiring</strong> (shows respect and praise) or <strong>appreciative</strong> (grateful, says thank you). Strong good points and bad points, and the writer cannot decide: <strong>ambivalent</strong> (mixed feelings). A list of faults with no praise is not ambivalent.",
    "Almost no feeling: <strong>indifferent</strong> (doesn't care). Signals are words like <em>it was okay</em>, <em>whatever</em> or <em>it doesn't matter to me</em>. Ambivalent and indifferent are different. An ambivalent writer has strong mixed feelings. An indifferent writer hardly cares at all.",
    "<strong>Skeptical</strong> (British spelling: sceptical) means the writer does not believe a claim, for example an advert's promise. Look for these signals. The claim is in quotation marks. The writer gives facts that show it is not true, or says she doubts it.",
    "<strong>Sarcastic</strong> means the writer says the opposite of what she means, to make fun of something. Look for big praise words about something clearly bad: <em>Wonderful! The air conditioning broke the moment we arrived.</em> Read literally, it sounds admiring. But nobody enjoys that, so it is sarcastic.",
    "Two more words. <strong>Nostalgic</strong> means warm feelings about the past: <em>used to</em>, <em>back when I was a child</em>, <em>just like years ago</em>. If there are no memories of the past, it is not nostalgic. <strong>Sympathetic</strong> means the writer shows she understands somebody else's problem: <em>The staff were clearly exhausted, poor things.</em>"
   ],
   "examples": [
    {
     "s": "The noodle shop is <b>just as it was</b> when Grandma took me there as a child.",
     "g": "Nostalgic: warm memories of the past."
    },
    {
     "s": "The brochure says ‘<b>five-star views</b>’. From our window we saw a wall.",
     "g": "Skeptical: the writer doubts the claim and gives evidence."
    },
    {
     "s": "<b>Fantastic</b>: only one towel for four people. What luxury.",
     "g": "Sarcastic: praise words for something clearly bad."
    },
    {
     "s": "The pool was beautiful, but the rooms smelled awful. <b>Would I go back? I really don't know.</b>",
     "g": "Ambivalent: strong good and bad feelings, no decision."
    },
    {
     "s": "Honestly, the hotel could have been anywhere. <b>It didn't matter to me</b> either way.",
     "g": "Indifferent: the writer hardly cares."
    }
   ]
  },
  "B2": {
   "key": "Tone is read from signals, not stated: decide whether the writer is positive, negative or both, how strongly she feels, and whether she means her words.",
   "body": [
    "Four reviews can agree on every fact and still differ in tone. Ask three questions: Are there good points, bad points, or both? How strong is the feeling? Does the writer mean her words literally?",
    "Negative only: <strong>critical</strong> (pointing out faults, often a list of them) or, more strongly, <strong>furious</strong>. Positive only: <strong>enthusiastic</strong> (excited, keen), <strong>delighted</strong> (very pleased), <strong>admiring</strong> (full of respect and praise) or <strong>appreciative</strong> (grateful). Both, strongly, with no decision: <strong>ambivalent</strong>. A review with no praise at all cannot be ambivalent.",
    "<strong>Indifferent</strong> is the absence of feeling: <em>it was okay</em>, <em>it doesn't matter to me</em>, a shrug rather than an opinion. Do not confuse it with ambivalent, which means strong feelings pulling in two directions.",
    "<strong>Skeptical</strong> (British <em>sceptical</em>) means doubting a claim. Typical signals are quotation marks around the claim, a phrase of doubt, and a fact that contradicts the promise.",
    "<strong>Sarcastic</strong> means saying the opposite of what you mean in order to mock. The signal is praise that is too strong for something obviously bad: <em>Wonderful! The air conditioning broke the moment we arrived.</em> Read literally it sounds admiring; in context it is a complaint.",
    "<strong>Nostalgic</strong> needs memories of the past (<em>used to</em>, <em>when I was a child</em>, <em>just like years ago</em>); without them, rule it out. <strong>Sympathetic</strong> means showing understanding of someone else's difficulty."
   ],
   "examples": [
    {
     "s": "The noodle shop is <b>just as it was</b> when Grandma took me there as a child.",
     "g": "Nostalgic: warm look back."
    },
    {
     "s": "The brochure says ‘<b>five-star views</b>’. From our window we saw a wall.",
     "g": "Skeptical: claim quoted, then contradicted."
    },
    {
     "s": "<b>Fantastic</b>: only one towel for four people. What luxury.",
     "g": "Sarcastic: exaggerated praise for a fault."
    },
    {
     "s": "The pool was beautiful, but the rooms smelled awful. <b>Would I go back? I really don't know.</b>",
     "g": "Ambivalent: strong mixed feelings."
    },
    {
     "s": "Honestly, the hotel could have been anywhere. <b>It didn't matter to me</b> either way.",
     "g": "Indifferent: no real feeling."
    }
   ]
  },
  "C1": {
   "key": "Tone is inferred, not stated: identify the evaluation, its intensity and whether it is meant literally, then match the word that fits all three.",
   "body": [
    "Reviews of one hotel can agree on every fact and diverge entirely in attitude. Three variables separate the tone words: the direction of the evaluation (positive, negative, both), its intensity, and whether it is sincere or ironic.",
    "Negative and sincere: <strong>critical</strong> (an itemised case against something) or, at high intensity, <strong>furious</strong>. Positive and sincere: <strong>enthusiastic</strong>, <strong>delighted</strong>, <strong>admiring</strong> (respect for quality or skill) or <strong>appreciative</strong> (gratitude). Both, strongly held and unresolved: <strong>ambivalent</strong> — a review that offers no praise cannot qualify, however long its list of faults.",
    "<strong>Indifferent</strong> is low intensity in every direction: the writer shrugs (<em>it was okay</em>, <em>it doesn't matter to me</em>). It is the commonest confusion with ambivalent, which requires strong feeling pulling two ways.",
    "<strong>Skeptical</strong> (British <em>sceptical</em>) targets a claim rather than an experience: the writer quotes a promise, signals doubt, and sets a contradicting fact beside it. <strong>Sarcastic</strong> is the ironic register: praise whose literal sense is incompatible with the situation (<em>Wonderful! The air conditioning broke the moment we arrived</em>). A literal reading would label it admiring; the mismatch is the signal.",
    "<strong>Nostalgic</strong> requires a backward look — <em>used to</em>, <em>once</em>, <em>just like years ago</em> — and is ruled out by its absence; <strong>sympathetic</strong> requires another person's difficulty to sympathise with. In the unit's writing task, a manager's reply stays <em>courteous</em> whichever tone the review takes, and the causatives of this unit often supply the reviewer's evidence."
   ],
   "examples": [
    {
     "s": "The noodle shop is <b>just as it was</b> when Grandma took me there as a child.",
     "g": "Nostalgic: affectionate retrospection."
    },
    {
     "s": "The brochure says ‘<b>five-star views</b>’. From our window we saw a wall.",
     "g": "Skeptical: claim quoted and refuted."
    },
    {
     "s": "<b>Fantastic</b>: only one towel for four people. What luxury.",
     "g": "Sarcastic: literal praise, intended censure."
    },
    {
     "s": "The pool was beautiful, but the rooms smelled awful. <b>Would I go back? I really don't know.</b>",
     "g": "Ambivalent: strong, unresolved mixed feelings."
    },
    {
     "s": "Honestly, the hotel could have been anywhere. <b>It didn't matter to me</b> either way.",
     "g": "Indifferent: minimal investment."
    }
   ]
  }
 },
 "u6w1s1": {
  "B1": {
   "key": "Five words for hotels and tones: learn each meaning, a word close to it, and the word it is often confused with.",
   "body": [
    "This lesson has five words. For each one, learn four things. Learn the <strong>meaning</strong> and the <strong>part of speech</strong> (noun, adjective and so on). Then learn a word with a close meaning, and a word that is easy to confuse with it. In the questions, read the whole sentence. The rest of the sentence usually gives a clue, such as a list of examples.",
    "<strong>Amenities</strong> (noun, usually plural) are the useful <strong>facilities</strong> (things and places for people to use) in a hotel, a flat or a town. For example: a sauna, a laundry room, free parking or a kettle in your room. The word is always about things and places that people can <strong>use</strong>. A list of useful things, like a lift or a washing machine, is a good clue.",
    "<strong>Complimentary</strong> (adjective) has two meanings. First, for things a hotel, shop or restaurant gives you, it means <strong>free</strong>: it costs you nothing. Second, for words, like a remark or a review, it means <strong>praising</strong> or flattering (saying nice things). So ask: is it a thing, or is it something somebody says? A free snack cannot praise anybody.",
    "<strong>Hospitality</strong> (noun) is a <strong>friendly, generous welcome</strong> for guests. You show hospitality when you invite visitors in, give them food and look after them. Be careful: the food or the help is only an <em>example</em> of hospitality. It is not the meaning. The meaning is the warm kindness itself. It is also the name of the hotel and restaurant industry.",
    "<strong>Nostalgic</strong> (adjective) describes a feeling. Something reminds you of a happy time in the past, and you feel warm and a little sad. A close meaning is <strong>fond of the past</strong> (liking it and missing it). Old songs, photos and toys often make people nostalgic. It always looks <strong>back</strong> at the past, never forward.",
    "<strong>Sarcastic</strong> (adjective) describes a way of speaking. A sarcastic person says the <strong>opposite</strong> of what she means, to <strong>mock</strong> (laugh at) something bad. Imagine it rains all day on your beach trip. Your friend says, ‘What lovely weather!’ Her words sound happy, but she does not mean them. She is laughing at the bad weather. So a close meaning is <strong>mocking</strong>."
   ],
   "examples": [
    {
     "s": "<b>amenities</b> (noun)",
     "g": "Our condo has great <b>amenities</b>: a sauna, a co-working room and a laundry."
    },
    {
     "s": "<b>complimentary</b> (adjective)",
     "g": "Every guest gets a <b>complimentary</b> welcome drink of cold lemongrass tea."
    },
    {
     "s": "<b>hospitality</b> (noun)",
     "g": "Thank you for your <b>hospitality</b>. Your family made us feel at home in Chiang Mai."
    },
    {
     "s": "<b>nostalgic</b> (adjective)",
     "g": "My old school bag from Prathom 1 makes me feel <b>nostalgic</b>."
    },
    {
     "s": "<b>sarcastic</b> (adjective)",
     "g": "‘Oh, great, another traffic jam,’ Fern said in a <b>sarcastic</b> voice."
    }
   ]
  },
  "B2": {
   "key": "Five words from hotel ads and reviews: know each one's meaning, its closest synonym and the look-alike meaning the wrong options use.",
   "body": [
    "Each of these words has a short meaning you can say in a few words, and each has a trap. In the questions, read the whole sentence first: a list of examples, a contrast or a reaction usually tells you which meaning fits.",
    "<strong>Amenities</strong> (noun, usually plural) are the useful <strong>facilities</strong> that a hotel, building or town provides for comfort or convenience, such as a sauna, a laundry room, free parking or a kettle in each room. The word always refers to practical things and places people can use, and a list of such features is the usual clue.",
    "<strong>Complimentary</strong> (adjective) has two meanings. Of things a business gives, it means <strong>free</strong>, at no extra cost: <em>complimentary breakfast</em>, <em>a complimentary shuttle</em>. Of words, it means <strong>praising</strong> or flattering: <em>a complimentary remark</em>, <em>a complimentary review</em>. Decide by the noun: an object cannot flatter anyone, so with objects the meaning is ‘free’.",
    "<strong>Hospitality</strong> (noun, uncountable) is a <strong>friendly, generous welcome</strong> given to guests or visitors. Cooking for guests, offering them a bed or showing them around are examples of hospitality, but the word means the warm welcome itself, not the cooking. It also names the hotel, restaurant and tourism industry.",
    "<strong>Nostalgic</strong> (adjective) means feeling a warm, slightly sad longing for a happy time in the past; in other words, <strong>fond of the past</strong>. Old songs, photos and toys are typical triggers. It is a gentle, emotional feeling, and it always looks back, never forward.",
    "<strong>Sarcastic</strong> (adjective) describes a remark or tone that says the <strong>opposite</strong> of what the speaker means, in order to <strong>mock</strong> or criticise. If a flight is cancelled and someone says ‘Fantastic, just what I needed’, the words are positive but the meaning is negative. The speaker does not mean the words literally: the closest meaning is <strong>mocking</strong>."
   ],
   "examples": [
    {
     "s": "<b>amenities</b> (noun)",
     "g": "The serviced flat offers great <b>amenities</b> such as a sauna and a co-working room."
    },
    {
     "s": "<b>complimentary</b> (adjective)",
     "g": "Guests who stay three nights receive a <b>complimentary</b> Thai massage."
    },
    {
     "s": "<b>hospitality</b> (noun)",
     "g": "We will never forget the <b>hospitality</b> of the family who hosted us in Nan."
    },
    {
     "s": "<b>nostalgic</b> (adjective)",
     "g": "Watching old Thai cartoons with Praew made us both feel <b>nostalgic</b>."
    },
    {
     "s": "<b>sarcastic</b> (adjective)",
     "g": "When the lift broke again, Kwan made a <b>sarcastic</b> joke about the ‘luxury’ building."
    }
   ]
  },
  "C1": {
   "key": "Five words that carry the voice of hotel ads and reviews: pin down the core meaning of each and the near-meaning the distractors exploit.",
   "body": [
    "Each word below has one core meaning that a ‘closest meaning’ question targets, and one tempting near-miss. Read the whole sentence: lists of examples, contrasts and reactions are the clues that separate the two.",
    "<strong>Amenities</strong> (noun, usually plural) are the <strong>facilities</strong> a hotel, building or neighbourhood provides for comfort or convenience: a sauna, a laundry, parking, an in-room kettle. In ads it is the standard upmarket synonym for ‘facilities’. It always denotes usable features, and an enumeration of such features is the usual contextual signal.",
    "<strong>Complimentary</strong> (adjective) is polysemous. Attached to goods or services, it means <strong>free of charge</strong>: <em>complimentary bottled water</em>, <em>a complimentary upgrade</em>. Attached to speech, it means <strong>praising</strong> or flattering: <em>a complimentary remark</em>. The collocating noun decides: objects cannot flatter, so with objects only ‘free’ survives.",
    "<strong>Hospitality</strong> (noun, uncountable) is a <strong>friendly, generous welcome</strong> extended to guests. Specific acts, such as cooking for visitors or offering them a room, are evidence of hospitality, not its definition, so never mistake an example for the meaning. The word also names the industry of hotels, restaurants and tourism.",
    "<strong>Nostalgic</strong> (adjective) denotes a bittersweet longing for a past remembered as happy: the closest paraphrase is <strong>fond of the past</strong>. Music, photographs and old objects typically trigger it. It is an emotional response, and it always faces backwards, never forwards.",
    "<strong>Sarcastic</strong> (adjective) describes verbal irony used to <strong>mock</strong>: the speaker says the opposite of what she means, usually praise for something that has gone wrong. The literal words sound positive or grateful; the intended meaning is critical. So a sarcastic reply is never meant literally: its closest synonym is <strong>mocking</strong>."
   ],
   "examples": [
    {
     "s": "<b>amenities</b> (noun)",
     "g": "The boutique hotel's <b>amenities</b>, from the sauna to the rooftop library, justify the price."
    },
    {
     "s": "<b>complimentary</b> (adjective)",
     "g": "A <b>complimentary</b> airport transfer is included for stays of four nights or more."
    },
    {
     "s": "<b>hospitality</b> (noun)",
     "g": "Isaan villages are famous for their <b>hospitality</b>: visitors rarely leave hungry."
    },
    {
     "s": "<b>nostalgic</b> (adjective)",
     "g": "The retro sweet shop leaves many adults <b>nostalgic</b> for their primary-school days."
    },
    {
     "s": "<b>sarcastic</b> (adjective)",
     "g": "‘What a relaxing swim,’ was Ice's <b>sarcastic</b> verdict on the crowded hotel pool."
    }
   ]
  }
 },
 "u6w1s2": {
  "B1": {
   "key": "Five more words for travel and work: learn each meaning, a word close to it, and what it does not mean.",
   "body": [
    "This lesson has five more words. For each one, learn the meaning, the part of speech, a word with a close meaning and the trap. Then use the clues in the sentence to choose.",
    "<strong>Skeptical</strong> (adjective) means <strong>doubtful</strong>: not easily believing that something is true or good. British English usually writes it <em>sceptical</em>. You know about the idea, but you do not believe it. We say skeptical <em>about</em> or <em>of</em> something.",
    "<strong>Heritage</strong> (noun) means the <strong>traditions, buildings and culture</strong> that come from the past. Earlier generations (older families) passed them down to us. Old temples, old towns, crafts and festivals are all heritage. We often say <em>cultural heritage</em>. Cultural heritage is made by <strong>people</strong> in the past, not by nature.",
    "<strong>Etiquette</strong> (noun) means the <strong>rules of polite behaviour</strong> in a place or situation. For example, <em>table etiquette</em> is how to behave politely when you eat. The first word names the <strong>place or situation</strong>, not the topic. Other examples are temple etiquette and phone etiquette.",
    "<strong>The gig economy</strong> (noun phrase) is work made of many <strong>short-term, freelance jobs</strong> (jobs for yourself, not for one boss) for different clients. People often find the jobs through apps. Delivery riders and online designers work in the gig economy. A <em>gig</em> can also mean a concert, but this phrase is not about music.",
    "<strong>Bespoke</strong> (adjective) means <strong>made to order</strong>: made specially for one customer. A bespoke dress is made for one person's body. Close words are <em>tailor-made</em> and <em>made to measure</em>. The opposite is things made in a factory, all the same, before anybody orders them."
   ],
   "examples": [
    {
     "s": "<b>skeptical</b> (adjective)",
     "g": "Nan is <b>skeptical</b> about online ads for ‘miracle’ face creams."
    },
    {
     "s": "<b>heritage</b> (noun)",
     "g": "Songkran water blessings are part of Thailand's cultural <b>heritage</b>."
    },
    {
     "s": "<b>etiquette</b> (noun)",
     "g": "In a Thai temple, good <b>etiquette</b> means taking off your shoes and speaking quietly."
    },
    {
     "s": "<b>gig economy</b> (noun phrase)",
     "g": "My cousin works in the <b>gig economy</b>, taking photos for different online shops."
    },
    {
     "s": "<b>bespoke</b> (adjective)",
     "g": "A shop in Pratunam makes <b>bespoke</b> school bags with each student's name."
    }
   ]
  },
  "B2": {
   "key": "Five words for culture, travel and work: know each core meaning, its synonym and the near-miss the wrong options use.",
   "body": [
    "These five words are common in travel writing and articles about work. Learn each one with a synonym and with the meaning it is easily confused with, then use the context to decide.",
    "<strong>Skeptical</strong> (adjective; British English usually spells it <em>sceptical</em>) means <strong>doubtful</strong>, not easily convinced that something is true or a good idea. It goes with <em>about</em> or <em>of</em>. A skeptical person knows about the plan or claim but doubts it.",
    "<strong>Heritage</strong> (noun, uncountable) means the <strong>traditions, buildings, customs and arts passed down</strong> from earlier generations: <em>cultural heritage</em>, <em>national heritage</em>. <em>Cultural</em> heritage is made by people rather than by nature, and it always comes from the past.",
    "<strong>Etiquette</strong> (noun) is the set of <strong>accepted rules of polite behaviour</strong> in a particular place or situation: <em>table etiquette</em>, <em>temple etiquette</em>, <em>business etiquette</em>. The first word names the situation: table etiquette is about how to behave at a meal.",
    "<strong>The gig economy</strong> (noun phrase) is a labour market of <strong>short-term, freelance work</strong> for many different clients, often arranged through apps, instead of a long-term job with one employer. Food-delivery riders and freelance designers are typical gig workers. ‘Gig’ also means a concert, but the phrase has nothing to do with music.",
    "<strong>Bespoke</strong> (adjective) means <strong>made to order</strong> for one particular customer; synonyms are <em>tailor-made</em> and <em>made to measure</em>. Its opposite is something made in large numbers in a factory, before any customer orders it."
   ],
   "examples": [
    {
     "s": "<b>skeptical</b> (adjective)",
     "g": "Many parents are <b>skeptical</b> about apps that promise fluent English in a month."
    },
    {
     "s": "<b>heritage</b> (noun)",
     "g": "The old shophouses of Phuket Town are an important part of the island's <b>heritage</b>."
    },
    {
     "s": "<b>etiquette</b> (noun)",
     "g": "Our guide explained Thai temple <b>etiquette</b> before we entered Wat Pho."
    },
    {
     "s": "<b>gig economy</b> (noun phrase)",
     "g": "Flexible hours attract many university students to the <b>gig economy</b>."
    },
    {
     "s": "<b>bespoke</b> (adjective)",
     "g": "The travel agency designs <b>bespoke</b> tours for each family's interests."
    }
   ]
  },
  "C1": {
   "key": "Five words for culture, travel and work: fix each core sense and reject the plausible near-misses.",
   "body": [
    "Each of these words is tested through a synonym question, so the skill is precision: knowing the core sense well enough to reject options that are related to the topic but not to the word.",
    "<strong>Skeptical</strong> (adjective; British <em>sceptical</em>) means <strong>doubtful</strong>, reluctant to accept that a claim is true or a plan is wise; it takes <em>about</em> or <em>of</em>. It presupposes awareness, since you can only doubt what you know about, and it describes intellectual doubt rather than an emotion.",
    "<strong>Heritage</strong> (noun, uncountable) is what a community <strong>inherits from the past</strong>: buildings, sites, customs, crafts, language. In <em>cultural heritage</em> the stress is on human creation, as opposed to <em>natural heritage</em> such as forests; either way, the word names the inheritance itself, not anything it later produces.",
    "<strong>Etiquette</strong> (noun) is the code of <strong>polite behaviour</strong> expected in a given setting: <em>table</em>, <em>temple</em>, <em>business</em> or <em>online etiquette</em>. The modifier names the situation, not the topic, so table etiquette concerns conduct at a meal.",
    "<strong>The gig economy</strong> (noun phrase) denotes a labour market built on <strong>short-term, freelance work</strong> for multiple clients, typically mediated by platforms and apps, as opposed to stable employment with a single employer. The concert sense of ‘gig’ is irrelevant here.",
    "<strong>Bespoke</strong> (adjective, mainly British) means <strong>made to order</strong> for an individual client: tailor-made, made to measure. Originally a tailoring term, it is now used loosely in marketing for anything personalised: bespoke tours, bespoke software. Its antonym is <em>off-the-peg</em>: made in standard sizes before any customer appears."
   ],
   "examples": [
    {
     "s": "<b>skeptical</b> (adjective)",
     "g": "Economists remain <b>skeptical</b> of the claim that the casino resort will help local people."
    },
    {
     "s": "<b>heritage</b> (noun)",
     "g": "Lanna woodcarving is a <b>heritage</b> craft that Chiang Mai is trying hard to keep alive."
    },
    {
     "s": "<b>etiquette</b> (noun)",
     "g": "Business <b>etiquette</b> in Japan, from bowing to exchanging cards, surprised Bow on her internship."
    },
    {
     "s": "<b>gig economy</b> (noun phrase)",
     "g": "Critics argue that the <b>gig economy</b> offers flexibility but little security."
    },
    {
     "s": "<b>bespoke</b> (adjective)",
     "g": "The resort markets <b>bespoke</b> wedding packages, each planned around one couple's wishes."
    }
   ]
  }
 },
 "u6w1s3": {
  "B1": {
   "key": "Five words for service, clothes and feelings: learn each meaning, a word close to it, and what it does not mean.",
   "body": [
    "This lesson has five words. Two of them are phrases: <em>cater to</em> and <em>live up to</em>. Learn each phrase as one item, with all its little words.",
    "<strong>Cater to</strong> (phrasal verb) means to <strong>give a group what it needs or wants</strong>. In other words, you serve that group and meet its needs. A café with vegan food caters to vegans. British English also says <em>cater for</em>.",
    "<strong>Ambivalent</strong> (adjective) means having <strong>two opposite feelings at the same time</strong>, or <strong>mixed feelings</strong>. For example, you feel happy and sad about the same thing. The idiom <em>in two minds</em> is very close: you feel two ways, so you cannot decide. Do not mix it up with <em>indifferent</em>, which means not interested. An ambivalent person cares a lot, but in two directions.",
    "<strong>Courteous</strong> (adjective) means <strong>polite and respectful</strong>, even in a difficult situation. A courteous shop assistant says please and thank you, and listens carefully. It is about manners (polite behaviour) towards other people.",
    "<strong>Attire</strong> (noun) means <strong>clothes</strong>. It is a formal word, often used for special events: <em>formal attire</em>, <em>business attire</em>. It is only about what you wear, not about how you act.",
    "<strong>Live up to</strong> (phrasal verb) means to <strong>be as good as</strong> people expected, or as good as somebody promised. After it, we usually say <em>reputation</em> (what people say about it), <em>expectations</em> or the <em>hype</em> (lots of excited talk). If a film lives up to the hype, that is good news. It is about <strong>quality</strong>, and it is a positive phrase: the thing matched what people hoped for."
   ],
   "examples": [
    {
     "s": "<b>cater to</b> (phrasal verb)",
     "g": "This hostel <b>caters to</b> backpackers, with cheap beds and a big shared kitchen."
    },
    {
     "s": "<b>ambivalent</b> (adjective)",
     "g": "My sister has <b>ambivalent</b> feelings about the rainy season. She loves the cool air, but she hates the floods."
    },
    {
     "s": "<b>courteous</b> (adjective)",
     "g": "The tour guide was <b>courteous</b> and helpful to every visitor."
    },
    {
     "s": "<b>attire</b> (noun)",
     "g": "Business <b>attire</b> is expected at the job interview."
    },
    {
     "s": "<b>live up to</b> (phrasal verb)",
     "g": "Did the new Thai drama <b>live up to</b> the hype?"
    }
   ]
  },
  "B2": {
   "key": "Five words for service, dress and attitude: know each core meaning, its synonym and the near-miss the wrong options use.",
   "body": [
    "Two of these items are phrasal verbs, <em>cater to</em> and <em>live up to</em>; learn them as whole units, particles included. For each item, notice the synonym that a ‘closest meaning’ question would use.",
    "<strong>Cater to</strong> (phrasal verb; British English also says <em>cater for</em>) means to <strong>provide what a particular group needs or wants</strong>, in other words to meet that group's needs. A guesthouse with ramps and wide doors caters to wheelchair users.",
    "<strong>Ambivalent</strong> (adjective) means having <strong>two opposite feelings at the same time</strong> about something. The idiom <em>in two minds</em> is the closest equivalent: you are pulled two ways and cannot decide. Do not confuse it with <em>indifferent</em>, which means not interested or not caring; an ambivalent person cares a lot.",
    "<strong>Courteous</strong> (adjective) means <strong>polite and respectful</strong>, especially when it would be easy to be rude. It describes manners and behaviour towards other people.",
    "<strong>Attire</strong> (noun, formal) means <strong>clothing</strong>, especially the clothes expected on a particular occasion: <em>formal attire</em>, <em>business attire</em>. It refers only to what people wear, not to how they behave.",
    "<strong>Live up to</strong> (phrasal verb) means to <strong>be as good as</strong> expected or promised. Its object is usually a <em>reputation</em>, <em>expectations</em>, <em>the hype</em> or <em>a name</em>. Saying that a place truly <em>lived up to the hype</em> is strong praise. The phrase is about quality: it means matching expectations."
   ],
   "examples": [
    {
     "s": "<b>cater to</b> (phrasal verb)",
     "g": "Several Bangkok hotels now <b>cater to</b> Muslim travellers, with halal menus and prayer rooms."
    },
    {
     "s": "<b>ambivalent</b> (adjective)",
     "g": "Fern felt <b>ambivalent</b> about the hotel's new rooftop bar: great views, terrible music."
    },
    {
     "s": "<b>courteous</b> (adjective)",
     "g": "The <b>courteous</b> receptionist remembered every guest's name."
    },
    {
     "s": "<b>attire</b> (noun)",
     "g": "The temple website reminds visitors that modest <b>attire</b> is required."
    },
    {
     "s": "<b>live up to</b> (phrasal verb)",
     "g": "The rooftop café <b>lived up to</b> every promise in its online ads."
    }
   ]
  },
  "C1": {
   "key": "Five words for service, dress and attitude: fix each core sense, including two phrasal verbs, and reject the plausible near-misses.",
   "body": [
    "Two items, <em>cater to</em> and <em>live up to</em>, are phrasal verbs whose meaning depends on the particles, so treat each as a single lexical unit. The other three are adjectives and a noun with a slightly formal register.",
    "<strong>Cater to</strong> (phrasal verb; British also <em>cater for</em>) means to <strong>serve the needs or wishes</strong> of a specific group: a resort that caters to families, an app that caters to budget travellers. It describes provision aimed at a target group.",
    "<strong>Ambivalent</strong> (adjective) means holding <strong>two contradictory feelings</strong> at once, typically attraction and reluctance. Its closest idiomatic equivalent is <em>in two minds</em>. It is often confused with <em>indifferent</em> (lacking interest), but the two are almost opposite: ambivalence means strong feelings pulling in different directions.",
    "<strong>Courteous</strong> (adjective) means <strong>polite and respectful</strong>, with a hint of deliberate good manners, especially under pressure. It is a word about conduct towards other people.",
    "<strong>Attire</strong> (noun, formal, uncountable) means <strong>clothing</strong>, and it typically appears in dress codes and invitations: <em>formal</em>, <em>business</em>, <em>smart</em> or <em>modest attire</em>. It is strictly about dress; behaviour belongs to <em>etiquette</em>.",
    "<strong>Live up to</strong> (phrasal verb) means to <strong>match</strong> what was expected or promised: to <strong>be as good as</strong> a reputation, a standard, the hype, or a name. Used positively, often intensified (<em>really</em>, <em>fully</em>), it is high praise: the reality equalled the expectation."
   ],
   "examples": [
    {
     "s": "<b>cater to</b> (phrasal verb)",
     "g": "Hua Hin's newer resorts increasingly <b>cater to</b> retirees from Europe."
    },
    {
     "s": "<b>ambivalent</b> (adjective)",
     "g": "Critics were <b>ambivalent</b> about the film, admiring its photography while finding the plot thin."
    },
    {
     "s": "<b>courteous</b> (adjective)",
     "g": "Reviewers consistently describe the staff as <b>courteous</b> without being stiff."
    },
    {
     "s": "<b>attire</b> (noun)",
     "g": "The invitation specifies traditional Thai <b>attire</b> for the opening ceremony."
    },
    {
     "s": "<b>live up to</b> (phrasal verb)",
     "g": "The restaurant's second branch struggled to <b>live up to</b> the standard of the first."
    }
   ]
  }
 },
 "u6w2s1": {
  "B1": {
   "key": "Choose the right family member for the gap: a noun after a word like <em>a</em>, <em>every</em> or <em>with</em>; an adjective after <em>be</em> or <em>very</em>.",
   "body": [
    "Every word has a <strong>family</strong>: a noun, an adjective, an adverb and sometimes a verb. First, look at the word just before the gap. After <em>a</em>, <em>the</em>, <em>every</em>, <em>her</em> or a <strong>preposition</strong> (a small word like <em>with</em>, <em>of</em>, <em>for</em>), you need a <strong>noun</strong>. After <em>be</em>, <em>feel</em> or <em>very</em>, you need an <strong>adjective</strong>. An <strong>adverb</strong> (often with <em>-ly</em>) describes a verb. Then check the meaning and the spelling.",
    "<strong>Amenity</strong> is the singular noun; <strong>amenities</strong> is the plural. Hotel ads usually use the plural. But <em>every</em> and <em>each</em> take a <strong>singular</strong> noun: <em>every room</em>, <em>each guest</em>, not <s>every rooms</s>. Watch out for look-alike words that begin with the same letters but come from other families, with different meanings.",
    "<strong>Compliment</strong> (noun) means kind words of praise. We say <em>pay somebody a compliment</em> (say something nice about them). It is also a verb: <em>She complimented me on my speech.</em> <strong>Complimentary</strong> is the adjective: free, or praising. Watch the spelling! <em>Complement</em>, with an E, is different. It means something that completes another thing or goes well with it. After <em>a</em>, choose the noun.",
    "<strong>Hospitality</strong> is the noun: a warm welcome for guests. <strong>Hospitable</strong> is the adjective: friendly and generous to guests. <strong>Hospitably</strong> is the adverb. So we say <em>The hosts were hospitable</em>, with an adjective after <em>be</em>.",
    "<strong>Sarcasm</strong> is the noun: saying the opposite of what you mean, to mock. <strong>Sarcastic</strong> is the adjective, and <strong>sarcastically</strong> is the adverb. Sarcasm is <strong>uncountable</strong> (it has no plural), so never write <s>sarcasms</s>. After a preposition, use the noun: <em>with a hint of sarcasm</em>.",
    "<strong>Nostalgia</strong> is the noun: a warm, sad longing for the past. <strong>Nostalgic</strong> is the adjective, and <strong>nostalgically</strong> is the adverb. Nostalgia is also <strong>uncountable</strong>, so never write <s>nostalgias</s>. After a preposition, use the noun: <em>a wave of nostalgia</em>, <em>nostalgia for the old days</em>."
   ],
   "examples": [
    {
     "s": "<b>amenity</b> (noun, plural amenities)",
     "g": "The hostel is cheap, but each room has one useful <b>amenity</b>: a small fridge."
    },
    {
     "s": "<b>compliment</b> (noun)",
     "g": "The guest's kind <b>compliment</b> about the clean room made the housekeeper smile."
    },
    {
     "s": "<b>hospitable</b> (adjective)",
     "g": "The family in Nan were so <b>hospitable</b> that we stayed for dinner."
    },
    {
     "s": "<b>sarcasm</b> (noun)",
     "g": "‘Nice timing,’ said Kwan, with a touch of <b>sarcasm</b>, when the bus left without us."
    },
    {
     "s": "<b>nostalgia</b> (noun)",
     "g": "Visiting my old kindergarten gave me a sudden wave of <b>nostalgia</b>."
    }
   ]
  },
  "B2": {
   "key": "Pick the family member the slot demands, then check countability and spelling: noun after a determiner or preposition, adjective after <em>be</em> or <em>very</em>.",
   "body": [
    "Word-family questions test two things: the <strong>slot</strong> and the <strong>spelling</strong>. A determiner (<em>a</em>, <em>every</em>, <em>her</em>) or a preposition (<em>with</em>, <em>of</em>, <em>for</em>, <em>in</em>) needs a <strong>noun</strong>; <em>be</em>, <em>feel</em> or an intensifier like <em>very</em> needs an <strong>adjective</strong>; a verb is modified by an <strong>adverb</strong>. Then check whether the noun is countable and whether a look-alike word has crept into the options.",
    "<strong>Amenity</strong> (singular) and <strong>amenities</strong> (plural): the plural is more common in hotel ads, but <em>every</em> and <em>each</em> always take a singular countable noun, so <em>every guest</em>, not <s>every guests</s>. Beware of look-alikes that start with the same letters but belong to different families.",
    "<strong>Compliment</strong> is a noun meaning praise, as in <em>pay somebody a compliment</em>, and a verb, as in <em>compliment somebody on something</em>. <strong>Complimentary</strong> is the adjective (free, or praising). Do not confuse these with <em>complement</em>, spelled with an E, which is something that completes or goes well with something else. After <em>a</em>, you need the noun.",
    "<strong>Hospitality</strong> (noun), <strong>hospitable</strong> (adjective, friendly and generous to guests), <strong>hospitably</strong> (adverb). After <em>be</em> or <em>very</em>, choose the adjective: <em>a hospitable host</em>, <em>she is always hospitable</em>.",
    "<strong>Sarcasm</strong> (noun, uncountable), <strong>sarcastic</strong> (adjective), <strong>sarcastically</strong> (adverb). Because sarcasm is uncountable, <s>sarcasms</s> is wrong. Typical phrases: <em>a hint of sarcasm</em>, <em>dripping with sarcasm</em>, <em>said sarcastically</em>.",
    "<strong>Nostalgia</strong> (noun, uncountable), <strong>nostalgic</strong> (adjective), <strong>nostalgically</strong> (adverb). Again, no plural: <s>nostalgias</s> is wrong. Typical phrases: <em>nostalgia for</em> something, <em>a wave of nostalgia</em>, <em>feel nostalgic about</em> something."
   ],
   "examples": [
    {
     "s": "<b>amenity</b> (noun, plural amenities)",
     "g": "The guesthouse lacks one important <b>amenity</b>: there is no lift."
    },
    {
     "s": "<b>compliment</b> (noun)",
     "g": "Hearing that her presentation looked professional was the best <b>compliment</b> Ice had ever had."
    },
    {
     "s": "<b>hospitable</b> (adjective)",
     "g": "Our homestay hosts in Mae Kampong were warm and <b>hospitable</b>."
    },
    {
     "s": "<b>sarcasm</b> (noun)",
     "g": "Her ‘thanks a lot’ was dripping with <b>sarcasm</b>."
    },
    {
     "s": "<b>nostalgia</b> (noun)",
     "g": "The 1990s theme night brought a wave of <b>nostalgia</b> to the hotel bar."
    }
   ]
  },
  "C1": {
   "key": "Let syntax choose the part of speech, then let countability and spelling eliminate the rest: the traps here are false friends and impossible plurals.",
   "body": [
    "Read the gap's grammatical environment before thinking about meaning. Determiners, possessives and prepositions require a <strong>noun</strong>; copular verbs and intensifiers (<em>be</em>, <em>feel</em>, <em>very</em>) require an <strong>adjective</strong>; verbs take <strong>adverbs</strong>. The distractors then fall into three types: the wrong part of speech, an impossible plural of an uncountable noun, and a false friend that merely looks related.",
    "<strong>Amenity</strong> and <strong>amenities</strong>: the plural dominates in marketing, but distributive determiners such as <em>every</em> and <em>each</em> take a singular count noun (<em>every guest</em>, <em>each suite</em>), however common the plural form of a word may be. Words that merely begin with the same letters belong to other families and are false friends.",
    "<strong>Compliment</strong> is both noun (<em>pay somebody a compliment</em>) and verb (<em>compliment somebody on something</em>); <strong>complimentary</strong> is its adjective, meaning free or praising. Its homophone <em>complement</em> (something that completes or enhances something else) is a classic spelling trap: the I spelling is about praise, the E spelling about completion. After an article, only the noun fits.",
    "<strong>Hospitality</strong> (noun), <strong>hospitable</strong> (adjective: generous and welcoming to guests), <strong>hospitably</strong> (adverb). A predicative slot after <em>be</em> or <em>very</em> requires the adjective.",
    "<strong>Sarcasm</strong> (uncountable noun), <strong>sarcastic</strong> (adjective), <strong>sarcastically</strong> (adverb). As an abstract, uncountable noun it has no plural, so <s>sarcasms</s> is impossible. It collocates with <em>a hint of</em>, <em>a note of</em>, <em>heavy</em> and <em>dripping with</em>.",
    "<strong>Nostalgia</strong> (uncountable noun), <strong>nostalgic</strong> (adjective), <strong>nostalgically</strong> (adverb). Likewise uncountable, so <s>nostalgias</s> is impossible. It collocates with <em>for</em> (the object of longing), <em>a wave</em> or <em>pang of</em>, and verbs such as <em>evoke</em> and <em>stir</em>."
   ],
   "examples": [
    {
     "s": "<b>amenity</b> (noun, plural amenities)",
     "g": "Free filtered water is the one <b>amenity</b> every guest seems to notice."
    },
    {
     "s": "<b>compliment</b> (noun)",
     "g": "Being told her brochure was ‘better than a real hotel's’ was quite a <b>compliment</b> for Bow."
    },
    {
     "s": "<b>hospitable</b> (adjective)",
     "g": "Few places are as <b>hospitable</b> to solo travellers as the old quarter of Chiang Mai."
    },
    {
     "s": "<b>sarcasm</b> (noun)",
     "g": "There was a note of <b>sarcasm</b> in the reviewer's praise for the ‘cosy’ six-square-metre room."
    },
    {
     "s": "<b>nostalgia</b> (noun)",
     "g": "The hotel's vintage décor is designed to evoke <b>nostalgia</b> for 1960s Bangkok."
    }
   ]
  }
 },
 "u6w2s2": {
  "B1": {
   "key": "Learn which family member a gap needs, an idea or a person, and learn fixed phrases exactly, word for word.",
   "body": [
    "This lesson is about word families and <strong>fixed phrases</strong> (words that always go together). After a preposition or <em>a</em>, you need a <strong>noun</strong>. Sometimes two nouns look similar: one is an idea, one is a person. Choose by meaning.",
    "<strong>Skeptical</strong> family (British English writes these with C: <em>sceptical</em>, <em>scepticism</em>, <em>sceptic</em>). <strong>Skeptical</strong> is the adjective: doubtful. <strong>Skepticism</strong> is the noun for the idea or feeling of doubt. A <strong>skeptic</strong> is a person who doubts. <strong>Skeptically</strong> is the adverb. Some phrases need a noun for a <strong>reaction</strong> (a feeling or an idea), not a person. For example, <em>be met with</em> + noun tells you how people reacted: <em>The news was met with joy</em>. <em>The plan was met with anger</em>. A person noun cannot be a reaction. The opposite of skeptical is <strong>convinced</strong> (sure it is true). We say skeptical <em>about</em> something, but convinced <em>by</em> something. So if you change skeptical to convinced, the meaning becomes the opposite.",
    "<strong>Heritage</strong> is an uncountable noun: <em>cultural heritage</em>, <em>national heritage</em>. UNESCO (a United Nations group) keeps a famous list of special places. Each place on the list has one fixed name: a <strong>World Heritage Site</strong>. This name never changes, so do not swap in a word with a similar meaning.",
    "<strong>Etiquette</strong> goes with <em>table</em>, <em>temple</em> and <em>business</em>. We <em>follow</em> etiquette. When somebody breaks a polite rule, we call it <strong>a breach of etiquette</strong>. A <em>breach</em> (noun) means breaking a rule or a promise. We can say <em>break a rule</em> with the verb. But in this phrase the noun is always <em>breach</em>, never <s>a break of etiquette</s>.",
    "<strong>Bespoke</strong> means made for one customer. A tailor (a person who makes clothes) first takes your <strong>measurements</strong>: the sizes of your body. Then the clothes are made to fit those measurements. Be careful: <em>measures</em> means actions to solve a problem (safety measures) or units of amount. After an adjective, you need a noun.",
    "<strong>The gig economy</strong> also has a small family. A <strong>gig</strong> is one short job. A <strong>gig worker</strong> does these jobs. We say <em>work in the gig economy</em> and <em>the rise of the gig economy</em>."
   ],
   "examples": [
    {
     "s": "<b>skepticism</b> (noun)",
     "g": "Fern's parents listened to her plan for a trip to Japan with obvious <b>skepticism</b>."
    },
    {
     "s": "<b>World Heritage Site</b> (noun phrase)",
     "g": "Ban Chiang in Udon Thani is a UNESCO <b>World Heritage Site</b>."
    },
    {
     "s": "<b>breach of etiquette</b> (noun phrase)",
     "g": "Touching a monk's robe is a <b>breach of etiquette</b> for women in Thailand."
    },
    {
     "s": "<b>measurements</b> (noun)",
     "g": "For her <b>bespoke</b> graduation dress, the tailor took Nan's <b>measurements</b> twice."
    },
    {
     "s": "<b>gig worker</b> (noun phrase)",
     "g": "Praew's aunt is a <b>gig worker</b> who drives for two different apps."
    }
   ]
  },
  "B2": {
   "key": "Separate the idea noun from the person noun, and learn fixed collocations exactly: no synonyms allowed.",
   "body": [
    "These items test families and fixed collocations. A noun slot may offer two nouns from the same family, one abstract (an idea or reaction) and one for a person; choose by meaning. Fixed phrases cannot be changed, even for a synonym.",
    "<strong>Skeptical</strong> family (British: <em>sceptical</em>, <em>scepticism</em>, <em>sceptic</em>): <strong>skeptical</strong> (adjective, doubtful), <strong>skepticism</strong> (noun, the attitude of doubt), <strong>skeptic</strong> (noun, a person who doubts), <strong>skeptically</strong> (adverb). The pattern <em>be met with</em> + noun describes a reaction, and a reaction is an attitude, not a group of people: <em>met with criticism</em>, <em>met with applause</em>, <em>met with silence</em>. The adjective takes <em>about</em> or <em>of</em>; its opposite is <strong>convinced</strong>, which takes <em>by</em> or <em>of</em>. Swapping one for the other reverses the meaning.",
    "<strong>Heritage</strong> (uncountable) appears in <em>cultural</em> and <em>national heritage</em>, <em>heritage building</em> and <em>heritage site</em>. UNESCO's list uses one fixed name, <strong>World Heritage Site</strong>; no synonym can replace any word in this title.",
    "<strong>Etiquette</strong> collocates with <em>table</em>, <em>temple</em> and <em>business</em>, and with the verbs <em>follow</em> and <em>observe</em>. Breaking the rules is <strong>a breach of etiquette</strong>; <em>breach</em> is the noun for breaking a rule or agreement (<em>a breach of contract</em>). We <em>break</em> a rule with the verb, but the noun phrase is always <em>a breach of</em>, never <s>a break of etiquette</s>.",
    "<strong>Bespoke</strong> (made for one customer) is linked to the idea of size: a bespoke garment is <em>made to measure</em>, the tailor first takes the client's <strong>measurements</strong>, meaning the sizes of her body. <em>Measures</em> means actions to deal with a problem (<em>safety measures</em>) or units, so it does not fit. After an adjective, a noun is needed.",
    "<strong>The gig economy</strong>: a <em>gig</em> is one short job, a <em>gig worker</em> does such jobs, and people <em>work in</em> or <em>join</em> the gig economy, often during <em>the rise of the gig economy</em>."
   ],
   "examples": [
    {
     "s": "<b>skepticism</b> (noun)",
     "g": "Environmental groups expressed deep <b>skepticism</b> about the resort's promise of ‘zero plastic’."
    },
    {
     "s": "<b>World Heritage Site</b> (noun phrase)",
     "g": "The Historic City of Ayutthaya has been a <b>World Heritage Site</b> for over three decades."
    },
    {
     "s": "<b>breach of etiquette</b> (noun phrase)",
     "g": "Using your phone during a Thai wedding ceremony is a clear <b>breach of etiquette</b>."
    },
    {
     "s": "<b>measurements</b> (noun)",
     "g": "The hotel's tailor took every receptionist's <b>measurements</b> for the new <b>bespoke</b> uniforms."
    },
    {
     "s": "<b>gig worker</b> (noun phrase)",
     "g": "As a <b>gig worker</b>, Ice chooses her own hours but gets no paid holiday."
    }
   ]
  },
  "C1": {
   "key": "Choose the abstract noun over the agent noun where the frame names a reaction, and treat fixed collocations as unchangeable.",
   "body": [
    "Two kinds of knowledge are tested here: derivation (which member of the family the slot needs) and collocation (which word convention has fixed in a phrase). Fixed collocations do not tolerate synonyms, even near-perfect ones.",
    "<strong>Skeptical</strong> (British <em>sceptical</em>) gives <strong>skepticism</strong>, the abstract noun for the attitude of doubt, and <strong>skeptic</strong>, the agent noun for a person who doubts, plus the adverb <strong>skeptically</strong>. The frame <em>be met with</em> + noun names a reaction (<em>met with derision</em>, <em>with enthusiasm</em>, <em>with silence</em>), so it requires the abstract noun, not the agent. The adjective takes <em>about</em> or <em>of</em>; its antonym <strong>convinced</strong> takes <em>by</em> or <em>of</em>, so replacing one with the other inverts the proposition.",
    "<strong>Heritage</strong> is uncountable and collocates with <em>cultural</em>, <em>national</em> and <em>architectural</em>. UNESCO's designation is fixed as <strong>World Heritage Site</strong>; no near-synonym can be substituted in the title.",
    "<strong>Etiquette</strong> collocates with <em>observe</em>, <em>follow</em> and the settings <em>table</em>, <em>temple</em>, <em>business</em>. Violating it is <strong>a breach of etiquette</strong>: <em>breach</em> is the nominal for breaking a rule, law or agreement (<em>a breach of contract</em>, <em>a security breach</em>). The verb <em>break</em> collocates with <em>rules</em>, but its noun is not used in this phrase.",
    "<strong>Bespoke</strong>, originally a tailoring term, implies <em>made to measure</em>: a bespoke garment begins with the tailor taking a client's <strong>measurements</strong>, the plural noun for body dimensions. <em>Measures</em> denotes steps taken to address a problem or units of quantity, so it is the wrong noun, and participles cannot head a noun phrase after an adjective.",
    "<strong>The gig economy</strong> forms a compact family: <em>a gig</em> (one short assignment), <em>gig work</em>, <em>gig workers</em>, and the frames <em>work in</em>, <em>the rise of</em> and <em>regulate</em> the gig economy."
   ],
   "examples": [
    {
     "s": "<b>skepticism</b> (noun)",
     "g": "Analysts voiced open <b>skepticism</b> about claims that the new airport would ‘double tourism overnight’."
    },
    {
     "s": "<b>World Heritage Site</b> (noun phrase)",
     "g": "The Kaeng Krachan forest became a natural <b>World Heritage Site</b> in 2021."
    },
    {
     "s": "<b>breach of etiquette</b> (noun phrase)",
     "g": "Raising your voice at a hotel receptionist is seen as a glaring <b>breach of etiquette</b> in Thailand."
    },
    {
     "s": "<b>measurements</b> (noun)",
     "g": "<b>Bespoke</b> tailoring begins with more than twenty <b>measurements</b>, from collar to cuff."
    },
    {
     "s": "<b>gig work</b> (noun phrase)",
     "g": "Policymakers are debating how to give <b>gig work</b> the same protections as regular employment."
    }
   ]
  }
 },
 "u6w2s3": {
  "B1": {
   "key": "Look at the word before the gap: do you need a person, a thing or an idea, and can that noun be plural? Keep <em>live up to</em> whole.",
   "body": [
    "First, look at the word before the gap. After <em>a</em>, <em>her</em>, <em>with</em> or an adjective like <em>formal</em>, you need a <strong>noun</strong>. Is it a person or a thing? Can it be plural? Then check that the word is really in the family; some look-alikes are not.",
    "<strong>Cater</strong> is the verb. It means to provide food for an event, and <em>cater to</em> (or <em>cater for</em>) a group means to give them what they want. A <strong>caterer</strong> is a <strong>person or company</strong> that provides food for events. The ending <em>-er</em> often means a person, like <em>teacher</em>. <strong>Catering</strong> is the service or activity: <em>a catering company</em>. <em>Catered</em> is a verb form. So when the sentence needs <strong>somebody who does the job</strong>, choose the <em>-er</em> word. When it needs the service, choose <em>catering</em>.",
    "<strong>Attire</strong> (clothes) is an <strong>uncountable</strong> noun. It has no plural, so never write <s>attires</s>. It often comes after an adjective: <em>formal attire</em>, <em>suitable attire</em>, <em>business attire</em>. <strong>Attired</strong> is an adjective meaning dressed: <em>attired in silk</em>.",
    "<strong>Live up to</strong> means to be as good as people expected. Keep all three words. We say <em>live up to</em> + a <strong>reputation</strong>, <strong>expectations</strong>, a <strong>promise</strong> or <strong>the hype</strong>. Now the negative: <em>didn't live up to</em> means it was <strong>worse</strong> than people expected. It was disappointing. Be careful: when something is even better than people expected, we say it <strong>exceeded</strong> expectations. That is a different idea.",
    "<strong>Ambivalent</strong> is the adjective: having mixed feelings. <strong>Ambivalence</strong> is the noun: mixed feelings. <strong>Ambivalently</strong> is the adverb. After a possessive like <em>my</em>, <em>our</em> or <em>their</em>, use the noun: <em>their ambivalence</em>. Do not mix it up with <em>ambiguity</em>. That noun means having more than one possible meaning, so it is unclear.",
    "<strong>Courteous</strong> is the adjective: polite. <strong>Courtesy</strong> is the noun: politeness. <strong>Courteously</strong> is the adverb. After a preposition, use the noun: <em>Thank you for your courtesy</em>. Some look-alike words also begin with <em>court</em>, but they have other meanings, so check the meaning too."
   ],
   "examples": [
    {
     "s": "<b>caterer</b> (noun)",
     "g": "The <b>caterer</b> arrived early with khao man gai for our sports day."
    },
    {
     "s": "<b>attire</b> (noun)",
     "g": "Swimwear is not suitable <b>attire</b> for the hotel restaurant."
    },
    {
     "s": "<b>live up to</b> (phrasal verb)",
     "g": "Sadly, the famous noodle shop did not <b>live up to</b> its reputation."
    },
    {
     "s": "<b>ambivalence</b> (noun)",
     "g": "You could hear Mint's <b>ambivalence</b> when she talked about the new mall near her house."
    },
    {
     "s": "<b>courtesy</b> (noun)",
     "g": "The staff answered every question with <b>courtesy</b>."
    }
   ]
  },
  "B2": {
   "key": "Use the slot to choose the family member, a person or an idea, countable or uncountable, and keep <em>live up to</em> complete, including its negative.",
   "body": [
    "In a noun slot (after an article, a possessive, a preposition or an adjective), decide whether you need a person or an abstract idea, and whether the noun can be plural. Then reject look-alikes from different families.",
    "<strong>Cater</strong> (verb) means to provide food and drink for an event; <em>cater to</em> or <em>for</em> a group means to provide what they want. <strong>Caterer</strong> is the agent noun, a person or company that supplies food for events; <strong>catering</strong> is the service or industry (<em>catering staff</em>, <em>a catering firm</em>); <em>catered</em> is a verb form. If the sentence needs the person or firm that does the job, choose the agent noun.",
    "<strong>Attire</strong> is an <strong>uncountable</strong> noun, so <s>attires</s> is wrong. It typically follows an adjective: <em>suitable</em>, <em>formal</em>, <em>business</em> or <em>casual attire</em>. <strong>Attired</strong> is a formal adjective meaning dressed (<em>attired in a traditional silk sabai</em>), so it cannot fill a noun slot.",
    "<strong>Live up to</strong> + <em>a reputation</em>, <em>expectations</em>, <em>a promise</em>, <em>the hype</em>: to be as good as expected. The negative, <em>didn't live up to</em>, means the thing was <strong>worse than expected</strong>, a disappointment. Going beyond expectations is a different idea, expressed with <em>exceed</em>.",
    "<strong>Ambivalent</strong> (adjective), <strong>ambivalence</strong> (noun, mixed feelings), <strong>ambivalently</strong> (adverb). After a possessive such as <em>my</em> or <em>their</em>, the noun is needed. Do not confuse ambivalence (mixed <em>feelings</em>) with <em>ambiguity</em> (more than one possible <em>meaning</em>).",
    "<strong>Courteous</strong> (adjective), <strong>courtesy</strong> (noun, politeness), <strong>courteously</strong> (adverb). After a preposition, use the noun: <em>out of courtesy</em>, <em>thanks for your courtesy</em>. Not every word that begins with <em>court</em> belongs to this family."
   ],
   "examples": [
    {
     "s": "<b>caterer</b> (noun)",
     "g": "The wedding <b>caterer</b> prepared a buffet of northern Thai dishes for two hundred guests."
    },
    {
     "s": "<b>attire</b> (noun)",
     "g": "Hotel staff must wear formal <b>attire</b> at all times, including name badges."
    },
    {
     "s": "<b>live up to</b> (phrasal verb)",
     "g": "The ‘sea-view’ room didn't <b>live up to</b> the photos: we could only see a car park."
    },
    {
     "s": "<b>ambivalence</b> (noun)",
     "g": "The villagers' <b>ambivalence</b> towards tourism shows in their careful rules for homestay guests."
    },
    {
     "s": "<b>courtesy</b> (noun)",
     "g": "Fern handled the angry customer with great <b>courtesy</b>."
    }
   ]
  },
  "C1": {
   "key": "Let the slot select the derivative (agent noun, uncountable abstract noun or participle adjective) and keep <em>live up to</em> intact, especially in the negative.",
   "body": [
    "These items combine derivation with countability and with false friends. Ask three questions: what part of speech does the frame require; if it is a noun, is it an agent or an abstraction, and is it countable; and is the option genuinely from this family?",
    "<strong>Cater</strong> (verb: supply food for an event; <em>cater to</em> or <em>for</em>: provide for a group's needs) yields <strong>caterer</strong>, the agent noun for a person or firm that supplies food, and <strong>catering</strong>, the activity or industry, often used attributively (<em>catering services</em>). Where the sentence needs the provider rather than the service, only the agent noun fits; <em>catered</em> is merely a verb form.",
    "<strong>Attire</strong> is an uncountable, formal noun; <s>attires</s> does not exist. It is usually premodified: <em>formal</em>, <em>business</em>, <em>ceremonial</em>, <em>modest attire</em>. <strong>Attired</strong> is a participial adjective (<em>elegantly attired</em>), which cannot head a noun phrase.",
    "<strong>Live up to</strong> takes objects that encode a standard: <em>a reputation</em>, <em>expectations</em>, <em>the hype</em>, <em>a name</em>. Negated (<em>fail to</em> or <em>didn't live up to</em>), it expresses disappointment: reality fell short of the standard. Its antonym is <em>surpass</em> or <em>exceed expectations</em>.",
    "<strong>Ambivalent</strong> gives <strong>ambivalence</strong> (noun: coexisting contradictory feelings) and <strong>ambivalently</strong>. A possessive determiner requires the noun. The false friend <em>ambiguity</em> (and <em>ambiguous</em>) concerns meaning that can be read more than one way, not emotion.",
    "<strong>Courteous</strong> gives <strong>courtesy</strong> (noun: politeness, considerate behaviour) and <strong>courteously</strong>. After a preposition such as <em>with</em>, the noun is required. <em>Courtesy</em> also appears attributively for a free service (<em>a courtesy shuttle</em>)."
   ],
   "examples": [
    {
     "s": "<b>caterer</b> (noun)",
     "g": "The embassy engaged a halal <b>caterer</b> for its reception at the Siam Kempinski."
    },
    {
     "s": "<b>attire</b> (noun)",
     "g": "The dress code calls for business <b>attire</b>; jackets are available at reception."
    },
    {
     "s": "<b>live up to</b> (phrasal verb)",
     "g": "The much-hyped glamping site failed to <b>live up to</b> its glossy brochure."
    },
    {
     "s": "<b>ambivalence</b> (noun)",
     "g": "Her <b>ambivalence</b> towards influencer culture shows in every post she writes."
    },
    {
     "s": "<b>courtesy</b> (noun)",
     "g": "Reviewers praise the concierge for her unfailing <b>courtesy</b>, even at three in the morning"
    }
   ]
  }
 },
 "u6w3s1": {
  "B1": {
   "key": "In ads and reviews, find the clue in the sentence, then choose the word whose meaning matches it, not just a word about hotels.",
   "body": [
    "In these questions, all four options are words from Unit 6. They all sound like hotel words, so the topic does not help. Do this: first, find the <strong>clue</strong> in the sentence (a list, a price, a feeling, a reaction). Next, say in your own words what the gap means. Then choose the word with that meaning.",
    "<strong>Hospitality</strong> has two meanings. One is a warm welcome for guests. The other is the <strong>industry</strong> (business area) of hotels, restaurants and tourism. We say <em>work in hospitality</em> and <em>the hospitality industry</em>. A hotel receptionist or a restaurant chef works in hospitality. It is the only word in this unit that names an industry. <em>The gig economy</em> is different: it is a way of working, with many short jobs for different clients, not a long-term job with one employer.",
    "<strong>Amenities</strong> are useful facilities. Ads often say <em>basic amenities</em> (the simple things everybody needs) or <em>modern amenities</em>. A list of useful things in a room or building is your clue.",
    "<strong>Complimentary</strong> in an ad means <strong>free</strong>: it is included in the price, with no extra charge. Words like ‘included’, ‘at no cost’ or ‘free of charge’ are clues.",
    "<strong>Nostalgic</strong> is a warm feeling about the past. Old things, like old photos, old songs or a retro shop, make people feel nostalgic.",
    "<strong>Sarcastic</strong> is a way of speaking. The speaker says something nice, but the situation is bad, so she means the opposite. Ask: does the situation match the words? If not, the remark is sarcastic. The words sound like praise, but the real meaning is mocking. So it is not a polite or praising remark at all.",
    "Finally, look at the grammar of the gap. After <em>feel</em> or <em>is</em>, you need an adjective. After <em>the</em>, or after an adjective like <em>modern</em>, you need a noun. This can remove one or two options fast."
   ],
   "examples": [
    {
     "s": "<b>hospitality</b> (noun)",
     "g": "Praew studied tourism because she wants a career in <b>hospitality</b>."
    },
    {
     "s": "<b>amenities</b> (noun)",
     "g": "The resort's modern <b>amenities</b> include a gym, a laundry and a kids' pool."
    },
    {
     "s": "<b>complimentary</b> (adjective)",
     "g": "Parking is <b>complimentary</b> for hotel guests; visitors pay 50 baht an hour."
    },
    {
     "s": "<b>nostalgic</b> (adjective)",
     "g": "Seeing her old school uniform, Ploy's mother became quite <b>nostalgic</b>."
    },
    {
     "s": "<b>sarcastic</b> (adjective)",
     "g": "After waiting an hour for room service, Mint wrote a <b>sarcastic</b> review: ‘Lightning-fast service!’"
    }
   ]
  },
  "B2": {
   "key": "In ads and reviews every option is a Unit 6 word, so decide what the gap means from the clue, then match it to the exact sense of one word.",
   "body": [
    "In context questions the distractors are other words from the same unit, so they all fit the topic. The method is to find the clue (examples, a price, a reaction, a contrast between words and situation), paraphrase the missing idea, and only then look at the options. Grammar helps too: a noun after a determiner, an adjective after <em>feel</em> or <em>be</em>.",
    "<strong>Hospitality</strong> means both a warm welcome and the <strong>industry</strong> of hotels, restaurants and tourism: <em>work in hospitality</em>, <em>a hospitality degree</em>, <em>the hospitality sector</em>. Careers such as hotel reception or restaurant management belong here. No other unit word names an industry; <em>the gig economy</em> is a way of working (short freelance jobs for many clients), not a sector, and it does not describe a long-term post with one employer.",
    "<strong>Amenities</strong> are the useful facilities a place provides; ads use <em>basic</em>, <em>modern</em> or <em>on-site amenities</em>, followed by a list.",
    "<strong>Complimentary</strong> in an ad means <strong>free</strong>, included in the price. Clues include ‘at no extra cost’ and ‘included’.",
    "<strong>Nostalgic</strong> is the warm feeling that old things trigger: vintage décor, old songs, retro snacks. It is a feeling, so it follows <em>feel</em> or <em>make somebody feel</em>.",
    "<strong>Sarcastic</strong> describes speech: a remark that praises a situation that is obviously bad, so the speaker means the opposite. The test is a mismatch between the words and the facts. Read literally, the remark sounds like praise, but the speaker is mocking, not praising or being polite."
   ],
   "examples": [
    {
     "s": "<b>hospitality</b> (noun)",
     "g": "After her internship at a Phuket hotel, Fern decided to build a career in <b>hospitality</b>."
    },
    {
     "s": "<b>amenities</b> (noun)",
     "g": "On-site <b>amenities</b> at the hostel include lockers, a shared kitchen and a washing machine."
    },
    {
     "s": "<b>complimentary</b> (adjective)",
     "g": "Guests receive a <b>complimentary</b> boat ticket to the island at no extra cost."
    },
    {
     "s": "<b>nostalgic</b> (adjective)",
     "g": "Fern's grandmother grew <b>nostalgic</b> as she walked through the restored 1960s cinema."
    },
    {
     "s": "<b>sarcastic</b> (adjective)",
     "g": "When the air conditioning failed in April, Ice's <b>sarcastic</b> review praised the room's ‘natural sauna’."
    }
   ]
  },
  "C1": {
   "key": "When every option belongs to the same lexical field, the decision rests on the clue in the sentence and on each word's exact sense, part of speech and typical frame.",
   "body": [
    "Context items deliberately offer four words from the same unit, so topical relevance cannot decide. Isolate the clue (an enumeration, a price phrase, an emotional trigger, or a mismatch between what is said and what is happening), paraphrase the gap, then test each option against both meaning and syntax.",
    "<strong>Hospitality</strong> has a second, institutional sense: the <strong>industry</strong> of hotels, restaurants and tourism, as in <em>work in hospitality</em> or <em>the hospitality sector</em>. It is the only unit word that names a field of employment; <em>the gig economy</em> names a mode of work (short-term freelance assignments for multiple clients), which is incompatible with a stable post with one employer.",
    "<strong>Amenities</strong> are facilities, typically premodified (<em>basic</em>, <em>modern</em>, <em>on-site</em>) and followed by an enumeration of practical features.",
    "<strong>Complimentary</strong>, in commercial copy, means <strong>free of charge</strong>; paraphrases such as ‘at no extra cost’ or ‘included’ are the signal.",
    "<strong>Nostalgic</strong> describes the bittersweet feeling evoked by reminders of the past, so it pairs with emotional frames (<em>feel</em>, <em>make somebody feel</em>) and with triggers like vintage objects.",
    "<strong>Sarcastic</strong> describes verbal irony: overtly positive words about an obviously negative situation, used to mock. Read literally, such a remark looks like praise; the intended meaning is the reverse, so it is neither genuinely praising nor polite."
   ],
   "examples": [
    {
     "s": "<b>hospitality</b> (noun)",
     "g": "Thailand's <b>hospitality</b> sector employs millions, from street-food vendors to five-star concierges."
    },
    {
     "s": "<b>amenities</b> (noun)",
     "g": "Despite its budget price, the capsule hotel offers modern <b>amenities</b>, including USB sockets and blackout blinds."
    },
    {
     "s": "<b>complimentary</b> (adjective)",
     "g": "A <b>complimentary</b> afternoon tea is included for guests on the club floor."
    },
    {
     "s": "<b>nostalgic</b> (adjective)",
     "g": "Hearing the jingle of the old ice-cream cart, many thirty-somethings turn instantly <b>nostalgic</b>."
    },
    {
     "s": "<b>sarcastic</b> (adjective)",
     "g": "Her <b>sarcastic</b> five-star review thanked the hotel for ‘the authentic experience of cold showers’."
    }
   ]
  }
 },
 "u6w3s2": {
  "B1": {
   "key": "In travel texts, use the clue to decide the idea, then choose: doubt, culture from the past, polite rules, short app jobs, or made for one customer.",
   "body": [
    "All four options in these questions are Unit 6 words. So find the clue first, and say the missing idea in simple words. Then match the idea to one word.",
    "<strong>Skeptical</strong> (British English: <em>sceptical</em>) means doubting. Reviewers and customers are often skeptical <em>about</em> a <strong>claim</strong> (something a company says about itself). Look for evidence that goes <strong>against</strong> the claim. For example, a hotel says it has ‘super-fast Wi-Fi’, but guests cannot even open their email. Then people doubt the claim; they do not praise it.",
    "<strong>The gig economy</strong> is work made of many short jobs for <strong>different</strong> clients, often found through apps, instead of a long-term job with one company. It is a way of working, not an industry.",
    "<strong>Heritage</strong> is culture and buildings from the past. We <strong>preserve</strong> (keep safe) and <strong>restore</strong> (repair) heritage, because it is precious and cannot be replaced. Old palaces, markets, crafts and wooden houses can all be part of a town's heritage.",
    "<strong>Etiquette</strong> is the <strong>rules of polite behaviour</strong>: how to greet people, where to stand, what to do with your hands. Guidebooks often explain a country's etiquette before you visit. Be careful with <em>attire</em>. Attire is clothes. If the examples are about how people <strong>act</strong>, the word is etiquette, not attire.",
    "<strong>Bespoke</strong> means made specially for one customer. So every bespoke item is <strong>one of a kind</strong> (unique).",
    "Notices and reviews often use the passive with these words: <em>The old market <strong>is being restored</strong> as part of the town's heritage</em>. <em>Each cake <strong>is made</strong> to order</em>."
   ],
   "examples": [
    {
     "s": "<b>skeptical</b> (adjective)",
     "g": "Ploy was <b>skeptical</b> about the resort's ‘private beach’, because the photos showed crowds."
    },
    {
     "s": "<b>gig economy</b> (noun phrase)",
     "g": "In the <b>gig economy</b>, a rider may work for three delivery apps in one evening."
    },
    {
     "s": "<b>heritage</b> (noun)",
     "g": "Old wooden houses in Chanthaburi are being restored as part of the town's <b>heritage</b>."
    },
    {
     "s": "<b>etiquette</b> (noun)",
     "g": "In Thai dining <b>etiquette</b>, you use your fork to push food onto your spoon."
    },
    {
     "s": "<b>bespoke</b> (adjective)",
     "g": "The shop sells <b>bespoke</b> sandals: each pair is made for one customer's feet."
    }
   ]
  },
  "B2": {
   "key": "In travel and work texts, paraphrase the gap from the clue (doubt, inherited culture, behaviour rules, app-based work, made to order), then match it to one exact sense.",
   "body": [
    "The four options always come from the unit, so check the clue rather than the topic. Decide whether the gap is about an attitude, a kind of work, the past, behaviour or how something is made.",
    "<strong>Skeptical</strong> (British <em>sceptical</em>) <em>about</em> a <strong>claim</strong>: the typical context is a review or report in which the evidence contradicts what a company says, for example a ‘family-friendly’ resort with no lifeguard and no children's menu. That contradiction makes doubt the logical reaction, not praise.",
    "<strong>The gig economy</strong> describes work divided into short tasks for <strong>many different clients or platforms</strong> rather than a long-term contract with a single company. It is a way of working, not an industry.",
    "<strong>Heritage</strong> is the culture, buildings and customs <strong>passed down</strong> from the past; it is something we <em>preserve</em> or <em>restore</em> because it cannot be replaced. Historic buildings, crafts and festivals all belong to a place's heritage.",
    "<strong>Etiquette</strong> is about <strong>behaviour</strong>: greetings, gestures, where to stand, when to stay quiet. Guidebooks often explain local etiquette to visitors. The near-miss is <em>attire</em>, which is about clothes only; if the examples describe actions rather than clothing, choose etiquette.",
    "<strong>Bespoke</strong> means made to order for one customer, so each item is <strong>unique</strong>. In notices and ads these words often appear with passives: <em>is preserved as heritage</em>, <em>is made to order</em>, <em>is considered a breach of etiquette</em>."
   ],
   "examples": [
    {
     "s": "<b>skeptical</b> (adjective)",
     "g": "Mint stayed <b>skeptical</b> of the ‘quiet location’ in the advert: the map showed a nightclub next door."
    },
    {
     "s": "<b>gig economy</b> (noun phrase)",
     "g": "The <b>gig economy</b> gives students flexible ways to earn money around their classes."
    },
    {
     "s": "<b>heritage</b> (noun)",
     "g": "Lampang's horse carriages are preserved as part of the city's <b>heritage</b>."
    },
    {
     "s": "<b>etiquette</b> (noun)",
     "g": "The hotel welcome pack includes a short guide to local <b>etiquette</b>, such as how to wai."
    },
    {
     "s": "<b>bespoke</b> (adjective)",
     "g": "Every invitation from the stationery studio is <b>bespoke</b>, designed around the couple's story."
    }
   ]
  },
  "C1": {
   "key": "Same-field distractors are defeated by the logic of the clue: contradiction signals doubt, multiple platforms signal gig work, preservation signals heritage, conduct signals etiquette, uniqueness signals bespoke.",
   "body": [
    "Every option is topically plausible, so the decision depends on the logical relationship the sentence sets up. Identify it first: a contradiction, a contrast between one employer and many, a duty to preserve, a list of behaviours, a claim of uniqueness.",
    "<strong>Skeptical</strong> (British <em>sceptical</em>) <em>about</em> or <em>of</em> a <strong>claim</strong>: when the evidence a sentence supplies undermines a stated claim (a ‘luxury’ label alongside peeling paint and broken lifts), doubt is the only coherent reaction; praise would contradict the evidence.",
    "<strong>The gig economy</strong> is defined by fragmentation: short assignments for <strong>multiple clients or platforms</strong> instead of a single employer. It names a mode of employment that cuts across industries, not an industry in itself.",
    "<strong>Heritage</strong> is inheritance from the past and therefore the natural object of verbs of conservation such as <em>preserve</em>, <em>restore</em> and <em>safeguard</em>. Monuments, crafts and rituals belong to it; practical facilities do not.",
    "<strong>Etiquette</strong> governs <strong>conduct</strong>: greetings, gestures, posture, how one addresses a monk. Its closest distractor is <em>attire</em>, since dress codes and etiquette often appear together; but attire covers only clothing.",
    "<strong>Bespoke</strong> implies individual commissioning, so uniqueness is its logical consequence. Note the passive frames these words favour in notices and reviews: <em>is preserved as part of our heritage</em>, <em>is considered a breach of etiquette</em>, <em>are made to order</em>."
   ],
   "examples": [
    {
     "s": "<b>skeptical</b> (adjective)",
     "g": "Guests grew <b>skeptical</b> of the resort's ‘organic farm-to-table’ menu after spotting supermarket bags in the kitchen."
    },
    {
     "s": "<b>gig economy</b> (noun phrase)",
     "g": "Critics warn that the <b>gig economy</b> shifts risk from companies to individual workers."
    },
    {
     "s": "<b>heritage</b> (noun)",
     "g": "Conservationists argue that Bangkok's shophouses must be safeguarded as living <b>heritage</b>."
    },
    {
     "s": "<b>etiquette</b> (noun)",
     "g": "At Doi Suthep, <b>etiquette</b> requires visitors to remove their shoes and keep their voices low."
    },
    {
     "s": "<b>bespoke</b> (adjective)",
     "g": "The atelier's <b>bespoke</b> silk scarves are hand-painted, so each design exists only once."
    }
   ]
  }
 },
 "u6w3s3": {
  "B1": {
   "key": "In notices and reviews, check the clue and the object: <em>cater to</em> a group, <em>live up to</em> expectations, and choose the right feeling, behaviour or clothing word.",
   "body": [
    "In these questions, some options are <strong>phrasal verbs</strong> (verbs with small words like <em>to</em>, <em>up</em>, <em>with</em>). To choose, look at the <strong>object</strong>: the words after the gap. Is it a group of people? Or is it a reputation or an expectation?",
    "<strong>Cater to</strong> means to give a group what it needs or wants. Its object is a <strong>group of people</strong>: <em>cater to students</em>, <em>cater to older guests</em>. The clue is often a list of special things for that group, like a menu or special rooms.",
    "<strong>Live up to</strong> means to be as good as people expected. Its object is a <strong>standard</strong>: a reputation, people's expectations, the hype, or the promises in an advert. <em>Didn't live up to</em> means it was worse than people hoped. Other phrasal verbs with <em>up</em> look similar but mean something quite different, so check the meaning and the object, not just the shape.",
    "<strong>Ambivalent</strong> means having two <strong>opposite</strong> feelings at once. For example, people like one part of something and dislike another part, at the same time. Do not confuse it with <em>skeptical</em>. Skeptical means doubting that a claim is true. That is one attitude, not two feelings.",
    "<strong>Courteous</strong> means polite and respectful. It describes how somebody <strong>behaves</strong> towards other people, and we notice it most when a customer is rude or difficult.",
    "<strong>Attire</strong> means clothes. Invitations and notices give a <strong>dress code</strong> (rules about clothes): <em>formal attire</em>, <em>business attire</em>, <em>casual attire</em>. They often say <em>is required</em>. Attire is about what people wear. <em>Etiquette</em> is about how they behave, so do not mix them up."
   ],
   "examples": [
    {
     "s": "<b>cater to</b> (phrasal verb)",
     "g": "The new co-working café <b>caters to</b> students, with long tables and cheap iced coffee."
    },
    {
     "s": "<b>live up to</b> (phrasal verb)",
     "g": "The ‘secret beach’ did not <b>live up to</b> the hype: it was full of rubbish."
    },
    {
     "s": "<b>ambivalent</b> (adjective)",
     "g": "Nan felt <b>ambivalent</b> on the last day of the school trip, happy to go home and sad to say goodbye."
    },
    {
     "s": "<b>courteous</b> (adjective)",
     "g": "The guide answered every complaint about the heat in a <b>courteous</b> way."
    },
    {
     "s": "<b>attire</b> (noun)",
     "g": "The rooftop bar has a dress code: casual <b>attire</b> is fine, but no swimwear."
    }
   ]
  },
  "B2": {
   "key": "In notices and reviews, match each phrasal verb to its typical object and each adjective to its clue: a group, a standard, two opposite feelings, polite patience, a dress code.",
   "body": [
    "When the options are phrasal verbs, the deciding factor is usually the <strong>object</strong> and the subject. When they are adjectives or nouns from the unit, it is the clue: a contrast, a description of behaviour, or a rule about clothes.",
    "<strong>Cater to</strong> takes a <strong>group of people</strong> as its object: <em>cater to families</em>, <em>to business travellers</em>, <em>to vegetarians</em>. The clue is a list of features chosen for that group. In notices it often follows <em>aim to</em>: <em>We aim to cater to every guest</em>.",
    "<strong>Live up to</strong> takes a <strong>standard</strong> as its object: <em>a reputation</em>, <em>expectations</em>, <em>the hype</em>, <em>an advert's promises</em>. <em>Didn't live up to</em> means the reality was worse. Phrasal verbs that look similar have different meanings and different objects, so check both, not the shape.",
    "<strong>Ambivalent</strong> means having <strong>mixed</strong> or <strong>opposite feelings</strong> at the same time: one positive and one negative reaction to the same thing. Do not confuse it with <em>skeptical</em>, which means doubting whether a claim is true: one attitude, not two feelings.",
    "<strong>Courteous</strong> describes polite, respectful behaviour, most noticeable when a customer is difficult. It describes behaviour, not an inner feeling.",
    "<strong>Attire</strong> belongs to <strong>dress codes</strong> on invitations and signs: <em>formal</em>, <em>business</em> or <em>casual attire</em>, often with <em>is required</em> or <em>is expected</em>. Keep it apart from <em>etiquette</em>, which concerns behaviour, not clothing."
   ],
   "examples": [
    {
     "s": "<b>cater to</b> (phrasal verb)",
     "g": "The hostel now <b>caters to</b> digital nomads, with desks and fast internet in every room."
    },
    {
     "s": "<b>live up to</b> (phrasal verb)",
     "g": "The sunset cruise failed to <b>live up to</b> its glowing online reviews."
    },
    {
     "s": "<b>ambivalent</b> (adjective)",
     "g": "Ice's <b>ambivalent</b> reply showed that she both wanted the internship and dreaded the long commute."
    },
    {
     "s": "<b>courteous</b> (adjective)",
     "g": "Reviewers praised the <b>courteous</b> staff at the check-in desk."
    },
    {
     "s": "<b>attire</b> (noun)",
     "g": "Business <b>attire</b> is expected at the conference dinner."
    }
   ]
  },
  "C1": {
   "key": "Phrasal verbs are resolved by their argument structure, and attitude, conduct and dress words by the clue; in notices, expect them inside passive frames.",
   "body": [
    "With phrasal-verb options, check argument structure: what kind of subject and object each verb accepts. With the adjectives and nouns, identify whether the sentence describes an attitude, a pattern of conduct or a dress requirement.",
    "<strong>Cater to</strong> requires a <strong>human target group</strong> as its object (<em>cater to young professionals</em>), and in venue descriptions it often follows purpose frames such as <em>aims to</em> or <em>sets out to</em>. The clue is provision tailored to that group.",
    "<strong>Live up to</strong> requires a <strong>standard</strong> as its object: a reputation, expectations, the hype, a brand's promises. Its negation expresses disappointment. Look-alike phrasal verbs with <em>up</em> differ in both meaning and argument structure, so test the object, not the form.",
    "<strong>Ambivalent</strong> denotes <strong>coexisting contradictory feelings</strong>, so a sentence that sets a positive reaction against a negative one is its natural setting. Keep it apart from <em>skeptical</em>, which denotes doubt about the truth of a claim, a single epistemic stance rather than divided emotion.",
    "<strong>Courteous</strong> describes deliberate politeness, a quality of conduct rather than an inner state, most tested by a rude interlocutor.",
    "<strong>Attire</strong> is the register-appropriate noun for <strong>dress codes</strong>: <em>formal</em>, <em>business</em>, <em>casual</em>, <em>ceremonial attire</em>, usually inside a passive notice frame (<em>is required</em>, <em>is expected</em>, <em>is not permitted</em>). Where a requirement concerns clothing rather than conduct, the word is attire, not <em>etiquette</em>."
   ],
   "examples": [
    {
     "s": "<b>cater to</b> (phrasal verb)",
     "g": "The Sukhumvit food hall now <b>caters to</b> office workers on a thirty-minute lunch break."
    },
    {
     "s": "<b>live up to</b> (phrasal verb)",
     "g": "The boutique hotel's spa did not <b>live up to</b> the promise of ‘total tranquillity’; drilling began at eight."
    },
    {
     "s": "<b>ambivalent</b> (adjective)",
     "g": "Many teachers hold an <b>ambivalent</b> view of AI chatbots, grateful for the time saved yet wary of what students lose."
    },
    {
     "s": "<b>courteous</b> (adjective)",
     "g": "The airline's <b>courteous</b> handling of refund requests won it many loyal customers."
    },
    {
     "s": "<b>attire</b> (noun)",
     "g": "Ceremonial <b>attire</b> is required for all speakers at the graduation."
    }
   ]
  }
 }
};
