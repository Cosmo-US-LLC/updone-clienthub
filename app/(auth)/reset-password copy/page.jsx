 
import ResetPasswordForm from "./ResetPasswordForm"; 
import Image from "next/image";

function page() {
  return (
    <div className="relative min-h-screen">
       <div className="absolute inset-0">
              <Image
                src="/images/Login.png"
                alt="Background"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
              />
            </div>
        <ResetPasswordForm />
    </div>
  )
}

export default page