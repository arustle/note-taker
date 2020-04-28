import * as AWS from 'aws-sdk'




export class ImageAccess {
    private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION;
    private readonly bucketName = process.env.IMAGES_S3_BUCKET;
    private readonly s3;


    constructor() {
        if (process.env.IS_OFFLINE) {
            this.s3 = new AWS.S3({
                s3ForcePathStyle: true,
                accessKeyId: 'S3RVER', // This specific key is required when working offline
                secretAccessKey: 'S3RVER',
                //@ts-ignore
                endpoint: new AWS.Endpoint('http://localhost:3004'),

                // signatureVersion: 'v4',
            });
            return;
        }

        this.s3 = new AWS.S3({
            signatureVersion: 'v4',
        });
    }

    async generateUploadUrl (imageId: string): Promise<string> {
        const uploadUrl = await this.s3.getSignedUrl(
            'putObject',
            {
                Bucket: this.bucketName,
                Key: imageId,
                Expires: Number(this.urlExpiration),
            }
        );

        return uploadUrl;
    }

    async getFileUrl (url: string): Promise<string> {
        const uploadUrl = await this.s3.getSignedUrl(
            'getObject',
            {
                Bucket: this.bucketName,
                Key: url,
                Expires: Number(this.urlExpiration), // seconds
            }
        );

        return uploadUrl;
    }
}