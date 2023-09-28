import { offer_controller } from "../controllers/offer.controller";

export default (router: any): void => {
  router.route("/offers").get(offer_controller.getOffers);
};
