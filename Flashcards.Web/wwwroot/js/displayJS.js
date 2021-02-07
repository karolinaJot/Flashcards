document.addEventListener("DOMContentLoaded", function () {

    // switching between back and front face of the card
    const switchButton = document.querySelector(".flashcards-page__switch-button");
    const flashcard = document.querySelector(".flashcard__inner");

    switchButton.addEventListener('click', event => {
        const flashcard = document.querySelector(".flashcard__inner");
        flashcard.classList.toggle("is-flipped");
    });
    flashcard.addEventListener('click', event => {
        const flashcard = document.querySelector(".flashcard__inner");
        flashcard.classList.toggle("is-flipped");
    });



});
