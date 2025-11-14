// theme coloors
const toggle = document.getElementById("theme-toggle");
const icon = toggle.querySelector("i");

toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});

// мобильное меню
const burger = document.getElementById('burger');
const mobile = document.getElementById('mobile');
burger?.addEventListener('click', () => {
  mobile.style.display = mobile.style.display === 'block' ? 'none' : 'block';
});

// плавный скролл + закрытие меню
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      if (getComputedStyle(mobile).display === 'block') mobile.style.display = 'none';
    }
  });
});



const cards = document.querySelectorAll('.card');
let current = 0;

function showCard(index, direction) {
  if (index === current) return;

  const outClass = direction === 'left' ? 'slide-out-right' : 'slide-out-left';
  const inClass = direction === 'left' ? 'slide-in-left' : 'slide-in-right';

  const currentCard = cards[current];   
  const nextCard = cards[index];

  currentCard.classList.remove('active');
  currentCard.classList.add(outClass);

  nextCard.classList.remove('hidden');
  nextCard.classList.add(inClass);

  setTimeout(() => {
    currentCard.classList.add('hidden');
    currentCard.classList.remove(outClass);

    nextCard.classList.remove(inClass);
    nextCard.classList.add('active');

    current = index;
  }, 400);
}

function nextCard() {
  const next = (current + 1) % cards.length;
  showCard(next, 'right');
}

function prevCard() {
  const prev = (current - 1 + cards.length) % cards.length;
  showCard(prev, 'left');
}

// Swipe support
const slider = document.getElementById('card-slider');
let startX = 0;

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) {
    prevCard();
  } else if (diff < -50) {
    nextCard();
  }
});

// input phone
const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
  initialCountry: "uz", // default Uzbekistan
  preferredCountries: ["uz", "ru", "us", "kz", "kg"], // tepadagilar chiqadi
  separateDialCode: true, // +998 alohida ko‘rinadi
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});








// 




const managment_cardGrid = document.getElementById("managment_cardGrid");
const managment_addCardBtn = document.getElementById("managment_addCardBtn");

let managment_cardCount = 1;

function managment_createCard() {
  const card = document.createElement("div");
  card.classList.add("managment_card");

  const img = document.createElement("img");
  img.src = `https://source.unsplash.com/400x300/?technology,design&sig=${Math.random()}`;
  img.alt = "Card Image";

  const text = document.createElement("div");
  text.classList.add("managment_text");
  text.textContent = `Card ${managment_cardCount++}`;

  card.appendChild(img);
  card.appendChild(text);
  managment_cardGrid.appendChild(card);
}

// Dastlab 4 ta kartochka
for (let i = 0; i < 4; i++) {
  managment_createCard();
}

managment_addCardBtn.addEventListener("click", managment_createCard);










// 

