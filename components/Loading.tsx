import React from 'react'
import { useRecoilValue } from 'recoil';
import { darkState } from '../atoms/statesAtom';

function Loading() {
  const dark = useRecoilValue(darkState)
  return (
    <>
      <div
        className={` rounded-md flex justify-center ml-3 max-w-[300px] mb-12 hover:cursor-pointer ${
          dark ? "bg-[#1d1c1c]" : " bg-slate-200"
        } items-center`}>
        <div className="relative flex flex-col justify-center group">
          <div
            className=" relative group h-28 min-w-[300px] cursor-pointer 
          transition duration-200 ease-in-out ">
            <div
              className={`w-full h-full ${
                dark ? "bg-slate-200" : "bg-[#1d1c1c]"
              } rounded-md`}></div>
          </div>
          <div
            className={`flex justify-between pt-6 mx-2 ${
              !dark ? "text-black" : ""
            }`}>
            <div
              className={`flex justify-between w-32 ${
                dark ? "bg-slate-200" : "bg-[#1c1d1d]"
              } rounded-m`}></div>
            <div
              className={`w-6 h-6 ${
                dark ? "bg-slate-200" : "bg-[#1d1c1c]"
              }`}></div>
          </div>
          <div
            className={`flex justify-between pt-6 mx-2 mb-6 ${
              !dark ? "text-black" : ""
            }`}>
            <div
              className={`flex justify-between w-full ${
                dark ? "bg-slate-200" : "bg-[#1c1d1d]"
              } rounded-m`}></div>
            <div
              className={`w-6 h-6 ${
                dark ? "bg-slate-200" : "bg-[#1d1c1c]"
              }`}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading