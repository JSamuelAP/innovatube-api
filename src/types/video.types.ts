export type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

export type UserFavorite = {
  userId: number;
  videoId: string;
};
