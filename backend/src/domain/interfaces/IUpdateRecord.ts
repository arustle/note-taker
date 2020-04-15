import {IImage} from "./IImage";

export interface IUpdateRecord {
    recordId: string;
    userId: string;
    notes: string;
    recordType: string;
    images?: IImage[];
}