"use strict"

const moonIcon = document.querySelector(".dark-mode-icon-container ul");
const moon = document.querySelector(".fa-moon");
const sunIcon = document.querySelector(".fa-sun");
const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const topNavBarShow = document.querySelector(".accordion-navigation-bar-hide");
const showMoreButton = document.querySelectorAll(".show-more-button");
const showMore = document.querySelectorAll(".show-more-accordion");
const showMoreArrow = document.querySelectorAll(".show-more-arrow");
const showLessText = document.querySelectorAll(".show-more-button p");
const laptopImageCode1 = document.querySelectorAll(".laptop-image-code1");
const contactFormClicked = document.querySelectorAll(".form-input");
const contactFormLabels = document.querySelectorAll("label");
const copyrightUpdateYear = document.querySelector(".footer-copyright-year");

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

function enableDarkMode() {
    document.body.classList.add("dark-mode");
    moonIcon.style.visibility = "hidden";
    sunIcon.style.visibility = "visible";

    // Apply dark mode classes to other elements as needed
    const mainDarkMode = document.querySelector("main");
    mainDarkMode.classList.add("main-dark-mode");

    const landingPageBackground = document.querySelector(".landing-page-title");
    landingPageBackground.style.backgroundImage = "url('./assets/images/landing-page-image2.png')";

    const landingPageTitleP1 = document.querySelector(".p1");
    landingPageTitleP1.classList.add("p1-dark-mode");

    const landingPageTitleP2 = document.querySelector(".p2");
    landingPageTitleP2.classList.add("p2-dark-mode");
    
    const landingPageTitleP3 = document.querySelector(".p3");
    landingPageTitleP3.classList.add("p3-dark-mode");
    
    const landingPageTitleP4 = document.querySelector(".p4");
    landingPageTitleP4.classList.add("p4-dark-mode");
    
    const landingPageTitleP5 = document.querySelector(".p5");
    landingPageTitleP5.classList.add("p5-dark-mode");
    
    const landingPageTitleP7 = document.querySelector(".p7");
    landingPageTitleP7.classList.add("p7-dark-mode");
    
    const landingPageTitleP8 = document.querySelector(".p8");
    landingPageTitleP8.classList.add("p8-dark-mode");
    
    const laptopImage1 = document.querySelector(".laptop-image1");
    laptopImage1.classList.add("laptop-image1-dark-mode");
    
    const laptopImage2 = document.querySelector(".laptop-image2");
    laptopImage2.classList.add("laptop-image2-dark-mode");
    
    const laptopImage9 = document.querySelectorAll(".laptop-image9");
    laptopImage9.forEach((key) => {
        key.classList.add("laptop-image9-dark-mode");
    });
    
    const laptopImage10 = document.querySelector(".laptop-image10");
    laptopImage10.classList.add("laptop-image10-dark-mode");
    
    const profileContainerBackground = document.querySelector(".profile-content-container-background");
    profileContainerBackground.classList.add("profile-content-container-background-dark-mode");
    
    const quotationBackground = document.querySelector(".quotation-container-background");
    quotationBackground.classList.add("quotation-container-background-dark-mode");
    
    const profileParagraphs = document.querySelectorAll(".profile-content-container p:not(.profile-content-greeting)");
    profileParagraphs.forEach((paragraph) =>{
        paragraph.classList.add("profile-content-container-paragraph-dark-mode");
    });
    
    const sectionTitles = document.querySelectorAll(".section-introduction-container h2");
    sectionTitles.forEach((title) => {
        title.classList.add("h2-dark-mode");
    });
    
    const sectionParagraphs = document.querySelectorAll(".section-introduction-container p");
    sectionParagraphs.forEach((paragraph) => {
        paragraph.classList.add("p-dark-mode");
        const thankYouParagraph = document.querySelector(".contact-introduction-thank-you-text");
        thankYouParagraph.classList.remove("p-dark-mode");
    });

    const portfolioWebsiteTitleBackgrounds = document.querySelectorAll(".portfolio-website-title-container");
    portfolioWebsiteTitleBackgrounds.forEach((background) => {
        background.classList.add("portfolio-website-title-container-dark-mode");
    });
    
    const portfolioWebsiteTitle = document.querySelectorAll(".portfolio-website-title-container h3");
    portfolioWebsiteTitle.forEach((websiteTitle) => {
        websiteTitle.classList.add("portfolio-website-title-dark-mode");
    });
    
    const portfolioSliderBackground = document.querySelectorAll(".portfolio-website-flex-container");
    portfolioSliderBackground.forEach((background) => {
        background.classList.add("portfolio-website-flex-container-dark-mode");
    });
    
    const portfolioWebsiteContentAccordion = document.querySelectorAll(".portfolio-website-content-container-accordion");
    portfolioWebsiteContentAccordion.forEach((background) => {
        background.classList.add("portfolio-website-content-container-accordion-dark-mode");
    });
    
    const showMoreAccordionContent = document.querySelectorAll(".hidden");
    showMoreAccordionContent.forEach((content) => {
        content.classList.add("hidden-dark-mode");
    });
    
    const showMoreDarkMode = document.querySelectorAll(".show-more-button p");
    showMoreDarkMode.forEach((show) => {
        show.classList.add("p-dark-mode");
    });
    
    const showMoreArrowDarkMode = document.querySelectorAll(".show-more-arrow");
    showMoreArrowDarkMode.forEach((show) => {
        show.classList.add("show-more-arrow-dark-mode");
    });
    
    const technologiesUsedTitle = document.querySelectorAll(".technologies-used-title");
    technologiesUsedTitle.forEach((title) => {
        title.classList.add("technologies-used-title-dark-mode");
    });
    
    const technologiesUsedFigcaption = document.querySelectorAll(".technology-used-container figcaption");
    technologiesUsedFigcaption.forEach((figcaption) => {
        figcaption.classList.add("figcaption-dark-mode");
    });
    
    const contactFormTopBackground = document.querySelector(".contact-form-top-background");
    contactFormTopBackground.classList.add("contact-form-top-background-dark-mode");
    
    const contactFormEnvelope = document.querySelector(".fa-envelope");
    contactFormEnvelope.classList.add("dark-mode");
    
    const formInputBackground = document.querySelectorAll(".form-input");
    formInputBackground.forEach((input) => {
        input.classList.add("form-input-dark-mode");    
    });
    
    document.querySelectorAll(".form-input").forEach((input) => {
        input.classList.add("form-input-dark-mode");
    });
    
    document.querySelectorAll(".valid").forEach((input) => {
        input.classList.add("valid-dark-mode");
    });
    
    document.querySelectorAll(".invalid").forEach((input) => {
        input.classList.add("invalid-dark-mode");
    });
    
    const labels = document.querySelectorAll("label");
    labels.forEach((label) => {
        label.classList.add("label-dark-mode");
    });
    
    const placeholderStyle = `
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
    
    const styleElement = document.createElement("style");
    styleElement.textContent = placeholderStyle;
    document.head.appendChild(styleElement);
    
    const hCaptchaElement = document.querySelector(".h-captcha");
    hCaptchaElement.style.filter = "invert(1) hue-rotate(180deg)";
    
    const footerDarkMode = document.querySelector(".footer-content");
    footerDarkMode.classList.add("footer-content-dark-mode");
    
    const backToTopLinkDarkMode = document.querySelector("a.footer-link-backtotop");
    backToTopLinkDarkMode.classList.add("footer-link-back-to-top-dark-mode");
    
    const absoluteFooterLinksDarkMode = document.querySelectorAll(".absolute-footer-links");
    absoluteFooterLinksDarkMode.forEach((link) => {
        link.classList.add("absolute-footer-links-dark-mode");
    });
    
    const footerBottomBackground = document.querySelector(".footer-bottom");
    footerBottomBackground.classList.add("footer-bottom-dark-mode");
}

function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    sunIcon.style.visibility = "hidden";
    moonIcon.style.visibility = "visible";
    
    // Remove dark mode classes from other elements as needed
    const mainDarkMode = document.querySelector("main");
    mainDarkMode.classList.remove("main-dark-mode");
    
    const landingPageBackground = document.querySelector(".landing-page-title");
    landingPageBackground.style.backgroundImage = "url('./assets/images/landing-page-image1.png')";
    
    const landingPageTitleP1 = document.querySelector(".p1");
    landingPageTitleP1.classList.remove("p1-dark-mode");
    
    const landingPageTitleP2 = document.querySelector(".p2");
    landingPageTitleP2.classList.remove("p2-dark-mode");
    
    const landingPageTitleP3 = document.querySelector(".p3");
    landingPageTitleP3.classList.remove("p3-dark-mode");
    
    const landingPageTitleP4 = document.querySelector(".p4");
    landingPageTitleP4.classList.remove("p4-dark-mode");
    
    const landingPageTitleP5 = document.querySelector(".p5");
    landingPageTitleP5.classList.remove("p5-dark-mode");
    
    const landingPageTitleP7 = document.querySelector(".p7");
    landingPageTitleP7.classList.remove("p7-dark-mode");
    
    const landingPageTitleP8 = document.querySelector(".p8");
    landingPageTitleP8.classList.remove("p8-dark-mode");
    
    const laptopImage1 = document.querySelector(".laptop-image1");
    laptopImage1.classList.remove("laptop-image1-dark-mode");
    
    const laptopImage2 = document.querySelector(".laptop-image2");
    laptopImage2.classList.remove("laptop-image2-dark-mode");
    
    const laptopImage9 = document.querySelectorAll(".laptop-image9");
    laptopImage9.forEach((key) => {
        key.classList.remove("laptop-image9-dark-mode");
    });
    
    const laptopImage10 = document.querySelector(".laptop-image10");
    laptopImage10.classList.remove("laptop-image10-dark-mode");
    
    const profileContainerBackground = document.querySelector(".profile-content-container-background");
    profileContainerBackground.classList.remove("profile-content-container-background-dark-mode");

    const quotationBackground = document.querySelector(".quotation-container-background");
    quotationBackground.classList.remove("quotation-container-background-dark-mode");
    
    const profileParagraphs = document.querySelectorAll(".profile-content-container p:not(.profile-content-greeting)");
    profileParagraphs.forEach((paragraph) =>{
        paragraph.classList.remove("profile-content-container-paragraph-dark-mode");
    });
    
    const sectionTitles = document.querySelectorAll(".section-introduction-container h2");
    sectionTitles.forEach((title) => {
        title.classList.remove("h2-dark-mode");
    });
    
    const sectionParagraphs = document.querySelectorAll(".section-introduction-container p");
    sectionParagraphs.forEach((paragraph) => {
        paragraph.classList.remove("p-dark-mode");
    });
    
    const portfolioWebsiteTitleBackgrounds = document.querySelectorAll(".portfolio-website-title-container");
    portfolioWebsiteTitleBackgrounds.forEach((background) => {
        background.classList.remove("portfolio-website-title-container-dark-mode");
    });
    
    const portfolioWebsiteTitle = document.querySelectorAll(".portfolio-website-title-container h3");
    portfolioWebsiteTitle.forEach((websiteTitle) => {
        websiteTitle.classList.remove("portfolio-website-title-dark-mode");
    });
    
    const portfolioSliderBackground = document.querySelectorAll(".portfolio-website-flex-container");
    portfolioSliderBackground.forEach((background) => {
        background.classList.remove("portfolio-website-flex-container-dark-mode");
    });
    
    const portfolioWebsiteContentAccordion = document.querySelectorAll(".portfolio-website-content-container-accordion");
    portfolioWebsiteContentAccordion.forEach((background) => {
        background.classList.remove("portfolio-website-content-container-accordion-dark-mode");
    });
    
    const showMoreAccordionContent = document.querySelectorAll(".hidden");
    showMoreAccordionContent.forEach((content) => {
        content.classList.remove("hidden-dark-mode");
    });
    
    const showMoreDarkMode = document.querySelectorAll(".show-more-button p");
    showMoreDarkMode.forEach((show) => {
        show.classList.remove("p-dark-mode");
    });
    
    const showMoreArrowDarkMode = document.querySelectorAll(".show-more-arrow");
    showMoreArrowDarkMode.forEach((show) => {
        show.classList.remove("show-more-arrow-dark-mode");
    });
    
    const technologiesUsedTitle = document.querySelectorAll(".technologies-used-title");
    technologiesUsedTitle.forEach((title) => {
        title.classList.remove("technologies-used-title-dark-mode");
    });
    
    const technologiesUsedFigcaption = document.querySelectorAll(".technology-used-container figcaption");
    technologiesUsedFigcaption.forEach((figcaption) => {
        figcaption.classList.remove("figcaption-dark-mode");
    });
    
    const contactFormTopBackground = document.querySelector(".contact-form-top-background");
    contactFormTopBackground.classList.remove("contact-form-top-background-dark-mode");
    
    const contactFormEnvelope = document.querySelector(".fa-envelope");
    contactFormEnvelope.classList.remove("dark-mode");
    
    const formInputBackground = document.querySelectorAll(".form-input");
    formInputBackground.forEach((input) => {
        input.classList.remove("form-input-dark-mode");    
    });
    
    document.querySelectorAll(".form-input").forEach((input) => {
        input.classList.remove("form-input-dark-mode");
    });
    
    document.querySelectorAll(".valid").forEach((input) => {
        input.classList.remove("valid-dark-mode");
    });
    
    document.querySelectorAll(".invalid").forEach((input) => {
        input.classList.remove("invalid-dark-mode");
    });
    
    const labels = document.querySelectorAll("label");
    labels.forEach((label) => {
        label.classList.remove("label-dark-mode");
    });
    
    const placeholderStyle = `
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
    
    const styleElement = document.createElement("style");
    styleElement.textContent = placeholderStyle;
    document.head.appendChild(styleElement);
    
    const hCaptchaElement = document.querySelector(".h-captcha");
    hCaptchaElement.style.filter = "invert(0) hue-rotate(0deg)";
    
    const footerDarkMode = document.querySelector(".footer-content");
    footerDarkMode.classList.remove("footer-content-dark-mode");
    
    const backToTopLinkDarkMode = document.querySelector("a.footer-link-backtotop");
    backToTopLinkDarkMode.classList.remove("footer-link-back-to-top-dark-mode");
    
    const absoluteFooterLinksDarkMode = document.querySelectorAll(".absolute-footer-links");
    absoluteFooterLinksDarkMode.forEach((link) => {
        link.classList.remove("absolute-footer-links-dark-mode");
    });
    
    const footerBottomBackground = document.querySelector(".footer-bottom");
    footerBottomBackground.classList.remove("footer-bottom-dark-mode");
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

document.addEventListener("DOMContentLoaded", function() {
    // Function to show the current image and hide others
    function showImage(sliderIndex, imageIndex) {
        const sliders = document.querySelectorAll(".portfolio-website-slider-container");
        sliders.forEach((slider, i) => {
            const images = slider.querySelectorAll(".image-slider");
            if (i === sliderIndex) {
                images.forEach((image, j) => {
                    if (j === imageIndex) {
                        image.style.display = "block";
                    } else {
                          image.style.display = "none";
                    }
                });
            }
        });
    }

    // Function to initialize slider functionality
    function initializeSlider(sliderIndex) {
        const leftArrow = document.querySelectorAll(".left-arrow")[sliderIndex];
        const rightArrow = document.querySelectorAll(".right-arrow")[sliderIndex];
        const images = document.querySelectorAll(".portfolio-website-slider-container")[sliderIndex].querySelectorAll('.image-slider');
        let currentIndex = 0;

        // Function to handle click on left arrow
        leftArrow.addEventListener("click", function() {
            currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
            showImage(sliderIndex, currentIndex);
        });

        // Function to handle click on right arrow
        rightArrow.addEventListener("click", function() {
            currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
            showImage(sliderIndex, currentIndex);
        });

        // Show the initial image
        showImage(sliderIndex, currentIndex);
    }

    // Initialize each slider
    const sliders = document.querySelectorAll(".portfolio-website-slider-container");
    sliders.forEach((slider, index) => {
        initializeSlider(index);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const leftArrows = document.querySelectorAll('.left-arrow');
    const rightArrows = document.querySelectorAll('.right-arrow');

    function updateViewBox() {
        if (window.innerWidth <= 600) {
            leftArrows.forEach(leftArrow => {
                leftArrow.setAttribute('viewBox', '-28 19 10 49');
            });
            rightArrows.forEach(rightArrow => {
                rightArrow.setAttribute('viewBox', '-28 19 10 49');
            });
        } else {
            leftArrows.forEach(leftArrow => {
                leftArrow.setAttribute('viewBox', '14 0 20 100');
            });
            rightArrows.forEach(rightArrow => {
                rightArrow.setAttribute('viewBox', '14 0 20 100');
            });
        }
    }

    // Initial update
    updateViewBox();

    // Update on window resize
    window.addEventListener('resize', updateViewBox);
});

showMoreButton.forEach((button, index) => {
    button.addEventListener("click", () => {
        showMore[index].classList.toggle("show-more-accordion");
        showMore[index].classList.toggle("portfolio-website-content-container");

        if (showLessText[index].textContent === "Show More") {
            showLessText[index].textContent = "Show Less";
            showMoreArrow[index].style.transform = "rotate(180deg)";
            showMoreArrow[index].style.margin = "-1rem 0.30rem 2rem 0";           
        } else {
            showLessText[index].textContent = "Show More";
            showMoreArrow[index].style.transform = "rotate(0deg)";
            showMoreArrow[index].style.margin = "-1rem 0 2rem 0";
        }
    });
});

contactFormClicked.forEach((input, index) => {
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
    const regexInput = {
        name: /^(?!.*[.,'-]{2})[a-z.,'-]{2,30}[ ][a-z.,'-]{0,30}([ ]?)[a-z.,'-]{2,30}?$/i,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/,
        phone: /^\+44\d{10}$/
    };

    const formValidationParagraphName = document.querySelector(".form-validation-paragraph.name");
    const formValidationParagraphEmail = document.querySelector(".form-validation-paragraph.email");
    const formValidationParagraphPhone = document.querySelector(".form-validation-paragraph.phone");
    const formValidationParagraphMessage = document.querySelector(".form-validation-paragraph.message");
    const submitButton = document.querySelector(".contact-form-button");
    const contactFormInputs = document.querySelectorAll(".form-input");

    // Ensure the submit button is always visible
    submitButton.style.visibility = "visible";

    // Function to set a session cookie
    function setSessionCookie() {
        const cookieValue = "sessionToken=uniqueSessionID123; path=/; SameSite=Lax";
        document.cookie = cookieValue;
        console.log("Cookie set:", document.cookie); // Debugging output
    }

    // Validation function
    function validate(field, regex) {
        const isMessageField = field.id === "message";
        const isPhoneField = field.id === "phone";
        if (field.value.trim() === "") {
            field.className = "form-input";
            if (isMessageField) {
                field.classList.add("form-input-message");
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("form-input-dark-mode");
            }
            const errorMessage = field.nextElementSibling;
            if (!isPhoneField) {
                if (errorMessage) {
                    errorMessage.style.visibility = "hidden";
                }
            } else {
                if (formValidationParagraphPhone) {
                    formValidationParagraphPhone.style.visibility = "hidden";
                }
            }
        } else if (regex.test(field.value)) {
            field.className = "form-input valid";
            if (isMessageField) {
                field.classList.add("form-input-message");
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("valid-dark-mode");
            }
            if (field.id === "fullname") {
                if (formValidationParagraphName) {
                    formValidationParagraphName.style.visibility = "hidden";
                }
            } else if (field.id === "email") {
                if (formValidationParagraphEmail) {
                    formValidationParagraphEmail.style.visibility = "hidden";
                }
            } else if (isPhoneField) {
                if (formValidationParagraphPhone) {
                    formValidationParagraphPhone.style.visibility = "hidden";
                }
            } else if (isMessageField) {
                if (formValidationParagraphMessage) {
                    formValidationParagraphMessage.style.visibility = "hidden";
                }
            }
        } else {
            field.className = "form-input invalid";
            if (isMessageField) {
                field.classList.add("form-input-message");
            }
            if (document.body.classList.contains("dark-mode")) {
                field.classList.add("invalid-dark-mode");
            }
            if (field.id === "fullname") {
                if (formValidationParagraphName) {
                    formValidationParagraphName.style.visibility = "visible";
                }
            } else if (field.id === "email") {
                if (formValidationParagraphEmail) {
                    formValidationParagraphEmail.style.visibility = "visible";
                }
            } else if (isPhoneField) {
                if (formValidationParagraphPhone) {
                    formValidationParagraphPhone.style.visibility = "visible";
                }
            } else if (isMessageField) {
                if (formValidationParagraphMessage) {
                    formValidationParagraphMessage.style.visibility = "visible";
                }
            }
        }

        // Recheck the form validity to enable/disable the submit button
        checkFormValidity();
    }

    // Function to check the overall form validity
    function checkFormValidity() {
        let formIsValid = true;

        contactFormInputs.forEach(input => {
            if (input.classList.contains("invalid") || (input.hasAttribute("required") && input.value.trim() === "")) {
                formIsValid = false;
            }
        });

        if (formIsValid) {
            submitButton.disabled = false;
            submitButton.style.visibility = "visible"; // Ensure the button is visible
        } else {
            submitButton.disabled = true;
            submitButton.style.visibility = "visible"; // Ensure the button is visible
        }
    }

    // Attach event listeners to input fields
    contactFormInputs.forEach((input) => {
        input.addEventListener("keyup", (e) => {
            const regex = regexInput[e.target.attributes.name.value];
            if (regex) {
                validate(e.target, regex);
            } else {
                validate(e.target, /.*/); // Use a default regex that always returns true
            }
        });

        // Initial validation to set initial state
        input.addEventListener("blur", (e) => {
            const regex = regexInput[e.target.attributes.name.value];
            if (regex) {
                validate(e.target, regex);
            } else {
                validate(e.target, /.*/); // Use a default regex that always returns true
            }
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
                    if (input.classList.contains("invalid") || (input.hasAttribute("required") && input.value.trim() === "")) {
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
                } else {
                    console.log("Form is not valid. Cannot submit.");
                }
            });
        }
});

const updateDate = new Date();
copyrightUpdateYear.textContent = updateDate.getFullYear();