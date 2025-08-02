import React,{useState} from "react";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import useHasMounted from "@/hooks/useHasMounted";
// import { doc, setDoc } from "firebase/firestore";
// import { firestore } from "@/firebase/firebase";
export default function Dsa() {
  const [loadingProblems,setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted()
  if(!hasMounted)return null
  // const [inputs,setInputs] = useState({
  //   id:'',
  //   title:'',
  //   category:'',
  //   difficulty:'',
  //   articleId:'',
  //   link:'',
  //   order:0,
  //   likes:0,
  //   dislikes:0,
  // })

  // function handleInputChange(e){
  //   setInputs({...inputs,
  //     [e.target.name]:e.target.value
  //   })
  // }

  // console.log(inputs)

  // async function handleSubmit(e){
  //   e.preventDefault()
  //   //convert inputs.order to integer
  //   const newProblem = {
  //     ...inputs,
  //     order:Number(inputs.order),
  //   }
  //   await setDoc(doc(firestore, "problems", inputs.id),newProblem);
  //   alert("saved to db")
  // }
  return (
    <>
      <div className="bg-background-color min-h-screen font-inter">
        <TopBar />
        <h1
          className="text-2xl text-center text-primary-color font-medium
					uppercase mt-10 mb-5"
        >
          &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
        </h1>
        <div className="relative mx-auto overflow-x-auto px-6 py-10">
          {loadingProblems && (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              {[...Array(10)].map((_, idx) => <LoadingSkeleton key={idx} />)}
            </div>
          )}
          <table className="text-sm text-left text-dark-gray sm:w-7/12 w-full max-w-[1200px] mx-auto">
            {!loadingProblems && (
            <thead className="text-xs text-gray-700 uppercase border-b ">
              <tr>
                <th scope="col" className="px-1 py-3 w-0 font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Difficulty
                </th>

                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Solution
                </th>
              </tr>
            </thead>
            )}
            <ProblemsTable setLoadingProblems={setLoadingProblems}/>
          </table>
        </div>

        {/* <form className="flex flex-col p-6 max-w-sm gap-3" onSubmit={handleSubmit}>
            <input onChange={handleInputChange}type="text" placeholder="problem id" name="id" className="border-2"/>
            <input onChange={handleInputChange}type="text" placeholder="title" name="title" className="border-2"/>
            <input onChange={handleInputChange}type="text" placeholder="category" name="category" className="border-2"/>
            <input onChange={handleInputChange}type="text" placeholder="difficulty" name="difficulty" className="border-2"/>
            <input onChange={handleInputChange}type="text" placeholder="articleId?" name="articleId" className="border-2"/>
            <input onChange={handleInputChange}type="text" placeholder="link?" name="link" className="border-2"/>
            <input onChange={handleInputChange}type="text" placeholder="order" name="order" className="border-2"/>
            <button className="bg-dark-gray text-white rounded-lg">Save to db</button>
          </form> */}
      </div>
    </>
  );
}
function LoadingSkeleton(){
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-gray-300"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-gray-300"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-gray-300"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-gray-300"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
