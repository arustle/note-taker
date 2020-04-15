
import uuid from 'uuid';
import {ImageAccess} from "./dataLayer/imageAccess";
import {IImageUploadInfo} from "./interfaces/IImageUploadInfo";

const imageAccess = new ImageAccess();
export async function generateUploadInfo (): Promise<IImageUploadInfo> {
    const imageId = uuid.v4();
    const uploadUrl = await imageAccess.generateUploadUrl(imageId);

    return {
        imageId,
        uploadUrl,
    };
}
