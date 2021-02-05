
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
		console.log(prevBtn);
		const nextBtn = document.getElementById("next");
		const titleContainer = document.querySelector("#flashcard-title h2");
		const descriptionContainer = document.querySelector("#flashcard-description h2");
		let index = 0;

		titleContainer.innerHTML = `${flashcardsObjArray[index].title}`;
		descriptionContainer.innerHTML = `${flashcardsObjArray[index].description}`;

		nextBtn.addEventListener("click", event => {
			index++;
			titleContainer.innerHTML = `${flashcardsObjArray[index].title}`;
			descriptionContainer.innerHTML = `${flashcardsObjArray[index].description}`;
			return index;
		});

		console.log(index);

		prevBtn.addEventListener("click", event => {
			console.log("hej from prev");
			index--;
			titleContainer.innerHTML = `${flashcardsObjArray[index].title}`;
			descriptionContainer.innerHTML = `${flashcardsObjArray[index].description}`;
			return index;
		});
		

	};


	getAll();



	



});
