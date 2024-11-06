const message = document.getElementById("message").value;

// Show initial message if exists
if (message) {
    swal({
        title: message,
        text: "I will close in 2 seconds.",
        timer: 2000,
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Reset previous error states
        email.classList.remove('is-invalid');
        password.classList.remove('is-invalid');
        emailError.style.display = 'none';
        passwordError.style.display = 'none';

        // Email validation
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email.value.trim()) {
            showError(email, emailError, 'Please enter your email address');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, emailError, 'Please enter a valid email address');
            isValid = false;
        }

        // Password validation
        if (!password.value.trim()) {
            showError(password, passwordError, 'Please enter your password');
            isValid = false;
        }

        // Show sweet alert for overall empty fields
        if (!email.value.trim() && !password.value.trim()) {
            swal({
                title: "All fields are empty!",
                text: "Please fill in all required fields",
                timer: 2000,
            });
            return;
        }

        if (isValid) {
            // For demonstration purposes
            console.log('Form submitted successfully');
            console.log('Email:', email.value);
            console.log('Password:', password.value);
            console.log('Remember me:', document.getElementById('rememberMe').checked);
            
            // Submit the form
            e.target.submit();
        }
    });
});

// Helper function to show errors
function showError(element, errorElement, message) {
    element.classList.add('is-invalid');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}