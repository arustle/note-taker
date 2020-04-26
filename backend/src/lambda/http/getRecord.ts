import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils/requestUtilities'
import { getRecord } from '../../domain/models/recordsModel'
import {GetRecordDto} from "../../../../client/src/api/dtos/GetRecordDto";




export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);
  const recordId = event.pathParameters.recordId;

  const item: GetRecordDto = await getRecord(userId, recordId);

  // items.forEach(item => {
  //   item.attachments
  // })
  if (!item) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': true,
      },
      body: null
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      item,
    })
  }
}
