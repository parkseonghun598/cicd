import { prisma } from "../db.config.js";
import { MissionNotFoundError } from "../errors.js";
// 가게 유무 확인
export const checkStoreExists = async (storeId) => {
  try {
    const count = await prisma.store.count({
      where: { id: storeId }
    });
    return count > 0;
  } catch (err) {
    throw new Error(`DB 오류(checkStoreExists): ${err}`);
  }
};

// 미션 추가
export const addMission = async (data) => {
  try {
    const mission = await prisma.mission.create({
      data: {
        point: data.point,
        storeId: data.store_id,
        startDate: data.start_date,
        endDate: data.end_date,
        region: data.region,
      }
    });
    return mission.id;
  } catch (err) {
    throw new Error(`DB 오류(addMission): ${err}`);
  }
};

// 미션 조회
export const getMission = async (missionId) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: { id: missionId }
    });
    return mission;
  } catch (err) {
    console.log(err);
    throw new MissionNotFoundError(
      '해당 id를 가진 미션이 존재하지 않습니다.',
      {error: err.message}
    )
  }
};
