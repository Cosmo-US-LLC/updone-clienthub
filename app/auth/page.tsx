"use server";
import { useSearchParams } from "next/navigation";

function page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <div>{token?.split(".")[0]}</div>;
}

export default page;