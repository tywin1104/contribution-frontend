interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'Aw4GUADHFmT1gSUWbsHHKVQkk63JNGTi',
  domain: 'tywinzhang.auth0.com',
  callbackURL: 'http://localhost:5000/callback'
};