// 요청
export const bodyToUserMissionAdd = (body, userId) => {
  return {
    user_id: userId, 
    mission_id: body.mission_id,
  };
};

// 응답
export const responseFromUserMissionAdd = (userMission) => {
  return {
    data:{
      user_id: userMission.user_id,
      mission_id: userMission.mission_id,
      status: userMission.status,
      created_at: userMission.created_at,
    }
  };
};
