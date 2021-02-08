
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
		let table = document.querySelector("collection-page__table");

		if (flashcardsObjArray.length > 0) {

			for (let i = 0; i < flashcardsObjArray.length; i++) {

				let row = document.createElement("tr");
				row.classList.add("collection-page__row");

				row.innerHTML = `
				<td class="collection-page__cell collection-page__cell--title">${flashcardsObjArray[i].title}</td>
				<td class="collection-page__cell">
					<a class="button button--secondary button--solid button--small collection-page__button" href="/Flashcards/Edit/${flashcardsObjArray[i].id}">
						<i class="icon icon--xs icon--edit"></i>
					</a>
				</td>
				<td class="collection-page__cell">
					<a class="button button--secondary button--solid button--small collection-page__button" href="/Flashcards/Delete/${flashcardsObjArray[i].id}">
						<i class="icon icon--xs icon--delete"></i>
					</a>
				</td>
				`;
				flashcardsList.appendChild(row);

			}
		} else {

			alert("Sorry, your collection is empty! Hit the Create button below to start!");
			//jeśli w bazie nie ma fiszek to wyświetla się wyłącznie button CREATE
			displayCreateButton(createContainer);
		}

		function displayCreateButton(htmlDivEl) {
			htmlDivEl.innerHTML = `
				<a class="button button--secondary" href="/Flashcards/ShowForm">
					<i class="icon icon--xs icon--add h-margin-right-8"></i>
					<span class="">Create</span>
				</a>	
			`;
		}

		
	};
	getAll();
});
