const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const topNavBarShow = document.querySelector(".accordion-navigation-bar-hide");

hamburgerMenuIcon.addEventListener("click", showMenu);

function showMenu() {
  topNavBarShow.classList.toggle("accordion-navigation-bar-hide");
  topNavBarShow.classList.toggle("accordion-navigation-bar");
}

const thankYouWriting = document.querySelectorAll(".thank-you-writing1");
const thankYouWritingLine = document.querySelectorAll(".thank-you-writing2");

document.addEventListener("DOMContentLoaded", function() {
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  thankYouWriting.forEach((element, index) => {
    if (isInViewport(element)) {
      setTimeout(() => {
        element.style.animation = "draw 10s linear 2s forwards";

        // After the animation of the first element is finished, trigger the animation of the second element
        element.addEventListener("animationend", function() {
          thankYouWritingLine.forEach((lineElement) => {
            lineElement.style.animation = "draw 3s linear 5s forwards";
          });
        });
      }, index * 1250);
    }
  });
});