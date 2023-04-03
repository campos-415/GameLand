import React from "react";
import bgImage from "../public/assets/undrawVR.svg";
import bgImage2 from "../public/assets/undrawController.svg";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { darkState } from "../atoms/statesAtom";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";


function WelcomePage() {
  const dark = useRecoilValue(darkState);
  return (
    <>
      <div className="flex flex-col items-center md:max-w-[1240px] rounded-md p-4">
        <div>
          <div className="flex flex-col items-center justify-center pb-4">
            <h1 className={`${dark ? "" : " text-black"} text-2xl md:text-4xl`}>
              Welcome to <span className="font-bold">Game</span>
              <span className="text-[#5165e5] font-bold">Land</span>
            </h1>
            <h2 className={`${dark ? "" : " text-black"}`}>
              The most updated game library in the web
            </h2>
          </div>

          <div className= {`p-8 bg-[#1d1c1c] rounded-md ${dark ? "bg-[#1d1c1c]" : "bg-slate-200"}`}>
            <div className="relative rounded-md ">
              <figure className="image-container">
                <Image
                  src={bgImage2}
                  
                alt="Welcome Page Image"
                className="image"
                fill
              />
              </figure>
              
            </div>
          </div>
        </div>

        <Link href="#newRelease">
          <div className={`${dark ? "bg-[#1d1c1c] " : "bg-slate-200 text-black"} p-4 rounded-full animate-bounce w-12 mt-8  flex items-center justify-center`}>
            <IoIosArrowDown />
          </div>
        </Link>
      </div>
    </>
  );
}

export default WelcomePage;
