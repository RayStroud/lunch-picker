import * as ddb from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: process.env.locationsTable,
    KeyConditionExpression: 'lunchId = :lunchId',
    ExpressionAttributeValues: {
      ':lunchId': `${decodeURI(event.pathParameters.groupName)}${decodeURI(event.pathParameters.lunchDate)}`,
    }
  };

  try {
    const result = await ddb.call('query', params);
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
