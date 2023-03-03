import Receipt from "../models/receipt.js"
import User from "../models/user.js"
import Product from "../models/product.js"

var curDate = new Date();
async function createReceipt(req, res) {
    let userID = req.body.userID;
    let products = req.body.products;
    let customerInfo = req.body.customerInfo;


    let productsOrdered;
    for (var i in products) {
        productsOrdered += await Product.find({ _id: products[i].productID});
    }

    let sumPrice = 0;
    for (var i in productsOrdered) {
        sumPrice += (productsOrdered[i].quantity * productsOrdered[i].price)* (1-productsOrdered[i].discount) ;
    }

    var customerInfor;
    if (userID) {
        customerInfor = await User.findOne({ _id: userID });
    }
    var bill = {
        userID : userID,
        products: products,
        state: "paid",
        date: curDate,
        totalPrice: sumPrice,
        userId: userID ? userID : null,
        customerInfo: null,
        customerInfo: {
            name: customerInfor.name,
            email:customerInfor.email,
            phone: customerInfor.phone,
            address:customerInfor.address,

            // name: "Hieu",
            // email: "a@a",
            // phone: 111,
            // address: "customerInfor.address",
        },
    }

    const doc = await Receipt.create(bill);
    await doc.save();

    res.status(200).json({ message: "Thành công" });
}
async function getReceipt(req, res) {
    let receipts = await Receipt.find({ userId: req.body.userID });
    res.json(receipts);
    //res.status(200).json({ message: "Thành công" });

   
}

export default {
    createReceipt,
    getReceipt
}