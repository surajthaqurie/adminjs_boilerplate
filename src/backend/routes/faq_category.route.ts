import { faq_category_controller } from "../controllers/faq_category.controller";

export default (router: any): void => {
  router.route("/faq-category").get(faq_category_controller.getFAQCategories);
};
