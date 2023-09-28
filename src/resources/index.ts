import user_resource from "./user.resource";
import page_resource from "./pages.resource";
import game_resource from "./game.resource";
import game_type_resource from "./game_type.resource";
import setting_resource from "./setting.resource";
import faqs_resource from "./faq.resource";
import faq_category_resource from "./faq_category.resource";
import game_category_resource from "./game_category.resource";
import add_game_with_category_resource from "./add_game_with_category.resource";
import offer_resource from "./offer.resource";
import { componentLoader, Components, Pages } from "../frontend/components";

export const AdminJsResourcesConfig = {
  resources: [
    user_resource,
    page_resource,
    game_type_resource,
    game_resource,
    game_category_resource,
    add_game_with_category_resource,
    setting_resource,
    faq_category_resource,
    faqs_resource,
    offer_resource
  ],
  componentLoader,
  dashboard: {
    component: Components.Dashboard
  },
  branding: {
    companyName: process.env.APP_NAME,
    adminJSteam: false,
    favicon: "/public/logo.png",
    logo: "/public/logo.png",
    withMadeWithLove: false
  },
  env: {
    APP_NAME: process.env.APP_NAME as string,
    APP_URL: process.env.APP_URL as string
  },
  assets: {
    styles: ["/public/quill.snow.css", "/public/page_settings.css"]
  },
  pages: {
    setting: {
      label: "Setting",
      component: Pages.Setting
    }
  },
  locale: {
    language: "en",
    translations: {
      properties: {
        gallery: "Gallery (multiple images)"
      }
    }
  }
};
