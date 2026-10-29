/* English 4 Mission Control — tts-clean.js
   speechText(raw) turns a lesson's on-screen text (HTML) into what Sonia reads aloud:
   tags stripped, a struck-out wrong form <s>X</s> read as "X, wrong", symbols spoken as words.
   Shared by the app (window.speechText) and tools/lesson-tts-list.js (module.exports), so the
   recording key ttsKey(ttsNorm(speechText(raw))) is the same on both sides.
   Change it, then re-record: python tools/make-lesson-audio.py --prune */
(function (root) {
  function decode(s) {
    return s.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, "&");
  }
  function speechText(raw) {
    var s = String(raw == null ? "" : raw);
    s = s.replace(/<s>([\s\S]*?)<\/s>/g, " $1, wrong, ")                         // struck-out wrong form
      .replace(/<br\s*\/?>/gi, ". ").replace(/<[^>]+>/g, "");                    // tags
    s = decode(s);
    s = s.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{2713}\u{2717}\u{2605}]/gu, "")
      .replace(/\be\.g\.,?/gi, "for example").replace(/\bi\.e\.,?/gi, "that is").replace(/\betc\./gi, "and so on")
      .replace(/\bsb\b/g, "somebody").replace(/\bsth\b/g, "something")
      .replace(/\bBrE\b/g, "British English").replace(/\bAmE\b/g, "American English")
      .replace(/\bpp\.\s?(\d+)\s?[–-]\s?(\d+)/g, "pages $1 to $2").replace(/\bp\.\s?(\d+)/g, "page $1")
      .replace(/(\d)\s*[–-]\s*(\d)/g, "$1 to $2")                               // 6–10 → 6 to 10
      .replace(/°C/g, " degrees")
      .replace(/\s*→\s*/g, " becomes ").replace(/\s*[·•]\s*/g, ", ")
      .replace(/([A-Za-z])\/([A-Za-z])/g, "$1 or $2").replace(/\s+\/\s+/g, " or ")
      .replace(/\s*&\s*/g, " and ").replace(/≠/g, " is not ")
      .replace(/_{2,}/g, " blank ").replace(/\s*=\s*/g, " means ").replace(/\s+\+\s+/g, " plus ")
      .replace(/\s…\s/g, " to ").replace(/…|\.\.\./g, "")
      .replace(/\s*[—–]\s*/g, ", ")
      .replace(/[“”"]/g, "").replace(/[‘’]/g, "'")
      .replace(/\(\s*\)/g, "").replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?)])/g, "$1").replace(/([,;:])(?:\s*[,;:])+/g, "$1")
      .replace(/,\s*\./g, ".").replace(/^[\s,;:]+/, "").trim();
    return s;
  }
  function ttsNorm(s) { return String(s || "").replace(/\s+/g, " ").trim(); }
  function ttsKey(s) { s = ttsNorm(s); var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return ("0000000" + h.toString(16)).slice(-8); }
  root.speechText = speechText; root.ttsNorm = ttsNorm; root.ttsKey = ttsKey;
  if (typeof module !== "undefined" && module.exports) module.exports = { speechText: speechText, ttsNorm: ttsNorm, ttsKey: ttsKey };
})(typeof window !== "undefined" ? window : globalThis);
