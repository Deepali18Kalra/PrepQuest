import { auth } from "@/firebase/firebase";
import React from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "./Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from 'next/image'
import {FaChevronLeft,FaChevronRight} from "react-icons/fa"
import { BsList } from "react-icons/bs";
import Timer from '@/components/Timer/Timer'
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
export default function TopBar({problemPage=false}) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);

  function handleProblemChange(isForward){
    const{order} = problems[router.query.pid]
    const direction = isForward?1:-1
    const nextProblemOrder = order+direction
    const nextProblemKey = Object.keys(problems).find(key=>problems[key].order===nextProblemOrder)
    if(isForward&&!nextProblemKey){
      const firstProblemKey = Object.keys(problems).find(key=>problems[key].order===1)
      router.push(`/problems/${firstProblemKey}`)
    }
    else if(!isForward&&!nextProblemKey){
      const lastProblemKey = Object.keys(problems).find(key=>problems[key].order===Object.keys(problems).length)
      router.push(`/problems/${lastProblemKey}`)
    }
    else{
      router.push(`/problems/${nextProblemKey}`)
    }
  }
  return (
    <div className="flex items-center justify-between sm:px-12 px-4 md:px-16 lg:px-24 bg-light-gray">
      <Link href="/" className="flex items-center justify-center h-20 gap-2">
        <Image src="/logo.svg" alt="PrepQuest" height={30} width={27}></Image>
        <h1 className="font-inter text-text-color font-extrabold text-2xl">
          PrepQuest
        </h1>
      </Link>

      {problemPage && 
        (
          <div className = "flex items-center gap-4 justify-center">
            <div className="flex items-center justify-center rounded hover:bg-gray hover:text-background-color h-8 w-8 cursor-pointer text-dark-gray" onClick={()=>handleProblemChange(false)}>
              <FaChevronLeft/>
            </div>
            <Link href="/dsa" className="flex flex-row items-center gap-2 text-lg font-semibold text-dark-gray cursor-pointer">
              <div>
                <BsList></BsList>
              </div>
                <p>Problem List</p>
            </Link>
            <div className="flex items-center justify-center rounded hover:bg-gray hover:text-background-color h-8 w-8 cursor-pointer text-dark-gray" onClick={()=>handleProblemChange(true)}>
              <FaChevronRight/>
            </div>
          </div>
        )
      }

      <div className="flex items-center space-x-4 justify-end">
        {!user && (
          <Link
            href="/"
            onClick={setAuthModalState((prev) => ({
              ...prev,
              isOpen: true,
              type: "login",
            }))}
          >
            <button className="rounded-md py-2 px-6 font-inter font-medium text-sm transition-all bg-primary-color text-background-color hover:bg-button button-shadow min-w-24">
              Sign In
            </button>
          </Link>
        )}
        {user && problemPage && (<Timer/>)}
        {user && (
          <div className="cursor-pointer group relative">
            <Image src="/avatar.png" alt="User Profile Image" height={40} width={40}></Image>
            <div
              className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-accent-color p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        )}
        {user && <Logout />}
      </div>
    </div>
  );
}
