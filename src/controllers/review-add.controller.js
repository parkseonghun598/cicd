import { bodyToReviewAdd } from "../dtos/review-add.dto.js";
import { reviewAdd } from "../services/review-add.service.js";

export const handleReviewAdd = async (req, res, next) => {
   /*
    #swagger.tags = ['Reviews']
    #swagger.summary = '리뷰 등록 API';
    #swagger.security = [{
      "bearerAuth": []
    }];
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              store_id: { type: "number" },
              title: { type: "string" },
              context: { type: "string" },
              score: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 등록 성공 응답",
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
                  id: { type: "number" },
                  store_id: { type: "number" },
                  user_id: { type: "number" },
                  title: { type: "string" },
                  context: { type: "string" },
                  score: { type: "number" },
                  created_at: { type: "string" },
                  updated_at: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "리뷰 등록 실패 응답",
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
    console.log("리뷰 등록을 요청했습니다!");
    
    
    const userId = req.user.id;
    
    // dto 변환
    const reviewData = bodyToReviewAdd(req.body, userId);

    // 서비스 레이어 호출
    const result = await reviewAdd(reviewData);

    // 통일된 성공 응답
    res.success(result);
  } catch (err) {
    // 에러를 전역 핸들러로 전달
    next(err);
  }
};
