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

if (!isset($_SESSION['userId'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit();
}

$userData = $_SESSION['userId'];
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (json_last_error() === JSON_ERROR_NONE && $_SERVER['REQUEST_METHOD'] !== 'GET') {
    $mealData = $data['mealId'];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $stmt = $conn->prepare("INSERT INTO user_recipe (mealID, user_id) VALUES (?, ?)");
        $stmt->bind_param('ss', $mealData, $userData);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Recipe Saved!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Recipe Not Saved!']);
        }
        $stmt->close();
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $stmt = $conn->prepare("DELETE FROM user_recipe WHERE mealID = ? AND user_id = ?");
        $stmt->bind_param('ss', $mealData, $userData);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Recipe Deleted!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Recipe Not Deleted!']);
        }
        $stmt->close();
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT mealID FROM user_recipe WHERE user_id = ?");
    $stmt->bind_param('s', $userData);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    echo json_encode(['status' => 'success', 'message' => 'Table of Saved Meals Received', 'data' => $data]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input']);
}

$conn->close();
?>
