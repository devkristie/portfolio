"use strict"

// Monitor all focusable elements for bebugging - Comment out for production
// document.addEventListener('focusin', (event) => {
//     console.log('Focused element:', event.target);
// }, true); 

// Global variables
const hamburgerMenuIconContainer = document.querySelector(".hamburger-menu-container");
const topNavigationBarAccordionContainer = document.querySelector(".top-navigation-bar-accordion-container-hidden");
const dynamicAnnouncer = document.getElementById("dynamicAnnouncer");
const laptopImageCode = document.querySelectorAll(".laptop-image-code");
const showMoreAccordionButton = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-button");
const showMoreAccordionContainerShowLessText = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-button p");
const showMoreAccordionContainerShowMoreArrow = document.querySelectorAll(".portfolio-websites-show-more-arrow");
const showMoreAccordionContainer = document.querySelectorAll(".portfolio-websites-show-more-accordion-container");
const contactFormInputs = document.querySelectorAll(".contact-form-input-box");
const contactFormLabels = document.querySelectorAll(".contact-form-label");
const copyrightUpdateYear = document.querySelector(".footer-bottom-copyright-year");

// Smooth anchor scroll, compatilble for older browsers
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute("href"));

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Skip-to-main-content: move focus and scroll to main content for accessibility
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

// Create a single <style> element in the <head> to dynamically update input placeholder colors for dark/light mode
const placeholderStyle = document.createElement("style");
document.head.appendChild(placeholderStyle);

// Dark mode toggle with localStorage preference handling and first-time consent modal
document.addEventListener("DOMContentLoaded", () => {
    // Select dark mode toggle button and icons
    const darkModeToggleButton = document.querySelector(".dark-mode-toggle-button");
    const darkModeIcon = darkModeToggleButton.querySelector(".fa-moon");
    const lightModeIcon = darkModeToggleButton.querySelector(".fa-sun");
    const darkModeStatus = document.getElementById("darkModeStatus");

    // Toggle dark mode based on stored preference, or show consent modal if none exists
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

    // Create the dark mode consent modal if it doesn't exist
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

            // Modal title and explanation text
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

            // "Allow" and "Decline" buttons
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

            // Move focus into the modal for accessibility
            darkModeModalContainer.focus();

            darkModeModalAllowButton.addEventListener("click", () => {
                // Temporarily disable aria-live to avoid unnecessary announcements
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

            // Close the modal and return focus to the toggle button
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

            // Elements inside the modal that can receive focus
            const focusableElements = [darkModeModalAllowButton, darkModeModalDeclineButton];
            let currentFocusIndex = -1;
        
            // Trap focus inside the modal (Tab key cycling (Tab + Shift+Tab))
            darkModeModalContainer.addEventListener("keydown", (e) => {
                if (e.key === "Tab") {
                    e.preventDefault();
                    // If the container is focused and tab is pressed, move to the "Allow" button
                    if (currentFocusIndex === -1) {
                        currentFocusIndex = 0;
                    } else {
                        // Cycle forward or backward through focusable elements
                        if (e.shiftKey) {
                            // Shift+Tab → move backward
                            currentFocusIndex = (currentFocusIndex === 0) ? focusableElements.length - 1 : currentFocusIndex - 1;
                        } else {
                            // Tab → move forward
                            currentFocusIndex = (currentFocusIndex === focusableElements.length - 1) ? 0 : currentFocusIndex + 1;
                        }
                    }
                    focusableElements[currentFocusIndex].focus();
                } 
            
                // Allow closing the modal with Escape
                if (e.key === "Escape") {
                    closeModal();
                }
            });
        }
    };

    // DOM elements related to dark mode functionality and UI styling
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
    const profileIntroductionContainer = document.querySelector(".profile-introduction-container");
    const profileIntroductionContactLink = document.querySelector(".profile-introduction-container-paragraph a");
    const profileQuotationContainer = document.querySelector(".profile-quotation-container");
    const profileQuotationMark = document.querySelector(".profile-quotation-container-quotation-marks");
    const profileIntrodutionContainerParagraph = document.querySelectorAll(".profile-introduction-container p:not(.profile-introduction-container-greeting)");
    const sectionIntroductionContainerTitle = document.querySelectorAll(".section-introduction-container h2");
    const sectionIntroductionContainerParagraph = document.querySelectorAll(".section-introduction-container p");
    const portfolioWebsitesContainer = document.querySelectorAll(".portfolio-websites-container");
    const portfolioWebsitesDeveloperTitle = document.querySelectorAll(".portfolio-section-container h2");
    const portfolioSliderLeftArrow = document.querySelectorAll(".portfolio-websites-slider-left-arrow");
    const portfolioSliderPlaceholderText = document.querySelector(".images-coming-soon");
    const portfolioSliderPlaceholderImage = document.querySelectorAll(".placeholder");
    const portfolioSliderRightArrow = document.querySelectorAll(".portfolio-websites-slider-right-arrow");
    const portfolioWebsitesShowMoreContainer = document.querySelectorAll(".portfolio-websites-show-more-container");
    const portfolioShowMoreContainerParagraph = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-paragraph");
    const portfolioContainerTechnologiesUsed = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-technologies-used-title");
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

        // Add dark-mode-specific CSS classes to relevant page elements
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

        profileIntroductionContainer.classList.add("profile-introduction-container-dark-mode");

        profileIntroductionContactLink.classList.add("contact-link-dark-mode");
        
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

        portfolioWebsitesDeveloperTitle.forEach((title) => {
            title.classList.add("h2-dark-mode");
        });

        portfolioSliderLeftArrow.forEach((arrow) => {
            arrow.classList.add("portfolio-websites-slider-left-arrow-dark-mode");
        });

        portfolioSliderPlaceholderText.classList.add("images-coming-soon-dark-mode");

        portfolioSliderPlaceholderImage.forEach((placeholder) => {
            placeholder.classList.add("placeholder-dark-mode");
        });

        portfolioSliderRightArrow.forEach((arrow) => {
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

        portfolioShowMoreContainerParagraph.forEach((paragraph) => {
            paragraph.classList.add("portfolio-websites-show-more-accordion-container-paragraph-dark-mode");
        });
        
        portfolioContainerTechnologiesUsed.forEach((title) => {
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

        // Update placeholder text color for dark mode
        placeholderStyle.textContent = `
        /* Chrome, Safari, Opera */
        ::-webkit-input-placeholder { color: var(--darkest-grey); }
        /* Firefox 19+ */
        ::-moz-placeholder { color: var(--darkest-grey); }
        /* Internet Explorer 10+ */
        :-ms-input-placeholder { color: var(--darkest-grey); }
        /* Firefox 18- */
        :-moz-placeholder { color: var(--darkest-grey); }
        `;

        bodyDarkMode.classList.add("dark-mode"); // Add 'dark-mode' to <body> so that form input backgrounds, borders, and colors switch to the dark theme. This affects all form fields globally.
        
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
        
        // Remove dark-mode-specific CSS classes from all affected elements
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

        profileIntroductionContainer.classList.remove("profile-introduction-container-dark-mode");

        profileIntroductionContactLink.classList.remove("contact-link-dark-mode");

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

        portfolioWebsitesDeveloperTitle.forEach((title) => {
            title.classList.remove("h2-dark-mode");
        });

        portfolioSliderLeftArrow.forEach((arrow) => {
            arrow.classList.remove("portfolio-websites-slider-left-arrow-dark-mode");
        });

        portfolioSliderPlaceholderText.classList.remove("images-coming-soon-dark-mode");

        portfolioSliderPlaceholderImage.forEach((placeholder) => {
            placeholder.classList.remove("placeholder-dark-mode");
        });

        portfolioSliderRightArrow.forEach((arrow) => {
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

        portfolioShowMoreContainerParagraph.forEach((paragraph) => {
            paragraph.classList.remove("portfolio-websites-show-more-accordion-container-paragraph-dark-mode");
        });
        
        portfolioContainerTechnologiesUsed.forEach((title) => {
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

        // Update placeholder text color for light mode
        placeholderStyle.textContent = `
        /* Chrome, Safari, Opera */
        ::-webkit-input-placeholder { color: var(--lightest-grey); }
        /* Firefox 19+ */
        ::-moz-placeholder { color: var(--lightest-grey); }
        /* Internet Explorer 10+ */
        :-ms-input-placeholder { color: var(--lightest-grey); }
        /* Firefox 18- */
        :-moz-placeholder { color: var(--lightest-grey); }
        `;

        bodyDarkMode.classList.remove("dark-mode"); // Remove 'dark-mode' from <body> to revert form fields and other page elements back to the normal light theme
        
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

    darkModeToggleButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // Prevent Space from scrolling the page (default browser behavior)
            toggleDarkMode(); // Toggle dark mode when these keys are pressed
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

// Trigger hamburger menu on click or on keydown (Enter/Space)
hamburgerMenuIconContainer.addEventListener("click", showMenu);
hamburgerMenuIconContainer.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // Prevent page from scrolling when Space is pressed
        showMenu();
    }
});

// Show or hide hamburger menu
function showMenu() {
    // Read current aria-expanded state (used for screen readers)
    const ariaExpanded = hamburgerMenuIconContainer.getAttribute("aria-expanded");
    const newAriaExpanded = ariaExpanded === "true" ? "false" : "true";

    // Toggle visibility classes for the menu container
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-hidden");
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-visible");

    // Apply opening/closing animation
    topNavigationBarAccordionContainer.classList.add("top-navigation-bar-accordion-container-animation");

    // Ensure menu stays visually hidden during animation transitions
    if (topNavigationBarAccordionContainer.classList.contains("top-navigation-bar-accordion-container-hidden")) {
        topNavigationBarAccordionContainer.classList.add("temporarily");
    } else if (topNavigationBarAccordionContainer.classList.contains("top-navigation-bar-accordion-container-visible")) {
        topNavigationBarAccordionContainer.classList.remove("temporarily");
    }

    // Update aria-expanded for accessibility
    hamburgerMenuIconContainer.setAttribute("aria-expanded", newAriaExpanded);

    // Announce menu state change to screen readers
    dynamicAnnouncer.textContent = newAriaExpanded === "true" ? "Hamburger navigation menu opened" : "Hamburger navigation menu closed";

    // Animate the bottom line of the hamburger icon when opening/closing
    const hamburgerMenuBottomLine = document.querySelector(".hamburger-menu-bottomline");

    if (newAriaExpanded === "true") {
        hamburgerMenuBottomLine.setAttribute("d", "M7.5 30.5 L35 30.5");
    } else {
        hamburgerMenuBottomLine.setAttribute("d", "M17.5 30.5 L35 30.5");
    }
}

// Check if an element is fully visible in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate each laptop code line when it becomes visible on scroll
function handleScroll() {
    laptopImageCode.forEach((element, index) => {
        if (isInViewport(element)) {
            setTimeout(() => {
                element.classList.add("laptop-image-code-animation");
            }, index * 500);
        }
    });
}
// Trigger animation on scroll
window.addEventListener("scroll", handleScroll);

// Portfolio slider setup: initialize image sliders, arrow controls, keyboard accessibility, and responsive SVG viewBoxes
document.addEventListener("DOMContentLoaded", function() {
    const portfolioWebsitesSliderContainers = document.querySelectorAll(".portfolio-websites-slider-container");
    const leftArrows = document.querySelectorAll(".portfolio-websites-slider-left-arrow");
    const rightArrows = document.querySelectorAll(".portfolio-websites-slider-right-arrow");

    // Show the selected image and hide the others
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

    // Set up all slider behavior (arrows, keyboard controls, initial image)
    function initializeSlider(sliderContainer, sliderContainerIndex) {
        const leftArrowElement = leftArrows[sliderContainerIndex];
        const rightArrowElement = rightArrows[sliderContainerIndex];
        const portfolioWebsitesSliderImages = sliderContainer.querySelectorAll(".portfolio-websites-slider-image");
        let currentIndex = 0;

        // Move to previous image
        function handleLeftArrow() {
            currentIndex = (currentIndex === 0) ? portfolioWebsitesSliderImages.length - 1 : currentIndex - 1;
            showImage(portfolioWebsitesSliderImages, currentIndex);
        }

        // Move to next image
        function handleRightArrow() {
            currentIndex = (currentIndex === portfolioWebsitesSliderImages.length - 1) ? 0 : currentIndex + 1;
            showImage(portfolioWebsitesSliderImages, currentIndex);
        }

        // Handle arrow clicks to change the slider image
        leftArrowElement.addEventListener("click", handleLeftArrow);
        rightArrowElement.addEventListener("click", handleRightArrow);

        // Allow arrow keys (Enter/Space) to change the slider image
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

        // Show first image when slider is initialized
        showImage(portfolioWebsitesSliderImages, currentIndex);
    }

    // Initialize each slider on the page
    portfolioWebsitesSliderContainers.forEach((sliderContainer, sliderContainerIndex) => {
        initializeSlider(sliderContainer, sliderContainerIndex);
    });

    // Adjust arrow SVG viewBox based on screen width
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

    // Set initial viewBox based on screen size
    updateViewBox();

    // Update viewBox whenever the window is resized
    window.addEventListener("resize", updateViewBox);
});

// Announce when a link opens in a new tab (accessibility for screen readers)
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener("click", function() {
        // Get the aria-live region used for announcements
        const liveRegion = document.getElementById("tab-announcement");
        if (liveRegion) {
            // Announce that a new tab is being opened
            liveRegion.textContent = "Opening a new tab.";
            setTimeout(() => {
                // Clear the announcement after a short delay so it doesn't repeat
                liveRegion.textContent = "";
            }, 3000);
        }
    });
});

// Toggle accordion open/closed and update aria-expanded for accessibility
function toggleAccordion(button, index) {
    // Read current aria-expanded state
    const ariaExpanded = button.getAttribute("aria-expanded");
    
    // Determine the new aria-expanded value ("true" ↔ "false")
    let newAriaExpanded;
    if (ariaExpanded === "true") {
        newAriaExpanded = "false";
    } else {
        newAriaExpanded = "true";
    }
    // Apply the updated aria-expanded state to the button
    button.setAttribute("aria-expanded", newAriaExpanded);

    // Announce the accordion state change to screen readers
    const dynamicShowMoreAnnouncer = document.getElementById("dynamicShowMoreAnnouncer");
    if (newAriaExpanded === "true") {
        dynamicShowMoreAnnouncer.textContent = "Details and technologies used are now shown";
    } else {
        dynamicShowMoreAnnouncer.textContent = "Details and technologies used are now hidden";
    }
    
    // The accordion content container for this button
    const accordionContainer = showMoreAccordionContainer[index];
    const contentHeight = accordionContainer.scrollHeight;

    // Expand or collapse the accordion with smooth height animation
    if (newAriaExpanded === "true") {
        // Expand: temporarily set explicit height to allow animation
        accordionContainer.style.height = contentHeight + "px";

        // After animation ends, restore height to auto for flexible layout
        setTimeout(() => {
            accordionContainer.style.height = "auto";
        }, 250); // Must match CSS transition duration
    } else {
        // Collapse: set height to current value before collapsing
        accordionContainer.style.height = accordionContainer.scrollHeight + "px"; // Recalculate height in case it was set to auto

        // Force reflow to ensure height transition applies
        accordionContainer.offsetHeight;

        // Animate collapse to 0 height
        accordionContainer.style.height = "0px";
    }

    // Arrow icon and text label for the accordion toggle
    const showMoreArrowAnimation = showMoreAccordionContainerShowMoreArrow[index];
    const showLessTextAnimation = showMoreAccordionContainerShowLessText[index];

    // Update text (“Show More” / “Show Less”) and rotate arrow accordingly
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

// Add click and keyboard accessibility to each Show More/Show Less accordion button
showMoreAccordionButton.forEach((button, index) => {
    // Toggle accordion on mouse click
    button.addEventListener("click", () => {
        toggleAccordion(button, index);
    });

    // Toggle accordion with keyboard (Enter or Space)
    button.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Prevent Space from scrolling the page
            toggleAccordion(button, index);
        }
    });
});

// Handle input labels and placeholders for accessibility: ensures labels are visible in high-contrast/forced-colors modes and float correctly based on focus and input value.
contactFormInputs.forEach((input, index) => {
    // Store the original placeholder so it can be restored on focus
    const originalPlaceholder = input.placeholder;
    // Hide the placeholder until the field is focused
    input.placeholder = "";
    input.addEventListener("focus", () => {
        contactFormLabels[index].classList.add("label-focused"); // Move label up when focused
        contactFormLabels[index].classList.remove("label-blurred"); // Remove blurred state on focus
        input.placeholder = originalPlaceholder; // Show placeholder on focus; disappears when typing
    });

    input.addEventListener("blur", () => {
        if (input.value !== "") {
            contactFormLabels[index].classList.add("label-focused"); // Keep label above the input, if input is filled
            contactFormLabels[index].classList.remove("label-blurred"); // Remove the default label style for empty fields so that when the user focuses on the input, the label moves above the field instead of overlapping the text.
        } else {
            contactFormLabels[index].classList.add("label-blurred"); // Input is empty: return label to its original/placeholder position so it doesn’t float above when no text is in the input.
            contactFormLabels[index].classList.remove("label-focused"); // Remove the focused/floating state since the input has no value.
        }
        input.placeholder = ""; // Hide placeholder again on blur
    });
});

// Contact form initialization and validation: input checks, accessibility, ARIA updates, and submission handling
document.addEventListener("DOMContentLoaded", function () {
    // Regex patterns for validating name, email, and UK phone number
    const regexInput = {
        name: /^(?!.*[.,'-]{2})[a-z.,'-]{2,30}[ ][a-z.,'-]{0,30}([ ]?)[a-z.,'-]{2,30}?$/i,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/,
        phone: /^\+44\d{10}$/
    };

    // Store references to form elements and validation messages for easier access later
    const contactFormValidationParagraphName = document.querySelector(".contact-form-validation-paragraph.name");
    const contactFormValidationParagraphEmail = document.querySelector(".contact-form-validation-paragraph.email");
    const contactFormValidationParagraphPhone = document.querySelector(".contact-form-validation-paragraph.phone");
    const messageField = document.getElementById("message");
    const contactFormSubmitButton = document.querySelector(".contact-form-submit-button");
    const contactFormSubmission = document.querySelector("form");

    // Function to set a temporary session cookie (used on successful submission)
    function setSessionCookie() {
        const cookieValue = "sessionToken=uniqueSessionID123; path=/; SameSite=Lax";
        document.cookie = cookieValue;
    }

    // Validate a single field against its regex pattern
    function validate(field, regex) {
        const isMessageField = field.id === "message";
        const isPhoneField = field.id === "phone";

        // Case: Field is empty
        if (field.value.trim() === "") {
            field.className = "contact-form-input-box"; // Reset classes
            if (isMessageField) {
                field.classList.add("contact-form-input-box-message"); // Keep message field styling
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("contact-form-input-box-dark-mode"); // Preserve dark mode
            }
            // Hide validation message if empty
            if (!isPhoneField && field.nextElementSibling) {
                field.nextElementSibling.classList.remove("validation-visible");
                field.nextElementSibling.classList.add("validation-hidden");
            } 
            else if (isPhoneField && contactFormValidationParagraphPhone) {
                field.nextElementSibling.classList.remove("validation-visible");
                field.nextElementSibling.classList.add("validation-hidden");
            }
        }
        // Case: Field passes regex validation
        else if (regex.test(field.value)) {
            field.className = "contact-form-input-box contact-form-valid"; // Mark field as valid
            if (isMessageField) {
                field.classList.add("contact-form-input-box-message");
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("contact-form-valid-dark-mode");
            }
            // Hide specific field validation messages
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
        } 
        // Case: Field fails regex validation
        else {
            field.className = "contact-form-input-box contact-form-invalid"; // Mark field as invalid
            if (isMessageField) {
                field.classList.add("contact-form-input-box-message");
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("contact-form-invalid-dark-mode");
            }
            // Show validation messages and announce for screen readers
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
            // Special case: empty message field blur triggers screen reader error
            messageField.addEventListener("blur", function () {
                if (messageField.value.trim() === "") {
                    announceError("message-help", "Please enter the message you would like to send to Kristie Larke.");
                }
            });
        }
        // Update form submit button state
        checkFormValidity();
    }

    // Announce error messages for screen readers
    function announceError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = ''; // Clear previous message
        setTimeout(() => {
            errorElement.textContent = message;  
            errorElement.setAttribute("aria-hidden", "false"); // Make it visible to screen readers
        }, 100); // Slight delay ensures SR picks up change
    }

    // Check overall form validity and toggle submit button state
    function checkFormValidity() {
        let formIsValid = true;

        contactFormInputs.forEach(input => {
            if (input.classList.contains("contact-form-invalid") || (input.hasAttribute("required") && input.value.trim() === "")) {
                formIsValid = false;
            }
        });

        contactFormSubmitButton.setAttribute("aria-disabled", !formIsValid); // Disable submit button if form invalid
    }

    // Handle final form submission
    function handleFormSubmission(event) {
        event.preventDefault();
        event.stopPropagation(); // Stops the click from bubbling to parent listeners

        let formIsValid = true;

        // Validate all inputs again
        contactFormInputs.forEach(input => {
            if (input.classList.contains("contact-form-invalid") || (input.hasAttribute("required") && input.value.trim() === "")) {
                formIsValid = false;
            }
        });

        // Check hCaptcha response
        const hCaptchaResponse = document.querySelector('textarea[name="h-captcha-response"]').value;
        if (hCaptchaResponse === "") {
            formIsValid = false;

            // Create modal alert for missing hCaptcha if not already present
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
    
                // Add modal and overlay to DOM
                document.body.appendChild(hcaptchaModalOverlay);
                document.body.appendChild(hcaptchaModalContainer);
    
                // Focus modal for accessibility
                hcaptchaModalContainer.focus();
    
                // Close modal function
                hcaptchaModalOkButton.addEventListener("click", () => {
                    closeHcaptchaModal();
                });
    
                // Close the hCaptcha modal, remove it from the DOM, and return focus to the submit button safely
                function closeHcaptchaModal() {
                    // Remove the modal overlay and container from the page
                    document.body.removeChild(hcaptchaModalOverlay);
                    document.body.removeChild(hcaptchaModalContainer);

                    // Remove the temporary aria-label added during modal focus
                    contactFormSubmitButton.removeAttribute("aria-label");
                    
                    // Return focus to the submit button without scrolling the page
                    setTimeout(() => {
                        contactFormSubmitButton.focus({ preventScroll: true });
                    }, 50);
                    
                    // Restore the original aria-label when the button loses focus
                    contactFormSubmitButton.addEventListener("blur", () => {
                        contactFormSubmitButton.setAttribute("aria-label", "Submit Form");
                    });
                }
    
                // Trap keyboard focus within the hCaptcha modal to maintain accessibility
                hcaptchaModalContainer.addEventListener("keydown", (e) => {
                    if (e.key === "Tab") {
                        e.preventDefault(); // Stop the Tab key from moving focus outside the modal
                        hcaptchaModalOkButton.focus(); // Keep focus on the OK button inside the modal
                    } else if (e.key === "Escape") {
                        closeHcaptchaModal(); // Close the modal when Escape is pressed
                    }
                });
            }
        }

        // If the form passes validation, set a session cookie and submit the form programmatically
        if (formIsValid) {
            setSessionCookie();
            contactFormSubmission.submit(); // Submit the form using the form element’s native submit method
        }
    }

    // Add input validation for each form field
    contactFormInputs.forEach((input) => {
        // Validate the input when it loses focus (on blur)
        input.addEventListener("blur", (e) => {
            const regex = regexInput[e.target.attributes.name.value]; // Get the corresponding regex for the input's name
            validate(e.target, regex || /.*/); // Run validation with the regex; if no regex is found, use /.*/ which matches any input (always passes)
        });
    });

    // Listen for clicks on the submit button and either prevent submission if disabled or handle the form submission
    contactFormSubmitButton.addEventListener("click", (e) => {
        if (contactFormSubmitButton.getAttribute("aria-disabled") === "true") {
            // Prevent form submission if the button is currently disabled (aria-disabled="true")
            e.preventDefault();
        } else {
            // Proceed with form submission logic (validation, captcha, cookies, etc.)
            handleFormSubmission(e);
        }
    });

    // Listen for keyboard activation (Enter or Space) on the submit button
    contactFormSubmitButton.addEventListener("keydown", (e) => {
        // Only handle if Enter or Space is pressed and button is not disabled
        if ((e.key === "Enter" || e.key === " ") && contactFormSubmitButton.getAttribute("aria-disabled") !== "true") {
            e.preventDefault();
            handleFormSubmission(e); // Proceed with form submission logic (validation, captcha, cookies, etc.)
        }
    });

    // Initial check of the form inputs to set submit button state on page load
    checkFormValidity();
});

// Set the copyright year dynamically to the current year based on the system date
const updateDate = new Date();
copyrightUpdateYear.textContent = updateDate.getFullYear();