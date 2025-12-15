import { listUserReviews } from "../services/user-reviews.service.js";

export const handleGetUserReviews = async (req, res, next) => {
   /*
    #swagger.tags = ['Reviews']
    #swagger.summary = '내가 작성한 리뷰 목록 조회 API';
    #swagger.security = [{
      "bearerAuth": []
    }];
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '커서 기반 페이지네이션 값 (마지막 리뷰 ID)',
      required: false,
      type: 'integer',
      example: 10
    }
    #swagger.responses[200] = {
      description: "사용자 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" }, address: { type: "string" } } },
                        title: { type: "string" },
                        content: { type: "string" },
                        score: { type: "number" },
                        createdAt: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "사용자 리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const userId = req.user.id;
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;

    console.log(`사용자 ${userId}의 리뷰 목록 조회 요청`);

    const result = await listUserReviews(userId, cursor);

    // 통일된 성공 응답
    res.success(result);
  } catch (err) {
    // 에러를 전역 핸들러로 전달
    next(err);
  }
};

