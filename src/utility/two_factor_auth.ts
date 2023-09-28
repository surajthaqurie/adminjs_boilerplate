import { authenticator } from "otplib";
import QRCode from "qrcode";

const generateSecretKey = (): string => {
  return authenticator.generateSecret();
};

const generateQRcodeURL = async (token: string): Promise<string> => {
  return await QRCode.toDataURL(`otpauth://totp/Admin?secret=${token}&issuer=${process.env.APP_NAME}`);
};

const twoFAVerify = (token: string, secret: string): boolean => {
  return authenticator.check(token, secret);
};

export { generateQRcodeURL, generateSecretKey, twoFAVerify };
