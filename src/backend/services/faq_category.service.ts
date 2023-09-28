import { IFaqCategory, IPaginationResponse } from "src/interfaces";
import { prisma, paginated_query } from "src/utility";
const { fAQCategory: FAQCategory } = prisma;

const getFAQCategories = async (page: number, itemNo: number): Promise<IPaginationResponse<IFaqCategory>> => {
  const pagination_query = paginated_query(page, itemNo);

  const [count, faq_categories] = await prisma.$transaction([FAQCategory.count(), FAQCategory.findMany({ ...pagination_query })]);

  return {
    data: faq_categories,
    total_count: count
  };
};

export const faq_category_service = {
  getFAQCategories
};
