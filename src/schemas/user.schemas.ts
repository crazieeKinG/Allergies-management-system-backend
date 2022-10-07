import { object, string, date } from "yup";
import {
    FILE_TYPES,
    FILE_SIZE_IN_BYTES,
    FILE_SIZE_IN_MEGABYTES,
} from "../constants/cloudinary.constants";

export const userSignInSchema = object({
    email: string().email("Please provide an valid email").required(),
    password: string().min(8).max(15).required(),
});

export const userInsertSchema = object({
    fullName: string().max(30, "Name cannot be greater that 30").required(),
    gender: string().max(6).required(),
    email: string().email("Please provide an valid email").required(),
    password: string().min(8).max(15).required(),
    dateOfBirth: date().required(),
    address: string().max(50).nullable(),
    photo: object()
        .test(
            "Photo",
            `Please provide a valid photo of type: ${FILE_TYPES.join(", ")}`,
            (file) => {
                if (!!file && file.mimetype)
                    return FILE_TYPES.includes(file.mimetype);
                else return true;
            }
        )
        .test(
            "Photo",
            `Please provide photo of size less than ${FILE_SIZE_IN_MEGABYTES}MB`,
            (file) => {
                if (!!file && file.size) return file.size < FILE_SIZE_IN_BYTES;
                else return true;
            }
        )
        .nullable()
        .strip(),
});

export const userUpdateSchema = object({
    fullName: string().max(30, "Name cannot be greater that 30").required(),
    gender: string().max(6).required(),
    email: string().email("Please provide an valid email").required(),
    dateOfBirth: date().required(),
    address: string().max(50).nullable(),
    photo: object()
        .test(
            "Photo",
            `Please provide a valid photo of type: ${FILE_TYPES.join(", ")}`,
            (file) => {
                if (!!file && file.mimetype)
                    return FILE_TYPES.includes(file.mimetype);
                else return true;
            }
        )
        .test(
            "Photo",
            `Please provide photo of size less than ${FILE_SIZE_IN_MEGABYTES}MB`,
            (file) => {
                if (!!file && file.size) return file.size < FILE_SIZE_IN_BYTES;
                else return true;
            }
        )
        .nullable()
        .strip(),
});

export const userResetPasswordSchema = object({
    password: string().min(8).max(15).required(),
});
