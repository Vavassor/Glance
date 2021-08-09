export interface TokenAdo {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type: string;
}

export interface TokenGrantPasswordAdo {
  client_id: string;
  grant_type: "password";
  password: string;
  scope?: string;
  username: string;
}

export interface TokenGrantRefreshTokenAdo {
  client_id: string;
  grant_type: "refresh_token";
  refresh_token: string;
  scope?: string;
}
