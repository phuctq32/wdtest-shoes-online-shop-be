import cloudinary from '../configs/cloudinary.js';

const upload = (file, options) => {    
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            // {
            //     public_id: options.fileName,
            //     folder: options.folder
            // },
            (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
}

const deleteFolder = (folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.api.delete_resources_by_prefix(folder, (err, res) => {
            if (err) {
                return reject(err);
            }
            cloudinary.api.delete_folder(folder, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            })
        });
    })
}

const path = (productId) => `products/${productId}`

export { upload, deleteFolder, path };