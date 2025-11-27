export type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
  isFavorite: boolean;
};

export type UserFavorite = {
  userId: number;
  videoId: string;
};
