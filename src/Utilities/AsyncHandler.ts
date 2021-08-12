import {
  NextFunction,
  Request as ExpressRequest,
  RequestHandler,
  Response as ExpressResponse,
} from "express";
import { ParamsDictionary, ParsedQs } from "Types/Express";

export function asyncHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals = Record<string, any>
>(handler: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>) {
  return (
    request: ExpressRequest<P, ResBody, ReqBody, ReqQuery, Locals>,
    response: ExpressResponse<ResBody, Locals>,
    next: NextFunction
  ) => {
    return Promise.resolve(handler(request, response, next)).catch(next);
  };
}
