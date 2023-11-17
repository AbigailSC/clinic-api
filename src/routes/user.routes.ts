import { Router } from 'express';
import { updateUser, getUserById, deleteUser, restoreUser, uploadImage } from '@controllers';
import { upload } from '@middlewares';

const router: Router = Router();

router.route('/').get(getUserById).put(updateUser);

router.route('/:id').delete(deleteUser).patch(restoreUser)

router.route(':id/image').post([upload], uploadImage)

export default router;
