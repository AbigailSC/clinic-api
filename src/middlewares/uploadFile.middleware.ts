import multer, {FileFilterCallback} from 'multer';
import { v4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'),
    filename: function(_req: Request, _file: Express.Multer.File, cb:(error: Error | null, destination: string) => void) {
        const uuid = v4();
        cb(null, uuid);
    }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if(fileTypes.some((fileType) => fileType === file.mimetype)) {
        return cb(null, true);
    }
    return cb(null, false);
};

const maxSize = 5 * 1024 * 1024;

export const upload = (req: Request, res: Response, next: NextFunction) => {
    return multer({
        storage,
        limits: {
            fileSize: maxSize
        },
        fileFilter
    }).single('image')(req, res, (err) => {
        if(err instanceof multer.MulterError) {
            return res.status(400).json({
                status: res.statusCode,
                message: 'Max file size 5BM allowed'
            })
        }

        if(err) return res.status(400).json({
            status: res.statusCode,
            message: err.message
        })

        if(!req.file) {
            res.status(400).json({
                status: res.statusCode,
                message: 'No file has been uploaded, remember that you can only upload JPG, JPEG, PNG and GIF formats'
            })
        }

        next();
    })
}