"use client";

import React from "react";
import Footer from "@/app/_components/ui/footer/page";
import { montserrat } from "@/app/lib/Fonts";

const MobileTerms = () => {
  return (
    <div className="bg-">
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(238,247,255,1) 0%, rgba(250,254,237,1) 0%, rgba(243,235,255,1) 100%)",
        }}
      >
        <h1
          className={`text-[32px] ${montserrat.className} font-[900] text-[#0B0B0B] pt-10 pb-4 px-6 flex  mt-14 leading-[32px]`}
        >
          Terms & <span className="text-[#350ABC] ml-0.5">conditions</span>
        </h1>
        <div className="pt-4 pb-4 px-6">
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            Welcome to Updone! These Terms and Conditions ("Agreement") govern
            your use of our platform located at www.updone.com (the "Site") and
            our services (collectively, the "Services"). By accessing or using
            our Services, you agree to comply with and be bound by these terms.
            If you do not agree to these Terms, you must not use the Services.
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] leading-normal font-[600] text-[#000000] capitalize mt-4`}
          >
            Scope of Updone Services
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Platform Use:{" "}
                </span>
                Updone operates an online platform that allows users ("Hosts")
                to connect with service providers ("Talent") who provide event
                staffing services.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Service Agreement:{" "}
                </span>
                When a Host posts a staffing request, and a Talent responds, a
                contract ("Staffing Agreement") is created between the Host and
                the Talent. Updone acts as a facilitator but is not a party to
                these agreements.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Modifications:{" "}
                </span>
                Hosts can modify or cancel staffing requests before an offer is
                accepted. If an offer is accepted, the Staffing Agreement is
                binding unless otherwise modified or canceled under the
                agreed-upon terms.
              </li>
            </ol>
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] mt-4 mb-2 leading-normal font-[600] text-[#000000] capitalize`}
          >
            User Eligibility and Responsibilities
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Age Requirement:{" "}
                </span>
                You must be at least 18 years of age to use our Services.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Account Responsibility:{" "}
                </span>
                You are responsible for maintaining the confidentiality of your
                account information and for all activities that occur under your
                account. You agree not to share your account with others.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Compliance with Laws:{" "}
                </span>
                Users must comply with all applicable laws and regulations,
                including employment laws, when using the Services.
              </li>
            </ol>
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] mt-4 mb-4 leading-normal font-[600] text-[#000000] capitalize`}
          >
            Fees and Payments
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Service Fees:{" "}
                </span>
                Updone charges a service fee for connecting Hosts with Talent.
                Hosts are required to pay the agreed-upon rate for the Talent’s
                services, along with any applicable service fees, upon
                agreement.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Payment Terms:{" "}
                </span>
                Payments are processed through our third-party payment provider.
                By using our Services, you agree to their terms and conditions.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Refunds:{" "}
                </span>
                Refunds are available only under certain conditions, such as
                cancellations before services are rendered or if Updone
                determines the Talent did not meet agreed service levels.
              </li>
            </ol>
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] mt-4 mb-4 leading-normal font-[600] text-[#000000] capitalize`}
          >
            Cancellations and Modifications
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Host Cancellations:{" "}
                </span>
                Hosts can cancel requests before a Talent has accepted the job.
                If a Host cancels after the Talent accepts, cancellation fees
                may apply.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Talent Cancellations:{" "}
                </span>
                Talent may cancel an accepted staffing job only in emergencies,
                and failure to show up for the job without notice can result in
                penalties or removal from the platform.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Dispute Resolution:{" "}
                </span>
                Updone encourages users to resolve disputes directly. In cases
                where disputes cannot be resolved, Updone may intervene and make
                a final decision based on available evidence.
              </li>
            </ol>
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] mt-4 mb-4 leading-normal font-[600] text-[#000000] capitalize`}
          >
            Use of Personal Information
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Privacy:{" "}
                </span>
                The use of our Services is subject to our Privacy Policy, which
                describes how we collect, use, and share personal information.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Data Sharing:{" "}
                </span>
                Updone may share user information with other users as necessary
                to facilitate staffing arrangements.
              </li>
            </ol>
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] mt-4 mb-4 leading-normal font-[600] text-[#000000] capitalize`}
          >
            User Conduct
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Prohibited Uses:{" "}
                </span>
                You may not use our platform for illegal, harmful, or fraudulent
                activities. This includes providing false information, violating
                third-party rights, or engaging in harassment or discrimination.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Content License:{" "}
                </span>
                By posting information on the platform (e.g., reviews, job
                requests), you grant Updone a non-exclusive, worldwide,
                royalty-free license to use, display, and distribute this
                content for the purposes of operating the Services.
              </li>
            </ol>
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] mt-4 mb-4 leading-normal font-[600] text-[#000000] capitalize`}
          >
            Limitation of Liability
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  No Guarantees:{" "}
                </span>
                Updone does not guarantee the performance of Talent or the
                suitability of job postings. All transactions are between Hosts
                and Talent, and Updone disclaims liability for any direct or
                indirect damages resulting from interactions on the platform.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Maximum Liability:{" "}
                </span>
                Updone’s liability to you for any damages arising from your use
                of the Services is limited to the total fees paid by you to
                Updone in the six months preceding the event giving rise to
                liability.
              </li>
            </ol>
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] mt-4 mb-4 leading-normal font-[600] text-[#000000] capitalize`}
          >
            Termination
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Termination by User:{" "}
                </span>
                You may terminate your account at any time by contacting
                customer support.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Termination by Updone:{" "}
                </span>
                Updone reserves the right to suspend or terminate accounts that
                violate these terms or engage in behavior detrimental to the
                platform or other users.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Effect of Termination:{" "}
                </span>
                Termination of an account does not relieve the user from
                fulfilling any outstanding obligations under a Staffing
                Agreement made prior to termination.
              </li>
            </ol>
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] mt-4 mb-4 leading-normal font-[600] text-[#000000] capitalize`}
          >
            Dispute Resolution
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Governing Law:{" "}
                </span>
                This Agreement is governed by the laws of California, USA.
              </li>
              <li>
                <span style={{ fontWeight: 600, color: "#000000" }}>
                  Mediation:{" "}
                </span>
                In the event of a dispute between users that cannot be resolved,
                Updone may provide assistance or refer the matter to an
                independent mediator.
              </li>
            </ol>
          </p>
          <h2
            className={` ${montserrat.className} text-[22px] mt-4 mb-4 leading-normal font-[600] text-[#000000] capitalize`}
          >
            Dispute Resolution
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[32px]">
            Updone reserves the right to modify these terms at any time. Any
            changes will be posted on this page, and your continued use of the
            Services following changes will constitute acceptance of the updated
            terms.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MobileTerms;
