import { ROLES } from '@constants';
import {
  deletePatient,
  getPatient,
  getPatients,
  postPatient,
  updatePatient
} from '@controllers';
import { recolectErrors, verifyRefreshToken, verifyRoles } from '@middlewares';
import { verifyPatientParams } from '@validations';
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .post(
    [
      verifyRefreshToken,
      verifyRoles([ROLES.Admin]),
      ...verifyPatientParams,
      recolectErrors
    ],
    postPatient
  )
  .get(getPatients);

router.route('/:id').put(updatePatient).get(getPatient).delete(deletePatient);

export default router;
