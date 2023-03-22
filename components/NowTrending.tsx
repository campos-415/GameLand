import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  SiNintendo3Ds,
  SiNintendoswitch,
  SiPlaystation3,
  SiPlaystation4,
  SiPlaystation5,
  SiPlaystationvita,
  SiWii,
  SiWiiu,
} from "react-icons/si";
import { TiVendorMicrosoft } from "react-icons/ti";
import { RiXboxLine } from "react-icons/ri";
import {
  IoLogoAndroid,
  IoLogoApple,
  IoLogoPlaystation,
  IoLogoSteam,
  IoLogoXbox,
} from "react-icons/io";
import { Game, Genres, Platform, Stores } from "../typings";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
import Link from "next/link";
import esrb_m from "../public/assets/ratings/esrb-m.svg";
import esrb_t from "../public/assets/ratings/esrb-t.svg";
import esrb_e from "../public/assets/ratings/esrb-e.svg";
import esrb_a from "../public/assets/ratings/esrb-a.svg";
import esrb_10 from "../public/assets/ratings/esrb-10.svg";

interface Props {
  games: Game;
}

function NowTrending({ games }: Props) {
  const [dark, setDark] = useRecoilState(darkState);
  const [platforms, setPlatforms] = useState({});
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<Game>();
  const [score, setScore] = useState();



  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setGame(games);
    }, 500);
    setLoading(true);
  }, []);


  return (
    <Link href={`/${games?.id}`}>
      {!loading ? (
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
      ) : (
        <div
          className={` rounded-md flex justify-center ml-3  mb-12 hover:cursor-pointer ${
            dark ? "bg-[#1d1c1c]" : " bg-slate-200"
          } items-center`}>
          <div className="relative flex flex-col justify-center group">
            <div
              className=" relative group h-28 min-w-[300px]  cursor-pointer 
          transition duration-200 ease-in-out ">
              <Image
                className="rounded-md object-cover md:rounded"
                src={games?.background_image}
                fill
                alt="/"
                sizes="small"
              />
            </div>
            <div
              className={`flex justify-between pt-6 mx-2 ${
                !dark ? "text-black" : ""
              }`}>
              <div className="flex w-48 text-lg justify-start space-x-1 ">
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "PlayStation 5" && <SiPlaystation5 />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "PlayStation 4" && (
                      <IoLogoPlaystation />
                    )
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "PlayStation 3" && <SiPlaystation3 />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "PS Vita" && <SiPlaystationvita />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "Xbox One" && <IoLogoXbox />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "Xbox 360" && <RiXboxLine />
                )}
                {games?.platforms.map(
                  (plat: Platform) => plat.platform.name === "Wii" && <SiWii />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "Wii U" && <SiWiiu />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "Nintendo Switch" && (
                      <SiNintendoswitch />
                    )
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "Nintendo DS" && <SiNintendo3Ds />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "Linux" && <IoLogoSteam />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "PC" && <TiVendorMicrosoft />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "macOS" && <IoLogoApple />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "iOS" && <IoLogoApple />
                )}
                {games?.platforms.map(
                  (plat: Platform) =>
                    plat.platform.name === "Android" && <IoLogoAndroid />
                )}
              </div>
              <div>
                <p
                  className={` px-1 border 
                    ${games?.metacritic <= 64 && `text-red-500 border-red-500`}
                    ${
                      games?.metacritic >= 65 &&
                      games?.metacritic <= 84 &&
                      `text-yellow-500 border-yellow-500`
                    }
                    ${
                      games?.metacritic >= 75 &&
                      `text-green-500 border-green-500`
                    }
                   `}>
                  {games?.metacritic ? games?.metacritic : "N/A"}
                </p>
              </div>
            </div>
            <div className={`mx-2 flex space-x-1 ${!dark ? "invert" : ""}`}>
              <h1 className="overflow-scroll max-w-[250px] max-h-[25px] font-bold ">
                {game?.name}
              </h1>
              {game?.esrb_rating?.name === "Teen" && (
                <Image src={esrb_t} width={20} height={20} alt="rating" />
              )}
              {game?.esrb_rating?.name === "Mature" && (
                <Image src={esrb_m} width={20} height={20} alt="rating" />
              )}
              {game?.esrb_rating?.name === "Everyone 10+" && (
                <Image src={esrb_10} width={20} height={20} alt="rating" />
              )}
              {game?.esrb_rating?.name === "Everyone" && (
                <Image src={esrb_e} width={20} height={20} alt="rating" />
              )}
              {game?.esrb_rating?.name === "Adults Only" && (
                <Image src={esrb_a} width={20} height={20} alt="rating" />
              )}
            </div>
            <br />
            <div
              className={`absolute -bottom-[196px] hidden group-hover:inline  rounded  h-[200px] ${
                dark ? "bg-[#1d1c1c]" : " bg-slate-200 text-black px-2"
              } z-[20] w-full `}>
              <p className="text-sm flex items-center justify-between border-b border-gray-600 mb-3">
                Released Date:{" "}
                <span className="text-[#4a4949] text-xs">{game?.released}</span>
              </p>
              <div className="flex justify-between border-b border-gray-600 mb-3">
                <p className=" items-center">Genres: </p>
                <div>
                  {game?.genres.map((genre: Genres) => (
                    <span
                      className=" text-[#4a4949] text-xs w-full"
                      key={genre?.name}>
                      {genre?.name}
                      {", "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-600 mb-3">
                <p className=" items-center">Platforms: </p>
                <div className="h">
                  {game?.platforms.map((plat: Platform) => (
                    <span
                      className=" px-1 text-[#4a4949] text-xs w-full "
                      key={plat?.name}>
                      {plat?.platform.name}
                      {", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

export default NowTrending;
