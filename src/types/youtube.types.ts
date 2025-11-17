export type YouTubeApiResponse = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
};

export type Item = {
  kind: ItemKind;
  etag: string;
  id: ID;
  snippet: Snippet;
};

export type ID =
  | {
      kind: IDKind;
      videoId: string;
      playlistId?: string;
    }
  | string;

export enum IDKind {
  YoutubePlaylist = 'youtube#playlist',
  YoutubeVideo = 'youtube#video',
}

export enum ItemKind {
  YoutubeSearchResult = 'youtube#searchResult',
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: Date;
}

export type Thumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
};

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};
