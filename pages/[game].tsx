import { InformationCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import esrb_m from "../public/assets/ratings/esrb-m.svg";
import esrb_t from "../public/assets/ratings/esrb-t.svg";
import esrb_e from "../public/assets/ratings/esrb-e.svg";
import esrb_a from "../public/assets/ratings/esrb-a.svg";
import esrb_10 from "../public/assets/ratings/esrb-10.svg";
import React, { useContext, useEffect, useRef, useState } from "react";

import { FaBeer, FaPlay, FaShoppingBag, FaStar } from "react-icons/fa";
import {
  IoLogoAndroid,
  IoLogoApple,
  IoLogoPlaystation,
  IoLogoSteam,
  IoLogoXbox,
} from "react-icons/io";
import { SiNintendoswitch } from "react-icons/si";
import { CgScrollV } from "react-icons/cg";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
import comingSoon from "../public/assets/comingSoon.jpg";
import { Data, Game, Movie, Stores, Video } from "../typings";
import { renderPlatformIcons, renderStoreIcons } from "../constants/gameConst";

function Game() {
  const [dark, setDark] = useRecoilState(darkState);
  const router = useRouter();
  const { game } = router.query;
  const [movie, setMovie] = useState<Movie>();
  const [games, setGames] = useState<Game>();
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showStore, setShowStore] = useState(false);
  console.log(game);

  async function fetchMovie() {
    setLoading(true);
    const [movies, games] = await Promise.all([
      fetch(
        `https://api.rawg.io/api/games/${game}/movies?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
      ).then((res) => res.json()),
      fetch(
        `https://api.rawg.io/api/games/${game}?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
      ).then((res) => res.json()),
    ]);
    setMovie(movies.results);
    setGames(games);

    setLoading(false);
  }

  // FOR THE PLAYER TO AUTOMATICALLY PLAY WHEN HOVERING

  // const videoRef = useRef<any>();

  // useEffect(() => {
  //   const video = videoRef.current;

  //   const handleMouseEnter = () => {
  //     setPlaying(true);
  //   };

  //   const handleMouseLeave = () => {
  //     setPlaying(false);
  //   };

  //   video?.addEventListener("mouseenter", handleMouseEnter);
  //   video?.addEventListener("mouseleave", handleMouseLeave);

  //   return () => {
  //     video?.removeEventListener("mouseenter", handleMouseEnter);
  //     video?.removeEventListener("mouseleave", handleMouseLeave);
  //   };
  // }, []);

  useEffect(() => {
    fetchMovie();
  }, [game]);
  return (
    <>
      <Head>
        <title>Master Player - {games?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`scrollbar-hidden flex flex-col space-y-2 py-16 md:space-y-4 justify-end overflow-x-hidden ${
          dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
        } h-screen`}
        key={games?.id}>
        <div className="absolute top-0 left-0 -z-10 h-screen w-screen overflow-x-hidden">
          <Image
            className="object-cover overflow-x-hidden"
            src={games?.background_image}
            alt="bannerImg"
            fill
            priority
          />
        </div>
        <div className="relative">
          <div className="max-w-[1240px] space-x-4 items-center flex justify-start px-12 ">
            <h1
              className={`${
                !dark ? "text-black" : " "
              } text-2xl md:text-4xl lg:text-7xl `}>
              {games?.name}
            </h1>
          </div>
          <div className="  max-w-[1240px] flex flex-col items-start justify-center px-12 ">
            <div className="flex w-48 text-lg justify-start space-x-1 pt-3 ">
              {renderPlatformIcons(games?.platforms)}
            </div>
          </div>

          <div className="flex space-x-3 px-12 mt-4">
            <button
              className="bannerButton bg-white text-black"
              onClick={() => setShowStore(!showStore)}>
              {" "}
              <FaShoppingBag className="h-4 w-4 text-black md:h-7 md:w-7" /> Buy
            </button>
            <button
              onClick={() => {
                router.push(`/${games?.id}/#info`);
              }}
              className="bannerButton bg-[gray]/70">
              More Info{" "}
              <InformationCircleIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
            </button>
          </div>
          <div className={`${showStore ? "" : "hidden"} px-12 mt-4`}>
            <div className="flex w-48 text-lg justify-start space-x-1 hover:cursor-pointer">
              {renderStoreIcons(games?.stores)}
            </div>
          </div>
        </div>
      </div>
      <div id="info"
        className={` relative top-0 scrollbar-hidden flex flex-col space-y-2 py-16 md:space-y-4 justify-end  ${
          dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
        } h-screen`}>
        <div className="absolute top-0 left-0 -z-10 h-[100vh] w-[100vw] ">
          <Image
            className="object-cover "
            src={games?.background_image_additional}
            alt="bannerImg"
            fill
            priority
          />
        </div>
        <div className="relative">
          <div
            className={` max-w-[1240px] mt-32 space-x-4 items-center flex flex-col justify-start px-12 ${
              showMore ? "flex " : "hidden"
            }`}>
            <p className={`${!dark ? "text-black" : " "} `}>
              {games?.description_raw}
            </p>
          </div>

          <div className=" flex space-x-3 px-12 mt-4">
            {!showMore ? (
              <button
                onClick={() => {
                  setShowMore(true);
                }}
                className="bannerButton bg-[gray]/70">
                More Info{" "}
                <InformationCircleIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowMore(false);
                }}
                className="bannerButton bg-[gray]/70">
                Less Info{" "}
                <InformationCircleIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
              </button>
            )}
          </div>
        </div>

        <div className={` flex justify-start `}>
          {movie ? (
            movie
              ?.map((v: Data) => (
                <>
                  <ReactPlayer
                    url={v?.data?.max}
                    width="100%"
                    heigth="100%"
                    playing={playing}
                    controls
                  />
                </>
              ))
              .slice(7)
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Game;
