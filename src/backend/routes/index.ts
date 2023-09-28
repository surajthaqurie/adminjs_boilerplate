import users from "./user.route";
import games from "./game.route";
import pages from "./page.route";
import setting from "./setting.route";
import faq from "./faq.route";
import faq_category from "./faq_category.route";
import game_category from "./game_category.route";
import game_type from "./game_type.route";
import two_fa from "./two_fa.route";
import contact_route from "./contact.route";
import offer_route from "./offer.route";

export default (router: any): void => {
  users(router);
  games(router);
  pages(router);
  setting(router);
  faq(router);
  faq_category(router);
  game_category(router);
  game_type(router);
  two_fa(router);
  contact_route(router);
  offer_route(router);
};
