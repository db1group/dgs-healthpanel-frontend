import * as Msal from '@azure/msal-browser';
import { AuthStore } from '../../store/auth-store.interface';

import { AuthAd } from './auth-ad';

export class MicrosoftAdService implements AuthAd {
  constructor(private readonly storeService: AuthStore) {}

  connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const config = this.createConfig();
      const msalInstance = new Msal.PublicClientApplication(config);

      const loginRequest = {
        scopes: this.getScopes(),
      };
      const handleResponse = (response: any) => {
        if (response !== null) {
          this.insertStore(response.accessToken, response.account?.name);
          resolve(true);
          return;
        }

        const currentAccounts = msalInstance.getAllAccounts();
        if (currentAccounts.length === 0) {
          msalInstance.loginRedirect(loginRequest);
        } else if (currentAccounts.length) {
          return msalInstance
            .acquireTokenSilent({
              scopes: this.getScopes(),
              account: currentAccounts[0],
            })
            .then((response: any) => {
              this.insertStore(response.accessToken, response.account?.name);
              resolve(true);
            })
            .catch((err) => {
              reject(err);
            });
        }
      };

      msalInstance.handleRedirectPromise().then(handleResponse);
    });
  }

  private insertStore(token: string, username: string) {
    this.storeService.setToken(token);
    this.storeService.setUsername(username);
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
