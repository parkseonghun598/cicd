//요청
export const bodyToStoreAdd = (body) => {
  return {
    name: body.name,
    address: body.address,
    stars: body.stars || 0,
    reviews: body.reviews || 0,
    store_type: body.store_type || "type1",
    price: body.price || 0,
    menu_name: body.menu_name || "",
  };
};

//응답
export const responseFromStoreAdd = (store) => {
  return {
    data: {
      id: store.id,
      name: store.name,
      address: store.address,
      stars: store.stars,
      reviews: store.reviews,
      store_type: store.storeType,
      price: store.price,
      menu_name: store.menuName,
    },
  };
};
