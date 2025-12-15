// 요청
export const bodyToMissionAdd = (body) => {
  return {
    point: body.point,
    store_id: body.store_id,
    start_date: new Date(body.start_date), 
    end_date: new Date(body.end_date),
    region: body.region,
  };
};

//응답
export const responseFromMissionAdd = (mission) => {
  return {
    data: {
    id: mission.id,
    point: mission.point,
    store_id: mission.storeId,
    start_date: mission.startDate.toISOString().split('T')[0], // "YYYY-MM-DD" 형식
    end_date: mission.endDate.toISOString().split('T')[0],     // "YYYY-MM-DD" 형식
    region: mission.region,
    },
  };
};
