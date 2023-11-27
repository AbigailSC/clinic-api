import { Router } from 'express';
import { postDocument } from '@controllers';
import { verifyRefreshToken, verifyRoles } from '@middlewares';
import { ROLES } from '@constants';

const router = Router();

router
  .route('/')
  .post(
    [verifyRefreshToken, verifyRoles([ROLES.Admin, ROLES.SuperAdmin])],
    postDocument
  );

export default router;
