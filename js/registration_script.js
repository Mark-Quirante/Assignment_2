async function handleRegistration(event) {
	event.preventDefault();
	console.log("Form submission prevented");

	var form = document.getElementById("registrationForm");
	if (!form) {
		console.error("Form not found!");
		return;
	}
	console.log("Form element retrieved:", form);

	var formData = new FormData(form);
	console.log("FormData created:", formData);

	try {
		const response = await fetch(form.action, {
			method: "POST",
			body: formData,
		});
		console.log("Fetch response received:", response);

		if (response.ok) {
			const data = await response.json();
			console.log("Response JSON:", data);
			if (data.status === "success") {
				alert(data.message);
			} else {
				alert(data.message);
			}
		} else {
			alert("Error: " + response.status);
		}
	} catch (error) {
		console.error("Fetch error:", error);
		alert("Error: " + error.message);
	}
}
