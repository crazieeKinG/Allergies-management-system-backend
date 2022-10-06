import { Request } from "express";

interface AuthenticatedRequest extends Request {
    authenticatedUser?: string;
}

export interface TokenPayload {
    userId: string;
}

export default AuthenticatedRequest;
