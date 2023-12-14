export class DatabaseAccessError extends Error {
  constructor(message) {
    super(message);
    this.name = "Database Access Error";
    this.status = 500;
  }
}

export class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Resource Not Found Error";
    this.status = 404;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "Bad Request Error";
    this.status = 400;
  }
}
