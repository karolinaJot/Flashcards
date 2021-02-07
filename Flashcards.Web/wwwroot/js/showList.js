
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	const endpoint = "/api/getAll";

	async function getAll() {

		//dodać walidację jeśli nie będzie żadnej fiszki
		const response = await fetch(endpoint);
		const flashcardsData = await response.json();
		const flashcardsObjArray = flashcardsData.data;

		let flashcardsList = document.getElementById("flashcardsList");
		let createContainer = document.getElementById("createContainer");

		if (flashcardsObjArray.length > 0) {

			for (let i = 0; i < flashcardsObjArray.length; i++) {
				let listItem = document.createElement("li");
				listItem.innerHTML = `${flashcardsObjArray[i].title}
					<a class="button button--secondary flashcards-page__button" href="/Flashcards/Edit/${flashcardsObjArray[i].id}">
					<i class="icon icon--xs icon--edit flashcards-page__button-icon"></i>
					<span class="flashcards-page__button-text">Edit</span>
					</a>
					<a class="button button--secondary flashcards-page__button" href="/Flashcards/Delete/${flashcardsObjArray[i].id}">
					<i class="icon icon--xs icon--delete flashcards-page__button-icon"></i>
					<span class="flashcards-page__button-text">Delete</span>
					</a>

				`;
				flashcardsList.appendChild(listItem);
			}
		} else {

			alert("Sorry, your collection is empty! Hit the Create button below to start!");
			//jeśli w bazie nie ma fiszek to wyświetla się wyłącznie button CREATE
			displayCreateButton(createContainer);
		}

		function displayCreateButton(htmlDivEl) {
			htmlDivEl.innerHTML = `
				<a class="button button--secondary flashcards-page__button" href="/Flashcards/ShowForm">
					<i class="icon icon--xs icon--add flashcards-page__button-icon"></i>
					<span class="flashcards-page__button-text">Create</span>
				</a>	
			`;
		}

		
	};
	getAll();
});
