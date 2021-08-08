export interface Environment {
  apiRoot: string;
  nodeEnv: "development" | "production" | "test";
  oauthClientId: string;
}

const defaults = {
  apiRoot: "http://localhost:3001/v1",
};

const loadEnvironmentVariable = (key: string, defaultValue = ""): string => {
  const value = process.env[key];
  const isVariableRequired = !defaultValue;
  if (isVariableRequired && value === undefined) {
    console.warn(
      `Environment variable '${key}' was not set. Is it in the .env file?`
    );
  }
  return value || defaultValue;
};

export const getEnvironment = () => {
  const apiRoot = loadEnvironmentVariable(
    "REACT_APP_API_ROOT",
    defaults.apiRoot
  );
  const oauthClientId = loadEnvironmentVariable("REACT_APP_OAUTH_CLIENT_ID");

  const environment: Environment = {
    apiRoot,
    nodeEnv: process.env.NODE_ENV,
    oauthClientId,
  };

  return environment;
};
