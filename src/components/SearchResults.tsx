import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import {
  downloadPhoto,
  increasePerPage,
  searchPhotos,
} from "../api/FetchingData";
import { Photo, queryProps } from "../types";
import SkeletonLoading from "../utils/SkeletonLoading";
import ZeroResult from "./ZeroResult";

const SearchResults: React.FC = () => {
  const { query } = useParams<queryProps>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await searchPhotos(query);
        if (data.total_results === 0) {
          return <ZeroResult query={query} />;
        } else {
          setPhotos(data.photos);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error searching photos:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleLoadMorePhotos = async () => {
    try {
      increasePerPage();
      const response = await searchPhotos(query);
      const newPhotos = response.data.photos;
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownload = async (url: string, id: number) => {
    try {
      await downloadPhoto(url, `${id}.jpg`);
    } catch (error) {
      console.error("Error downloading photo:", error);
    }
  };
  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center p-2">
        <div className="sm:text-3xl text-xl">Free {query} Photos</div>
        <Link className="sm:text-xl" to={"/"}>
          Home
        </Link>
      </div>
      <div className="list-none lg:columns-3 columns-2 p-2">
        {photos.map((photo) => (
          <div key={photo.id} className="relative mb-4 group">
            <Link to={`/photos/${photo.id}`}>
              <img
                src={photo.src.large2x}
                alt={photo.photographer}
                className="rounded-lg"
              />
            </Link>
            <div className="hidden items-center justify-end md:justify-between absolute z-20 bottom-0 w-full group-hover:flex  p-8">
              <div className="font-bold hidden md:block text-White text-xl">
                {photo.photographer}
              </div>
              <div
                className="w-10 rounded-xl flex items-center justify-center h-10 bg-White cursor-pointer"
                onClick={() => handleDownload(photo.src.large2x, photo.id)}
              >
                <FiDownload className="text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mx-auto flex items-center max-w-[10rem] px-3 py-2 text-White justify-center container bg-Emerald800 hover:bg-Emerald600 rounded"
        onClick={handleLoadMorePhotos}
      >
        Load More
      </button>
    </div>
  );
};

export default SearchResults;
