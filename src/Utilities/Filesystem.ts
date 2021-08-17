import { access, constants, readFile } from "fs";

export const fileExists = async (path: string) => {
  return new Promise((resolve, reject) => {
    access(path, constants.R_OK, (error) => {
      resolve(!error);
    });
  });
};

export const readTextFile = async (path: string) => {
  return new Promise<string>((resolve, reject) => {
    readFile(path, { encoding: "utf-8" }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
