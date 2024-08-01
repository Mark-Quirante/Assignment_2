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
