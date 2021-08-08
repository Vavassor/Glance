export interface AccessToken {
  accessToken: string;
  expirationDate: Date;
  refreshToken?: string;
}
