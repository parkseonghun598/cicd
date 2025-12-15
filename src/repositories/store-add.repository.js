import { prisma } from "../db.config.js";

// 가게 추가
export const addStore = async (data) => {
  try {
    const store = await prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        stars: data.stars || 3, // 별점의 기본값은 3
        reviews: data.reviews || 0,
        storeType: data.store_type,
        price: data.price || 0,
        menuName: data.menu_name || null,
      }
    });

    return store.id;
  } catch (err) {
    throw new Error(`DB 오류(addStore): ${err}`);
  }
};

// 가게 단일 조회
export const getStoreById = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId }
    });
    return store;
  } catch (err) {
    throw new Error(`DB 오류(getStoreById): ${err}`);
  }
};
