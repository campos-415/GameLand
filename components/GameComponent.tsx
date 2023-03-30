import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Game, Genres, Platform, Stores } from "../typings";
import { useRecoilValue } from "recoil";
import { darkState } from "../atoms/statesAtom";
import Link from "next/link";
import esrb_m from "../public/assets/ratings/esrb-m.svg";
import esrb_t from "../public/assets/ratings/esrb-t.svg";
import esrb_e from "../public/assets/ratings/esrb-e.svg";
import esrb_a from "../public/assets/ratings/esrb-a.svg";
import esrb_10 from "../public/assets/ratings/esrb-10.svg";
import { renderPlatformIcons } from "../constants/gameConst";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import { toast, Toaster } from "react-hot-toast";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import Loading from "./Loading";

interface Props {
  games: Game;
}

const toastStyle = {
  backgound: "white",
  color: "black",
  fontWheigth: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
};
const getMetacriticClassName = (metacritic?: number | string) => {
  if (metacritic === undefined) {
    return "text-blue-500 border-blue-500";
  }

  if (metacritic <= 64) {
    return "text-red-500 border-red-500";
  }

  if (metacritic >= 65 && metacritic <= 84) {
    return "text-yellow-500 border-yellow-500";
  }

  if (metacritic >= 75) {
    return "text-green-500 border-green-500";
  }
  if (metacritic === "N/A") {
    return "text-blue-500 border-blue-500";
  }

  return "";
};

const esrbImages: { [key: string]: string } = {
  Teen: esrb_t,
  Mature: esrb_m,
  "Everyone 10+": esrb_10,
  Everyone: esrb_e,
  "Adults Only": esrb_a,
  "Rating Pending": esrb_e,
};

function GameComponent({ games }: Props) {
  const dark = useRecoilValue(darkState)
  const [game, setGame] = useState<Game>();
  const [gameList, setGameList] = useState<DocumentData[] | any | Game>();
  const [gameListId, setGameListId] = useState<DocumentData[] | string[]>();
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setGame(games);
  }, []);

  //GETTING MYLIST OF GAMES FROM THE DATABASE
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "users", user.uid, "myList"),
        (snapshot) => (
          setGameList(snapshot.docs),
          setGameListId(snapshot.docs.map((doc) => doc.id))
        )
      );
    }
  }, [db, game?.id]);

  // CHECKING TO SEE IF THE GAME IS IN THE MYLIST AND CHECKING THE MARK FOR THE GAME IF IT IS
  useEffect(() => {
    setAddedToList(
      gameListId?.findIndex((result: any) => result == game?.id) !== -1
    );
  }, [gameList]);

  //FUNCTION TO ADD OR DELETE GAMES OF MYLIST COLLECTION
  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "users", user!.uid, "myList", game?.id.toString()!)
      );
      setAddedToList(false);

      toast(`${game?.name} has been removed from My List ❌`, {
        duration: 8000,
        style: toastStyle,
      });
    } else {
      await setDoc(
        doc(db, "users", user!.uid, "myList", game?.id.toString()!),
        { ...game }
      );
      setAddedToList(true);

      toast(`${game?.name} has been added to My List ✅`, {
        duration: 8000,
        style: toastStyle,
      });
    }
  };

  return (
    <>
      <Link href={`/mylist`}>
        <Toaster position="bottom-center" />
      </Link>

      {games ? (
        <div
          className={` rounded-md flex justify-center ml-3 group mb-8 ${
            dark
              ? "bg-[#1d1c1c] shadow-slate-200 shadow-lg"
              : " bg-slate-200 shadow-[#141414] shadow-lg"
          } items-center`}>
          <div className=" relative flex flex-col justify-center ">
            <div className="relative h-48 min-w-[300px] transition duration-200 ease-in-out ">
              <Image
                className="rounded-t-md object-cover group-hover:blur-sm overflow-hidden"
                src={games?.background_image}
                fill
                alt="/"
                sizes="small"
                priority
              />
            </div>
            <div
              className={`flex justify-between pt-6 mx-2 ${
                !dark ? "text-black" : ""
              }`}>
              <div className="flex text-lg justify-start space-x-1 ">
                {renderPlatformIcons(games?.platforms)}
              </div>
              <div className="flex space-x-2  ">
                <div className="w-full h-auto">
                  {games?.esrb_rating?.name && (
                    <Image
                      src={esrbImages[games?.esrb_rating?.name]}
                      width={30}
                      height={30}
                      alt="rating"
                      className="w-[30px] h-[30px]"
                    />
                  )}
                </div>
                <p
                  className={`px-1 border flex items-center ${getMetacriticClassName(
                    games?.metacritic
                  )}`}>
                  {games?.metacritic ?? "N/A"}
                </p>
              </div>
            </div>
            <div
              className={`mx-2 flex items-center space-x-1 ${
                !dark ? "invert" : ""
              } pb-8`}>
              <Link href={`/${games?.id}`}>
                <h1 className="overflow-clip max-w-[250px] hover:cursor-pointer hover:underline max-h-[25px] font-bold ">
                  {games?.name}
                </h1>
              </Link>
              <button onClick={handleList}>
                {addedToList ? (
                  <CheckCircleIcon width={30} height={30} />
                ) : (
                  <PlusCircleIcon width={30} height={30} />
                )}
              </button>
            </div>
            <div
              className={`absolute  bottom-0 -z-10 group-hover:z-30   group-hover:translate-y-[-100px] overflow-scroll scrollbar-hide h-52
               transition-all duration-300 ease-in-out rounded-t-md ${
                 dark
                   ? "bg-[#141414c0] text-[#5156e5]"
                   : " bg-[rgba(226,232,240,0.54)] text-[#5156e5] "
               }  w-full px-2  `}>
              <p className="text-sm flex items-center justify-between border-b pt-4 border-gray-600 mb-3">
                Released Date:{" "}
                <span
                  className={`px-1 text-xs ${
                    dark ? "text-white" : "text-black"
                  }`}>
                  {games?.released}
                </span>
              </p>
              <div className="flex justify-between border-b border-gray-600 mb-3 space-x-2">
                <p className=" items-center">Genres: </p>
                <div>
                  {games?.genres.map((genre: Genres) => (
                    <span
                      className={`px-1 text-xs  ${
                        dark ? "text-white" : "text-black"
                      }`}
                      key={genre?.id}>
                      {genre?.name}
                      {", "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-600 mb-3 space-x-2">
                <p className=" items-center">Platforms: </p>
                <div className="">
                  {games?.platforms.map((plat: Platform) => (
                    <span
                      className={`px-1 text-xs ${
                        dark ? "text-white" : "text-black"
                      }`}
                      key={plat?.id}>
                      {plat?.platform.name}
                      {", "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-600 mb-3 space-x-2">
                <p className=" items-center">Stores: </p>
                <div className="">
                  {games?.stores?.map((store: Stores) => (
                    <span
                      className={`px-1 text-xs  ${
                        dark ? "text-white" : "text-black"
                      }`}
                      key={store?.id}>
                      {store?.store?.name}
                      {", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default GameComponent;
