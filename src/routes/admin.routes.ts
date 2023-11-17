import { ROLES } from '@constants';
import {
  deleteAdmin,
  getAdmin,
  getAdmins,
  postAdmin,
  updateAdmin
} from '@controllers';
import { recolectErrors, verifyRoles } from '@middlewares';
import { verifyAdminParams } from '@validations';
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .post(
    [verifyRoles([ROLES.Admin]), ...verifyAdminParams, recolectErrors],
    postAdmin
  )
  .get(getAdmins);

router.route('/:id').put(updateAdmin).get(getAdmin).delete(deleteAdmin);

export default router;
