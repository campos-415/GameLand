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
import { Data, Game, Movie, Video } from "../typings";

function Game() {
  const [dark, setDark] = useRecoilState(darkState);
  const router = useRouter();
  const id = router.asPath;
  const [movie, setMovie] = useState<Movie>();
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showMore, setShowMore] = useState(false);

  async function fetchMovie() {
    setLoading(true);
    const [movies, games] = await Promise.all([
      fetch(
        `https://api.rawg.io/api/games${id}/movies?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
      ).then((res) => res.json()),
      fetch(
        `https://api.rawg.io/api/games${id}?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
      ).then((res) => res.json()),
    ]);
    setMovie(movies.results);
    setGame(games);

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
  }, []);
  console.log(game);
  return (
    <>
      <Head>
        <title>Master Player - {game?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`scrollbar-hidden flex flex-col space-y-2 py-16 md:space-y-4 justify-end ${
          dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
        } h-screen`}
        key={game?.id}>
        <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
          <Image
            className="object-cover overflow-x--hidden"
            src={game?.background_image}
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
              {game?.name}
            </h1>
            {game?.esrb_rating?.name === "Teen" && (
              <Image src={esrb_t} width={50} height={50} alt="rating" />
            )}
            {game?.esrb_rating?.name === "Mature" && (
              <Image src={esrb_m} width={50} height={50} alt="rating" />
            )}
            {game?.esrb_rating?.name === "Everyone 10+" && (
              <Image src={esrb_10} width={50} height={50} alt="rating" />
            )}
            {game?.esrb_rating?.name === "Everyone" && (
              <Image src={esrb_e} width={50} height={50} alt="rating" />
            )}
            {game?.esrb_rating?.name === "Adults Only" && (
              <Image src={esrb_a} width={50} height={50} alt="rating" />
            )}
          </div>
          <div className="  max-w-[1240px] flex flex-col items-start justify-center px-12 ">
            <p
              className={` max-w-xs text-xs md:max-w-lg md:text-lg lg:text-2xl lg:max-w-2xl  h-[198px] ${
                showMore ? "overflow-scroll" : "overflow-clip"
              }   ${!dark ? "text-black" : ""}`}>
              {game?.description_raw}
            </p>
            {!showMore ? (
              <button
                className={`absolute bottom-[60px] left-0 px-12 text-[#1d9bf0] `}
                onClick={() => setShowMore(true)}>
                Show More
              </button>
            ) : (
              <button
                className={`absolute flex items-center bottom-[60px] left-0 px-12 text-[#1d9bf0]`}
                onClick={() => setShowMore(false)}>
                Show less
                <CgScrollV />
              </button>
            )}
          </div>

          <div className="flex space-x-3 px-12 mt-12">
            <button className="bannerButton bg-white text-black">
              {" "}
              <FaShoppingBag className="h-4 w-4 text-black md:h-7 md:w-7" /> Buy
            </button>
            <button
              onClick={() => {
                router.push(`/${game?.id}/#info`);
              }}
              className="bannerButton bg-[gray]/70">
              More Info{" "}
              <InformationCircleIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
            </button>
          </div>
        </div>

        <div className={` flex justify-start `} >
          {movie ? (
            movie
              ?.map((v: Data) => (
                <>
                  <ReactPlayer
                    url={v?.data?.max}
                    width="100%"
                    heigth="100%"
                    playing
                  />
                </>
              ))
              .slice(7)
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        id="info"
        className={`${!dark ? "bg-[rgb(235,235,235)]" : " "} p-32`}>
        {" "}
        <h2
          className={`sm:text-lg lg:text-2xl  max-w-[1240px] mx-auto text-center mb-8 ${
            !dark ? "text-black" : " "
          }`}>
          ScreenShots
        </h2>
        <div className="flex items-center space-x-3 justify-center max-w-[1240px] mx-auto">
          <Image
            src={game?.background_image}
            width={300}
            height={300}
            alt="/"
          />
          <Image
            src={game?.background_image_additional}
            width={300}
            height={300}
            alt="/"
          />
        </div>
      </div>
    </>
  );
}

export default Game;
