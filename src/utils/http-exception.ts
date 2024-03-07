class HttpException extends Error {
  public statusCode: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.message = message;
    this.statusCode = status;
  }
}

export default HttpException;
