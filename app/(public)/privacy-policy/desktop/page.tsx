"use client";
import React from "react";
import Header from "@/app/_components/ui/header";
import Footer from "@/app/_components/ui/footer";
import { montserrat } from "@/app/lib/Fonts";

const DesktopPrivacyPolicy = () => {
  return (
    <div>
      {/* <Header /> */}
      <h1
        style={{
          background:
            "radial-gradient(circle, rgba(238,247,255,1) 0%, rgba(250,254,237,1) 0%, rgba(243,235,255,1) 100%)",
        }}
        className={`text-[90px] ${montserrat.className} leading-[100px] font-[900] text-[#0B0B0B] h-[300px] flex justify-center items-center mt-16 `}
      >
        Privacy{" "}
        <span className="text-[90px] ${montserrat.className} leading-[100px] font-[900] text-[#350ABC] ml-4">
          Policy
        </span>
      </h1>
      <div className="max-w-[1260px] px-4 pb-52 mx-auto mt-[60px] space-y-[20px]">
        <p className="text-[#6B6B6B] text-[18px] font-[400] leading-[38px]">
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
        <p className="text-[#6B6B6B] text-[18px] font-[400] leading-[38px]">
          <span className="font-[600] text-[#000000]">Note:</span> The privacy
          practices set forth in this Privacy Policy are for Updone only, and we
          are not responsible for the privacy or the content of businesses that
          post event jobs or third-party websites. Our Site and App contain
          links to other websites, and if you, the user, elect to link to other
          websites, please review the privacy policies posted by the owners or
          administrators of those websites.
        </p>
        <h2
          className={` ${montserrat.className} text-[44px] leading-normal font-[600] text-[#000000] !capitalize`}
        >
          Information Collection
        </h2>
        <p className="text-[#6B6B6B] text-[18px] font-[400] leading-[38px]">
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
        <p className="text-[#6B6B6B] text-[18px] font-[400] leading-[38px]">
          <span className="font-[600] text-[#000000]">
            Users as Freelancers:
          </span>{" "}
          In order for Updone to achieve its mission of connecting freelancers
          with businesses, we must collect certain personal information from and
          about individuals. The types of personal information collected,
          processed, and stored by Updone may include:
        </p>
        <p className="text-[#6B6B6B] text-[18px] font-[400] leading-[38px] relative left-5">
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
        <p className="text-[#6B6B6B] text-[18px] font-[400] leading-[38px]">
          Additionally, under certain circumstances and consistent with
          prevailing laws, Updone may request types of personal information that
          are viewed by some countries as “sensitive:”
        </p>
        <p className="text-[#6B6B6B] text-[18px] font-[400] leading-[38px] relative left-5">
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
        <p className="text-[#6B6B6B] text-[18px] font-[400] leading-[38px]">
          In some jurisdictions, in order to comply with statutes, rules, and
          regulations pertaining to equal employment opportunities or to assist
          in compiling data for equal opportunities practices and reporting, we
          may also ask you to provide gender, race/ethnicity, disability, or
          veteran information. The provision of this type of information will be
          voluntary unless required by law, and failure to provide this
          information will not hinder your employment or project opportunities.
        </p>
      </div>
      {/* <Footer isPrivacyPolicy /> */}
    </div>
  );
};

export default DesktopPrivacyPolicy;
