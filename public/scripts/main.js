
// ============================
// ===INDEX PAGE PLAY BUTTON===
// ============================

let audio = document.getElementsByClassName('audio');
let playPauseButton = document.getElementsByClassName('audio-button');
let playPauseText = document.getElementsByClassName('play-pause-text');

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


for(let i = 0; i < audio.length; i++) {
  // Stops all currently playing songs, then plays/pauses the clicked song
  function playPause() {
    if (!audio[i].paused) {
      pauseSong(i);
    } else if (audio[i].paused) {
      for (let n = 0; n < audio.length; n++) {
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

// ==============================
// ===WAVESURFER FOR SHOW PAGE===
// ==============================

let playButton     = document.getElementById("play-button"),
    pauseButton    = document.getElementById("pause-button"),
    stopButton     = document.getElementById("stop-button"),
    backwardButton = document.getElementById("backward-button"),
    forwardButton  = document.getElementById("forward-button");

var wavesurfer = WaveSurfer.create({
  container: "#waveform",
  barHeight: 2,
  barGap: 2,
  barWidth: 1,
  responsive: true
});

wavesurfer.load(songAudio);

playButton.addEventListener("click", function() {
  wavesurfer.play();
});
pauseButton.addEventListener("click", function() {
  wavesurfer.pause();
});
stopButton.addEventListener("click", function() {
  wavesurfer.stop();
});
backwardButton.addEventListener("click", function() {
  wavesurfer.skipBackward();
});
forwardButton.addEventListener("click", function() {
  wavesurfer.skipForward();
});
