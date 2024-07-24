/* 
Name: Quoc Thinh Nguyen
File Name: signupScript.js
Date: July 21, 2024  
*/

// Hàm để kiểm tra tính hợp lệ của trường đầu vào
function validateField(field, pattern, errorMessage) {
    const value = field.value.trim();
    if (!pattern.test(value)) {
        displayError(field.id, errorMessage); // Hiển thị lỗi nếu giá trị không khớp với mẫu
        return false;
    }
    clearError(field.id); // Xóa lỗi nếu giá trị hợp lệ
    return true;
}

// Hàm kiểm tra tính hợp lệ của toàn bộ biểu mẫu
function validateForm() {
    let isValid = true;

    const emailField = document.getElementById('email');
    const loginField = document.getElementById('login');
    const passwordField = document.getElementById('pass');
    const confirmPasswordField = document.getElementById('pass2');
    const termsField = document.getElementById('terms');

    // Kiểm tra tính hợp lệ của từng trường
    isValid &= validateField(emailField, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'X Email address should be non-empty and in the format: xyz@xyz.xyz');
    isValid &= validateField(loginField, /^.{1,29}$/, 'X User name must be non-empty and less than 30 characters');
    isValid &= validateField(passwordField, /^.{8,}$/, 'X Password must be at least 8 characters long');

    // Kiểm tra xác nhận mật khẩu
    if (confirmPasswordField.value.trim() === "" || passwordField.value.trim() !== confirmPasswordField.value.trim()) {
        displayError('pass2', 'X Passwords do not match or are blank');
        isValid = false;
    } else {
        clearError('pass2');
    }
    
    if (!termsField.checked) {
        displayError('terms', 'X Please accept the terms and conditions');
        isValid = false;
    } else {
        clearError('terms');
    }

    return !!isValid;
}

// Hàm hiển thị lỗi
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

// Hàm xóa lỗi
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '';
    
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Hàm cài đặt kiểm tra lỗi khi rời khỏi trường
function setupBlurValidation(field, pattern, errorMessage) {
    field.addEventListener('blur', () => validateField(field, pattern, errorMessage));
}

// Hàm đặt lại biểu mẫu và xóa lỗi
function resetForm() {
    const fields = document.querySelectorAll('.textfield input, .checkbox input');
    fields.forEach(field => clearError(field.id));
}

// Sự kiện được kích hoạt khi tài liệu đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    const emailField = document.getElementById('email');
    const loginField = document.getElementById('login');
    const passwordField = document.getElementById('pass');
    const confirmPasswordField = document.getElementById('pass2');
    const termsField = document.getElementById('terms');
    const newsletterField = document.getElementById('newsletter');

    // Cài đặt kiểm tra lỗi cho từng trường
    setupBlurValidation(emailField, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'X Email address should be non-empty and in the format: xyz@xyz.xyz');
    setupBlurValidation(loginField, /^.{1,29}$/, 'X User name must be non-empty and less than 30 characters');
    setupBlurValidation(passwordField, /^.{8,}$/, 'X Password must be at least 8 characters long');
    setupBlurValidation(confirmPasswordField, new RegExp(`^${passwordField.value}$`), 'X Passwords do not match or are blank');
    termsField.addEventListener('change', () => validateField(termsField, /.+/, 'X Please accept the terms and conditions'));
    
    // Hiển thị cảnh báo khi chọn nhận newsletter
    newsletterField.addEventListener('click', function() {
        if (newsletterField.checked) {
            alert('You may receive spam emails.');
        }
    });
    
    // Kiểm tra tính hợp lệ khi gửi biểu mẫu
    document.querySelector('form').addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault(); // Ngăn chặn gửi biểu mẫu nếu không hợp lệ
        } else {
            loginField.value = loginField.value.toLowerCase(); // Chuyển tên đăng nhập thành chữ thường
        }
    });

    // Đặt lại biểu mẫu và xóa lỗi khi nhấn nút reset
    document.querySelector('form').addEventListener('reset', () => {
        resetForm();
    });
});
