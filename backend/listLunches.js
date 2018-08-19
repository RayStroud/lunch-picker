import * as ddb from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: process.env.lunchesTable,
    KeyConditionExpression: 'groupName = :groupName',
    ExpressionAttributeValues: {
      ':groupName': decodeURI(event.pathParameters.groupName),
    }
  };
  console.log(`params: ${JSON.stringify(params)}`);

  try {
    const result = await ddb.call('query', params);
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
