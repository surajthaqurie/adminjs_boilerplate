import { AppError, generateQRcodeURL, generateSecretKey, prisma, twoFAVerify } from "src/utility";
import { IEnableDisableTwoFA, ITwoFA, ITwoFASetup } from "src/interfaces";
import { user_service } from "./user.service";

const { twoFactorAuthentication: TwoFactorAuth } = prisma;

const setupTwoFA = async (value: { userId: string; secret?: string }): Promise<{ two_factor_auth: ITwoFASetup; qr_code_url: string }> => {
  let two_factor_auth;

  const user = await user_service.getUserById(value.userId);
  if (!user) throw new AppError("User record not found !!", 404);

  value.secret = generateSecretKey();
  const qr_code_url = await generateQRcodeURL(value.secret);
  if (!qr_code_url) throw new AppError(`Unable to generate QR code url !!`, 400);

  const user_exits = await TwoFactorAuth.findFirst({ where: { userId: user.id } });
  if (user_exits) {
    two_factor_auth = await TwoFactorAuth.update({
      where: {
        id: user_exits.id
      },
      data: {
        secret: value.secret,
        status: false
      },
      select: {
        id: true,
        userId: true
      }
    });
  } else {
    two_factor_auth = await TwoFactorAuth.create({
      data: {
        secret: value.secret as string,
        userId: value.userId
      },
      select: {
        id: true,
        userId: true
      }
    });
  }

  if (!two_factor_auth) throw new AppError(`Unable to setup two factor authentication !!`, 400);

  return { two_factor_auth, qr_code_url };
};

const verifyTwoFA = async (userId: string, twoFAToken: string): Promise<ITwoFA> => {
  const auth_user = await TwoFactorAuth.findFirst({
    where: { userId }
  });
  if (!auth_user) {
    throw new AppError("User record not found !!", 404);
  }

  const is_valid = twoFAVerify(twoFAToken, auth_user.secret);
  if (!is_valid) {
    throw new AppError("The given token is not valid !!", 400);
  }

  return auth_user;
};

const enableTwoFA = async (userId: string, twoFAToken: string): Promise<IEnableDisableTwoFA> => {
  const auth_user = await verifyTwoFA(userId, twoFAToken);
  if (!auth_user) throw new AppError("Unable to verify user", 400);

  const enable_twoFA_user = await TwoFactorAuth.update({
    where: { id: auth_user.id },
    data: { status: true },
    select: { id: true, userId: true, status: true }
  });

  if (!enable_twoFA_user) throw new AppError("Unable to enable Two FA", 400);

  return enable_twoFA_user;
};

const getTwoFAStatus = async (userId: string): Promise<boolean> => {
  const two_fa_status = await TwoFactorAuth.findFirst({
    where: {
      userId,
      status: true
    }
  });

  return !!two_fa_status;
};

const disableTwoFA = async (userId: string): Promise<IEnableDisableTwoFA> => {
  const two_fa_status = await getTwoFAStatus(userId);
  if (!two_fa_status) throw new AppError("User records not found for disable 2FA !!", 404);
  const disable_two_fa = await TwoFactorAuth.update({
    where: { userId },
    data: {
      status: false
    },
    select: { id: true, userId: true, status: true }
  });

  if (!disable_two_fa) throw new AppError("Unable to disable 2FA !!", 400);
  return disable_two_fa;
};

export const two_fa_service = {
  setupTwoFA,
  verifyTwoFA,
  enableTwoFA,
  getTwoFAStatus,
  disableTwoFA
};
