import React from "react";

export const Spinner = () => {
  return (
    <div className="flex w-full items-center justify-center h-10 text-white">
      <div className="w-8 h-8 border-2 border-solid border-[#6c5ce7] rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
};
