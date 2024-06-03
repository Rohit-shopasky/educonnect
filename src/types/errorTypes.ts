export interface HttpError extends Error {
  status?: number;
}

export class CustomError extends Error implements HttpError {
  constructor(public message: string, public status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
