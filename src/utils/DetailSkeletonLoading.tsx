export default function DetailSkeletonLoading() {
  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className="animate-pulse  p-8">
        <div className="h-64 w-96 bg-Gray200 rounded-lg"></div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="h-4 w-48 bg-Gray200 rounded"></div>
            <div className="h-2 w-32 bg-Gray200 rounded mt-2"></div>
            <div className="h-2 w-24 bg-Gray200 rounded mt-1"></div>
          </div>
          <div className="h-8 w-24 bg-Emerald800  rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
