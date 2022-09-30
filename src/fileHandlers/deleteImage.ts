import { CLOUDINARY_PRESET } from "../constants/cloudinary.constants";
import { UploadError } from "../errors/file.error";
import logger from "../misc/logger";
import { getImageCloudinaryId } from "../utils/getImageCloudinaryId";
import cloudinary from "./cloudinary";

/**
 * It takes image name, checks if it's a default image, if not, it deletes the image from cloudinary
 * @param {string} fileString
 * @returns {
 *   "result": "ok",
 *   "error": {
 *     "message": "Not Found",
 *     "http_code": 404
 *   }
 */
const deleteImage = async (fileString: string) => {
    logger.info("Deleting image");
    try {
        const assetId = getImageCloudinaryId(fileString);
        if (assetId !== "default") {
            const publicId =
                CLOUDINARY_PRESET + "/" + getImageCloudinaryId(fileString);
            const deleteResponse = await cloudinary.uploader.destroy(publicId);
            return deleteResponse.result;
        }
        return "ok";
    } catch {
        logger.error("Failed to delete");
        throw UploadError;
    }
};

export default deleteImage;
