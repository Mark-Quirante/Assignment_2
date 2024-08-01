async function addRecipe(event, mealId) {
	event.preventDefault();

	try {
		const response = await fetch("../php/user_recipe.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: mealId,
		});

		if (response.ok) {
			const data = await response.json();
			console.log("YOU SAVED THE DATA!", data);
			if (data.status === "success") {
				//window.location.href = "./recipe.html";
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
