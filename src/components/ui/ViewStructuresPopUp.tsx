import React from "react";

type ViewStructuresPopUpProps = {
    handleClosePopUpClick: Function;
  hoveredVirus: string;
}

const ViewStructuresPopUp: React.FC<ViewStructuresPopUpProps> = ({ handleClosePopUpClick, popUpVirus }) => {

    const handleViewStructuresClick = () => {
        window.open(`/proteinresultspage/virus_name/${popUpVirus}`, "_blank", "noreferrer");
      };

  return (
    <>
      <div
        id="default-modal"
        aria-hidden="true"
        className="overflow-y-auto mt-2 mr-2 font-extralight overflow-x-hidden absolute top-0 right-0 z-10 max-h-full"
      >
        <div className="relative  w-full max-w-2xl  max-h-full">
          <div className=" flex flex-col justify-between bg-[#64748be0] rounded-lg shadow">
            <div className="   p-4 md:p-5  rounded-t dark:border-gray-600">
              <h3 className="text-xl text-white">
                {popUpVirus}
              </h3>
            </div>
            <div className="flex justify-between gap-2 p-4 md:p-5 rounded-b border-gray-400">
            <button
                onClick={handleClosePopUpClick}
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-[#e65b56] w-full hover:bg-[#df7470] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Close
              </button>
              <button
                onClick={handleViewStructuresClick}
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-[#56b3e6] w-full hover:bg-[#61c8ff] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center"
              >
                View Structures
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStructuresPopUp;