import 'source-map-support/register'

import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { generateUploadInfo } from '../../domain/models/attachmentsModel'
import {GetUploadInfoDto} from "../../../../client/src/api/dtos/GetUploadInfoDto";


export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
    // const todoId = event.pathParameters.todoId
    // const userId = getUserId(event);
    // const userId = "1";

    const uploadInfo: GetUploadInfoDto = await generateUploadInfo()



    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(uploadInfo)
    };
}
