// 요청 - 사용자 정보 수정
export const bodyToUserUpdate = (body) => {
  const updates = {};
  
  if (body.name !== undefined) updates.name = body.name;
  if (body.gender !== undefined) updates.gender = body.gender;
  if (body.birth !== undefined) updates.birth = new Date(body.birth);
  if (body.address !== undefined) updates.address = body.address;
  if (body.detailAddress !== undefined) updates.detailAddress = body.detailAddress;
  if (body.phoneNumber !== undefined) updates.phoneNumber = body.phoneNumber;
  
  return updates;
};

// 응답 - 사용자 정보 수정
export const responseFromUserUpdate = (user) => {
  return {
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      birth: user.birth,
      address: user.address,
      detailAddress: user.detailAddress,
      phoneNumber: user.phoneNumber,
    },
  };
};

