"use strict"

const moonIcon = document.querySelector(".fa-moon");
const moon = document.querySelector(".fa-moon");
const sunIcon = document.querySelector(".fa-sun");
const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const topNavBarShow = document.querySelector(".top-navigation-bar-accordion-container-hidden");

// Smooth scroll, compatilble for older browsers
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute("href"));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

moonIcon.addEventListener("click", () => {
    const darkModePreference = localStorage.getItem("darkModePreference");

    if (darkModePreference === null) {
        // Show the pop-up if no preference is set
        const popUp = document.createElement("div");
        popUp.setAttribute("class", "dark-mode-popup");

        const paragraph1 = document.createElement("p");
        paragraph1.setAttribute("class", "pop-up-paragraph1");
        paragraph1.textContent = "Dark Mode Preference Storage Notice";
        popUp.appendChild(paragraph1);

        const paragraph2 = document.createElement("p");
        paragraph2.setAttribute("class", "pop-up-paragraph2");
        paragraph2.textContent = 'When you click "Allow" for dark mode, your preference for it will be saved in local storage so that the website can remember your choice for future visits.';
        popUp.appendChild(paragraph2);

        const paragraph3 = document.createElement("p");
        paragraph3.setAttribute("class", "pop-up-paragraph3");
        paragraph3.textContent = 'If you click "Decline," your data for it will not be saved in local storage, and the website will not remember your preference.';
        popUp.appendChild(paragraph3);

        const popUpAllowButton = document.createElement("button");
        popUpAllowButton.setAttribute("class", "pop-up-allow");
        popUpAllowButton.textContent = "Allow";
        const popUpDeclineButton = document.createElement("button");
        popUpDeclineButton.setAttribute("class", "pop-up-decline");
        popUpDeclineButton.textContent = "Decline";

        popUp.appendChild(popUpAllowButton);
        popUp.appendChild(popUpDeclineButton);

        document.body.appendChild(popUp);

        popUpAllowButton.addEventListener("click", () => {
            // Set dark mode preference in local storage
            localStorage.setItem("darkModePreference", "enabled");

            // Apply dark mode styles
            enableDarkMode();

            // Remove pop-up
            document.body.removeChild(popUp);
        });

        popUpDeclineButton.addEventListener("click", () => {
            // Remove pop-up without saving preference
            document.body.removeChild(popUp);
        });
    } else {
        // Toggle dark mode based on current state
        if (darkModePreference === "enabled") {
            disableDarkMode();
            localStorage.setItem("darkModePreference", "disabled");
        } else {
            enableDarkMode();
            localStorage.setItem("darkModePreference", "enabled");
        }
    }
});

sunIcon.addEventListener("click", () => {
    const darkModePreference = localStorage.getItem("darkModePreference");

    // Toggle dark mode based on current state
    if (darkModePreference === "enabled") {
        disableDarkMode();
        localStorage.setItem("darkModePreference", "disabled");
    } else {
        enableDarkMode();
        localStorage.setItem("darkModePreference", "enabled");
    }
});

function enableDarkMode() {
    document.body.classList.add("dark-mode");
    moonIcon.style.visibility = "hidden";
    sunIcon.style.visibility = "visible";
    // Apply dark mode classes to other elements as needed
    const thankYouPageContentBackground = document.querySelector(".thank-you-page-landing-page-section-container");
    thankYouPageContentBackground.classList.add("thank-you-page-landing-page-section-container-dark-mode");
    const messageParagraphContainer = document.querySelector(".message-sent-paragraph-container");
    messageParagraphContainer.classList.add("message-sent-paragraph-container-dark-mode");
    const messageParagraphs = document.querySelectorAll(".message-sent-paragraph");
    messageParagraphs.forEach((paragraph) => {
        paragraph.classList.add("message-sent-paragraph-dark-mode");
    });
    const envelope1 = document.querySelector(".message-sent-envelope-svg-envelope");
    envelope1.classList.add("message-sent-envelope-svg-envelope-dark-mode");
    const envelope2 = document.querySelector(".message-sent-envelope-svg-envelope-end-gap");
    envelope2.classList.add("message-sent-envelope-svg-envelope-end-gap-dark-mode");
    const envelope3 = document.querySelectorAll(".message-sent-envelope-svg-envelope-line");
    envelope3.forEach((line) => {
        line.classList.add("message-sent-envelope-svg-envelope-line-dark-mode");
    });
    const footerContentBackground = document.querySelector(".thank-you-page-footer-section-container");
    footerContentBackground.classList.add("thank-you-page-footer-section-container-dark-mode");
    const backToTopLinkDarkMode = document.querySelector("a.footer-link-backtotop");
    backToTopLinkDarkMode.classList.add("footer-link-back-to-top-dark-mode");
    const footerBottomBorder = document.querySelector(".footer-bottom");
    footerBottomBorder.classList.add("footer-bottom-dark-mode");
}

function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    sunIcon.style.visibility = "hidden";
    moonIcon.style.visibility = "visible";
    // Remove dark mode classes from other elements as needed
    const thankYouPageContentBackground = document.querySelector(".thank-you-page-landing-page-section-container");
    thankYouPageContentBackground.classList.remove("thank-you-page-landing-page-section-container-dark-mode");
    const messageParagraphContainer = document.querySelector(".message-sent-paragraph-container");
    messageParagraphContainer.classList.remove("message-sent-paragraph-container-dark-mode");
    const messageParagraphs = document.querySelectorAll(".message-sent-paragraph");
    messageParagraphs.forEach((paragraph) => {
        paragraph.classList.remove("message-sent-paragraph-dark-mode");
    });
    const envelope1 = document.querySelector(".message-sent-envelope-svg-envelope");
    envelope1.classList.remove("message-sent-envelope-svg-envelope-dark-mode");
    const envelope2 = document.querySelector(".message-sent-envelope-svg-envelope-end-gap");
    envelope2.classList.remove("message-sent-envelope-svg-envelope-end-gap-dark-mode");
    const envelope3 = document.querySelectorAll(".message-sent-envelope-svg-envelope-line");
    envelope3.forEach((line) => {
        line.classList.remove("message-sent-envelope-svg-envelope-line-dark-mode");
    });
    const footerContentBackground = document.querySelector(".thank-you-page-footer-section-container");
    footerContentBackground.classList.remove("thank-you-page-footer-section-container-dark-mode");
    const backToTopLinkDarkMode = document.querySelector("a.footer-link-backtotop");
    backToTopLinkDarkMode.classList.remove("footer-link-back-to-top-dark-mode");
    const footerBottomBorder = document.querySelector(".footer-bottom");
    footerBottomBorder.classList.remove("footer-bottom-dark-mode");
}

// Apply dark mode if preference is already enabled
document.addEventListener("DOMContentLoaded", () => {
    const darkModePreference = localStorage.getItem("darkModePreference");
    if (darkModePreference === "enabled") {
        enableDarkMode();
    }
});

hamburgerMenuIcon.addEventListener("click", showMenu);

function showMenu() {
    topNavBarShow.classList.toggle("top-navigation-bar-accordion-container-hidden");
    topNavBarShow.classList.toggle("top-navigation-bar-accordion-container-visible");
}

const thankYouWriting = document.querySelectorAll(".thank-you-message-svg-animation-writing");
const thankYouWritingLine = document.querySelectorAll(".thank-you-message-svg-animation-writing-underline");

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
                        lineElement.style.animation = "draw 2.5s linear 1.5s forwards"; //3s 5s
                    });
                });
            }, index * 1000); //1250
        }
    });
});