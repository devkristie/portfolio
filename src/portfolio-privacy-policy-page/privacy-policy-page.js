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

// Function to disable dark mode
function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    sunIcon.style.visibility = "hidden";
    moonIcon.style.visibility = "visible";
    // Remove dark mode classes from specific elements
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

hamburgerMenuIcon.addEventListener("click", showMenu);

function showMenu() {
    topNavBarShow.classList.toggle("accordion-navigation-bar-hide");
    topNavBarShow.classList.toggle("accordion-navigation-bar");
}