import { addStore, getStoreById } from "../repositories/store-add.repository.js";
import { responseFromStoreAdd } from "../dtos/store-add.dto.js";
import { StoreNotFoundError } from "../errors.js";

export const storeAdd = async (data) => {
  // 가게 등록
  const storeId = await addStore(data);

  // 가게 정보 조회
  const store = await getStoreById(storeId);

  if (!store) {
    throw new StoreNotFoundError(
      "등록된 가게를 찾을 수 없습니다.",
      { storeId }
    );
  }

  // dto 변환 후 반환
  return responseFromStoreAdd(store);
};
