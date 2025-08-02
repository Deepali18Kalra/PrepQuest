import React,{useState,useEffect} from "react";
import Link from "next/link";
import {BsCheckCircle} from 'react-icons/bs'
import { collection, getDocs, orderBy, query} from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
export default function ProblemsTable({setLoadingProblems}){
  const problems = useGetProblems(setLoadingProblems)
    return(
        <tbody className="text-dark-gray">
        {problems.map((problem,idx)=>{
            const difficultyColor = problem.difficulty==="Easy"?"text-dark-green-s" : problem.difficulty==="Medium"?"text-dark-yellow":"text-dark-pink"
            return (
              <tr
                className={`${idx % 2 == 1 ? "bg-light-gray" : ""}`}
                key={problem.id}
              >
                <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                  <BsCheckCircle fontSize={"18"} width="18" />
                </th>
                <td className="px-6 py-4">
                  <Link
                    className="text-dark-gray hover:text-accent-color cursor-pointer"
                    href={`/problems/${problem.id}`}
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className={`px-6 py-4 ${difficultyColor}`}>
                  {problem.difficulty}
                </td>
                <td className={`px-6 py-4`}>{problem.category}</td>
                <td className={`px-6 py-4`}>
                  {problem.articleId ? (
                    <Link
                      className="text-dark-gray hover:text-accent-color cursor-pointer"
                      href={`solutions/${problem.articleId}`}
                    >
                      Check Solution
                    </Link>
                  ) : (
                    <p>Coming Soon</p>
                  )}
                </td>
              </tr>
            );
        })
        }
        </tbody>
    )
}

function useGetProblems(setLoadingProblems) {
	const [problems, setProblems] = useState([]);
  console.log("called")
	useEffect(() => {
		async function getProblems(){
			// fetching data logic
			setLoadingProblems(true);
			const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const temp = []
      querySnapshot.forEach((doc) => {
        temp.push({id:doc.id,...doc.data()})
      });
      setProblems(temp)
      setLoadingProblems(false)
		};

		getProblems();
	}, [setLoadingProblems]);
	return problems;
}
