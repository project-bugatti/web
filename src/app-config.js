const appConfig = {
  version: "1.0",
  api: {
    endpoint: "https://api.thegc.cf/dev/",
    key: "iEwnqC4HQL7mEs0zPC7i5lBXkwnrke17HzCBplF8",
    presigned: "presigned"
  },
  subdomains: {
    media: "https://media.thegc.cf/",
  },
  auth0: {
    clientId: "2pi676xhRZHzNhnBvQ9Qhvx1BLE34aFv",
    domain: "thegc.auth0.com",
    audience: "https://api.thegc.cf",
    redirectUri: "https://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  },
  maxFileSize: 6000000  // six megabytes, maximum size allowed when uploading media
};

export default appConfig;
