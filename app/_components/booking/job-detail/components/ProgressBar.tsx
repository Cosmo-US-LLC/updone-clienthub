import React from "react";
import { Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ProgressBar({ status }: any) {
  const statusOrder: any = {
    open: 1,
    assigned: 2,
    completed: 3,
  };

  return (
    // <div>
    //   <ol className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 sm:gap-4">
    //     <li className={`flex items-center justify-end gap-2 ${statusOrder[status] == 1 ? "text-blue-500" : (statusOrder[status] > 1 ? "text-green-600" : "text-gray-600")}`}>
    //       <span className={`size-8 rounded-sm text-center py-2 text-[14px] font-semibold ${statusOrder[status] == 1 ? "text-blue-500 bg-blue-50" : (statusOrder[status] > 1 ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-50")} `}>
    //         {statusOrder[status] > 1 ? <><Check className="w-5 h-5 mx-auto" /></> : "1"}
    //       </span>
    //       <span> Open </span>
    //     </li>

    //     <li className={`flex items-center justify-end gap-2 ${statusOrder[status] == 2 ? "text-blue-500" : (statusOrder[status] > 2 ? "text-green-600" : "text-gray-600")}`}>
    //       <span className={`size-8 rounded-sm text-center py-2 text-[14px] font-semibold ${statusOrder[status] == 2 ? "text-blue-500 bg-blue-50" : (statusOrder[status] > 2 ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-50")} `}>
    //         {statusOrder[status] > 2 ? <><Check className="w-5 h-5 mx-auto" /></> : "2"}
    //       </span>
    //       <span> Assigned </span>
    //     </li>

    //     <li className={`flex items-center justify-end gap-2 ${statusOrder[status] == 3 ? "text-blue-500" : (statusOrder[status] > 3 ? "text-green-600" : "text-gray-600")}`}>
    //       <span className={`size-8 rounded-sm text-center py-2 text-[14px] font-semibold ${statusOrder[status] == 3 ? "text-blue-500 bg-blue-50" : (statusOrder[status] > 3 ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-50")} `}>
    //         {statusOrder[status] > 3 ? <><Check className="w-5 h-5 mx-auto" /></> : "3"}
    //       </span>
    //       <span> Completed </span>
    //     </li>
    //   </ol>
    // </div>
    <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
      <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
        <li
          className={`flex items-center gap-2 p-2 bg-white ${
            statusOrder[status] >= 1 ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <span
            className={`size-6 rounded-full text-center text-[10px]/6 font-bold ${
              statusOrder[status] >= 1
                ? "text-blue-500 bg-blue-50"
                : "text-gray-500 bg-gray-50"
            }`}
          >
            {statusOrder[status] >= 1 ? (
              <>
                <Check className="w-4 h-4 m-1" />
              </>
            ) : (
              "1"
            )}
          </span>

          <span className="hidden sm:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="hover:bg-white hover:text-inherit">
                  Open
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-normal">
                    Your event is open to receive offers from Talents.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </li>
        <div className="w-[70px]"></div>
        <li
          className={`flex items-center gap-2 p-2 bg-white ${
            statusOrder[status] >= 2 ? "text-green-500" : "text-gray-500"
          }`}
        >
          <span
            className={`size-6 rounded-full text-center text-[10px]/6 font-bold ${
              statusOrder[status] >= 2
                ? "text-green-500 bg-green-50"
                : "text-gray-500 bg-gray-50"
            }`}
          >
            {statusOrder[status] >= 2 ? (
              <>
                <Check className="w-4 h-4 m-1" />
              </>
            ) : (
              "2"
            )}
          </span>

          <span className="hidden sm:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="hover:bg-white hover:text-inherit">
                  Assigned
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-normal">
                    Your event has been assigned to a Talent.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </li>
        <div className="w-[70px]"></div>
        <li
          className={`flex items-center gap-2 p-2 bg-white ${
            statusOrder[status] >= 3 ? "text-red-500" : "text-gray-500"
          }`}
        >
          <span
            className={`size-6 rounded-full text-center text-[10px]/6 font-bold ${
              statusOrder[status] >= 3
                ? "text-red-500 bg-red-50"
                : "text-gray-500 bg-gray-50"
            }`}
          >
            {statusOrder[status] >= 3 ? (
              <>
                <Check className="w-4 h-4 m-1" />
              </>
            ) : (
              "3"
            )}
          </span>

          <span className="hidden sm:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="hover:bg-white hover:text-inherit">
                  Completed
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-normal">
                    Your event has been Completed.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </li>
      </ol>
    </div>
  );
}

export default ProgressBar;
