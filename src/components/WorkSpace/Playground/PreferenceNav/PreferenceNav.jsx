import React from 'react'
import { AiOutlineFullscreen, AiOutlineSetting } from 'react-icons/ai'

export default function PreferenceNav(){
    return(
        <div className="flex items-center justify-between h-11 w-full ml-2">
            <div className='flex items-center text-dark-gray'>
                <button className="flex cursor-pointer items-center rounded focus:outline-none bg-primary-color text-white hover:bg-accent-color px-2 py-1.5 font-medium">
                    <div className='flex items-center px-1'>
                        <div className='text-sm text-white'>JavaScript</div>
                    </div>
                </button>
            </div>
            <div className='flex items-center m-2'>
                <button className="relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 group">
                    <div className='h-4 w-4 text-dark-gray font-bold text-lg'>
                        <AiOutlineSetting/>
                    </div>
                    <div className='absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rouned-md shadow-md text-dark-gray origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100'>
                        Settings
                    </div>
                </button>
                <button className="relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 group">
                    <div className='h-4 w-4 text-dark-gray font-bold text-lg'>
                        <AiOutlineFullscreen/>
                    </div>
                    <div className='absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rouned-md shadow-md text-dark-gray origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100'>
                        Full Screen
                    </div>
                </button>
            </div>
        </div>
    )
}