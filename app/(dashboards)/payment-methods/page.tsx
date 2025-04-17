"use client";
// @ts-nocheck

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import useClickOutside from "@/app/lib/hooks";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RenderLoader from "@/app/_components/ui/loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Page = () => {
  const [methodsData, setMethodsData] = useState<any>(null);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest("/stripe/payment-methods", {
        method: "POST",
        headers: {
          revalidate: true,
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
      });
      setMethodsData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOffers();
  }, [storedData]);

  console.log(methodsData);

  const deletePaymentMethod = async (id: string) => {
    try {
      setLoadingDelete(true);
      const response = await apiRequest("/stripe/payment-methods", {
        method: "DELETE",
        headers: {
          revalidate: true,
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
        body: {
          payment_method_id: id,
        },
      });
      fetchOffers();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <div className="h-full max-lg:hidden flex flex-col max-lg:px-8 max-lg:py-8">
        {isLoading ? (
          <div className="py-20">
            <RenderLoader />
          </div>
        ) : methodsData?.length == 0 ? (
          <div className="h-full flex justify-center items-center flex-col">
            <Image
              width={151}
              height={151}
              alt=""
              src="/images/client-portal/payment/no-payment.svg"
            />
            <p className="text-[#000000] text-[34px] leading-[32px] font-[300]">
              No Payment Methods
            </p>
            <p className="text-neutral-600 text-md py-4">
              Save a payment method at checkout and it will appear here.
            </p>
          </div>
        ) : (
          <>
            <Table className="grow relative hover:bg-transparent">
              <TableHeader className="sticky -top-[2] z-10 bg-[#f6f9fc]">
                <TableRow>
                  <TableHead>Card</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Date Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto bg-white">
                {methodsData?.map((row: any, index: any) => (
                  <TableRow key={index} className="text-[#2C2240]">
                    {/* Card Info */}
                    <TableCell className="flex flex-row gap-4 items-center py-4">
                      <span>**** **** **** {row?.card?.last4}</span>
                      <span>{getIcon(row?.card?.brand)}</span>
                    </TableCell>
                    {/* Amount */}
                    <TableCell className="!py-4 capitalize">
                      {row?.card?.brand}
                    </TableCell>
                    {/* Date Added */}
                    <TableCell>
                      {new Date(row?.created * 1000).toLocaleDateString(
                        "en-US"
                      )}
                    </TableCell>
                    {/* Date Expires */}
                    <TableCell>
                      {row?.card?.exp_month}/{row?.card?.exp_year}
                    </TableCell>
                    {/* Actions */}
                    <TableCell>
                      <Button
                        onClick={() => deletePaymentMethod(row?.id)}
                        disabled={loadingDelete}
                        variant={"destructive"}
                        className="!py-1 !h-fit !text-white hover:bg-red-600 disabled:opacity-50"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
      <div className="h-full lg:hidden flex flex-col max-lg:px-4 max-lg:py-4 gap-2">
        <Link href={"/"} className="text-xs text-neutral-500 flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" /> 
          Back
        </Link>
        <h2 className="text-[18px] font-[500]">Payment Methods</h2>
        {isLoading ? (
          <div className="py-20">
            <RenderLoader />
          </div>
        ) : methodsData?.length !== 0 ? (
          <div className="h-full min-h-[70vh] flex justify-center items-center flex-col gap-3">
            <Image
              width={151}
              height={151}
              alt=""
              src="/images/client-portal/payment/no-payment.svg"
            />
            <p className="text-[#000000] text-[34px] leading-[32px] font-[300]  max-lg:text-center">
              No Payment Methods
            </p>
            <p className="text-neutral-600 text-md py-4 max-lg:text-center">
              Save a payment method at checkout and it will appear here.
            </p>
          </div>
        ) : (
          methodsData?.map((row: any, index: any) => (
            <div
              key={index}
              className="w-full flex flex-col gap-2 border bg-white p-4 rounded-md shadow-md mb-4"
            >
              <div className="flex flex-row gap-4 items-center">
                <span>**** **** **** {row?.card?.last4}</span>
                <span>{getIcon(row?.card?.brand)}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center pt-2">
                {/* <span>{row?.card?.brand}</span> */}
                <div>
                  <span className="text-xs text-neutral-500">Saved At:</span>
                  <br />
                  {new Date(row?.created * 1000).toLocaleDateString("en-US")}
                </div>
                <div>
                  <span className="text-xs text-neutral-500">Expires At:</span>
                  <br />
                  {row?.card?.exp_month}/{row?.card?.exp_year}
                </div>
                <Button
                  onClick={() => deletePaymentMethod(row?.id)}
                  disabled={loadingDelete}
                  variant={"destructive"}
                  className="!py-1 !h-fit !text-white hover:bg-red-600 disabled:opacity-50"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

const getIcon = (brand: string = "") => {
  switch (brand) {
    case "visa":
      return (
        <svg
          width="27"
          height="18"
          viewBox="0 0 27 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="27" height="18" rx="2" fill="white" />
          <rect
            x="0.5"
            y="0.5"
            width="26"
            height="17"
            rx="1.5"
            stroke="black"
            strokeOpacity="0.2"
          />
          <path
            d="M16.6781 5.48601C15.187 5.48601 13.8545 6.25887 13.8545 7.68678C13.8545 9.32432 16.2177 9.43743 16.2177 10.2601C16.2177 10.6065 15.8208 10.9165 15.1428 10.9165C14.1806 10.9165 13.4614 10.4833 13.4614 10.4833L13.1537 11.9242C13.1537 11.9242 13.9822 12.2902 15.0821 12.2902C16.7123 12.2902 17.9951 11.4794 17.9951 10.027C17.9951 8.29668 15.622 8.18694 15.622 7.42337C15.622 7.15203 15.9479 6.85472 16.6239 6.85472C17.3867 6.85472 18.009 7.16982 18.009 7.16982L18.3102 5.77813C18.3102 5.77813 17.633 5.48601 16.6781 5.48601ZM3.03611 5.59104L3 5.80111C3 5.80111 3.6273 5.91592 4.19229 6.14493C4.91975 6.40754 4.97158 6.56042 5.09409 7.03525L6.42916 12.1819H8.21882L10.9759 5.59104H9.19037L7.41876 10.0722L6.69584 6.27376C6.62954 5.83903 6.29372 5.59104 5.88266 5.59104H3.03611ZM11.6939 5.59104L10.2932 12.1819H11.9959L13.3917 5.59104H11.6939ZM21.1904 5.59104C20.7798 5.59104 20.5623 5.81086 20.4026 6.19498L17.9081 12.1819H19.6937L20.0391 11.184H22.2144L22.4245 12.1819H24L22.6255 5.59104H21.1904ZM21.4226 7.37168L21.9519 9.84487H20.5339L21.4226 7.37168Z"
            fill="#1434CB"
          />
        </svg>
      );
    case "mastercard":
      return (
        <svg
          width="27"
          height="18"
          viewBox="0 0 27 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="27" height="18" rx="2" fill="white" />
          <rect
            x="0.5"
            y="0.5"
            width="26"
            height="17"
            rx="1.5"
            stroke="black"
            strokeOpacity="0.2"
          />
          <path
            d="M11.2017 4.81709H15.7983V13.0763H11.2017V4.81709Z"
            fill="#FF5F00"
          />
          <path
            d="M11.4936 8.94668C11.4936 7.26857 12.2815 5.78016 13.4927 4.81707C12.6026 4.11664 11.479 3.69346 10.2532 3.69346C7.34936 3.69346 5 6.04281 5 8.94668C5 11.8505 7.34936 14.1999 10.2532 14.1999C11.479 14.1999 12.6026 13.7767 13.4927 13.0763C12.2815 12.1278 11.4936 10.6248 11.4936 8.94668Z"
            fill="#EB001B"
          />
          <path
            d="M22 8.94668C22 11.8505 19.6506 14.1999 16.7468 14.1999C15.521 14.1999 14.3974 13.7767 13.5073 13.0763C14.733 12.1132 15.5064 10.6248 15.5064 8.94668C15.5064 7.26857 14.7184 5.78016 13.5073 4.81707C14.3974 4.11664 15.521 3.69346 16.7468 3.69346C19.6506 3.69346 22 6.05741 22 8.94668Z"
            fill="#F79E1B"
          />
        </svg>
      );
    case "amex":
      return (
        <svg
          width="27"
          height="18"
          viewBox="0 0 27 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="27" height="18" rx="2" fill="white" />
          <rect
            x="0.5"
            y="0.5"
            width="26"
            height="17"
            rx="1.5"
            stroke="black"
            strokeOpacity="0.2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M26.74 13.35V15.306H24.256L23.338 14.232L22.384 15.306H15.328V9.588H13L15.91 3H18.742L19.426 4.494V3H22.942L23.53 4.566L24.106 3H26.74V3.92999H24.706L23.782 6.36601L23.536 7.02599L22.354 3.92999H20.32V8.72998L18.208 3.92999H16.57L14.446 8.72998H15.838L16.21 7.806H18.538L18.91 8.72998H20.32H21.544V5.604L21.538 4.97399L21.778 5.604L22.948 8.72998H24.112L25.288 5.604L25.516 4.98V8.72998H26.74V10.608L25.384 11.97L26.74 13.35ZM16.312 14.376V9.59397H20.32V10.632H17.536V11.472H20.266V12.504H17.536V13.338H20.32V14.376H16.312ZM26.368 14.376H24.778L23.326 12.816L21.868 14.376H20.32L22.558 11.994L20.32 9.59397H21.916L23.356 11.148L24.802 9.59397H26.368L24.124 11.976L26.368 14.376Z"
            fill="#016FD0"
          />
          <path
            d="M17.374 4.95599L17.134 5.55601L16.636 6.76798H18.112L17.614 5.55601L17.374 4.95599Z"
            fill="#016FD0"
          />
        </svg>
      );
    case "discover":
      return (
        <svg
          width="27"
          height="18"
          viewBox="0 0 27 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="27" height="18" rx="2" fill="white" />
          <rect
            x="0.5"
            y="0.5"
            width="26"
            height="17"
            rx="1.5"
            stroke="black"
            strokeOpacity="0.2"
          />
          <path d="M27 12C27 12 20.9955 16.1424 10 18H27V12Z" fill="#F48120" />
          <path
            d="M3.05339 6.95041H2V10.6406H3.05339C3.61027 10.6406 4.01284 10.5064 4.36844 10.2179C4.79114 9.86903 5.03939 9.34569 5.03939 8.80222C5.03268 7.70858 4.22083 6.95041 3.05339 6.95041ZM3.89878 9.72813C3.67066 9.92941 3.38215 10.0233 2.91249 10.0233H2.71791V7.5811H2.91249C3.37544 7.5811 3.65724 7.66161 3.89878 7.87632C4.14703 8.09773 4.29464 8.43991 4.29464 8.79551C4.29464 9.15111 4.14703 9.50672 3.89878 9.72813Z"
            fill="#231F20"
          />
          <path
            d="M6.08603 6.95041H5.36812V10.6406H6.08603V6.95041Z"
            fill="#231F20"
          />
          <path
            d="M7.84393 8.3661C7.41452 8.20507 7.28704 8.09772 7.28704 7.90315C7.28704 7.66832 7.51516 7.49387 7.8238 7.49387C8.0385 7.49387 8.21966 7.58109 8.40081 7.7958L8.77654 7.30601C8.46791 7.03763 8.09889 6.89673 7.68961 6.89673C7.03879 6.89673 6.53558 7.35297 6.53558 7.95682C6.53558 8.46674 6.77041 8.72841 7.44136 8.96995C7.72316 9.0706 7.86406 9.13769 7.93786 9.17795C8.07876 9.27188 8.15256 9.40607 8.15256 9.56039C8.15256 9.86231 7.91773 10.0837 7.59568 10.0837C7.25349 10.0837 6.97841 9.90928 6.81067 9.59393L6.34772 10.0435C6.67648 10.5333 7.07905 10.748 7.62252 10.748C8.36727 10.748 8.89731 10.2515 8.89731 9.53355C8.91073 8.93641 8.66248 8.66803 7.84393 8.3661Z"
            fill="#231F20"
          />
          <path
            d="M9.13222 8.80222C9.13222 9.88916 9.98432 10.7278 11.078 10.7278C11.3866 10.7278 11.655 10.6675 11.977 10.5131V9.66774C11.6885 9.95625 11.4336 10.0703 11.1115 10.0703C10.3869 10.0703 9.87026 9.54697 9.87026 8.79551C9.87026 8.08431 10.4003 7.52742 11.078 7.52742C11.4201 7.52742 11.6818 7.64819 11.977 7.94341V7.09802C11.6617 6.93699 11.4 6.8699 11.0914 6.8699C10.0112 6.8699 9.13222 7.72871 9.13222 8.80222Z"
            fill="#231F20"
          />
          <path
            d="M17.6934 9.43291L16.7071 6.95041H15.9221L17.4854 10.7345H17.8746L19.4647 6.95041H18.6864L17.6934 9.43291Z"
            fill="#231F20"
          />
          <path
            d="M19.7935 10.6406H21.8332V10.0166H20.5114V9.02363H21.7862V8.39965H20.5114V7.5811H21.8332V6.95041H19.7935V10.6406Z"
            fill="#231F20"
          />
          <path
            d="M24.6847 8.04404C24.6847 7.35296 24.2083 6.9571 23.3763 6.9571H22.3095V10.6473H23.0275V9.16452H23.1214L24.1144 10.6473H25L23.8393 9.09071C24.3828 8.97665 24.6847 8.60763 24.6847 8.04404ZM23.2354 8.6546H23.0275V7.53412H23.2489C23.6984 7.53412 23.9399 7.72198 23.9399 8.08429C23.9399 8.45332 23.6984 8.6546 23.2354 8.6546Z"
            fill="#231F20"
          />
          <path
            d="M14.1843 10.7748C15.27 10.7748 16.1501 9.89464 16.1501 8.80892C16.1501 7.7232 15.27 6.84305 14.1843 6.84305C13.0986 6.84305 12.2184 7.7232 12.2184 8.80892C12.2184 9.89464 13.0986 10.7748 14.1843 10.7748Z"
            fill="#F48120"
          />
        </svg>
      );
    default:
      return (
        <svg
          width="27"
          height="18"
          viewBox="0 0 27 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="27" height="18" rx="2" fill="white" />
          <rect
            x="0.5"
            y="0.5"
            width="26"
            height="17"
            rx="1.5"
            stroke="black"
            strokeOpacity="0.2"
          />
          <path
            d="M16.6781 5.48601C15.187 5.48601 13.8545 6.25887 13.8545 7.68678C13.8545 9.32432 16.2177 9.43743 16.2177 10.2601C16.2177 10.6065 15.8208 10.9165 15.1428 10.9165C14.1806 10.9165 13.4614 10.4833 13.4614 10.4833L13.1537 11.9242C13.1537 11.9242 13.9822 12.2902 15.0821 12.2902C16.7123 12.2902 17.9951 11.4794 17.9951 10.027C17.9951 8.29668 15.622 8.18694 15.622 7.42337C15.622 7.15203 15.9479 6.85472 16.6239 6.85472C17.3867 6.85472 18.009 7.16982 18.009 7.16982L18.3102 5.77813C18.3102 5.77813 17.633 5.48601 16.6781 5.48601ZM3.03611 5.59104L3 5.80111C3 5.80111 3.6273 5.91592 4.19229 6.14493C4.91975 6.40754 4.97158 6.56042 5.09409 7.03525L6.42916 12.1819H8.21882L10.9759 5.59104H9.19037L7.41876 10.0722L6.69584 6.27376C6.62954 5.83903 6.29372 5.59104 5.88266 5.59104H3.03611ZM11.6939 5.59104L10.2932 12.1819H11.9959L13.3917 5.59104H11.6939ZM21.1904 5.59104C20.7798 5.59104 20.5623 5.81086 20.4026 6.19498L17.9081 12.1819H19.6937L20.0391 11.184H22.2144L22.4245 12.1819H24L22.6255 5.59104H21.1904ZM21.4226 7.37168L21.9519 9.84487H20.5339L21.4226 7.37168Z"
            fill="#1434CB"
          />
        </svg>
      );
  }
};

export default Page;
