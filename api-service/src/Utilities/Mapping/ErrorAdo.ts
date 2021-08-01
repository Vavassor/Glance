import { ErrorAdo, ErrorSingle } from "@Types/Ado/ErrorAdo";

export const getErrorAdoFromErrorSingle = (error: ErrorSingle): ErrorAdo => {
  return {
    errors: [error],
  };
};
