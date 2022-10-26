import { HttpStatus } from '../enums/http-status.enum';
import { isString } from '../utils/shared.utils';
import { HttpException, HttpExceptionOptions } from './http.exception';

/**
 * Defines an HTTP exception for *Bad Request* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 *
 * @publicApi
 */
export class BadRequestException extends HttpException {
  /**
   * Instantiate a `BadRequestException` Exception.
   *
   * @example
   * `throw new BadRequestException()`
   *
   * @usageNotes
   * The HTTP response status code will be 400.
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `description` argument contains a short description of the HTTP error.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 400.
   * - `message`: the string `'Bad Request'` by default; override this by supplying
   * a string in the `objectOrError` parameter.
   *
   * If the parameter `objectOrError` is a string, the response body will contain an
   * additional property, `error`, with a short description of the HTTP error. To override the
   * entire JSON response body, pass an object instead. Nest will serialize the object
   * and return it as the JSON response body.
   *
   * @param objectOrError string or object describing the error condition.
   * @param descriptionOrOptions a short description of the HTTP error.
   */
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions:
      | string
      | (HttpExceptionOptions & { description?: string }) = 'Bad Request',
  ) {
    const description = isString(descriptionOrOptions)
      ? descriptionOrOptions
      : descriptionOrOptions.description;

    const httpExceptionOptions = isString(descriptionOrOptions)
      ? {}
      : descriptionOrOptions;

    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.BAD_REQUEST,
      ),
      HttpStatus.BAD_REQUEST,
      httpExceptionOptions,
    );
  }
}
