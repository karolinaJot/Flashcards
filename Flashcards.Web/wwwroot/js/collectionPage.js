
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	const endpoint = "/api/getAll";


	function switchView() {
		const listView = document.querySelector(".collection-page__list-view");
		const listViewButton = document.querySelector(".collection-page__list-view-button");
		const cardsView = document.querySelector(".collection-page__cards-view");
		const cardsViewButton = document.querySelector(".collection-page__cards-view-button");
		console.log(listViewButton);
		console.log(cardsViewButton);

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
				row.innerHTML = `
				<td class="collection-page__cell collection-page__cell--title">${flashcardsObjArray[i].title}</td>
				<td class="collection-page__cell">
					<a class="button button--secondary button--small collection-page__button" href="/Flashcards/Edit/${flashcardsObjArray[i].id}">
						<i class="icon icon--xs icon--edit"></i>
					</a>
				</td>
				<td class="collection-page__cell">
					<a class="button button--secondary button--small collection-page__button" href="/Flashcards/Delete/${flashcardsObjArray[i].id}">
						<i class="icon icon--xs icon--delete"></i>
					</a>
				</td>
				`;
				flashcardsList.appendChild(row);

				// create cards view
				const singleCard = document.createElement("div");
				singleCard.classList.add("card");
				cardsView.appendChild(singleCard);

				const singleCardTitle = document.createElement("p");
				singleCardTitle.classList.add("card__title");
				singleCard.appendChild(singleCardTitle);
				singleCardTitle.innerHTML += flashcardsObjArray[i].title;

				const singleCardTButtonsContainer = document.createElement("div");
				singleCardTButtonsContainer.classList.add("card__buttons-container");
				singleCardTButtonsContainer.innerHTML = 
				`
					<a class="button button--secondary button--small h-margin-right-8 h-margin-left-8" href="/Flashcards/Edit/${flashcardsObjArray[i].id}">
						<i class="icon icon--xs icon--edit"></i>
					</a>
					<a class="button button--secondary button--small h-margin-right-8 h-margin-left-8" href="/Flashcards/Delete/${flashcardsObjArray[i].id}">
						<i class="icon icon--xs icon--delete"></i>
					</a>
				`
				singleCard.appendChild(singleCardTButtonsContainer);
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
