import { Router } from 'express';

import videoController from '../controllers/video.controller';

const router = Router();

router.get('/', videoController.search);

router.get('/favorites', videoController.getFavorites);

router.post('/:id/favorite', videoController.markFavorite);

router.delete('/:id/favorite', videoController.unmarkFavorite);

export default router;
