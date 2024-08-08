/** Code was written by Quoc Thinh Nguyen */

/** Function that enables users to add recipes in user_recipe table */
async function addRecipe(event, mealId) {
	event.preventDefault();

	let obj = { mealId: mealId };
	let jsonString = JSON.stringify(obj);

	try {
		const response = await fetch("../php/user_recipe.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: jsonString,
		});

		if (response.ok) {
			const data = await response.json();
			if (data.status === "success") {
				alert("You saved a recipe!");
			} else {
				alert(data.message);
			}
		} else {
			alert("Error: " + response.status);
		}
	} catch (error) {
		alert("Error: " + error.message);
	}
}

/** Function that enables users to remove recipes in user_recipe table */
async function removeRecipe(event, mealId) {
	event.preventDefault();

	let obj = { mealId: mealId };
	let jsonString = JSON.stringify(obj);

	try {
		const response = await fetch("../php/user_recipe.php", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: jsonString,
		});

		if (response.ok) {
			const data = await response.json();
			if (data.status === "success") {
				alert("You removed a recipe!");
			} else {
				alert(data.message);
			}
		} else {
			alert("Error: " + response.status);
		}
	} catch (error) {
		alert("Error: " + error.message);
	}
}

/** Function that makes a GET request to our database to access meal ids */
async function getSavedRecipes() {
	try {
		const response = await fetch("../php/user_recipe.php");

		if (response.ok) {
			const data = await response.json();
			if (data.status === "success") {
				return data.data;
			} else {
				alert(data.message);
			}
		} else {
			alert("Error: " + response.status);
		}
	} catch (error) {
		alert("Error: " + error.message);
	}
}
