import type { Request, Response } from 'express';

import { videoService, favoriteService } from '../services';
import { formatSuccessResponse } from '../utils/appResponse';

const search = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const videos = await videoService.getBySearchTerm(query, req.user!.id);
  if (videos.length === 0) {
    res.status(200).json(formatSuccessResponse(200, `No videos of '${query}' were found`, []));
  }
  res.status(200).json(formatSuccessResponse(200, 'Videos found successfully', videos));
};

const getFavorites = async (req: Request, res: Response) => {
  const videos = await favoriteService.getFavorites(req.user!.id);
  if (videos.length === 0) {
    res.status(200).json(formatSuccessResponse(200, `There are no favorite videos yet`, []));
  }
  res.status(200).json(formatSuccessResponse(200, 'Favorite videos found successfully', videos));
};

const markFavorite = async (req: Request, res: Response) => {
  const videoId = req.params.id as string;
  const favorite = await favoriteService.markAsFavorite({ userId: req.user!.id, videoId });
  res.status(201).json(formatSuccessResponse(200, 'Video saved as favorite successfully', favorite));
};

const unmarkFavorite = async (req: Request, res: Response) => {
  const videoId = req.params.id as string;
  await favoriteService.unmarkAsFavorite({ userId: req.user!.id, videoId });
  res.status(201).json(formatSuccessResponse(200, 'Video removed from favorites successfully', {}));
};

export default { search, getFavorites, markFavorite, unmarkFavorite };
