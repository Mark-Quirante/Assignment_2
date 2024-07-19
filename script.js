document
	.getElementById("searchForm")
	.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the form from submitting in the traditional way

		// Get the value of the search input field
		let searchQuery = document.getElementById("searchInput").value;

		// Pass the search query to a function
		handleSearch(searchQuery);
	});

function handleSearch(breedName) {
	console.log(breedName);

	// Calls function and fetches the dog image
	getDogImage(breedName);
}

function formatBreedURL(breedName) {
	const ApiUrl = "https://dog.ceo/api/breed/" + breedName + "/images/random";
	return ApiUrl;
}

async function getDogImage(breedName) {
	const ApiUrl = formatBreedURL(breedName);

	try {
		const response = await fetch(ApiUrl);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		let dogImage = data.message;

		const breedImageContainer = document.getElementById("dog-image");
		breedImageContainer.src = dogImage;
		breedImageContainer.alt = "Picture of Dog";
	} catch (error) {
		console.error("Error fetching data:", error); // Handle errors
	}
}
