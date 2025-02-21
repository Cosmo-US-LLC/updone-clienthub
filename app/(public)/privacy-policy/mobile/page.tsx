"use client";
import React from "react";
import Footer from "@/app/_components/ui/footer/page";
import { montserrat } from "@/app/lib/Fonts";
import Image from "next/image";

const MobilePrivacyPolicy = () => {
  return (
    <div className="bg- relative w-full ">
      <Image
        src="/images/top-background.svg"
        alt="top-background"
        layout="fill"
        className="absolute z-[1] top-0 left-0 h-full w-full object-cover"
      />

      <div className="relative z-10">
        <h1
          className={`text-[32px] ${montserrat.className} font-[900] text-[#0B0B0B]  pt-11 pb-4 px-6 flex mt-14 text-center leading-[38px]`}
        >
          Privacy <span className="text-[#350ABC] ml-2">Policy</span>
        </h1>
      </div>

      <div className="  pt-4 pb-4 px-6 relative z-10">
        <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
          Updone, Inc. respects your privacy. This Privacy Policy (“Policy”)
          describes our privacy principles in addition to our practices for
          gathering, storing, and using your personal information through our
          website, www.updone.com (the “Site”) and our web/mobile application
          (App) (collectively the “Services”). We encourage you to review this
          information so that you may understand and consent to how we may
          collect, use, and share your personal information. If you do not
          provide sufficient personal information, we may be unable to properly
          assist you with Updone’s Services. By visiting the Site or using the
          App, you agree that your personal information will be handled as
          described in this Policy. Your use of our Site and App, and any
          dispute over privacy, is subject to this Policy and our Terms of Use,
          including its applicable limitations on damages and the resolution of
          disputes. The Updone Terms of Use are incorporated by reference into
          this Policy.
        </p>
        <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
          <span className="font-[600] text-[#000000]">Note:</span> The privacy
          practices set forth in this Privacy Policy are for Updone only, and we
          are not responsible for the privacy or the content of businesses that
          post event jobs or third-party websites. Our Site and App contain
          links to other websites, and if you, the user, elect to link to other
          websites, please review the privacy policies posted by the owners or
          administrators of those websites.
        </p>
        <h2
          className={` ${montserrat.className} text-[24px] leading-normal font-[600] text-[#000000] !capitalize`}
        >
          Information Collection
        </h2>
        <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
          Users voluntarily provide information, which Updone uses to further
          its mission and provide the best possible services to its users. Some
          of the information collected may be personally identifiable, including
          names, addresses, phone numbers, email addresses, and other personal
          information. Should you have any concerns related to providing
          information to us or having such information presented on the
          Services, please do not become a user of the Services or, if
          applicable, close any existing accounts. Please note that should you
          choose not to provide us with certain identifying information, you may
          be unable to use certain features of the Services.
        </p>
        <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
          <span className="font-[600] text-[#000000]">
            Users as Freelancers:
          </span>{" "}
          In order for Updone to achieve its mission of connecting freelancers
          with businesses, we must collect certain personal information from and
          about individuals. The types of personal information collected,
          processed, and stored by Updone may include:
        </p>
        <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px] relative left-5">
          <ul style={{ listStyleType: "circle" }}>
            <li>
              Legal Name, Birth Name, Married Name, Aliases, Talent or Business
              Name
            </li>
            <li>Contact information (address, phone number, email address)</li>
            <li>
              User ID and password or PIN if you register through Updone’s sites
            </li>
            <li>Date of birth</li>
            <li>Driver’s license number and contents</li>
            <li>Education and employment history</li>
            <li>Work-related skills and experience</li>
            <li>Professional credentials or licenses</li>
            <li>Membership in professional organizations</li>
            <li>
              Any other information contained on an individual’s Resume or
              Employment History Work Records Profile
            </li>
            <li>
              U.S. Citizenship and work authorization status as required by
              Federal Form I-9 &amp; E-Verify
            </li>
            <li>Disability and health-related information</li>
            <li>Next of kin or emergency contact information</li>
            <li>
              With your consent, information from and related to publicly
              published profiles you’ve created on job-related social media
              platforms and job boards (such as Facebook, LinkedIn,
              CareerBuilder, Yelp, or Indeed)
            </li>
            <li>Information provided by references and referral partners</li>
            <li>
              Information regarding your career interests, preferences, and
              qualifications
            </li>
          </ul>
        </p>
        <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
          Additionally, under certain circumstances and consistent with
          prevailing laws, Updone may request types of personal information that
          are viewed by some countries as “sensitive:”
        </p>
        <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px] relative left-5">
          <ul style={{ listStyleType: "circle" }}>
            <li>
              National or Tax Identification Number/Social Security Number
            </li>
            <li>Financial or bank account information</li>
            <li>
              Results of drug testing, criminal record history, identification
              verification, and/or education or employment verifications; and
              other background screenings
            </li>
            <li>
              Ideological views or activities or membership in trade unions
            </li>
            <li>
              Information contained within your account with Updone, such as
              shift reviews, disciplinary actions, and other payment-related
              information.
            </li>
          </ul>
        </p>
        <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
          In some jurisdictions, in order to comply with statutes, rules, and
          regulations pertaining to equal employment opportunities or to assist
          in compiling data for equal opportunities practices and reporting, we
          may also ask you to provide gender, race/ethnicity, disability, or
          veteran information. The provision of this type of information will be
          voluntary unless required by law, and failure to provide this
          information will not hinder your employment or project opportunities.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default MobilePrivacyPolicy;
