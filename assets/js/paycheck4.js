let payingHotel = [
  {
    hotelID: "Hotel041",
    hotelImg: "/assets/img/img(detail)/phuquochotel/phuquoc1.jpg",
    hotelName: "Vinpearl Wonderworld",
    hotelIntro:
      "Khách sạn tọa lạc tại Bãi Dài, Phú Quốc với vẻ đẹp hoang sơ đẳng cấp thế giới khiến các vị khách khó lòng cưỡng lại. Hàng dừa đổ bóng trên bãi cỏ bao quanh từng căn biệt thự trắng theo phong cách cột trụ với hồ bơi riêng và lối đi dẫn đến hồ nước yên ả.",
    hotelPriceTag: "All year: 255$ per night/Family",
    hotelPrice: 2000,
  },

  {
    hotelID: "Hotel042",
    hotelImg: "/assets/img/img(detail)/phuquochotel/phuquoc2.jpg",
    hotelName: "Melia Vinpearl",
    hotelIntro:
      "Được ôm ấp bởi một trong những bờ biển đẹp nhất thế giới - Bãi Dài, Meliá Vinpearl Phú Quốc mời gọi du khách đắm chìm trong bản hòa ca thiên nhiên và những mặt hồ gợn sóng. Những rặng dừa tỏa bóng mát dọc các bãi cỏ rộng bao quanh từng khu biệt thự và các lối đi dẫn ra bãi cát trắng mịn.",
    hotelPriceTag: "All year: 200$ per night/2P",
    hotelPrice: 3000,
  },

  {
    hotelID: "Hotel043",
    hotelImg: "/assets/img/img(detail)/phuquochotel/phuquoc3.jpg",
    hotelName: "Crowne Plaza",
    hotelIntro:
      "Crowne Plaza Phú Quốc Starbay là khu nghỉ dưỡng cao cấp với 308 phòng nghỉ, suite và villa mang phong cách trang nhã ven biển Bãi Dài, Tây Bắc Phú Quốc. Du khách tại đây sẽ được thưởng thức phong vị địa phương cũng như ẩm thực quốc tế tại hai nhà hàng đặc biệt.",
    hotelPriceTag: "All year: 100$ per night/Family",
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
