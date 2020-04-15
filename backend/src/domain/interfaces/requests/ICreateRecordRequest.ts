import {IImage} from "../IImage";

export interface ICreateRecordRequest {
    notes: string;
    recordType: string;
    images?: IImage[];
}