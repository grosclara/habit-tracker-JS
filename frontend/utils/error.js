export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "Server Error";
  }
}

export class ClientError extends Error {
  constructor(message) {
    super(message);
    this.name = "Client Error";
  }
}
