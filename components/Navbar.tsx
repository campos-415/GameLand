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
  SunIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { GiPistolGun } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
import LogoImage from "../public/assets/2.png";
import SidebarLink from "./SidebarLink";

function Navbar() {
  const [dark, setDark] = useRecoilState(darkState);
  const [navBar, setNavBar] = useState<boolean>(false);
  const [shadow, setShadow] = useState<boolean>(false);
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
      if (scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

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
            width={150}
            height={150}
            alt="Logo Image"
            className={dark ? "invert" : ""}
          />
        </Link>
        <div className="">
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
  );
}

export default Navbar;
