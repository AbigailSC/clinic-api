import { Router } from 'express';
import {
  updateUser,
  getUserById,
  deleteUser,
  restoreUser,
  uploadImage
} from '@controllers';
import {
  recolectErrors,
  upload,
  verifyRefreshToken,
  verifyRoles
} from '@middlewares';
import { ROLES } from '@constants';
import { verifyIdParam } from '@validations';

const router: Router = Router();

router
  .route('/')
  .get(
    [verifyRefreshToken, verifyRoles([ROLES.Admin, ROLES.Patient])],
    getUserById
  )
  .put([verifyRoles([ROLES.Patient])], updateUser);

router
  .route('/:id')
  .delete(
    [
      verifyRefreshToken,
      ...verifyIdParam,
      recolectErrors,
      verifyRoles([ROLES.Patient])
    ],
    deleteUser
  )
  .patch(
    [
      verifyRefreshToken,
      ...verifyIdParam,
      recolectErrors,
      verifyRoles([ROLES.Admin])
    ],
    restoreUser
  );

router
  .route('/:id/image')
  .post(
    [
      verifyRefreshToken,
      ...verifyIdParam,
      recolectErrors,
      verifyRoles([ROLES.Admin]),
      upload
    ],
    uploadImage
  );

export default router;
