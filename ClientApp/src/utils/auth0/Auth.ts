import * as auth0 from "auth0-js";
import history from "../history";
import { AUTH_CONFIG } from "./auth0-variables";

export interface IError {
  error: string;
}

export interface IAuthResult {
  accessToken: string;
  idToken: string;
  expiresIn: number;
}

export default class Auth {
  public auth0 = new auth0.WebAuth({
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    clientID: AUTH_CONFIG.clientId,
    domain: AUTH_CONFIG.domain,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: "token id_token",
    scope: "openid"
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  public login() {
    this.auth0.authorize();
  }

  public handleAuthentication() {
    this.auth0.parseHash((err: IError, authResult: IAuthResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/home");
      } else if (err) {
        history.replace("/home");
        // tslint:disable-next-line:no-console
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public setSession(authResult: IAuthResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // navigate to the home route
    history.replace("/home");
  }

  public logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // navigate to the home route
    history.replace("/home");
  }

  public isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at") as string);
    return new Date().getTime() < expiresAt;
  }
}
