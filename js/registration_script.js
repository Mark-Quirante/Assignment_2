/** Code written by Augustus Jay Del Rosario */

/** Function that validates registration form as well as handling adding a user in our cookpal database. */
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

	clearError();
	let valid = true;

	// Validation
	const terms = document.getElementById("terms").checked;
	const name = formData.get("name");
	const email = formData.get("email").trim();
	const email2 = formData.get("email2").trim();
	const password = formData.get("password");
	const password2 = formData.get("password2");
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!name || !email || !email2 || !password || !password2) {
		alert("All fields are required.");
		valid = false;
	}
	if (!emailPattern.test(email)) {
		Error(
			"email",
			"❌Email address should be non-empty with the format xyz@xyz.xyz."
		);
		valid = false;
	}
	if (email !== email2) {
		Error("email2", "Email addresses should match");
		valid = false;
	}
	if (password !== password2) {
		Error("password2", "Please retype password to match password field");
		valid = false;
	}
	if (!terms) {
		Error("terms", " ❌Terms must be agreed");
		valid = false;
	}

	if (!valid) return;

	try {
		const response = await fetch(form.action, {
			method: "POST",
			body: formData,
		});
		console.log("Fetch response received:", response);

		if (response.ok) {
			const data = await response.json();
			console.log("Response JSON:", data);
			alert(data.message);
		} else {
			alert("Error: " + response.status);
		}
	} catch (error) {
		console.error("Fetch error:", error);
		alert("Error: " + error.message);
	}
}

/* Function to add the error messages that intakes two parameters. Field grabs the fieldId
    and adds a error class to whereever the id is located allowing the css to turn the 
    input box red. A div of class name error-message is also added into the textfield div
    where the message is stored as innerText. The error message is appended to the parentNode
    textfield class */
function Error(elementId, message) {
	const field = document.getElementById(elementId);
	field.classList.add("error");
	const errorMessage = document.createElement("div");
	errorMessage.className = "error-message";
	errorMessage.innerText = message;
	field.parentNode.appendChild(errorMessage);
}

/* Function to clear the error messages. errorMessages variable is created to select all
classes of error-message. The message is then removed for each one. Similiarly, the 
fields variable contains all .error classes such that all the input boxes return to 
original format */
function clearError() {
	const errorMessages = document.querySelectorAll(".error-message");
	errorMessages.forEach(function (message) {
		message.remove();
	});

	const fields = document.querySelectorAll(".error");
	fields.forEach(function (field) {
		field.classList.remove("error");
	});
}
