/** Food Categories Functionality */

const APICategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
async function getFoodCategories() {
	try {
		const response = await fetch(APICategories);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.categories;
	} catch (error) {
		console.error("Error fetching data:", error); // Handle errors
	}
}

async function displayFoodCategoryName() {
	const foodCategoriesList = document.getElementById("food-categories-list");
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

displayFoodCategoryName();

/** Search Bar Functionality */

const APISearchCategoryURL =
	"https://www.themealdb.com/api/json/v1/1/filter.php?c=";

async function getSearch(category) {
	try {
		const response = await fetch(APISearchCategoryURL + category);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		console.log(data);
		return data.meals;
	} catch (error) {
		console.error("Error fetching data:", error); // Handle errors
	}
}

const searchForm = document.getElementById("category-search-from");
searchForm.addEventListener("submit", displaySearch);

async function displaySearch(event) {
	event.preventDefault();

	const userInput = document.getElementById("category-search").value;
	const userSearch = await getSearch(userInput);

	const display = document.getElementById("display-search");

	display.innerHTML = "";
	for (let i = 0; i < 5; i++) {
		if (userSearch[i]) {
			const listItem = document.createElement("li");
			const listImage = document.createElement("img");
			listItem.textContent = userSearch[i].strMeal;
			listImage.src = userSearch[i].strMealThumb;
			display.appendChild(listItem);
			display.appendChild(listImage);
		}
	}
}
