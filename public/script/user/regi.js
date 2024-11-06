const message = document.getElementById("message").value;

// Show initial message if exists
if (message) {
  swal({
    title: message,
    text: "I will close in 2 seconds.",
    timer: 2000,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  // Get all form elements
  const formElements = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    gender: document.getElementById("gender"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
  };

  // Get all error elements
  const errorElements = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    gender: document.getElementById("genderError"),
    password: document.getElementById("passwordError"),
    confirmPassword: document.getElementById("confirmPasswordError"),
  };

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Reset all error states
    resetErrors();

    // Validate empty fields first
    const emptyFields = Object.keys(formElements).filter((key) => {
      if (key === "gender") {
        return !formElements[key].value;
      }
      return !formElements[key].value.trim();
    });

    if (emptyFields.length > 0) {
      swal({
        title: "Required fields are empty!",
        text: "Please fill in all required fields",
        timer: 2000,
      });
      emptyFields.forEach((field) => {
        let message =
          field === "gender"
            ? "Please select your gender"
            : `Please enter your ${field
                .replace(/([A-Z])/g, " $1")
                .toLowerCase()}`;
        showError(formElements[field], errorElements[field], message);
      });
      isValid = false;
      return;
    }

    // Name validation
    if (formElements.name.value.trim().length < 2) {
      showError(
        formElements.name,
        errorElements.name,
        "Name must be at least 2 characters long"
      );
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formElements.email.value.trim())) {
      showError(
        formElements.email,
        errorElements.email,
        "Please enter a valid email address"
      );
      isValid = false;
    }

    // Gender validation
    if (!formElements.gender.value) {
      showError(
        formElements.gender,
        errorElements.gender,
        "Please select your gender"
      );
      isValid = false;
    }

    // Password validation
    const passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(formElements.password.value)) {
      showError(
        formElements.password,
        errorElements.password,
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character"
      );
      isValid = false;
    }

    // Confirm Password validation
    if (formElements.password.value !== formElements.confirmPassword.value) {
      showError(
        formElements.confirmPassword,
        errorElements.confirmPassword,
        "Passwords do not match"
      );
      swal({
        title: "Passwords do not match!",
        text: "Please make sure your passwords match",
        timer: 2000,
      });
      isValid = false;
    }

    if (isValid) {
      // Log form data (for demonstration)
      console.log("Form submitted successfully");
      console.log("Name:", formElements.name.value);
      console.log("Email:", formElements.email.value);
      console.log("Gender:", formElements.gender.value);
      console.log("Password:", formElements.password.value);

      // Submit the form
      e.target.submit();
    }
  });

  // Helper function to show errors
  function showError(element, errorElement, message) {
    element.classList.add("is-invalid");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  // Helper function to reset all errors
  function resetErrors() {
    Object.keys(formElements).forEach((key) => {
      formElements[key].classList.remove("is-invalid");
      errorElements[key].style.display = "none";
    });
  }
});
