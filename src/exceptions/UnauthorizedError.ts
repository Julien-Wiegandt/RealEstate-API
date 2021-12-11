export class UnauthorizedError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  getMessage() {
    return this.message;
  }
}
