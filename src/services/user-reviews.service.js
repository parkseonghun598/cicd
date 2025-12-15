import { getUserReviews } from "../repositories/user-reviews.repository.js";
import { responseFromUserReviews } from "../dtos/user-reviews.dto.js";
import { prisma } from "../db.config.js";
import { UserNotFoundError } from "../errors.js";

export const listUserReviews = async (userId, cursor) => {
  // 사용자 존재 확인
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new UserNotFoundError(
      "사용자를 찾을 수 없습니다.",
      { userId }
    );
  }

  // 리뷰 목록 조회
  const reviews = await getUserReviews(userId, cursor);

  // DTO 변환
  return responseFromUserReviews(reviews);
};

