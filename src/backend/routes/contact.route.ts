import { contact_controller } from "../controllers/contact.controller";

export default (router: any): void => {
  router.route("/contact").post(contact_controller.sendMessage);
};
