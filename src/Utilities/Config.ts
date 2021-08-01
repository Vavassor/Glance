import dotenv from "dotenv";
import { dirname } from "path";

export enum Environment {
  Development = "development",
  Production = "production",
}

export interface Config {
  environment: Environment;
  fileRoot: string;
  port: number;
  urlRoot: string;
}

const defaults = {
  port: "3001",
  urlRoot: "http://localhost",
};

const isEnvironment = (value: any): value is Environment => {
  const values = Object.values(Environment) as string[];
  return typeof value === "string" && values.includes(value);
};

const getEnvironment = (value?: string) => {
  if (isEnvironment(value)) {
    return value;
  }
  return Environment.Production;
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

export const loadConfig = (): Config => {
  dotenv.config();

  const environment = getEnvironment(process.env.NODE_ENV);
  const fileRoot = dirname(__dirname);
  const port = parseInt(loadEnvironmentVariable("PORT", defaults.port));
  const urlRootWithoutPort = loadEnvironmentVariable(
    "URL_ROOT",
    defaults.urlRoot
  );
  const urlRoot = `${urlRootWithoutPort}:${port}`;

  const config: Config = {
    environment,
    fileRoot,
    port,
    urlRoot,
  };

  return config;
};
