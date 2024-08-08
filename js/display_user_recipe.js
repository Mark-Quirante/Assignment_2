/** Code was written by Quoc Thinh Nguyen */

/** Global variables that grabs the elements that will display recipes and ingredients */
const SAVED_RECIPE_DISPLAY = document.getElementById("user-saved-recipe-ul");
const OVERLAY_WINDOW = document.getElementById("ingredient-overlay");
const CLOSE_OVERLAY_BUTTON = document.getElementById("exit-overlay-button");
const RECIPE_OVERLAY = document.getElementById("recipe-list-ingredient");

/** Funtion that calls getSavedRecipes to access a users saved meal ids in the database backend.
 * 	It will then display which recipes are saved and correspondingly a remove button.
 */
async function displaySavedRecipes() {
	const savedRecipes = await getSavedRecipes();
	SAVED_RECIPE_DISPLAY.innerHTML = "";

	for (let i = 0; i < savedRecipes.length; i++) {
		const recipe = await getMealIngredients(savedRecipes[i].mealID);

		const recipeName = recipe.strMeal;
		const recipeImg = recipe.strMealThumb;

		const listName = document.createElement("li");
		const listImg = document.createElement("img");
		const removeButton = document.createElement("button");

		removeButton.textContent = "-";
		removeButton.classList.add("remove-button");

		listName.innerHTML = recipeName;
		listImg.src = recipeImg;

		let mealId = savedRecipes[i].mealID;
		removeButton.addEventListener("click", function (event) {
			removeRecipe(event, mealId);
			listName.style.display = "none";
		});

		SAVED_RECIPE_DISPLAY.appendChild(listName);
		listName.appendChild(listImg);
		listName.appendChild(removeButton);

		//adding data attributes to elements
		listName.dataset.mealId = savedRecipes[i].mealID;
		listImg.dataset.mealId = savedRecipes[i].mealID;
	}
}

/** Function that enables the saved recipes page to also display overlay window of list of ingredients and instructions */
async function onClickMealList(event) {
	const mealId = event.target.dataset.mealId;
	RECIPE_OVERLAY.innerHTML = ""; // Clear list of Ingredients first
	if (mealId) {
		const ingredients = await getMealIngredients(mealId);
		const nameMeal = ingredients.strMeal;
		const nameElement = document.createElement("h2");
		const areaMeal = ingredients.strArea;
		const areaElement = document.createElement("h3");

		nameElement.innerHTML = nameMeal;
		areaElement.innerHTML = areaMeal;

		RECIPE_OVERLAY.appendChild(nameElement);
		RECIPE_OVERLAY.appendChild(areaElement);

		displayIngredientsAndMeasurments(ingredients);
		OVERLAY_WINDOW.style.display = "flex";
	}
}

/** Function that creates the li with p tags to display ingredients and measurements */
async function displayIngredientsAndMeasurments(ingredients) {
	for (let i = 1; i <= 20; i++) {
		const ingredient = ingredients["strIngredient" + i];
		const measurement = ingredients["strMeasure" + i];

		const listElement = document.createElement("li");
		const ingredientElement = document.createElement("p");
		const measureElement = document.createElement("p");

		ingredientElement.innerHTML = ingredient;
		measureElement.innerHTML = measurement;
		listElement.appendChild(ingredientElement);
		listElement.appendChild(measureElement);
		RECIPE_OVERLAY.appendChild(listElement);
	}
	const mealInstructions = ingredients.strInstructions;
	const mealInstructionsElement = document.createElement("p");
	mealInstructionsElement.classList.add("mealInstructions");

	mealInstructionsElement.innerHTML = mealInstructions;
	RECIPE_OVERLAY.appendChild(mealInstructionsElement);
}

/** Hides the overlay window initially */
function hideOverlayWindow() {
	OVERLAY_WINDOW.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
	CLOSE_OVERLAY_BUTTON.addEventListener("click", hideOverlayWindow);
	SAVED_RECIPE_DISPLAY.addEventListener("click", onClickMealList);

	displaySavedRecipes();
});
