import * as Msal from '@azure/msal-browser';
import { AuthStore } from '../../store/auth-store.interface';

import { AuthAd } from './auth-ad';

export class MicrosoftAdService implements AuthAd {
  constructor(private readonly storeService: AuthStore) {}

  connect(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const config = this.createConfig();
      const msalInstance = new Msal.PublicClientApplication(config);

      var loginRequest = {
        scopes: ['user.read'], // optional Array<string>
      };
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length) {
        return msalInstance
          .acquireTokenSilent({
            scopes: this.getScopes(),
            account: accounts[0],
          })
          .then((response: any) => {
            console.log('Silent token acquisition success');
            this.insertStore(response.accessToken, response.account?.name);
            resolve(true);
          });
      }

      try {
        const response: any = await msalInstance.loginPopup(loginRequest);
        this.insertStore(response.accessToken, response.account?.name);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  private insertStore(token: string, username: string) {
    this.storeService.setToken(token);
    this.storeService.setUsername(username);
  }

  private getScopes() {
    return ['user.read'];
  }

  private createConfig(): Msal.Configuration {
    const your_tenant_id = import.meta.env.VITE_MICROSOFT_AD_TENANT_ID;
    const msalConfig: Msal.Configuration = {
      auth: {
        clientId: import.meta.env.VITE_MICROSOFT_AD_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${your_tenant_id}`,
        redirectUri: import.meta.env.VITE_URL,
      },
      cache: {
        cacheLocation: 'localStorage',
      },
    };

    return msalConfig;
  }
}
