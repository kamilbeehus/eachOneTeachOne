export class AuthenticationError extends Error {
  constructor(message = "Invalid email or password.") {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

export class ValidationError extends Error {
  constructor(message = "All fields are required.") {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

export class EmailAlreadyInUseError extends Error {
  constructor(message = "Email already in use.") {
    super(message);
    this.name = "EmailAlreadyInUseError";
    this.statusCode = 400;
  }
}

export class SkillNotValidError extends Error {
  constructor(message = "The provided skill is not valid.") {
    super(message);
    this.name = "SkillNotValidError";
    this.statusCode = 400;
  }
}

export class InstructorNotFoundError extends Error {
  constructor(message = "Instructor not found.") {
    super(message);
    this.name = "InstructorNotFoundError";
    this.statusCode = 404;
  }
}

export class CourseNotFoundError extends Error {
  constructor(message = "Course not found.") {
    super(message);
    this.name = "CourseNotFoundError";
    this.statusCode = 404;
  }
}

export class UserNotFoundError extends Error {
  constructor(message = "User not found.") {
    super(message);
    this.name = "UserNotFoundError";
    this.statusCode = 404;
  }
}
