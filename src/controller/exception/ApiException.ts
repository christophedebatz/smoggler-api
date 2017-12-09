import { ServiceErrorCodes } from '../../service/exception/ServiceException';

export default class ApiException {

  private hasError:boolean;

  private error: string = undefined;

  private cause: string;

  constructor(error: string, cause: string|undefined = undefined) {
    this.error = error;
    this.cause = cause;
    if (this.error) {
      this.hasError = true;
    }
  }

  public static fromServiceCode(code:any):ApiException {
    return new ApiException(code.name);
  }
}
