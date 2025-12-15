import { addReview, getReview } from "../repositories/review-add.repository.js";
import { responseFromReviewAdd } from "../dtos/review-add.dto.js";
import { ReviewNotFoundError, StoreNotFoundError, UserNotFoundError } from "../errors.js";
import { prisma } from "../db.config.js";

export const reviewAdd = async (data) => {
  // 사용자 존재 확인
  const user = await prisma.user.findUnique({
    where: { id: data.user_id }
  });

  if (!user) {
    throw new UserNotFoundError(
      "사용자를 찾을 수 없습니다.",
      { userId: data.user_id }
    );
  }

  // 가게 존재 확인
  const store = await prisma.store.findUnique({
    where: { id: data.store_id }
  });

  if (!store) {
    throw new StoreNotFoundError(
      "가게를 찾을 수 없습니다.",
      { storeId: data.store_id }
    );
  }

  // 리뷰 등록
  const reviewId = await addReview(data);

  // 리뷰 조회
  const review = await getReview(reviewId, data.store_id, data.user_id);

  if (!review) {
    throw new ReviewNotFoundError(
      "등록된 리뷰를 찾을 수 없습니다.",
      { reviewId }
    );
  }

  // dto 변환
  return responseFromReviewAdd(review);
};
