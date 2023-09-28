import { setting_controller } from "../controllers/setting.controller";

export default (router: any): void => {
  router.route("/settings").get(setting_controller.getSettings);
  router.route("/settings/:key").get(setting_controller.getSettingsDetails);
};
