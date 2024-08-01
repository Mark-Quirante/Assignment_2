<?php
session_start();
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

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (json_last_error() === JSON_ERROR_NONE) {
    $mealData = $data['mealId'];
    $userData = $_SESSION['userId'];

// TODO: add isset later

$stmt = $conn->prepare("INSERT INTO user_recipe (mealID, user_id) VALUES (?, ?)");
$stmt->bind_param('ss', $mealData, $userData);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Recipe Saved!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Recipe Not Saved!']);
}

$stmt->close();
$conn->close();
}
?>