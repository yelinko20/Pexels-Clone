import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ImageGalleryProps } from "../types";

export default function ImageGallery({
  photos,
  handleDownloadPhoto,
}: ImageGalleryProps) {
  return (
    <div className="list-none lg:columns-3 columns-2 ">
      {photos.map((photo) => {
        return (
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
                onClick={() => handleDownloadPhoto(photo.src.large2x, photo.id)}
              >
                <FiDownload className="text-xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
