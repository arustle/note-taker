import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk';
import {DbRecord} from "./types/DbRecord";
import uuid from 'uuid';
import {removeEmptyAttributes, } from "../../lambda/utils/requestUtilities";

const XAWS = AWSXRay.captureAWS(AWS);
import { createLogger } from '../../utils/logger';
const logger = createLogger('RecordAccess');

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



    async createRecord(newRecord: DbRecord): Promise<DbRecord> {
        const finalRecord = {
            ...newRecord,
            createdDate: (new Date()).toISOString(),
            lastModifiedDate: (new Date()).toISOString(),
            recordId: uuid.v4(),
        };
        const cleanRecord = removeEmptyAttributes(finalRecord);

        logger.info('CREATE_RECORD', cleanRecord);
        await this.docClient.put({
            TableName: this.recordsTable,
            Item: <any>cleanRecord,
        }).promise();

        return finalRecord;
        // return await this.getRecord(finalRecord.userId, finalRecord.recordId);
    }

    async getRecord (userId: string, recordId: string): Promise<DbRecord> {
        logger.info('GET_RECORD', recordId);
        const result = await this.docClient.get({
            TableName: this.recordsTable,
            Key: {
                userId,
                recordId,
            }
        }).promise();

        const item = result.Item;

        item.attachments = (item) ? this._convertToArray(item.attachments) : [];



        return item;
    }

    async getRecords (userId: string): Promise<DbRecord[]> {
        logger.info('GET_RECORDS', userId);
        const result = await this.docClient.query({
            TableName: this.recordsTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            }
        }).promise();


        return (result.Items || []).map(x => {
            x.attachments = this._convertToArray(x.attachments);
            return x;
        });
    }

    async updateRecord (record: DbRecord): Promise<void> {
        logger.info('UPDATE_RECORDS', record);
        const attrs: any = {
            lastModifiedDate: {
                Action: 'PUT',
                Value: (new Date()).toISOString(),
            },
            attachments: {
                Action: 'PUT',
                Value: record.attachments || [],
            }
        };

        if (record.entryDate) {
            attrs.entryDate = {
                Action: 'PUT',
                Value: record.entryDate,
            };
        }
        if (record.notes) {
            attrs.notes = {
                Action: 'PUT',
                Value: record.notes,
            };
        }
        if (record.recordType) {
            attrs.recordType = {
                Action: 'PUT',
                Value: record.recordType,
            };
        }

        await this.docClient.update({
            TableName: this.recordsTable,
            Key: {
                userId: record.userId,
                recordId: record.recordId,
            },
            AttributeUpdates: attrs
        }).promise();

    }


    async deleteRecord (userId: string, recordId: string): Promise<void> {
        logger.info('DELETE_RECORDS', recordId);
        await this.docClient.delete({
            TableName: this.recordsTable,
            Key: {
                userId,
                recordId,
            }
        }).promise();
    }

    _convertToArray (arr: any) {
        if (Array.isArray(arr)) return arr;

        if (arr && arr.length > 0) {
            delete arr.length;
            arr = Object.values(arr);
        } else {
            arr = [];
        }

        return arr;
    }
}