import dotenv from "dotenv";
import { dirname } from "path";
import { parseBoolean } from "./String";

export enum Environment {
  Development = "development",
  Production = "production",
}

export interface Config {
  environment: Environment;
  fileRoot: string;
  mysqlConnectionUri?: string;
  mysqlHost: string;
  mysqlPassword: string;
  mysqlPort: number;
  mysqlUsername: string;
  port: number;
  privateKey?: string;
  resetDatabase: boolean;
  sendgridApiKey: string;
  urlRoot: string;
}

const defaults = {
  mysqlHost: "localhost",
  mysqlPassword: "admin",
  mysqlPort: "3306",
  mysqlUsername: "root",
  port: "3001",
  resetDatabase: false,
  urlRoot: "http://localhost",
};

const findFirstEnvironmentVariable = (keys: string[]): string | undefined => {
  const foundKey = keys.find((key) => !!process.env[key]);
  if (foundKey) {
    return process.env[foundKey]
  }
  return undefined
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

/**
 * Loads the private key on-demand from file and caches it to return for
 * subsequent runs.
 */
export const getPrivateKey = async (config: Config): Promise<string> => {
  if (!config.privateKey) {
    const privateKey = process.env.JWT_KEY;
    if (!privateKey) {
      throw new Error("Environment variable JWT_KEY was not set.")
    }
    config.privateKey = privateKey;
  }
  return config.privateKey;
};

export const loadConfig = (): Config => {
  dotenv.config();

  const environment = getEnvironment(process.env.NODE_ENV);
  const fileRoot = dirname(__dirname);
  const mysqlConnectionUri = findFirstEnvironmentVariable(["JAWSDB_URL"]);
  const mysqlHost = loadEnvironmentVariable("MYSQL_HOST", defaults.mysqlHost);
  const mysqlPassword = loadEnvironmentVariable(
    "MYSQL_PASSWORD",
    defaults.mysqlPassword
  );
  const mysqlPort = parseInt(
    loadEnvironmentVariable("MYSQL_PORT", defaults.mysqlPort)
  );
  const mysqlUsername = loadEnvironmentVariable(
    "MYSQL_USERNAME",
    defaults.mysqlUsername
  );
  const port = parseInt(loadEnvironmentVariable("PORT", defaults.port));
  const resetDatabase = parseBoolean(
    loadEnvironmentVariable("RESET_DATABASE", defaults.resetDatabase.toString())
  );
  const sendgridApiKey = loadEnvironmentVariable("SENDGRID_API_KEY");
  const urlRootWithoutPort = loadEnvironmentVariable(
    "URL_ROOT",
    defaults.urlRoot
  );
  const urlRoot = `${urlRootWithoutPort}:${port}`;

  const config: Config = {
    environment,
    fileRoot,
    mysqlConnectionUri,
    mysqlHost,
    mysqlPassword,
    mysqlPort,
    mysqlUsername,
    port,
    resetDatabase,
    sendgridApiKey,
    urlRoot,
  };

  return config;
};

export const config = loadConfig();
