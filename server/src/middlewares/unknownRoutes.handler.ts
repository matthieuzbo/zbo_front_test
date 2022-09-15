import { NotFoundException } from "~/utils/exceptions";
import { Request } from "express";

export const UnknownRoutesHandler = (err: undefined, req: Request) => {
  throw new NotFoundException(req.path, req.method);
};
