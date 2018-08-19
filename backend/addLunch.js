import * as ddb from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.lunchesTable,
    Item: {
      groupName: decodeURI(event.pathParameters.groupName),
      lunchDate: data.lunchDate,
      createdAt: Date.now(),
      userId: event.requestContext.identity.cognitoIdentityId,
    }
  }

  try {
    await ddb.call('put', params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
