import { prisma } from "../db.config.js";
//mission-mapping table 사용
// 중복 도전 여부 체크
export const checkUMExists = async (userId, missionId) => {
  try {
    const count = await prisma.userMission.count({
      where: {
        userId: userId,
        missionId: missionId,
      }
    });
    return count > 0;
  } catch (err) {
    throw new Error(`DB 오류(checkUMExists): ${err}`);
  }
};

// 도전 미션 추가
export const addUserMission = async (data) => {
  try {
    await prisma.userMission.create({
      data: {
        userId: data.user_id,
        missionId: data.mission_id,
        status: '진행중',
      }
    });
  } catch (err) {
    console.log(err);
    throw new Error(`DB 오류(addUserMission): ${err.message}`);
  }
};

// 사용자 미션 조회
export const getUserMission = async (userId, missionId) => {
  try {
    const userMission = await prisma.userMission.findFirst({
      where: {
        userId: userId,
        missionId: missionId,
      }
    });
    return userMission;
  } catch (err) {
    console.log(err);
    throw new Error(`DB 오류(getUserMission): ${err.message}`);
  }
};
