// Get references to the video element and the clickable quote box
const videoPlayer = document.getElementById('videoPlayer');
const quoteBox = document.getElementById('quoteBox');

// Array of video sources (from the videos folder)
const videoSources = [
  "videos/video.mp4",
  "videos/video_2.mp4",
  "videos/video_3.mp4"
];

// Array to keep track of playback times for each video (initialized to 0)
const playbackTimes = new Array(videoSources.length).fill(0);

// Global variable to track the current video's index (initial video is at index 0)
let currentVideoIndex = 0;

// Flag that indicates whether sound has been enabled after the first click
let soundEnabled = false;

/**
 * Randomly returns a new video index different from the current index.
 */
function getRandomVideoIndex() {
  let newIndex = currentVideoIndex;
  // Ensure that if more than one video is available, the new index is different
  while (newIndex === currentVideoIndex && videoSources.length > 1) {
    newIndex = Math.floor(Math.random() * videoSources.length);
  }
  return newIndex;
}

/**
 * Swaps the current video to a randomly selected one from videoSources,
 * preserving the current playback time for each video.
 * Also un-mutes the video on the first click so that sound plays.
 */
function swapVideo() {
  // Save the current playback time for the current video
  playbackTimes[currentVideoIndex] = videoPlayer.currentTime;
  
  // Enable sound on first click (i.e. remove mute) if it hasn't been enabled already
  if (!soundEnabled) {
    videoPlayer.muted = false;
    soundEnabled = true;
  }
  
  // Get a new video index randomly (ensuring it's different from the current one)
  const newIndex = getRandomVideoIndex();
  currentVideoIndex = newIndex;
  
  // Swap the video source to the new video
  videoPlayer.src = videoSources[currentVideoIndex];
  videoPlayer.load(); // Reload the new video source
  
  // When the new video's metadata is loaded, set its playback time and start playback
  const onMetadataLoaded = function() {
    // Restore playback time if it's within the new video's duration, otherwise start at 0
    videoPlayer.currentTime = (playbackTimes[currentVideoIndex] < videoPlayer.duration)
      ? playbackTimes[currentVideoIndex]
      : 0;
    
    videoPlayer.play();
    
    // Remove this event listener to avoid multiple triggers
    videoPlayer.removeEventListener('loadedmetadata', onMetadataLoaded);
  };
  
  videoPlayer.addEventListener('loadedmetadata', onMetadataLoaded);
}

// Attach the swapVideo function to the click event on the quote box
quoteBox.addEventListener('click', swapVideo);
