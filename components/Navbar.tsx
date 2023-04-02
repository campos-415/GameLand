import { MoonIcon } from "@heroicons/react/outline";
import { HiOutlineLightBulb } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { darkState, sideBarState } from "../atoms/statesAtom";
import { AiOutlineMenu } from "react-icons/ai";
import { UserIcon } from "@heroicons/react/solid";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

function Navbar() {
  const [dark, setDark] = useRecoilState(darkState);
  const [sideBar, setSideBar] = useRecoilState(sideBarState);
  const { user } = useAuth();
  const User = useUser(user!?.uid);
  const [shadow, setShadow] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const router = useRouter();
  const id = router.asPath;

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
      if (scrollY >= 50) {
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
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 max-w-[1240 mx-auto">
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
            <Link href="/mylist">
              <li
                className={
                  dark
                    ? `ml-10 cursor-pointer text-sm uppercase hover:border-b border-b-white ${
                        id === "/mylist" ? "text-[#5156e5]" : "text-white"
                      }`
                    : `ml-10 text-sm cursor-pointer uppercase hover:border-b border-b-black ${
                        id === "/mylist" ? "text-[#5156e5]" : "text-black"
                      }`
                }>
                My List
              </li>
            </Link>
            <Link href="/user">
              <li
                className={
                  dark
                    ? `ml-10 cursor-pointer text-sm uppercase hover:border-b border-b-white ${
                        id === "/user" ? "text-[#5156e5]" : "text-white"
                      }`
                    : `ml-10 text-sm cursor-pointer uppercase hover:border-b border-b-black ${
                        id === "/user" ? "text-[#5156e5]" : "text-black"
                      }`
                }>
                <div className="flex justify-between items-center mr-4">
                  {User?.userImage ? (
                    <>
                      <div
                        className={`${
                          dark ? "text-white" : "text-black"
                        } text-[#d9d9d9] flex items-center justify-center mt-auto hover:cursor-pointer ml-auto xl:-mr-5`}
                        onClick={() => router.push(`/user`)}>
                        <img
                          src={User?.userImage}
                          className="h-10 w-10 rounded-full xl:mr-2.5 object-cover mr-1"
                          alt="userImg"
                        />
                        <div className=" leading-5 ">
                          <h4 className="font-bold text-sm ">
                            {User?.firstName ? (
                              (
                                User?.firstName[0] + User?.lastName[0]
                              ).toString()
                            ) : (
                              <></>
                            )}
                          </h4>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <UserIcon
                        width={25}
                        height={25}
                        className={`hover:cursor-pointer ml-2 ${
                          dark ? "" : "text-black"
                        }`}
                        onClick={() => router.push("/user")}
                      />
                      <div className=" leading-5 ">
                        <h4 className="font-bold text-sm">
                          {User?.firstName ? (
                            (User?.firstName[0] + User?.lastName[0]).toString()
                          ) : (
                            <></>
                          )}

                        </h4>
                      </div>
                    </>
                  )}
                </div>
              </li>
            </Link>
          </ul>
          <div className="flex justify-between items-center space-x-2">
            {dark ? (
              <HiOutlineLightBulb
                className="hover:cursor-pointer"
                size={25}
                onClick={() => setDark(!dark)}
              />
            ) : (
              <MoonIcon
                width={25}
                height={25}
                onClick={() => setDark(!dark)}
                className=" hover: cursor-pointer text-black"
              />
            )}
            <div onClick={handleNav}>
              <AiOutlineMenu
                size={25}
                className={`hover:cursor-pointer ${dark ? "" : "text-black"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
