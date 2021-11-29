export class UniqueError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, UniqueError.prototype);
  }

  getMessage() {
    return this.message;
  }
}
