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
      verifyRoles([ROLES.Patient]),
      ...verifyIdParam,
      recolectErrors
    ],
    deleteUser
  )
  .patch(
    [
      verifyRefreshToken,
      verifyRoles([ROLES.Admin]),
      ...verifyIdParam,
      recolectErrors
    ],
    restoreUser
  );

router
  .route('/:id/image')
  .post(
    [
      verifyRefreshToken,
      verifyRoles([ROLES.Admin]),
      ...verifyIdParam,
      recolectErrors,
      upload
    ],
    uploadImage
  );

export default router;
