// === HAMBURGER MENU ===
const hamburger = document.querySelector('.navbar__hamburger');
const navMenu = document.querySelector('.navbar__nav');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.querySelector('i').classList.toggle('fa-bars');
  hamburger.querySelector('i').classList.toggle('fa-times');
});

// Zavření menu po kliknutí na odkaz (pro mobily)
document.querySelectorAll('.navbar__nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.querySelector('i').classList.remove('fa-times');
      hamburger.querySelector('i').classList.add('fa-bars');
    }
  });
});

// === FAQ TOGGLE ===
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
  });
});

// === COUNTDOWN ===
const countdownEl = document.getElementById("countdown");
const now = new Date();
const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20).getTime();


function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdownEl.innerHTML = "Akce skončila!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// === RESTAURANTS & BARS - FADE-IN ANIMACE PŘI SCROLLU ===
const restaurantItems = document.querySelectorAll('.restaurant-item');

const observerRestaurants = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

restaurantItems.forEach(item => {
  observerRestaurants.observe(item);
});

// === RESTAURANTS & BARS - TOGGLE OTEVÍRACÍ DOBY S TEXTEM ===
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".hours-link");

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const content = link.closest(".restaurant-content");
      const hoursInfo = content.querySelector(".hours-info");

      // Skryj ostatní otevřené sekce a resetuj jejich text
      document.querySelectorAll(".hours-info").forEach(function (el) {
        if (el !== hoursInfo) {
          el.style.display = "none";
          const otherContent = el.closest(".restaurant-content");
          const otherLink = otherContent.querySelector(".hours-link");
          otherLink.textContent = "Zobrazit otevírací dobu";
        }
      });

      // Přepnutí viditelnosti a textu
      if (hoursInfo.style.display === "none" || hoursInfo.style.display === "") {
        hoursInfo.style.display = "block";
        link.textContent = "Skrýt otevírací dobu";
      } else {
        hoursInfo.style.display = "none";
        link.textContent = "Zobrazit otevírací dobu";
      }
    });
  });
});

// === SPORT & ENTERTAINMENT - FADE-IN ANIMACE PŘI SCROLLU ===
const sportCards = document.querySelectorAll('.sport-card');

const observerSports = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

sportCards.forEach(card => {
  observerSports.observe(card);
});

// === REZERVACE - VÝPOČET CENY ===
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
const roomSelect = document.getElementById('pokoj');
const totalPriceDisplay = document.getElementById('total-price');
const nightsDisplay = document.getElementById('nights');

function calculatePrice() {
  const checkinDate = new Date(checkinInput.value);
  const checkoutDate = new Date(checkoutInput.value);
  const selectedRoom = roomSelect.options[roomSelect.selectedIndex];

  if (checkinDate && checkoutDate && checkinDate < checkoutDate) {
    const timeDifference = checkoutDate - checkinDate;
    const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    nightsDisplay.textContent = nights;

    const pricePerNight = parseInt(selectedRoom.getAttribute('data-price')) || 0;
    const totalPrice = pricePerNight * nights;
    totalPriceDisplay.textContent = `${totalPrice.toLocaleString()} Kč`;
  } else {
    nightsDisplay.textContent = '0';
    totalPriceDisplay.textContent = '0 Kč';
  }
}

checkinInput.addEventListener('change', calculatePrice);
checkoutInput.addEventListener('change', calculatePrice);
roomSelect.addEventListener('change', calculatePrice);

// === CAROUSEL ===
const track = document.querySelector('.carousel-track');
const slides = track ? Array.from(track.children) : [];
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
let currentIndex = 0;

if (track && slides.length > 0) {
  const updateCarousel = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const slideMargin = parseFloat(getComputedStyle(slides[0]).marginRight);
    const totalSlideWidth = slideWidth + slideMargin;

    const offset = currentIndex * totalSlideWidth * -1;
    track.style.transform = `translateX(${offset}px)`;

    slides.forEach((slide, index) => {
      slide.classList.toggle('current-slide', index === currentIndex);
      slide.style.opacity = index === currentIndex ? '1' : '0.3';
    });
  };

  slides[0].classList.add('current-slide');
  updateCarousel();

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    updateCarousel();
  });
}

// === SKRYTÍ LÍSTKŮ PO ANIMACI PŘELETU ===
const leaves = document.querySelectorAll('.leaf');

// Skrytí lístků po skončení animace přeletu (2 sekundy + 0.2s zpoždění = 2200 ms)
setTimeout(() => {
  leaves.forEach(leaf => {
    leaf.classList.add('leaf-hidden'); // Používáme třídu leaf-hidden, která má display: none
  });
}, 2200); // 2200 ms = 2 sekundy animace + 0.2s zpoždění