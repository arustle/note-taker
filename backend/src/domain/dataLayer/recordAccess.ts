import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk';
import {DbRecord} from "./types/DbRecord";
import uuid from 'uuid';
import {removeEmptyAttributes, } from "../../lambda/utils/requestUtilities";

// const XAWS = AWSXRay.captureAWS(AWS);

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
        // this.docClient = new XAWS.DynamoDB.DocumentClient();
    }



    async createRecord(newRecord: DbRecord): Promise<DbRecord> {
        const finalRecord = {
            ...newRecord,
            createdDate: (new Date()).toString(),
            lastModifiedDate: (new Date()).toString(),
            recordId: uuid.v4(),
        };
        const cleanRecord = removeEmptyAttributes(finalRecord);

        await this.docClient.put({
            TableName: this.recordsTable,
            Item: <any>cleanRecord,
        }).promise();

        return finalRecord;
        // return await this.getRecord(finalRecord.userId, finalRecord.recordId);
    }

    async getRecord (userId: string, recordId: string): Promise<DbRecord> {
        const result = await this.docClient.get({
            TableName: this.recordsTable,
            Key: {
                userId,
                recordId,
            }
        }).promise();

        const item = result.Item;

        item.attachments = this._convertToArray(item.attachments);



        return item;
    }

    async getRecords (userId: string): Promise<DbRecord[]> {
        const result = await this.docClient.query({
            TableName: this.recordsTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            }
        }).promise();


        const items = (result.Items || []).map(x => {
            x.attachments = this._convertToArray(x.attachments);
            return x;
        });


        return items;
    }

    async updateRecord (record: DbRecord): Promise<void> {
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
                attachments: {
                    Action: 'PUT',
                    Value: record.attachments,
                },
                lastModifiedDate: {
                    Action: 'PUT',
                    Value: (new Date()).toString(),
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

    _convertToArray (arr: any) {

        if (arr && arr.length > 0) {
            delete arr.length;
            arr = Object.values(arr);
        } else {
            arr = [];
        }

        return arr;
    }
}