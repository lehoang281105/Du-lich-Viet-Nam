let payingHotel = [
  {
    hotelID: "Hotel011",
    hotelImg: "/assets/img/img(detail)/nhatranghotel/nhatrang2.jpg",
    hotelName: "Mường Thanh Grand",
    hotelIntro:
      "Với 255 phòng nghỉ được trang bị đầy đủ tiện nghi, hệ thống phòng họp được trang bị đầy đủ và các dịch vụ cao cấp như spa & massage, phòng tập thể dục, karaoke, v.v., khách sạn 4 sao Mường Thanh Grand Nha Trang chắc chắn sẽ mang đến những trải nghiệm khó quên nhất về nền văn hóa độc đáo của Nha Trang đặc biệt này.",
    hotelPriceTag: "All year: 70$ per night/Family",
    hotelPrice: 2000,
  },

  {
    hotelID: "Hotel012",
    hotelImg: "/assets/img/img(detail)/nhatranghotel/nhatrang1.jpg",
    hotelName: "Diamond Bay",
    hotelIntro:
      "Diamond Bay Golf & Villas là một quần thể du lịch - thể thao - nghỉ dưỡng với diện tích lên đến 76 ha nằm trên đại lộ Nguyễn Tất Thành nối giữa thành phố Nha Trang và sân bay quốc tế Cam Ranh. Từ Diamond Bay bạn chỉ mất 20 phút đến sân bay Cam Ranh và 10 phút đến trung tâm thành phố Nha Trang.",
    hotelPriceTag: "All year: 65$ per night/2P",
    hotelPrice: 3000,
  },

  {
    hotelID: "Hotel013",
    hotelImg: "/assets/img/img(detail)/nhatranghotel/nhatrang3.jpg",
    hotelName: "Boton Blue",
    hotelIntro:
      "Boton Blue là thương hiệu khách sạn Việt Nam đạt chuẩn 5* quốc tế, nằm sát bên bờ biển Vịnh Nha Trang - một trong những vịnh biển đẹp nhất hành tinh. Lối kiến trúc độc đáo lấy ý tưởng từ hình tượng chú hải mã dũng mãnh. Với chất lượng dịch vụ đẳng cấp cùng hệ thống cơ sở vật chất tuyệt hảo bởi những thương hiệu hàng đầu thế giới.",
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
