export default function SkeletonLoading() {
  return (
    <div className="mx-auto py-8">
      <div className="animate-pulse w-full min-h-[35rem] bg-Gray200"></div>
      <div className="list-none lg:columns-3 columns-2 container mx-auto">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="relative mb-4 group">
            <div className="animate-pulse bg-Gray200 rounded-lg w-full h-80"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
