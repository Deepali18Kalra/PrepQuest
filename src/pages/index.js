import Navbar from "@/components/Navbar"
import AuthModal from "@/components/AuthModal"
import {authModalState} from '@/atoms/authModalAtom'
import {useRecoilValue,useSetRecoilState} from 'recoil'
import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from '@/firebase/firebase'
import {useRouter} from 'next/router'
import { useState, useEffect } from "react"
import Image from 'next/image'
import Footer from "@/components/Footer"
import Card from "@/components/Card"
export default function Home() {
  const authModal = useRecoilValue(authModalState);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const setAuthModalState = useSetRecoilState(authModalState)
  useEffect(() => {
    if (user) {
      router.push("/dsa");
    }
    if (!loading && !user) {
      setPageLoading(false);
    }
  }, [user, router, loading]);

  function handleClick(){
    setAuthModalState((prev)=>({...prev,isOpen:true,type:"login"}))
  }
  // Example Card Data for the updated topics
  const cardData = [
    {
      title: "Data Structures & Algorithms",
      description:
        "Learn the core data structures and algorithms essential for coding interviews.",
      link: "dsa",
    },
    {
      title: "Full Stack Development",
      description:
        "Master both frontend and backend development using modern tools and frameworks.",
      link: "full-stack-development",
    },
    {
      title: "SQL",
      description:
        "Get hands-on experience with SQL queries and database design concepts.",
      link: "sql",
    },
    {
      title: "System Design",
      description:
        "Learn to design scalable and high-performance systems for large applications.",
      link: "system-design",
    },
    {
      title: "Python",
      description:
        "Dive into Python programming for both web development and data science.",
      link: "python",
    },
    {
      title: "Java",
      description:
        "Master Java programming concepts and build enterprise-level applications.",
      link: "java",
    },
  ];

  if (pageLoading) return null;
    return (
      <div className="bg-white h-screen relative font-inter">
        <div className="max-w-7xl mx-auto">
          <Navbar />

          <div className="hero text-inter max-w-7xl flex md:flex-row flex-col items-center my-0 mx-auto gap-8 sm:px-12 px-4 md:px-16 lg:px-24 md:justify-between md:mt-8 py-8">
            <div className="content-left text-center flex flex-col my-17 md:text-left gap-8">
              <p className="text-primary-color text-sm font-semibold">
                Smarter interview prep, sharper results
              </p>
              <h2 className="text-4xl font-bold">Welcome to PrepQuest</h2>
              <p className="text-gray text-sm font-medium">
                PrepQuest isn’t just another coding platform it’s your
                personal roadmap to interview success. What sets us apart? We
                don’t just give you problems to solve we track your expertise
                across key interview domains through frequent assessments and
                personalized feedback. Know exactly where you stand, what to
                improve, and how ready you are every step of the way.
              </p>
              <button className="mt-8 rounded-md py-2 px-6 font-inter font-medium text-sm transition-all bg-primary-color text-background-color hover:bg-button button-shadow w-fit self-center md:self-start" onClick={handleClick}>
                Start Now
              </button>
            </div>
            <div className="content-right">
              <div className="img-container">
                <Image src="/hero_pic.png" width={2600} height={2600}></Image>
                {/* <img src="/hero_pic.png" className=""></img> */}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="text-center">
              <h1 class="text-lg font-bold text-dark-gray relative inline-block group">
                <span>Browse Categories</span>
                <span class="absolute left-0 bottom-0 h-0.5 bg-dark-gray w-0 transition-all duration-300 group-hover:w-full"></span>
              </h1>
            </div>
          </div>
          <div className="hero text-inter max-w-7xl flex md:flex-row flex-col items-center my-0 mx-auto gap-8 sm:px-12 px-4 md:px-16 lg:px-24 md:justify-between md:mt-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  description={card.description}
                  link={card.link}
                />
              ))}
            </div>
          </div>
          <hr className="bg-dark-gray text-dark-gray"></hr>
          <Footer />
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    );
}
