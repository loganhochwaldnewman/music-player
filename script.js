// Select all the elements in the HTML page and assign them to a variable
let currentStatus = document.querySelector(".current-status");
let trackImage = document.querySelector(".track-art");
let trackTitle = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playpauseButton = document.querySelector(".playpause-button");
let nextButton = document.querySelector(".next-button");
let prevButton = document.querySelector(".prev-button");

let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");

// Specify globally used values
let trackIndex = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let currentTrack = document.createElement('audio');

// Define the list of tracks that have to be played
const trackList = [
    {
        name: "Title of Song 1",
        artist: "Artist of Song 1",
        image: "Link to Album Image of Song 1",
        path: "Link to Audio Song 1"
    },
    {
        name: "Title of Song 2",
        artist: "Artist of Song 2",
        image: "Link to Album Image of Song 2",
        path: "Link to Audio Song 2"
    },
    {
        name: "Title of Song 3",
        artist: "Artist of Song 3",
        image: "Link to Album Image of Song 3",
        path: "Link to Audio Song 3"
    },
];

function loadTrack(trackIndex) {
// Clear the previous seek timer
clearInterval(updateTimer);
resetValues();

// Load a new track
currentTrack.src = trackList[trackIndex].path;
currentTrack.load();

// Update details of the track
trackImage.style.backgroundImage = 
    "url(" + trackList[trackIndex].image + ")";
trackTitle.textContent = trackList[trackIndex].name;
trackArtist.textContent = trackList[trackIndex].artist;
currentStatus.textContent = 
    "PLAYING " + (trackIndex + 1) + " OF " + trackList.length;

// Set an interval of 1000 milliseconds
// for updating the seek slider
updateTimer = setInterval(seekUpdate, 1000);

// Move to the next track if the current finishes playing
// using the 'ended' event
currentTrack.addEventListener("ended", nextTrack);

// Apply a random background color
randomBgColor();
}

function randomBgColor() {
// Get a random number between 64 to 256
// (for getting lighter colors)
let red = Math.floor(Math.random() * 256) + 64;
let green = Math.floor(Math.random() * 256) + 64;
let blue = Math.floor(Math.random() * 256) + 64;

// Construct a color with the given values
let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

// Set the background to the new color
document.body.style.background = bgColor;
}

// Function to reset all values to their default
function resetValues() {
currentTime.textContent = "00:00";
totalDuration.textContent = "00:00";
seekSlider.value = 0;
}

function playpauseTrack() {
// Switch between playing and pausing
// depending on the current state
if (!isPlaying) playTrack();
else pauseTrack();
}

function playTrack() {
// Play the loaded track
currentTrack.play();
isPlaying = true;

// Replace icon with the pause icon
playpauseButton.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
// Pause the loaded track
currentTrack.pause();
isPlaying = false;

// Replace icon with the play icon
playpauseButton.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
// Go back to the first track if the
// current one is the last in the track list
if (trackIndex < trackList.length - 1)
    trackIndex += 1;
else trackIndex = 0;

// Load and play the new track
loadTrack(trackIndex);
playTrack();
}

function prevTrack() {
// Go back to the last track if the
// current one is the first in the track list
if (trackIndex > 0)
    trackIndex -= 1;
else trackIndex = trackList.length - 1;

// Load and play the new track
loadTrack(trackIndex);
playTrack();
}

function seekTo() {
// Calculate the seek position by the
// percentage of the seek slider 
// and get the relative duration to the track
let seekPosition = currentTrack.duration * (seekSlider.value / 100);

// Set the current track position to the calculated seek position
currentTrack.currentTime = seekPosition;
}

function setVolume() {
// Set the volume according to the
// percentage of the volume slider set
currentTrack.volume = volumeSlider.value / 100;
}

function seekUpdate() {
let seekPosition = 0;

// Check if the current track duration is a legible number
if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    seekSlider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    // Display the updated duration
    currentTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
}
}
// Load the first track in the tracklist
loadTrack(trackIndex);
