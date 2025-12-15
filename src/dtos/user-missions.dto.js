// 진행 중인 미션 목록 응답 DTO
export const responseFromUserMissions = (userMissions) => {
  return {
    data: userMissions.map(um => ({
      id: um.id,
      mission: {
        id: um.mission.id,
        point: um.mission.point,
        startDate: um.mission.startDate,
        endDate: um.mission.endDate,
        region: um.mission.region,
      },
      store: {
        id: um.mission.store.id,
        name: um.mission.store.name,
        address: um.mission.store.address,
      },
      status: um.status,
      createdAt: um.createdAt,
    })),
    pagination: {
      cursor: userMissions.length > 0 ? userMissions[userMissions.length - 1].id : null,
    }
  };
};

// 미션 완료 응답 DTO
export const responseFromCompleteMission = (userMission) => {
  return {
    id: userMission.id,
    mission: {
      id: userMission.mission.id,
      point: userMission.mission.point,
      startDate: userMission.mission.startDate,
      endDate: userMission.mission.endDate,
      region: userMission.mission.region,
    },
    store: {
      id: userMission.mission.store.id,
      name: userMission.mission.store.name,
      address: userMission.mission.store.address,
    },
    status: userMission.status,
    updatedAt: userMission.updatedAt,
  };
};

