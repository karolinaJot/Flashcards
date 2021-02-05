
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	const endpoint = "/api/getAll";

	async function getAll() {

		//dodać walidację jeśli nie będzie żadnej fiszki
		const response = await fetch(endpoint);
		const flashcardsData =await response.json();
		const flashcardsObjArray = flashcardsData.data;

		if (flashcardsObjArray.length > 0) {

			const prevBtn = document.getElementById("prev");
			const nextBtn = document.getElementById("next");
			const titleContainer = document.querySelector("#flashcard-title h2");
			const descriptionContainer = document.querySelector("#flashcard-description h2");
			// wyświetlanie treści fiszki, obsługa karuzeli
			let index = 0;

			titleContainer.innerHTML = `${flashcardsObjArray[index].title}`;
			descriptionContainer.innerHTML = `${flashcardsObjArray[index].description}`;

			nextBtn.addEventListener("click", event => {
				index++;
				if (index > flashcardsObjArray.length - 1) {
					index = 0;
				}
				titleContainer.innerHTML = `${flashcardsObjArray[index].title}`;
				descriptionContainer.innerHTML = `${flashcardsObjArray[index].description}`;
				return index;
			});

			prevBtn.addEventListener("click", event => {
				index--;
				if (index < 0) {
					index = flashcardsObjArray.length - 1;
				}
				titleContainer.innerHTML = `${flashcardsObjArray[index].title}`;
				descriptionContainer.innerHTML = `${flashcardsObjArray[index].description}`;
				return index;
			});

			// obsługa buttonów CREATE, EDIT, DELETE



		} else {

			alert("Sorry, there is no flashcards in here! Hit the Create button below!");
		}

	};


	getAll();



	



});
