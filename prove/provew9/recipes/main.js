import recipes from "./recipes.mjs";

function random_number(num) {
    return Math.floor(Math.random()*num);
}

function get_array_length(array) {
    return array.length;
}

function pick_random_value(array) {
    let num = get_array_length(array);
    const entry = array[random_number(num)]
    return entry
}


// ---------------------------------------------
// Templates

function recipe_template(recipe) {
    return `<div class="recipe-container">
                <img class="recipe-img" src="${recipe.image}" alt="">
                <div class="recipe-info">
                    <ul class="recipe_tags">
                        ${tagsTemplate(recipe.tags)}
                    </ul>
                    <p class="recipe-title">${recipe.name}</p>
                    <div class="star-element">
                        ${ratingTemplate(recipe.rating)}
                    </div>
                    <p class="description">${recipe.description}</p>
                </div>
            </div>`;
}

function tagsTemplate(tags) {
    let html = ``;
    tags.forEach(element => {
        html += `<li>${element}</li>`
    });

    return html
}

function ratingTemplate(rating) {
    const value = Math.floor(rating);
    let html = `
        <span class="rating" role="img" aria-label="Rating: ${value} out of 5 stars">
    `;

    for (let i = 1; i <= 5; i++) {
        if (value >= i) { 
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }

    html += `</span>`;
    return html;
}

// ---------------------------------------------------------------------------------
// First render and also init

function renderRecipes(recipe) {
    const init = document.querySelector(".init");
    const html = recipe_template(recipe);
    init.innerHTML = html;
}

function init() {
  const recipe = pick_random_value(recipes);

  renderRecipes(recipe);
}

init();

// ---------------------------------------------
// Search Stuffs

const search_btn = document.querySelector(".search-btn");
const input = document.getElementById("searchbar");

search_btn.addEventListener('click', searchHandler);

function searchHandler() {
    const query = input.value.toLowerCase()

    const filtered = recipes.filter(recipe => {
        const nameMatch = recipe.name.toLowerCase().includes(query);
        const tagsMatch = recipe.tags && recipe.tags.find(tag => tag.toLowerCase().includes(query));

        return nameMatch || tagsMatch;
    });

    const sorted = filtered.sort((a, b) => a.name.toLowerCase().localeCompare(b.name));

    renderRecipesList(sorted);
}

function renderRecipesList(recipeList) {
    const init = document.querySelector(".init");
    const html = recipeList.map(recipe => recipe_template(recipe)).join('');
    init.innerHTML = html;
}