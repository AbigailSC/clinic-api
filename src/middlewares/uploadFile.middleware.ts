import multer, {FileFilterCallback} from 'multer';
import { Request } from 'express';
import multerS3 from "multer-s3";
import { S3 } from "@aws-sdk/client-s3"
import dotenv from 'dotenv';

import { config } from '@config';

dotenv.config();

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if(fileTypes.some((fileType) => fileType === file.mimetype)) {
        return cb(null, true);
    }
    return cb(null, false);
};
const s3 = new S3({
    forcePathStyle: false,
    endpoint: config.s3.endpoint,
    region: config.s3.region,
    credentials: {
        accessKeyId: config.s3.accessKey,
        secretAccessKey: config.s3.secretKey,
    }
})

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
            cb(null, `Consents/${fileName}`);
        }
    })
})

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../../public/uploads'),
//     filename: function(_req: Request, _file: Express.Multer.File, cb:(error: Error | null, destination: string) => void) {
//         const uuid = v4();
//         cb(null, uuid);
//     }
// });

// const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
//     const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
//     if(fileTypes.some((fileType) => fileType === file.mimetype)) {
//         return cb(null, true);
//     }
//     return cb(null, false);
// };

// const maxSize = 5 * 1024 * 1024;

// export const upload = (req: Request, res: Response, next: NextFunction) => {
//     return multer({
//         storage,
//         limits: {
//             fileSize: maxSize
//         },
//         fileFilter
//     }).single('image')(req, res, (err) => {
//         if(err instanceof multer.MulterError) {
//             return res.status(400).json({
//                 status: res.statusCode,
//                 message: 'Max file size 5BM allowed'
//             })
//         }

//         if(err) return res.status(400).json({
//             status: res.statusCode,
//             message: err.message
//         })

//         if(!req.file) {
//             res.status(400).json({
//                 status: res.statusCode,
//                 message: 'No file has been uploaded, remember that you can only upload JPG, JPEG, PNG and GIF formats'
//             })
//         }

//         next();
//     })
// }