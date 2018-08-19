import * as ddb from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: process.env.locationsTable,
    Key: {
      lunchId: `${decodeURI(event.pathParameters.groupName)}${decodeURI(event.pathParameters.lunchDate)}`,
      locationName: decodeURI(event.pathParameters.locationName),
    }
  };

  try {
    const result = await ddb.call('get', params);
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: 'Item not found.' }));
    }
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
