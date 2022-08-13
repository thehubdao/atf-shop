import { FcApproval, FcMediumPriority, FcHighPriority } from "react-icons/fc";
import Link from 'next/link'

interface IBasketModalConfirm {
  isWaiting: boolean,
  isConfirmed: boolean,
  isSuccesful: boolean,
  setIsWaiting: any,
  setIsConfirmed: any,
  setIsSuccesful: any,
  handleConfirmModal: any,
}

const BasketModalConfirm = ({ isWaiting, isConfirmed, isSuccesful, setIsWaiting, setIsConfirmed, setIsSuccesful, handleConfirmModal }: IBasketModalConfirm) => {

  const handleResetModal = () => {
    setIsConfirmed(false)
    setIsSuccesful(false)
    setIsWaiting(true)
  }

  return (
    <div className='w-[80%] m-auto text-center my-10'>
      {
        !isConfirmed ? (
          <>
            <p className='font-bold'>Confirm in-App Purchsae</p>
            <p>Click confirm to proceed with your order 1640 credits will be discounted from your connected web3 wallet.</p>
            <div className='flex flex-col mt-10'>
              <button
                className="rounded-md my-3 bg-[#020202] text-white px-4 py-1 w-44 cursor-pointer text-center font-medium self-center"
                onClick={() => {
                  setIsConfirmed(true)
                  handleConfirmModal()
                }}
              >
                Confirm
              </button>
              <Link href="/" onClick={() => handleResetModal()}>
                Back to ATF
              </Link>
            </div>
          </>
        ) : isWaiting ? (
          <>
            <FcMediumPriority className="m-auto" size={120} />
            <p className='text-sm font-bold'>Waiting</p>
            <p className="text-xl text-orange-600 mb-4">Processing your order</p>
            <p className="text-sm">It may take a few minutes</p>
          </>
        ) : isSuccesful ? (
          <>
            <FcApproval className="m-auto" size={120} />
            <p className='text-sm font-bold'>Congratulations!</p>
            <p className="text-xl text-green-500 mb-4">Purchase succesful</p>
            <p className="text-sm">Thanks for your Purchase, your order was succesfully processed. You can now enjoy your items.</p>
            <div>

            </div>
            <div className='flex flex-col mt-10'>
              <div className="rounded-md my-3 bg-[#020202] text-white px-4 py-1 w-44 cursor-pointer text-center font-medium self-center">
                <Link href="/" onClick={() => handleResetModal()}>
                  Back to ATF
                </Link>

              </div>
            </div>
          </>
        ) : (
          <>
            <FcHighPriority className="m-auto" size={120} />
            <p className='text-sm font-bold'>Sorry</p>
            <p className="text-xl text-red-600 mb-4">Something went wrong</p>
            <p className="text-sm">We were not able to process your order.<br />Please try again.</p>
            <div className='flex flex-col mt-10'>
              <button className="rounded-md my-3 bg-[#020202] text-white px-4 py-1 w-44 cursor-pointer text-center font-medium self-center" onClick={() => handleResetModal()}>
                Try again
              </button>
              <Link href="/" onClick={() => handleResetModal()}>
                Back to ATF
              </Link>
            </div>
          </>
        )
      }
    </div>
  )
}

export default BasketModalConfirm