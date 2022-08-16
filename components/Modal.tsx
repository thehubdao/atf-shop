import React from "react";

interface IModal {
  title: string,
  body: any,
  buttonText: string,
  buttonClassName: string
  buttonExtraFunction?: any,
  closeExtraFunction?: any
}


export default function Modal({ title, buttonText, buttonClassName, buttonExtraFunction, body, closeExtraFunction }: IModal) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="w-full flex justify-center h-fit">
      <button
        className={`${buttonClassName}`}
        type="button"
        onClick={() => {
          setShowModal(true)
          buttonExtraFunction && buttonExtraFunction()
        }}
      >
        {buttonText}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl h-auto max-h-[700px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[360px] sm:w-[500px] bg-white outline-none focus:outline-none h-full">
                {/*header*/}
                <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-sans">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false)
                      closeExtraFunction && closeExtraFunction()
                    }}
                  >
                    <span className="bg-transparent text-black opacity-40 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      {'x'}
                    </span>
                  </button>
                </div>
                {/*body*/}
                {body()}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}