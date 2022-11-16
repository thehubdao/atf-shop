const Popup = ({ title, message, buttonText, onButtonClick, onExit }: any) => {
    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center absolute top-0 left-0 z-50 ">
                <div className="flex flex-col space-y-10 backdrop-blur-2xl p-5 rounded bg-white">
                    <div className="border-0 rounded-lg relative flex flex-col w-[360px] sm:w-[500px] bg-white outline-none focus:outline-none h-full">
                        {/*header*/}
                        <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl font-sans">{title}</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={onExit}
                            >
                                <span className="bg-transparent text-black opacity-40 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    {'x'}
                                </span>
                            </button>
                        </div>
                    </div>
                    <p className="text-xl max-w-md text-center self-center">{message}</p>
                    <div
                        onClick={onButtonClick}
                        className="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                    >
                        {buttonText}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default Popup
