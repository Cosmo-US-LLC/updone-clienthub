"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GalleryContent from "@/app/_components/ui/gallery/GalleryContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiRequest } from "@/app/lib/services";
import { useParams } from "next/navigation";

function TalentImage({ talent, hideModal = true, size = 0 }: any) {
  console.log("hideModal", hideModal);
  
  const [selectedTalentsLocal, setSelectedTalentsLocal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobApiData, setJobApiData] = useState<any>(null);
  const params = useParams()

  const sizes = ["h-[52px] w-[52px]", "w-[62px] h-[62px]"];

  const fetchJobDetails = async () => {
      try {
        const apiResponse = await apiRequest("/job/details/public", {
          method: "POST",
          body: {
            job_id: params.id,
          },
        });
        if (apiResponse) {
          setJobApiData(apiResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(() => {
      fetchJobDetails();
    }, [showModal]);

  return (
    <div className="relative">
      {showModal && talent?.status !== "completed" && talent?.status !== "pending" && hideModal ? (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent
            hideCloseButton={showModal}
            className="w-full max-w-full max-h-[100dvh] bg-transparent h-[100dvh] z-[299] overflow-y-auto px-2"
          >
            <DialogHeader hidden>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              <GalleryContent
                images={
                  talent?.invite?.worker?.gallery?.length > 0
                    ? talent?.invite?.worker?.gallery
                    : [talent?.invite?.worker?.profile_pic]
                }
                talent={talent?.invite?.worker}
                jobApiData={jobApiData}
                onClose={() => setShowModal(false)}
                isSelected={
                  selectedTalentsLocal.some(
                    (selected: any) => selected.id === talent?.invite?.worker.id
                  ) || talent?.invite?.worker?.alreadyInvited
                }
                onToggleSelect={() =>
                  !talent?.invite?.worker?.alreadyInvited &&
                  setSelectedTalentsLocal((prev: any) =>
                    prev.some(
                      (item: any) => item.id === talent?.invite?.worker.id
                    )
                      ? prev.filter(
                          (item: any) => item.id !== talent?.invite?.worker.id
                        )
                      : [
                          ...prev,
                          {
                            id: talent?.invite?.worker.id,
                            profile_pic: talent?.invite?.worker?.profile_pic,
                          },
                        ]
                  )
                }
                showButton={false}
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : showModal && talent?.status == "pending" && hideModal ? (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent
            hideCloseButton={showModal}
            className="w-[65vw] xl:w-[55vw] max-w-5xl max-h-[90vh] !rounded-xl !m-0 !gap-0 bg-transparent !p-0 !border-0 z-[299] overflow-y-auto"
          >
            <DialogHeader hidden className="bg-transparent !p-0 !m-0">
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <GalleryContent
                images={
                  talent?.worker?.gallery?.length > 0
                    ? talent?.worker?.gallery
                    : [talent?.worker?.profile_pic]
                }
                talent={talent}
                jobApiData={jobApiData}
                onClose={() => setShowModal(false)}
                isSelected={
                  selectedTalentsLocal.some(
                    (selected: any) => selected.id === talent?.worker.id
                  ) || talent?.worker?.alreadyInvited
                }
                onToggleSelect={() =>
                  !talent?.worker?.alreadyInvited &&
                  setSelectedTalentsLocal((prev: any) =>
                    prev.some(
                      (item: any) => item.id === talent?.worker.id
                    )
                      ? prev.filter(
                          (item: any) => item.id !== talent?.worker.id
                        )
                      : [
                          ...prev,
                          {
                            id: talent?.worker.id,
                            profile_pic: talent?.worker?.profile_pic,
                          },
                        ]
                  )
                }
                inviteId={talent?.invite_id}
                showButton={false}
                addButton={true}
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Avatar
          className={`${sizes[size]} object-cover rounded-full ${
            size == 0 && "border-2 border-[#F3F0FF]"
          } cursor-pointer`}
          onClick={(event) => {
            event.stopPropagation();
            setShowModal(true);
          }}
        >
          <AvatarImage
            src={
              talent?.invite?.worker?.profile_pic || talent?.worker?.profile_pic
            }
            alt="Talent Profile Picture"
            className="object-cover"
          />
          <AvatarFallback>
            {(() => {
              const fullName =
                talent?.invite?.worker?.full_name || talent?.full_name || "";

              const nameParts = fullName.split(" ");

              if (nameParts.length > 1) {
                return `${nameParts[0][0]}${nameParts[1][0]}`;
              } else {
                return `${fullName[0] || ""}${fullName[1] || ""}`;
              }
            })()}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export default TalentImage;
