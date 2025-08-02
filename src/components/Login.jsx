import { authModalState } from "@/atoms/authModalAtom";
import React from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {router} from 'next/router'
import {auth} from '@/firebase/firebase'
import { useState ,useEffect} from "react";
import {toast} from 'react-toastify'
export default function Login() {
  const setAuthModalState = useSetRecoilState(authModalState)
  const [signInWithEmailAndPassword, user, loading, error] =useSignInWithEmailAndPassword(auth);
  const [inputs,setInputs] = useState({email:'',password:''})
  function handleClick(type){
    setAuthModalState((prev)=>({...prev,type}))
  }
  function handleChange(e){
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  async function handleLogin(e){
    e.preventDefault()
    if(!inputs.email||!inputs.password){
      return toast.error("Please fill all the fields",{position:"top-center",autoClose:3000})
    }
    try{
      const user = await signInWithEmailAndPassword(inputs.email,inputs.password)
      if(!user){
        return
      }
      router.push("/dsa")
    }
    catch(error){
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
    }
  }

  useEffect(()=>{
    if(error){
      toast.error(error.message,{position:"top-center",autoClose:3000})
    }
  },[error])
  console.log(user,"user")
  return (
    <form className="space-y-6 px-6 pb-4">
      <h3 className="text-xl font-semibold text-black">Sign-In to PrepQuest</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-semibold block mb-2 text-dark-gray"
        >
          Enter your E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="text-sm border-2 outline-none sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 border-gray-400"
          placeholder="name@company.com"
          onChange = {handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-semibold block mb-2 text-dark-gray"
        >
          Enter your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="text-sm border-2 outline-none sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 border-gray-400"
          placeholder="************"
          onChange = {handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-primary-color font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-color hover:bg-button button-shadow min-w-24"
        onClick={handleLogin}
      >
        {loading?"Loading...":"Login"}
      </button>
      <button onClick={()=>handleClick("forgotPassword")} className="flex w-full justify-end">
        <a
          href="#"
          className="text-sm font-medium block text-primary-color hover:underline w:full text-right"
        >
          Forgot Password?
        </a>
      </button>
      <div className="text-sm font-medium text-primary-color">
        Not Registered?
        <a href="#" className="text-primary-color hover:underline" onClick={()=>handleClick("register")}>
          {" "}
          Create Account
        </a>
      </div>
    </form>
  );
}
