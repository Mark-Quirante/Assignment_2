<?php
// Code written by Augustus Jay Del Rosario

header('Content-Type: application/json'); 
$response = ['status' => 'error', 'message' => 'An unknown error occurred'];

try {
    $host = 'localhost';
    $dbname = 'CookPal';
    $username = 'root';
    $password = '';

    // Creating the connection
    $conn = new mysqli($host, $username, $password, $dbname);

    // Checking the connection
    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }

    // Checking to see if form data is set
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['terms'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Checking to see if email already registered
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            throw new Exception('Email already registered.');
        }
        $stmt->close();

        // Hashing the password and inserting the new user
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $name, $email, $hashedPassword);

        if ($stmt->execute()) {
            $response = ['status' => 'success', 'message' => 'Registration successful.'];
        } else {
            throw new Exception('Registration failed.');
        }

        $stmt->close();
    } else {
        throw new Exception('Invalid form data.');
    }
    $conn->close();
} catch (Exception $e) {
    $response = ['status' => 'error', 'message' => $e->getMessage()];
}

echo json_encode($response);
?>
