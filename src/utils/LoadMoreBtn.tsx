type LoadMoreBtnProps = {
  activeFilter: string;
  handleLoadMorePhotos: () => Promise<void>;
  handleLoadMoreVideos: () => Promise<void>;
};

export default function LoadMoreBtn({
  handleLoadMoreVideos,
  handleLoadMorePhotos,
  activeFilter,
}: LoadMoreBtnProps) {
  return (
    <>
      {activeFilter === "images" ? (
        <button
          className="mx-auto flex items-center max-w-[10rem] px-3 py-2 text-White justify-center container bg-Emerald800 hover:bg-Emerald600 rounded"
          onClick={handleLoadMorePhotos}
        >
          Load More
        </button>
      ) : (
        <button
          className="mx-auto flex items-center max-w-[10rem] px-3 py-2 text-White justify-center container bg-Emerald800 hover:bg-Emerald600 rounded"
          onClick={handleLoadMoreVideos}
        >
          Load More
        </button>
      )}
    </>
  );
}
