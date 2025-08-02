import {auth} from '@/firebase/firebase'
import React from 'react'
import {FiLogOut} from 'react-icons/fi'
import { useSignOut } from "react-firebase-hooks/auth";
export default function Logout(){
    const [signOut, loading, error] = useSignOut(auth);
    function handleLogout(){
        signOut();
    }
    return (
      <button className="py-1.5 px-3 cursor-pointer rounded-full text-dark-gray border-2 border-dark-gray" onClick={handleLogout}>
        <FiLogOut />
      </button>
    );
}