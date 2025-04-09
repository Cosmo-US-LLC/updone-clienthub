"use client";
import { useRouter } from "next/navigation";
import React from "react";

function layout({ children }: any) {
  const router = useRouter();

  return (
    <>
      <div className="grow max-h-full overflow-y-auto">{children}</div>
    </>
  );
}

export default layout;
