"use client";

import React, { useState, useEffect } from "react";
// import TalentCard from "../TalentCard";
import PaginationMobile from "./PaginationMobile";
import TalentCard from "../../recommended-talent/TalentCard";
import { apiRequest } from "@/app/lib/services";
import Cookies from "js-cookie";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { setJobData, setJobId } from "@/app/lib/store/features/staffSlice";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";

function InviteTalentMobile({
  jobId,
  selectedTalentsLocal,
  setSelectedTalentsLocal,
  fetchTalentsData,
  setGalleryTalent,
  handleInviteSelected,
  data,
  setData,
  selected,
  recommended,
  setSelected,
  setRecommended,
  jobApiData,
  selectedCount,
  setJobApiData,
  setSelectedCount,
  currentPage,
  setCurrentPage,
  loadingInit,
  // allRecords,
  // pageSize,
  loading, 
  setLoading
}) {
  const dispatch = useDispatch();
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [skeletonCount, setSkeletonCount] = useState(0); 

  // const [loading, setLoading] = useState(true);
  // const [loadingInit, setLoadingInit] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [selectedCount, setSelectedCount] = useState(12);

  const { auth: storedData } = useAppSelector(selectAuth);
  // const [selectedTalentsLocal, setSelectedTalentsLocal] = useState(
  //   Cookies.get("event_talents") ? JSON.parse(Cookies.get("event_talents")) : []
  // );
  // const [recommended, setRecommended] = useState([]);

  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const skeletonCards = Array(selectedCount || 8).fill(null);

  // useEffect(()=>{
  //   Cookies.set("event_talents", JSON.stringify(selectedTalentsLocal))
  // }, [selectedTalentsLocal])

  // Cookies.get("event_city")
  // const fetchTalentsData = async (add = false, page = 1) => {
  //   setLoading(true);
  //   let body = {
  //     city_id: parseInt(Cookies.get("event_city")) || 1,
  //     service_id: parseInt(Cookies.get("event_service_id")) || 1,
  //     page_number: add ? page : currentPage,
  //     page_size: selectedCount || 12,
  //     order: "ASC",
  //   };
  //   try {
  //     const newData = await apiRequest("/job/recommended-workers/public", {
  //       method: "POST",
  //       body: body,
  //       headers: {
  //         ...(storedData && {
  //           Authorization: `Bearer ${storedData.token}`,
  //         }),
  //       },
  //     });
  //     const apiResponse = await apiRequest("/job/details/public", {
  //       method: "POST",
  //       body: {
  //         job_id: params?.id,
  //       },
  //     });

  //     if (add) {
  //       // dispatch(setJobData({
  //       //   ...newData,
  //       //   records: [...data?.records, ...(newData?.records || [])],
  //       // }));
  //       setRecommended({
  //         ...recommended,
  //         records: [...recommended?.records, ...(newData?.records || [])],
  //       });
  //     } else {
  //       // dispatch(setJobData(apiResponse));
  //       setRecommended(newData);
  //     }
  //     setJobApiData(apiResponse);
  //     setLoading(false);
  //     return;
  //   } catch (err) {
  //     console.error("Error 3", err);
  //     // setError("Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //     setLoadingInit(false);
  //     // dispatch(setJobId(params?.id));
  //   }
  // };

  // useEffect(() => {
  //   fetchTalentsData();
  // }, [currentPage, selectedCount]);

  const handlePageChange = (page) => {
    document
      .getElementById("top-element")
      .scrollIntoView({ behavior: "smooth" });
    setIsOptionSelected(false);
    setCurrentPage(page);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCount(Number(selectedValue)); // Update selectedCount with the new value
    setCurrentPage(1); // Reset to the first page when changing the page size
  };

  const handleLoadMore = () => {
    const remainingTalents = recommended?.pagination?.total_records - recommended?.records?.length;
    console.log("remainingTalents", remainingTalents);
  
    if (remainingTalents <= 0) return; // No more records, stop loading
  
    const talentsToAdd = Math.min(pageSize, remainingTalents);
    setSkeletonCount(talentsToAdd);
  
    const nextPage = pageNo + 1;
    setPageNo(nextPage);
    fetchTalentsData(true, nextPage);
  };

  useEffect(() => {
    if (!loading) {
      setSkeletonCount(0); // Reset the skeleton count when loading is complete
    }
  }, [loading]);

  return (
    <div className="pb-20" style={{ scrollbarWidth: "none" }}>
      {/* {jobId}-- */}
      {loadingInit ? (
        Array(pageSize)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="w-full h-[200px] rounded-2xl py-[16px] px-[12px] mb-4 bg-gray-100 animate-pulse"
            >
              <div className="flex flex-row gap-2">
                <div>
                  <div className="w-[74px] h-[74px] bg-gray-300 rounded-full border-4 border-[#EBE6FF]"></div>
                  <div className="w-[75px] h-6 bg-gray-300 rounded mt-2"></div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4"></div>
              <div className="flex justify-between items-center mt-4">
                <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                <div className="w-1/4 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {recommended?.records?.map((talent, index) => (
            <div key={talent.id || index}>
              {/* {console.log(
                selected.some((selecteds) => selecteds?.worker?.id == talent.id)
              )} */}
              <TalentCard
                talent={talent}
                jobApiData={jobApiData}
                isSelected={
                  selectedTalentsLocal.some(
                    (selecteds) => selecteds.id === talent.id
                  ) ||
                  talent?.alreadyInvited ||
                  selected.some((selecteds) => selecteds?.worker?.id == talent.id)
                }
                onToggleSelect={() =>
                  !selected.some((selecteds) => selecteds?.worker?.id == talent.id) &&
                  !talent?.alreadyInvited &&
                  setSelectedTalentsLocal((prev) =>
                    prev.some((item) => item.id === talent.id)
                      ? prev.filter((item) => item.id !== talent.id)
                      : [
                          ...prev,
                          {
                            id: talent.id,
                            profile_pic: talent?.profile_pic,
                          },
                        ]
                  )
                }
                setGalleryTalent={setGalleryTalent}
              />
            </div>
          ))}

          {/* Show skeleton loaders for the number of talents being added */}
          {Array(skeletonCount)
            .fill(null)
            .map((_, index) => (
              <div
                key={`${index}-skeleton`}
                className="w-full h-[200px] rounded-2xl py-[16px] px-[12px] mb-0 bg-gray-100 animate-pulse"
              >
                <div className="flex flex-row gap-2">
                  <div>
                    <div className="w-[74px] h-[74px] bg-gray-300 rounded-full border-4 border-[#EBE6FF]"></div>
                    <div className="w-[75px] h-6 bg-gray-300 rounded mt-2"></div>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-4"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                  <div className="w-1/4 h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}

          <PaginationMobile
            currentCount={recommended?.records?.length || 0}
            totalCount={recommended?.pagination?.total_records || 0}
            onLoadMore={handleLoadMore}
            pageNo={pageNo}
            totalPages={recommended?.pagination?.total_pages}
            setPageNo={setPageNo}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}

export default InviteTalentMobile;
