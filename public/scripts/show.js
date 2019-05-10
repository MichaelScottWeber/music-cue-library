// ==============================
// ===WAVESURFER FOR SHOW PAGE===
// ==============================

var playButton     = document.getElementById("play-button"),
    pauseButton    = document.getElementById("pause-button"),
    stopButton     = document.getElementById("stop-button"),
    backwardButton = document.getElementById("backward-button"),
    forwardButton  = document.getElementById("forward-button"),
    currentTime    = document.getElementById("current-time"),
    duration       = document.getElementById("duration");

var audioString = songAudio;
// console.log(songAudio);
// console.log(audioString);

var wavesurfer = WaveSurfer.create({
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

wavesurfer.load(audioString);

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
  var totalSeconds = Math.round(sec);
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;
  if (seconds < 10) {
    return minutes + ":0" + seconds;
  } else {
    return minutes + ":" + seconds;
  }
}