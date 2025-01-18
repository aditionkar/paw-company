import React from "react";

function Loader() {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-[#370EA3] animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-[#370EA3] animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#370EA3] animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}

export default Loader;
