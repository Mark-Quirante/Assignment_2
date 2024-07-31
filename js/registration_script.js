async function handleRegistration(event) {
	event.preventDefault(); // Prevent default form submission
	var formData = new FormData(document.getElementById("registerationForm"));

	try {
		const response = await fetch("registration.php", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			if (data.status === "success") {
				alert(data.message); // Show success message for registration
			} else {
				alert(data.message); // Show error message
			}
		} else {
			alert("Error: " + response.status);
		}
	} catch (error) {
		alert("Error: " + error.message);
	}
}
