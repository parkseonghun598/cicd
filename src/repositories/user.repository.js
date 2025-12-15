import { prisma } from "../db.config.js";
import { UserNotFoundError, DuplicateUserEmailError } from "../errors.js";

export const addUser = async (data) => {
  try {
    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      return null;
    }

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        name: data.name,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        password: data.password,
        email: data.email,
        phoneNumber: data.phoneNumber,
      }
    });

    return user.id;
  } catch (err) {
    console.log(err);
    throw new DuplicateUserEmailError(
      `이메일이 중복되었습니다.`,
      {error: err.message}
    )
  }
};
//약관 동의 저장
export const setAgreements = async (userId) => {
  try {
    await prisma.agreement.create({
      data: {
        userId: userId,
        isServiceAgreed: true,
        isPersonalAgreed: true,
        isLocationAgreed: true,
        isAlramAgreed: true,
        ifFourteenAgreed: true,
      }
    });
  } catch (err) {
    throw new Error(`DB 오류(setAgreements): ${err}`);
  }
};
//선호 카테고리 매핑
export const setPreferences = async (userId, preferences) => {
  try {
    //Bulk Insert 방식으로 다수 카테고리 등록
    const data = preferences.map((categoryId) => ({
      userId: userId,
      categoryId: categoryId,
    }));
    
    await prisma.userPreference.createMany({
      data: data,
    });
  } catch (err) {
    throw new Error(`DB 오류(setPreferences): ${err}`);
  }
};
// 사용자 정보 얻기
export const getUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    console.log(user);

    if (!user) {
      throw new UserNotFoundError(
        "사용자를 찾을 수 없습니다.",
        { userId }
      );
    }

    return [user]; // 기존 코드 호환성을 위해 배열로 반환
  } catch (err) {
    throw err; // 커스텀 에러 또는 원본 에러 그대로 전달
  }
};

// 사용자 선호 카테고리 조회
export const getUserPreferencesByUserId = async (userId) => {
  try {
    // 먼저 사용자 존재 확인
    const userExists = await prisma.user.count({
      where: { id: userId }
    });

    if (userExists === 0) {
      throw new UserNotFoundError(
        "사용자를 찾을 수 없습니다.",
        { userId }
      );
    }

    const preferences = await prisma.userPreference.findMany({
      where: { userId: userId },
      include: {
        category: true,
      },
      orderBy: {
        categoryId: 'asc',
      }
    });

    // 기존 응답 형식에 맞게 변환
    return preferences.map(p => ({
      mapping_id: p.id,
      category_id: p.categoryId,
      category_name: p.category.name,
    }));
  } catch (err) {
    throw err; // 커스텀 에러 또는 원본 에러 그대로 전달
  }
};
