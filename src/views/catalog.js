import { getRecipes } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { spinner } from './common.js';

const catalogTemplate = (recipePromise) => html`
`;



const recipePreview = (recipe) => html`
<a class="card" href="/details/${recipe.objectId}">
    <article class="recent">
        <div class="recent-preview"><img src="${recipe.img}"></div>
        <div class="recent-title">${recipe.Name}</div>
    </article>
</a>`;

export async function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadRecipes()));
}


async function loadRecipes() {
    const { results: recipes } = await getRecipes();
    if (recipes.length == 0) {
        return html`<p>No recipes found. Be the first to post a recipe!</p>`
    } else {
        return recipes.reduce((a, c) => {
            if (a.length > 0) {
                a.push(html`<div class="recent-space"></div>`);
            }
            a.push(recipePreview(c));
            return a;
        }, []);
    }
}