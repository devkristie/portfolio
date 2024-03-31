const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const topNavBarShow = document.querySelector(".accordion-navigation-bar-hide");
const showMoreButton = document.querySelector(".show-more-arrow");
const showMore = document.querySelector(".show-more-accordion");

hamburgerMenuIcon.addEventListener("click", showMenu);

function showMenu() {
    topNavBarShow.classList.toggle("accordion-navigation-bar-hide");
    topNavBarShow.classList.toggle("accordion-navigation-bar");
}

showMoreButton.addEventListener("click", showInformation);

function showInformation() {
    showMore.classList.toggle("show-more-accordion");
    showMore.classList.toggle("portfolio-website-content-container");
}