
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	const endpoint = "/api/getAll";


	function switchView() {
		const listView = document.querySelector(".collection-page__list-view");
		const listViewButton = document.querySelector(".collection-page__list-view-button");
		const cardsView = document.querySelector(".collection-page__cards-view");
		const cardsViewButton = document.querySelector(".collection-page__cards-view-button");

		listViewButton.addEventListener("click", function () {
			this.classList.toggle("button--solid");
			cardsViewButton.classList.toggle("button--solid");
			listView.classList.toggle("h-hidden");
			cardsView.classList.toggle("h-show-flex");
		});

		cardsViewButton.addEventListener("click", function () {
			this.classList.toggle("button--solid");
			listViewButton.classList.toggle("button--solid");
			cardsView.classList.toggle("h-show-flex");
			listView.classList.toggle("h-hidden");
		});

	}
	switchView();



	async function getAll() {

		//dodać walidację jeśli nie będzie żadnej fiszki
		const response = await fetch(endpoint);
		const flashcardsData = await response.json();
		const flashcardsObjArray = flashcardsData.data;

		let flashcardsList = document.getElementById("flashcardsList");
		let createContainer = document.getElementById("createContainer");
		const cardsView = document.querySelector(".collection-page__cards-view");


		if (flashcardsObjArray.length > 0) {

			for (let i = 0; i < flashcardsObjArray.length; i++) {

				// create list view
				let row = document.createElement("tr");
				row.classList.add("collection-page__row");

				//wyświetla title
				let tdTitle = document.createElement("td");
				tdTitle.classList.add("collection-page__cell", "collection-page__cell--title");
				tdTitle.textContent = flashcardsObjArray[i].title;
				row.appendChild(tdTitle);

				// tworzy i wyświetla Edit btn
				let tdEdit = document.createElement("td");
				tdEdit.classList.add("collection-page__cell");
				let aEdit = document.createElement("a");
				aEdit.classList.add("button", "button--secondary", "button--small", "collection-page__button");
				aEdit.setAttribute("href", `/Flashcards/Edit/${flashcardsObjArray[i].id}`);
				let iEdit = document.createElement("i");
				iEdit.classList.add("icon", "icon--xs", "icon--edit");
				aEdit.appendChild(iEdit);
				tdEdit.appendChild(aEdit);
				row.appendChild(tdEdit);

				//tworzy i wyświetla Delete btn
				let tdDelete = document.createElement("td");
				tdDelete.classList.add("collection-page__cell");
				let aDelete = document.createElement("a");
				aDelete.classList.add("button", "button--secondary", "button--small", "collection-page__button");
				aDelete.setAttribute("href", `/Flashcards/Delete/${flashcardsObjArray[i].id}`);
				let iDelete = document.createElement("i");
				iDelete.classList.add("icon", "icon--xs", "icon--delete");
				aDelete.appendChild(iDelete);
				tdDelete.appendChild(aDelete);
				row.appendChild(tdDelete);

				//dodanie fiszki do listy
				flashcardsList.appendChild(row);

				// create cards view
				const singleCard = document.createElement("div");
				singleCard.classList.add("card");
				cardsView.appendChild(singleCard);

				const singleCardTitle = document.createElement("p");
				singleCardTitle.classList.add("card__title");
				singleCard.appendChild(singleCardTitle);
				singleCardTitle.textContent += flashcardsObjArray[i].title;

				const singleCardTButtonsContainer = document.createElement("div");
				singleCardTButtonsContainer.classList.add("card__buttons-container");
				// Edit btn
				let aCardEdit = document.createElement("a");
				aCardEdit.classList.add("button", "button--secondary", "button--small", "h-margin-right-8", "h-margin-left-8");
				aCardEdit.setAttribute("href", `/Flashcards/Edit/${flashcardsObjArray[i].id}`);
				let iCardEdit = document.createElement("i");
				iCardEdit.classList.add("icon", "icon--xs", "icon--edit");
				aCardEdit.appendChild(iCardEdit);

				//Delete btn
				let aCardDelete = document.createElement("a");
				aCardDelete.classList.add("button", "button--secondary", "button--small", "h-margin-right-8", "h-margin-left-8");
				aCardDelete.setAttribute("href", `/Flashcards/Delete/${flashcardsObjArray[i].id}`);
				let iCardDelete = document.createElement("i");
				iCardDelete.classList.add("icon", "icon--xs", "icon--delete");
				aCardDelete.appendChild(iCardDelete);

				singleCardTButtonsContainer.appendChild(aCardEdit);
				singleCardTButtonsContainer.appendChild(aCardDelete);

				singleCard.appendChild(singleCardTButtonsContainer);
			}
		} else {
			alert("Sorry, your collection is empty! Hit the Create button to start!");
			//jeśli w bazie nie ma fiszek to wyświetla się wyłącznie button CREATE
			const createContainer = document.querySelector(".collection-page");
			displayCreateButton(createContainer);
		}

		function displayCreateButton(htmlDivEl) {
			let aCreate = document.createElement("a");
			aCreate.classList.add("button", "button--secondary");
			aCreate.setAttribute("href", "/Flashcards/ShowForm");
			let iCreate = document.createElement("i");
			iCreate.classList.add("icon", "icon--xs", "icon--add", "h-margin-right-8");
			let spanCreate = document.createElement("span");
			spanCreate.textContent = "Create";

			aCreate.appendChild(iCreate);
			aCreate.appendChild(spanCreate);
			htmlDivEl.appendChild(aCreate);
		}

	};
	getAll();



});
