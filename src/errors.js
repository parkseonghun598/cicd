// Base Custom Error
export class CustomError extends Error {
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// User 관련 에러
export class DuplicateUserEmailError extends CustomError {
  errorCode = "U001";
  statusCode = 409; // Conflict
}

export class UserNotFoundError extends CustomError {
  errorCode = "U002";
  statusCode = 404; // Not Found
}

// Store 관련 에러 
export class StoreNotFoundError extends CustomError {
  errorCode = "S001";
  statusCode = 404;
}

// Mission 관련 에러
export class MissionNotFoundError extends CustomError {
  errorCode = "M001";
  statusCode = 404;
}

export class MissionAlreadyChallengedException extends CustomError {
  errorCode = "M002";
  statusCode = 409; // Conflict
}

export class MissionAlreadyCompletedError extends CustomError {
  errorCode = "M003";
  statusCode = 400; // Bad Request
}

// Review 관련 에러 
export class ReviewNotFoundError extends CustomError {
  errorCode = "R001";
  statusCode = 404;
}