import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { updateRecord } from '../../domain/records'
import { getUserId } from '../utils/requestUtilities'
import {IUpdateRecordRequest} from "../../domain/interfaces/requests/IUpdateRecordRequest";
import {IUpdateRecord} from "../../domain/interfaces/IUpdateRecord";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);
  const recordId = event.pathParameters.recordId
  const newRecord: IUpdateRecordRequest = JSON.parse(event.body)

  const record: IUpdateRecord = {
    recordId,
    userId,
    recordType: newRecord.recordType,
    notes: newRecord.notes,
    images: newRecord.images,
  }

  await updateRecord(record);

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true,
    },
    body: null,
  }

}
