"use strict"

// Monitor all focusable elements
document.addEventListener('focusin', (event) => {
    console.log('Focused element:', event.target);
}, true); // Using capture phase to catch all focus events

// const darkModeIconContainer = document.querySelector(".top-navigation-bar-dark-mode-icon-container");
// const lightModeIcon = document.querySelector(".fa-sun");
const hamburgerMenuIconContainer = document.querySelector(".hamburger-menu-container");
const topNavigationBarAccordionContainer = document.querySelector(".top-navigation-bar-accordion-container-hidden");
const laptopImageCode = document.querySelectorAll(".laptop-image-code");
const portfolioWebsitesShowMoreAccordionContainerButton = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-button");
const portfolioWebsitesShowMoreAccordionContainerShowLessText = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-button p");
const portfolioWebsitesShowMoreAccordionContainerShowMoreArrow = document.querySelectorAll(".portfolio-websites-show-more-arrow");
const portfolioWebsitesShowMoreAccordionContainer = document.querySelectorAll(".portfolio-websites-show-more-accordion-container");
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

document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggleButton = document.querySelector(".dark-mode-toggle-button");
    const darkModeIcon = darkModeToggleButton.querySelector(".fa-moon");
    const lightModeIcon = darkModeToggleButton.querySelector(".fa-sun");

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

            darkModeModalContainer = document.createElement("aside");
            darkModeModalContainer.setAttribute("class", "dark-mode-modal-container");

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
            darkModeModalSecondParagraph.textContent = 'If you click "Decline," your data for it will not be saved in local storage, and the website will not remember your preference.';
            darkModeModalContainer.appendChild(darkModeModalSecondParagraph);

            const darkModeModalAllowButton = document.createElement("button");
            darkModeModalAllowButton.setAttribute("class", "dark-mode-modal-allow-button");
            darkModeModalAllowButton.textContent = "Allow";

            const darkModeModalDeclineButton = document.createElement("button");
            darkModeModalDeclineButton.setAttribute("class", "dark-mode-modal-decline-button");
            darkModeModalDeclineButton.textContent = "Decline";

            darkModeModalContainer.appendChild(darkModeModalAllowButton);
            darkModeModalContainer.appendChild(darkModeModalDeclineButton);

            document.body.appendChild(darkModeModalOverlay);
            document.body.appendChild(darkModeModalContainer);

            darkModeModalAllowButton.addEventListener("click", () => {
                localStorage.setItem("darkModePreference", "enabled");
                enableDarkMode();
                document.body.removeChild(darkModeModalOverlay);
                document.body.removeChild(darkModeModalContainer);
            });

            darkModeModalDeclineButton.addEventListener("click", () => {
                document.body.removeChild(darkModeModalOverlay);
                document.body.removeChild(darkModeModalContainer);
            });
        }
    };

//Dark mode variables
const bodyDarkMode = document.querySelector("body");
const mainDarkMode = document.querySelector("main");
const landingPageBackgroundImage = document.querySelector(".landing-page-section-container");
const landingPageTitleWelcome = document.querySelector(".landing-page-title-welcome");
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
const laptopImageKey = document.querySelectorAll(".laptop-image-key");
const laptopImageBottomShell = document.querySelector(".laptop-image-bottom-shell");
const profileContentContainer = document.querySelector(".profile-content-container");
const profileQuotationContainer = document.querySelector(".profile-quotation-container");
const profileIntrodutionContainerParagraph = document.querySelectorAll(".profile-introduction-container p:not(.profile-introduction-container-greeting)");
const sectionIntroductionContainerTitle = document.querySelectorAll(".section-introduction-container h2");
const sectionIntroductionContainerParagraph = document.querySelectorAll(".section-introduction-container p");
const portfolioWebsitesTitle = document.querySelectorAll(".portfolio-websites-title-container h3");
const portfolioWebsitesContainer = document.querySelectorAll(".portfolio-websites-container");
const portfolioWebsitesShowMoreContainer = document.querySelectorAll(".portfolio-websites-show-more-container");
const portfolioWebsitesShowMoreAccordionContainerParagraph = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-paragraph");
const portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-technologies-used-title");
const portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedFigcaption = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-technology-used-container figcaption");
const contactFormTopHeaderContainer = document.querySelector(".contact-form-top-header-container");
const contactFormEnvelopeIcon = document.querySelector(".fa-envelope");
// const contactFormValid = document.querySelectorAll(".contact-form-valid");
// const contactFormInvalid = document.querySelectorAll(".contact-form-invalid");
const hCaptchaColor = document.querySelector(".h-captcha");
const footerSectionContainer = document.querySelector(".footer-section-container");
const footerBackToTopLink = document.querySelector("a.footer-navigation-link-backtotop");
const footerAbsoluteLink = document.querySelectorAll(".footer-absolute-links");
const footerBottomNavigationContainer = document.querySelector(".footer-bottom-navigation-container");

    function enableDarkMode() {
        darkModeIcon.style.visibility = "hidden";
        lightModeIcon.style.visibility = "visible";

        // Apply dark mode classes to other elements as needed
        mainDarkMode.classList.add("main-dark-mode");

        landingPageBackgroundImage.style.backgroundImage = "url('./assets/images/landing-page-image2.png')";

        landingPageTitleWelcome.classList.add("landing-page-title-welcome-dark-mode");

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
        
        laptopImageKey.forEach((key) => {
            key.classList.add("laptop-image-key-dark-mode");
        });
        
        laptopImageBottomShell.classList.add("laptop-image-bottom-shell-dark-mode");
        
        profileContentContainer.classList.add("profile-content-container-dark-mode");
        
        profileQuotationContainer.classList.add("profile-quotation-container-dark-mode");
        
        profileIntrodutionContainerParagraph.forEach((paragraph) =>{
            paragraph.classList.add("profile-introduction-container-paragraph-dark-mode");
        });
        
        sectionIntroductionContainerTitle.forEach((title) => {
            title.classList.add("section-introduction-container-h2-dark-mode");
        });
        
        sectionIntroductionContainerParagraph.forEach((paragraph) => {
            paragraph.classList.add("section-introduction-container-p-dark-mode");
            const thankYouForVisitingMyPortfolioParagraph = document.querySelector(".contact-introduction-container-p-highlighted-text");
            thankYouForVisitingMyPortfolioParagraph.classList.remove("section-introduction-container-p-dark-mode");
        });
        
        portfolioWebsitesTitle.forEach((websiteTitle) => {
            websiteTitle.classList.add("portfolio-websites-title-container-h3-dark-mode");
        });
        
        portfolioWebsitesContainer.forEach((background) => {
            background.classList.add("portfolio-websites-container-dark-mode");
        });
        
        portfolioWebsitesShowMoreContainer.forEach((background) => {
            background.classList.add("portfolio-websites-show-more-container-dark-mode");
        });
        
        portfolioWebsitesShowMoreAccordionContainerShowLessText.forEach((showMoreText) => {
            showMoreText.classList.add("portfolio-websites-show-more-accordion-container-button-p-dark-mode");
        });

        portfolioWebsitesShowMoreAccordionContainerShowMoreArrow.forEach((showMoreArrow) => {
            showMoreArrow.classList.add("portfolio-websites-show-more-arrow-dark-mode");
        });

        portfolioWebsitesShowMoreAccordionContainerParagraph.forEach((paragraph) => {
            paragraph.classList.add("portfolio-websites-show-more-accordion-container-paragraph-dark-mode");
        });
        
        portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle.forEach((title) => {
            title.classList.add("portfolio-websites-show-more-accordion-container-technologies-used-title-dark-mode");
        });
        
        portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedFigcaption.forEach((figcaption) => {
            figcaption.classList.add("portfolio-websites-show-more-accordion-container-technology-used-container-figcaption-dark-mode");
        });
        
        contactFormTopHeaderContainer.classList.add("contact-form-top-header-container-dark-mode");
        
        contactFormEnvelopeIcon.classList.add("fa-envelope-dark-mode");
        
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
        
        const stylePlaceholderColorDark = document.createElement("style");
        stylePlaceholderColorDark.textContent = placeholderColorDark;
        document.head.appendChild(stylePlaceholderColorDark);

        bodyDarkMode.classList.add("dark-mode"); //For the contact form input field to add the dark mode background when the form is valid and invalid
        
        // contactFormValid.forEach((input) => {
        //     input.classList.add("contact-form-valid-dark-mode");
        // });
        
        // contactFormInvalid.forEach((input) => {
        //     input.classList.add("contact-form-invalid-dark-mode");
        // });
        
        contactFormLabels.forEach((label) => {
            label.classList.add("contact-form-label-dark-mode");
        });
        
        hCaptchaColor.style.filter = "invert(1) hue-rotate(180deg)";
        
        footerSectionContainer.classList.add("footer-section-container-dark-mode");
        
        footerBackToTopLink.classList.add("footer-navigation-link-backtotop-dark-mode");
        
        footerAbsoluteLink.forEach((link) => {
            link.classList.add("footer-absolute-links-dark-mode");
        });
        
        footerBottomNavigationContainer.classList.add("footer-bottom-navigation-container-dark-mode");
    }

    function disableDarkMode() {
        lightModeIcon.style.visibility = "hidden";
        darkModeIcon.style.visibility = "visible";
        
        // Remove dark mode classes from other elements as needed
        mainDarkMode.classList.remove("main-dark-mode");
        
        landingPageBackgroundImage.style.backgroundImage = "url('./assets/images/landing-page-image1.png')";
        
        landingPageTitleWelcome.classList.remove("landing-page-title-welcome-dark-mode");

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
        
        laptopImageKey.forEach((key) => {
            key.classList.remove("laptop-image-key-dark-mode");
        });
        
        laptopImageBottomShell.classList.remove("laptop-image-bottom-shell-dark-mode");
        
        profileContentContainer.classList.remove("profile-content-container-dark-mode");

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
        
        portfolioWebsitesTitle.forEach((websiteTitle) => {
            websiteTitle.classList.remove("portfolio-websites-title-container-h3-dark-mode");
        });
        
        portfolioWebsitesContainer.forEach((background) => {
            background.classList.remove("portfolio-websites-container-dark-mode");
        });
        
        portfolioWebsitesShowMoreContainer.forEach((background) => {
            background.classList.remove("portfolio-websites-show-more-container-dark-mode");
        });

        portfolioWebsitesShowMoreAccordionContainerShowLessText.forEach((showMoreText) => {
            showMoreText.classList.remove("portfolio-websites-show-more-accordion-container-button-p-dark-mode");
        });

        portfolioWebsitesShowMoreAccordionContainerShowMoreArrow.forEach((showMoreArrow) => {
            showMoreArrow.classList.remove("portfolio-websites-show-more-arrow-dark-mode");
        });

        portfolioWebsitesShowMoreAccordionContainerParagraph.forEach((paragraph) => {
            paragraph.classList.remove("portfolio-websites-show-more-accordion-container-paragraph-dark-mode");
        });
        
        portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle.forEach((title) => {
            title.classList.remove("portfolio-websites-show-more-accordion-container-technologies-used-title-dark-mode");
        });
        
        portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedFigcaption.forEach((figcaption) => {
            figcaption.classList.remove("portfolio-websites-show-more-accordion-container-technology-used-container-figcaption-dark-mode");
        });
        
        contactFormTopHeaderContainer.classList.remove("contact-form-top-header-container-dark-mode");
        
        contactFormEnvelopeIcon.classList.remove("fa-envelope-dark-mode");
        
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
        
        const stylePlaceholderColorLight = document.createElement("style");
        stylePlaceholderColorLight.textContent = placeholderColorLight;
        document.head.appendChild(stylePlaceholderColorLight);

        bodyDarkMode.classList.remove("dark-mode"); //For the contact form input field to remove the dark mode background when the form is valid and invalid
        
        // contactFormValid.forEach((input) => {
        //     input.classList.remove("contact-form-valid-dark-mode");
        // });
        
        // contactFormInvalid.forEach((input) => {
        //     input.classList.remove("contact-form-invalid-dark-mode");
        // });
        
        contactFormLabels.forEach((label) => {
            label.classList.remove("contact-form-label-dark-mode");
        });
        
        hCaptchaColor.style.filter = "invert(0) hue-rotate(0deg)";
        
        footerSectionContainer.classList.remove("footer-section-container-dark-mode");
        
        footerBackToTopLink.classList.remove("footer-navigation-link-backtotop-dark-mode");
        
        footerAbsoluteLink.forEach((link) => {
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
hamburgerMenuIconContainer.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent scrolling on space key
        showMenu();
    }
});

function showMenu() {
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-hidden");
    topNavigationBarAccordionContainer.classList.toggle("top-navigation-bar-accordion-container-visible");
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
    laptopImageCode.forEach((element, index) => {
        if (isInViewport(element)) {
            setTimeout(() => {
                element.style.animation = "draw 15s linear forwards";
            }, index * 500);
        }
    });
}
window.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", function() {
    const portfolioWebsitesSliderContainers = document.querySelectorAll(".portfolio-websites-slider-container");
    const leftArrows = document.querySelectorAll(".portfolio-websites-slider-left-arrow");
    const rightArrows = document.querySelectorAll(".portfolio-websites-slider-right-arrow");

    // Function to show the current image and hide others
    function showImage(images, imageIndex) {
        images.forEach((image, i) => {
            image.style.display = (i === imageIndex) ? "block" : "none";
        });
    }

    // Function to initialize slider functionality
    function initializeSlider(sliderContainer, sliderContainerIndex) {
        const leftArrowElement = leftArrows[sliderContainerIndex];
        const rightArrowElement = rightArrows[sliderContainerIndex];
        const portfolioWebsitesSliderImages = sliderContainer.querySelectorAll(".portfolio-websites-slider-image");
        let currentIndex = 0;

        // Function to handle click on left arrow
        function handleLeftArrow() {
            currentIndex = (currentIndex === 0) ? portfolioWebsitesSliderImages.length - 1 : currentIndex - 1;
            showImage(portfolioWebsitesSliderImages, currentIndex);
        }

        // Function to handle click on right arrow
        function handleRightArrow() {
            currentIndex = (currentIndex === portfolioWebsitesSliderImages.length - 1) ? 0 : currentIndex + 1;
            showImage(portfolioWebsitesSliderImages, currentIndex);
        }

        // Add event listeners for click
        leftArrowElement.addEventListener("click", handleLeftArrow);
        rightArrowElement.addEventListener("click", handleRightArrow);

        // Add event listeners for keyboard accessibility
        leftArrowElement.addEventListener("keydown", function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent default space action
                handleLeftArrow();
            }
        });

rightArrowElement.addEventListener("keydown", function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent default space action
        handleRightArrow();
    }
});
        // Show the initial image
        showImage(portfolioWebsitesSliderImages, currentIndex);
    }

    // Initialize each slider
    portfolioWebsitesSliderContainers.forEach((sliderContainer, sliderContainerIndex) => {
        initializeSlider(sliderContainer, sliderContainerIndex);
    });

    // Function to update viewBox attributes based on window width
    function updateViewBox() {
        if (window.innerWidth <= 600) {
            leftArrows.forEach((arrow) => {
                arrow.setAttribute("viewBox", "-28 19 10 49");
            });
            rightArrows.forEach((arrow) => {
                arrow.setAttribute("viewBox", "-28 19 10 49");
            });
        } else {
            leftArrows.forEach((arrow) => {
                arrow.setAttribute("viewBox", "14 0 20 100");
            });
            rightArrows.forEach((arrow) => {
                arrow.setAttribute("viewBox", "14 0 20 100");
            });
        }
    }

    // Initial update
    updateViewBox();

    // Update on window resize
    window.addEventListener("resize", updateViewBox);
});

portfolioWebsitesShowMoreAccordionContainerButton.forEach((button, index) => {
    button.addEventListener("click", () => {
        portfolioWebsitesShowMoreAccordionContainer[index].classList.toggle("portfolio-websites-show-more-accordion-container");

        if (portfolioWebsitesShowMoreAccordionContainerShowLessText[index].textContent === "Show More") {
            portfolioWebsitesShowMoreAccordionContainerShowLessText[index].textContent = "Show Less";
            portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.transform = "rotate(180deg)";
            portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.margin = "-1em 0.30em 2em 0";           
        } else {
            portfolioWebsitesShowMoreAccordionContainerShowLessText[index].textContent = "Show More";
            portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.transform = "rotate(0deg)";
            portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.margin = "-1em 0 2em 0";
        }
    });
    button.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Prevent default behavior for space key which is scrolling
            portfolioWebsitesShowMoreAccordionContainer[index].classList.toggle("portfolio-websites-show-more-accordion-container");

            if (portfolioWebsitesShowMoreAccordionContainerShowLessText[index].textContent === "Show More") {
                portfolioWebsitesShowMoreAccordionContainerShowLessText[index].textContent = "Show Less";
                portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.transform = "rotate(180deg)";
                portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.margin = "-1em 0.30em 2em 0";           
            } else {
                portfolioWebsitesShowMoreAccordionContainerShowLessText[index].textContent = "Show More";
                portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.transform = "rotate(0deg)";
                portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.margin = "-1em 0 2em 0";
            }
        }
    });
});

contactFormInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value !== "") {
            contactFormLabels[index].style.margin = "-1.5em 0.5em";
        } else {
            contactFormLabels[index].style.margin = "0.25em 0.5em";
        }
        contactFormLabels[index].style.transition = "margin 0.35s ease";
    });
    // Check input values on page load
    if (input.value !== "") {
        contactFormLabels[index].style.margin = "-1.5em 0.5em";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Regex patterns for validating different input fields
    const regexInput = {
        name: /^(?!.*[.,'-]{2})[a-z.,'-]{2,30}[ ][a-z.,'-]{0,30}([ ]?)[a-z.,'-]{2,30}?$/i,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/,
        phone: /^\+44\d{10}$/
    };

    // Select validation message paragraphs and submit button
    const contactFormValidationParagraphName = document.querySelector(".contact-form-validation-paragraph.name");
    const contactFormValidationParagraphEmail = document.querySelector(".contact-form-validation-paragraph.email");
    const contactFormValidationParagraphPhone = document.querySelector(".contact-form-validation-paragraph.phone");
    const contactFormSubmitButton = document.querySelector(".contact-form-submit-button");

    // Ensure the submit button is always visible
    contactFormSubmitButton.style.visibility = "visible";

     // Add event listener for keydown events on the button
     contactFormSubmitButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Prevent default behavior for Space key (scrolling)
            contactFormSubmitButton.click(); // Trigger the button's click event
        }
    });

    // Function to set a session cookie
    function setSessionCookie() {
        const cookieValue = "sessionToken=uniqueSessionID123; path=/; SameSite=Lax";
        document.cookie = cookieValue;
    }

    // Validation function
    function validate(field, regex) {
        const isMessageField = field.id === "message";
        const isPhoneField = field.id === "phone";

        if (field.value.trim() === "") {
            // If the field is empty, reset its class and hide error messages
            field.className = "contact-form-input-box";
            if (isMessageField) {
                field.classList.add("contact-form-input-box-message");
            }
            if (document.body.classList.contains("dark-mode")) { //This is needed to stop the form input fields toggling from light mode/dark mode when the user empties the text from the input field
                field.classList.add("contact-form-input-box-dark-mode");
            }
            if (!isPhoneField && field.nextElementSibling) {
                field.nextElementSibling.style.visibility = "hidden";
            } else if (isPhoneField && contactFormValidationParagraphPhone) {
                contactFormValidationParagraphPhone.style.visibility = "hidden";
            }
        } else if (regex.test(field.value)) {
            // If the field value matches the regex, mark it as valid and hide error messages
            field.className = "contact-form-input-box contact-form-valid";
            if (isMessageField) {
                field.classList.add("contact-form-input-box-message");
            }
            if (document.body.classList.contains("dark-mode")) { //This is needed to stop the form input fields toggling from light mode/dark mode when the user empties the text from the input field
                field.classList.add("contact-form-valid-dark-mode");
            }
            if (field.id === "fullname" && contactFormValidationParagraphName) {
                contactFormValidationParagraphName.style.visibility = "hidden";
            } else if (field.id === "email" && contactFormValidationParagraphEmail) {
                contactFormValidationParagraphEmail.style.visibility = "hidden";
            } else if (isPhoneField && contactFormValidationParagraphPhone) {
                contactFormValidationParagraphPhone.style.visibility = "hidden";
            }
        } else {
            // If the field value does not match the regex, mark it as invalid and show error messages
            field.className = "contact-form-input-box contact-form-invalid";
            if (isMessageField) {
                field.classList.add("contact-form-input-box-message");
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("contact-form-invalid-dark-mode");

            }
            if (field.id === "fullname" && contactFormValidationParagraphName) {
                contactFormValidationParagraphName.style.visibility = "visible";
            } else if (field.id === "email" && contactFormValidationParagraphEmail) {
                contactFormValidationParagraphEmail.style.visibility = "visible";
            } else if (isPhoneField && contactFormValidationParagraphPhone) {
                contactFormValidationParagraphPhone.style.visibility = "visible";
            }
        }

        // Recheck the form validity to enable/disable the submit button
        checkFormValidity();
    }

    // Function to check the overall form validity
    function checkFormValidity() {
        let formIsValid = true;

        contactFormInputs.forEach(input => {
            if (input.classList.contains("contact-form-invalid") || (input.hasAttribute("required") && input.value.trim() === "")) {
                formIsValid = false;
            }
        });

        // Enable or disable the submit button based on the form validity
        contactFormSubmitButton.disabled = !formIsValid;
        contactFormSubmitButton.style.visibility = "visible";
    }

    // Attach event listeners to input fields for validation
    contactFormInputs.forEach((input) => {
        input.addEventListener("keyup", (e) => {
            const regex = regexInput[e.target.attributes.name.value];
            validate(e.target, regex || /.*/);
        });

        input.addEventListener("blur", (e) => {
            const regex = regexInput[e.target.attributes.name.value];
            validate(e.target, regex || /.*/);
        });
    });

    // Initial check to set the submit button state
    checkFormValidity();

    // Add event listener to the form submission
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            // Check if the form is valid
            let formIsValid = true;
            contactFormInputs.forEach(input => {
                if (input.classList.contains("contact-form-invalid") || (input.hasAttribute("required") && input.value.trim() === "")) {
                    formIsValid = false;
                }
            });

            // Check if hCaptcha is completed
            const hCaptchaResponse = document.querySelector('textarea[name="h-captcha-response"]').value;
            if (!hCaptchaResponse) {
                let formIsValid = false;

                let hcaptchaModalContainer = document.querySelector(".hcaptcha-modal-container");
                let hcaptchaModalOverlay = document.querySelector(".hcaptcha-modal-overlay");

                // Check if the modal and overlay already exist
                if (!hcaptchaModalContainer) {
                    // Create the overlay
                    hcaptchaModalOverlay = document.createElement("div");
                    hcaptchaModalOverlay.setAttribute("class", "hcaptcha-modal-overlay");
                    
                    // Create the modal
                    hcaptchaModalContainer = document.createElement("aside");
                    hcaptchaModalContainer.setAttribute("class", "hcaptcha-modal-container");

                    const hcaptchaModalTitle = document.createElement("p");
                    hcaptchaModalTitle.setAttribute("class", "hcaptcha-modal-title");
                    hcaptchaModalTitle.textContent = "Alert!";
                    hcaptchaModalContainer.appendChild(hcaptchaModalTitle);

                    const hcaptchaModalFirstParagraph = document.createElement("p");
                    hcaptchaModalFirstParagraph.setAttribute("class", "hcaptcha-modal-first-paragraph");
                    hcaptchaModalFirstParagraph.textContent = "Please make sure you are human!";
                    hcaptchaModalContainer.appendChild(hcaptchaModalFirstParagraph);

                    const hcaptchaModalOkButton = document.createElement("button");
                    hcaptchaModalOkButton.setAttribute("class", "hcaptcha-modal-ok-button");
                    hcaptchaModalOkButton.textContent = "Ok";
                    hcaptchaModalContainer.appendChild(hcaptchaModalOkButton);

                    document.body.appendChild(hcaptchaModalOverlay);
                    document.body.appendChild(hcaptchaModalContainer);

                    hcaptchaModalOkButton.addEventListener("click", () => {
                        document.body.removeChild(hcaptchaModalOverlay);
                        document.body.removeChild(hcaptchaModalContainer);
                    });
                }
                return;
            }

            if (formIsValid) {
                setSessionCookie(); // Set the session cookie
                form.submit(); // Manually submit the form
            }
        });
    }
});

const updateDate = new Date();
copyrightUpdateYear.textContent = updateDate.getFullYear();