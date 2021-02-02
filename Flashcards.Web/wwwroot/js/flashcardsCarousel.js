document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	let dataList = Array.from(document.querySelectorAll("#flashcardsList li"));
	console.log(dataList);
	const flashcardsElementsList = [];

	function retriveData(list) {
		const flashcardsObjList = [];
		for (let i = 0; i++; i < list.length) {
			let temp = Array.from(list[i]);
			console.log(temp);
			flashcardsElementsList.push(temp);
			console.log(flashcardsElementsList);

		}
		return flashcardsElementsList;
	}

	retriveData(dataList);


});