/* ===========================================================================
   FINE TUNING — content-export.js
   Loaded last. Attaches the media to each stage, then hands the
   assembled curriculum to the engine.
   =========================================================================== */
(function () {
  var media = (typeof MEDIA !== 'undefined') ? MEDIA : {};
  var mins = (typeof MEDIA_MINUTES !== 'undefined') ? MEDIA_MINUTES : {};
  TOPICS.forEach(function (t) {
    var m = media[t.id] || {};
    t.podcast = m.podcast || '';
    t.slides = m.slides || '';
    t.video = m.video || '';
    t.podcastMinutes = mins[t.id] || 0;
  });
})();

window.CONTENT = {
  CEFR: CEFR,
  RANKS: RANKS,
  BADGES: BADGES,
  REMEDIATION: REMEDIATION,
  TOPICS: TOPICS,
  MOCKS: MOCKS
};
