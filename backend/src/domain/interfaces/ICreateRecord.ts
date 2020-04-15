import {IImage} from "./IImage";

export interface ICreateRecord {
    userId: string;
    notes: string;
    recordType: string;
    images?: IImage[];
}