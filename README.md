# Taste of Africa

A multi-page website that celebrates African food heritage through recipes, regional food cultures and the stories behind each dish. Built with plain HTML, CSS and JavaScript, with no frameworks or build tools.

## Pages

| Page | File | What it shows |
| --- | --- | --- |
| Home | `index.html` | Hero with an intro video, featured dishes carousel, region map and the latest food trends |
| Recipes | `recipes.html` | All five dishes with a region filter and favourite buttons |
| Recipe pages | `recipes/*.html` | Chisanyama, Splathlo (Kota), Jollof rice, Groundnut soup and Isombe: story, ingredients, step-by-step method, tutorial video, nutrition table and a map of the dish's origin |
| Region pages | `regions/*.html` | Southern, West and East Africa: food culture, staples, cooking techniques, a video and dishes to try |
| About | `about.html` | Mission, founder's story, a short history of African food and a map to AfriNaija in Kigali |
| Contact | `contact.html` | Contact form with JavaScript validation and other ways to get in touch |

## Features

### HTML

- Semantic structure: `header`, `nav`, `main`, `section`, `article`, `figure`, `footer`
- One `h1` per page and no skipped heading levels
- Text, images, lists, tables, embedded YouTube videos, Google Maps and forms
- `<mark>` for key ingredients, spices and cooking methods
- `<details>` and `<summary>` for expandable recipe steps
- Contact form with a `<label>` for every field, a `<select>` and an `<input>` with `<datalist>` suggestions
- Alt text on every image and a `title` on every iframe

### CSS

- Colours, fonts, spacing and borders defined once as custom properties at the top of `css/styles.css`
- Google Fonts: Bagel Fat One for headings and Poppins for body text
- Mobile-first layout with breakpoints at 768px (tablet) and 1024px (desktop)
- Shared rules for cards, top bands and form fields, so styles are not repeated
- Native CSS nesting for hover states, child elements and media queries
- Visible focus states for keyboard users, and a softer glow on form fields
- Reduced motion respected for visitors who ask for it

### JavaScript (`js/script.js`)

- **Mobile menu:** the menu button opens and closes the navigation and updates `aria-expanded`
- **Featured dishes carousel:** previous, next and dot buttons with a live counter, and no autoplay
- **Recipe filter:** region buttons show or hide recipe cards using `data-region` and a `.hidden` class, without reloading the page
- **Favourites:** the heart button saves recipes to `localStorage`, and favourites are restored when the page loads
- **Contact form validation:** stops the default submit, checks that the message is longer than 20 characters, then hides the form and thanks the visitor by name

## Project structure

```
├── index.html
├── recipes.html
├── about.html
├── contact.html
├── recipes/
│   ├── chisanyama.html
│   ├── splathlo.html
│   ├── jollof-rice.html
│   ├── groundnut-soup.html
│   └── isombe.html
├── regions/
│   ├── southern-africa.html
│   ├── west-africa.html
│   └── east-africa.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── images/
    ├── dishes/
    ├── regions/
    └── trends/
```

## How to run it

Open the folder in VS Code and start it with the **Live Server** extension. The YouTube videos need the page to be served over `http://`; opening the HTML file directly shows a YouTube "Error 153" instead of the video.

## Design

| Colour | Hex | Used for |
| --- | --- | --- |
| Tomato | `#D52518` | Red bands and sections |
| Chilli | `#A8190F` | Headings, links and small red text |
| Sunshine | `#FFC926` | Highlights, hover states and headings on dark backgrounds |
| Crisp carrot | `#F96015` | Buttons |
| Forest green | `#18542A` | Footer and region pages |
| Cream | `#F3E8CC` | Page background |
| Card cream | `#FFFBF0` | Cards |
| Ink | `#1E1A16` | Text, borders and shadows |

## Credits

### Images

| File | Source |
| --- | --- |
| `images/hero.jpg` | Generated with Google Gemini |
| `images/dishes/groundnut-soup.jpg`, `splathlo.jpg`, `isombe.jpg` | Generated with Google Gemini |
| `images/dishes/chisanyama.avif` | Unsplash (photo-1508615263227-c5d58c1e5821) |
| `images/dishes/jollof-rice.avif` | Unsplash+ (premium_photo-1694141252774-c937d97641da) |
| `images/family-cooking.avif` | Unsplash (photo-1606787504667-961f789e78e6) |
| `images/trends/fonio.avif` | [Pexels, photo 3233284](https://www.pexels.com/photo/3233284/) |
| `images/trends/suya.avif` | [Pexels, photo 20419328](https://www.pexels.com/photo/20419328/) |
| `images/trends/young-chef.avif` | [Pexels, photo 14621560](https://www.pexels.com/photo/14621560/) |
| `images/logo-icon.svg`, `logo-badge.svg`, `favicon.svg` | Designed for this project |

### Videos

| Page | Video |
| --- | --- |
| Home | [Top 10 Most Famous African Dishes that You Must Try](https://www.youtube.com/watch?v=UY3H5a_Hi3A) by Africa Revealed (Facts) |
| Chisanyama | [How To Braai Meat. Chisanyama](https://www.youtube.com/watch?v=FPsx9wJahVA) by Mzansi Simple Recipes |
| Splathlo | [How To Make Kota~Spatlo~Kasi Food](https://www.youtube.com/watch?v=9SmOhf4TpwE) by Judy_M |
| Jollof rice | [Sweet Jollof Rice Recipe](https://www.youtube.com/watch?v=tuC4WWo60qU) by Kikifoodies |
| Groundnut soup | [How to Make Groundnut Soup](https://www.youtube.com/watch?v=a-yXiT-gf7Q) by Velvety Foodies |
| Isombe | [How To Cook Cassava Leaves (Sombe)](https://www.youtube.com/watch?v=LCwueWa3LsQ) by Just Libby |

### Written sources

- [Shisa nyama: the vibe, the food, the spirit](https://www.southafrica.net/gl/en/travel/article/shisa-nyama-the-vibe-the-food-the-spirit), South African Tourism
- [Shisa Nyama recipe](http://rhodesquality.com/recipes/shisa-nyama/), Rhodes Quality
- [Spatlo or Kota: stuffed bread of South Africa](https://www.sandwichtribunal.com/2022/08/spatlo-or-kota-stuffed-bread-of-south-africa/), Sandwich Tribunal
- [Nigerian groundnut stew](https://www.yummymedley.com/nigerian-groundnut-stew/), Yummy Medley
- [Isombe](https://en.wikipedia.org/wiki/Isombe) and [West African cuisine](https://en.wikipedia.org/wiki/West_African_cuisine), Wikipedia
- [A cultural food journey through East Africa](https://culturegeneration.org/a-cultural-food-journey-through-east-africa/), Culture Generation
- [Which food trends are big in Africa?](https://www.foodnavigator.com/Article/2026/08/27/big-food-trends-in-africa/), FoodNavigator, 27 August 2026
- [The emerging flavors of Africa](https://www.ift.org/food-technology-magazine/the-emerging-flavors-of-africa), IFT Food Technology, 9 May 2025
- [How African restaurants are shaping the global food scene](https://sahararestaurantmelbourne.com.au/blog/how-african-restaurants-are-shaping-the-global-food-scene/), Sahara Restaurant Melbourne, 29 April 2026

## Author

Mitchell Barure ([@MitchellBarure](https://github.com/MitchellBarure))
