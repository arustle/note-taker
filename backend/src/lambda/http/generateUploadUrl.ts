import 'source-map-support/register'

import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { generateUploadInfo } from '../../domain/images'


export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
    // const todoId = event.pathParameters.todoId
    // const userId = getUserId(event);
    // const userId = "1";

    const uploadInfo = await generateUploadInfo()



    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(uploadInfo)
    };
}
