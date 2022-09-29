import cloudinary from "./cloudinary";
import fs from "fs";
import logger from "../misc/logger";
import { UploadError } from "../errors/file.error";
import { CLOUDINARY_PRESET } from "../constants/cloudinary.constants";

/**
 * It uploads an image to Cloudinary, deletes the image from the local file system, and returns the URL
 * of the uploaded image
 * @param {string} fileString
 * @returns url of the uploaded image
 */
const uploadImage = async (fileString: string) => {
    logger.info("Uploading image");
    try {
        if (!fs.existsSync(fileString)) {
            throw new Error("File not found!");
        }
        const uploadResponse = await cloudinary.uploader.upload(fileString, {
            upload_preset: CLOUDINARY_PRESET,
        });

        fs.unlinkSync(fileString);

        return uploadResponse.secure_url;
    } catch {
        logger.error("Failed to upload");
        fs.unlinkSync(fileString);
        throw UploadError;
    }
};

export default uploadImage;
