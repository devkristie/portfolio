"use strict"

const darkModeIconContainer = document.querySelector(".top-navigation-bar-dark-mode-icon-container ul");
const lightModeIcon = document.querySelector(".fa-sun");
const hamburgerMenuIconContainer = document.querySelector(".hamburger-menu-container");
const topNavigationBarAccordionContainer = document.querySelector(".top-navigation-bar-accordion-container-hidden");
const copyrightUpdateYear = document.querySelector(".footer-bottom-copyright-year");

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

darkModeIconContainer.addEventListener("click", () => {
    // Show the dark mode pop-up box if no preference is set
    const darkModePreference = localStorage.getItem("darkModePreference");
    let darkModePopUpBox = document.querySelector(".dark-mode-pop-up-box-container");

    if (darkModePreference === null && !darkModePopUpBox) {
        // Show the pop-up if no preference is set and it doesn't already exist
        darkModePopUpBox = document.createElement("aside");
        darkModePopUpBox.setAttribute("class", "dark-mode-pop-up-box-container");

        const darkModePopUpBoxTitle = document.createElement("p");
        darkModePopUpBoxTitle.setAttribute("class", "dark-mode-pop-up-box-title");
        darkModePopUpBoxTitle.textContent = "Dark Mode Preference Storage Notice";
        darkModePopUpBox.appendChild(darkModePopUpBoxTitle);

        const darkModePopUpBoxFirstParagraph = document.createElement("p");
        darkModePopUpBoxFirstParagraph.setAttribute("class", "dark-mode-pop-up-box-first-paragraph");
        darkModePopUpBoxFirstParagraph.textContent = 'When you click "Allow" for dark mode, your preference for it will be saved in local storage so that the website can remember your choice for future visits.';
        darkModePopUpBox.appendChild(darkModePopUpBoxFirstParagraph);

        const darkModePopUpBoxSecondParagraph = document.createElement("p");
        darkModePopUpBoxSecondParagraph.setAttribute("class", "dark-mode-pop-up-box-second-paragraph");
        darkModePopUpBoxSecondParagraph.textContent = 'If you click "Decline," your data for it will not be saved in local storage, and the website will not remember your preference.';
        darkModePopUpBox.appendChild(darkModePopUpBoxSecondParagraph);

        const darkModePopUpBoxAllowButton = document.createElement("button");
        darkModePopUpBoxAllowButton.setAttribute("class", "dark-mode-pop-up-box-allow-button");
        darkModePopUpBoxAllowButton.textContent = "Allow";

        const darkModePopUpBoxDeclineButton = document.createElement("button");
        darkModePopUpBoxDeclineButton.setAttribute("class", "dark-mode-pop-up-box-decline-button");
        darkModePopUpBoxDeclineButton.textContent = "Decline";

        darkModePopUpBox.appendChild(darkModePopUpBoxAllowButton);
        darkModePopUpBox.appendChild(darkModePopUpBoxDeclineButton);

        document.body.appendChild(darkModePopUpBox);

        darkModePopUpBoxAllowButton.addEventListener("click", () => {
            // Set dark mode preference in local storage
            localStorage.setItem("darkModePreference", "enabled");

            // Apply dark mode styles
            enableDarkMode();

            // Remove pop-up
            document.body.removeChild(darkModePopUpBox);
        });

        darkModePopUpBoxDeclineButton.addEventListener("click", () => {
            // Remove pop-up without saving preference
            document.body.removeChild(darkModePopUpBox);
        });
    } else if (darkModePreference !== null) {
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

//Dark mode variables
const bodyDarkMode = document.querySelector("body");
const thankYouPageLandingPageSectionContainer = document.querySelector(".thank-you-page-landing-page-section-container");
const messageSentParagraphContainer = document.querySelector(".message-sent-paragraph-container");
const messageSentParagraph = document.querySelectorAll(".message-sent-paragraph");
const messageSentEnvelopeSVGEnvelope = document.querySelector(".message-sent-envelope-svg-envelope");
const messageSentEnvelopeSVGEnvelopeEndGap = document.querySelector(".message-sent-envelope-svg-envelope-end-gap");
const messageSentEnvelopeSVGEnvelopeLine = document.querySelectorAll(".message-sent-envelope-svg-envelope-line");
const footerSectionContainer = document.querySelector(".footer-section-container");
const footerBackToTopLink = document.querySelector("a.footer-navigation-link-backtotop");
const footerBottomNavigationContainer = document.querySelector(".footer-bottom-navigation-container");

function enableDarkMode() {
    darkModeIconContainer.style.visibility = "hidden";
    lightModeIcon.style.visibility = "visible";

    // Apply dark mode classes to other elements as needed
    bodyDarkMode.classList.add("body-dark-mode");
    
    thankYouPageLandingPageSectionContainer.classList.add("thank-you-page-landing-page-section-container-dark-mode");
    
    messageSentParagraphContainer.classList.add("message-sent-paragraph-container-dark-mode");
    
    messageSentParagraph.forEach((paragraph) => {
        paragraph.classList.add("message-sent-paragraph-dark-mode");
    });
    
    messageSentEnvelopeSVGEnvelope.classList.add("message-sent-envelope-svg-envelope-dark-mode");
    
    messageSentEnvelopeSVGEnvelopeEndGap.classList.add("message-sent-envelope-svg-envelope-end-gap-dark-mode");
    
    messageSentEnvelopeSVGEnvelopeLine.forEach((line) => {
        line.classList.add("message-sent-envelope-svg-envelope-line-dark-mode");
    });
    
    footerSectionContainer.classList.add("footer-section-container-dark-mode");
    
    footerBackToTopLink.classList.add("footer-navigation-link-backtotop-dark-mode");
    
    footerBottomNavigationContainer.classList.add("footer-bottom-navigation-container-dark-mode");
}

function disableDarkMode() {
    lightModeIcon.style.visibility = "hidden";
    darkModeIconContainer.style.visibility = "visible";

    // Remove dark mode classes from other elements as needed
    bodyDarkMode.classList.remove("body-dark-mode");

    thankYouPageLandingPageSectionContainer.classList.remove("thank-you-page-landing-page-section-container-dark-mode");
    
    messageSentParagraphContainer.classList.remove("message-sent-paragraph-container-dark-mode");
    
    messageSentParagraph.forEach((paragraph) => {
        paragraph.classList.remove("message-sent-paragraph-dark-mode");
    });
    
    messageSentEnvelopeSVGEnvelope.classList.remove("message-sent-envelope-svg-envelope-dark-mode");
    
    messageSentEnvelopeSVGEnvelopeEndGap.classList.remove("message-sent-envelope-svg-envelope-end-gap-dark-mode");
    
    messageSentEnvelopeSVGEnvelopeLine.forEach((line) => {
        line.classList.remove("message-sent-envelope-svg-envelope-line-dark-mode");
    });
    
    footerSectionContainer.classList.remove("footer-section-container-dark-mode");
    
    footerBackToTopLink.classList.remove("footer-navigation-link-backtotop-dark-mode");
    
    footerBottomNavigationContainer.classList.remove("footer-bottom-navigation-container-dark-mode");
}

// Apply dark mode if preference is already enabled
document.addEventListener("DOMContentLoaded", () => {
    const darkModePreference = localStorage.getItem("darkModePreference");
    if (darkModePreference === "enabled") {
        enableDarkMode();
    }
});

hamburgerMenuIconContainer.addEventListener("click", showMenu);

function showMenu() {
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-hidden");
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-visible");
}

const thankYouMessageSVGAnimationWriting = document.querySelectorAll(".thank-you-message-svg-animation-writing");
const thankYouMessageSVGAnimationWritingUnderline = document.querySelectorAll(".thank-you-message-svg-animation-writing-underline");

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

    thankYouMessageSVGAnimationWriting.forEach((element, index) => {
        if (isInViewport(element)) {
            setTimeout(() => {
                element.style.animation = "draw 10s linear 2s forwards";

                // After the animation of the first element is finished, trigger the animation of the second element
                element.addEventListener("animationend", function() {
                    thankYouMessageSVGAnimationWritingUnderline.forEach((lineElement) => {
                        lineElement.style.animation = "draw 2.5s linear 1.5s forwards";
                    });
                });
            }, index * 1000);
        }
    });
});

const updateDate = new Date();
copyrightUpdateYear.textContent = updateDate.getFullYear();