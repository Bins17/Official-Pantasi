<?php
// Define the path to the text file where you'll store the viewer count
$viewerCountFile = 'viewer_count.txt';

// Check if the file exists
if (file_exists($viewerCountFile)) {
    // Read the current viewer count from the file
    $currentCount = (int)file_get_contents($viewerCountFile);
} else {
    // If the file doesn't exist, initialize the count to 0
    $currentCount = 0;
}

// Increment the viewer count for each visit
$currentCount++;

// Update the file with the new viewer count
file_put_contents($viewerCountFile, $currentCount);

// Return the current viewer count as JSON
$response = ['viewer_count' => $currentCount];
header('Content-Type: application/json');
echo json_encode($response);
?>
