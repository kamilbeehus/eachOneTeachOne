export class EmailAlreadyInUseError extends Error {
  constructor(message = "Email already in use.") {
    super(message);
    this.name = "EmailAlreadyInUseError";
    this.statusCode = 400;
  }
}

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
