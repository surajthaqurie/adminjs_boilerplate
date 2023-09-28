import { IOffer, IPaginationResponse } from "src/interfaces";
import { prisma } from "src/utility";

const { offer: Offer } = prisma;

const getOffers = async (): Promise<IPaginationResponse<IOffer>> => {
  const [total_count, offers] = await prisma.$transaction([
    Offer.count(),
    Offer.findMany()
  ]);
  return {
    data: offers,
    total_count: total_count
  };
};

export const offer_service = {
  getOffers
};
