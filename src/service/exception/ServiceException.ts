export const ServiceErrorCodes = {

  USER_NOT_FOUND: { name: 'user.not.found', code: 404 },

  USER_CREATION_ERROR: { name: 'user.creation.error', code: 500 },

  USER_CREATION_DUPLICATE: { name: 'user.creation.duplicate', code: 409 },

  INVALID_INPUT_RANGE: { name: 'invalid.input.range', code: 400 },

  TOO_MANY_ITEMS: { name: 'too.many.items', code: 400 },

  EMPTY_INPUT: { name: 'user.create.empty', code: 400 },

  UNAUTHORIZED: { name: 'unauthorized', code: 401 },

  UNEXPECTED_ERROR: { name: 'unexpected.error', code: 500 },
};

export default class ServiceException {

  private mMessage: string = 'An error occured.';

  private mCause:string;

  private mStatus: number = 500;

  constructor(
    message: any|undefined = undefined,
    cause: string|undefined = undefined,
    status:number|undefined = undefined
  ) {
    if (message) {
      if (typeof message === 'object') {
        this.mMessage = message.name;
        this.mStatus = message.code;
        if (message.cause) {
          this.mCause = message.cause;
        }
      } else {
        this.mMessage = message;
        this.mStatus = status;
      }
      this.mCause = cause;
    }
  }

  get status():number {
    return this.mStatus;
  }

  get message():string {
    return this.mMessage;
  }

  get cause():string {
    return this.mCause;
  }

  set cause(cause: string) {
    this.mCause = cause;
  }

  public static create(codeObject:any, cause:string):object {
    const se:ServiceException = new ServiceException(codeObject);
    se.cause = cause;
    return se;
  }

}
