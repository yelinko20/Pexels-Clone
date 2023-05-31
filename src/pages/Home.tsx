import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPopularPhotos,
  downloadPhoto,
  increasePerPage,
  getPopularVideos,
  downloadVideo,
} from "../api/FetchingData";
import { Photo, Video } from "../types";
import Searchbar from "./Searchbar";
import ImageGallery from "../components/ImageGallery";
import FilterBtns from "../utils/FilterBtns";
import VideoGallery from "../components/VideoGallery";
import SkeletonLoading from "../utils/SkeletonLoading";
import LoadMoreBtn from "../utils/LoadMoreBtn";

const Gallery: React.FC = () => {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("images");
  const navigate = useNavigate();

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    // Fetch popular photos and videos on component mount
    fetchPopularPhotos();
    fetchPopularVideos();
  }, []);

  const fetchPopularPhotos = async () => {
    try {
      const { data } = await getPopularPhotos();
      setPhotos(data.photos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching popular photos:", error);
    }
  };

  const fetchPopularVideos = async () => {
    try {
      const { data } = await getPopularVideos();
      setVideos(data.videos);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more photos
  const handleLoadMorePhotos = async () => {
    try {
      increasePerPage();
      const { data } = await getPopularPhotos();
      const newPhotos = data.photos;
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // load more videos
  const handleLoadMoreVideos = async () => {
    try {
      increasePerPage();
      const { data } = await getPopularVideos();
      console.log(data);
      const newVideos = data.videos;
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (query.trim().length === 0) {
      // Redirect to the home page if the query is empty
      navigate("/");
    } else {
      // Redirect to the search results page with the query as a URL parameter
      navigate(`/search/${query}`);
    }
  };

  // Photo download
  const handleDownloadPhoto = async (url: string, id: number) => {
    try {
      await downloadPhoto(url, `${id}.jpg`);
    } catch (error) {
      console.error("Error downloading photo:", error);
    }
  };

  // Video download
  const handleDownloadVideo = async (videoUrl: string, id: number) => {
    try {
      await downloadVideo(videoUrl, `${id}.mp4`);
    } catch (error) {
      console.error("Error downloading videos:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const renderContent = () =>
    activeFilter === "images" ? (
      <ImageGallery
        photos={photos}
        handleDownloadPhoto={handleDownloadPhoto}
        handleLoadMorePhotos={handleLoadMorePhotos}
      />
    ) : activeFilter === "videos" ? (
      <VideoGallery
        videos={videos}
        handleDownloadVideo={handleDownloadVideo}
        handleLoadMoreVideos={handleLoadMoreVideos}
      />
    ) : (
      <div>No content to display</div>
    );

  // skeleton loading .....
  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className=" pb-8">
      <Searchbar
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        query={query}
        setQuery={setQuery}
      />
      <div className="container mx-auto p-2 mb-10">
        <div className="flex justify-center items-center gap-8 mb-10">
          <FilterBtns
            onClick={() => handleFilterChange("images")}
            active={activeFilter === "images"}
            text={"images"}
          />
          <FilterBtns
            onClick={() => handleFilterChange("videos")}
            active={activeFilter === "videos"}
            text={"videos"}
          />
        </div>
        <div className="mb-10 text-2xl">
          Free stock {activeFilter === "images" ? "images" : "videos"}
        </div>
        {renderContent()}
      </div>
      <LoadMoreBtn
        activeFilter={activeFilter}
        handleLoadMorePhotos={handleLoadMorePhotos}
        handleLoadMoreVideos={handleLoadMoreVideos}
      />
    </div>
  );
};

export default Gallery;
