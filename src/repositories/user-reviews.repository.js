import { prisma } from "../db.config.js";

// 사용자가 작성한 리뷰 목록 조회 (페이지네이션 포함)
export const getUserReviews = async (userId, cursor) => {
  try {
    const pageSize = 5; // 한 페이지당 5개씩
    
    const reviews = await prisma.review.findMany({
      where: { userId: userId },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            address: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0, // cursor가 있으면 해당 항목 제외
      take: pageSize,
    });

    return reviews;
  } catch (err) {
    throw new Error(`DB 오류(getUserReviews): ${err}`);
  }
};

