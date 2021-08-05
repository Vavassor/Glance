import { getEnvironment } from "./Environment";

export const logError = (message: string, error?: any, attributes?: any) => {
  const { nodeEnv } = getEnvironment();
  if (nodeEnv === "development") {
    console.error(message);
  } else {
    // const body = {
    //   message,
    //   source_error: serializeError(error),
    // };
    // const messageJson = JSON.stringify(body);

    // @TODO: Log messages to a service.
  }
};
