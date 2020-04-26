import {DbRecordAttachment} from "../../dataLayer/types/DbRecordAttachment";

export interface CreateRecordRequest {
    entryDate: string;
    recordType: string;
    notes: string;
    attachments?: DbRecordAttachment[];
}