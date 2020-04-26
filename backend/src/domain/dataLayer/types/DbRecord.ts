import {DbRecordAttachment} from "./DbRecordAttachment";

export interface DbRecord {
    recordId: string | null;
    createdDate?: string;
    lastModifiedDate?: string;

    userId: string;
    entryDate: string;

    notes?: string;
    recordType?: string;
    attachments?: DbRecordAttachment[];
}