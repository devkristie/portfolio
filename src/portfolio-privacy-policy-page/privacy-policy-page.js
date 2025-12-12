"use strict"

// Global variables
const hamburgerMenuIconContainer = document.querySelector(".hamburger-menu-container");
const topNavigationBarAccordionContainer = document.querySelector(".top-navigation-bar-accordion-container-hidden");
const dynamicAnnouncer = document.getElementById("dynamicAnnouncer");
const copyrightUpdateYear = document.querySelector(".footer-bottom-copyright-year");

// Skip-to-main-content: move focus and scroll to main content for accessibility
document.querySelector(".top-navigation-bar-skip-to-main-content-link").addEventListener("click", () => {
    const mainSection = document.querySelector(".privacy-policy-page-content-container");
    mainSection.setAttribute("tabindex", "-1");
    mainSection.focus();

    // Needed to prevent the page from displaying under the fixed header on page load
    const targetSection = document.getElementById("skip-to-main-content-start");

    if (targetSection) {
        const scrollOffset = 79;
        window.scrollTo({
            top: targetSection.offsetTop - scrollOffset, // Scroll to the top of the section
            behavior: "smooth" // Smooth scroll behavior
        });
    }
});

// Smoothly scrolls to the top and shifts focus to the hidden #home anchor for screen readers
document.querySelector(".footer-navigation-link-backtotop").addEventListener("click", function(e) {
    e.preventDefault();

    const target = document.querySelector(".thank-you-page-landing-page-section-container");

    target.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
    });

    // Set focus for screen readers without triggering another scroll
    const homeAnchor = document.querySelector("#home");
    homeAnchor.setAttribute("tabindex", "-1"); 
    homeAnchor.focus({ preventScroll: true });
});

// Smoothly scrolls to in-page links and applies a header offset (then focuses the target)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault(); // Disable default jump-to-anchor behavior
        const targetId = this.getAttribute("href").substring(1);  // Extract ID (remove "#")
        const targetHeadingElement = document.getElementById(targetId);  // Find target element

        if (targetHeadingElement) {
            const scrollOffset = 79; // Adjusts scroll position so the fixed header doesn't cover the target

            // Calculate scroll position with offset
            const targetPosition = targetHeadingElement.getBoundingClientRect().top + window.scrollY - scrollOffset;

            // Smoothly scroll to the calculated position
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            // Move focus to target for accessibility after scroll completes
            setTimeout(() => targetHeadingElement.focus(), 400);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Dark mode toggle with localStorage preference handling and first-time consent modal
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
            darkModeModalFirstParagraph.textContent = 'When you click "Allow" for dark mode, your preference for it will be saved in local storage so that the website can remember your choice for future visits.';
            darkModeModalContainer.appendChild(darkModeModalFirstParagraph);

            const darkModeModalSecondParagraph = document.createElement("p");
            darkModeModalSecondParagraph.setAttribute("class", "dark-mode-modal-second-paragraph");
            darkModeModalSecondParagraph.textContent = 'If you click "Decline" your data for it will not be saved in local storage, and the website will not remember your preference.';
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
                        // Shift+Tab → move backward
                        if (e.shiftKey) {
                            currentFocusIndex = (currentFocusIndex === 0) ? focusableElements.length - 1 : currentFocusIndex - 1;
                        }
                        // Tab → move forward
                        else {
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
    const policyNavigationContainer = document.querySelector(".privacy-policy-content-navigation-container");
    const policyNavigationContainerSubheading = document.querySelector(".privacy-policy-content-navigation-container h2");
    const policyNavigationLinks = document.querySelectorAll(".privacy-policy-content-navigation-links a");
    const policyNavigationBulletPoints = document.querySelectorAll(".privacy-policy-content-navigation-links li");
    const policyPageSubheading = document.querySelectorAll(".privacy-policy-page-content-container h2");
    const contentParagraphs = document.querySelectorAll(".privacy-policy-page-content-container p");
    const contentLinks = document.querySelectorAll(".privacy-policy-page-content-container a");
    const contentStrong = document.querySelector(".privacy-policy-page-content-container strong");
    const footerSectionContainer = document.querySelector(".footer-section-container");
    const footerNavigtionContainer = document.querySelector(".footer-navigation-container");
    const footerBackToTopLink = document.querySelector("a.footer-navigation-link-backtotop");
    const footerNavigationLinks = document.querySelectorAll(".footer-navigation-links a");
    const footerNavigationAbsoluteLinkSubtitles = document.querySelectorAll(".footer-absolute-links");
    const footerNavigationAbsoluteLinks = document.querySelectorAll(".footer-absolute-links a");
    const footerBottomNavigationContainer = document.querySelector(".footer-bottom-navigation-container");

    function enableDarkMode() {
        darkModeIcon.classList.add("fa-moon-visibility-hidden");
        lightModeIcon.classList.add("fa-sun-visibility-visible");
        darkModeStatus.textContent = "Dark mode is now enabled";
        darkModeToggleButton.setAttribute("aria-label", "Enable light mode");

        // Add dark-mode-specific CSS classes to relevant page elements
        screenReadersOnlyText.forEach((text) => {
            text.classList.add("sr-only-dark-mode");
        });

        bodyDarkMode.classList.add("body-dark-mode");
        
        mainDarkMode.classList.add("main-dark-mode");

        dynamicAnnouncer.classList.add("dynamic-announcer-dark-mode");

        policyNavigationContainer.classList.add("privacy-policy-content-navigation-container-dark-mode");

        policyNavigationContainerSubheading.classList.add("navigation-h2-dark-mode");

        policyNavigationLinks.forEach((link) => {
            link.classList.add("navigation-a-dark-mode");
        });

        policyNavigationBulletPoints.forEach((bullet) => {
            bullet.classList.add("navigation-li-dark-mode");
        });

        policyPageSubheading.forEach((subheading) => {
            subheading.classList.add("h2-dark-mode");
        });

        contentParagraphs.forEach((paragraph) => {
            paragraph.classList.add("p-dark-mode");
        });

        contentLinks.forEach((link) => {
            link.classList.add("a-dark-mode");
        });

        contentStrong.classList.add("strong-dark-mode");

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
        darkModeIcon.classList.remove("fa-moon-visibility-hidden");
        lightModeIcon.classList.remove("fa-sun-visibility-visible");
        darkModeStatus.textContent = "Light mode is now enabled";
        darkModeToggleButton.setAttribute("aria-label", "Enable dark mode");
        
        // Remove dark-mode-specific CSS classes from all affected elements
        screenReadersOnlyText.forEach((text) => {
            text.classList.remove("sr-only-dark-mode");
        });

        bodyDarkMode.classList.remove("body-dark-mode");
        
        mainDarkMode.classList.remove("main-dark-mode");

        dynamicAnnouncer.classList.remove("dynamic-announcer-dark-mode");

        policyNavigationContainer.classList.remove("privacy-policy-content-navigation-container-dark-mode");

        policyNavigationContainerSubheading.classList.remove("navigation-h2-dark-mode");

        policyNavigationLinks.forEach((link) => {
            link.classList.remove("navigation-a-dark-mode");
        });

        policyNavigationBulletPoints.forEach((bullet) => {
            bullet.classList.remove("navigation-li-dark-mode");
        });

        policyPageSubheading.forEach((subheading) => {
            subheading.classList.remove("h2-dark-mode");
        });

        contentParagraphs.forEach((paragraph) => {
            paragraph.classList.remove("p-dark-mode");
        });

        contentLinks.forEach((link) => {
            link.classList.remove("a-dark-mode");
        });

        contentStrong.classList.remove("strong-dark-mode");

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
                event.preventDefault(); // Prevent Space from scrolling the page (default browser behavior)
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
hamburgerMenuIconContainer.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Prevent page from scrolling when Space is pressed
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

// Set the copyright year dynamically to the current year based on the system date
const updateDate = new Date();
copyrightUpdateYear.textContent = updateDate.getFullYear();