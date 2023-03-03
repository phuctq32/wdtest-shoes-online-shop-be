import Product from "../models/product.js";

const addProduct = async () => {
  try {
    const product = await Product.create({
      name: "K-Swiss Court Lite Spellout S - 76148-437-M",
      brandName: "K-Swiss",
      description:
        "Màu Xanh navy phối cùng tone Trắng - Đỏ sẽ là một item cực kỳ phong cách. Logo chiếc khiêng trắng được thêu tỉ mỉ ở gót giày và lưỡi gà tạo điểm nhấn cho sản phẩm. Đồng thời bên hông thân giày có thêm tên brand được thiết kế đồng bộ bằng việc mix giữa 3 tone màu vô cùng nổi bật.",
      shoeCode: "76148-437-M",
      size: 37,
      price: 1800000,
      discount: 12,
      image: {
        url: "google.com",
        width: 800,
        height: 600,
      },
    });
    console.log(product);
  } catch (error) {
    console.log(error);
  }
};
addData();
