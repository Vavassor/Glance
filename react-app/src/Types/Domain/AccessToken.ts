export interface AccessToken {
  accessToken: string;
  expirationDate: string;
  refreshToken?: string;
}

export interface AccessTokenPayload {
  sub: string;
}
