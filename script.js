document.addEventListener("DOMContentLoaded", function() {
  async function main() {
    let recipes = await loadRecipes();

    const addRecipeButton = document.querySelector("#addRecipe");
    addRecipeButton.addEventListener("click", function() {
      const recipeNameInput = document.querySelector("#recipeName");
      const recipeName = recipeNameInput.value;

      const recipeDurationSelect = document.querySelector("#recipeDuration");
      const recipeDuration = recipeDurationSelect.value;

      const recipeCuisineSelect = document.querySelector("#recipeCuisine");
      const recipeCuisine = recipeCuisineSelect.value;
      
      if (recipeName) {
        addRecipe(recipes, recipeName, recipeDuration, recipeCuisine);
        renderRecipes(recipes);
        recipeNameInput.value = "";
      }
    });

    const saveButton = document.querySelector("#save-btn");
    saveButton.addEventListener("click", async function() {
      saveRecipes(recipes);
    });

    renderRecipes(recipes);
  }

  function renderRecipes(recipes) {
    const recipeList = document.querySelector("#recipeList");
    recipeList.innerHTML = "";
    for (let recipe of recipes) {
      const li = document.createElement("div");
      li.className =
        "row justify-content-between align-items-center p-2 border";
      li.innerHTML = `
                    <div class="col-12 col-md mb-2 mb-md-0 text-center"> ${recipe.name} </div>
                    <div class="col text-center"> <span class="badge  bg-primary">${recipe.duration}</span> </div>
                    <div class="col text-center"> <span class="badge  bg-primary">${recipe.cuisine}</span> </div>
                    <div class="col text-center"> <button class="btn edit-btn btn-success btn-sm">Edit</button> </div>
                    <div class="col text-center"> <button class="btn delete-btn btn-danger btn-sm">Delete</button> </div>
                  

            `;

      recipeList.appendChild(li);

      li.querySelector(".edit-btn").addEventListener('click', function() {
        const newName = prompt("Enter the new recipe name: ", recipe.name);
        const newDuration = prompt("Enter the new duration:", recipe.duration);
        const newCuisine = prompt("Enter the new cuisine:", recipe.cuisine);
        modifyRecipe(recipes, recipe.id, newName, newDuration, newCuisine);
        renderRecipes(recipes);
      });

      li.querySelector(".delete-btn").addEventListener('click', function() {
        const confirmation = confirm("Do you want to delete this recipe: " + recipe.name + "?");
        if (confirmation) {
          deleteRecipe(recipes, recipe.id);
          renderRecipes(recipes);
        }

      })

    }
  }
  main();
});
