import { Router } from 'express';
import {
  updateUser,
  getUserById,
  deleteUser,
  restoreUser,
  uploadImage
} from '@controllers';
import { upload, verifyRoles } from '@middlewares';
import { ROLES } from '@constants';

const router: Router = Router();

router
  .route('/')
  .get([verifyRoles([ROLES.Admin, ROLES.Patient])], getUserById)
  .put([verifyRoles([ROLES.Patient])], updateUser);

router
  .route('/:id')
  .delete([verifyRoles([ROLES.Patient])], deleteUser)
  .patch([verifyRoles([ROLES.Admin])], restoreUser);

router
  .route('/:id/image')
  .post([verifyRoles([ROLES.Admin]), upload], uploadImage);

export default router;
