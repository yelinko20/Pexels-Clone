import { FormEvent } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

type SearchbarProps = {
  handleSearch: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setQuery: (value: string) => void;
  query: string;
};

export default function Searchbar({
  handleSubmit,
  handleSearch,
  query,
  setQuery,
}: SearchbarProps) {
  return (
    <div className="bg-[url('./assets/header.jpg')]  w-full min-h-[35rem] bg-center bg-no-repeat flex flex-col  items-center justify-center mb-6">
      <div className="text-White  text-3xl font-medium mb-4">
        The best free stock photos, royalty free <br /> images & videos shared
        by creators.
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between mb-4 bg-White px-4 py-2 max-w-xl w-full mx-8 sm:mx-0"
      >
        <input
          type="text"
          placeholder="Search for photos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none"
        />
        <button
          onClick={handleSearch}
          className=" focus:outline-none "
          type="submit"
        >
          <HiMagnifyingGlass className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
