
// -------------Testing-------------

var testAudio = document.querySelector(".test-audio");
var testAudioBtn = document.querySelector(".test-audio-btn");

testAudioBtn.addEventListener("click", function() {
  testAudio.play();
});


// ============================
// ===INDEX PAGE PLAY BUTTON===
// ============================

var audio = document.getElementsByClassName("audio");
var playPauseButton = document.getElementsByClassName("audio-button");
var playPauseText = document.getElementsByClassName("play-pause-text");

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

// Stops the song is it is playing
function stopCurrentSong(song) {
  if (!audio[song].paused) {
    audio[song].pause();
    audio[song].currentTime = 0;
    playButtonSwap(song);
  }
}


for(var i = 0; i < audio.length; i++) {
  audio[i].load();
  // Stops all currently playing songs, then plays/pauses the clicked song
  function playPause() {
    if (!audio[i].paused) {
      pauseSong(i);
    } else if (audio[i].paused) {
      for (var n = 0; n < audio.length; n++) {
        stopCurrentSong(n);
      }
      audio[i].play();
      playButtonSwap(i);
    }
  };

  // Resets the audio and button after song ends
  function songEnd() {
    audio[i].currentTime = 0;
    playButtonSwap(i);
  }

  playPauseButton[i].addEventListener("click", playPause);
  audio[i].addEventListener("ended", songEnd);
}

