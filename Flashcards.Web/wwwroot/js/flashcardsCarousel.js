
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	const endpoint = "/api/getAll";

	async function getAll() {
		const response = await fetch(endpoint);
		const flashcardsData = await response.json();
		console.log(flashcardsData.data);
	}

	getAll();




});
