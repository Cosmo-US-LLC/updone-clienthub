import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Cookies from "js-cookie";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { VerificationStatus } from "../verified-status-check-tooltip";
import VerificationIconMobile from "../shield";
import GalleryContent from "./GalleryContent";

interface GalleryModalProps {
    show: boolean;
    onClose: () => void;
    images: string[];
    talent: any; // Replace 'any' with the correct type
    isSelected: boolean;
    onToggleSelect: () => void;
    jobApiData: any; // Replace 'any' with correct type
  }

const GalleryModal: React.FC<GalleryModalProps> = ({
  show,
  onClose,
  images,
  talent,
  isSelected,
  onToggleSelect,
  jobApiData,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  document.addEventListener("click", (e) => console.log(e.target));

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);  

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-[1000] flex items-center justify-center overflow-hidden">
      <div
        className="bg-white rounded-none sm:rounded-xl w-full lg:w-[90%] xl:w-[76%] 2xl:w-[70%] max-w-3xl md:max-w-6xl relative overflow-y-auto max-h-full"
        ref={modalRef}
      >
        <GalleryContent
            images={images}
            talent={talent}
            isSelected={isSelected}
            onToggleSelect={onToggleSelect}
            jobApiData={jobApiData}
            onClose={onClose}
        />
      </div>
    </div>
  );
};

export default GalleryModal;
