import { bodyToStoreAdd } from "../dtos/store-add.dto.js";
import { storeAdd } from "../services/store-add.service.js";

export const handleStoreAdd = async (req, res, next) => {
   /*
    #swagger.tags = ['Stores']
    #swagger.summary = '가게 등록 API';
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
              name: { type: "string" },
              address: { type: "string" },
              stars: { type: "number" },
              reviews: { type: "number" },
              store_type: { type: "string" },
              price: { type: "number" },
              menu_name: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게 등록 성공 응답",
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
                  result: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      name: { type: "string" },
                      address: { type: "string" },
                      stars: { type: "number" },
                      reviews: { type: "number" },
                      store_type: { type: "string" },
                      price: { type: "number" },
                      menu_name: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 등록 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "COMMON001" },
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
    console.log("가게 등록을 요청했습니다!");
    
    // dto 변환
    const storeData = bodyToStoreAdd(req.body);
    
    // 서비스 호출
    const result = await storeAdd(storeData);
    
    // 통일된 성공 응답
    res.success(result);
  } catch (err) {
    // 에러를 전역 핸들러로 전달
    next(err);
  }
};