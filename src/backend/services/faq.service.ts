import { IFaq, IPaginationResponse } from "src/interfaces";
import { prisma, paginated_query } from "src/utility";
const { fAQ: FAQ } = prisma;

const getFAQs = async (page: number, itemNo: number): Promise<IPaginationResponse<IFaq>> => {
  const pagination_query = paginated_query(page, itemNo);

  const [count, faqs] = await prisma.$transaction([
    FAQ.count(),
    FAQ.findMany({
      ...pagination_query,
      include: {
        FAQCategory: true
      }
    })
  ]);

  return {
    data: faqs,
    total_count: count
  };
};

const getFAQByCategoryId = async (page: number, itemNo: number, faqCategoryId: string): Promise<IPaginationResponse<IFaq>> => {
  const pagination_query = paginated_query(page, itemNo);

  const [count, faqs] = await prisma.$transaction([
    FAQ.count({
      where: {
        FAQCategoryId: faqCategoryId
      }
    }),
    FAQ.findMany({
      ...pagination_query,
      where: {
        FAQCategoryId: faqCategoryId
      },
      include: {
        FAQCategory: true
      }
    })
  ]);

  return {
    data: faqs,
    total_count: count
  };
};

export const faq_service = {
  getFAQs,
  getFAQByCategoryId
};
