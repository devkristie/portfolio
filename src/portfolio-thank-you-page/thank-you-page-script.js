"use strict"

const darkModeIconContainer = document.querySelector(".top-navigation-bar-dark-mode-icon-container ul");
const hamburgerMenuIconContainer = document.querySelector(".hamburger-menu-container");
const topNavigationBarAccordionContainer = document.querySelector(".top-navigation-bar-accordion-container-hidden");
const dynamicAnnouncer = document.getElementById("dynamicAnnouncer");
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

//? Need to fix the HTML link to this
document.querySelector(".top-navigation-bar-skip-to-main-content-link").addEventListener("click", () => {
    const portfolioSection = document.querySelector(".portfolio-section-container");
    portfolioSection.setAttribute("tabindex", "-1");
    portfolioSection.focus();

    const targetSection = document.querySelector("#portfolio-start");

    if (targetSection) {
        const scrollOffset = 79;
        window.scrollTo({
            top: targetSection.offsetTop - scrollOffset, // Scroll to the top of the section
            behavior: "smooth" // Smooth scroll behavior
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggleButton = document.querySelector(".dark-mode-toggle-button");
    const darkModeIcon = darkModeToggleButton.querySelector(".fa-moon");
    const lightModeIcon = darkModeToggleButton.querySelector(".fa-sun");
    const darkModeStatus = document.getElementById("darkModeStatus");

    const toggleDarkMode = () => {
        const darkModePreference = localStorage.getItem("darkModePreference");

        if (darkModePreference === null) {
            showDarkModeModal();
        } else {
            if (darkModePreference === "enabled") {
                disableDarkMode();
                localStorage.setItem("darkModePreference", "disabled");
            } else {
                enableDarkMode();
                localStorage.setItem("darkModePreference", "enabled");
            }
        }
    };

    const showDarkModeModal = () => {
        let darkModeModalContainer = document.querySelector(".dark-mode-modal-container");
        let darkModeModalOverlay = document.querySelector(".dark-mode-modal-overlay");

        if (!darkModeModalContainer) {
            darkModeModalOverlay = document.createElement("div");
            darkModeModalOverlay.setAttribute("class", "dark-mode-modal-overlay");
            darkModeModalOverlay.setAttribute("role", "presentation");

            darkModeModalContainer = document.createElement("aside");
            darkModeModalContainer.setAttribute("class", "dark-mode-modal-container");
            darkModeModalContainer.setAttribute("role", "dialog");
            darkModeModalContainer.setAttribute("aria-label", "Dark mode modal");
            darkModeModalContainer.setAttribute("tabindex", "-1");

            const darkModeModalTitle = document.createElement("p");
            darkModeModalTitle.setAttribute("class", "dark-mode-modal-title");
            darkModeModalTitle.textContent = "Dark Mode Preference Storage Notice";
            darkModeModalContainer.appendChild(darkModeModalTitle);

            const darkModeModalFirstParagraph = document.createElement("p");
            darkModeModalFirstParagraph.setAttribute("class", "dark-mode-modal-first-paragraph");
            darkModeModalFirstParagraph.textContent = 'When you click "Allow" for dark mode, your preference for it will be saved in local storage so that the website can remember your choice for future visits.';
            darkModeModalContainer.appendChild(darkModeModalFirstParagraph);

            const darkModeModalSecondParagraph = document.createElement("p");
            darkModeModalSecondParagraph.setAttribute("class", "dark-mode-modal-second-paragraph");
            darkModeModalSecondParagraph.textContent = 'If you click "Decline" your data for it will not be saved in local storage, and the website will not remember your preference.';
            darkModeModalContainer.appendChild(darkModeModalSecondParagraph);

            const darkModeModalAllowButton = document.createElement("button");
            darkModeModalAllowButton.setAttribute("class", "dark-mode-modal-allow-button");
            darkModeModalAllowButton.textContent = "Allow";
            darkModeModalAllowButton.setAttribute("aria-label", "Allow dark mode preference to be saved");

            const darkModeModalDeclineButton = document.createElement("button");
            darkModeModalDeclineButton.setAttribute("class", "dark-mode-modal-decline-button");
            darkModeModalDeclineButton.textContent = "Decline";
            darkModeModalDeclineButton.setAttribute("aria-label", "Decline dark mode preference to be saved");

            darkModeModalContainer.appendChild(darkModeModalAllowButton);
            darkModeModalContainer.appendChild(darkModeModalDeclineButton);

            document.body.appendChild(darkModeModalOverlay);
            document.body.appendChild(darkModeModalContainer);

            // Manage focus: move focus to the modal
            darkModeModalContainer.focus();

            darkModeModalAllowButton.addEventListener("click", () => {
                // Temporarily disable the aria-live region
                const ariaLiveElement = document.querySelector("[aria-live]");
                const previousAriaLiveValue = ariaLiveElement.getAttribute("aria-live");
                ariaLiveElement.setAttribute("aria-live", "off");

                localStorage.setItem("darkModePreference", "enabled");

                enableDarkMode();
                    // Re-enable the aria-live region
                    setTimeout(() => {
                    ariaLiveElement.setAttribute("aria-live", previousAriaLiveValue);
                }, 500); // Delay re-enabling slightly to ensure dark mode changes have been applied
                
                closeModal();
            });

            darkModeModalDeclineButton.addEventListener("click", () => {
                closeModal();
            });

            // Function to close the modal and return focus
            const closeModal = () => {
                document.body.removeChild(darkModeModalOverlay);
                document.body.removeChild(darkModeModalContainer);
                // Temporarily hide the button from screen readers
                darkModeToggleButton.setAttribute("aria-hidden", "true");

                // Use a timeout to briefly delay refocusing the button
                setTimeout(() => {
                    darkModeToggleButton.removeAttribute("aria-hidden"); // Re-enable for screen readers
                    darkModeToggleButton.focus({ preventScroll: true }); // Reapply focus
                }, 100);
            };

            // Trap focus within the modal
            const focusableElements = [darkModeModalAllowButton, darkModeModalDeclineButton];
            let currentFocusIndex = -1;
            
            darkModeModalContainer.addEventListener("keydown", (e) => {
                if (e.key === "Tab") {
                    e.preventDefault();
                    // If the container is focused and tab is pressed, move to the "Allow" button
                    if (currentFocusIndex === -1) {
                        currentFocusIndex = 0;
                    } else {
                        // Move focus to the next or previous element
                        if (e.shiftKey) {
                            currentFocusIndex = (currentFocusIndex === 0) ? focusableElements.length - 1 : currentFocusIndex - 1;
                        } else {
                            currentFocusIndex = (currentFocusIndex === focusableElements.length - 1) ? 0 : currentFocusIndex + 1;
                        }
                    }
                    focusableElements[currentFocusIndex].focus();
                } else if (e.key === "Escape") {
                    closeModal();
                }
            });
        }
    };

//Dark mode variables
const screenReadersOnlyText = document.querySelectorAll(".sr-only");
const screenReadersOnlyTopOfPageText = document.querySelector("#home-label");
const bodyDarkMode = document.querySelector("body");
const thankYouPageLandingPageSectionContainer = document.querySelector(".thank-you-page-landing-page-section-container");
const messageSentParagraphContainer = document.querySelector(".message-sent-paragraph-container");
const messageSentParagraph = document.querySelectorAll(".message-sent-paragraph");
const messageSentEnvelopeSVGEnvelope = document.querySelector(".message-sent-envelope-svg-envelope");
const messageSentEnvelopeSVGEnvelopeEndGap = document.querySelector(".message-sent-envelope-svg-envelope-end-gap");
const messageSentEnvelopeSVGEnvelopeLine = document.querySelectorAll(".message-sent-envelope-svg-envelope-line");
const footerSectionContainer = document.querySelector(".footer-section-container");
const footerNavigtionContainer = document.querySelector(".footer-navigation-container");
const footerBackToTopLink = document.querySelector("a.footer-navigation-link-backtotop");
const footerNavigationLinks = document.querySelectorAll(".footer-navigation-links a");
const footerNavigationAbsoluteLinkSubtitles = document.querySelectorAll(".footer-absolute-links");
const footerNavigationAbsoluteLinks = document.querySelectorAll(".footer-absolute-links a");
const footerBottomNavigationContainer = document.querySelector(".footer-bottom-navigation-container");

function enableDarkMode() {
    darkModeIcon.style.visibility = "hidden";
    lightModeIcon.style.visibility = "visible";
    darkModeStatus.textContent = "Dark mode is now enabled";
    darkModeToggleButton.setAttribute("aria-label", "Enable Light Mode");

    screenReadersOnlyText.forEach((text) => {
        text.classList.add("sr-only-dark-mode");
    });

    screenReadersOnlyTopOfPageText.classList.toggle("sr-only-dark-mode"); //This is used to stop the accessibility contrast issue.

    // Apply dark mode classes to other elements as needed
    bodyDarkMode.classList.add("body-dark-mode");

    dynamicAnnouncer.classList.add("dynamic-announcer-dark-mode");
    
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

    footerNavigtionContainer.classList.add("footer-navigation-container-dark-mode");
    
    footerBackToTopLink.classList.add("footer-navigation-link-backtotop-dark-mode");

    footerNavigationLinks.forEach((link) => {
        link.classList.add("footer-navigation-links-dark-mode");
    });

    footerNavigationAbsoluteLinkSubtitles.forEach((link) => {
        link.classList.add("footer-absolute-links-dark-mode");
    });

    footerNavigationAbsoluteLinks.forEach((link) => {
        link.classList.add("footer-absolute-links-dark-mode");
    });
    
    footerBottomNavigationContainer.classList.add("footer-bottom-navigation-container-dark-mode");
}

function disableDarkMode() {
    lightModeIcon.style.visibility = "hidden";
    darkModeIcon.style.visibility = "visible";
    darkModeStatus.textContent = "Light mode is now enabled";
    darkModeToggleButton.setAttribute("aria-label", "Enable Dark Mode");

    screenReadersOnlyText.forEach((text) => {
        text.classList.remove("sr-only-dark-mode");
    });

    // Remove dark mode classes from other elements as needed
    bodyDarkMode.classList.remove("body-dark-mode");

    dynamicAnnouncer.classList.remove("dynamic-announcer-dark-mode");

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

    footerNavigtionContainer.classList.remove("footer-navigation-container-dark-mode");
    
    footerBackToTopLink.classList.remove("footer-navigation-link-backtotop-dark-mode");

    footerNavigationLinks.forEach((link) => {
        link.classList.remove("footer-navigation-links-dark-mode");
    });

    footerNavigationAbsoluteLinkSubtitles.forEach((link) => {
        link.classList.remove("footer-absolute-links-dark-mode");
    });

    footerNavigationAbsoluteLinks.forEach((link) => {
        link.classList.remove("footer-absolute-links-dark-mode");
    });
    
    footerBottomNavigationContainer.classList.remove("footer-bottom-navigation-container-dark-mode");
}

    darkModeToggleButton.addEventListener("click", toggleDarkMode);
    darkModeToggleButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Prevent the default space scroll behavior
            toggleDarkMode();
        }
    });

    // Apply dark mode if preference is already enabled
    const darkModePreference = localStorage.getItem("darkModePreference");
    if (darkModePreference === "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

hamburgerMenuIconContainer.addEventListener("click", showMenu);

// Add keydown event listener for accessibility
hamburgerMenuIconContainer.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Prevent scrolling on space key
        showMenu();
    }
});

// Function to show or hide the menu
function showMenu() {
    // Select the hamburger menu button
    const menuButton = hamburgerMenuIconContainer;
    
    // Get the current state of the aria-expanded attribute
    const ariaExpanded = menuButton.getAttribute("aria-expanded");
    
    // Determine the new state
    const newAriaExpanded = ariaExpanded === "true" ? "false" : "true";
    
    // Toggle the menu's visibility
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-hidden");
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-visible");

    // Update the aria-expanded attribute to the new state
    menuButton.setAttribute("aria-expanded", newAriaExpanded);

    // Optionally announce the change for screen readers
    dynamicAnnouncer.textContent = newAriaExpanded === "true" ? "Hamburger navigation menu opened" : "Hamburger navigation menu closed";
}

// Event listeners for hamburger menu
hamburgerMenuIconContainer.addEventListener("click", showMenu);
hamburgerMenuIconContainer.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Prevent scrolling on space key
        showMenu();
    }
});
//! THIS NEEDS FIXING: The menu does not open or close when pressing space or tab!

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