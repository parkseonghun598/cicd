import { getStoreMissions } from "../repositories/store-missions.repository.js";
import { responseFromStoreMissions } from "../dtos/store-missions.dto.js";
import { prisma } from "../db.config.js";
import { StoreNotFoundError } from "../errors.js";

export const listStoreMissions = async (storeId, cursor) => {
  // 가게 존재 확인
  const store = await prisma.store.findUnique({
    where: { id: storeId }
  });

  if (!store) {
    throw new StoreNotFoundError(
      "가게를 찾을 수 없습니다.",
      { storeId }
    );
  }

  // 미션 목록 조회
  const missions = await getStoreMissions(storeId, cursor);

  // DTO 변환
  return responseFromStoreMissions(missions);
};

