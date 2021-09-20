import { SerializedError } from "@reduxjs/toolkit";
import { AsyncStatus } from "./AsyncStatus";

export interface AsyncCallState<T> {
  data: T | null;
  error: SerializedError | null;
  status: AsyncStatus;
}
