import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, truncate, useGlobalState } from '../../store'
import { toast } from 'react-toastify'
import { performAirdrop } from '../../services/blockchain'

const Airdrop = () => {
    const [airdropModal] = useGlobalState('airdropModal')
    const [wallet, setWallet] = useState('')
    const [numberOfTokens, setNumberOfTokens] = useState('')
    const [tokens, setTokens] = useState([])
    const [beneficiaries, setBeneficiaries] = useState([])

    const addTo = () => {
        if (!numberOfTokens || !wallet) return
        if (beneficiaries.includes(wallet.toLocaleLowerCase())) return

        setBeneficiaries((prevState) => [wallet.toLowerCase(), ...prevState])
        setTokens((prevState) => [Number(numberOfTokens), ...prevState])
        setNumberOfTokens('')
        setWallet('')
    }

    const removeFrom = (index) => {
        beneficiaries.splice(index, 1)
        tokens.splice(index, 1)

        setBeneficiaries((prevState) => [...prevState])
        setTokens((prevState) => [...prevState])
    }

    const onClose = () => {
        setTokens([])
        setBeneficiaries([])
        setGlobalState('airdropModal', 'scale-0')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (tokens.length < 1 || beneficiaries.length < 1) return

        await toast.promise(
            new Promise(async (resolve, reject) => {
                await performAirdrop(beneficiaries, tokens)
                    .then(() => {
                        resolve();
                        onClose();
                    })
                    .catch(() => reject())

            }),
            {
                pending: 'Airdropping...',
                success: 'Tokens sent successfully',
                error: 'Failed to send tokens'
            }
        )
    }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${airdropModal}`}>
            <div className='bg-white shadow-xl shadow-[#c963c9] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <p className='font-semibold'>Mint to Wallet</p>
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
                            value={wallet}
                            onChange={(e) => setWallet(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input
                            type='number'
                            className='block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0'
                            name='numberOfTokens'
                            step={1}
                            min={1}
                            placeholder={`Tokens e.g. 2`}

                            value={numberOfTokens}
                            onChange={(e) => setNumberOfTokens(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-start items-center rounded-xl mt-5 space-x-2'>
                        {beneficiaries.slice(0, 3).map((beneficiary, index) => (
                            <div key={index} className='p-2 rounded-full text-gray-500 bg-gray-200 font-semibold flex items-center w-max cursor-pointer active:bg-gray-300 transition duraion-300 ease space-x-2 text-sm'>
                                <span>{truncate(beneficiary, 4, 4, 11)} %{tokens[index]}</span>
                                <button
                                    onClick={() => removeFrom(index)}
                                    type='button'
                                    className='bg-transparent focus:outline-none'>
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between items-center rounded-xl mt-5'>
                        <button
                            type="submit"
                            className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-300 transition-transform duration-150 rounded-full hover:opacity-75 text-white text-sm font-medium'>
                            Send Tokens
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

export default Airdrop