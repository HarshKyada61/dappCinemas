import { useState } from 'react'
import { useGlobalState, setGlobalState } from '../store'
import { FaTimes } from 'react-icons/fa'
import { withdraw } from '../services/blockchain'
import { toast } from 'react-toastify'

const Withdrawal = () => {
  const [withdrwalModal] = useGlobalState('withdrwalModal')
  const [transfer, setTransfer] = useState({
    account: '',
    amount: '',
  })

  const closeModal = () => {
    setGlobalState('withdrwalModal', 'scale-0')
    setTransfer({
      account: '',
      amount: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!transfer.account || !transfer.amount) return

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await withdraw(transfer)
          .then(async () => {
            closeModal()
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }),
      {
        pending: 'Approve transaction...',
        success: 'Transfer successful 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setTransfer((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }))
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${withdrwalModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Withraw Money</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <div className="flex justify-center items-center rounded-full overflow-hidden h-10 w-64 shadow-md shadow-slate-300 p-4">
              <p className="text-slate-700">
                {' '}
                Dapp <span className="text-red-700">Cinemas</span>
              </p>
            </div>
          </div>
          <div
            className="flex flex-row justify-between items-center
          bg-gray-300 rounded-xl mt-5 p-2"
          >
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="account"
              minLength={42}
              maxLength={42}
              pattern="[A-Za-z0-9]+"
              placeholder="ETH Account"
              value={transfer.account}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="amount"
              placeholder="Amount (ETH)"
              value={transfer.amount}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center w-full text-white text-md
            bg-red-500 py-2 px-5 rounded-full drop-shadow-xl border border-transparent
            hover:bg-transparent hover:border-red-500 hover:text-red-500 focus:outline-none mt-5"
          >
            Wire Fund
          </button>
        </form>
      </div>
    </div>
  )
}

export default Withdrawal
