import { object, string, date } from "yup";

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
});

export const userUpdateSchema = object({
    fullName: string().max(30, "Name cannot be greater that 30").required(),
    gender: string().max(6).required(),
    email: string().email("Please provide an valid email").required(),
    dateOfBirth: date().required(),
    address: string().max(50).nullable(),
});

export const userResetPasswordSchema = object({
    password: string().min(8).max(15).required(),
});
