
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	const endpoint = "/api/getAll";

	async function getAll() {

		//dodać walidację jeśli nie będzie żadnej fiszki
		const response = await fetch(endpoint);
		const flashcardsData =await response.json();
		const flashcardsObjArray = flashcardsData.data;
		console.log(flashcardsObjArray);
		
		const prevBtn = document.getElementById("prev");
		const nextBtn = document.getElementById("next");
		const titleContainer = document.querySelector("#flashcard-title h2");
		const descriptionContainer = document.querySelector("#flashcard-description h2");
		let index = 0;

		titleContainer.innerHTML = `${flashcardsObjArray[index].title}`;
		descriptionContainer.innerHTML = `${flashcardsObjArray[index].description}`;

		nextBtn.addEventListener("click", function (event) {
			index++;
			console.log(flashcardsObjArray[index].title)
			let titleValue = flashcardsObjArray[index].title;
			//const title = document.querySelector("#flashcard-title h2");
			//const description = document.querySelector("#flashcard-description h2");

			titleContainer.innerHTML = `${titleValue}`;
			descriptionContainer.innerHTML = `${flashcardsObjArray[index].description}`;
			return index;
		});
		

	};


	getAll();



	



});
