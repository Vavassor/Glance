export interface TokenAdo {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type: string;
}

export interface TokenGrantRefreshTokenAdo {
  client_id: string;
  grant_type: "refresh_token";
  refresh_token: string;
  scope?: string;
}
