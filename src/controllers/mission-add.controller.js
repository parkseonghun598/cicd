import { bodyToMissionAdd } from "../dtos/mission-add.dto.js";
import { missionAdd } from "../services/mission-add.service.js";

export const handleMissionAdd = async (req, res, next) => {
   /*
    #swagger.tags = ['Missions']
    #swagger.summary = '미션 등록 API';
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
              point: { type: "number" },
              store_id: { type: "number" },
              start_date: { type: "string", format: "date" },
              end_date: { type: "string", format: "date" },
              region: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 등록 성공 응답",
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
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      point: { type: "number" },
                      store_id: { type: "number" },
                      start_date: { type: "string" },
                      end_date: { type: "string" },
                      region: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "미션 등록 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
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
    console.log("미션 등록을 요청했습니다!");
    
    // dto 변환
    const missionData = bodyToMissionAdd(req.body);

    // service 레이어 호출
    const result = await missionAdd(missionData);

    // 통일된 성공 응답
    res.success(result);
  } catch (err) {
    // 에러를 전역 핸들러로 전달
    next(err);
  }
};
