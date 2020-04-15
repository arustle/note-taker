import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import {createRecord} from '../../domain/records'
import { getUserId } from '../utils/requestUtilities'
import {ICreateRecordRequest} from "../../domain/interfaces/requests/ICreateRecordRequest";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newRecord: ICreateRecordRequest = JSON.parse(event.body);
  const userId = getUserId(event);

  const item = await createRecord(userId, newRecord);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      item
    })
  }
}
