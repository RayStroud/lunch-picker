import * as ddb from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib'

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const userId = event.requestContext.identity.cognitoIdentityId;
  const vote = {
    createdAt: Date.now(),
    voteValue: data.voteValue,
  };
  if (data.voteValue === 'Fav' || data.voteValue === 'Reject') {
    vote.email = data.email;
  }

  const params = {
    TableName: process.env.locationsTable,
    Key: {
      lunchId: `${decodeURI(event.pathParameters.groupName)}${decodeURI(event.pathParameters.lunchDate)}`,
      locationName: decodeURI(event.pathParameters.locationName)
    },
    UpdateExpression: 'SET #votes.#userId = :vote',
    ExpressionAttributeNames: { '#votes': 'votes', '#userId': userId },
    ExpressionAttributeValues: { ':vote': vote },
  };

  try {
    await ddb.call('update', params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
