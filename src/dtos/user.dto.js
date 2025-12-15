export const bodyToUser = (body) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    password: body.password,//필수
    email: body.email, //필수 
    preferences: body.preferences,// 필수 
  };
};
export const responseFromUser = ({ user, preferences }) => {
  return {
    data: {
      email: user.email,
      name: user.name,
      preferCategory: preferences.map((p) => p.category_name),
    },
  };
};