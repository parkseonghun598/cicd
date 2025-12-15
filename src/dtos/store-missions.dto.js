// 가게의 미션 목록 응답 DTO
export const responseFromStoreMissions = (missions) => {
  return {
    data: missions.map(mission => ({
      id: mission.id,
      store: {
        id: mission.store.id,
        name: mission.store.name,
        address: mission.store.address,
      },
      point: mission.point,
      startDate: mission.startDate,
      endDate: mission.endDate,
      region: mission.region,
    })),
    pagination: {
      cursor: missions.length > 0 ? missions[missions.length - 1].id : null,
    }
  };
};

