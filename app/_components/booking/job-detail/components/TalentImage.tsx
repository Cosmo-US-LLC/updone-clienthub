"use client";
import GalleryModal from "@/app/_components/ui/gallery";
import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function TalentImage({ talent, size = 0 }: any) {
  const [showModal, setShowModal] = useState(false);
  const galleryImages =
    talent?.gallery?.length > 0
      ? JSON.parse(talent?.gallery)
      : [talent.profile_pic];

  // console.log(talent, galleryImages);
  const sizes = ["h-[52px] w-[52px]", "w-[62px] h-[62px]"]

  return (
    <div className="relative">
      <Avatar
        className={`${sizes[size]} object-cover rounded-full ${size == 0 && 'border-2 border-[#F3F0FF]'} cursor-pointer`}
        onClick={(event) => {
          event.stopPropagation();
          setShowModal(true);
        }}
      >
        <AvatarImage src={talent?.profile_pic} alt="Talent Profile Picture" className="object-cover" />
        <AvatarFallback>
          {talent?.full_name?.split(" ")?.length > 1
            ? `${talent?.full_name?.split(" ")[0][0]}${
                talent?.full_name?.split(" ")[1][0]
              }`
            : `${talent?.full_name[0]}${talent?.full_name[1]}`}
        </AvatarFallback>
      </Avatar>
      {/* {galleryImages?.length > 0 && (
        <GalleryModal
          show={showModal}
          onClose={() => setShowModal(false)}
          images={galleryImages}
        />
      )} */}
    </div>
  );
}

export default TalentImage;
