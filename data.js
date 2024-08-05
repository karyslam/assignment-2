const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "66aa1f51acd3cb34a86ddf9d";


function addRecipe(recipes, name, duration, cuisine) {
  let newRecipe = {
    id: Math.floor(Math.random() * 100 + 1),
    name: name,
    duration: duration,
    cuisine: cuisine
  };
  recipes.push(newRecipe);
}


function modifyRecipe(recipes, id, newName, newDuration, newCuisine) {
  let dish = null;
  for (let d of recipes) {
    if (d.id == id) {
      dish = d;
    }
  }
  if (dish) {
    dish.name = newName;
    dish.duration = newDuration;
    dish.cuisine = newCuisine
  } else {
    console.log("Recipe not found");
  }
}


function deleteRecipe(recipes, id) {
  let indexToDelete = null;
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id == id) {
      indexToDelete = i;
      break;
    }
  }
  if (indexToDelete !== null) {
    recipes.splice(indexToDelete, 1);
  } else {
    console.log("Recipe not found");
  }
}



async function loadRecipes() {
  const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
  return response.data.record;
}

async function saveRecipes(recipes) {
  const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, recipes, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return response.data;
}