interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'suKdQtrwuLati4eTGyIl55M6O1QIggeD',
  domain: 'divecenter.eu.auth0.com',
  callbackURL: 'http://localhost:4300/callback'
};
