import {DbRecordAttachment} from "../../dataLayer/types/DbRecordAttachment";

export interface UpdateRecordRequest {
    notes: string;
    recordType: string;
    entryDate: string;
    attachments?: DbRecordAttachment[];
}