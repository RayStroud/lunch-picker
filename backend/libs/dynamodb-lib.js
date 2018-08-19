import AWS from 'aws-sdk';

export function call(action, params) {
  const ddb = new AWS.DynamoDB.DocumentClient();

  return ddb[action](params).promise();
}