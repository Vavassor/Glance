export interface AccountLocals {
  accountId: string;
}

export interface ClientLocals {
  clientId: string;
}

export interface ParamsDictionary {
  [key: string]: string;
}

export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
