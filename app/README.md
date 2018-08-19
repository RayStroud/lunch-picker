Setup `config/aws-config.js` with the following:

```javascript
export default {
  apiGateway: {
    REGION: 'API_GATEWAY_REGION',
    URL: 'API_GATEWAY_URL'
  },
  cognito: {
    REGION: 'COGNITO_REGION',
    USER_POOL_ID: 'COGNITO_USER_POOL_ID',
    APP_CLIENT_ID: 'COGNITO_APP_CLIENT_ID',
    IDENTITY_POOL_ID: 'IDENTITY_POOL_ID'
  },
};
```
