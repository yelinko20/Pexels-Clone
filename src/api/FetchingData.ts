import axios from "axios";

let per_page = 15;
let currentPage = 1;

export const getPopularPhotos = () => {
  return axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/curated?page=${currentPage}&per_page=${per_page}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
      },
    }
  );
};

export const searchPhotos = (query?: string) => {
  return axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/search?page=${currentPage}&per_page=${per_page}&query=${query}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
      },
    }
  );
};

export const getPhotoDetails = (id?: string) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/photos/${id}`, {
    headers: {
      Authorization: import.meta.env.VITE_API_KEY,
    },
  });
};

export const downloadPhoto = async (imageUrl: string, filename: string) => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "blob",
    });

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    alert("Failed to download image!");
  }
};

export const downloadVideo = async (videoUrl: string, filename: string) => {
  try {
    const response = await axios.get(videoUrl, {
      responseType: "blob",
    });

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    alert("Failed to download video!");
  }
};

export const getPopularVideos = async () => {
  return axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/videos/popular?page=${currentPage}&per_page=${per_page}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
      },
    }
  );
};

export const getVideoDetails = async (id?: string) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/videos/videos/${id}`, {
    headers: {
      Authorization: import.meta.env.VITE_API_KEY,
    },
  });
};

export const increasePerPage = () => {
  currentPage++;
};
