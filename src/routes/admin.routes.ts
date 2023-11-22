import {
  deleteAdmin,
  getAdmin,
  getAdmins,
  postAdmin,
  updateAdmin
} from '@controllers';
import { recolectErrors } from '@middlewares';
import { verifyAdminParams } from '@validations';
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .post([...verifyAdminParams, recolectErrors], postAdmin)
  .get(getAdmins);

router.route('/:id').put(updateAdmin).get(getAdmin).delete(deleteAdmin);

export default router;
