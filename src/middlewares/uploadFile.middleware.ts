import multer, {FileFilterCallback} from 'multer';
import { Request } from 'express';
import multerS3 from "multer-s3";
import { config, s3 } from '@config';

import dotenv from 'dotenv';


dotenv.config();

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if(fileTypes.some((fileType) => fileType === file.mimetype)) {
        return cb(null, true);
    }
    return cb(null, false);
};

const pdfFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const fileTypes: string[] = ['application/pdf'];
    if(fileTypes.some((fileType) => fileType === file.mimetype)) {
        return cb(null, true);
    }
    return cb(null, false);
};



export const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: config.s3.bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: function(_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void)  {
            // save file to Spaces, you can use / to add folders directory
            const fileName = Date.now().toString(); //file.originalname;
            cb(null, `Profiles/${fileName}`);
        }
    })
})

export const uploadDocument = multer({
    fileFilter: pdfFilter,
    storage: multerS3({
        s3: s3,
        bucket: config.s3.bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: function(_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void)  {
            // save file to Spaces, you can use / to add folders directory
            const fileName = Date.now().toString(); //file.originalname;
            cb(null, `Consents/${fileName}`);
        }
    })
})

export const uploadDocumentSigned = multer({
    fileFilter: pdfFilter,
    storage: multerS3({
        s3: s3,
        bucket: config.s3.bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: function(_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void)  {
            // save file to Spaces, you can use / to add folders directory
            const fileName = Date.now().toString(); //file.originalname;
            cb(null, `Consents-signed/${fileName}`);
        }
    })
})