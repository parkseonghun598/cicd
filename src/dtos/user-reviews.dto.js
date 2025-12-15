// 리뷰 목록 응답 DTO
export const responseFromUserReviews = (reviews) => {
  return {
    data: reviews.map(review => ({
      id: review.id,
      store: {
        id: review.store.id,
        name: review.store.name,
        address: review.store.address,
      },
      title: review.title,
      content: review.context,
      score: review.score,
      createdAt: review.createdAt,
    })),
    pagination: {
      cursor: reviews.length > 0 ? reviews[reviews.length - 1].id : null,
    }
  };
};

