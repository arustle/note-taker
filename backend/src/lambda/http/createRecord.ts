import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import {createRecord} from '../../domain/models/recordsModel'
import { getUserId } from '../utils/requestUtilities'
import {CreateRecordRequest} from "../../domain/models/requests/CreateRecordRequest";
import {CreateRecordDto} from "../../../../client/src/api/dtos/CreateRecordDto";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newRecord: CreateRecordRequest = JSON.parse(event.body);
  const userId = getUserId(event);

  const item: CreateRecordDto = await createRecord(userId, newRecord);

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
