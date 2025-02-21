"use client";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";
import { Loader } from "../../_components/ui/dashboard-loader";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { selectAuth, setAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Link from "next/link";
import Image from "next/image";

function AuthContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const user = searchParams.get("user");
  const error = searchParams.get("error");
  const { auth: storedData } = useAppSelector(selectAuth);

  useEffect(() => {
    if (token && user) {
      const isUpdoneDomain = window.location.hostname.includes("updone");

      Cookies.set("token", token || "", {
        expires: 30,
        path: "/",
        ...(isUpdoneDomain && { domain: ".updone.com" }),
      });

      Cookies.set("authData", JSON.stringify({ user: JSON.parse(decodeURI(user || "")), token }), {
        expires: 30,
        path: "/",
        ...(isUpdoneDomain && { domain: ".updone.com" }),
      });

      dispatch(setAuth({ user: JSON.parse(decodeURI(user || "")), token }));
    }
  }, []);

  useEffect(() => {
    if (token == storedData?.token && user) {
      const isUpdoneDomain = window.location.hostname.includes("updone");
      // Callback check
      const callback = Cookies.get('callbackUrl')
      if (callback) {
        // Cookies.remove('callbackUrl')
        Cookies.remove("callbackUrl", {
          path: "/",
          ...(isUpdoneDomain && { domain: ".updone.com" }),
        });
        redirect(callback);
      }

      if (storedData?.user?.role_id == 3) {
        redirect(`${process.env.NEXT_PUBLIC_TALENTPRO_URL}/talent/events`); // Redirect to talent homepage
        return;
      }
      if (storedData?.user?.role_id == 4 && window.innerWidth >= 1024) {
        redirect(`${process.env.NEXT_PUBLIC_CLIENTHUB_URL}/events`); // Redirect to client homepage
        return;
      }
      redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`); 
      // redirect("/events");
    }
  }, [storedData]);

  return (
    <div className="text-center h-fit">
      {!error ? (
        <>
          <p>
            <LoaderCircle className="text-[#350ABC] w-12 h-12 animate-spin mx-auto" />
          </p>
          <h2 className="text-[19px] font-[600] leading-[30px] my-[26px]">
            You have been logged in successfully!
          </h2>
          <p className="text-[#350ABC] text-[14px] leading-[24px]">Redirecting......</p>
        </>
      ) : (
        <>
          <p className="flex justify-center">
            <Image src={"/icons/login-warn.svg"} alt="Warning" width={58} height={58} />
          </p>
          <h2 className="text-[19px] font-[600] leading-[30px] my-[26px]">
            Oops! Something went wrong!
          </h2>
          <p className="text-[#350ABC] text-[14px] leading-[24px]">
            <Link href={"/signin"} className="flex items-center justify-center gap-3">
              <ChevronLeft className="w-4 h-4" /> Go Back to Login
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthContent />
    </Suspense>
  );
}

export default Page;
