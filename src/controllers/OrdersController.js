import Receipt from "../models/receipt.js"
import User from "../models/user.js"
import Product from "../models/product.js"

var curDate = new Date();
async function createReceipt(req, res) {
    let userID = req.body.userID;
    let products = req.body.products;

    let productsOrdered = [];
    for (var i in products) {
        const item = await Product.findOne({ _id: products[i].productID });
        productsOrdered.push({
            productId: item._id,
            price: item.price,
            name: item.name,
            quantity: products[i].quantity,
            discount: item.discount
        });
    }

    let sumPrice = 0;
    for (var i in productsOrdered) {
        sumPrice += (parseInt(products[i].quantity) * productsOrdered[i].price) * (1 - productsOrdered[i].discount / 100);
        delete productsOrdered[i].discount;
    }
    console.log(sumPrice)

    var customerInfor = {
        name: "",
        email: "",
        phone: "",
        address: ""
    };

    if (userID) {
        customerInfor = await User.findOne({ _id: userID });
    }
    else {
        customerInfor = req.body.customerInfo;
    }
    var bill = {
        userID: userID,
        products: productsOrdered,
        state: "paid",
        date: curDate,
        totalPrice: sumPrice,
        userId: userID ? userID : "guest",
        customerInfo: {
            name: customerInfor.name,
            email: customerInfor.email,
            phone: customerInfor.phone,
            address: customerInfor.address
        }
    }
    console.log(bill);
    const doc = await Receipt.create(bill);
    await doc.save();
    return res.send("Thành công");
}
async function getReceipt(req, res) {
    let receipts = await Receipt.find({ userId: req.body.userID });
    res.json(receipts);



}

export default {
    createReceipt,
    getReceipt
}