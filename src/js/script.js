const hamburgerMenuIcon = document.querySelector(".hamburger-menu");
const topNavBarShow = document.querySelector(".accordion-navigation-bar-hide");
const showMoreButton = document.querySelectorAll(".show-more-button");
const showMore = document.querySelectorAll(".show-more-accordion");
const showMoreArrow = document.querySelectorAll(".show-more-arrow");
const showLessText = document.querySelectorAll(".show-more-button p");
const laptopImageCode1 = document.querySelectorAll(".laptop-image-code1");
const contactFormClicked = document.querySelectorAll(".form-input");
const contactFormLabels = document.querySelectorAll("label");
const contactFormInput = document.querySelectorAll("input");
const copyrightUpdateYear = document.querySelector(".footer-copyright-year");

// smooth scroll, compatilble for older browsers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
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

const updateDate = new Date();
copyrightUpdateYear.textContent = updateDate.getFullYear();

document.addEventListener("DOMContentLoaded", function() {
  // Function to show the current image and hide others
  function showImage(sliderIndex, imageIndex) {
      const sliders = document.querySelectorAll('.portfolio-website-slider-container');
      sliders.forEach((slider, i) => {
          const images = slider.querySelectorAll('.image-slider');
          if (i === sliderIndex) {
              images.forEach((image, j) => {
                  if (j === imageIndex) {
                      image.style.display = 'block';
                  } else {
                      image.style.display = 'none';
                  }
              });
          }
      });
  }

  // Function to initialize slider functionality
  function initializeSlider(sliderIndex) {
      const leftArrow = document.querySelectorAll('.left-arrow')[sliderIndex];
      const rightArrow = document.querySelectorAll('.right-arrow')[sliderIndex];
      const images = document.querySelectorAll('.portfolio-website-slider-container')[sliderIndex].querySelectorAll('.image-slider');
      let currentIndex = 0;

      // Function to handle click on left arrow
      leftArrow.addEventListener('click', function() {
          currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
          showImage(sliderIndex, currentIndex);
      });

      // Function to handle click on right arrow
      rightArrow.addEventListener('click', function() {
          currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
          showImage(sliderIndex, currentIndex);
      });

      // Show the initial image
      showImage(sliderIndex, currentIndex);
  }

  // Initialize each slider
  const sliders = document.querySelectorAll('.portfolio-website-slider-container');
  sliders.forEach((slider, index) => {
      initializeSlider(index);
  });
});

showMoreButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    showMore[index].classList.toggle("show-more-accordion");
    showMore[index].classList.toggle("portfolio-website-content-container");

    if (showLessText[index].textContent === "Show More") {
      showLessText[index].textContent = "Show Less";
      showMoreArrow[index].style.transform = "rotate(180deg)";
    } else {
      showLessText[index].textContent = "Show More";
      showMoreArrow[index].style.transform = "rotate(0deg)";
    }
  });
});

contactFormClicked.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value !== '') {
      contactFormLabels[index].style.margin = "-1.5rem 0.5rem";
    } else {
      contactFormLabels[index].style.margin = "0.5rem";
    }
    contactFormLabels[index].style.transition = "margin 0.35s ease";
  });
  // Check input values on page load
  if (input.value !== '') {
    contactFormLabels[index].style.margin = "-1.5rem 0.5rem";
  }
});

const regexInput = {
  name: /^(?!.*[.,'-]{2})[a-z.,'-]{2,30}[ ][a-z.,'-]{0,30}([ ]?)[a-z.,'-]{2,30}?$/i,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/,
  phone: /^\+44\d{10}$/g,
};

const formValidationParagraphName = document.querySelector(".form-validation-paragraph.name");
const formValidationParagraphEmail = document.querySelector(".form-validation-paragraph.email");
const formValidationParagraphPhone = document.querySelector(".form-validation-paragraph.phone");
const submitButton = document.querySelector(".contact-form-button");
const contactFormInputs = document.querySelectorAll('.form-input[required]');

// Validation function
function validate(field, regex) {
  if (field.value.trim() === '') {
    field.className = "form-input";
    // Hide only the error message associated with the emptied field
    const errorMessage = field.nextElementSibling;
    errorMessage.style.visibility = 'hidden';
    // Check if there are other invalid fields and show their error messages
    const otherInvalidInputs = document.querySelectorAll('.form-input.invalid');
    otherInvalidInputs.forEach(input => {
      if (input !== field) {
        const otherErrorMessage = input.nextElementSibling;
        otherErrorMessage.style.visibility = 'visible';
      }
    });
  } else if (regex.test(field.value)) {
    field.className = "form-input valid";
    formValidationParagraphName.style.visibility = "hidden";
    formValidationParagraphEmail.style.visibility = "hidden";
    formValidationParagraphPhone.style.visibility = "hidden";
  } else {
    field.className = "form-input invalid";
    if (field.id === "fullname") {
      formValidationParagraphName.style.visibility = "visible";
    } else if (field.id === "email") {
      formValidationParagraphEmail.style.visibility = "visible";
    } else if (field.id === "phone") {
      formValidationParagraphPhone.style.visibility = "visible";
    }
  }
}

contactFormInput.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    validate(e.target, regexInput[e.target.attributes.name.value]);
  });
});

// Add event listener to the submit button
submitButton.addEventListener('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    let formIsValid = true;

    // Check if any required input field is empty
    contactFormInputs.forEach(input => {
        if (input.value.trim() === '') {
            formIsValid = false;
            const errorMessage = input.nextElementSibling;
            errorMessage.style.visibility = 'visible';
        }
    });

    // If any required field is empty, prevent form submission
    if (!formIsValid) {
        return;
    }

    // Check if any input field is invalid
    const invalidInputs = document.querySelectorAll('.form-input.invalid');

    // If there are invalid input fields, display the error messages and prevent form submission
    if (invalidInputs.length > 0) {
        invalidInputs.forEach(input => {
            const errorMessage = input.nextElementSibling; // Get the corresponding error message element
            errorMessage.style.visibility = 'visible'; // Display the error message
        });
    } else {
        // If all input fields are valid, submit the form
        const form = document.querySelector('form');
        form.submit();
    }
});