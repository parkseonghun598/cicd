import { bodyToUserUpdate } from "../dtos/user-update.dto.js";
import { userUpdate } from "../services/user-update.service.js";

export const handleUserUpdate = async (req, res, next) => {
  /*
   #swagger.tags = ['Users']
   #swagger.summary = '내 정보 수정 API';
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
             gender: { type: "string" },
             birth: { type: "string", format: "date" },
             address: { type: "string" },
             detailAddress: { type: "string" },
             phoneNumber: { type: "string" }
           }
         }
       }
     }
   };
   #swagger.responses[200] = {
     description: "사용자 정보 수정 성공 응답 (PUT은 200 OK 사용)",
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
                 email: { type: "string" },
                 name: { type: "string" },
                 gender: { type: "string" },
                 birth: { type: "string" },
                 address: { type: "string" },
                 detailAddress: { type: "string" },
                 phoneNumber: { type: "string" }
               }
             }
           }
         }
       }
     }
   };
   #swagger.responses[404] = {
     description: "사용자를 찾을 수 없음",
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
    console.log("사용자 정보 수정을 요청했습니다!");

    // JWT에서 인증된 사용자 ID 가져오기
    const userId = req.user.id;

    // dto 변환
    const updateData = bodyToUserUpdate(req.body);

    // 서비스 레이어 호출
    const result = await userUpdate(userId, updateData);

    // 통일된 성공 응답
    res.success(result);
  } catch (err) {
    // 에러를 전역 핸들러로 전달
    next(err);
  }
};

