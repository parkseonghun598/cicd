import { addMission, getMission, checkStoreExists } from "../repositories/mission-add.repository.js";
import { responseFromMissionAdd } from "../dtos/mission-add.dto.js";
import { StoreNotFoundError, MissionNotFoundError } from "../errors.js";

export const missionAdd = async (data) => {
  // 가게가 존재하는지 확인
  const storeExists = await checkStoreExists(data.store_id);
  if (!storeExists) {
    throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId: data.store_id });
  }

  // 미션 등록
  const missionId = await addMission(data);

  // 미션 조회
  const mission = await getMission(missionId);

  if (!mission) {
    throw new MissionNotFoundError(
      "등록된 미션을 찾을 수 없습니다.",
      { missionId }
    );
  }

  // 응답 dto 변환
  return responseFromMissionAdd(mission);
};
