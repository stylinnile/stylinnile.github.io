// Array of sentences
const sentences = [
    "A tabby and white cat lounges on a beige blanket, gazing sleepily with slightly squinted eyes. Its ears are perked up, and its whiskers extend out from its face, giving it a grumpy yet relaxed expression.",
    "This is my cat, Max. I got him in 2016, and he has been a beloved part of my life ever since.",
    "I remember when Max got really sick, and I was so worried. He was weak, but I stayed by his side, and thankfully, he pulled through.",
    "Max is like a cozy storm cloud—calm and comforting but always carrying a little thunder in his expression.",
    "A loyal cat is not just a pet but a quiet guardian of your heart."
];

let currentIndex = 0;

// Function to change text
function changeText() {
    currentIndex = (currentIndex + 1) % sentences.length; // Cycle through array
    document.getElementById("textBox").textContent = sentences[currentIndex];
}

// Set initial text on page load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("textBox").textContent = sentences[currentIndex];
});
