"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    /**
     * Generates a JWT token with the provided user UUID.
     * @param userUUID - The UUID of the user.
     * @returns The generated JWT token.
     */
    static generateJWT(userUUID) {
        const payload = { userUUID };
        return jsonwebtoken_1.default.sign(payload, JWTService.SECRET_KEY, {
            algorithm: JWTService.ALGORITHM,
            expiresIn: JWTService.EXPIRATION_TIME,
        });
    }
    /**
     * Decrypts and verifies a JWT token.
     * @param token - The JWT token to be decrypted.
     * @returns The payload of the JWT token if the verification is successful, otherwise returns null.
     */
    static decryptJWT(token) {
        try {
            return jsonwebtoken_1.default.verify(token, JWTService.SECRET_KEY, {
                algorithms: [JWTService.ALGORITHM],
            });
        }
        catch (error) {
            console.error('Error decrypting JWT:', error);
            return null;
        }
    }
}
exports.JWTService = JWTService;
JWTService.SECRET_KEY = "CaN't FiNd mE (:";
JWTService.ALGORITHM = 'HS256';
JWTService.EXPIRATION_TIME = '8h';
//# sourceMappingURL=JWTService.js.map