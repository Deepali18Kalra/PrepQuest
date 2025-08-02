import React from 'react'
import Link from 'next/link'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/atoms/authModalAtom'
import Image from 'next/image'
export default function Navbar(){
    const setAuthModalState = useSetRecoilState(authModalState)
    function handleClick(){
        setAuthModalState((prev)=>({...prev,isOpen:true,type:"login"}))
    }
    return (
      <div className="flex items-center justify-between sm:px-12 px-4 md:px-16 lg:px-24">
        <Link href="/" className="flex items-center justify-center h-20 gap-2">
          <Image src="/logo.svg" alt="PrepQuest" height={30} width={27}></Image>
          <h1 className="font-inter text-text-color font-extrabold text-2xl">
            PrepQuest
          </h1>
        </Link>
        <div className="sm:flex items-center gap-10 hidden">
          <Link
            href="/dsa"
            className="text-nav-link font-bold text-sm transition-all hover:text-link-color"
          >
            Practice Problems
          </Link>
          <Link
            href="/"
            className="text-nav-link font-bold text-sm transition-all hover:text-link-color"
          >
            Purchase
          </Link>
        </div>
        <div className="hidden sm:block">
          <button
            onClick={handleClick}
            className="rounded-md py-2 px-6 font-inter font-medium text-sm transition-all bg-primary-color text-background-color hover:bg-button button-shadow min-w-24"
          >
            Sign In
          </button>
        </div>
        <div className="sm:hidden">
          <button>
            <img src="/Hamburger.svg" alt="hamburger" className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
}