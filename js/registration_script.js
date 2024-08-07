async function handleRegistration(event) {
	event.preventDefault();
	console.log("Form submission prevented");

	const form = document.getElementById("registrationForm");
	if (!form) {
		console.error("Form not found!");
		return;
	}
	console.log("Form element retrieved:", form);

	const formData = new FormData(form);

	// validation
	const terms = document.getElementById("terms").checked;
	const name = formData.get("name");
	const email = formData.get("email").trim();
	const email2 = formData.get("email2").trim();
	const password = formData.get("password");
	const password2 = formData.get("password2");
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

	if (!name || !email || !email2 || !password || !password2) {
		alert("All fields are required.");
		return;
	}
	if (!emailPattern.test(email)) {
		alert("❌Email address should be non-empty with the format xyx@xyz.xyz.");
		return;
	}
	if (email !== email2) {
		alert("Emails do not match.");
		return;
	}

	if (password !== password2) {
		alert("Passwords do not match.");
		return;
	}
	if (!terms) {
		alert("Terms must be agreed");
		return;
	}

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
