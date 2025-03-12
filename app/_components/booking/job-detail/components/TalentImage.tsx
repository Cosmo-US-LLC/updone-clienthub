"use client";
import GalleryModal from "@/app/_components/ui/gallery";
import Image from "next/image";
import React, { useState } from "react";

function TalentImage({ talent }: any) {
  const [showModal, setShowModal] = useState(false);
  const galleryImages =
    talent?.gallery?.length > 0 ? JSON.parse(talent?.gallery) : [talent.profile_pic];

  console.log(talent, galleryImages);

  return (
    <div className="relative">
      <Image
        width={100}
        height={100}
        className="h-[52px] w-[52px] object-cover rounded-[50%] border-2 border-[#F3F0FF] cursor-pointer"
        src={talent.profile_pic}
        alt="Talent Profile Picture"
        onClick={(event) => {
          event.stopPropagation();
          setShowModal(true);
        }}
      />
      {galleryImages?.length > 0 && (
        <GalleryModal
          show={showModal}
          onClose={() => setShowModal(false)}
          images={galleryImages}
        />
      )}
    </div>
  );
}

export default TalentImage;
