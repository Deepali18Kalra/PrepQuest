import {auth} from '@/firebase/firebase'
import React,{useState,useEffect} from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import {toast} from 'react-toastify'
export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    async function handleReset(e){
      e.preventDefault()
      const success = await sendPasswordResetEmail(email)
      if(success){
        toast.success("Password reset email sent",{position:"top-center",autoClose:3000})
      }
    }

    useEffect(()=>{
      if(error){
        toast.error(error.message,{position:"top-center",autoClose:3000})
      }
    },[error])
  return (
    <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" onSubmit={handleReset}>
      <h3 className="text-xl font-semibold text-black">Reset Password</h3>
      <p className="text-sm text-gray-600">
        Forgotten your password? Enter your e-mail address below, and we&apos;ll
        send you an e-mail allowing you to reset it.
      </p>
      <div>
        <label htmlFor="email" className="text-sm font-semibold block mb-2 text-gray-600">
          Your email
        </label>
        <input type="email" name="email" id="email" className="text-sm border-2 outline-none sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 border-gray-400" placeholder="name@company.com" onChange={(e)=>setEmail(e.target.value)}/>
      </div>

      <button type="submit" className="w-full text-white focus:ring-primary-color font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-color hover:bg-button button-shadow min-w-24">
        Reset Password
      </button>
    </form>
  );
}
