async function handleLogin(event) {
	event.preventDefault();

	const form = document.getElementById("loginForm");
	const formData = new FormData(form);

	try {
		const response = await fetch("../php/login.php", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			if (data.status === "success") {
				window.location.href = "./recipe.html";
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
