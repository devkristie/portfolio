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

}

// Function to disable dark mode
function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    sunIcon.style.visibility = "hidden";
    moonIcon.style.visibility = "visible";
    // Remove dark mode classes from specific elements

}

hamburgerMenuIcon.addEventListener("click", showMenu);

function showMenu() {
    topNavBarShow.classList.toggle("accordion-navigation-bar-hide");
    topNavBarShow.classList.toggle("accordion-navigation-bar");
}