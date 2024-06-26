import React from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import Identicon from 'react-identicons'
import { truncate, useGlobalState } from '../../store/index'
import { toast } from 'react-toastify';
import { joinWL } from '../../services/blockchain';

const Joiners = ({ whitelist }) => {
    const [connectedAccount] = useGlobalState('connectedAccount')
    const handleJoinWL = async () => {
        if (whitelist.includes(connectedAccount)) {
            toast.warning('You have already joined the WL');
            return;
        }
        await toast.promise(
            new Promise(async (resolve, reject) => {
                await joinWL().then(() => resolve()).catch(() => reject())
            }),
            {
                pending: 'Joining WL',
                success: 'You have successfully joined the WL',
                error: 'Failed to join WL'
            }
        )
    }
    return (
        <div className='text-center pt-8 pb-5 space-y-4'>
            <h4>Recently Joined</h4>
            <TheWL whitelist={whitelist} />
            <div className='flex items-center justify-center'>
                <button
                    onClick={handleJoinWL}
                    className='bg-[#6d1e6d] p-2 px-3 shadow-lg shadow-gray-800 transition-all duration-150 rounded-full hover:opacity-75'>
                    <p className='text-white text-sm font-medium'>Join WL Now</p>
                </button>
            </div>
        </div>
    )
}

const TheWL = ({ whitelist }) => {
    // const [] = useGlobalState('whiteList');
    if (!whitelist || whitelist.length == 0) return <div className='flex justify-center items-center'><p className='py-2 italic opacity-50'>No one has joined yet...</p><p>🙄</p></div>
    return (
        <div className='flex flex-wrap justify-center'>
            <Swiper
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    605: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    900: {
                        slidesPerView: (whitelist.length <= 2) ? 1 : 3,
                        spaceBetween: 10
                    },
                    1200: {
                        slidesPerView: (whitelist.length <= 2) ? 1 : 4,
                        spaceBetween: 10
                    }
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true
                }}
                pagination={
                    {
                        clickable: true
                    }}
                navigation={false}
                modules={[Autoplay]}
            >
                {
                    whitelist.map((account, i) => (
                        <SwiperSlide
                            className='flex justify-center items-center text-black'
                            key={i}>
                            <div className='shadow-sm shadow-gray-300 w-80 m-5 p-3 text-start rounded-lg space-y-4'>
                                <div className='flex items-center space-x-4'>
                                    <Identicon string={account} size={35} className="rounded-full w-12 h-12 object-cover bg-slate-100" />
                                    <div>
                                        <h1 className='font-medium'>{truncate(account, 4, 4, 11)}</h1>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Joiners