import { InformationCircleIcon } from "@heroicons/react/outline";
import { AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
import { renderPlatformIcons, renderStoreIcons } from "../constants/gameConst";
import { Game, Games, Genres, Movie } from "../typings";
import Link from "next/link";
import { CgGames } from "react-icons/cg";

interface Props {
  genres: Genres[];
  title: string
}

function CardComponent({ genres, title }: Props) {
  const [dark, setDark] = useRecoilState(darkState);
  const router = useRouter();
  const { game } = router.query;
  const [movie, setMovie] = useState<Movie>();
  const [games, setGames] = useState<Game>();
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showStore, setShowStore] = useState(false);

  return (
    <>
      <h1
        className={`text-7xl text-center pb-16 font-extrabold ${
          dark ? "" : "text-black"
        }`}>
        {title}
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-12 ">
        {genres.map((genre) => (
          <div className="bg-gradient-to-b-light">
            <div className="relative w-[350px] h-[400px] md:w-[300px] md:h-[350px]  opacity-50 rounded">
              <Image
                className="object-cover rounded "
                src={genre?.image_background}
                fill
                alt="genre image"
              />
              <div
                className={`absolute h-full w-full ${
                  dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
                }`}>
                <div
                  className={`relative pt-32 flex items-center justify-center flex-col`}>
                 
                    <h2
                      className={`absolute top-0 w-full h-full flex items-center justify-center text-4xl ${
                        dark ? "" : "text-black"
                      } `}> <Link href={`/genres/${genre?.slug}`}>
                      <span className=" font-bold underline hover:cursor-pointer text-center">
                        {genre?.name}
                      </span></Link>
                    </h2>
                  
                  <button onClick={() => router.push(`/genres/${genre?.slug}`)}
                    className={`z-30 mt-8 rounded bg-black px-8 py-2 text-center hover:bg-[#5156e5]  ${
                      dark ? "bg-black" : "bg-white text-black hover:text-white"
                    }`}>
                    See More
                  </button>
                </div>
                <div
                  className={`absolute bottom-0 space-y-3 w-full  pb-4 ${
                    dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
                  }`}>
                  <div
                    className={`border-b border-gray-700 w-full px-2 ${
                      dark ? "" : "invert border-white"
                    }`}>
                    <p className="relative w-full h-full flex items-center justify-between">
                      Total Games:{" "}
                      <span className="flex items-center">
                        {genre?.games_count} <CgGames className="ml-1" />
                      </span>
                    </p>
                  </div>
                  <div className={`${dark ? "" : "invert"} px-2`}>
                    <div className="w-full flex flex-col space-y-2">
                      {genre?.games
                        ?.map((game: Games) => (
                          <>
                            <Link href={`/${game.id}`}>
                              <div className="flex items-center justify-between h-6 ">
                                <p className="underline hover:cursor-pointer">
                                  {game.name}{" "}
                                </p>
                                <span className="flex items-center space-x-1">
                                  {game.added}
                                  <AiOutlineUser />
                                </span>
                              </div>
                            </Link>
                          </>
                        ))
                        .slice(3)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardComponent;
