import { JwtPayload } from "jsonwebtoken";

export interface JwtPayloadDto extends JwtPayload {
    category: "access" | "refresh"; // access token or refresh token
    iss: "ludex.io"; // issuer
    sub: string; // subject == email
    role: "USER" | "ADMIN";
    exp: number; // expiration time
    nbf: number; // not before
    iat: number; // issued at
}