import {
  ArrowCircleLeftIcon,
  BellIcon,
  BookmarkIcon,
  ClipboardListIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  MoonIcon,
  SearchCircleIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { GiPistolGun } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { darkState, inputState } from "../atoms/darkAtom";
import LogoImage from "../public/assets/2.png";
import SidebarLink from "./SidebarLink";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

function Navbar() {
  const [dark, setDark] = useRecoilState(darkState);
  const [navBar, setNavBar] = useState<boolean>(false);
  const [shadow, setShadow] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState(false);
  const router = useRouter();
  const id = router.asPath;
  const [input, setInput] = useRecoilState(inputState)

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
        // setNavBg("#ecf0f3");
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  function handleNav() {
    setNavBar(!navBar);
  }

  return (
    <div
      className={
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
      }>
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 max-w-[1240px] mx-auto">
        <Link href="/">
          <Image
            src={LogoImage}
            width={100}
            height={100}
            alt="Logo Image"
            className={dark ? "invert pt-4" : "pt-4"}
          />
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
            {/* <Link href="/contact"> */}
            <li
              className={
                dark
                  ? `ml-10 cursor-pointer text-sm uppercase hover:border-b border-b-white ${
                      id === "/contact" ? "text-[#5156e5]" : "text-white"
                    }`
                  : `ml-10 text-sm cursor-pointer uppercase hover:border-b border-b-black ${
                      id === "/contact" ? "text-[#5156e5]" : "text-black"
                    }`
              }>
              contact us
            </li>
            {/* </Link> */}
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
                className={`md:hidden ${dark ? "" : "text-black"}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FOR SMALL DEVICES SIDEBAR */}
      <div
        className={
          navBar
            ? `md:hidden fixed left-0 top-0 w-full h-screen  bg-black/70`
            : ""
        }>
        <div
          className={
            navBar
              ? `fixed top-0 left-0 w-[75%] sm:w-[60%] md:w-[45%]
         h-screen ease-in-out duration-500 ${
           dark ? "bg-[#141414]" : "bg-white"
         }`
              : `fixed top-0 left-[-100%] ease-in duration-500 ${
                  dark ? "bg-[#141414]" : "bg-white"
                }`
          }>
          <div className=" px-2 sm:px-4 md:px-6 -mt-8">
            <div className=" flex w-full items-center justify-between">
              <Link href="/">
                <Image
                  className={`${dark ? "invert" : ""}`}
                  src={LogoImage}
                  width={150}
                  height={100}
                  alt="logo-img"
                />
              </Link>
              <div
                className=" rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
                onClick={handleNav}>
                <AiOutlineClose className={`${dark ? "" : "text-black"}`} />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4 flex items-center justify-center py-2">
              <input
                type="text"
                className="rounded-full bg-black px-4 w-48 outline-none text-white "
                placeholder="Search for Games!"
                value={input}
                onChange={(event) => setInput(event?.target.value)}
              />
              {""}
              <SearchCircleIcon width={30} />
            </div>
          </div>
          <div className="py-4 px-10 flex flex-col ">
            <ul className="uppercase text-left w-24">
              <Link href="/" onClick={handleNav}>
                <li
                  className={
                    dark
                      ? `ml-10 cursor-pointer text-sm uppercase hover:border-b border-b-[#5156e5] ${
                          id === "/" ? "text-[#5156e5]" : "text-white"
                        }`
                      : `ml-10 text-sm uppercase cursor-pointer hover:border-b border-b-[#5156e5] ${
                          id === "/" ? "text-[#5156e5]" : "text-black"
                        }`
                  }>
                  home
                </li>
              </Link>
              <Link href="/genres" onClick={handleNav}>
                <li
                  className={
                    dark
                      ? `ml-10 cursor-pointer text-sm uppercase hover:border-b border-b-[#5156e5] ${
                          id === "/genres" ? "text-[#5156e5]" : "text-white"
                        }`
                      : `ml-10 text-sm uppercase cursor-pointer hover:border-b border-b-[#5156e5] ${
                          id === "/genres" ? "text-[#5156e5]" : "text-black"
                        }`
                  }>
                  genres
                </li>
              </Link>
            </ul>
            <div className="pt-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
