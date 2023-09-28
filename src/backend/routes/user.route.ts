import { user_controller } from "../controllers/user.controller";
import { loggedIn } from "../middleware";

export default (router: any): void => {
  router.route("/users").get(user_controller.getUsers);
  router.route("/users/change-password/:id").patch(loggedIn, user_controller.changePassword);
};
