import { postPatient } from '@controllers';
import { Router } from 'express';
import multer from 'multer';

const upload = multer();
const router = Router();

router.route('/patients').post(upload.single('image'), postPatient);
