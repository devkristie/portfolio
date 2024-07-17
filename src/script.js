"use strict"

const darkModeIconContainer = document.querySelector(".top-navigation-bar-dark-mode-icon-container ul");
const lightModeIcon = document.querySelector(".fa-sun");
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

darkModeIconContainer.addEventListener("click", () => {
    const darkModePreference = localStorage.getItem("darkModePreference");

    if (darkModePreference === null) {
        // Show the dark mode pop-up box if no preference is set
        const darkModePopUpBox = document.createElement("aside");
        darkModePopUpBox.setAttribute("class", "dark-mode-popup-box-container");

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

function enableDarkMode() {
    darkModeIconContainer.style.visibility = "hidden";
    lightModeIcon.style.visibility = "visible";

    // Apply dark mode classes to other elements as needed
    const mainDarkMode = document.querySelector("main");
    mainDarkMode.classList.add("main-dark-mode");

    const landingPageBackgroundImage = document.querySelector(".landing-page-section-container");
    landingPageBackgroundImage.style.backgroundImage = "url('./assets/images/landing-page-image2.png')";

    const landingPageTitleWelcome = document.querySelector(".landing-page-title-welcome");
    landingPageTitleWelcome.classList.add("landing-page-title-welcome-dark-mode");

    const landingPageTitleOpeningCurlyBrace = document.querySelector(".landing-page-title-opening-curly-brace");
    landingPageTitleOpeningCurlyBrace.classList.add("landing-page-title-opening-curly-brace-dark-mode");
    
    const landingPageTitleToMy = document.querySelector(".landing-page-title-property-value-to-my");
    landingPageTitleToMy.classList.add("landing-page-title-property-value-to-my-dark-mode");
    
    const landingPageTitleFrontEnd = document.querySelector(".landing-page-title-property-value-front-end");
    landingPageTitleFrontEnd.classList.add("landing-page-title-property-value-front-end-dark-mode");
    
    const landingPageTitleDevelopment = document.querySelector(".landing-page-title-property-development");
    landingPageTitleDevelopment.classList.add("landing-page-title-property-development-dark-mode");
    
    const landingPageTitleSemicolon = document.querySelector(".landing-page-title-value-semicolon");
    landingPageTitleSemicolon.classList.add("landing-page-title-value-semicolon-dark-mode");
    
    const landingPageTitleClosingCurlyBrace = document.querySelector(".landing-page-title-closing-curly-brace");
    landingPageTitleClosingCurlyBrace.classList.add("landing-page-title-closing-curly-brace-dark-mode");
    
    const laptopImageTopShell = document.querySelector(".laptop-image-top-shell");
    laptopImageTopShell.classList.add("laptop-image-top-shell-dark-mode");
    
    const laptopImageWebcam = document.querySelector(".laptop-image-webcam");
    laptopImageWebcam.classList.add("laptop-image-webcam-dark-mode");
    
    const laptopImageKey = document.querySelectorAll(".laptop-image-key");
    laptopImageKey.forEach((key) => {
        key.classList.add("laptop-image-key-dark-mode");
    });
    
    const laptopImageBottomShell = document.querySelector(".laptop-image-bottom-shell");
    laptopImageBottomShell.classList.add("laptop-image-bottom-shell-dark-mode");
    
    const profileContentContainer = document.querySelector(".profile-content-container");
    profileContentContainer.classList.add("profile-content-container-dark-mode");
    
    const profileQuotationContainer = document.querySelector(".profile-quotation-container");
    profileQuotationContainer.classList.add("profile-quotation-container-dark-mode");
    
    const profileIntrodutionContainerParagraph = document.querySelectorAll(".profile-introduction-container p:not(.profile-introduction-container-greeting)");
    profileIntrodutionContainerParagraph.forEach((paragraph) =>{
        paragraph.classList.add("profile-introduction-container-paragraph-dark-mode");
    });
    
    const sectionIntroductionContainerTitle = document.querySelectorAll(".section-introduction-container h2");
    sectionIntroductionContainerTitle.forEach((title) => {
        title.classList.add("section-introduction-container-h2-dark-mode");
    });
    
    const sectionIntroductionContainerParagraph = document.querySelectorAll(".section-introduction-container p");
    sectionIntroductionContainerParagraph.forEach((paragraph) => {
        paragraph.classList.add("section-introduction-container-p-dark-mode");
        const thankYouForVisitingMyPortfolioParagraph = document.querySelector(".contact-introduction-container-p-highlighted-text");
        thankYouForVisitingMyPortfolioParagraph.classList.remove("section-introduction-container-p-dark-mode");
    });
    
    const portfolioWebsitesTitle = document.querySelectorAll(".portfolio-websites-title-container h3");
    portfolioWebsitesTitle.forEach((websiteTitle) => {
        websiteTitle.classList.add("portfolio-websites-title-container-h3-dark-mode");
    });
    
    const portfolioWebsitesContainer = document.querySelectorAll(".portfolio-websites-container");
    portfolioWebsitesContainer.forEach((background) => {
        background.classList.add("portfolio-websites-container-dark-mode");
    });
    
    const portfolioWebsitesShowMoreContainer = document.querySelectorAll(".portfolio-websites-show-more-container");
    portfolioWebsitesShowMoreContainer.forEach((background) => {
        background.classList.add("portfolio-websites-show-more-container-dark-mode");
    });
    
    portfolioWebsitesShowMoreAccordionContainerShowLessText.forEach((showMoreText) => {
        showMoreText.classList.add("portfolio-websites-show-more-accordion-container-button-p-dark-mode");
    });

    portfolioWebsitesShowMoreAccordionContainerShowMoreArrow.forEach((showMoreArrow) => {
        showMoreArrow.classList.add("portfolio-websites-show-more-arrow-dark-mode");
    });

    const portfolioWebsitesShowMoreAccordionContainerParagraph = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-paragraph");
    portfolioWebsitesShowMoreAccordionContainerParagraph.forEach((paragraph) => {
        paragraph.classList.add("portfolio-websites-show-more-accordion-container-paragraph-dark-mode");
    });
    
    const portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-technologies-used-title");
    portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle.forEach((title) => {
        title.classList.add("portfolio-websites-show-more-accordion-container-technologies-used-title-dark-mode");
    });
    
    const portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedFigcaption = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-technology-used-container figcaption");
    portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedFigcaption.forEach((figcaption) => {
        figcaption.classList.add("portfolio-websites-show-more-accordion-container-technology-used-container-figcaption-dark-mode");
    });
    
    const contactFormTopHeaderContainer = document.querySelector(".contact-form-top-header-container");
    contactFormTopHeaderContainer.classList.add("contact-form-top-header-container-dark-mode");
    
    const contactFormEnvelopeIcon = document.querySelector(".fa-envelope");
    contactFormEnvelopeIcon.classList.add("fa-envelope-dark-mode");
    
    contactFormInputs.forEach((input) => {
        input.classList.add("contact-form-input-box-dark-mode");    
    });

    const placeholderColor = `
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
    
    const stylePlaceholderColor = document.createElement("style");
    stylePlaceholderColor.textContent = placeholderColor;
    document.head.appendChild(stylePlaceholderColor);

    document.body.classList.add("dark-mode"); //For the contact form input field to add the dark mode background when the form is valid and invalid
    
    document.querySelectorAll(".contact-form-valid").forEach((input) => {
        input.classList.add("contact-form-valid-dark-mode");
    });
    
    document.querySelectorAll(".contact-form-invalid").forEach((input) => {
        input.classList.add("contact-form-invalid-dark-mode");
    });
    
    contactFormLabels.forEach((label) => {
        label.classList.add("contact-form-label-dark-mode");
    });
    
    const hCaptchaColor = document.querySelector(".h-captcha");
    hCaptchaColor.style.filter = "invert(1) hue-rotate(180deg)";
    
    const footerSectionContainer = document.querySelector(".footer-section-container");
    footerSectionContainer.classList.add("footer-section-container-dark-mode");
    
    const footerBackToTopLink = document.querySelector("a.footer-navigation-link-backtotop");
    footerBackToTopLink.classList.add("footer-navigation-link-backtotop-dark-mode");
    
    const footerAbsoluteLink = document.querySelectorAll(".footer-absolute-links");
    footerAbsoluteLink.forEach((link) => {
        link.classList.add("footer-absolute-links-dark-mode");
    });
    
    const footerBottomNavigationContainer = document.querySelector(".footer-bottom-navigation-container");
    footerBottomNavigationContainer.classList.add("footer-bottom-navigation-container-dark-mode");
}

function disableDarkMode() {
    lightModeIcon.style.visibility = "hidden";
    darkModeIconContainer.style.visibility = "visible";
    
    // Remove dark mode classes from other elements as needed
    const mainDarkMode = document.querySelector("main");
    mainDarkMode.classList.remove("main-dark-mode");
    
    const landingPageBackgroundImage = document.querySelector(".landing-page-section-container");
    landingPageBackgroundImage.style.backgroundImage = "url('./assets/images/landing-page-image1.png')";
    
    const landingPageTitleWelcome = document.querySelector(".landing-page-title-welcome");
    landingPageTitleWelcome.classList.remove("landing-page-title-welcome-dark-mode");
    
    const landingPageTitleOpeningCurlyBrace = document.querySelector(".landing-page-title-opening-curly-brace");
    landingPageTitleOpeningCurlyBrace.classList.remove("landing-page-title-opening-curly-brace-dark-mode");
    
    const landingPageTitleToMy = document.querySelector(".landing-page-title-property-value-to-my");
    landingPageTitleToMy.classList.remove("landing-page-title-property-value-to-my-dark-mode");
    
    const landingPageTitleFrontEnd = document.querySelector(".landing-page-title-property-value-front-end");
    landingPageTitleFrontEnd.classList.remove("landing-page-title-property-value-front-end-dark-mode");
    
    const landingPageTitleDevelopment = document.querySelector(".landing-page-title-property-development");
    landingPageTitleDevelopment.classList.remove("landing-page-title-property-development-dark-mode");
    
    const landingPageTitleSemicolon = document.querySelector(".landing-page-title-value-semicolon");
    landingPageTitleSemicolon.classList.remove("landing-page-title-value-semicolon-dark-mode");
    
    const landingPageTitleClosingCurlyBrace = document.querySelector(".landing-page-title-closing-curly-brace");
    landingPageTitleClosingCurlyBrace.classList.remove("landing-page-title-closing-curly-brace-dark-mode");
    
    const laptopImageTopShell = document.querySelector(".laptop-image-top-shell");
    laptopImageTopShell.classList.remove("laptop-image-top-shell-dark-mode");
    
    const laptopImageWebcam = document.querySelector(".laptop-image-webcam");
    laptopImageWebcam.classList.remove("laptop-image-webcam-dark-mode");
    
    const laptopImageKey = document.querySelectorAll(".laptop-image-key");
    laptopImageKey.forEach((key) => {
        key.classList.remove("laptop-image-key-dark-mode");
    });
    
    const laptopImageBottomShell = document.querySelector(".laptop-image-bottom-shell");
    laptopImageBottomShell.classList.remove("laptop-image-bottom-shell-dark-mode");
    
    const profileContentContainer = document.querySelector(".profile-content-container");
    profileContentContainer.classList.remove("profile-content-container-dark-mode");

    const profileQuotationContainer = document.querySelector(".profile-quotation-container");
    profileQuotationContainer.classList.remove("profile-quotation-container-dark-mode");
    
    const profileIntrodutionContainerParagraph = document.querySelectorAll(".profile-introduction-container p:not(.profile-introduction-container-greeting)");
    profileIntrodutionContainerParagraph.forEach((paragraph) =>{
        paragraph.classList.remove("profile-introduction-container-paragraph-dark-mode");
    });
    
    const sectionIntroductionContainerTitle = document.querySelectorAll(".section-introduction-container h2");
    sectionIntroductionContainerTitle.forEach((title) => {
        title.classList.remove("section-introduction-container-h2-dark-mode");
    });
    
    const sectionIntroductionContainerParagraph = document.querySelectorAll(".section-introduction-container p");
    sectionIntroductionContainerParagraph.forEach((paragraph) => {
        paragraph.classList.remove("section-introduction-container-p-dark-mode");
    });
    
    const portfolioWebsitesTitle = document.querySelectorAll(".portfolio-websites-title-container h3");
    portfolioWebsitesTitle.forEach((websiteTitle) => {
        websiteTitle.classList.remove("portfolio-websites-title-container-h3-dark-mode");
    });
    
    const portfolioWebsitesContainer = document.querySelectorAll(".portfolio-websites-container");
    portfolioWebsitesContainer.forEach((background) => {
        background.classList.remove("portfolio-websites-container-dark-mode");
    });
    
    const portfolioWebsitesShowMoreContainer = document.querySelectorAll(".portfolio-websites-show-more-container");
    portfolioWebsitesShowMoreContainer.forEach((background) => {
        background.classList.remove("portfolio-websites-show-more-container-dark-mode");
    });

    portfolioWebsitesShowMoreAccordionContainerShowLessText.forEach((showMoreText) => {
        showMoreText.classList.remove("portfolio-websites-show-more-accordion-container-button-p-dark-mode");
    });

    portfolioWebsitesShowMoreAccordionContainerShowMoreArrow.forEach((showMoreArrow) => {
        showMoreArrow.classList.remove("portfolio-websites-show-more-arrow-dark-mode");
    });

    const portfolioWebsitesShowMoreAccordionContainerParagraph = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-paragraph");
    portfolioWebsitesShowMoreAccordionContainerParagraph.forEach((paragraph) => {
        paragraph.classList.remove("portfolio-websites-show-more-accordion-container-paragraph-dark-mode");
    });
    
    const portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-technologies-used-title");
    portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedTitle.forEach((title) => {
        title.classList.remove("portfolio-websites-show-more-accordion-container-technologies-used-title-dark-mode");
    });
    
    const portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedFigcaption = document.querySelectorAll(".portfolio-websites-show-more-accordion-container-technology-used-container figcaption");
    portfolioWebsitesShowMoreAccordionContainerTechnologiesUsedFigcaption.forEach((figcaption) => {
        figcaption.classList.remove("portfolio-websites-show-more-accordion-container-technology-used-container-figcaption-dark-mode");
    });
    
    const contactFormTopHeaderContainer = document.querySelector(".contact-form-top-header-container");
    contactFormTopHeaderContainer.classList.remove("contact-form-top-header-container-dark-mode");
    
    const contactFormEnvelopeIcon = document.querySelector(".fa-envelope");
    contactFormEnvelopeIcon.classList.remove("fa-envelope-dark-mode");
    
    contactFormInputs.forEach((input) => {
        input.classList.remove("contact-form-input-box-dark-mode");    
    });

    const placeholderColor = `
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
    
    const stylePlaceholderColor = document.createElement("style");
    stylePlaceholderColor.textContent = placeholderColor;
    document.head.appendChild(stylePlaceholderColor);

    document.body.classList.remove("dark-mode"); //For the contact form input field to remove the dark mode background when the form is valid and invalid
    
    document.querySelectorAll(".contact-form-valid").forEach((input) => {
        input.classList.remove("contact-form-valid-dark-mode");
    });
    
    document.querySelectorAll(".contact-form-invalid").forEach((input) => {
        input.classList.remove("contact-form-invalid-dark-mode");
    });
    
    contactFormLabels.forEach((label) => {
        label.classList.remove("contact-form-label-dark-mode");
    });
    
    const hCaptchaColor = document.querySelector(".h-captcha");
    hCaptchaColor.style.filter = "invert(0) hue-rotate(0deg)";
    
    const footerSectionContainer = document.querySelector(".footer-section-container");
    footerSectionContainer.classList.remove("footer-section-container-dark-mode");
    
    const footerBackToTopLink = document.querySelector("a.footer-navigation-link-backtotop");
    footerBackToTopLink.classList.remove("footer-navigation-link-backtotop-dark-mode");
    
    const footerAbsoluteLink = document.querySelectorAll(".footer-absolute-links");
    footerAbsoluteLink.forEach((link) => {
        link.classList.remove("footer-absolute-links-dark-mode");
    });
    
    const footerBottomNavigationContainer = document.querySelector(".footer-bottom-navigation-container");
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
        leftArrowElement.addEventListener("click", function() {
            currentIndex = (currentIndex === 0) ? portfolioWebsitesSliderImages.length - 1 : currentIndex - 1;
            showImage(portfolioWebsitesSliderImages, currentIndex);
        });

        // Function to handle click on right arrow
        rightArrowElement.addEventListener("click", function() {
            currentIndex = (currentIndex === portfolioWebsitesSliderImages.length - 1) ? 0 : currentIndex + 1;
            showImage(portfolioWebsitesSliderImages, currentIndex);
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
        // portfolioWebsitesShowMoreAccordionContainer[index].classList.toggle("portfolio-website-content-container");

        if (portfolioWebsitesShowMoreAccordionContainerShowLessText[index].textContent === "Show More") {
            portfolioWebsitesShowMoreAccordionContainerShowLessText[index].textContent = "Show Less";
            portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.transform = "rotate(180deg)";
            portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.margin = "-1rem 0.30rem 2rem 0";           
        } else {
            portfolioWebsitesShowMoreAccordionContainerShowLessText[index].textContent = "Show More";
            portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.transform = "rotate(0deg)";
            portfolioWebsitesShowMoreAccordionContainerShowMoreArrow[index].style.margin = "-1rem 0 2rem 0";
        }
    });
});

contactFormInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value !== "") {
            contactFormLabels[index].style.margin = "-1.5rem 0.5rem";
        } else {
            contactFormLabels[index].style.margin = "0.25rem 0.5rem";
        }
        contactFormLabels[index].style.transition = "margin 0.35s ease";
    });
    // Check input values on page load
    if (input.value !== "") {
        contactFormLabels[index].style.margin = "-1.5rem 0.5rem";
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
            if (document.body.classList.contains("dark-mode")) {
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
            if (document.body.classList.contains("dark-mode")) {
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
                formIsValid = false;
                alert("Please complete the captcha.");
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