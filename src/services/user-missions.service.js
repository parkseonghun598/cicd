import { 
  getUserInProgressMissions, 
  completeMissionWithPoint
} from "../repositories/user-missions.repository.js";
import { 
  responseFromUserMissions,
  responseFromCompleteMission 
} from "../dtos/user-missions.dto.js";
import { 
  MissionNotFoundError, 
  UserNotFoundError, 
  MissionAlreadyCompletedError 
} from "../errors.js";
import { prisma } from "../db.config.js";

// 진행 중인 미션 목록 조회
export const listUserInProgressMissions = async (userId, cursor) => {
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

  // 미션 목록 조회
  const userMissions = await getUserInProgressMissions(userId, cursor);

  // DTO 변환
  return responseFromUserMissions(userMissions);
};

// 미션 완료 처리 (포인트 적립 포함)
export const completeMission = async (userId, missionId) => {
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

  try {
    // 트랜잭션으로 미션 완료 + 포인트 적립 처리
    const result = await completeMissionWithPoint(userId, missionId);

    // DTO 변환 (포인트 정보 추가)
    return {
      ...responseFromCompleteMission(result.userMission),
      earnedPoint: result.earnedPoint,
    };
  } catch (err) {
    // 미션을 찾을 수 없는 경우
    if (err.message.includes('해당 미션을 찾을 수 없습니다')) {
      throw new MissionNotFoundError(
        "미션을 찾을 수 없습니다.", 
        { userId, missionId }
      );
    }
    
    // 이미 완료된 미션인 경우
    if (err.message.includes('이미 완료된 미션입니다')) {
      throw new MissionAlreadyCompletedError(
        "이미 완료된 미션입니다.",
        { userId, missionId }
      );
    }

    // 기타 에러
    throw err;
  }
};

