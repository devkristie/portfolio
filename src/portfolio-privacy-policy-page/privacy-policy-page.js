"use strict"

const moonIcon = document.querySelector(".fa-moon");
const moon = document.querySelector(".fa-moon");
const sunIcon = document.querySelector(".fa-sun");
const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const topNavBarShow = document.querySelector(".accordion-navigation-bar-hide");

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
    const privacyPolicyBodyBackground = document.querySelector("body");
    privacyPolicyBodyBackground.classList.add("dark-mode");
    const privacyPolicyMainBackground = document.querySelector("main");
    privacyPolicyMainBackground.classList.add("main-dark-mode");
    const policyPageContentTitle = document.querySelectorAll(".privacy-policy-page-content-container h2");
    policyPageContentTitle.forEach((title) => {
        title.classList.add("h2-dark-mode");
    });
    const footerBackground = document.querySelector(".footer-content");
    footerBackground.classList.add("footer-content-dark-mode");
    const backToTopLink = document.querySelector("a.footer-link-backtotop");
    backToTopLink.classList.add("footer-link-back-to-top-dark-mode");
    const footerBottomBorder = document.querySelector(".footer-bottom");
    footerBottomBorder.classList.add("footer-bottom-dark-mode");
}

function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    sunIcon.style.visibility = "hidden";
    moonIcon.style.visibility = "visible";
    // Remove dark mode classes from other elements as needed
    const privacyPolicyMainBackground = document.querySelector("main");
    privacyPolicyMainBackground.classList.remove("main-dark-mode");
    const policyPageContentTitle = document.querySelectorAll(".privacy-policy-page-content-container h2");
    policyPageContentTitle.forEach((title) => {
        title.classList.remove("h2-dark-mode");
    });
    const footerBackground = document.querySelector(".footer-content");
    footerBackground.classList.remove("footer-content-dark-mode");
    const backToTopLink = document.querySelector("a.footer-link-backtotop");
    backToTopLink.classList.remove("footer-link-back-to-top-dark-mode");
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
    topNavBarShow.classList.toggle("accordion-navigation-bar-hide");
    topNavBarShow.classList.toggle("accordion-navigation-bar");
}