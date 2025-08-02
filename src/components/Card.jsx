import React from "react";
import Link from "next/link";

const Card = ({ title, description, link }) => {
  const color = "text-primary-color"; // Tailwind color class (you control this in your theme)
  const borderColor = "border-primary-color"; // apply thicker border color
  const buttonClasses = `
    px-4 py-2 rounded-md font-medium transition-colors duration-300
    border-2 border-primary-color bg-primary-color text-white
    hover:bg-transparent hover:text-primary-color
  `;

  return (
    <div className="p-[5px] rounded-lg bg-gradient-to-r from-primary-color to-accent-color transition-shadow duration-300 hover:shadow-2xl w-72 h-60">
      <div className="bg-white rounded-lg h-full w-full p-6 font-inter flex flex-col justify-between shadow-md">
        <div>
          <h2 className="text-xl font-semibold text-center mb-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-4 flex-grow flex justify-center items-center text-center">
            {description}
          </p>
        </div>
        <div className="flex justify-center mt-auto">
          <Link href={`/${link}`}>
            <button className={buttonClasses}>Explore</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
