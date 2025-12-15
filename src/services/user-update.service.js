import { responseFromUserUpdate } from "../dtos/user-update.dto.js";
import { updateUser, getUser } from "../repositories/user-update.repository.js";
import { UserNotFoundError } from "../errors.js";

export const userUpdate = async (userId, data) => {
  // 사용자 존재 여부 확인
  const existingUser = await getUser(userId);
  if (!existingUser) {
    throw new UserNotFoundError("사용자를 찾을 수 없습니다.", { userId });
  }

  // 사용자 정보 업데이트
  const updatedUser = await updateUser(userId, data);

  // DTO 변환하여 응답
  return responseFromUserUpdate(updatedUser);
};

