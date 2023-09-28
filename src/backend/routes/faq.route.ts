import { faq_controller } from "../controllers/faq.controller";

export default (router: any): void => {
  router.route("/faq").get(faq_controller.getFAQs);
  router.route("/faq/:id").get(faq_controller.getFAQByCategoryId);
};
