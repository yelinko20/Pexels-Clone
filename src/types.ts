type Photo = {
  id: number;
  src: {
    large2x: string;
    large: string;
  };
  photographer: string;
};

type ImageGalleryProps = {
  photos: Photo[];
  handleDownloadPhoto: (url: string, id: number) => Promise<void>;
  handleLoadMorePhotos: () => Promise<void>;
};

type queryProps = {
  query?: string;
};

type DetailProps = {
  id?: string;
};
type Video = {
  id: number;
  image: string;
  video_files: {
    link: string;
  }[];
  user: {
    name: string;
  };
  url: string;
};

type VideoGalleryProps = {
  videos: Video[];
  handleDownloadVideo: (videoUrl: string, id: number) => Promise<void>;
  handleLoadMoreVideos: () => Promise<void>;
};

export type {
  Photo,
  queryProps,
  DetailProps,
  VideoGalleryProps,
  Video,
  ImageGalleryProps,
};
