import { Link } from "react-router-dom";
import { queryProps } from "../types";

export default function ZeroResult({ query }: queryProps) {
  return (
    <div className="container mx-auto">
      <div>
        We couldn’t find anything for "{query}".Try to refine your search.
      </div>
      <Link to="/">Go to the main page</Link>
    </div>
  );
}
