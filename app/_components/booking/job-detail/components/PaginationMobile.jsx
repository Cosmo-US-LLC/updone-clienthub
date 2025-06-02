// import Loader from "@/components/Loader";
import { LoaderCircle } from "lucide-react";
import React from "react";

const PaginationMobile = ({
  currentCount,
  totalCount,
  totalPages,
  pageNo,
  setPageNo,
  onLoadMore,
  loading,
}) => {
  const getRemainingCount = () => {
    return Math.max(0, totalCount - currentCount);
  };

  const getButtonText = () => {
    const remaining = getRemainingCount();
    if (remaining <= 12) {
      // ${remaining}
      return `Load ${remaining} More`;
    }
    return "Load 12 more";
  };

  // if (loading) {
  //   return <div className="h-[200px]"><Loader /></div>;
  // }

  // if (totalPages < 2) {
  //   return null;
  // }

  if (pageNo >= totalPages || totalPages < 2) {
    return (
      <div className="flex flex-col items-center pt-4 pb-14">
        <p className="text-[#350ABC] text-center font-medium bg-white px-6 py-4 rounded-md shadow-md text-[16px]">
          No more talents to show
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end px-8 pt-4 pb-14">
      <button
        onClick={onLoadMore}
        className="bg-white text-[#350ABC] px-6 py-4 disabled:opacity-50 flex items-center rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 text-[16px]"
        disabled={loading}
      >
        {loading && <><LoaderCircle className="animate-spin w-5 h-5" />&nbsp;&nbsp;</>}
        {getButtonText()}
      </button>
    </div>
  );
};

export default PaginationMobile;
