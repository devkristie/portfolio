"use strict"

//!Monitor all focusable elements
document.addEventListener('focusin', (event) => {
    console.log('Focused element:', event.target);
}, true); 
//!Using capture phase to catch all focus events

const hamburgerMenuIconContainer = document.querySelector(".hamburger-menu-container");
const topNavigationBarAccordionContainer = document.querySelector(".top-navigation-bar-accordion-container-hidden");
const dynamicAnnouncer = document.getElementById("dynamicAnnouncer");
const laptopImageCode = document.querySelectorAll(".laptop-image-code");
const portfolioWebsitesShowMoreAccordionContainerButton = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-button");
const showMoreAccordionContainerShowLessText = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-button p");
const showMoreAccordionContainerShowMoreArrow = document.querySelectorAll(".portfolio-websites-show-more-arrow");
const portfolioWebsitesShowMoreAccordionContainer = document.querySelectorAll(".portfolio-websites-show-more-accordion-container");
const contactFormInputs = document.querySelectorAll(".contact-form-input-box");
const contactFormLabels = document.querySelectorAll(".contact-form-label");
const copyrightUpdateYear = document.querySelector(".footer-bottom-copyright-year");

//Smooth anchor scroll, compatilble for older browsers
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute("href"));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

//Skip to main content z-index
document.querySelector(".top-navigation-bar-skip-to-main-content-link").addEventListener("click", () => {
    const portfolioSection = document.querySelector(".portfolio-section-container");
    portfolioSection.setAttribute("tabindex", "-1");
    portfolioSection.focus();

    const targetSection = document.getElementById("skip-to-main-content-start");

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

    if (darkModeModalContainer === null) {
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
        darkModeModalFirstParagraph.textContent = 'When you click the "Allow" button below for dark mode, your preference for it will be saved in local storage so that the website can remember your choice for future visits.';
        darkModeModalContainer.appendChild(darkModeModalFirstParagraph);

        const darkModeModalSecondParagraph = document.createElement("p");
        darkModeModalSecondParagraph.setAttribute("class", "dark-mode-modal-second-paragraph");
        darkModeModalSecondParagraph.textContent = 'If you click the "Decline" button below, your data for it will not be saved in local storage, and the website will not remember your preference.';
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

        //Manage focus: move focus to the modal
        darkModeModalContainer.focus();

        darkModeModalAllowButton.addEventListener("click", () => {
            //Temporarily disable the aria-live region
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

        //Function to close the modal and return focus
        const closeModal = () => {
            document.body.removeChild(darkModeModalOverlay);
            document.body.removeChild(darkModeModalContainer);
            //Temporarily hide the button from screen readers
            darkModeToggleButton.setAttribute("aria-hidden", "true");

            //Use a timeout to briefly delay refocusing the button
            setTimeout(() => {
                darkModeToggleButton.removeAttribute("aria-hidden"); // Re-enable for screen readers
                darkModeToggleButton.focus({ preventScroll: true }); // Reapply focus
            }, 100);
        };

        //Trap focus within the modal
        const focusableElements = [darkModeModalAllowButton, darkModeModalDeclineButton];
        let currentFocusIndex = -1;
        
        darkModeModalContainer.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
                //If the container is focused and tab is pressed, move to the "Allow" button
                if (currentFocusIndex === -1) {
                    currentFocusIndex = 0;
                } else {
                    //Move focus to the next or previous element
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
    const bodyDarkMode = document.querySelector("body");
    const mainDarkMode = document.querySelector("main");
    const landingPageBackgroundImage = document.querySelector(".landing-page-section-container");
    const landingPageTitleWelcome = document.querySelectorAll(".landing-page-title-welcome");
    const landingPageTitleBackgoundOne = document.querySelector(".landing-page-title-welcome-background-one");
    const landingPageTitleBackgoundTwo = document.querySelector(".landing-page-title-welcome-background-two");
    const landingPageTitleOpeningCurlyBrace = document.querySelector(".landing-page-title-opening-curly-brace");
    const landingPageTitleToMy = document.querySelector(".landing-page-title-property-value-to-my");
    const landingPageTitleFrontEnd = document.querySelector(".landing-page-title-property-value-front-end");
    const landingPageTitleDevelopment = document.querySelector(".landing-page-title-property-development");
    const landingPageTitleSemicolon = document.querySelector(".landing-page-title-value-semicolon");
    const landingPageTitleClosingCurlyBrace = document.querySelector(".landing-page-title-closing-curly-brace");
    const laptopImageTopShell = document.querySelector(".laptop-image-top-shell");
    const laptopImageWebcam = document.querySelector(".laptop-image-webcam");
    const laptopImageBottomShell = document.querySelector(".laptop-image-bottom-shell");
    const laptopImageBottomShellHinge = document.querySelector(".laptop-image-bottom-shell-hinge");
    const laptopImageKey = document.querySelectorAll(".laptop-image-key");
    const laptopImageMousepad = document.querySelector(".laptop-image-mousepad");
    const laptopImageMousepadLineHorizontal = document.querySelector(".laptop-image-mousepad-line-horizontal");
    const laptopImageMousepadLineVertical = document.querySelector(".laptop-image-mousepad-line-vertical");
    const laptopImageBottomShellUnderneath = document.querySelector(".laptop-image-bottom-shell-underneath");
    const laptopImageBottomShellUnderneathGrip = document.querySelector(".laptop-image-bottom-shell-underneath-grip");
    const profileContentContainer = document.querySelector(".profile-content-container");
    const profileQuotationContainer = document.querySelector(".profile-quotation-container");
    const profileQuotationMark = document.querySelector(".profile-quotation-container-quotation-marks");
    const profileIntrodutionContainerParagraph = document.querySelectorAll(".profile-introduction-container p:not(.profile-introduction-container-greeting)");
    const sectionIntroductionContainerTitle = document.querySelectorAll(".section-introduction-container h2");
    const sectionIntroductionContainerParagraph = document.querySelectorAll(".section-introduction-container p");
    const portfolioWebsitesContainer = document.querySelectorAll(".portfolio-websites-container");
    const portfolioWebsitesSliderLeftArrowDarkMode = document.querySelectorAll(".portfolio-websites-slider-left-arrow");
    const portfolioWebsitesSliderRightArrowDarkMode = document.querySelectorAll(".portfolio-websites-slider-right-arrow");
    const portfolioWebsitesShowMoreContainer = document.querySelectorAll(".portfolio-websites-show-more-container");
    const portfolioWebsitesShowMoreAccordionContainerParagraph = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-paragraph");
    const portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-technologies-used-title");
    const contactFormTopHeaderContainer = document.querySelector(".contact-form-top-header-container");
    const contactFormEnvelopeIcon = document.querySelector(".fa-envelope");
    const contactFormBackground = document.querySelector(".form-background");
    const hCaptchaColor = document.querySelector(".h-captcha");
    const footerContainerBackground = document.querySelector(".footer-navigation-container");
    const footerNavigationLinks = document.querySelectorAll(".footer-navigation-links a");
    const footerAbsoluteLinksSpanElements = document.querySelectorAll(".footer-absolute-links");
    const footerAbsoluteLinks = document.querySelectorAll(".footer-absolute-links a");
    const footerBottomContainerBorder = document.querySelector(".footer-section-container");

    function enableDarkMode() {
        darkModeIcon.classList.add("fa-moon-visibility-hidden");
        lightModeIcon.classList.add("fa-sun-visibility-visible");
        darkModeStatus.textContent = "Dark mode is now enabled";
        darkModeToggleButton.setAttribute("aria-label", "Enable Light Mode");

        //Apply dark mode classes to other elements as needed
        screenReadersOnlyText.forEach((text) => {
            text.classList.add("sr-only-dark-mode");
        });

        mainDarkMode.classList.add("main-dark-mode");

        dynamicAnnouncer.classList.add("dynamic-announcer-dark-mode");

        landingPageBackgroundImage.classList.add("landing-page-section-container-dark-mode");

        landingPageTitleWelcome.forEach((title) => {
            title.classList.add("landing-page-title-welcome-dark-mode");
        });

        landingPageTitleBackgoundOne.classList.add("landing-page-title-welcome-background-one-dark-mode");

        landingPageTitleBackgoundTwo.classList.add("landing-page-title-welcome-background-two-dark-mode");

        landingPageTitleOpeningCurlyBrace.classList.add("landing-page-title-opening-curly-brace-dark-mode");
        
        landingPageTitleToMy.classList.add("landing-page-title-property-value-to-my-dark-mode");
        
        landingPageTitleFrontEnd.classList.add("landing-page-title-property-value-front-end-dark-mode");
        
        landingPageTitleDevelopment.classList.add("landing-page-title-property-development-dark-mode");
        
        landingPageTitleSemicolon.classList.add("landing-page-title-value-semicolon-dark-mode");
        
        landingPageTitleClosingCurlyBrace.classList.add("landing-page-title-closing-curly-brace-dark-mode");
        
        laptopImageTopShell.classList.add("laptop-image-top-shell-dark-mode");
        
        laptopImageWebcam.classList.add("laptop-image-webcam-dark-mode");
        
        laptopImageBottomShell.classList.add("laptop-image-bottom-shell-dark-mode");

        laptopImageBottomShellHinge.classList.add("laptop-image-bottom-shell-hinge-dark-mode");

        laptopImageKey.forEach((key) => {
            key.classList.add("laptop-image-key-dark-mode");
        });

        laptopImageMousepad.classList.add("laptop-image-mousepad-dark-mode");

        laptopImageMousepadLineHorizontal.classList.add("laptop-image-mousepad-line-horizontal-dark-mode");

        laptopImageMousepadLineVertical.classList.add("laptop-image-mousepad-line-vertical-dark-mode");

        laptopImageBottomShellUnderneath.classList.add("laptop-image-bottom-shell-underneath-dark-mode");
        
        laptopImageBottomShellUnderneathGrip.classList.add("laptop-image-bottom-shell-underneath-grip-dark-mode");

        profileContentContainer.classList.add("profile-content-container-dark-mode");
        
        profileQuotationContainer.classList.add("profile-quotation-container-dark-mode");
        
        profileQuotationMark.classList.add("profile-quotation-container-quotation-marks-dark-mode");

        profileIntrodutionContainerParagraph.forEach((paragraph) =>{
            paragraph.classList.add("profile-introduction-container-paragraph-dark-mode");
        });
        
        sectionIntroductionContainerTitle.forEach((title) => {
            title.classList.add("section-introduction-container-h2-dark-mode");
        });
        
        sectionIntroductionContainerParagraph.forEach((paragraph) => {
            paragraph.classList.add("section-introduction-container-p-dark-mode");
        });
        
        portfolioWebsitesContainer.forEach((background) => {
            background.classList.add("portfolio-websites-container-dark-mode");
        });

        portfolioWebsitesSliderLeftArrowDarkMode.forEach((arrow) => {
            arrow.classList.add("portfolio-websites-slider-left-arrow-dark-mode");
        });

        portfolioWebsitesSliderRightArrowDarkMode.forEach((arrow) => {
            arrow.classList.add("portfolio-websites-slider-right-arrow-dark-mode");
        });
        
        portfolioWebsitesShowMoreContainer.forEach((background) => {
            background.classList.add("portfolio-websites-show-more-container-dark-mode");
        });
        
        showMoreAccordionContainerShowLessText.forEach((showMoreText) => {
            showMoreText.classList.add("portfolio-websites-show-more-accordion-container-button-p-dark-mode");
        });

        showMoreAccordionContainerShowMoreArrow.forEach((showMoreArrow) => {
            showMoreArrow.classList.add("portfolio-websites-show-more-arrow-dark-mode");
        });

        portfolioWebsitesShowMoreAccordionContainerParagraph.forEach((paragraph) => {
            paragraph.classList.add("portfolio-websites-show-more-accordion-container-paragraph-dark-mode");
        });
        
        portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle.forEach((title) => {
            title.classList.add("portfolio-websites-show-more-accordion-container-technologies-used-title-dark-mode");
        });
        
        contactFormTopHeaderContainer.classList.add("contact-form-top-header-container-dark-mode");
        
        contactFormEnvelopeIcon.classList.add("fa-envelope-dark-mode");
        
        contactFormBackground.classList.add("form-background-dark-mode");

        contactFormInputs.forEach((input) => {
            input.classList.add("contact-form-input-box-dark-mode");
            if (input.classList.contains("contact-form-invalid")) {
                input.classList.add("contact-form-invalid-dark-mode");
            }
            if (input.classList.contains("contact-form-valid")) {
                input.classList.add("contact-form-valid-dark-mode");
            }
        });

        const placeholderColorDark = `
        /* Chrome/Opera/Safari */
            ::-webkit-input-placeholder {
                color: var(--darkest-grey);
            }
        /* Firefox 19+ */
            ::-moz-placeholder {
                color: var(--darkest-grey);
            }
        /* IE 10+ */
            :-ms-input-placeholder {
                color: var(--darkest-grey);
            }
        /* Firefox 18- */
            :-moz-placeholder {
                color: var(--darkest-grey);
            }
        `;
        
        //In order to change the colour of the placeholder font for dark mode, I had to add the internal style element to the head element of the document.
        const stylePlaceholderColorDark = document.createElement("style");
        stylePlaceholderColorDark.textContent = placeholderColorDark;
        document.head.appendChild(stylePlaceholderColorDark);

        bodyDarkMode.classList.add("dark-mode"); //For the contact form input field to add the dark mode background when the form is valid and invalid
        
        contactFormLabels.forEach((label) => {
            label.classList.add("contact-form-label-dark-mode");
        });
        
        hCaptchaColor.classList.add("h-captcha-dark-mode");
        
        footerContainerBackground.classList.add("footer-navigation-container-dark-mode");

        footerNavigationLinks.forEach((link) => {
            link.classList.add("footer-navigation-links-dark-mode");
        });

        footerAbsoluteLinksSpanElements.forEach((span) => {
            span.classList.add("footer-absolute-links-dark-mode");
        });

        footerAbsoluteLinks.forEach((link) => {
            link.classList.add("footer-absolute-links-dark-mode");
        });

        footerBottomContainerBorder.classList.add("footer-section-container-dark-mode");
    }

    function disableDarkMode() {
        darkModeIcon.classList.remove("fa-moon-visibility-hidden");
        lightModeIcon.classList.remove("fa-sun-visibility-visible");
        darkModeStatus.textContent = "Light mode is now enabled";
        darkModeToggleButton.setAttribute("aria-label", "Enable Dark Mode");
        
        //Remove dark mode classes from other elements as needed
        screenReadersOnlyText.forEach((text) => {
            text.classList.remove("sr-only-dark-mode");
        });

        mainDarkMode.classList.remove("main-dark-mode");

        dynamicAnnouncer.classList.remove("dynamic-announcer-dark-mode");
        
        landingPageBackgroundImage.classList.remove("landing-page-section-container-dark-mode");

        landingPageTitleWelcome.forEach((title) => {
            title.classList.remove("landing-page-title-welcome-dark-mode");
        });

        landingPageTitleBackgoundOne.classList.remove("landing-page-title-welcome-background-one-dark-mode");
        
        landingPageTitleBackgoundTwo.classList.remove("landing-page-title-welcome-background-two-dark-mode");

        landingPageTitleOpeningCurlyBrace.classList.remove("landing-page-title-opening-curly-brace-dark-mode");
        
        landingPageTitleToMy.classList.remove("landing-page-title-property-value-to-my-dark-mode");
        
        landingPageTitleFrontEnd.classList.remove("landing-page-title-property-value-front-end-dark-mode");
        
        landingPageTitleDevelopment.classList.remove("landing-page-title-property-development-dark-mode");
        
        landingPageTitleSemicolon.classList.remove("landing-page-title-value-semicolon-dark-mode");
        
        landingPageTitleClosingCurlyBrace.classList.remove("landing-page-title-closing-curly-brace-dark-mode");
        
        laptopImageTopShell.classList.remove("laptop-image-top-shell-dark-mode");
        
        laptopImageWebcam.classList.remove("laptop-image-webcam-dark-mode");
        
        laptopImageBottomShell.classList.remove("laptop-image-bottom-shell-dark-mode");

        laptopImageBottomShellHinge.classList.remove("laptop-image-bottom-shell-hinge-dark-mode");

        laptopImageKey.forEach((key) => {
            key.classList.remove("laptop-image-key-dark-mode");
        });

        laptopImageMousepad.classList.remove("laptop-image-mousepad-dark-mode");

        laptopImageMousepadLineHorizontal.classList.remove("laptop-image-mousepad-line-horizontal-dark-mode");

        laptopImageMousepadLineVertical.classList.remove("laptop-image-mousepad-line-vertical-dark-mode");
        
        laptopImageBottomShellUnderneath.classList.remove("laptop-image-bottom-shell-underneath-dark-mode");
        
        laptopImageBottomShellUnderneathGrip.classList.remove("laptop-image-bottom-shell-underneath-grip-dark-mode");

        profileContentContainer.classList.remove("profile-content-container-dark-mode");

        profileQuotationMark.classList.remove("profile-quotation-container-quotation-marks-dark-mode");

        profileQuotationContainer.classList.remove("profile-quotation-container-dark-mode");
        
        profileIntrodutionContainerParagraph.forEach((paragraph) =>{
            paragraph.classList.remove("profile-introduction-container-paragraph-dark-mode");
        });
        
        sectionIntroductionContainerTitle.forEach((title) => {
            title.classList.remove("section-introduction-container-h2-dark-mode");
        });
        
        sectionIntroductionContainerParagraph.forEach((paragraph) => {
            paragraph.classList.remove("section-introduction-container-p-dark-mode");
        });
        
        portfolioWebsitesContainer.forEach((background) => {
            background.classList.remove("portfolio-websites-container-dark-mode");
        });

        portfolioWebsitesSliderLeftArrowDarkMode.forEach((arrow) => {
            arrow.classList.remove("portfolio-websites-slider-left-arrow-dark-mode");
        });

        portfolioWebsitesSliderRightArrowDarkMode.forEach((arrow) => {
            arrow.classList.remove("portfolio-websites-slider-right-arrow-dark-mode");
        });
        
        portfolioWebsitesShowMoreContainer.forEach((background) => {
            background.classList.remove("portfolio-websites-show-more-container-dark-mode");
        });

        showMoreAccordionContainerShowLessText.forEach((showMoreText) => {
            showMoreText.classList.remove("portfolio-websites-show-more-accordion-container-button-p-dark-mode");
        });

        showMoreAccordionContainerShowMoreArrow.forEach((showMoreArrow) => {
            showMoreArrow.classList.remove("portfolio-websites-show-more-arrow-dark-mode");
        });

        portfolioWebsitesShowMoreAccordionContainerParagraph.forEach((paragraph) => {
            paragraph.classList.remove("portfolio-websites-show-more-accordion-container-paragraph-dark-mode");
        });
        
        portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle.forEach((title) => {
            title.classList.remove("portfolio-websites-show-more-accordion-container-technologies-used-title-dark-mode");
        });
        
        contactFormTopHeaderContainer.classList.remove("contact-form-top-header-container-dark-mode");
        
        contactFormEnvelopeIcon.classList.remove("fa-envelope-dark-mode");

        contactFormBackground.classList.remove("form-background-dark-mode");
        
        contactFormInputs.forEach((input) => {
            input.classList.remove("contact-form-input-box-dark-mode");  
            if (input.classList.contains("contact-form-invalid")) {
                input.classList.remove("contact-form-invalid-dark-mode");
            }
            if (input.classList.contains("contact-form-valid")) {
                input.classList.remove("contact-form-valid-dark-mode");
            }
        });

        const placeholderColorLight = `
        /* Chrome/Opera/Safari */
            ::-webkit-input-placeholder {
                color: var(--lightest-grey);
            }
        /* Firefox 19+ */
            ::-moz-placeholder {
                color: var(--lightest-grey);
            }
        /* IE 10+ */
            :-ms-input-placeholder {
                color: var(--lightest-grey);
            }
        /* Firefox 18- */
            :-moz-placeholder {
                color: var(--lightest-grey);
            }
        `;
        
        //In order to change the colour of the placeholder font for dark mode, I had to add the internal style element to the head element of the document.
        const stylePlaceholderColorLight = document.createElement("style");
        stylePlaceholderColorLight.textContent = placeholderColorLight;
        document.head.appendChild(stylePlaceholderColorLight);

        bodyDarkMode.classList.remove("dark-mode"); //For the contact form input field to remove the dark mode background when the form is valid and invalid
        
        contactFormLabels.forEach((label) => {
            label.classList.remove("contact-form-label-dark-mode");
        });
        
        hCaptchaColor.classList.remove("h-captcha-dark-mode");
        
        footerContainerBackground.classList.remove("footer-navigation-container-dark-mode");

        footerNavigationLinks.forEach((link) => {
            link.classList.remove("footer-navigation-links-dark-mode");
        });

        footerAbsoluteLinksSpanElements.forEach((span) => {
            span.classList.remove("footer-absolute-links-dark-mode");
        });

        footerAbsoluteLinks.forEach((link) => {
            link.classList.remove("footer-absolute-links-dark-mode");
        });

        footerBottomContainerBorder.classList.remove("footer-section-container-dark-mode");
    }

    darkModeToggleButton.addEventListener("click", toggleDarkMode);
    darkModeToggleButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Prevent the default space scroll behavior
            toggleDarkMode();
        }
    });

    //Apply dark mode if preference is already enabled
    const darkModePreference = localStorage.getItem("darkModePreference");
    if (darkModePreference === "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

//Event listener for both click and keydown (Enter/Space)
hamburgerMenuIconContainer.addEventListener("click", showMenu);
hamburgerMenuIconContainer.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Prevent scrolling on space key
        showMenu();
    }
});

//Function to show or hide the menu
function showMenu() {

    //Get the current state of the aria-expanded attribute
    const ariaExpanded = hamburgerMenuIconContainer.getAttribute("aria-expanded");
    const newAriaExpanded = ariaExpanded === "true" ? "false" : "true";

    //Toggle menu visibility classes
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-hidden");
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-visible");

    //Add animation to the top navigation bar
    topNavigationBarAccordionContainer.classList.add("top-navigation-bar-accordion-container-animation");

        if (topNavigationBarAccordionContainer.classList.contains("top-navigation-bar-accordion-container-hidden")) {
            
            topNavigationBarAccordionContainer.classList.add("temporarily");
           
        } else if (topNavigationBarAccordionContainer.classList.contains("top-navigation-bar-accordion-container-visible")) {
          
            topNavigationBarAccordionContainer.classList.remove("temporarily");
        
        }

    //Update the aria-expanded attribute
    hamburgerMenuIconContainer.setAttribute("aria-expanded", newAriaExpanded);

    //Announce the change for screen readers
    dynamicAnnouncer.textContent = newAriaExpanded === "true" 
        ? "Hamburger navigation menu opened" 
        : "Hamburger navigation menu closed";

    //Hamburger menu SVG icon animation
    const hamburgerMenuBottomLine = document.querySelector(".hamburger-menu-bottomline");

    hamburgerMenuBottomLine.getAttribute("d");
    if (newAriaExpanded === "true") {
        hamburgerMenuBottomLine.setAttribute("d", "M7.5 30.5 L35 30.5");
    } else {
        hamburgerMenuBottomLine.setAttribute("d", "M17.5 30.5 L35 30.5");
    }
}

//Function to trigger the laptop SVG image code animation when the user scrolls.
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
    laptopImageCode.forEach((element, index) => {
        if (isInViewport(element)) {
            setTimeout(() => {
                element.classList.add("laptop-image-code-animation");
            }, index * 500);
        }
    });
}
window.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", function() {
    const portfolioWebsitesSliderContainers = document.querySelectorAll(".portfolio-websites-slider-container");
    const leftArrows = document.querySelectorAll(".portfolio-websites-slider-left-arrow");
    const rightArrows = document.querySelectorAll(".portfolio-websites-slider-right-arrow");

    //Function to show the current image and hide others
    function showImage(images, imageIndex) {
        images.forEach((image, i) => {
            if (i === imageIndex) {
                image.classList.add("image-visible");
                image.classList.remove("image-hidden");
            } else {
                image.classList.add("image-hidden");
                image.classList.remove("image-visible");
            }
        });
    }

    //Function to initialize slider functionality
    function initializeSlider(sliderContainer, sliderContainerIndex) {
        const leftArrowElement = leftArrows[sliderContainerIndex];
        const rightArrowElement = rightArrows[sliderContainerIndex];
        const portfolioWebsitesSliderImages = sliderContainer.querySelectorAll(".portfolio-websites-slider-image");
        let currentIndex = 0;

        //Function to handle click on left arrow
        function handleLeftArrow() {
            currentIndex = (currentIndex === 0) ? portfolioWebsitesSliderImages.length - 1 : currentIndex - 1;
            showImage(portfolioWebsitesSliderImages, currentIndex);
        }

        //Function to handle click on right arrow
        function handleRightArrow() {
            currentIndex = (currentIndex === portfolioWebsitesSliderImages.length - 1) ? 0 : currentIndex + 1;
            showImage(portfolioWebsitesSliderImages, currentIndex);
        }

        //Add event listeners for click
        leftArrowElement.addEventListener("click", handleLeftArrow);
        rightArrowElement.addEventListener("click", handleRightArrow);

        //Add event listeners for keyboard accessibility
        leftArrowElement.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); // Prevent default space action
                handleLeftArrow();
            }
        });

        rightArrowElement.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); // Prevent default space action
                handleRightArrow();
            }
        });

        //Show the initial image
        showImage(portfolioWebsitesSliderImages, currentIndex);
    }

    //Initialize each slider
    portfolioWebsitesSliderContainers.forEach((sliderContainer, sliderContainerIndex) => {
        initializeSlider(sliderContainer, sliderContainerIndex);
    });

    //Function to update viewBox attributes based on window width
    function updateViewBox() {
        if (window.innerWidth <= 600) {
            leftArrows.forEach((arrow) => {
                arrow.querySelector("svg").setAttribute("viewBox", "-28 19 10 49");
            });
            rightArrows.forEach((arrow) => {
                arrow.querySelector("svg").setAttribute("viewBox", "-28 19 10 49");
            });
        } else {
            leftArrows.forEach((arrow) => {
                arrow.querySelector("svg").setAttribute("viewBox", "14 0 20 100");
            });
            rightArrows.forEach((arrow) => {
                arrow.querySelector("svg").setAttribute("viewBox", "14 0 20 100");
            });
        }
    }

    //Initial update
    updateViewBox();

    //Update on window resize
    window.addEventListener("resize", updateViewBox);
});

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener("click", function() {
        //Find the live region and update its content
        const liveRegion = document.getElementById("tab-announcement");
        if (liveRegion) {
            liveRegion.textContent = "Opening a new tab.";
            setTimeout(() => {
                //Clear the announcement after a short delay
                liveRegion.textContent = "";
            }, 3000);
        }
    });
});

//Common function to toggle the accordion and update aria-expanded
function toggleAccordion(button, index) {
    //Get the current state of the aria-expanded attribute
    const ariaExpanded = button.getAttribute("aria-expanded");
    
    //Determine the new state
    let newAriaExpanded;
    if (ariaExpanded === "true") {
        newAriaExpanded = "false";
    } else {
        newAriaExpanded = "true";
    }
    //Update the aria-expanded attribute to the new state on the specific button
    button.setAttribute("aria-expanded", newAriaExpanded);

    const dynamicShowMoreAnnouncer = document.getElementById("dynamicShowMoreAnnouncer");
    if (newAriaExpanded === "true") {
        dynamicShowMoreAnnouncer.textContent = "Details and technologies used are now shown";
    } else {
        dynamicShowMoreAnnouncer.textContent = "Details and technologies used are now hidden";
    }
    
    const accordionContainer = portfolioWebsitesShowMoreAccordionContainer[index];
    const contentHeight = accordionContainer.scrollHeight;

    //I had to use a dynamic inline style in this conditional statement, because of the difference in the height of the container when it expands with the animation.
    if (newAriaExpanded === "true") {
        //Expand: Set the height to the full content height
        accordionContainer.style.height = contentHeight + "px";

        //After transition, reset height to auto
        setTimeout(() => {
            accordionContainer.style.height = "auto";
        }, 250); // For setTimeout to work it needs to match with the transition duration in CSS
    } else {
        //Collapse: Set the height back to 0
        accordionContainer.style.height = accordionContainer.scrollHeight + "px"; // Recalculate height in case it was set to auto

        //Force reflow to apply the height setting
        accordionContainer.offsetHeight;

        //Collapse the height
        accordionContainer.style.height = "0px";
    }

    const showMoreArrowAnimation = showMoreAccordionContainerShowMoreArrow[index];
    const showLessTextAnimation = showMoreAccordionContainerShowLessText[index];

    //Update the button text and arrow state
    if (showLessTextAnimation.textContent === "Show More") {
        showLessTextAnimation.textContent = "Show Less";
        showMoreArrowAnimation.classList.add("arrow-rotated");
        showMoreArrowAnimation.classList.remove("arrow-normal");           
    } else {
        showLessTextAnimation.textContent = "Show More";
        showMoreArrowAnimation.classList.remove("arrow-rotated");
        showMoreArrowAnimation.classList.add("arrow-normal");
    }
}

//Attach event listeners
portfolioWebsitesShowMoreAccordionContainerButton.forEach((button, index) => {
    //Click event listener
    button.addEventListener("click", () => {
        toggleAccordion(button, index);
    });

    //Keydown event listener
    button.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Prevent default behavior for space key which is scrolling
            toggleAccordion(button, index);
        }
    });
});

// contactFormInputs.forEach((input, index) => {
//     input.addEventListener("input", () => {
//         if (input.value !== "") {
//             contactFormLabels[index].style.margin = "-1.5em 0.5em";
//         } else {
//             contactFormLabels[index].style.margin = "0.25em 0.5em";
//         }
//         contactFormLabels[index].style.transition = "margin 0.35s ease";
//     });
//     // Check input values on page load
//     if (input.value !== "") {
//         contactFormLabels[index].style.margin = "-1.5em 0.5em";
//     }
// });
//!This works but not sure if it will be used, need to test it with the new code below

contactFormInputs.forEach((input, index) => {
    const originalPlaceholder = input.placeholder;
    input.placeholder = "";
    input.addEventListener("focus", () => {
        contactFormLabels[index].classList.add("label-focused");
        contactFormLabels[index].classList.remove("label-blurred");
        input.placeholder = originalPlaceholder; 
    });
    input.addEventListener("blur", () => {
        if (input.value !== "") {
            contactFormLabels[index].classList.add("label-focused");
            contactFormLabels[index].classList.remove("label-blurred");
        } else {
            contactFormLabels[index].classList.add("label-blurred");
            contactFormLabels[index].classList.remove("label-focused");
        }
        input.placeholder = "";
    });
});
//!Experiemental for people who have contrast changed in the settings

document.addEventListener("DOMContentLoaded", function () {
    const regexInput = {
        name: /^(?!.*[.,'-]{2})[a-z.,'-]{2,30}[ ][a-z.,'-]{0,30}([ ]?)[a-z.,'-]{2,30}?$/i,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/,
        phone: /^\+44\d{10}$/
    };

    const contactFormValidationParagraphName = document.querySelector(".contact-form-validation-paragraph.name");
    const contactFormValidationParagraphEmail = document.querySelector(".contact-form-validation-paragraph.email");
    const contactFormValidationParagraphPhone = document.querySelector(".contact-form-validation-paragraph.phone");
    const messageField = document.getElementById("message");
    const contactFormSubmitButton = document.querySelector(".contact-form-submit-button");
    const contactFormSubmission = document.querySelector("form");

    function setSessionCookie() {
        const cookieValue = "sessionToken=uniqueSessionID123; path=/; SameSite=Lax";
        document.cookie = cookieValue;
    }

    function validate(field, regex) {
        const isMessageField = field.id === "message";
        const isPhoneField = field.id === "phone";

        if (field.value.trim() === "") {
            field.className = "contact-form-input-box";
            if (isMessageField) {
                field.classList.add("contact-form-input-box-message");
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("contact-form-input-box-dark-mode");
            }
            if (!isPhoneField && field.nextElementSibling) { // Hiddes the validation message when there is nothing in the input box and the user pressed tab to go to the next input box.
                field.nextElementSibling.classList.remove("validation-visible");
                field.nextElementSibling.classList.add("validation-hidden");
            } 
            else if (isPhoneField && contactFormValidationParagraphPhone) {
                field.nextElementSibling.classList.remove("validation-visible");
                field.nextElementSibling.classList.add("validation-hidden");
            }
        } else if (regex.test(field.value)) {
            field.className = "contact-form-input-box contact-form-valid";
            if (isMessageField) {
                field.classList.add("contact-form-input-box-message");
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("contact-form-valid-dark-mode");
            }
            if (field.id === "fullname" && contactFormValidationParagraphName) {
                contactFormValidationParagraphName.classList.remove("validation-visible");
                contactFormValidationParagraphName.classList.add("validation-hidden");
            } else if (field.id === "email" && contactFormValidationParagraphEmail) {
                contactFormValidationParagraphEmail.classList.remove("validation-visible");
                contactFormValidationParagraphEmail.classList.add("validation-hidden");
            } else if (isPhoneField && contactFormValidationParagraphPhone) {
                contactFormValidationParagraphPhone.classList.remove("validation-visible");
                contactFormValidationParagraphPhone.classList.add("validation-hidden");
            }
        } else {
            field.className = "contact-form-input-box contact-form-invalid";
            if (isMessageField) {
                field.classList.add("contact-form-input-box-message");
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("contact-form-invalid-dark-mode");
            }
            if (field.id === "fullname" && contactFormValidationParagraphName) {
                contactFormValidationParagraphName.classList.remove("validation-hidden");
                contactFormValidationParagraphName.classList.add("validation-visible");
                announceError("fullname-error", "Please ensure that the full name only contains letters, full stops, commas, apostrophes, or hyphens.");
            } else if (field.id === "email" && contactFormValidationParagraphEmail) {
                contactFormValidationParagraphEmail.classList.remove("validation-hidden");
                contactFormValidationParagraphEmail.classList.add("validation-visible");
                announceError("email-error", "Please ensure that the email address entered is valid.");
            } else if (isPhoneField && contactFormValidationParagraphPhone) {
                contactFormValidationParagraphPhone.classList.remove("validation-hidden");
                contactFormValidationParagraphPhone.classList.add("validation-visible");
                announceError("phone-error", "Please ensure the phone number starts with + 4 4.");
            }
            messageField.addEventListener("blur", function () {
                if (messageField.value.trim() === "") {
                    announceError("message-help", "Please enter the message you would like to send to Kristie Larke.");
                }
            });
        }

        checkFormValidity();
    }

    //Function to announce errors to screen reader
    function announceError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        
        //Temporarily clear the message
        errorElement.textContent = '';  
        setTimeout(() => {
            errorElement.textContent = message;  
            errorElement.setAttribute("aria-hidden", "false");
        }, 100);
    }

    function checkFormValidity() {
        let formIsValid = true;

        contactFormInputs.forEach(input => {
            if (input.classList.contains("contact-form-invalid") || (input.hasAttribute("required") && input.value.trim() === "")) {
                formIsValid = false;
            }
        });

        contactFormSubmitButton.setAttribute("aria-disabled", !formIsValid);
    }

    function handleFormSubmission(event) {
        event.preventDefault();
        event.stopPropagation();

        let formIsValid = true;

        contactFormInputs.forEach(input => {
            if (input.classList.contains("contact-form-invalid") || (input.hasAttribute("required") && input.value.trim() === "")) {
                formIsValid = false;
            }
        });

        const hCaptchaResponse = document.querySelector('textarea[name="h-captcha-response"]').value;
        if (hCaptchaResponse === "") {
            formIsValid = false;

            let hcaptchaModalContainer = document.querySelector(".hcaptcha-modal-container");
            let hcaptchaModalOverlay = document.querySelector(".hcaptcha-modal-overlay");
    
            if (hcaptchaModalContainer === null) {
                hcaptchaModalOverlay = document.createElement("div");
                hcaptchaModalOverlay.setAttribute("class", "hcaptcha-modal-overlay");
                hcaptchaModalOverlay.setAttribute("role", "presentation");
    
                hcaptchaModalContainer = document.createElement("aside");
                hcaptchaModalContainer.setAttribute("class", "hcaptcha-modal-container");
                hcaptchaModalContainer.setAttribute("role", "dialog");
                hcaptchaModalContainer.setAttribute("aria-label", "hCaptcha modal");
                hcaptchaModalContainer.setAttribute("tabindex", "-1");
    
                const hcaptchaModalTitle = document.createElement("p");
                hcaptchaModalTitle.setAttribute("class", "hcaptcha-modal-title");
                hcaptchaModalTitle.textContent = "Alert!";
                hcaptchaModalContainer.appendChild(hcaptchaModalTitle);
    
                const hcaptchaModalFirstParagraph = document.createElement("p");
                hcaptchaModalFirstParagraph.setAttribute("class", "hcaptcha-modal-first-paragraph");
                hcaptchaModalFirstParagraph.textContent = "Please make sure you are human!";
                hcaptchaModalContainer.appendChild(hcaptchaModalFirstParagraph);

                const hcaptchaModalSecondParagraph = document.createElement("p");
                hcaptchaModalSecondParagraph.setAttribute("class", "hcaptcha-modal-second-paragraph");
                hcaptchaModalSecondParagraph.textContent = "Ensure hCaptcha checkbox is ticked.";
                hcaptchaModalContainer.appendChild(hcaptchaModalSecondParagraph);
    
                const hcaptchaModalOkButton = document.createElement("button");
                hcaptchaModalOkButton.setAttribute("class", "hcaptcha-modal-ok-button");
                hcaptchaModalOkButton.textContent = "Ok";
                hcaptchaModalOkButton.setAttribute("aria-label", "Ok (closes the alert modal)");
    
                hcaptchaModalContainer.appendChild(hcaptchaModalOkButton);
    
                document.body.appendChild(hcaptchaModalOverlay);
                document.body.appendChild(hcaptchaModalContainer);
    
                //Focus management
                hcaptchaModalContainer.focus();
    
                hcaptchaModalOkButton.addEventListener("click", () => {
                    closeHcaptchaModal();
                });
    
                //Function to close the modal and return focus
                function closeHcaptchaModal() {
                    document.body.removeChild(hcaptchaModalOverlay);
                    document.body.removeChild(hcaptchaModalContainer);

                    contactFormSubmitButton.removeAttribute("aria-label");
                    
                    setTimeout(() => {
                        contactFormSubmitButton.focus({ preventScroll: true });
                    }, 50);
                    
                    contactFormSubmitButton.addEventListener("blur", () => {
                        contactFormSubmitButton.setAttribute("aria-label", "Submit Form");
                    });
                    //! This works, however announces the button element twice.
                }
    
                //Trap focus within the modal
                hcaptchaModalContainer.addEventListener("keydown", (e) => {
                    if (e.key === "Tab") {
                        e.preventDefault(); //Prevent tabbing out of the modal
                        hcaptchaModalOkButton.focus(); //Ensure focus stays on the Ok button
                    } else if (e.key === "Escape") {
                        closeHcaptchaModal();
                    }
                });
            }
        }

        if (formIsValid) {
            setSessionCookie();
            contactFormSubmission.submit(); //Fixed: Use contactFormSubmission.submit() directly for submission
        }
    }

    contactFormInputs.forEach((input) => {
        //? input.addEventListener("keyup", (e) => {
        //?     const regex = regexInput[e.target.attributes.name.value];
        //?     validate(e.target, regex || /.*/);
        //? });

        input.addEventListener("blur", (e) => {
            const regex = regexInput[e.target.attributes.name.value];
            validate(e.target, regex || /.*/);
        });
    });

    contactFormSubmitButton.addEventListener("click", (event) => {
        if (contactFormSubmitButton.getAttribute("aria-disabled") === "true") {
            event.preventDefault();
        } else {
            handleFormSubmission(event);
        }
    });

    contactFormSubmitButton.addEventListener("keydown", (event) => {
        if ((event.key === "Enter" || event.key === " ") && contactFormSubmitButton.getAttribute("aria-disabled") !== "true") {
            event.preventDefault();
            handleFormSubmission(event);
        }
    });

    checkFormValidity();
});

const updateDate = new Date();
copyrightUpdateYear.textContent = updateDate.getFullYear();