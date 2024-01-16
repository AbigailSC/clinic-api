import { Router } from 'express';
import { postDocument, signDocument } from '@controllers';
import {
  uploadDocumentSigned,
  verifyRefreshToken,
  verifyRoles
} from '@middlewares';
import { ROLES } from '@constants';
import { verifyIdParam } from '@validations';

const router = Router();

router
  .route('/')
  .post(
    [verifyRefreshToken, verifyRoles([ROLES.Admin, ROLES.SuperAdmin])],
    postDocument
  );
router
  .route('/:id')
  .put(
    [
      verifyRefreshToken,
      verifyRoles([ROLES.Patient]),
      ...verifyIdParam,
      uploadDocumentSigned.single('document-signed')
    ],
    signDocument
  );

export default router;
