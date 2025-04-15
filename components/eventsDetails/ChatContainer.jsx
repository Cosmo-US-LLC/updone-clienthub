"use client"
import React from "react";
import { apiRequest } from "@/app/lib/services";
import { useError } from "@/app/lib/context/ErrorProvider";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "@/app/loading";

function ChatContainer({ job, offerId }) {
  const { auth: storedData } = useAppSelector(selectAuth);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [isChatBodyVisible, setIsChatBodyVisible] = useState(true);
  const [chatLoading, setChatLoading] = useState(true);
  const { handleError } = useError();
  const [feildError, setFeildError] = useState(false);
  // const offerId = selectedOffer?.id;

  useEffect(() => {
    if (offerId) {
      setIsChatBodyVisible(true);
    }
  }, [offerId]);

  useEffect(() => {
    const getMessages = async () => {
      setChatLoading(true);
      const newData = await apiRequest(
        "/chat/getAll",
        {
          method: "POST",
          body: {
            offer_id: offerId,
          },
          headers: {
            ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
          },
        },
        handleError
      );
      if (newData?.messages) {
        setMessages(newData.messages.reverse());
        // setChatStatus(newData?.chat_status);
        // setJobId(newData?.job_id);
        // setIsAssignedToMe(newData?.assigned_to_me);
      }
      setChatLoading(false);
      //   setMessagesRefreshed(!messagesRefreshed);
    };
    if (offerId) {
      console.log(offerId);
      getMessages();
    } else {
      console.log("Failure ", offerId);
    }
  }, [offerId, storedData, handleError]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessage = async () => {
    if (messageBody === "") {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender_user_id: storedData.user.id,
      receiver_user_id: null,
      message_body: messageBody,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]); // Append to the end
    setMessageBody("");

    // Scroll after message is added
    scrollToBottom();

    await apiRequest(
      "/chat/sendMessage",
      {
        method: "POST",
        body: {
          offer_id: offerId,
          message_body: messageBody,
        },
        headers: {
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
      },
      handleError
    );
  };

  const formatMessageDate = (date) => {
    const messageDate = moment(date);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");

    if (messageDate.isSame(today, "day")) {
      return `Today, ${messageDate.format("h:mm A")}`;
    } else if (messageDate.isSame(yesterday, "day")) {
      return `Yesterday, ${messageDate.format("h:mm A")}`;
    } else {
      return messageDate.format("ddd h:mm A, MMM D, YYYY");
    }
  };

  // Reverse the messages for grouping if needed
  const reversedMessages = [...messages];

  // Group messages by date
  const groupedMessages = reversedMessages.reduce((acc, msg) => {
    const date = formatMessageDate(msg.created_at);
    acc[date] = acc[date] || [];
    acc[date].push(msg);
    return acc;
  }, {});

  function timeAgo(dateTimeString) {
    const inputDate = new Date(dateTimeString);
    const now = new Date();
    const diffMs = now - inputDate;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (days < 14) {
      return `1 week ago`;
    } else {
      const weeks = Math.floor(days / 7);
      return `${weeks} weeks ago`;
    }
  }

  if (chatLoading) {
    return (<Loading />);
  }

  return (
    <div className="h-full relative">
      <div
        className={`relative flex-1 overflow-y-auto overflow-visible max-h-[calc(100vh-140px)] time-scroll py-2`}
      >
        {chatLoading ? (
          <Loading />
        ) : (
          Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date}>
              {/* Date Timestamp */}
              <p className="text-[#72777A] text-[12px] font-[500] leading-[16px] text-center mb-4">
                {date}
              </p>

              {/* Messages */}
              {msgs.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-2 ${
                    msg?.sender_user_id === storedData?.user?.id
                      ? "justify-end" // Sender's messages on the right
                      : "justify-start" // Receiver's messages on the left
                  }`}
                >
                  {msg?.sender_user_id === storedData?.user?.id ? (
                    // Sender's div
                    <div
                      className={`max-w-[90%] py-3 px-4 bg-[#774DFD] text-white rounded-t-[24px] rounded-bl-[24px]`}
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        position: "relative",
                      }}
                    >
                      <div className="flex flex-col">
                        <p className="text-[14px] font-[400] leading-[28px]">
                          {msg.message_body}
                        </p>
                      </div>
                      {/* Elliptical Tail for Sender */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: "-5px",
                          width: "20px",
                          height: "10px",
                          background: "#774DFD",
                          borderBottomLeftRadius: "15px",
                          transform: "rotate(180deg)",
                        }}
                      ></div>
                    </div>
                  ) : (
                    // Receiver's div
                    <div
                      className={`max-w-[90%] py-3 px-4 bg-[white] text-black border border-1 border-[#EBE6FF] rounded-br-[24px] rounded-t-[24px]`}
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: "-5px",
                          width: "20px",
                          height: "10px",
                          background: "white",
                          borderBottomRightRadius: "15px",
                          transform: "rotate(-180deg)",
                        }}
                      ></div>
                      <div className="flex flex-col">
                        <p className="text-[14px] font-[400] leading-[28px]">
                          {msg.message_body}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* <div className="flex justify-center items-center h-full w-full">
                {job?.status !== "assigned" && job?.status !== "completed" && (
                    <div
                    className={`absolute bottom-0 border border-[white] text-[white] bg-[#774DFD] h-[42px] w-[114px] flex items-center justify-center rounded-full cursor-pointer`}
                    onClick={() => {
                        if (job?.status !== "assigned") {
                        dispatch(setOffersId(selectedOffer?.worker?.id));
                        router.push(`/events/payment/${selectedOffer?.worker?.id}`);
                        }
                    }}
                    >
                    <p className=" text-[#F3F0FF] text-[14px] font-[400] leading-[20px]">
                        Hire me
                    </p>
                    </div>
                )}
            </div> */}
            </div>
          ))
        )}
        {/* Ref for Auto-Scroll */}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bg-white bottom-0 border-t left-0 px-4 pb-4 pt-2 w-full ">
        {/* Message Input */}
        {job?.status === "completed" ? (
          <div className="flex flex-row items-center justify-center gap-2 p-4 absolute bottom-0">
            <Image
              alt="Send"
              height={50}
              width={50}
              src="/images/mobile/talent/lock2.svg"
              className="mt-2"
            />
            <p className="text-[12px] font-[400] leading-[18px]">
              This job has been completed.
            </p>
          </div>
        ) : (
          <div className="grow flex items-center space-x-2">
            <input
              autoFocus
              type="text"
              value={messageBody}
              onChange={(e) => {
                if (e.target.value.length <= 1500) {
                  setMessageBody(e.target.value);
                  setFeildError(false);
                } else {
                  setFeildError(true);
                  setTimeout(() => {
                    setFeildError(false);
                  }, 2000);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className={`!h-[48px] w-full bg-[#FFEFD7] !text-[16px] flex-1 p-2 border border-gray-300 outline-none !rounded-xl transition-all duration-150 ${feildError ? "border-red-500 bg-red-100 shadow-md shadow-red-200" : ""}`}
              placeholder="Add your comment here..."
              max={1500}
            />
            <div onClick={sendMessage}>
              <Image
                alt="Send"
                height={30}
                width={30}
                src="/images/mobile/talent/sendMessageButton.svg"
                className="cursor-pointer text-black"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatContainer;
