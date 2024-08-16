import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="border-t-2 border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6]">
        <div className="flex md:justify-start gap-8 px-8 mx-auto py-2">
          <img src="src/assets/MRC_RGB.png" width="275"></img>
          <img src="src/assets/Glasgow_RGB.png" width="275"></img>
        </div>
      </footer>
    </>
  );
};

export default Footer;
