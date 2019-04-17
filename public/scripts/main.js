
// ============================
// ===INDEX PAGE PLAY BUTTON===
// ============================

let audio = document.getElementsByClassName("audio");
let playPauseButton = document.getElementsByClassName("audio-button");
let playPauseText = document.getElementsByClassName("play-pause-text");

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
    forwardButton  = document.getElementById("forward-button"),
    currentTime    = document.getElementById("current-time"),
    duration       = document.getElementById("duration");

let wavesurfer = WaveSurfer.create({
    container: "#waveform",
    barHeight: 1.7,
    barGap: 3,
    barWidth: 2,
    cursorColor: "#F6F7F7",
    cursorWidth: 3,
    height: 350,
    progressColor: "#9EB7E3",
    responsive: true,
    skipLength: 5,
    waveColor: "#E7D59F",
});

wavesurfer.load(songAudio);

// Sets song duration
wavesurfer.on("ready", function() {
  duration.innerHTML = convertSeconds(wavesurfer.getDuration());
});

// Sets current time
wavesurfer.on("audioprocess", function() {
  currentTime.innerHTML = convertSeconds(wavesurfer.getCurrentTime());
});
wavesurfer.on("interaction", function() {
  currentTime.innerHTML = "0:00";
});

playButton.addEventListener("click", function() {
  wavesurfer.play();
});
pauseButton.addEventListener("click", function() {
  wavesurfer.pause();
});
stopButton.addEventListener("click", function() {
  wavesurfer.stop();
  currentTime.innerHTML = "0:00";
});
backwardButton.addEventListener("click", function() {
  wavesurfer.skipBackward();
});
forwardButton.addEventListener("click", function() {
  wavesurfer.skipForward();
});

// Converts seconds into minutes:seconds
function convertSeconds(sec) {
  let totalSeconds = Math.round(sec);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  if (seconds < 10) {
    return minutes + ":0" + seconds;
  } else {
    return minutes + ":" + seconds;
  }
}