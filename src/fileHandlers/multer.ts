import multer from "multer";
import { UploadError } from "../errors/file.error";

/* Creating a storage object that will be used by multer to store the file. */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file) {
            cb(null, `src/assets/uploads`);
        } else {
            throw UploadError;
        }
    },
    filename: function (req, file, cb) {
        if (file) {
            cb(null, Date.now() + "_" + file.originalname);
        } else {
            throw UploadError;
        }
    },
});

const upload = multer({ storage: storage });

export default upload;
