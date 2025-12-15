import { prisma } from "../db.config.js";
import { StoreNotFoundError } from "../errors.js";
// 특정 가게의 미션 목록 조회 (페이지네이션 포함)
export const getStoreMissions = async (storeId, cursor) => {
  try {
    const pageSize = 5; // 한 페이지당 5개씩
    
    const missions = await prisma.mission.findMany({
      where: { storeId: storeId },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            address: true,
          }
        }
      },
      orderBy: {
        id: 'desc',
      },
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      take: pageSize,
    });

    return missions;
  } catch (err) {
    console.log(err);
    throw new StoreNotFoundError(
      '해당 id의 가게가 존재하지 않습니다.',
      {error: err.message}
    )
  }
};

