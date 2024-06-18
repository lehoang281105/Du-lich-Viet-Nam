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

/* ================== SCROLL SECTIONS ACTIVE LINK  ==================== */
document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các liên kết điều hướng
  const navLinks = document.querySelectorAll(".nav__link");

  // Hàm để xóa lớp active-link từ tất cả các liên kết
  function removeActiveClass() {
    navLinks.forEach((link) => {
      link.classList.remove("active-link");
    });
  }

  // Hàm để thêm lớp active-link vào liên kết hiện tại
  function addActiveClass(link) {
    removeActiveClass();
    link.classList.add("active-link");
  }

  // Lắng nghe sự kiện click trên các liên kết điều hướng
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      addActiveClass(this);
    });
  });

  // Hàm để kiểm tra vị trí cuộn và cập nhật liên kết active
  function setActiveLinkOnScroll() {
    let current = "";

    // Vị trí hiện tại của các phần tử trên trang
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150; // Điều chỉnh khoảng cách cho phù hợp
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    // Cập nhật liên kết active dựa trên vị trí cuộn
    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active-link");
      }
    });
  }

  // Lắng nghe sự kiện scroll trên window
  window.addEventListener("scroll", setActiveLinkOnScroll);
});
