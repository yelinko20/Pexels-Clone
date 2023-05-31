import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto text-center">
      <div className="text-7xl mt-20 font-bold mb-4">404</div>
      <p className="mb-4">The page you're looking for does not exist.</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default NotFound;
