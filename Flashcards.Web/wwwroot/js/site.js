document.addEventListener("DOMContentLoaded", function () {

    // switch views
    const switchButton = document.querySelector(".flashcard-page__switch-button");
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
