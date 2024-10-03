import React, { useState } from "react";

type TooltipProps = {
  text: string;
};

const ResultToolTip: React.FC<TooltipProps> = ({ text }) => {
  const [showTooltip, setShowToolTip] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
        className="tooltip-container"
      >
        <h1 className="cursor-default ">{text.substring(0, 40)}...</h1>
        <div
          className={`fixed -top-40 -left-10 z-10 bg-[#64748b] rounded px-2 py-2 text-2xl opacity-95 text-[#FFFFFF]  ${
            showTooltip ? "" : "hidden"
          }`}
        >
          {text}
        </div>
      </div>
    </>
  );
};

export default ResultToolTip;