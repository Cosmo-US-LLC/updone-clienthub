import SignUpForm from "./signUpForm";
import Image from "next/image";

function page() {
  return (
    <>
      <SignUpForm />
    </>
    // <div className="relative min-h-screen">
    //    <div className="max-lg:hidden absolute inset-0">
    //           <Image
    //             src="/images/Login.png"
    //             alt="Background"
    //             layout="fill"
    //             objectFit="cover"
    //             objectPosition="center"
    //             priority
    //           />
    //         </div>
    //     <SignUpForm />
    // </div>
  );
}

export default page;
