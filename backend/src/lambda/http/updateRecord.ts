import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { updateRecord } from '../../domain/models/recordsModel'
import { getUserId } from '../utils/requestUtilities'
import {UpdateRecordRequest} from "../../domain/models/requests/UpdateRecordRequest";
import {DbRecord} from "../../domain/dataLayer/types/DbRecord";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);
  const recordId = event.pathParameters.recordId
  const newRecord: UpdateRecordRequest = JSON.parse(event.body)

  const record: DbRecord = {
    recordId,

    userId,
    entryDate: newRecord.entryDate,
    recordType: newRecord.recordType,
    notes: newRecord.notes,
    attachments: newRecord.attachments,
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
