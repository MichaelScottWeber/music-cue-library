
// ============================
// ===INDEX PAGE PLAY BUTTON===
// ============================

// Variables
let audio = document.getElementsByClassName("audio"),
    playPauseButton = document.getElementsByClassName("audio-button"),
    playPauseText = document.getElementsByClassName("play-pause-text");

// Toggles between Play/Pause buttons
function playButtonSwap(song) {
  playPauseText[song].classList.toggle("fa-play");
  playPauseText[song].classList.toggle("fa-pause");
}

// Pauses the song
function pauseSong(song) {
  audio[song].pause();
  playButtonSwap(song);
}

// Plays the song
function playSong(song) {
  audio[song].play();
  playButtonSwap(song);
}

// Stops the song if it is playing
function stopCurrentSong(song) {
  if (!audio[song].paused) {
    audio[song].pause();
    audio[song].currentTime = 0;
    playButtonSwap(song);
  }
}

// Event Listeners
for(let i = 0; i < playPauseButton.length; i++) {
  playPauseButton[i].addEventListener("click", function() {
    if (!audio[i].paused) {
      pauseSong(i);
    } else if (audio[i].paused) {
      for(let n = 0; n < playPauseButton.length; n++) {
        stopCurrentSong(n);
      }
      playSong(i);
    }
  });
  audio[i].addEventListener("ended", function() {
    audio[i].currentTime = 0;
    playButtonSwap(i);
  })
}