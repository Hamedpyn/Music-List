// Select DOM Elements

let
  image = document.querySelector("#cover"),
  title = document.getElementById("title"),
  artist = document.getElementById("artist"),
  music = document.querySelector("audio"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  progressContainer = document.getElementById("progress-container"),
  prevBtn = document.getElementById("prev"),
  playBtn = document.getElementById("play"),
  nextBtn = document.getElementById("next"),
  background = document.getElementById("background");

// Music
const songs = [
  { path: "media/01 Rosva.mp3", displayName: "Rosva", artist: "Hichkas", cover: "images/Hichkas.jpg" },
  { path: "media/02 To Koja Boodi.mp3", displayName: "To Koja Boodi ", artist: "Hichkas", cover: "images/Hichkas.jpg" },
  { path: "media/03 Sakhte Mosalmoon Boodan.mp3", displayName: "Sakhte Mosalmoon Boodan", artist: "Hichkas", cover: "images/Hichkas.jpg" },
  { path: "media/04 Ghazi Mano Doost Dasht.mp3", displayName: "Ghazi Mano Doost Dasht", artist: "Hichkas", cover: "images/Hichkas.jpg" },
  { path: "media/05 Man Kiam (feat. Fadaei).mp3", displayName: "Man Kiam", artist: "Hichkas (feat. Fadaei)", cover: "images/Hichkas.jpg" },
  { path: "media/06 Chera Nemimiri.mp3", displayName: "Chera Nemimiri", artist: "Hichkas", cover: "images/Hichkas.jpg" },
  { path: "media/07 Az Ashnayitoon Khoshhalam.mp3", displayName: "Az Ashnayitoon Khoshhalam", artist: "Hichkas", cover: "images/Hichkas.jpg" },
  { path: "media/08 Khalafkaraye Asli.mp3", displayName: "Khalafkaraye Asli", artist: "Hichkas", cover: "images/Hichkas.jpg" },
  { path: "media/09 Shabi Gorga (feat. Quf).mp3", displayName: "Shabi Gorga", artist: "Hichkas (feat. Quf)", cover: "images/Hichkas.jpg" },
  { path: "media/10 Teroreshoon Kon.mp3", displayName: "Teroreshon Kon", artist: "Hichkas", cover: "images/Hichkas.jpg" },
  { path: "media/11 Jadval O roya.mp3", displayName: "Jadval O roya", artist: "Hichkas", cover: "images/Hichkas.jpg" },
]

// Check if Playing
let isPlaying = true;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

// key down event
document.addEventListener('keydown', e => {
  if (e.key == 'Enter') {
    if (isPlaying) {
      pauseSong()
    } else {
      playSong()
    }
  } else if (e.key == 'ArrowRight') {
    nextSong()
  } else if (e.key == 'ArrowLeft') {
    prevSong()
  }
})