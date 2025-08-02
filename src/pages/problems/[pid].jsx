import React from 'react'
import TopBar from '@/components/TopBar'
import WorkSpace from '@/components/WorkSpace/WorkSpace'
import { problems } from '@/utils/problems'
import { notFound } from 'next/navigation'
import useHasMounted from '@/hooks/useHasMounted'
export default function ProblemPage({problem}){
    const hasMounted = useHasMounted()
    // console.log(problem)
    if(!hasMounted)return null
    return(
        <>
            <TopBar problemPage={true}/>
            <WorkSpace problem={problem}/>
        </>
    )
}

//fetch the local problem data
//Static Side Generation (the problem page will be created on the server and then passed to the browser)
//getStaticPaths=>used for creating dynamic routes on server side
export async function getStaticPaths(){
    const paths = Object.keys(problems).map((key)=>({
        params:{pid:key}
    }))

    return {
        paths,
        fallback: false
    }
}

//getStaticProps => it fetches the data

export async function getStaticProps({params}){
    const {pid} = params
    const problem = problems[pid]

    if(!problem){
        return{
            notFound:true
        }
    }

    //getStaticProps returns json data and funcion isn't json serializable
    problem.handlerFunction = problem.handlerFunction.toString()
    return{
        props:{
            problem
        }
    }
}