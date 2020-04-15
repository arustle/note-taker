import {IImage} from "../IImage";

export interface IUpdateRecordRequest {
    notes: string;
    recordType: string;
    images?: IImage[];
}