import TopBar from "@/components/TopBar";
import React from "react";
import { problems } from "@/mockProblems/problems";
export default function A01() {
  const currentArticleId = "A01";
  const problem = problems.find((p) => p.articleId === currentArticleId);
  return (
    <>
      <TopBar />
      <h1 className="font-inter text-2xl text-left text-dark-gray font-medium uppercase mt-10 mb-5 ml-50">
        {`${problem.title}`}
      </h1>
    </>
  );
}
