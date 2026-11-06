const FAVORITES_KEY = "favoriteRecipes";

function setupMenu() {
  const button = document.querySelector(".menu-button");
  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
  });
}

function setupCarousel() {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  const dots = document.querySelectorAll(".carousel-dots button");
  const counter = document.querySelector(".carousel-counter");
  let current = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    dots.forEach((dot, i) => {
      if (i === current) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    counter.textContent = `${current + 1} / ${slides.length}`;
  }

  document.querySelector(".carousel-prev").addEventListener("click", () => showSlide(current - 1));
  document.querySelector(".carousel-next").addEventListener("click", () => showSlide(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });
}

function setupRecipeFilter() {
  const buttons = document.querySelectorAll("[data-filter]");
  const recipes = document.querySelectorAll("[data-region]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const region = button.dataset.filter;

      buttons.forEach((otherButton) => {
        otherButton.setAttribute("aria-pressed", String(otherButton === button));
      });

      for (const recipe of recipes) {
        const matches = region === "all" || recipe.dataset.region === region;
        recipe.classList.toggle("hidden", !matches);
      }
    });
  });
}

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function setupFavorites() {
  const buttons = document.querySelectorAll(".favorite-button");
  let favorites = loadFavorites();

  buttons.forEach((button) => {
    const recipeId = button.dataset.recipe;
    button.setAttribute("aria-pressed", String(favorites.includes(recipeId)));

    button.addEventListener("click", () => {
      if (favorites.includes(recipeId)) {
        favorites = favorites.filter((id) => id !== recipeId);
      } else {
        favorites.push(recipeId);
      }

      button.setAttribute("aria-pressed", String(favorites.includes(recipeId)));
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    });
  });
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const message = form.querySelector("#message");
  const error = document.createElement("p");
  error.className = "form-error";
  error.id = "message-error";

  function hasEnoughText() {
    return message.value.trim().length > 20;
  }

  message.addEventListener("input", () => {
    if (hasEnoughText()) {
      error.remove();
      message.removeAttribute("aria-invalid");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!hasEnoughText()) {
      error.textContent = "Please tell us a little more. Your message needs more than 20 characters.";
      message.after(error);
      message.setAttribute("aria-invalid", "true");
      message.setAttribute("aria-describedby", "message-error");
      message.focus();
      return;
    }

    const name = form.querySelector("#name").value.trim();
    const thanks = document.createElement("p");
    thanks.className = "form-success";
    thanks.setAttribute("role", "status");
    thanks.tabIndex = -1;
    thanks.textContent = `Thank you, ${name}! We've received your message.`;

    form.classList.add("hidden");
    form.after(thanks);
    thanks.focus();
  });
}

setupMenu();
setupCarousel();
setupRecipeFilter();
setupFavorites();
setupContactForm();
