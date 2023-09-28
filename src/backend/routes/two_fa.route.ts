import { two_fa_controller } from "../controllers/two_factor_auth.controller";
import { loggedIn } from "../middleware";

export default (router: any): void => {
  router.route("/two-fa/setup").post(loggedIn, two_fa_controller.setupTwoFA);
  router.route("/two-fa/verify").post(loggedIn, two_fa_controller.verifyTwoFA);
  router.route("/two-fa/enable").patch(loggedIn, two_fa_controller.enableTwoFA);
  router.route("/two-fa/:id").get(loggedIn, two_fa_controller.getTwoFAStatus);
  router.route("/two-fa/disable").patch(loggedIn, two_fa_controller.disableTwoFA);
};
