import { apiRequest } from "@/app/lib/services";
import { useError } from "@/app/lib/context/ErrorProvider";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setOffersId } from "@/app/lib/store/features/bookingSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info, TriangleAlert } from "lucide-react";

type Message = {
  id: number;
  sender_user_id: number;
  receiver_user_id: number | null;
  message_body: string;
  created_at: string;
};

const ChatBox = ({
  job,
  selectedOffer,
  setMessagesRefreshed,
  messagesRefreshed,
  onChatVisibilityChange,
  onChatClose,
}: any) => {
  const { auth: storedData } = useAppSelector(selectAuth);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageBody, setMessageBody] = useState("");
  const [assignedToMe, setIsAssignedToMe] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [chatStatus, setChatStatus] = useState("job_assigned");
  const [isChatBodyVisible, setIsChatBodyVisible] = useState(true);
  const { handleError } = useError();
  const router = useRouter();
  const offerId = selectedOffer?.id;
  const dispatch = useDispatch();

  //   const toggleChatVisibility = () => {
  //     setIsChatBodyVisible((prev) => !prev); // Toggle visibility state
  //   };

  useEffect(() => {
    if (selectedOffer !== null) {
      setIsChatBodyVisible(true);
    }
  }, [selectedOffer]);

  const toggleChatVisibility = () => {
    const newVisibility = !isChatBodyVisible;
    setIsChatBodyVisible(newVisibility);
    onChatVisibilityChange?.(newVisibility); // Notify parent about visibility change
  };

  const handleCloseClick = () => {
    if (onChatClose) {
      onChatClose(); // Invoke the parent’s handler to hide the chatbox
    }
  };

  useEffect(() => {
    const getMessages = async () => {
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
        setChatStatus(newData?.chat_status);
        setJobId(newData?.job_id);
        setIsAssignedToMe(newData?.assigned_to_me);
      }
      setMessagesRefreshed(!messagesRefreshed);
    };
    getMessages();
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

    const newMessage: Message = {
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

  const formatMessageDate = (date: string) => {
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
  const groupedMessages = reversedMessages.reduce((acc: any, msg: any) => {
    const date = formatMessageDate(msg.created_at);
    acc[date] = acc[date] || [];
    acc[date].push(msg);
    return acc;
  }, {});

  function timeAgo(dateTimeString: string) {
    const inputDate: any = new Date(dateTimeString);
    const now: any = new Date();
    const diffMs = now - inputDate;
    
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Handle "Just now" for 0 seconds
    if (seconds < 60) {
      return 'Just now';
    }
    // Handle "1 minute ago" and more than 1 minute
    else if (minutes === 1) {
      return '1 minute ago';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    // Handle "1 hour ago" and more than 1 hour
    else if (hours === 1) {
      return '1 hour ago';
    } else if (hours < 24) {
      return `${hours} hours ago`;
    }
    // Handle days
    else if (days === 1) {
      return '1 day ago';
    } else if (days < 7) {
      return `${days} days ago`;
    }
    // Handle weeks
    else if (days === 7) {
      return '1 week ago';  // Exactly 1 week
    } else if (days === 14) {
      return '2 weeks ago';  // Exactly 2 weeks
    } else {
      return 'weeks ago'; // After 2 weeks, show just "weeks ago"
    }
  }
  
  
  return (
    <div
      className={`w-full ${
        isChatBodyVisible ? "h-full" : "h-[0px]"
      } bg-[#FDF7ED] pb-20 relative flex flex-col gap-4 border border-1 border-[#F7DDB7] rounded-xl`}
    >
      <div
        onClick={toggleChatVisibility}
        className={`absolute top-0 h-[60px] bg-[#FFEFD7] w-full rounded-t-xl p-2 cursor-pointer border border-red-300`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center justify-between gap-2">
            {/* <Image
              width={60}
              height={60}
              className="h-[45px] w-[45px] object-cover rounded-[50%] border-2 border-[#F3F0FF]"
              src={selectedOffer?.worker?.profile_pic}
              alt="user-img"
            /> */}
            <Avatar className="h-[45px] w-[45px] rounded-full border-2 border-[#F3F0FF]">
              <AvatarImage
                src={selectedOffer?.worker?.profile_pic}
                className="object-cover"
                width={100}
                height={100}
              />
              <AvatarFallback>
                {selectedOffer?.worker?.full_name[0]}
                {selectedOffer?.worker?.full_name?.split(" ")?.length > 1 &&
                  selectedOffer?.worker?.full_name?.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
            <p className="text-[14px] font-[500] leading-[16px]">
              {selectedOffer?.worker?.full_name}
              <br />
              <span className="text-[12px] text-neutral-600">
                Last active{" "}
                {selectedOffer?.worker?.user?.last_active
                  ? `${timeAgo(selectedOffer?.worker?.user?.last_active)}`
                  : "weeks ago"}
              </span>
              {/* <>{console.log(timeAgo(selectedOffer?.worker?.user?.last_active))}</> */}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              width={60}
              height={60}
              className="h-[25px] w-[25px] object-cover rounded-[50%] cursor-pointer"
              src={"/images/minus.png"}
              onClick={toggleChatVisibility}
              alt="minus-img"
            />
            <Image
              width={60}
              height={60}
              className="h-[25px] w-[25px] object-cover rounded-[50%] cursor-pointer"
              src={"/images/cross.png"}
              onClick={handleCloseClick}
              alt="close-img"
            />
          </div>
        </div>
      </div>

      {isChatBodyVisible && (
        <>
          <div
            className={`relative flex-1 overflow-y-auto p-4 mt-[84px] max-h-[88%]  `}
          >
            <div className="max-w-[270px] bg-yellow-50 px-2 py-2 mb-4 rounded-lg border border-yellow-400 mx-auto text-xs flex items-center justify-center gap-3">
              {/* <TriangleAlert className="w-6 h-6" />  */}
              <Info className="w-4 h-4" />
              Do not share your contact details.
            </div>
            {Object.entries(groupedMessages).map(([date, msgs]: any) => (
              <div key={date}>
                {/* Date Timestamp */}
                <p className="text-[#72777A] text-[12px] font-[500] leading-[16px] text-center mb-4">
                  {date}
                </p>

                {/* Messages */}
                {msgs.map((msg: any) => (
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
            ))}
            {/* Ref for Auto-Scroll */}
            <div ref={messagesEndRef} />
          </div>

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
            <div className="rounded-b-xl w-full absolute p-4 bottom-0 bg-white flex items-center space-x-2">
              <input
                type="text"
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                className="!h-[38px] w-full bg-[#FFEFD7] !text-[12px] flex-1 p-2 border border-gray-300 outline-none !rounded-xl"
                placeholder="Add your comment here..."
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
        </>
      )}
    </div>
  );
};
export default ChatBox;
