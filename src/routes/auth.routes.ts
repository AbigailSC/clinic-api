import { Router } from 'express';
import {
  singIn,
  activateAccount,
  deleteAccount,
  refreshToken,
  logOut
} from '@controllers';
import { recolectErrors, verifyRefreshToken } from '@middlewares';
import { verifyActivateParams, verifyLoginParams } from '@validations';

const router = Router();

router.route('/login').post([...verifyLoginParams, recolectErrors], singIn);
router.route('/refresh-token').post([verifyRefreshToken], refreshToken);
router
  .route('/activate/:id')
  .put([...verifyActivateParams, recolectErrors], activateAccount);

router.route('/desactivate/:id').patch(deleteAccount);
router.route('/logout').get([verifyRefreshToken], logOut);

export default router;
