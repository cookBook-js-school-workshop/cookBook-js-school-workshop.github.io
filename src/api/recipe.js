import * as api from './api.js';

import {endpoints, addOwner} from './data.js';




export async function getRecipes() {
    return api.get(endpoints.recent);
}

export async function getRecipeById(id) {
    return api.get(endpoints.recipeDetails(id)); // <-- this one get the recipe with owner as an Object with its full details
    // return api.get(endpoints.getById + id); // <-- this one gets the recipe with the owner name and id
}

export async function createRecipe(recipe) {
    addOwner(recipe);

    return api.post(endpoints.createRecipe, recipe);
}

export async function updateRecipe(id, recipe) {
    return api.put(endpoints.recipeById+id, recipe);
}

export async function deleteRecipe(id) {
    return api.del(endpoints.recipeById+id);
}