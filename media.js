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
   duration: m:ss shown beside the title; transcript: a plain-text file
   (audio/u5-5a.txt) opened under the player. Both optional.
   =========================================================================== */
var MEDIA = {
  u5g: { title: 'Unit 5 · The passive in flood news', podcast: 'audio/u5-5a.mp3', duration: '5:55', transcript: 'audio/u5-5a.txt', slides: '', video: '',
         more: [ { title: '5a Passive tenses and the agent', podcast: 'audio/u5-5a.mp3', duration: '5:55', transcript: 'audio/u5-5a.txt', video: '' },
                 { title: '5b Modal passive, infinitives and gerunds', podcast: 'audio/u5-5b.mp3', duration: '4:54', transcript: 'audio/u5-5b.txt', video: '' },
                 { title: '5c Reduced relatives and the impersonal passive', podcast: 'audio/u5-5c.mp3', duration: '4:56', transcript: 'audio/u5-5c.txt', video: '' } ] },
  u5w: { title: 'Unit 5 · Fifteen flood words (5v)', podcast: 'audio/u5-5v.mp3', duration: '5:44', transcript: 'audio/u5-5v.txt', slides: '', video: '' },
  u6g: { title: 'Unit 6 · Causatives and verb patterns', podcast: 'audio/u6-6a.mp3', duration: '4:46', transcript: 'audio/u6-6a.txt', slides: '', video: '',
         more: [ { title: '6a Plain passive vs causative', podcast: 'audio/u6-6a.mp3', duration: '4:46', transcript: 'audio/u6-6a.txt', video: '' },
                 { title: '6b have sb do / be made to / need doing', podcast: 'audio/u6-6b.mp3', duration: '6:05', transcript: 'audio/u6-6b.txt', video: '' },
                 { title: '6c Object verb patterns and tone', podcast: 'audio/u6-6c.mp3', duration: '4:15', transcript: 'audio/u6-6c.txt', video: '' } ] },
  u6w: { title: 'Unit 6 · Fifteen hospitality words (6v)', podcast: 'audio/u6-6v.mp3', duration: '4:50', transcript: 'audio/u6-6v.txt', slides: '', video: '' }
};
/* Minutes of listening per stage (all its episodes), rounded. */
var MEDIA_MINUTES = { u5g: 16, u5w: 6, u6g: 15, u6w: 5 };
