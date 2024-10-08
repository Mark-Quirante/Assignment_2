// Code below is written by Mark Quirante

// URL variables of API calls
const API_CATEGORIES_URL =
	"https://www.themealdb.com/api/json/v1/1/categories.php";
const API_SEARCH_BY_CATEGORIES_URL =
	"https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const API_SEARCH_BY_MEAL_ID_URL =
	"https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const API_SEARCH_BY_MEAL_NAME_URL =
	"https://www.themealdb.com/api/json/v1/1/search.php?s=";

// asynchronous function to fetch food categories in API
async function getFoodCategories() {
	try {
		const response = await fetch(API_CATEGORIES_URL);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.categories;
	} catch (error) {
		console.error("Error fetching data:", error); // Handle errors
	}
}

// asynchronous function to fetch food list passing a cateogry to append in API URL for our filter by category
async function getSearch(category) {
	try {
		const response = await fetch(API_SEARCH_BY_CATEGORIES_URL + category);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.meals;
	} catch (error) {
		console.error("Error fetching data:", error); // Handle errors
	}
}

// asynchronous function to fetch food list passing a name to append in API URL for our search function
async function getSearchByName(name) {
	try {
		const response = await fetch(API_SEARCH_BY_MEAL_NAME_URL + name);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.meals;
	} catch (error) {
		console.error("Error fetching data:", error); // Handle errors
	}
}

/* asynchronous function to fetch food ingredient list by passing a meal id to append in API URL for our overlay window when clicking
on a food item in recipe.html*/

async function getMealIngredients(mealId) {
	try {
		const response = await fetch(API_SEARCH_BY_MEAL_ID_URL + mealId);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data.meals[0];
	} catch (error) {
		console.error("Error fetching data:", error); // Handle errors
	}
}
