/** Functions for modifying the DOM */
const CONTENT_AREA = document.getElementById("content-area");
const DISPLAY = document.getElementById("display-search");
const SEARCH_FORM = document.getElementById("search-form");
const OVERLAY_WINDOW = document.getElementById("ingredient-overlay");
const CLOSE_OVERLAY_BUTTON = document.getElementById("exit-overlay");

/** Food Categories Functionality */

async function displayFoodCategoryName() {
	const foodCategoriesList = document.getElementById("food-categories-ul");
	foodCategoriesList.innerHTML = ""; // Clear the list first
	const categories = await getFoodCategories();
	for (let i = 0; i < categories.length; i++) {
		if (categories[i]) {
			const listItem = document.createElement("li");
			listItem.textContent = categories[i].strCategory;
			foodCategoriesList.appendChild(listItem);
		}
	}
}

/** Search Bar Functionality */

async function displaySearch(event) {
	// page will not refresh with every submit click
	event.preventDefault();

	const userInput = document.getElementById("category-search").value;
	const userSearch = await getSearch(userInput);

	DISPLAY.innerHTML = "";
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

	if (mealId) {
		const ingredients = await getMealIngredients(mealId);
		console.log("YOH", ingredients);
		OVERLAY_WINDOW.style.display = "flex";
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
