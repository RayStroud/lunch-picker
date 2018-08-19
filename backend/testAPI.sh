########################################################
## add user
########################################################

aws cognito-idp sign-up \
  --region us-west-2 \
  --client-id APP_CLIENT_ID \
  --username test@example.com \
  --password Passw0rd!

########################################################
## approve user
########################################################

aws cognito-idp admin-confirm-sign-up \
--region us-west-2 \
--user-pool-id USER_POOL_ID \
--username test@example.com

########################################################
## addLunch
########################################################

npx aws-api-gateway-cli-test \
--username='test@example.com' \
--password='Passw0rd!' \
--user-pool-id='USER_POOL_ID' \
--app-client-id='APP_CLIENT_ID' \
--cognito-region='us-west-2' \
--identity-pool-id='IDENTITY_POOL_ID' \
--invoke-url='https://API_GATEWAY_PREFIX.execute-api.us-west-2.amazonaws.com/dev' \
--api-gateway-region='us-west-2' \
--path-template='/testgroup' \
--method='POST' \
--body='{"lunchDate":"20180818"}'

########################################################
## listLunches
########################################################

npx aws-api-gateway-cli-test \
--username='test@example.com' \
--password='Passw0rd!' \
--user-pool-id='USER_POOL_ID' \
--app-client-id='APP_CLIENT_ID' \
--cognito-region='us-west-2' \
--identity-pool-id='IDENTITY_POOL_ID' \
--invoke-url='https://API_GATEWAY_PREFIX.execute-api.us-west-2.amazonaws.com/dev' \
--api-gateway-region='us-west-2' \
--path-template='/testgroup' \
--method='GET' \
--body='{}'

########################################################
## addLocation
########################################################

npx aws-api-gateway-cli-test \
--username='test@example.com' \
--password='Passw0rd!' \
--user-pool-id='USER_POOL_ID' \
--app-client-id='APP_CLIENT_ID' \
--cognito-region='us-west-2' \
--identity-pool-id='IDENTITY_POOL_ID' \
--invoke-url='https://API_GATEWAY_PREFIX.execute-api.us-west-2.amazonaws.com/dev' \
--api-gateway-region='us-west-2' \
--path-template='/testgroup/20180818' \
--method='POST' \
--body='{"locationName":"Testersons","description":"test description"}'

########################################################
## listLocations
########################################################

npx aws-api-gateway-cli-test \
--username='test@example.com' \
--password='Passw0rd!' \
--user-pool-id='USER_POOL_ID' \
--app-client-id='APP_CLIENT_ID' \
--cognito-region='us-west-2' \
--identity-pool-id='IDENTITY_POOL_ID' \
--invoke-url='https://API_GATEWAY_PREFIX.execute-api.us-west-2.amazonaws.com/dev' \
--api-gateway-region='us-west-2' \
--path-template='/testgroup/20180818' \
--method='GET' \
--body='{}'

########################################################
## getLocation
########################################################

npx aws-api-gateway-cli-test \
--username='test@example.com' \
--password='Passw0rd!' \
--user-pool-id='USER_POOL_ID' \
--app-client-id='APP_CLIENT_ID' \
--cognito-region='us-west-2' \
--identity-pool-id='IDENTITY_POOL_ID' \
--invoke-url='https://API_GATEWAY_PREFIX.execute-api.us-west-2.amazonaws.com/dev' \
--api-gateway-region='us-west-2' \
--path-template='/testgroup/20180818/Testersons' \
--method='GET' \
--body='{}'

########################################################
## addVote
########################################################

npx aws-api-gateway-cli-test \
--username='test@example.com' \
--password='Passw0rd!' \
--user-pool-id='USER_POOL_ID' \
--app-client-id='APP_CLIENT_ID' \
--cognito-region='us-west-2' \
--identity-pool-id='IDENTITY_POOL_ID' \
--invoke-url='https://API_GATEWAY_PREFIX.execute-api.us-west-2.amazonaws.com/dev' \
--api-gateway-region='us-west-2' \
--path-template='/testgroup/20180818/Testersons' \
--method='POST' \
--body='{"voteValue":"L"}'
