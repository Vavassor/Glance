export interface StoredAccessToken {
  access_token: string;
  expiration_date: string;
}

export interface StoredAccount {
  access_token: StoredAccessToken;
  id: string;
  refresh_token: string;
}
