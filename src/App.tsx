import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PhotoDetail from "./components/PhotoDetail";
import NotFound from "./pages/NotFound";
import SearchResults from "./components/SearchResults";
import VideoGallery from "./components/VideoGallery";
import VideoDetails from "./components/VideoDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/videos/:id" element={<VideoDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
