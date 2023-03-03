import { upload } from "../utils/imageHandler.js";
import AppError from "../utils/error.js";

export const uploadImage = async (file) => {
    try {
        if (!file) {
            throw new AppError(400, "File not found");
        }
        const uploadedImage = await upload(file.path);

        return uploadedImage.url;
    } catch (err) {
        throw err;
    }
}