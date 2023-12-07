import { ROLES } from '@constants';
import {
  deletePatient,
  getPatient,
  getPatients,
  postPatient,
  updatePatient
} from '@controllers';
import { verifyRefreshToken, verifyRoles } from '@middlewares';
import { verifyIdParam, verifyPatientParams } from '@validations';
import { Router } from 'express';

const router = Router();

router
  .route('/')
  .post(
    [verifyRefreshToken, verifyRoles([ROLES.Admin]), ...verifyPatientParams],
    postPatient
  )
  .get([verifyRefreshToken, verifyRoles([ROLES.Admin])], getPatients);

router
  .route('/:id')
  .put(
    [verifyRefreshToken, verifyRoles([ROLES.Patient, ROLES.Admin]), ...verifyIdParam],
    updatePatient
  )
  .get(
    [
      verifyRefreshToken,
      verifyRoles([ROLES.Patient, ROLES.Admin]),
      ...verifyIdParam
    ],
    getPatient
  )
  .delete(
    [verifyRefreshToken, verifyRoles([ROLES.Patient]), ...verifyIdParam],
    deletePatient
  );

export default router;
