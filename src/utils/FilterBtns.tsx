type FilterButtonProps = {
  onClick: () => void;
  active: boolean;
  text: string;
};
export default function FilterBtns({
  text,
  onClick,
  active,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-medium ${
        active ? "bg-Black px-4 py-3 rounded-full text-White" : ""
      }`}
    >
      {text}
    </button>
  );
}
