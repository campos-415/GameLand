import { InformationCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
import { Game, Genres } from "../typings";
import { useRouter } from "next/router";
interface Props {
  features: Game[] | any
}
function Feature({ features }: Props) {
  const [dark, setDark] = useRecoilState(darkState);
  const [games, setGames] = useState<Game>();
  const router = useRouter()


  useEffect(() => {
    setGames(features[Math.floor(Math.random() * features?.length)]);
  }, [features]);



  return (
    <div className={` relative flex flex-col space-y-2`}>
      <div className="absolute top-0 left-0 h-[35vh] w-full max-w-[1240px]">
        <Image
          className="object-cover"
          src={games?.background_image ?? ""}
          alt="bannerImg"
          fill
        />
      </div>
      <div className={`z-10 pl-10 pt-48`}>
        <h1 className="text-2xl md:text-4xl lg:text-7xl">
          {games?.name || games?.slug}
        </h1>
        <div className="flex space-x-2">
          {games?.genres.map((genre: Genres) => (
          <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl "
          key={genre?.name}>
            {genre?.name}
          </p>
        ))}
        </div>
        

        <div className="flex space-x-3">
          <button
            onClick={() => {
              router.push(`/${games?.id}`)
            }}
            className="bannerButton bg-[gray]/70">
            More Info{" "}
            <InformationCircleIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
          </button>
        </div>
      </div>
    </div>
  );
}


export default Feature;
