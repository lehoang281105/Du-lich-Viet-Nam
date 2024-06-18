let payingHotel = [
  {
    hotelID: "Hotel021",
    hotelImg: "/assets/img/img(detail)/dananghotel/danang1.jpg",
    hotelName: "Marriott Resort & Spa",
    hotelIntro:
      "Danang Marriott Resort & Spa sở hữu kiến trúc Indochine đậm chất Á Đông và mang trong mình hơi thở thiên nhiên hoang sơ. Chính sự kết hợp độc đáo này đã giúp Danang Marriott Resort & Spa được vinh danh là “Khu nghỉ dưỡng biển hàng đầu Việt Nam” bởi World Travel Award vào năm 2017.",
    hotelPriceTag: "All year: 720$ per night/Family",
    hotelPrice: 2000,
  },

  {
    hotelID: "Hotel022",
    hotelImg: "/assets/img/img(detail)/dananghotel/danang2.jpg",
    hotelName: "Furama Resort",
    hotelIntro:
      "Furama Đà Nẵng, nổi tiếng là khu nghỉ mát bãi biển ẩm thực tại Việt Nam, là cửa ngõ của ba Di sản Thế giới Hội An, Mỹ Sơn và Huế. 198 phòng nghỉ sang trọng cùng với 70 biệt thự từ hai đến bốn phòng ngủ có hồ bơi riêng là địa điểm lưu trú nổi bật tại thành phố Đà Nẵng xinh đẹp.",
    hotelPriceTag: "All year: 140$ per night/2P",
    hotelPrice: 3000,
  },

  {
    hotelID: "Hotel023",
    hotelImg: "/assets/img/img(detail)/dananghotel/danang3.jpg",
    hotelName: "Naman Retreat",
    hotelIntro:
      "Naman Retreat sẽ là một lựa chọn tuyệt vời cho những du khách đến Đà Nẵng tìm kiếm sự nghỉ ngơi và thư giãn. Nổi tiếng với không khí sang trọng, và vị trí gần nhà hàng, Naman Retreat sẽ giúp bạn tận hưởng những gì tuyệt nhất ở Đà Nẵng.",
    hotelPriceTag: "All year: 122$ per night/2P",
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
      const paidContent = `${payingHotel[index].hotelID}${userID}`;
      const paidPrice = payingHotel[index].hotelPrice;
      let QR = `https://img.vietqr.io/image/${bankInfo.BANK_ID}-${bankInfo.ACCOUNT_NO}-compact2.png?amount=${paidPrice}&addInfo=${paidContent}`;
      hotelQRImg.src = QR;
      paid_content.innerHTML = paidContent;
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
