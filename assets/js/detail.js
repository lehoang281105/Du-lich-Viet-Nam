/* ==================== CHANGE BACKGROUND HEADER   ====================*/
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 300) {
    header.classList.add("scroll-header");
    document.getElementById("imgback").src =
      "/assets/img/img(detail)/arrow-left-circle-line (1).svg";
  } else {
    header.classList.remove("scroll-header");
    document.getElementById("imgback").src =
      "/assets/img/img(detail)/arrow-left-circle-line.svg";
  }
}
window.addEventListener("scroll", scrollHeader);

console.log(document.getElementById("imgback").src);


/* ================== VIDEO  ==================== */
const videoFile = document.getElementById("video-file"),
  videoButton = document.getElementById("video-button"),
  videoIcon = document.getElementById("video-icon");

function playPause() {
  if (videoFile.paused) {
    //PLay video
    videoFile.play();

    //Change the icon
    videoIcon.classList.add("ri-pause-line");
    videoIcon.classList.remove("ri-play-line");
  } else {
    //Pause the video
    videoFile.pause();

    //Change the icon
    videoIcon.classList.remove("ri-pause-line");
    videoIcon.classList.add("ri-play-line");
  }
}

videoButton.addEventListener("click", playPause);

function finalVideo() {
  videoIcon.classList.remove("ri-pause-line");
  videoIcon.classList.add("ri-play-line");
}
videoFile.addEventListener("ended", finalVideo);




