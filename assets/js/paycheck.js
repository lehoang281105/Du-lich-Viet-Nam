let payingHotel = [
  {
    hotelID: "Hotel001",
    hotelImg: "/assets/img/img(detail)/halonghotel/halong1.jpg",
    hotelName: "Soleil Hạ Long",
    hotelIntro:
      "Khách sạn SOLEIL Hạ Long sở hữu vị trí trung tâm đắc địa nằm ở vị trí thuận tiện, đối diện với công viên giải trí SunWorld và đặc biệt được yêu thích bởi tầm nhìn toàn cảnh ra vịnh Hạ Long, nơi có những điểm thăm quan kì thú cùng những chiếc du thuyền tuyệt đẹp.",
    hotelPriceTag: "All year: 132$ per night/Family",
    hotelPrice: 2000,
  },

  {
    hotelID: "Hotel002",
    hotelImg:
      "http://127.0.0.1:5500/assets/img/img(detail)/halonghotel/halong2.jpg",
    hotelName: "A La Carte",
    hotelIntro:
      "Cảm hứng từ không gian mênh mông của Vịnh Hạ Long, các kiến trúc sư đã mang tới dự án một thiết kế đậm chất nghỉ dưỡng với không gian rộng rãi, khoáng đạt, tận dụng nguồn sáng và gió tự nhiên chiếu sáng từng góc trong căn phòng.",
    hotelPriceTag: "All year: 65$ per night/2P",
    hotelPrice: 3000,
  },

  {
    hotelID: "Hotel003",
    hotelImg:
      "http://127.0.0.1:5500/assets/img/img(detail)/halonghotel/halong3.jpg",
    hotelName: "FLC Hạ Long",
    hotelIntro:
      "Nằm ở trung tâm khu nghỉ dưỡng FLC Hạ Long Golf Club & Luxury Resort cao cấp, khách sạn FLC Grand Hạ Long được thiết kế theo hình thức căn hộ với diện tích rộng và trang bị đầy đủ tiện nghi, mang đến cho du khách những giờ phút thư giãn trọn vẹn như chính tại căn nhà của bạn.",
    hotelPriceTag: "All year: 60$ per night/2P",
    hotelPrice: 4000,
  },
];

let bankInfo = {
  BANK_ID: "MB",
  ACCOUNT_NO: "0911914456",
};

document.addEventListener("DOMContentLoaded", () => {
  const hotelContainer = document.querySelector(".hotel__container");
  let hotelRenderUI = "";
  payingHotel.forEach((item, index) => {
    hotelRenderUI += `
<div class="hotel__minicontainer">
      <img
      src= ${item.hotelImg}
      />
      <div class="hotel__intro">
        <p class="intro__title"> <strong>${item.hotelName}</strong></p>
        <br class="intro__content">${item.hotelIntro}</p>
        <p class="intro__calendar"><strong>${item.hotelPriceTag}</strong></p></div>
        <a><button class="button button--flex place__button">
        <p>Book</p> <i class="ri-arrow-right-line"></i></button></a>
      </div>
    `;
  });
  hotelContainer.innerHTML = hotelRenderUI;

  //---------------------BOOKING-------------------//
  const btns = document.querySelectorAll(".place__button");
  const paid_content = document.getElementById("paid__content");
  const paid_price = document.getElementById("paid__price");
  const hotelQRImg = document.querySelector(".paying__qr");
  btns.forEach((item, index) => {
    item.addEventListener("click", () => {
      const userID = Math.floor(Math.random() * 100) + 1;
      const paidContent =
        `${payingHotel[index].hotelID}${userID}`.toUpperCase();
      const paidPrice = payingHotel[index].hotelPrice;
      let QR = `https://img.vietqr.io/image/${bankInfo.BANK_ID}-${bankInfo.ACCOUNT_NO}-compact2.png?amount=${paidPrice}&addInfo=${paidContent}`;
      hotelQRImg.src = QR;
      paid_content.innerHTML = paidContent.toUpperCase();
      paid_price.innerHTML = paidPrice;
      const intervalId = setInterval(() => {
        checkPaid(paidPrice, paidContent, intervalId);
      }, 5000);
    });
  });
});

let paySuccess = false;

async function checkPaid(price, content, intervalId) {
  paySuccess = false;
  if (paySuccess) {
    clearInterval(intervalId);
    return;
  } else {
    try {
      const response = await fetch(
        "https://script.googleusercontent.com/macros/echo?user_content_key=cO7iVBPDCuKP9SyCsBBxEwCePP7vu_K38c3rZb2hEtvs6gM8aALUZyq1r8YFWjNtZkrAHnDOb4DMQXZCWzEEPvjtIq_NMDqAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnI2S9OOeQLDLxgHDUtwI3Pzqk6pzK1-Gb0nlUl6-JIbSVrmyd-hKqi4NQoYg1OSe1qYZY3nONOfP0bt9B9Xn7xYbGCHKEp5SU9z9Jw9Md8uu&lib=MTfc41u-Q3MHNETU2FN7SZLnO-SWWAyGu"
      );
      const data = await response.json();
      const lastPaid = data.data[data.data.length - 1];
      lastPrice = lastPaid["Giá trị"];
      lastContent = lastPaid["Mô tả"];
      if (lastPrice >= price && lastContent.includes(content)) {
        alert("Thanh toán thành công");
        paySuccess = true;
        clearInterval(intervalId);
      } else {
        console.log("Thanh toán không thành công");
      }
    } catch {
      console.error("Lỗi");
    }
  }
}
