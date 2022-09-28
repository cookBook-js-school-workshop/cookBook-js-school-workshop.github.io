import { getRecipeById, updateRecipe } from '../api/recipe.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { errorMsg, field } from './common.js';

const editTemplate = (onSubmit, errors, data) => html`
<section id="edit">
    <article>
        <h2>Edit Recipe</h2>
        <form @submit=${onSubmit} id="editForm">
            ${errorMsg(errors)}

            ${field({label: 'Name', name: 'Name', placeholder: 'Recipe Name', value: data.Name, error: errors.Name})}
            ${field({label: 'Image', name: 'img', placeholder: 'Image URL', value: data.img, error: errors.img})}
            ${field({label: 'Ingredients', name: 'ingredients', type: 'textarea', placeholder: 'Enter ingredients on separate lines', value: data.ingredients, error: errors.ingredients})}
            ${field({label: 'Preparation', name: 'steps', type: 'textarea', placeholder: 'Enter preparation steps on separate lines', value: data.steps, error: errors.steps})}

            <input type="submit" value="Edit Recipe">
        </form>
    </article>
</section>`;

export async function editPage(ctx) {
    const recipeId = ctx.params.id;
    const recipe = await getRecipeById(recipeId)
    recipe.ingredients = recipe.ingredients.join('\n');
    recipe.steps = recipe.steps.join('\n')
    
    update();

    function update(errors = {}, data = recipe) {
        ctx.render(editTemplate(createSubmitHandler(onSubmit, 'Name', 'img', 'ingredients', 'steps'), errors, data));
    }


    async function onSubmit(data, event) {
        
        try {
            const missing = Object.entries(data).filter(([k, v]) => v == '')
            
            if (missing.length > 0) {
                throw missing.reduce((a, [k]) => Object.assign(a, {[k]: true}), {message: 'Please fill all fields!'});
            }
            const recipe = {
                Name: data.Name,
                img: data.img,
                ingredients: data.ingredients.split('\n').filter(r => r != ''),
                steps: data.steps.split('\n').filter(r => r != '')
            }
            const result = await updateRecipe(recipeId, recipe);
            event.target.reset();
            ctx.page.redirect('/details/' + recipeId);

            
        } catch (err) {
            console.log(err);
            update(err, data)
        }
    }
}

