import {IImage} from "./IImage";

export interface IGetRecord {
    id: string;
    createdDate: string;
    notes: string;
    recordType: string;
    images?: IImage[];
}