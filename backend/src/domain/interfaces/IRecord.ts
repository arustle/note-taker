import {IImage} from "./IImage";

export interface IRecord {
    recordId: string;
    userId: string;
    createdDate: string;
    notes: string;
    recordType: string;
    images?: IImage[];
}