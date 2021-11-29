export class WrongTypeError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, WrongTypeError.prototype);
  }

  getMessage() {
    return this.message;
  }
}
