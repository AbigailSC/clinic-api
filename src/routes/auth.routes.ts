import { Router } from 'express';
import {
  singIn,
  activateAccount,
  deleteAccount,
  refreshToken,
  logOut
} from '@controllers';
import {
  recolectErrors,
  verifyRefreshToken,
  verifyUserIsActivated
} from '@middlewares';
import { verifyCreate } from '@validations';

const router = Router();

router.route('/signin').post([...verifyCreate, recolectErrors], singIn);
router.route('/refresh-token').get([verifyRefreshToken], refreshToken);
router.route('/activate/:id').put([verifyUserIsActivated], activateAccount);

router.patch('/desactivate/:id', deleteAccount);
router.route('/logout').get([verifyRefreshToken], logOut);

export default router;