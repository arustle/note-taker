import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk';
import {IRecord} from "../interfaces/IRecord";
import uuid from 'uuid';
import {ICreateRecord} from "../interfaces/ICreateRecord";
import {IUpdateRecord} from "../interfaces/IUpdateRecord";

const XAWS = AWSXRay.captureAWS(AWS);

export default class RecordAccess {
    private readonly docClient;
    private readonly recordsTable = process.env.RECORDS_TABLE;
    // private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION;
    // private readonly bucketName = process.env.IMAGES_S3_BUCKET;

    constructor() {
        if (process.env.IS_OFFLINE) {
            this.docClient = new AWS.DynamoDB.DocumentClient({
                region: 'localhost',
                endpoint: 'http://localhost:8000',
            });
            return;
        }
        // @ts-ignore
        this.docClient = new XAWS.DynamoDB.DocumentClient();
    }

    async createRecord(createRecord: ICreateRecord): Promise<IRecord> {
        const newRecord: IRecord = {
            ...createRecord,
            createdDate: (new Date()).toString(),
            recordId: uuid.v4(),
        }

        await this.docClient.put({
            TableName: this.recordsTable,
            Item: <any>newRecord,
        }).promise();

        return newRecord;
    }

    async getRecords (userId: string): Promise<IRecord[]> {
        const result = await this.docClient.query({
            TableName: this.recordsTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            }
        }).promise();


        const items = result.Items

        return items;
    }

    async updateRecord (record: IUpdateRecord): Promise<void> {
        await this.docClient.update({
            TableName: this.recordsTable,
            Key: {
                userId: record.userId,
                recordId: record.recordId,
            },
            AttributeUpdates: {
                notes: {
                    Action: 'PUT',
                    Value: record.notes,
                },
                recordType: {
                    Action: 'PUT',
                    Value: record.recordType,
                },
                images: {
                    Action: 'PUT',
                    Value: record.images,
                },
            }
        }).promise();

    }


    async deleteRecord (userId: string, recordId: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.recordsTable,
            Key: {
                userId,
                recordId,
            }
        }).promise();
    }

}