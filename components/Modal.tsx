import React from "react";
import Wert from "./Wert";

export default function WertModal({walletAddress}:{walletAddress:string}) {
  const [showModal, setShowModal] = React.useState(false);
  
  return (
    <>
      <button
        className="bg-[#ffe000] text-black active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Buy tokens
      </button>
      {showModal ? (
        <div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative h-[700px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[780px] bg-white outline-none focus:outline-none h-full">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t h-[100px]">
                  <h3 className="text-3xl font-semibold">
                    Buy ATF Tokens
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      {'x'}
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="h-[580px] rounded-b"><Wert walletAddress={walletAddress}/></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
}