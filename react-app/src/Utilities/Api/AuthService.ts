import { AccessToken } from "Types/Domain";
import { ActionQueue } from "Utilities/ActionQueue";
import { exchangeRefreshToken } from "Utilities/Api/AuthResource";
import { isAfterDate } from "Utilities/Date";
import {
  createStoredAccessToken,
  loadAccount,
  storeAccount,
} from "Utilities/Storage";

interface AuthAccount {
  accessToken: AccessToken;
  id: string;
}

export class AuthService {
  accounts: AuthAccount[] = [];
  activeAccountIndex = -1;
  refreshQueue = new ActionQueue<AccessToken>();

  logIn(account: AuthAccount) {
    this.accounts.push(account);
    this.activeAccountIndex = this.accounts.length - 1;
  }

  logOut() {
    if (this.activeAccountIndex !== -1) {
      this.accounts.splice(this.activeAccountIndex, 1);
      this.activeAccountIndex =
        this.accounts.length > 0 ? this.accounts.length - 1 : -1;
    }
  }

  async getRefreshedAccessToken() {
    if (this.activeAccountIndex === -1) {
      throw new Error(
        "Missing an active account while refreshing an access token."
      );
    }

    const { accessToken } = this.accounts[this.activeAccountIndex];

    if (isAfterDate(new Date(), new Date(accessToken.expirationDate))) {
      const activeAccount = this.accounts[this.activeAccountIndex];
      const storedAccount = loadAccount(activeAccount.id);
      if (!storedAccount) {
        throw new Error(
          "Missing a stored account while refreshing an access token."
        );
      }

      const newAccessToken = await this.refreshQueue.runOrEnqueue(
        exchangeRefreshToken(storedAccount.refresh_token)
      );

      storedAccount.access_token = createStoredAccessToken(newAccessToken);
      storeAccount(storedAccount);
      return newAccessToken;
    }

    return accessToken;
  }
}

export const authService = new AuthService();
