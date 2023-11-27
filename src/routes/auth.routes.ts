import { Router } from 'express';
import {
  singIn,
  activateAccount,
  deleteAccount,
  refreshToken,
  logOut
} from '@controllers';
import { recolectErrors, verifyRefreshToken, verifyRoles } from '@middlewares';
import { verifyActivateParams, verifyLoginParams } from '@validations';
import { ROLES } from '@constants';

const router = Router();

router.route('/login').post([...verifyLoginParams, recolectErrors], singIn);
router.route('/refresh-token').post([verifyRefreshToken], refreshToken);
router
  .route('/activate/:id')
  .put([...verifyActivateParams, recolectErrors], activateAccount);

router
  .route('/desactivate/:id')
  .patch(
    verifyRefreshToken,
    [verifyRoles([ROLES.Admin, ROLES.Patient, ROLES.SuperAdmin])],
    deleteAccount
  );
router
  .route('/logout')
  .get(
    [
      verifyRefreshToken,
      verifyRoles([ROLES.Admin, ROLES.Patient, ROLES.SuperAdmin])
    ],
    logOut
  );

export default router;
