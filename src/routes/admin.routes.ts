import { ROLES } from '@constants';
import {
  deleteAdmin,
  getAdmin,
  getAdmins,
  postAdmin,
  updateAdmin
} from '@controllers';
import { recolectErrors, verifyRefreshToken, verifyRoles } from '@middlewares';
import { verifyAdminParams, verifyIdParam } from '@validations';
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .post(
    [
      verifyRefreshToken,
      verifyRoles([ROLES.Admin, ROLES.SuperAdmin]),
      ...verifyAdminParams,
      recolectErrors
    ],
    postAdmin
  )
  .get(
    [verifyRefreshToken, verifyRoles([ROLES.Admin, ROLES.SuperAdmin])],
    getAdmins
  );

router
  .route('/:id')
  .put(
    [
      verifyRefreshToken,
      verifyRoles([ROLES.Admin, ROLES.SuperAdmin]),
      ...verifyIdParam,
      recolectErrors
    ],
    updateAdmin
  )
  .get(
    [verifyRefreshToken, verifyRoles([ROLES.Admin, ROLES.SuperAdmin])],
    getAdmin
  )
  .delete(
    [verifyRefreshToken, verifyRoles([ROLES.Admin, ROLES.SuperAdmin])],
    deleteAdmin
  );

export default router;
