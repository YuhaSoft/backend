"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
class EmailService {
    constructor() {
        //////console.log(process.env.EMAIL,process.env.EMAIL_PASSOWRD)
        this.transporter = nodemailer_1.default.createTransport({
            service: process.env.MAILTYPE,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSOWRD
            }
        });
    }
    sendEmail(to, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.EMAIL,
                to,
                subject,
                html
            };
            try {
                yield this.transporter.sendMail(mailOptions);
                //////console.log('Email sent successfully');
            }
            catch (error) {
                new apierror_1.default("An error occurred", errorcode_1.default.InvalidLoginEmail);
            }
        });
    }
}
exports.EmailService = EmailService;
// Usage example
//# sourceMappingURL=EmailService.js.map