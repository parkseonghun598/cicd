import {
  checkUMExists,
  addUserMission,
  getUserMission,
} from "../repositories/mission-challenge.repositories.js";
import { responseFromUserMissionAdd } from "../dtos/mission-challenge.dto.js";
import { MissionAlreadyChallengedException, UserNotFoundError, MissionNotFoundError } from "../errors.js";
import { prisma } from "../db.config.js";

export const userMissionAdd = async (data) => {
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

  // 미션 존재 확인
  const mission = await prisma.mission.findUnique({
    where: { id: data.mission_id }
  });

  if (!mission) {
    throw new MissionNotFoundError(
      "미션을 찾을 수 없습니다.",
      { missionId: data.mission_id }
    );
  }

  // 중복수락 여부 확인하기
  const alreadyExists = await checkUMExists(data.user_id, data.mission_id);
  if (alreadyExists) {
    throw new MissionAlreadyChallengedException(
      "이미 도전한 미션입니다.", 
      { userId: data.user_id, missionId: data.mission_id }
    );
  }

  // 도전 등록
  await addUserMission(data);

  // 도전 정보 조회
  const userMission = await getUserMission(data.user_id, data.mission_id);

  // dto 변환
  return responseFromUserMissionAdd(userMission);
};
