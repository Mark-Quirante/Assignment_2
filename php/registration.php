<?php
header('Content-Type: application/json'); // Set content type to JSON
$host = 'localhost';
$dbname = 'CookPal';
$username = 'root';
$password = '';

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Check if form data is set
if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['email2']) && isset($_POST['password']) && isset($_POST['password2']) && isset($_POST['terms'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $email2 = $_POST['email2'];
    $password = $_POST['password'];
    $password2 = $_POST['password2'];
    $terms = $_POST['terms'];

    // Validate email and password match
    if ($password !== $password2) {
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match.']);
        exit();
    }

    if ($email !== $email2) {
        echo json_encode(['status' => 'error', 'message' => 'Emails do not match.']);
        exit();
    }

    // Check if email already registered
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Email already registered.']);
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    // Hash password and insert new user
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Registration successful.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Registration failed.']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid form data.']);
}
?>
