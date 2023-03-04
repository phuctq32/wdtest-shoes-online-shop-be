import * as app from "./app.js";
import db from "./configs/database.js";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from 'url';
// import {upload} from "./utils/imageHandler.js";
// import Product from "./models/product.js";
// import Brand from "./models/brand.js";

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

// console.log(__dirname)

app.init();

db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', () => {
    console.log('DB connected');
    app.run();
});

// fs.readFile(path.join(__dirname, "/products.json"), "utf8", async (err, data) => {
//     if (err) {
//         console.log(`Error reading file from disk: ${err}`);
//     } else {

//         // parse JSON string to JSON object
//         const products = JSON.parse(data);

//         products.forEach(async (prod, index) => {
//             try {
//                 const existingBrand = await Brand.findOne({ name: prod.brandname.toString().toUpperCase() });
//                 let finalBrand;
//                 if (!existingBrand) {
//                     const newBrand = new Brand({
//                         name: prod.brandname.toString().toUpperCase(),
//                     })
//                     await newBrand.save();
//                     finalBrand = newBrand;
//                 } else {
//                     finalBrand = existingBrand;
//                 }

//                 const file = fs.createReadStream(path.join(__dirname, "/anhgiay", `${index + 1}.jpeg`))
//                 const uploadedImg = await upload(file.path);

//                 const newProduct = await Product({
//                     name: prod.name,
//                     brand: finalBrand._id,
//                     shoeCode: prod.shoeCode,
//                     description: prod.description,
//                     price: prod.price,
//                     sizes: prod.sizes,
//                     image: uploadedImg.url,
//                   });
              
//                   if (prod.discount) {
//                     newProduct.discount = prod.discount;
//                   }
              
//                   await newProduct.save();
//             } catch (err) {
//                 console.log(err);
//             }
//         })
//     }
// })



