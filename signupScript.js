/* 
Name: Quoc Thinh Nguyen
File Name: signupScript.js
Date: July 21, 2024  
*/

// Function to validate a single field
function validateField(field, pattern, errorMessage) {
    const value = field.value.trim();
    if (!pattern.test(value)) {
        displayError(field.id, errorMessage); // Show error if the value does not match the pattern
        return false;
    }
    clearError(field.id); // Clear error if the value is valid
    return true;
}

// Function to validate the entire form
function validateForm() {
    let isValid = true;

    const emailField = document.getElementById('email');
    const loginField = document.getElementById('login');
    const passwordField = document.getElementById('pass');
    const confirmPasswordField = document.getElementById('pass2');
    const termsField = document.getElementById('terms');

    // Validate each field
    isValid &= validateField(emailField, /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{3,5}$/, 'X Email address should be non-empty and in the format: xyz@xyz.xyz');
    isValid &= validateField(loginField, /^.{1,29}$/, 'X User name must be non-empty and less than 30 characters');
    isValid &= validateField(passwordField, /^.{8,}$/, 'X Password must be at least 8 characters long');
    
    // Validate confirm password
    if (confirmPasswordField.value.trim() === "" || passwordField.value.trim() !== confirmPasswordField.value.trim()) {
        displayError('pass2', 'X Passwords do not match or are blank');
        isValid = false;
    } else {
        clearError('pass2');
    }

    // Validate terms and conditions
    if (!termsField.checked) {
        displayError('terms', 'X Please accept the terms and conditions');
        isValid = false;
    } else {
        clearError('terms');
    }

    return isValid;
}

// Function to display error messages
function displayError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = 'red';
    
    let errorElement = document.getElementById(fieldId + '-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.id = fieldId + '-error';
        errorElement.style.color = 'red';
        errorElement.classList.add('error-message');
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Function to clear error messages
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '';
    
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Function to set up validation on blur for fields
function setupBlurValidation(field, pattern, errorMessage) {
    field.addEventListener('blur', () => validateField(field, pattern, errorMessage));
}

// Function to reset the form and clear errors
function resetForm() {
    const fields = document.querySelectorAll('.textfield input, .checkbox input');
    fields.forEach(field => clearError(field.id));
}

// Event listener for when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const emailField = document.getElementById('email');
    const loginField = document.getElementById('login');
    const passwordField = document.getElementById('pass');
    const confirmPasswordField = document.getElementById('pass2');
    const termsField = document.getElementById('terms');
    const newsletterField = document.getElementById('newsletter');

    // Set up validation for each field
    setupBlurValidation(emailField, /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{3,5}$/, 'X Email address should be non-empty and in the format: xyz@xyz.xyz');
    setupBlurValidation(loginField, /^.{1,29}$/, 'X User name must be non-empty and less than 30 characters');
    setupBlurValidation(passwordField, /^.{8,}$/, 'X Password must be at least 8 characters long');
    setupBlurValidation(confirmPasswordField, new RegExp(`^${passwordField.value}$`), 'X Passwords do not match or are blank');
    termsField.addEventListener('change', () => validateField(termsField, /.+/, 'X Please accept the terms and conditions'));
    
    // Show alert if newsletter checkbox is selected
    newsletterField.addEventListener('click', function() {
        if (newsletterField.checked) {
            alert('You may receive spam emails.');
        }
    });
    
    // Validate the form on submit
    document.querySelector('form').addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form submission if invalid
        } else {
            loginField.value = loginField.value.toLowerCase(); // Convert login name to lowercase
        }
    });

    // Reset form and clear errors when reset button is clicked
    document.querySelector('form').addEventListener('reset', () => {
        resetForm();
    });
});
