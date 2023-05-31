import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getVideoDetails, downloadVideo } from "../api/FetchingData";
import { Video, DetailProps } from "../types";
import { toast, ToastContainer } from "react-toastify";
import DetailSkeletonLoading from "../utils/DetailSkeletonLoading";

const VideoDetails: React.FC = () => {
  const { id } = useParams<DetailProps>();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await getVideoDetails(id);
        console.log(response.data);
        setVideo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  const handleDownload = async () => {
    if (video) {
      try {
        toast.success("video downloading");
        await downloadVideo(video.video_files[0].link, `${video.id}.mp4`);
      } catch (error) {
        console.error("Error downloading video:", error);
      }
    }
  };

  if (isLoading || !video) {
    return <DetailSkeletonLoading />;
  }

  return (
    <div className="container h-screen flex p-8 flex-col items-center mx-auto">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="mb-8 flex items-center gap-20">
        <Link to={"/"} className="">
          back to home
        </Link>
        <button
          onClick={handleDownload}
          className="bg-Emerald800 text-White rounded px-4 py-2 hover:bg-Emerald600 focus:outline-none"
        >
          Download
        </button>
      </div>
      <div className="relative w-96 h-64">
        <video className="rounded-lg w-full h-full object-cover" controls>
          <source src={video.video_files[0].link} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default VideoDetails;
