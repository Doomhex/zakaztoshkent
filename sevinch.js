// Rasmlar ro'yxati (t ta rasm). O'zingizning URL'laringizni kiriting:
const seva_images = [
  "barsimg/sertifikat_gallery1.png",
  "barsimg/sertifikat_gallery2.png",
  "barsimg/sertifikat_gallery3.png",
  "barsimg/sertifikat_gallery4.png"
];
const seva_t = seva_images.length;

// Elementlar
const sevaCard = document.getElementById('seva_card');
const sevaCardImg = document.getElementById('seva_card_img');
const sevaModal = document.getElementById('seva_modal');
const sevaViewImg = document.getElementById('seva_view_img');
const btnNext = document.getElementById('seva_next');
const btnPrev = document.getElementById('seva_prev');
const sideNext = document.getElementById('seva_side_next');
const sidePrev = document.getElementById('seva_side_prev');
const btnClose = document.getElementById('seva_close');
const progWrap = document.getElementById('seva_progress');

// Holat
let seva_index = 0;

// Previewga birinchi rasm
if (sevaCardImg) sevaCardImg.src = seva_images[0];

// Progress barlar
const seva_bars = [];
function seva_buildProgress() {
  if (!progWrap) return;
  progWrap.innerHTML = '';
  for (let i = 0; i < seva_t; i++) {
    const bar = document.createElement('div');
    bar.className = 'seva_bar';
    const fill = document.createElement('span');
    bar.appendChild(fill);
    progWrap.appendChild(bar);
    seva_bars.push(fill);
  }
  seva_updateProgress();
}
function seva_updateProgress() {
  seva_bars.forEach((el, i) => {
    el.style.width = i < seva_index ? '100%' : (i === seva_index ? '35%' : '0%');
  });
}

function seva_show(idx) {
  seva_index = ((idx % seva_t) + seva_t) % seva_t; // wrap
  if (sevaViewImg) sevaViewImg.src = seva_images[seva_index];
  seva_updateProgress();
}

function seva_open() {
  if (!sevaModal) return;
  sevaModal.classList.add('is-open');
  sevaModal.setAttribute('aria-hidden', 'false');
  seva_show(seva_index);
}
function seva_close() {
  if (!sevaModal) return;
  sevaModal.classList.remove('is-open');
  sevaModal.setAttribute('aria-hidden', 'true');
}
function seva_next() { seva_show(seva_index + 1); }
function seva_prev() { seva_show(seva_index - 1); }

// Eventlar
sevaCard && sevaCard.addEventListener('click', seva_open);
btnClose && btnClose.addEventListener('click', seva_close);
btnNext && btnNext.addEventListener('click', seva_next);
btnPrev && btnPrev.addEventListener('click', seva_prev);
sideNext && sideNext.addEventListener('click', seva_next);
sidePrev && sidePrev.addEventListener('click', seva_prev);

// Escape bilan yopish
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') seva_close(); });

// Modal foniga bosganda yopish
sevaModal && sevaModal.addEventListener('click', (e) => { if (e.target === sevaModal) seva_close(); });

// (ixtiyoriy) Avtomatik o'tish uchun quyidagini yoqing:
/*
let seva_timer=null; const seva_interval=3500;
function seva_startAuto(){ seva_stopAuto(); seva_timer=setInterval(seva_next, seva_interval); }
function seva_stopAuto(){ if(seva_timer){ clearInterval(seva_timer); seva_timer=null; } }
sevaModal && sevaModal.addEventListener('mouseenter', seva_stopAuto);
sevaModal && sevaModal.addEventListener('mouseleave', seva_startAuto);
// seva_open() ichida seva_startAuto() chaqiring.
*/

// Dastlab progresslarni yaratamiz
seva_buildProgress();