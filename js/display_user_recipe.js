async function displaySavedRecipes() {
	const savedRecipes = await getSavedRecipes();
	SAVED_RECIPE_DISPLAY.innerHTML = "";

	for (let i = 0; i < savedRecipes.length; i++) {
		const recipe = await getMealIngredients(savedRecipes[i].mealID);
		const recipeName = recipe.strMeal;
		const recipeImg = recipe.strMealThumb;

		const listName = document.createElement("li");
		const listImg = document.createElement("img");

		listName.innerHTML = recipeName;
		listImg.src = recipeImg;

		SAVED_RECIPE_DISPLAY.appendChild(listName);
		SAVED_RECIPE_DISPLAY.appendChild(listImg);
	}
}

displaySavedRecipes();
