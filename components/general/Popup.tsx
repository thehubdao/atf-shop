const Popup = ({ message, buttonText, onButtonClick }: any) => {
    return (
        <div className='w-screen h-screen flex items-center justify-center absolute top-0 left-0 z-50'>
            <div className="flex flex-col space-y-10 backdrop-blur-2xl p-5 rounded">
                <p className="text-xl max-w-md text-center">{message}</p>
                <div onClick={onButtonClick} className="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center">{buttonText}</div>
            </div>
        </div>
    )
}

export default Popup