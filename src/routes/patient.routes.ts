import { ROLES } from '@constants';
import {
  deletePatient,
  getPatient,
  getPatients,
  postPatient,
  updatePatient
} from '@controllers';
import { recolectErrors, verifyRoles } from '@middlewares';
import { verifyPatientParams } from '@validations';
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .post(
    [verifyRoles([ROLES.Admin]), ...verifyPatientParams, recolectErrors],
    postPatient
  )
  .get(getPatients);

router.route('/:id').put(updatePatient).get(getPatient).delete(deletePatient);

export default router;
