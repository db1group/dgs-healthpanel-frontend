import * as Msal from '@azure/msal-browser';
import { AuthStore } from '../../store/modules/auth/auth-store.interface';

import { AuthAd } from './auth-ad';

export class MicrosoftAdService implements AuthAd {
  private msalInstance: Msal.PublicClientApplication;

  constructor(private readonly storeService: AuthStore) {
    this.msalInstance = new Msal.PublicClientApplication(this.createConfig());
  }

  connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const loginRequest = {
        scopes: this.getScopes(),
      };
      const handleResponse = (response: any) => {
        if (response !== null) {
          this.insertStore(response.accessToken, response.account);
          resolve(true);
          return;
        }

        const currentAccounts = this.msalInstance.getAllAccounts();
        if (currentAccounts.length === 0) {
          this.msalInstance.loginRedirect(loginRequest);
        } else if (currentAccounts.length) {
          return this.msalInstance
            .acquireTokenSilent({
              scopes: this.getScopes(),
              account: currentAccounts[0],
            })
            .then((response: any) => {
              this.insertStore(response.accessToken, response.account);
              resolve(true);
            })
            .catch((err) => {
              reject(err);
            });
        }
      };

      this.msalInstance.handleRedirectPromise().then(handleResponse);
    });
  }

  public async refreshToken(): Promise<string> {
    const currentAccounts = this.msalInstance.getAllAccounts();
    if (currentAccounts.length) {
      try {
        const response = await this.msalInstance.acquireTokenSilent({
          scopes: this.getScopes(),
          account: currentAccounts[0],
        });
        this.insertStore(response.accessToken, response.account);
        return response.accessToken;
      } catch (err) {
        console.error(err);
      }
    }
    console.error('Not find account to refresh token');
    return '';
  }

  private insertStore(token: string, account: any) {
    this.storeService.setToken(token);
    this.storeService.setUsername(account.name);
    this.storeService.setUserCode(account.username.split('@')[0]);
  }

  private getScopes() {
    return [`api://${import.meta.env.VITE_MICROSOFT_AD_CLIENT_ID}/ReadAccess`];
  }

  private createConfig(): Msal.Configuration {
    const tenantId = import.meta.env.VITE_MICROSOFT_AD_TENANT_ID;
    const msalConfig: Msal.Configuration = {
      auth: {
        clientId: import.meta.env.VITE_MICROSOFT_AD_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri: import.meta.env.VITE_URL,
      },
      cache: {
        cacheLocation: 'localStorage',
      },
    };

    return msalConfig;
  }
}
