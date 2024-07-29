/** Functions for modifying the DOM */
const CONTENT_AREA = document.getElementById("content-area");
const DISPLAY = document.getElementById("display-search");
const SEARCH_FORM = document.getElementById("search-form");
const OVERLAY_WINDOW = document.getElementById("ingredient-overlay");
const CLOSE_OVERLAY_BUTTON = document.getElementById("exit-overlay-button");
const RECIPE_OVERLAY = document.getElementById("recipe-list-ingredient");

let categories;
/** Food Categories Functionality */

async function displayFoodCategoryName() {
	const foodCategoriesList = document.getElementById("food-categories-ul");
	foodCategoriesList.innerHTML = ""; // Clear the list first
	categories = await getFoodCategories();
	for (let i = 0; i < categories.length; i++) {
		if (categories[i]) {
			const listItem = document.createElement("li");
			listItem.textContent = categories[i].strCategory;
			foodCategoriesList.appendChild(listItem);
		}
	}
	return listItem;
}

/** Search Bar Functionality */

async function displaySearch(event) {
	// page will not refresh with every submit click
	event.preventDefault();

	const userInput = document.getElementById("category-search").value;

	console.log(categories);

	//validates user search
	if (
		!categories.find(function (categoryObject) {
			return (
				categoryObject.strCategory.toLowerCase() === userInput.toLowerCase()
			);
		})
	) {
		alert("Search must include categories listed and non-empty.");
		CONTENT_AREA.style.display = "none";
		return;
	}

	const userSearch = await getSearch(userInput);

	DISPLAY.innerHTML = ""; //Clear the text first

	for (let i = 0; i < userSearch.length; i++) {
		if (userSearch[i]) {
			const listItem = document.createElement("li");
			const listImage = document.createElement("img");
			listItem.textContent = userSearch[i].strMeal;
			listImage.src = userSearch[i].strMealThumb;
			DISPLAY.appendChild(listItem);
			listItem.appendChild(listImage);

			//Adding data attributes to elements to access Meal ID
			listItem.dataset.mealId = userSearch[i].idMeal;
			listImage.dataset.mealId = userSearch[i].idMeal;
		}
	}
	CONTENT_AREA.style.display = "grid";
}

async function onClickMealList(event) {
	const mealId = event.target.dataset.mealId;
	RECIPE_OVERLAY.innerHTML = ""; // Clear list of Ingredients first
	if (mealId) {
		const ingredients = await getMealIngredients(mealId);
		const nameMeal = ingredients.strMeal;
		const nameElement = document.createElement("h2");
		nameElement.innerHTML = nameMeal;
		RECIPE_OVERLAY.appendChild(nameElement);
		displayIngredientsAndMeasurments(ingredients);
		OVERLAY_WINDOW.style.display = "flex";
	}
}

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
}

function hideOverlayWindow() {
	OVERLAY_WINDOW.style.display = "none";
}

/** Wait for DOM to load */
document.addEventListener("DOMContentLoaded", function () {
	SEARCH_FORM.addEventListener("submit", displaySearch);
	CLOSE_OVERLAY_BUTTON.addEventListener("click", hideOverlayWindow);
	DISPLAY.addEventListener("click", onClickMealList);

	displayFoodCategoryName();
});
