import { bodyToUserMissionAdd } from "../dtos/mission-challenge.dto.js";
import { userMissionAdd } from "../services/mission-challenge.service.js";

export const handleMissionChallenge = async (req, res, next) => {
   /*
    #swagger.tags = ['Missions']
    #swagger.summary = '미션 도전(시작) API';
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
              mission_id: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 도전 성공 응답",
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
                  user_id: { type: "number" },
                  mission_id: { type: "number" },
                  status: { type: "string" },
                  created_at: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "미션 도전 실패 응답 (사용자 또는 미션을 찾을 수 없음)",
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
    #swagger.responses[409] = {
      description: "미션 도전 실패 응답 (이미 도전 중인 미션)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M002" },
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
    console.log("미션 도전을 요청했습니다!");
    
    // JWT에서 인증된 사용자 ID 가져오기
    const userId = req.user.id;
    
    // dto 변환
    const userMissionData = bodyToUserMissionAdd(req.body, userId);

    // 서비스 레이어 호출
    const result = await userMissionAdd(userMissionData);

    // 통일된 성공 응답
    res.success(result);
  } catch (err) {
    // 에러를 전역 핸들러로 전달
    next(err);
  }
};
