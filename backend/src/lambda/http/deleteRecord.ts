import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteRecord } from '../../domain/models/recordsModel'
import { getUserId } from '../utils/requestUtilities'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const recordId = event.pathParameters.recordId;
  const userId = getUserId(event);

  await deleteRecord(userId, recordId);

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true,
    },
    body: null,
  }
}
