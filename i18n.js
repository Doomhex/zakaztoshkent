(function () {
  // Brauzerda oxirgi tanlangan tilni olish (agar bo‘lmasa default = 'ru')
  const DEFAULT = localStorage.getItem('lang') || 'ru';
  let currentLang = DEFAULT;

  // JSON faylni yuklash
  async function loadDict(lang) {
    try {
      const res = await fetch('i18n/' + lang + '.json?v=' + Date.now());
      if (!res.ok) throw new Error('Not found');
      return await res.json();
    } catch (e) {
      console.warn('Translation load error for', lang, e);
      return {};
    }
  }

  // Elementlarga tarjimalarni qo‘llash
  function translatePage(dict) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });
  }

  // Tilni almashtirish funksiyasi
  async function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    const dict = await loadDict(lang);
    translatePage(dict);
  }

  // Global qilib qo‘yamiz → HTML’da onclick orqali chaqirish mumkin bo‘ladi
  window.__setLang = setLang;

  // Sahifa yuklanganda avtomatik tarjima qilinsin
  document.addEventListener('DOMContentLoaded', () => {
    setLang(currentLang);
  });
})();
