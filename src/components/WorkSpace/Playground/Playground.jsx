import React,{useState} from 'react'
import PreferenceNav from './PreferenceNav/PreferenceNav'
import Split from 'react-split'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeLight } from '@uiw/codemirror-theme-vscode'
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from './EditorFooter/EditorFooter'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/firebase/firebase'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { problems } from '@/utils/problems'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

export default function Playground({problem,setSuccess,setSolved}){
    const [activeTestCaseId,setActiveTestCaseId] = useState(0)
    const [userCode,setUserCode]=useState(problem.starterCode)
    const boilerPlate = problem.starterCode
    const[user]=useAuthState(auth)
    const {query : {pid} } = useRouter()
    async function handleSubmit(){
      if(!user){
        toast.error("Please login to submit your code",{position:"top-center",autoClose:3000})
        return
      }
      try{
        const cb = new Function(`return ${userCode}`)()
        const success = problems[pid].handlerFunction(cb)
        if(success){
          toast.success("Congrats! All tests passed!",{position:"top-center",autoClose:3000})
          setSuccess(true)
          setTimeout(()=>{
            setSuccess(false)
          },4000)

          const userRef = doc(firestore,"users",user.uid)
          await updateDoc(userRef,{
            solvedProblems:arrayUnion(problem.id)
          })
          setSolved(true)
        }
      }
      catch(error){
        if(error.message.startsWith("AssertionError")){
          toast.error("Oops! one or more test cases failed",{position:"top-center",autoClose:3000})
        }
        else{
          toast.error(error.message,{position:"top-center",autoClose:37000})
        }
      }
    }

    function handleCodeChange(value){
      setUserCode(value)
    }
    return (
      <div className="flex flex-col relative overflow-x-hidden">
        <PreferenceNav />
        <Split
          className="h-[calc(100vh-94px)]"
          direction="vertical"
          sizes={[60, 40]}
          minSize={60}
        >
          <div className="w-full overflow-auto">
            <CodeMirror
              value={boilerPlate}
              theme={vscodeLight}
              onChange={handleCodeChange}
              extensions={[javascript()]}
              style={{ fontSize: 16 }}
            />
          </div>
          <div className="w-full px-5 overflow-auto">
            {/* testcase heading */}
            <div className='flex h-10 items-center space-x-6'>
                <div className="relative flex h-full flex-col justify-center cursor-pointer">
                    <div className="text-sm font-semibold leading-5 text-dark-gray">Testcases</div>
                    <hr className = "absolute bottom-0 h-0.5 w-16 rounded-full border-none bg-dark-gray"/>
                </div>
            </div>

            <div className="flex">
                {/* Test Case Buttons */}
                {problem.examples.map((example,index)=>(
                <div className="mr-2 mt-2 items-start text-white" key={example.id} onClick={()=>{setActiveTestCaseId(index)}}>
                    <div className="flex flex-wrap items-center gap-y-4">
                        <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-primary-color hover:bg-accent-color hover:text-white relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${activeTestCaseId===index?"bg-primary-color/20 text-primary-color":""}`}>
                            Case {index+1}
                        </div>
                    </div>
                </div>
                ))}
            </div>

            <div className="font-semibold my-4">
                <p className='text-sm font-semibold mt-4 text-dark-gray'>Input:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-light-gray border-transparent mt-2 text-dark-gray">
                    {problem.examples[activeTestCaseId].inputText}
                </div>
                <p className='text-sm font-semibold mt-4 text-dark-gray'>Output:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-light-gray border-transparent mt-2 text-dark-gray">
                    {problem.examples[activeTestCaseId].outputText}
                </div>
            </div>
          </div>
        </Split>
        <EditorFooter handleSubmit={handleSubmit}/>
      </div>
    );
}