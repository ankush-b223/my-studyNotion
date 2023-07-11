const cloudinary = require('cloudinary').v2

const uploadImageToCloudinary  = async (file, folder, height, quality) => {
    //settings options object to upload
    const options = {folder};

    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    //videos configuration
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
};

module.exports = {
    uploadImageToCloudinary
}