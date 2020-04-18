
import Axios from 'axios';
import { apiEndpoint } from '../auth/auth.config';
import {Record} from "../classes/Record";
import {IGetRecord} from "./interfaces/IGetRecord";


const data: IGetRecord[] = [
    {
        id: 'r-1',
        createdDate: '2020-04-12T09:15:00',
        recordType: 'ANIMALS',
        notes: 'We’ve learned that useEffect lets us express different kinds of side effects after a component renders.',
    },
    {
        id: 'r-2',
        createdDate: '2020-04-11T14:23:00',
        recordType: 'CARS',
        notes: 'One of the problems we outlined in the Motivation for Hooks is that class lifecycle methods often contain unrelated logic, but related logic gets broken up into several methods. Here is a component that combines the counter and the friend status indicator logic from the previous examples',
        images: [
            {
                id: 'i-1',
                title: 'snowy owl',
                url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.EyaI8-wvRXNeMvKD4B6MYAHaE5%26pid%3DApi&f=1'
            },
        ],
    }
];


export async function getRecords (): Promise<Record[]> {
    return data.map((x: IGetRecord) => (new Record(x)));
}
export async function getRecord (recordId: string): Promise<Record> {
    const record = data.find(x => (x.id === recordId));

    return new Record(record);
}
export async function getRecordsA (idToken: string): Promise<Record[]> {
    const response = await Axios.get(`${apiEndpoint}/records`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    return response.data.items.map((x: IGetRecord) => (new Record(x)))
}

export async function createRecord(
    idToken: string,
    newRecord: Record
): Promise<Record> {
    const response = await Axios.post(`${apiEndpoint}/records`,  JSON.stringify(newTodo), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
    return response.data.item
}

export async function getUploadUrl(
    idToken: string,
    recordId: string
): Promise<string> {

    return 'upload url';
    const response = await Axios.post(`${apiEndpoint}/records/${recordId}/attachment`, '', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
    return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
    await Axios.put(uploadUrl, file)
}