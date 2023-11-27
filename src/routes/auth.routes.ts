import { Router } from 'express';
import {
  singIn,
  activateAccount,
  deleteAccount,
  refreshToken,
  logOut
} from '@controllers';
import { verifyRefreshToken, verifyRoles } from '@middlewares';
import {
  verifyActivateParams,
  verifyIdParam,
  verifyLoginParams
} from '@validations';
import { ROLES } from '@constants';

const router = Router();

router.route('/login').post([...verifyLoginParams], singIn);
router.route('/refresh-token').post([verifyRefreshToken], refreshToken);
router.route('/activate/:id').put([...verifyActivateParams], activateAccount);

router
  .route('/desactivate/:id')
  .patch(
    [
      verifyRefreshToken,
      verifyRoles([ROLES.Admin, ROLES.Patient, ROLES.SuperAdmin]),
      ...verifyIdParam
    ],
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
