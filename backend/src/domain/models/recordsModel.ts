import RecordAccess from "../dataLayer/recordAccess";
import {CreateRecordRequest} from "./requests/CreateRecordRequest";
import {DbRecord} from "../dataLayer/types/DbRecord";
import {GetRecordDto} from "../../../../client/src/api/dtos/GetRecordDto";
import {CreateRecordDto} from "../../../../client/src/api/dtos/CreateRecordDto";
import {ImageAccess} from "../dataLayer/imageAccess";

const recordAccess = new RecordAccess();
const imageAccess = new ImageAccess();


export async function createRecord (userId: string, newRecord: CreateRecordRequest): Promise<CreateRecordDto> {
    const item: DbRecord = {
        recordId: null,
        createdDate: null,
        lastModifiedDate: null,

        userId,
        entryDate: newRecord.entryDate,
        notes: newRecord.notes,
        attachments: newRecord.attachments,
        recordType: newRecord.recordType,
    };

    const dbRecord = await recordAccess.createRecord(item);

    return convertToDto(dbRecord);
}


export async function deleteRecord (userId: string, recordId: string): Promise<void> {
    await recordAccess.deleteRecord(userId, recordId);
}

export async function getRecord (userId: string, recordId: string): Promise<GetRecordDto> {
    const dbRecord: DbRecord = await recordAccess.getRecord(userId, recordId);

    if (!dbRecord) return null;

    return convertToDto(dbRecord);
}

export async function getRecords (userId: string): Promise<GetRecordDto[]> {
    const dbRecords: DbRecord[] = await recordAccess.getRecords(userId);

    return await Promise.all((dbRecords || []).map(convertToDto));
}

export async function updateRecord (record: DbRecord): Promise<void> {
    await recordAccess.updateRecord(record);
}


async function convertToDto (dbRecord: DbRecord): Promise<any> {


    const attachments = await Promise.all(
        (dbRecord.attachments || []).map(async (x)  => ({
            attachmentId: x.attachmentId,
            url: await imageAccess.getFileUrl(x.attachmentId),
            name: x.name,
            lastModifiedDate: x.lastModifiedDate,
            size: x.size,
            type: x.type,
        }))
    );

    return {
        attachments,
        entryDate: dbRecord.entryDate,
        notes: dbRecord.notes,
        recordType: dbRecord.recordType,
        recordId: dbRecord.recordId
    }
}