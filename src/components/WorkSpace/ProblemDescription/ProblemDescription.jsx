import React,{useEffect, useState} from 'react'
import { BsCheck2Circle } from 'react-icons/bs';
import {AiFillLike,AiFillDislike, AiOutlineLoading3Quarters} from 'react-icons/ai'
import {TiStar, TiStarFullOutline, TiStarOutline} from 'react-icons/ti'
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebase';
import RectangleSkeleton from '@/components/Skeletons/RectangleSkeleton';
import CircleSkeleton from '@/components/Skeletons/CircleSkeleton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

export default function ProblemDescription({problem,_solved}){
  const [user] = useAuthState(auth)
  const {currentProblem,loading,problemDifficultyClass,setCurrentProblem} = useGetCurrentProblem(problem.id)
  const{liked,disliked,starred,solved,setData} = useGetUsersDataOnProblem(problem.id)
  const[updating,setUpdating] = useState(false)

  async function returnUserDataAndProblemData(transaction) {
    const userRef = doc(firestore, "users", user?.uid);
    const problemRef = doc(firestore, "problems", problem.id);
    const userDoc = await transaction.get(userRef);
    const problemDoc = await transaction.get(problemRef);

    return { userRef, problemRef, userDoc, problemDoc };
  }

  async function handleStar(){
    if(!user){
        toast.error("You must be logged in to star a problem",{position:"top-center"})
        return
      }
      if (updating) return;
      setUpdating(true);
      
      if(!starred){
        const userRef = doc(firestore, "users", user?.uid);
        await updateDoc(userRef,{
          starredProblems:arrayUnion(problem.id)
        })
        setData((prev)=>({...prev,starred:true}))
      }
      else{
        const userRef = doc(firestore, "users", user?.uid);
        await updateDoc(userRef,{
          starredProblems:arrayRemove(problem.id)
        })
        setData((prev)=>({...prev,starred:false}))
      }
      setUpdating(false)
  }
  async function handleDislike(){
      if(!user){
        toast.error("You must be logged in to dislike a problem",{position:"top-center"})
        return
      }
      if (updating) return;
      setUpdating(true);

      await runTransaction(firestore,async (transaction)=>{
        const {userDoc,problemDoc,userRef,problemRef} = await returnUserDataAndProblemData(transaction)
        if(userDoc.exists()&&problemDoc.exists()){
          //already disliked, already liked, neither
          if(disliked){
            transaction.update(userRef,{
              dislikedProblems:userDoc.data().dislikedProblems.filter((id)=>id!==problem.id)
            })
            transaction.update(problemRef,{
              dislikes:problemDoc.data().dislikes-1
            })
            setCurrentProblem((prev)=>({...prev,dislikes:prev.dislikes-1}))
            setData((prev) => ({ ...prev,disliked: false }));
          }

          else if(liked){
            transaction.update(userRef,{
            dislikedProblems:[...userDoc.data().dislikedProblems,problem.id],
            likedProblems:userDoc.data().likedProblems.filter((id)=>id!==problem.id)
          })

          transaction.update(problemRef,{
            dislikes:problemDoc.data().dislikes+1,
            likes:problemDoc.data().likes-1
          })
          setCurrentProblem((prev)=>({...prev,likes:prev.likes-1,dislikes:prev.dislikes+1}))
          setData((prev)=>({...prev,disliked:true,liked:false}))
          }
          else{
            transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
          })

          transaction.update(problemRef,{
            dislikes:problemDoc.data().dislikes+1
          })
          setCurrentProblem((prev)=>({...prev,dislikes:prev.dislikes+1}))
          setData((prev)=>({...prev,disliked:true}))
          }
        }
      })

      setUpdating(false);
  }
  async function handleLike(){
    if(!user){
      toast.error("You must be logged in to like a problem",{position:"top-center"})
      return
    }

    //if already liked, if already disliked, neither
    //transactions
    //we need to perform two operations; we need to update the likes count of the problem and also update the likedProblems array of the user so they need to be done as a single atomic transaction
    if(updating)return
    setUpdating(true)
    await runTransaction(firestore, async(transaction)=>{
      const {userDoc,problemDoc,userRef,problemRef} = await returnUserDataAndProblemData(transaction)
      if(userDoc.exists()&&problemDoc.exists()){
        if(liked){
          //remove problemId from users likedProblems on user document, decrement likes on problem document
          transaction.update(userRef,{
            likedProblems:userDoc.data().likedProblems.filter((id)=>id!==problem.id)
          })
          transaction.update(problemRef,{
            likes:problemDoc.data().likes -1
          })
          setCurrentProblem((prev)=>({...prev,likes:prev.likes - 1}))
          setData((prev)=>({...prev,liked:false}))
        }
        else if(disliked){
          transaction.update(userRef,{
            likedProblems:[...userDoc.data().likedProblems,problem.id],
            dislikedProblems:userDoc.data().dislikedProblems.filter((id)=>id!==problem.id)
          })

          transaction.update(problemRef,{
            likes:problemDoc.data().likes+1,
            dislikes:problemDoc.data().dislikes-1
          })
          setCurrentProblem((prev)=>({...prev,likes:prev.likes+1,dislikes:prev.dislikes-1}))
          setData((prev)=>({...prev,liked:true,disliked:false}))
        }
        else{
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
          })

          transaction.update(problemRef,{
            likes:problemDoc.data().likes+1
          })
          setCurrentProblem((prev)=>({...prev,likes:prev.likes+1}))
          setData((prev)=>({...prev,liked:true}))
        }
      }
    })
    setUpdating(false)
  }
    return (
      <div className="bg-background-color overflow-y-scroll">
        {/* TAB */}
        <div className="flex h-11 w-full items-center pt-2 text-dark-gray overflow-x-hidden">
          <div
            className={"rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}
          >
            Description
          </div>
        </div>

        <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
          <div className="px-5">
            {/* Problem heading */}
            <div className="w-full">
              <div className="flex space-x-4">
                <div className="flex-1 mr-2 text-lg text-dark-gray font-medium ">
                  {problem?.title}
                </div>
              </div>
              {!loading && currentProblem && (
                <div className="flex items-center mt-3">
                  <div
                    className={`${problemDifficultyClass} text-white inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize`}
                  >
                    {currentProblem.difficulty}
                  </div>
                  {(solved || _solved) && (
                  <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-green-s">
                    <BsCheck2Circle />
                  </div>
                  )}
                  <div
                    className="flex items-center cursor-pointer hover:bg-light-gray space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                    onClick={handleLike}
                  >
                    {liked && !updating && <AiFillLike className="text-blue-700" />}
                    {!liked && !updating && <AiFillLike className="text-gray-400" />}
                    {updating && <AiOutlineLoading3Quarters className='animate-spin'/>}
                    <span className="text-xs">{currentProblem.likes}</span>
                  </div>
                  <div className="flex items-center cursor-pointer hover:bg-light-gray space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6" onClick={handleDislike}>
                    {disliked && !updating && <AiFillDislike className="text-blue-700" />}
                    {!disliked && !updating && <AiFillDislike className="text-gray-400" />}
                    {updating && <AiOutlineLoading3Quarters className='animate-spin'/>}
                    <span className="text-xs">{currentProblem.dislikes}</span>
                  </div>
                  <div className="cursor-pointer hover:bg-light-gray rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 " onClick={handleStar}>
                    {starred && !updating && <TiStarFullOutline className='text-yellow-500'/>}
                    {!starred && !updating && <TiStarOutline className='text-gray-400'/>}
                    {updating && <AiOutlineLoading3Quarters className='animate-spin'/>}
                  </div>
                </div>
              )}

              {loading && (
                <div className="mt-3 flex space-x-2">
                  <RectangleSkeleton />
                  <CircleSkeleton />
                  <RectangleSkeleton />
                  <RectangleSkeleton />
                  <CircleSkeleton />
                </div>
              )}
              {/* Problem Statement(paragraphs) */}
              <div className="text-dark-gray text-sm">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
                />
              </div>

              {/* Examples */}
              <div className="mt-4">
                {/* Example 1 */}
                {problem.examples.map((example, index) => (
                  <div key={example.id}>
                    <p className="font-medium text-dark-gray">
                      Example {index + 1}:{" "}
                    </p>
                    {example.img && (
                      <>
                        <img
                          src={example.img}
                          alt="example image"
                          className="mt-4"
                        />
                      </>
                    )}
                    <div className="example-card">
                      <pre>
                        <strong className="text-dar-dark-gray">Input: </strong>{" "}
                        {example.inputText} <br />
                        <strong>Output:</strong> {example.outputText} <br />
                        {example.explanation && (
                          <>
                            <strong>Explanation:</strong>
                            {example.explanation}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="my-8 pb-4">
                <div className="text-dark-gray text-sm font-medium">
                  Constraints:
                </div>
                <ul className="text-dark-gray ml-5 list-disc">
                  <div
                    dangerouslySetInnerHTML={{ __html: problem.constraints }}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

function useGetCurrentProblem(problemId){
  const [currentProblem,setCurrentProblem] = useState(null)
  const [loading,setLoading] = useState(true)
  const [problemDifficultyClass,setProblemDifficultyClass] = useState("")
  useEffect(()=>{
    //Get Problem from database
    async function getGetCurrentProblem(){
      setLoading(true)
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data()
        setCurrentProblem({id:docSnap.id,...problem})
        setProblemDifficultyClass(
          problem.difficulty==="Easy"?"bg-olive":problem.difficulty==="Medium"?"bg-yellow-500":"bg-red-500"
        )
      }
      setLoading(false)
    }
    getGetCurrentProblem()
  },[problemId])

  return {currentProblem, loading, problemDifficultyClass, setCurrentProblem}
}

function useGetUsersDataOnProblem(problemId){
  const[data,setData] = useState({liked:false,disliked:false,starred:false,solved:false})
  const [user] = useAuthState(auth)
  useEffect(()=>{
    async function getGetUsersDataOnProblem(){
      const userRef = doc(firestore,"users",user?.uid)
      const userSnap = await getDoc(userRef)
      if(userSnap.exists()){
        const data = userSnap.data()
        const {solvedProblems,likedProblems,dislikedProblems,starredProblems} = data
        setData({
          liked:likedProblems.includes(problemId),
          disliked:dislikedProblems.includes(problemId),
          starred:starredProblems.includes(problemId),
          solved:solvedProblems.includes(problemId)
        })
      }
    }
    if(user)getGetUsersDataOnProblem()
    return()=>setData({liked:false,disliked:false,starred:false,solved:false})
  },[problemId,user])

  return {...data,setData}
}