import { ROLES } from '@constants';
import { deletePatient, getPatient, getPatients, postPatient, updatePatient } from '@controllers';
import { verifyRoles } from '@middlewares';
import { Router } from 'express';

const router = Router();

router.route('/').post([verifyRoles([ROLES.Admin])], postPatient).get(getPatients);

router.route('/:id').put(updatePatient).get(getPatient).delete(deletePatient);

export default router;