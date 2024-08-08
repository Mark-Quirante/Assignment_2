/** Code written by Augustus Jay Del Rosario */

/** Handles the logout button to have a event listener to end and terminate a session when user logs out*/
const logoutBTN = document.getElementById("logout");

logoutBTN.addEventListener("click", async function () {
	try {
		const response = await fetch("../php/logout.php");

		if (response.ok) {
			window.location.href = "./index.html";
		} else {
			alert("Error: " + response.status);
		}
	} catch (error) {
		alert("Error: " + error.message);
	}
});
