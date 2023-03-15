import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
import LogoImage from "../public/assets/2.png";

function Navbar() {
  const [dark, setDark] = useRecoilState(darkState);
  const [navBar, setNavBar] = useState<boolean>(false);
  const [shadow, setShadow] = useState<boolean>(false);
  const router = useRouter();
  const id = router.asPath;

  console.log(dark);
  return (
    <div
      className={
        dark
          ? `fixed w-full h-20 z-[100] bg-[#141414] mt-8`
          : "fixed w-full h-20 z-[100] bg-white mt-8"
      }>
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <Image src={LogoImage} width={150} height={150} alt="Logo Image" />
        </Link>
        <div>
          <ul
            className={
              dark ? "hidden md:flex text-white" : "hidden md:flex text-black"
            }>
            <li
              className={
                dark
                  ? `ml-10 cursor-pointer text-sm uppercase hover:border-b ${
                      id === "/" ? "text-[#5156e5]" : "text-white"
                    }`
                  : `ml-10 text-sm uppercase cursor-pointer hover:border-b ${
                      id === "/" ? "text-[#5156e5]" : "text-black"
                    }`
              }>
              home
            </li>
            <li
              className={
                dark
                  ? `ml-10 cursor-pointer text-sm uppercase hover:border-b ${
                      id === "/about" ? "text-[#5156e5]" : "text-white"
                    }`
                  : `ml-10 text-sm uppercase cursor-pointer hover:border-b ${
                      id === "/about" ? "text-[#5156e5]" : "text-black"
                    }`
              }>
              about
            </li>
            <li
              className={
                dark
                  ? `ml-10 cursor-pointer text-sm uppercase hover:border-b ${
                      id === "/contact" ? "text-[#5156e5]" : "text-white"
                    }`
                  : `ml-10 text-sm cursor-pointer uppercase hover:border-b ${
                      id === "/contact" ? "text-[#5156e5]" : "text-black"
                    }`
              }>
              contact us
            </li>
            <li className="ml-10 text-sm uppercase cursor-pointer">
              {dark ? (
                <SunIcon
                  width={30}
                  height={30}
                  onClick={() => setDark(!dark)}
                />
              ) : (
                <MoonIcon
                  width={30}
                  height={30}
                  onClick={() => setDark(!dark)}
                  className="text-black"
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <div>
    //   <nav className="fixed">
    //     <div>
    //       <div>
    //         <Image
    //           src="https://moviefinder415.vercel.app/assets/logo.svg"
    //           width={150}
    //           height={150}
    //           alt="Logo image"
    //         />
    //       </div>
    //       {dark ? (
    //         <SunIcon width={50} height={50} onClick={() => setDark(!dark)} />
    //       ) : (
    //         <MoonIcon width={50} height={50} onClick={() => setDark(!dark)}  className="text-black"/>
    //       )}
    //     </div>
    //   </nav>
    // </div>
  );
}

export default Navbar;

// https://moviefinder415.vercel.app/assets/logo.svg
