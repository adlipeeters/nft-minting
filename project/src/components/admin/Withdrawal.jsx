import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, truncate, useGlobalState } from '../../store'
import { toast } from 'react-toastify'

const Withdrawal = () => {
    const [withdrawModal] = useGlobalState('withdrawModal')
    const [wallet, setWallet] = useState('')
    const [percent, setPercent] = useState('')
    const [availablePercent, setAvailablePercent] = useState(100)
    const [amount, setAmount] = useState('')
    const [shares, setShares] = useState([])
    const [beneficiaries, setBeneficiaries] = useState([])
    const addTo = () => {
        if (!percent || !wallet) return
        if (beneficiaries.includes(wallet.toLocaleLowerCase())) return
        if (availablePercent - percent < 0 || percent == 0) return

        setAvailablePercent(availablePercent - percent)
        setBeneficiaries((prevState) => [wallet.toLowerCase(), ...prevState])
        setShares((prevState) => [Number(percent), ...prevState])
        setPercent('')
        setWallet('')
    }

    const removeFrom = (index) => {
        setAvailablePercent(availablePercent + Number(shares[index]))
        beneficiaries.splice(index, 1)
        shares.splice(index, 1)
        setBeneficiaries((prevState) => [...beneficiaries])
        setShares((prevState) => [...shares])
    }

    const onClose = () => {
        setShares([])
        setBeneficiaries([])
        setAmount('')
        setAvailablePercent(100)
        setGlobalState('withdrawModal', 'scale-0')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({ beneficiaries, shares, amount })
        if (shares.length < 1 || beneficiaries.length < 1 || !amount) return
        await toast.promise(
            new Promise(async (resolve, reject) => {
                setTimeout(() => {
                    resolve('NFTs minted successfully')
                    setGlobalState('withdrawModal', 'scale-0')
                }, 3000)
            }),
            {
                pending: 'Sending...',
                success: 'Sent successfully',
                error: 'Failed to send'
            }
        )
    }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${withdrawModal}`}>
            <div className='bg-white shadow-xl shadow-[#c963c9] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <p className='font-semibold'>Send to Wallets</p>
                        <button
                            onClick={onClose}
                            type='button'
                            className='border-0 bg-transparent focus:outline-none'>
                            <FaTimes />
                        </button>
                    </div>
                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input
                            type='text'
                            className='block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0'
                            name='wallet'
                            pattern='0x[a-fA-F0-9]{40}'
                            minLength={42}
                            maxLength={42}
                            placeholder='Wallet (ETH)'
                            // required
                            value={wallet}
                            onChange={(e) => setWallet(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input
                            type='number'
                            className='block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0'
                            name='percent'
                            step={0.5}
                            min={1}
                            max={availablePercent}
                            placeholder={`Percent (1 - ${availablePercent})`}
                            // required
                            value={percent}
                            onChange={(e) => setPercent(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-start items-center rounded-xl mt-5 space-x-2'>
                        {beneficiaries.slice(0, 3).map((beneficiary, index) => (
                            <div key={index} className='p-2 rounded-full text-gray-500 bg-gray-200 font-semibold flex items-center w-max cursor-pointer active:bg-gray-300 transition duraion-300 ease space-x-2 text-sm'>
                                <span>{truncate(beneficiary, 4, 4, 11)} %{shares[index]}</span>
                                <button
                                    onClick={() => removeFrom(index)}
                                    type='button'
                                    className='bg-transparent focus:outline-none'>
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>

                    {beneficiaries.length > 0 ? (
                        <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                            <input
                                type='number'
                                className='block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0'
                                name='amount'
                                step={0.01}
                                min={0.01}
                                placeholder={`Amount e.g. 0.02`}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    ) : ''}
                    <div className='flex justify-between items-center rounded-xl mt-5'>
                        <button
                            type="submit"
                            className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-white text-sm font-medium'>
                            Send Ethers
                        </button>
                        <button
                            onClick={addTo}
                            type="button"
                            className='bg-transparent border border-[#6d1e6d] text-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-sm font-medium'>
                            Add to List
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Withdrawal