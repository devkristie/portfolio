const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const topNavBarShow = document.querySelector(".accordion-navigation-bar-hide");
const showMoreButton = document.querySelectorAll(".show-more-button");
const showMore = document.querySelectorAll(".show-more-accordion");
const showMoreArrow = document.querySelectorAll(".show-more-arrow");
const showLessText = document.querySelectorAll(".show-more-button p");

hamburgerMenuIcon.addEventListener("click", showMenu);

function showMenu() {
    topNavBarShow.classList.toggle("accordion-navigation-bar-hide");
    topNavBarShow.classList.toggle("accordion-navigation-bar");
}

showMoreButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    showMore[index].classList.toggle("show-more-accordion");
    showMore[index].classList.toggle("portfolio-website-content-container");

    if (showLessText[index].textContent === "Show More") {
      showLessText[index].textContent = "Show Less";
      showMoreArrow[index].style.transform = "rotate(180deg)";
    } else {
      showLessText[index].textContent = "Show More";
      showMoreArrow[index].style.transform = "rotate(0deg)";
    }
  });
});
