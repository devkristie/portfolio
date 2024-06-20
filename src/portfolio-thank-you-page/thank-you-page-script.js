const moonIcon = document.querySelector(".fa-moon");
const moon = document.querySelector(".fa-moon");
const sunIcon = document.querySelector(".fa-sun");
const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const topNavBarShow = document.querySelector(".accordion-navigation-bar-hide");

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkModePreference") === "enabled") {
        enableDarkMode();
    } else if (localStorage.getItem("darkModePreference") === "disabled") {
        disableDarkMode();
    }
});

// Initialize localStorage if darkModePreference is not set
if (!localStorage.getItem("darkModePreference")) {
    localStorage.setItem("darkModePreference", "disabled"); // Set initial state
}

// Add event listeners to both icons
moonIcon.addEventListener("click", toggleDarkMode);
sunIcon.addEventListener("click", toggleDarkMode);

// Function to toggle dark mode
function toggleDarkMode() {
    const darkModePreference = localStorage.getItem("darkModePreference");
    if (darkModePreference === "enabled") {
        disableDarkMode();
        localStorage.setItem("darkModePreference", "disabled");
    } else {
        enableDarkMode();
        localStorage.setItem("darkModePreference", "enabled");
    }
}

// Function to enable dark mode
function enableDarkMode() {
    document.body.classList.add("dark-mode");
    moonIcon.style.visibility = "hidden";
    sunIcon.style.visibility = "visible";

    // Add dark mode classes to specific elements
    const messageParagraphs = document.querySelectorAll(".message-sent-paragraph");
    messageParagraphs.forEach((paragraph) => {
        paragraph.classList.add("message-sent-paragraph-dark-mode");
    });
    const envelope1 = document.querySelector(".envelope1");
    envelope1.classList.add("envelope1-dark-mode");
    const envelope2 = document.querySelector(".envelope2");
    envelope2.classList.add("envelope2-dark-mode");
    const envelope3 = document.querySelectorAll(".envelope3");
    envelope3.forEach((line) => {
        line.classList.add("envelope3-dark-mode");
    });
}

// Function to disable dark mode
function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    sunIcon.style.visibility = "hidden";
    moonIcon.style.visibility = "visible";
    // Remove dark mode classes from specific elements
    const messageParagraphs = document.querySelectorAll(".message-sent-paragraph");
    messageParagraphs.forEach((paragraph) => {
        paragraph.classList.remove("message-sent-paragraph-dark-mode");
    });
    const envelope1 = document.querySelector(".envelope1");
    envelope1.classList.remove("envelope1-dark-mode");
    const envelope2 = document.querySelector(".envelope2");
    envelope2.classList.remove("envelope2-dark-mode");
    const envelope3 = document.querySelectorAll(".envelope3");
    envelope3.forEach((line) => {
        line.classList.remove("envelope3-dark-mode");
    });
}

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