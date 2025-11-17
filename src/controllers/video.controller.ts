import type { Request, Response } from 'express';

import { videoService } from '../services';
import { formatSuccessResponse } from '../utils/appResponse';

const search = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const videos = await videoService.getBySearchTerm(query);
  if (videos.length === 0) {
    res.status(200).json(formatSuccessResponse(200, `No videos of '${query}' were found`, []));
  }
  res.status(200).json(formatSuccessResponse(200, 'Videos found successfully', videos));
};

const getFavorites = async (req: Request, res: Response) => {
  // TODO: get userId from jwt
  const videos = await videoService.getFavorites(1);
  if (videos.length === 0) {
    res.status(200).json(formatSuccessResponse(200, `There are no favorite videos yet`, []));
  }
  res.status(200).json(formatSuccessResponse(200, 'Favorite videos found successfully', videos));
};

const markFavorite = async (req: Request, res: Response) => {
  const videoId = req.params.id as string;
  // TODO: get userId from jwt
  const favorite = await videoService.markAsFavorite({ userId: 1, videoId });
  res.status(201).json(formatSuccessResponse(200, 'Video saved as favorite successfully', favorite));
};

const unmarkFavorite = async (req: Request, res: Response) => {
  const videoId = req.params.id as string;
  // TODO: get userId from jwt
  await videoService.unmarkAsFavorito({ userId: 1, videoId });
  res.status(201).json(formatSuccessResponse(200, 'Video removed from favorites successfully', {}));
};

export default { search, getFavorites, markFavorite, unmarkFavorite };
