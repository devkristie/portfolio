const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const topNavBarShow = document.querySelector(".accordion-navigation-bar-hide");
const showMoreButton = document.querySelectorAll(".show-more-button");
const showMore = document.querySelectorAll(".show-more-accordion");
const showMoreArrow = document.querySelectorAll(".show-more-arrow");
const showLessText = document.querySelectorAll(".show-more-button p");
const laptopImageCode1 = document.querySelectorAll(".laptop-image-code1");

hamburgerMenuIcon.addEventListener("click", showMenu);

function showMenu() {
  topNavBarShow.classList.toggle("accordion-navigation-bar-hide");
  topNavBarShow.classList.toggle("accordion-navigation-bar");
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function handleScroll() {
  laptopImageCode1.forEach((element, index) => {
    if (isInViewport(element)) {
      setTimeout(() => {
        element.style.animation = "draw 15s linear forwards";
      }, index * 500);
    }
  });
}
window.addEventListener("scroll", handleScroll);

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