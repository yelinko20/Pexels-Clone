import { useState, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { RiVideoFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { VideoGalleryProps } from "../types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VideoGallery({
  videos,
  handleDownloadVideo,
}: VideoGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [videoActiveIndex, setVideoActiveIndex] = useState<number>(-1);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    videoRefs.current[index]?.play();
    setVideoActiveIndex(index);
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(-1);
    videoRefs.current[index]?.pause();
  };

  const handleDownload = (videoLink: string, videoId: number) => {
    handleDownloadVideo(videoLink, videoId);
    toast.success("video downloading...");
  };

  return (
    <>
      <div className="list-none lg:columns-3 columns-2">
        <ToastContainer position="top-right" autoClose={2000} />
        {videos.map((video, index) => (
          <div
            className="relative mb-4 group"
            key={video.id}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <Link to={`/videos/${video.id}`}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                preload="none"
                className=""
                poster={video.image}
              >
                <source src={video.video_files[0].link} type="video/mp4" />
              </video>
            </Link>
            <RiVideoFill
              className={`${
                videoActiveIndex === index ? "opacity-40" : "opacity-100"
              } text-white absolute top-4 left-8 text-3xl`}
            />
            <div
              className={` items-center justify-end md:justify-between absolute z-20 -bottom-2 w-full ${
                hoveredIndex === index ? "flex" : "hidden"
              } p-8`}
            >
              <div className="font-bold hidden md:block text-white text-xl">
                {video.user.name}
              </div>
              <div
                className="w-10 rounded-xl flex items-center justify-center h-10 bg-white cursor-pointer"
                onClick={() =>
                  handleDownload(video.video_files[0].link, video.id)
                }
              >
                <FiDownload className="text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
