// "use client"
// import React, { useState } from 'react';
// import Header from '../_components/ui/header';
// import ContactStyle from '../_components/contact/ContactStyle';
// import './index.css';
// import { contactInputStyles } from '../lib/styles';
// import { CiMail } from "react-icons/ci";
// import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
// import Image from 'next/image';
// import { montserrat } from '../lib/Fonts';
// import Footer from '../_components/ui/footer';
// import { apiRequest } from '@/app/lib/services';

// // Define the types for form data and errors
// type FormData = {
//     fullName: string;
//     email: string;
//     phone: string;
//     help: string;
// };

// type FormErrors = {
//     fullName?: string;
//     email?: string;
//     phone?: string;
//     help?: string;
// };

// const Page = () => {
//     const [formData, setFormData] = useState<FormData>({
//         fullName: '',
//         email: '',
//         phone: '',
//         help: ''
//     });

//     const [formErrors, setFormErrors] = useState<FormErrors>({});
//     const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');

//     // Validate the form fields
//     const validateForm = () => {
//         const errors: FormErrors = {}; // Define the structure of errors
//         if (!formData.fullName) errors.fullName = "Full Name is required";
//         if (!formData.email) errors.email = "Email Address is required";
//         if (!formData.phone) errors.phone = "Phone Number is required";
//         if (!formData.help) errors.help = "Please specify what help you need";

//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         const errors: FormErrors = { ...formErrors }; // Copy existing errors

//         setFormData({ ...formData, [name]: value });

//         // Real-time validation
//         switch (name) {
//             case 'fullName':
//                 if (value === '') {
//                     errors.fullName = "Full Name is required";
//                 } else if (value.length > 40) {
//                     errors.fullName = "Full Name should not exceed 40 characters";
//                 } else {
//                     errors.fullName = '';
//                 }
//                 break;

//             case 'email':
//                 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 if (value === '') {
//                     errors.email = "Email Address is required";
//                 } else if (!emailPattern.test(value)) {
//                     errors.email = "Please enter a valid email address";
//                 } else if (value.length > 40) {
//                     errors.email = "Email should not exceed 40 characters";
//                 } else {
//                     errors.email = '';
//                 }
//                 break;

//             case 'phone':
//                 const phonePattern = /^[0-9]+$/;
//                 if (value === '') {
//                     errors.phone = "Phone Number is required";
//                 } else if (!phonePattern.test(value)) {
//                     errors.phone = "Phone Number should only contain numbers";
//                 } else {
//                     errors.phone = '';
//                 }
//                 break;

//             case 'help':
//                 if (value === '') {
//                     errors.help = "Please specify what help you need";
//                 } else if (value.length < 20) {
//                     errors.help = "Message should be at least 20 characters long";
//                 } else if (value.length > 200) {
//                     errors.help = "Message should not exceed 200 characters";
//                 } else {
//                     errors.help = '';
//                 }
//                 break;

//             default:
//                 break;
//         }

//         setFormErrors(errors);

//         // Check if all fields are valid to enable the button
//         const isFormValid = Object.values(errors).every(error => error === '') && Object.values(formData).every(field => field !== '');
//         setIsButtonDisabled(!isFormValid);
//     };

//     const contactUsApi = async () => {
//         if (!validateForm()) return;

//         try {
//             setIsSubmitting(true); // Disable button during API call
//             setIsButtonDisabled(true);
//             setSuccessMessage(''); // Reset success message

//             const payload = {
//                 fullName: formData.fullName,
//                 email: formData.email,
//                 phone: formData.phone,
//                 message: formData.help
//             };

//             const response = await apiRequest('/contactUs', {
//                 method: 'POST',
//                 body: payload,
//             });

//             setSuccessMessage('Thank you for contacting us! We will look into your request and get back to you shortly.');
//             setFormData({
//                 fullName: '',
//                 email: '',
//                 phone: '',
//                 help: ''
//             });
//             setIsSubmitting(false);
//             setIsButtonDisabled(false);
//         } catch (err) {
//             console.error('Error submitting the contact form', err);
//         } finally {
//             setIsSubmitting(false); // Re-enable button after API call
//         }
//     };

//     return (
//         <>
//             <div style={{ position: 'relative' }} className='min-h-[125vh] 2xl:min-h-[120vh]'>
//                 <div>
//                     <Header />
//                 </div>
//                 <div className='absolute z-40 w-full h-full flex justify-center items-center bottom-[150px]'>
//                     <div className='max-w-[1278px] pb-[28px] pt-[28px] px-[16px] top-56 mx-auto relative contact_us'>
//                         <div className={`${montserrat.className} w-[300%] absolute font-[900] top-[-280px] 2xl:top-[-302px] left-[-448px]  flex flex-col text-[#0B0B0B] justify-center items-center uppercase text-center 2xl:text-[110px] xl:text-[110px] lg:text-[100px] leading-[100px]`}>
//                             <h2 className='text-[#f5f5f5] text-[160px] relative z-[-1] top-[115px] w-full'>CONTACT<span className='ml-[10px]'>US</span></h2>
//                             <h1 className='relative bottom-[-50px] !text-[60px] normal-case'>Lets Have A <span className='text-[#350ABC] relative lg:leading-[70px] '>Chat</span></h1>
//                         </div>
//                         <div className='w-[auto]'>
//                             <div className="relative w-full">
//                                 {/* Left Icon positioned in the center of the left side */}
//                                 <span className="absolute left-0 top-1/2 z-[-1] transform -translate-y-1/2 text-gray-500">
//                                     <Image className='relative right-[198px] bottom-[102px]' alt='cloud' height={73} width={158} src='/images/contact/cloud.svg' />
//                                     <Image alt='smallCloud' className='relative right-[331px] bottom-[115px]' width={103} height={39} src='/images/contact/smallCloud.svg' />
//                                     <Image alt='smallCloud' className='relative right-[188px] bottom-[133px]' width={188} height={232} src='/images/contact/leftPlane.svg' />
//                                 </span>

//                                 {/* Form Fields */}
//                                 <form action="" className="space-y-[12px] relative">
//                                     {/* Full Name */}
//                                     <div className="relative w-full">
//                                         {/* Icon positioned inside the input */}
//                                         <span className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-500">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14" fill="none">
//                                                 <path d="M11.6668 12.25V11.0833C11.6668 10.4645 11.421 9.871 10.9834 9.43342C10.5458 8.99583 9.95233 8.75 9.3335 8.75H4.66683C4.04799 8.75 3.4545 8.99583 3.01691 9.43342C2.57933 9.871 2.3335 10.4645 2.3335 11.0833V12.25" stroke="#9F9F9F" stroke-width="0.7" strokeLinecap="round" strokeLinejoin="round" />
//                                                 <path d="M6.99984 6.41667C8.2885 6.41667 9.33317 5.372 9.33317 4.08333C9.33317 2.79467 8.2885 1.75 6.99984 1.75C5.71117 1.75 4.6665 2.79467 4.6665 4.08333C4.6665 5.372 5.71117 6.41667 6.99984 6.41667Z" stroke="#9F9F9F" stroke-width="0.7" strokeLinecap="round" strokeLinejoin="round" />
//                                             </svg>
//                                         </span>
//                                         <input
//                                             name="fullName"
//                                             placeholder="Full Name*"
//                                             value={formData.fullName}
//                                             onChange={handleChange}
//                                             className={`event_location bg-[#fff] defaultsearch !relative !border-[1px] !h-[50px] text-[#000000] border-[#EFEFEF] py-[14px] pl-[30px] pr-[10px] min-h-[52px] !w-full rounded-[4px] input mb12 focus:outline-blue-200 ${formErrors.fullName ? 'border-red-500' : ''}`}
//                                             style={contactInputStyles}
//                                         />
//                                         {formErrors.fullName && <span className="text-red-500 text-sm">{formErrors.fullName}</span>}
//                                     </div>

//                                     {/* Email */}
//                                     <div className="relative w-full">
//                                         <span className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-500">
//                                             <CiMail className='relative top-[2px]' />
//                                         </span>
//                                         <input
//                                             name="email"
//                                             placeholder="Email Address*"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             className={`bg-[#fff] focus:outline-blue-200 defaultsearch !relative !border-[1px] !h-[50px] text-[#000000] border-[#EFEFEF] py-[14px] pl-[40px] pr-[10px] min-h-[52px] !w-full rounded-[4px] input mb12 ${formErrors.email ? 'border-red-500' : ''}`}
//                                             style={contactInputStyles}
//                                         />
//                                         {formErrors.email && <span className="text-red-500 text-sm">{formErrors.email}</span>}
//                                     </div>

//                                     {/* Phone */}
//                                     <div className="relative w-full">
//                                         {/* Icon positioned inside the input */}
//                                         <span className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-500">
//                                             <Image alt='smallCloud' width={24} height={14} src='/images/contact/usaFlag.svg' />
//                                         </span>
//                                         <input
//                                             name="phone"
//                                             placeholder="+1 (123) 456-7890"
//                                             value={formData.phone}
//                                             onChange={handleChange}
//                                             className={`event_location bg-[#fff] defaultsearch !relative !border-[1px] !h-[50px] text-[#000000] border-[#EFEFEF] py-[14px] pl-[40px] pr-[10px] min-h-[52px] !w-full rounded-[4px] input mb12 ${formErrors.phone ? 'border-red-500' : ''}`}
//                                             style={contactInputStyles}
//                                         />
//                                         {formErrors.phone && <span className="text-red-500 text-sm">{formErrors.phone}</span>}
//                                     </div>

//                                     {/* Help Field */}
//                                     <div className="relative w-full">
//                                         <span className="absolute left-3 top-[20.8%] z-10 transform -translate-y-1/2 text-gray-500">
//                                             <HiOutlineBuildingOffice2 size={16} />
//                                         </span>
//                                         <input
//                                             name="help"
//                                             placeholder="What can we help you with*"
//                                             value={formData.help}
//                                             onChange={handleChange}
//                                             className={`bg-[#fff] defaultsearch !pb-24 !pt-[24px] !relative !border-[1px] !h-[50px] text-[#000000] focus:outline-blue-200 border-[#EFEFEF] py-[14px] pl-[40px] pr-[10px] min-h-[52px] !w-full rounded-[4px] input mb12 ${formErrors.help ? 'border-red-500' : ''}`}
//                                             style={contactInputStyles}
//                                         />
//                                         {formErrors.help && <span className="text-red-500 text-sm">{formErrors.help}</span>}
//                                     </div>
//                                     <div className='!mt-[30px]'>
//                                         <button
//                                             type="button"
//                                             onClick={contactUsApi}
//                                             disabled={isButtonDisabled || isSubmitting}
//                                             className={`flex justify-center mr-0 !mt-[0px] rounded-[4px] w-[100%] py-2 text-[16px] font-[400] leading-[26px] tracking-[-2%] items-center m-auto gap-[12px] px-[20px] h-[48px]
//                                                 ${isButtonDisabled || isSubmitting ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-[#350ABC] text-white'}`}
//                                         >
//                                             {isSubmitting ? 'Submitting...' : 'Confirm Details'}
//                                         </button>
//                                     </div>
//                                     {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
//                                 </form>

//                                 {/* Right Icon positioned in the center of the right side */}
//                                 <span className="absolute right-0 top-1/2 transform -translate-y-1/2 z-[-1] text-gray-500">
//                                     <Image
//                                         className='relative bottom-[52px] left-[387px]'
//                                         width={423}
//                                         height={328}
//                                         src='/images/contact/rightPlane.svg'
//                                         alt='rightPlane' />
//                                 </span>
//                             </div>

//                         </div>

//                     </div>
//                     <ContactStyle />

//                 </div>
//                 <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
//                     <img src="/images/Ellipse 2576 (1).jpg" className='w-full' alt="" />
//                 </div>
//             </div>
//             <Footer isContactUs />
//         </>
//     );
// };

// export default Page;

"use client";

import React from "react";
import DesktopContact from "./DesktopContact";
import MobileContact from "./MobileContact";
// import MobileLayout from "../_components/ui/mobileLayout/MobileLayout";

const ContactUsPage = () => {
  return (
    <>
      <div className="lg:hidden">
        <MobileContact />
        {/* <MobileLayout>
          <MobileContact />{" "}
        </MobileLayout> */}
      </div>
      <div className="max-lg:hidden">
        <DesktopContact />
      </div>
    </>
  );
};

export default ContactUsPage;
