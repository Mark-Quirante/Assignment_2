<?php
// Code written by Augustus Jay Del Rosario

// Destroys a session when a user logs out
session_start();
session_unset();
session_destroy();
exit();
?>
