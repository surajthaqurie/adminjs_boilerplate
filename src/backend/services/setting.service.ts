import { ISetting } from "src/interfaces";
import { prisma, paginated_query, settingCustomResponse } from "src/utility";
import { AppError } from "src/utility";

const { settings: Settings } = prisma;

const getSettings = async (page: number, itemNo: number): Promise<ISetting[]> => {
  const pagination_query = paginated_query(page, itemNo);

  const settings = await Settings.findMany({
    ...pagination_query
  });

  const customResponse = settingCustomResponse(settings);
  return customResponse[0];
};

const getSettingsDetails = async (key: string): Promise<ISetting> => {
  const setting_details = await Settings.findFirst({
    where: {
      key: {
        equals: key,
        mode: "insensitive"
      }
    }
  });

  if (!setting_details) {
    throw new AppError("Setting record not found !!", 404);
  }

  return setting_details;
};

export const setting_service = {
  getSettings,
  getSettingsDetails
};
