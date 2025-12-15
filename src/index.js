import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerAutogen from "swagger-autogen"
import swaggerUiExpress from "swagger-ui-express"

import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleUserUpdate } from "./controllers/user-update.controller.js";
import { handleStoreAdd } from "./controllers/store-add.controller.js";
import { handleMissionAdd } from "./controllers/mission-add.controller.js";
import { handleMissionChallenge } from "./controllers/mission-challenge.controller.js";
import { handleReviewAdd } from "./controllers/review-add.controller.js";
import { handleGetUserReviews } from "./controllers/user-reviews.controller.js";
import { handleGetStoreMissions } from "./controllers/store-missions.controller.js";
import { handleGetUserInProgressMissions, handleCompleteMission } from "./controllers/user-missions.controller.js";

import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { Prisma } from "@prisma/client";


dotenv.config();

passport.use(googleStrategy);
passport.use(jwtStrategy);
const app = express();
const port = process.env.PORT;

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(morgan('dev')); // 로그 출력
app.use(cookieParser()); // cookie 파싱
app.use(passport.initialize()); // passport 초기화


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// JWT 인증 미들웨어
const isLogin = passport.authenticate('jwt', { session: false });

app.post("/api/v1/users/signup", handleUserSignUp);
app.put("/api/v1/users/me", isLogin, handleUserUpdate); // 내 정보 수정 (로그인 필요)
app.post("/api/v1/stores", isLogin, handleStoreAdd); // 로그인 필요
app.post("/api/v1/missions", isLogin, handleMissionAdd); // 로그인 필요
app.post("/api/v1/missions/challenge", isLogin, handleMissionChallenge); // 로그인 필요
app.post("/api/v1/reviews", isLogin, handleReviewAdd); // 로그인 필요

app.get("/api/v1/users/me/reviews", isLogin, handleGetUserReviews); // 내가 작성한 리뷰 목록 (로그인 필요)
app.get("/api/v1/stores/:storeId/missions", isLogin, handleGetStoreMissions); // 특정 가게의 미션 목록 (로그인 필요)
app.get("/api/v1/users/me/missions/in-progress", isLogin, handleGetUserInProgressMissions); // 내 진행 중인 미션 (로그인 필요)
app.patch("/api/v1/users/me/missions/:missionId/complete", isLogin, handleCompleteMission); // 내 미션 완료 처리 (로그인 필요)

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//swagger 사용하기
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
    url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 9th",
      description: "UMC 9th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});


app.get("/oauth2/login/google", 
  passport.authenticate("google", { 
    session: false 
  })
);
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
	  session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    const tokens = req.user; 

    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
          message: "Google 로그인 성공!",
          tokens: tokens, // { "accessToken": "...", "refreshToken": "..." }
      }
    });
  }
);

app.get('/mypage', isLogin, (req, res) => {
  res.status(200).success({
    message: `인증 성공! ${req.user.name}님의 마이페이지입니다.`,
    user: req.user,
  });
});