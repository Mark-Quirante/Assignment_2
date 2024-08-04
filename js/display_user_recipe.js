const SAVED_RECIPE_DISPLAY = document.getElementById("user-saved-recipe-ul");

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
	}
}

displaySavedRecipes();
