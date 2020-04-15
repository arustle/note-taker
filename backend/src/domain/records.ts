import RecordAccess from "./dataLayer/recordAccess";
import {ICreateRecordRequest} from "./interfaces/requests/ICreateRecordRequest";
import {IRecord} from "./interfaces/IRecord";
import {ICreateRecord} from "./interfaces/ICreateRecord";
import {IUpdateRecord} from "./interfaces/IUpdateRecord";

const recordAccess = new RecordAccess();


export async function createRecord (userId: string, newRecord: ICreateRecordRequest): Promise<IRecord> {
    const item: ICreateRecord = {
        userId,
        notes: newRecord.notes,
        images: newRecord.images,
        recordType: newRecord.recordType,
    };

    return await recordAccess.createRecord(item);
}


export async function deleteRecord (userId: string, recordId: string): Promise<void> {
    await recordAccess.deleteRecord(userId, recordId);
}


export async function getRecords (userId: string): Promise<IRecord[]> {
    return await recordAccess.getRecords(userId);
}

export async function updateRecord (record: IUpdateRecord): Promise<void> {
    await recordAccess.updateRecord(record);
}