
import uuid from 'uuid';
import {ImageAccess} from "../dataLayer/imageAccess";
import {GetUploadInfoDto} from "../../../../client/src/api/dtos/GetUploadInfoDto";

const imageAccess = new ImageAccess();
export async function generateUploadInfo (): Promise<GetUploadInfoDto> {
    const attachmentId = uuid.v4();
    const uploadUrl = await imageAccess.generateUploadUrl(attachmentId);

    return {
        attachmentId,
        uploadUrl,
    };
}

export async function getSignedUrl (url: string): Promise<string> {
    const signedUrl = await imageAccess.getFileUrl(url);

    return signedUrl;
}
