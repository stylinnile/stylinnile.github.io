// Array of image paths
const images = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg'
];

let currentIndex = 0;

// Function to change the image
function cycleImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById("imageContainer").src = images[currentIndex];
}

// Set initial image
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("imageContainer").src = images[currentIndex];
});
