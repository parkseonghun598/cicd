import { prisma } from "../db.config.js";

// 사용자 정보 수정
export const updateUser = async (userId, data) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: data,
  });

  return user;
};

// 사용자 조회 (존재 여부 확인)
export const getUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
};

