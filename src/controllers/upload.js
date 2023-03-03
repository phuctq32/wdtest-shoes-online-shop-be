import * as uploadService from "../services/upload.js";


export const uploadImage = async (req, res, next) => {
    try {
        const imageUrl = await uploadService.uploadImage(req.file);

        res.status(200).json({ imageUrl, message: "Upload successful" });
    } catch (err) {
        next(err);
    }
}