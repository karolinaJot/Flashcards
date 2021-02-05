
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	const endpoint = "/api/getAll";

	async function getAll() {

		//dodać walidację jeśli nie będzie żadnej fiszki
		const response = await fetch(endpoint);
		const flashcardsData =await response.json();
		const flashcardsObjArray = flashcardsData.data;

		const btnsContainer = document.getElementById('btn-container');

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
			
			btnsContainer.innerHTML = `
				<a class="button button--secondary flashcards-page__button" href="/Flashcards/ShowForm">
					<i class="icon icon--xs icon--add h-margin-right-8"></i>
					Create
				</a>	
				<a class="button button--secondary flashcards-page__button" href="/Flashcards/Edit/${flashcardsObjArray[index].id}">
					<i class="icon icon--xs icon--edit h-margin-right-8"></i>
					Edit
				</a>
				<a class="button button--secondary flashcards-page__button" href="/Flashcards/Delete/${flashcardsObjArray[index].id}">
					<i class="icon icon--xs icon--delete h-margin-right-8"></i>
					Delete
				</a>
				`;

		} else {

			alert("Sorry, there is no flashcards in here! Hit the Create button below!");
			//jeśli w bazie nie ma fiszek to wyświetla się wyłącznie button CREATE
			btnsContainer.innerHTML = `
				<a class="button button--secondary flashcards-page__button" href="/Flashcards/ShowForm">
					<i class="icon icon--xs icon--add h-margin-right-8"></i>
					Create
				</a>	
			`;
		}


	};


	getAll();



	



});
