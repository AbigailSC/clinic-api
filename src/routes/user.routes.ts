import { Router } from 'express';
import {
  updateUser,
  getUserById,
  deleteUser,
  restoreUser,
  uploadImage
} from '@controllers';
import { upload, verifyRefreshToken, verifyRoles } from '@middlewares';
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
    [verifyRefreshToken, verifyRoles([ROLES.Patient]), ...verifyIdParam],
    deleteUser
  )
  .patch(
    [verifyRefreshToken, verifyRoles([ROLES.Admin]), ...verifyIdParam],
    restoreUser
  );

router
  .route('/image/:id')
  .post(
    [verifyRefreshToken, verifyRoles([ROLES.Admin, ROLES.Patient]), ...verifyIdParam, upload.single('image')],
    uploadImage
  );

export default router;
