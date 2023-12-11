import { S3 } from "@aws-sdk/client-s3"
import { config } from "./config";

export const s3 = new S3({
    forcePathStyle: false,
    endpoint: config.s3.endpoint,
    region: config.s3.region,
    credentials: {
        accessKeyId: config.s3.accessKey,
        secretAccessKey: config.s3.secretKey,
    }
})