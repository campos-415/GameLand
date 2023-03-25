import { MoonIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { HiOutlineLightBulb } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { darkState, inputState, sideBarState } from "../atoms/darkAtom";
import LogoImage from "../public/assets/2.png";
import { AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const [dark, setDark] = useRecoilState(darkState);
  const [sideBar, setSideBar] = useRecoilState<boolean>(sideBarState);

  const [shadow, setShadow] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState(false);
  const router = useRouter();
  const id = router.asPath;
  const [input, setInput] = useRecoilState(inputState);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleShadow = () => {
      const scrollY = window.scrollY;
      if (scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  useEffect(() => {
    const handleShadow = () => {
      const scrollY = window.scrollY;
      if (scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  function handleNav() {
    setSideBar(!sideBar);
  }

  return (
    <div
      className={` ${id === "/login" && "hidden"} ${
        sideBar ? "hidden" : "fixed"
      } 
        ${
          dark
            ? `${
                shadow
                  ? `fixed w-full h-20 shadow-lg shadow-[#5156e5] z-[100] ${
                      isScroll ? "bg-[#141414]" : "bg-transparent"
                    } mt-8`
                  : `fixed w-full h-20 z-[100] bg-transparent mt-8`
              }`
            : `${
                shadow
                  ? `fixed w-full h-20 shadow-lg shadow-[#5156e5] z-[100] ${
                      isScroll ? "bg-white" : "bg-transparent"
                    } mt-8`
                  : `fixed w-full h-20 z-[100] bg-transparent mt-8`
              }`
        }
      `}>
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 max-w-[1240px] mx-auto">
        <Link href="/">
          <div className="flex items-center absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6">
            <h1 className="text-2xl font-bold">
              <span className={`${dark ? "" : "text-black"}`}>Game</span>
              <span className="text-[#5165e5]">Land</span>
            </h1>
          </div>
        </Link>
        <div className=" flex items-center justify-between space-x-3">
          <ul
            className={
              dark
                ? "hidden md:flex text-white  items-center justify-center"
                : "hidden md:flex text-black  items-center justify-center"
            }>
            <Link href="/">
              <li
                className={
                  dark
                    ? `ml-10 cursor-pointer text-sm uppercase hover:border-b border-b-white ${
                        id === "/" ? "text-[#5156e5]" : "text-white"
                      }`
                    : `ml-10 text-sm uppercase cursor-pointer hover:border-b border-b-black ${
                        id === "/" ? "text-[#5156e5]" : "text-black"
                      }`
                }>
                home
              </li>
            </Link>
            <Link href="/genres">
              <li
                className={
                  dark
                    ? `ml-10 cursor-pointer text-sm uppercase hover:border-b border-b-white ${
                        id === "/genres" ? "text-[#5156e5]" : "text-white"
                      }`
                    : `ml-10 text-sm uppercase cursor-pointer hover:border-b border-b-black ${
                        id === "/genres" ? "text-[#5156e5]" : "text-black"
                      }`
                }>
                Genres
              </li>
            </Link>
            <Link href="/platforms">
              <li
                className={
                  dark
                    ? `ml-10 cursor-pointer text-sm uppercase hover:border-b border-b-white ${
                        id === "/platforms" ? "text-[#5156e5]" : "text-white"
                      }`
                    : `ml-10 text-sm cursor-pointer uppercase hover:border-b border-b-black ${
                        id === "/platforms" ? "text-[#5156e5]" : "text-black"
                      }`
                }>
                Platforms
              </li>
            </Link>
            <Link href="/creators">
              <li
                className={
                  dark
                    ? `ml-10 cursor-pointer text-sm uppercase hover:border-b border-b-white ${
                        id === "/creators" ? "text-[#5156e5]" : "text-white"
                      }`
                    : `ml-10 text-sm cursor-pointer uppercase hover:border-b border-b-black ${
                        id === "/creators" ? "text-[#5156e5]" : "text-black"
                      }`
                }>
                creators
              </li>
            </Link>
          </ul>
          <div className="flex justify-between items-center space-x-2">
            {dark ? (
              <HiOutlineLightBulb size={25} onClick={() => setDark(!dark)} />
            ) : (
              <MoonIcon
                width={25}
                height={25}
                onClick={() => setDark(!dark)}
                className="text-black"
              />
            )}
            <div onClick={handleNav}>
              <AiOutlineMenu
                size={25}
                className={` ${dark ? "" : "text-black"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
