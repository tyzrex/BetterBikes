export default function CardLoader() {
  return (
    <>
      <div className="relative flex w-full max-w-lg sm:max-w-[260px] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md all-transition">
        <div className="animate-pulse flex h-50 md:h-60 overflow-hidden ">
          <div className="flex items-start justify-center h-full w-full bg-gray-300"></div>
        </div>
        <div className="mt-2 px-5 pb-5">
          <h5 className="animate-pulse h-5 bg-gray-300 w-3/4"></h5>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <div className="flex items-center">
              <div className="animate-pulse h-5 w-5 bg-gray-300 rounded-full"></div>
              <div className="animate-pulse h-5 w-5 bg-gray-300 rounded-full ml-1"></div>
              <div className="animate-pulse h-5 w-5 bg-gray-300 rounded-full ml-1"></div>
              <div className="animate-pulse h-5 w-5 bg-gray-300 rounded-full ml-1"></div>
              <div className="animate-pulse h-5 w-5 bg-gray-300 rounded-full ml-1"></div>
            </div>
          </div>
          <div className="flex items-center mb-3">
            <p className="animate-pulse h-4 w-16 bg-gray-300"></p>
          </div>
          <a
            href="#"
            className="flex items-center justify-center rounded-md bg-gray-300 px-5 py-2 text-center text-sm text-white color-transition group"
          >
            <span>Loading...</span>
          </a>
        </div>
      </div>
    </>
  );
}
