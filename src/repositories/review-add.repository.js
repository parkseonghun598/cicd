import { prisma } from "../db.config.js";

// 리뷰 추가하기
export const addReview = async (data) => {
  try {
    const review = await prisma.review.create({
      data: {
        storeId: data.store_id,
        userId: data.user_id,
        title: data.title,
        context: data.context,
        score: data.score,
        // createdAt, updatedAt은 자동으로 설정됨!

      }
    });

    return review.id; 
  } catch (err) {
    throw new Error(`DB 오류(addReview): ${err}`);
  }
};

// 리뷰 단일 조회
export const getReview = async (reviewId, storeId, userId) => {
  try {
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        storeId: storeId,
        userId: userId,
      }
    });
    return review;
  } catch (err) {
    throw new Error(`DB 오류(getReview): ${err}`);
  }
};
