import * as api from './api.js';
import {endpoints, addOwner, createPointer} from './data.js';


export async function getCommentsByRecipeId(recipeId) {
    
    return api.get(endpoints.commentsByRecipe(recipeId))
}

export function createComment(recipeId, comment) {
    comment.recipe = createPointer('Recipe', recipeId);
    addOwner(comment);
    return api.post(endpoints.comments, comment);
}