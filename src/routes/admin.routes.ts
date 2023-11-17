import { ROLES } from '@constants';
import { deleteAdmin, getAdmin, getAdmins, postAdmin, updateAdmin } from '@controllers';
import { verifyRoles } from '@middlewares';
import { Router } from 'express';

const router = Router();

router.route('/').post([verifyRoles([ROLES.Admin])], postAdmin).get(getAdmins);

router.route('/:id').put(updateAdmin).get(getAdmin).delete(deleteAdmin);

export default router;