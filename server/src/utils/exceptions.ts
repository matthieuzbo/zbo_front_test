import { ApiException, EntityError } from "~~/types/exceptions";

const invalid_value = "invalid_value";
const not_found = "not_found";
const unexpected_error = "unexpected_error";

class Exception implements ApiException {
  constructor(
    readonly timestamp: string,
    readonly status: number,
    readonly code: string,
    readonly detail: EntityError[] | string | undefined,
    readonly path: string,
    readonly method: string
  ) {}
}

export class InvalidValueException extends Exception {
  constructor(
    path: string,
    method: string,
    detail: EntityError[] | string | undefined
  ) {
    super(
      Date.now().toString(),
      400,
      "400-" + invalid_value,
      detail != undefined ? detail : invalid_value,
      path,
      method
    );
  }
}

export class NotFoundException extends Exception {
  constructor(path: string, method: string) {
    super(
      Date.now().toString(),
      404,
      "404-" + not_found,
      not_found,
      path,
      method
    );
  }
}

export class RandomException extends Exception {
  constructor(path: string, method: string) {
    super(
      Date.now().toString(),
      500,
      "500-" + unexpected_error,
      unexpected_error,
      path,
      method
    );
  }
}
