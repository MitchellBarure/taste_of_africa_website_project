const FAVORITES_KEY = "favoriteRecipes";
const THEME_KEY = "theme";
const MAX_SERVINGS = 20;

// Light or dark theme: saved choice first, otherwise the device's own setting
function setupThemeToggle() {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    button.setAttribute("aria-pressed", String(theme === "dark"));
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  button.addEventListener("click", () => {
    const newTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
}

// Mobile menu: the CSS shows the links when aria-expanded is "true"
function setupMenu() {
  const button = document.querySelector(".menu-button");
  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
  });
}

// Featured dishes carousel on the home page (no autoplay)
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

// Recipe filter: shows only the cards whose data-region matches the pressed button
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

// Saved favourites are stored as a list of recipe IDs in localStorage
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

// Favourite buttons: restore saved favourites on load and save each click
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

// Shows an amount as a kitchen fraction, rounded to the nearest quarter (1.25 becomes "1¼")
function formatAmount(value) {
  const quarters = Math.max(1, Math.round(value * 4));
  const whole = Math.floor(quarters / 4);
  const fraction = ["", "¼", "½", "¾"][quarters % 4];
  return whole === 0 ? fraction : `${whole}${fraction}`;
}

// Ingredient scaler: recalculates every amount for the chosen number of servings
function setupIngredientScaler() {
  const section = document.querySelector(".ingredients[data-servings]");
  if (!section) return;

  const baseServings = Number(section.dataset.servings);
  const amounts = section.querySelectorAll(".amount");
  const count = section.querySelector(".servings-count");
  let servings = baseServings;

  function update() {
    count.textContent = servings;

    amounts.forEach((amount) => {
      const scaled = (Number(amount.dataset.amount) * servings) / baseServings;
      amount.textContent = formatAmount(scaled);
    });
  }

  section.querySelector(".servings-less").addEventListener("click", () => {
    servings = Math.max(1, servings - 1);
    update();
  });

  section.querySelector(".servings-more").addEventListener("click", () => {
    servings = Math.min(MAX_SERVINGS, servings + 1);
    update();
  });

  update();
}

// Contact form: message must be over 20 characters, then thank the visitor by name
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

// Footer newsletter: swap the email field for a thank-you message instead of reloading
function setupNewsletter() {
  const form = document.querySelector(".newsletter");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const thanks = document.createElement("p");
    thanks.className = "newsletter-thanks";
    thanks.setAttribute("role", "status");
    thanks.textContent = "Thanks for signing up! New recipes are on their way to your inbox.";

    form.querySelectorAll("label, input, button").forEach((field) => field.classList.add("hidden"));
    form.append(thanks);
  });
}

setupThemeToggle();
setupMenu();
setupCarousel();
setupRecipeFilter();
setupFavorites();
setupIngredientScaler();
setupContactForm();
setupNewsletter();
