CREATE DATABASE CookPal;
USE CookPal;

-- Creating users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Creating saved_recipe table
CREATE TABLE user_recipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mealID BIGINT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
