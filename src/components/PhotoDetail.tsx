import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPhotoDetails, downloadPhoto } from "../api/FetchingData";
import { Photo, DetailProps } from "../types";
import DetailSkeletonLoading from "../utils/DetailSkeletonLoading";

const PhotoDetail: React.FC = () => {
  const { id } = useParams<DetailProps>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await getPhotoDetails(id);
        console.log(response.data);
        setPhoto(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching photo details:", error);
      }
    };

    fetchPhotoDetails();
  }, [id]);

  const handleDownload = async () => {
    if (photo) {
      try {
        await downloadPhoto(photo.src.large2x, `${photo.id}.jpg`);
      } catch (error) {
        console.error("Error downloading photo:", error);
      }
    }
  };

  if (isLoading || !photo) {
    return <DetailSkeletonLoading />;
  }

  return (
    <div className="container h-screen flex p-8 flex-col items-center mx-auto">
      <div className="mb-8 flex items-center gap-20">
        <Link to={"/"} className="">
          back to home
        </Link>
        <button
          onClick={handleDownload}
          className=" bg-Emerald800 text-White rounded px-4 py-2 hover:bg-Emerald600 focus:outline-none"
        >
          Download
        </button>
      </div>
      <div className="">
        <img
          src={photo.src.large}
          alt={photo.photographer}
          className="rounded-lg w-full max-w-sm"
        />
      </div>
      <h2 className="text-2xl my-4 font-bold">{photo.photographer}</h2>
    </div>
  );
};

export default PhotoDetail;
