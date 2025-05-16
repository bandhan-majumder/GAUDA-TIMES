export const BlogSkeleton = () => (
    <div className="w-full mx-auto px-2 sm:px-4 mb-4 sm:mb-6">
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 shadow-lg shadow-neutral-600/10 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#161616] text-white">
        {/* Image skeleton */}
        <div className="flex-shrink-0 flex justify-center xs:justify-start">
          <div className="rounded-lg sm:rounded-xl md:rounded-2xl bg-gray-700 animate-pulse w-20 h-20 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
        </div>
        {/* Content skeleton */}
        <div className="flex-grow flex flex-col justify-center mt-2 xs:mt-0">
          <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-full mt-1"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3 mt-1"></div>
        </div>
        {/* Date skeleton */}
        <div className="hidden xs:flex flex-shrink-0 items-center justify-end mt-2 xs:mt-0">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
        </div>
      </div>
    </div>
  );