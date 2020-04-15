import * as AWS from 'aws-sdk'



const s3 = new AWS.S3({
    signatureVersion: 'v4',
});

export class ImageAccess {
    private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION;
    private readonly bucketName = process.env.IMAGES_S3_BUCKET;

    async generateUploadUrl (imageId: string): Promise<string> {
        const uploadUrl = await s3.getSignedUrl(
            'putObject',
            {
                Bucket: this.bucketName,
                Key: imageId,
                Expires: this.urlExpiration,
            }
        );


        return uploadUrl;
    }
}