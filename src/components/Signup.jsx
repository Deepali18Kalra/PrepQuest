import { authModalState } from '@/atoms/authModalAtom';
import React from 'react'
import { useState, useEffect} from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {auth, firestore} from '@/firebase/firebase'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
import { doc, setDoc } from 'firebase/firestore';
export default function Signup(){
  const setAuthModalState = useSetRecoilState(authModalState);
  const [inputs,setInputs] = useState({email:'',displayName:'',password:''})
  const [createUserWithEmailAndPassword,user,loading,error,] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter()
  function handleClick(){
    setAuthModalState((prev)=>({...prev,type:"login"}))
  }
  function handleChangeInput(e){
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  async function handleRegister(e){
    e.preventDefault()
    try{
      toast.loading("Creating your account",{position:'top-center',toastId:"loadingToast"})
      if(!inputs.email||!inputs.password||!inputs.displayName){
        return toast.error("Please fill all the fields",{position:"top-center",autoClose:3000})
      }
      const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password);
      if(!newUser) return
      const userData={
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt:Date.now(),
        updatedAt:Date.now(),
        likedProblems:[],
        dislikedProblems:[],
        solvedProblems:[],
        starredProblems:[],
      }
      await setDoc(doc(firestore,"users",newUser.user.uid),userData)
      router.push('/dsa')
    }
    catch(error){
      toast.error(error.message,{position:"top-center",})
      
    }
    finally{
      toast.dismiss("loadingToast")
    }
  }
  
  useEffect(()=>{
    if(error){
      toast.error(error.message,{position:"top-center",autoClose:3000})
    }
  },[error])
    return (
      <>
        <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
          <h3 className="text-xl font-semibold text-black">Register to PrepQuest</h3>
          <div>
            <label htmlFor="email" className="text-sm font-semibold block mb-2 text-dark-gray">
              E-mail
            </label>
            <input type="email" name="email" id="email" className="text-sm border-2 outline-none sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 border-gray-400" placeholder="name@company.com" onChange={handleChangeInput}/>
          </div>
          <div>
            <label htmlFor="displayName" className="text-sm font-semibold block mb-2 text-dark-gray">
              User Name:
            </label>
            <input type="displayName" name="displayName" id="displayName" className="text-sm border-2 outline-none sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 border-gray-400" placeholder="John Doe" onChange={handleChangeInput}/>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold block mb-2 text-dark-gray">
              Password
            </label>
            <input type="password" name="password" id="password" className="text-sm border-2 outline-none sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 border-gray-400" placeholder="************" onChange={handleChangeInput}/>
          </div>
          <button type="submit" className="w-full text-white focus:ring-primary-color font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-color hover:bg-button button-shadow min-w-24">
            {loading?"Registering...":"Register"}
          </button>
          <div className="text-sm font-medium text-primary-color">
            Already have an account?
            <a href="#" onClick={handleClick} className="text-primary-color hover:underline">
              {" "}
              Log In
            </a>
          </div>
        </form>
      </>
    );
}