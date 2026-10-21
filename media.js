/* ===========================================================================
   ENGLISH 4 MISSION CONTROL — media.js
   Podcast, video and slide links per stage. Loaded after the unit files and
   before content-export.js. A FIELD LEFT EMPTY MEANS NO BUTTON, so episodes
   can be added one at a time as Chris exports them from NotebookLM and
   uploads the videos to YouTube.

   Stage ids:  u5g  Unit 5 Grammar Ladder   u5w  Unit 5 Words in Action
               u6g  Unit 6 Grammar Ladder   u6w  Unit 6 Words in Action
               u7g / u7w / u8g / u8w        Phase 2

   podcast: a relative MP3 path (audio/u5-5a.mp3). The Grammar Ladder of a
   unit has three grammar episodes (5a, 5b, 5c) — put the first one here and
   the others in `more` so the Podcasts page lists them all.
   video:   any YouTube link (youtu.be/…, watch?v=…, /embed/…).
   slides:  a URL that serves a PDF directly (slides/E4-L02.pdf).
   =========================================================================== */
var MEDIA = {
  u5g: { title: 'Unit 5 · The passive in flood news', podcast: '', slides: '', video: '',
         more: [ { title: '5a Passive tenses and the agent', podcast: '', video: '' },
                 { title: '5b Modal passive, infinitives and gerunds', podcast: '', video: '' },
                 { title: '5c Reduced relatives and the impersonal passive', podcast: '', video: '' } ] },
  u5w: { title: 'Unit 5 · Fifteen flood words (5v)', podcast: '', slides: '', video: '' },
  u6g: { title: 'Unit 6 · Causatives and verb patterns', podcast: '', slides: '', video: '',
         more: [ { title: '6a Plain passive vs causative', podcast: '', video: '' },
                 { title: '6b have sb do / be made to / need doing', podcast: '', video: '' },
                 { title: '6c Object verb patterns and tone', podcast: '', video: '' } ] },
  u6w: { title: 'Unit 6 · Fifteen hospitality words (6v)', podcast: '', slides: '', video: '' }
};
var MEDIA_MINUTES = {};
