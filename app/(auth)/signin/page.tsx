import SignInForm from "./signInForm";
import Image from "next/image";

function page() {
  return (
    <>
     <SignInForm />
    </>
    // <div className="relative min-h-[100dvh]">
    //   <div className="max-lg:hidden absolute inset-0">
    //     <Image
    //       src="/images/Login.png"
    //       alt="Background"
    //       layout="fill"
    //       objectFit="cover"
    //       objectPosition="center"
    //       priority
    //     />
    //   </div>
    //   <SignInForm />
    // </div>
  );
}

export default page;
