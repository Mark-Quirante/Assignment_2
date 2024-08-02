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

async function getSavedRecipes() {
	try {
		const response = await fetch("../php/user_recipe.php");

		if (response.ok) {
			const data = await response.json();
			console.log("GET SAVED RECIPE", data);
			if (data.status === "success") {
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
