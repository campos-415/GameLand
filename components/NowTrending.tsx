import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Game, Genres, Platform, Stores } from "../typings";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
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
import {
  CheckCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";

interface Props {
  games: Game;
}


const toastStyle = {
  backgound: 'white',
  color: 'black',
  fontWheigth: 'bold',
  fontSize: '16px',
  padding: '15px',
  borderRadius: '9999px',
  maxWidth: '1000px',
}
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

function NowTrending({ games }: Props) {
  const [dark, setDark] = useRecoilState(darkState);
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<Game>();
  const [gameList, setGameList] = useState<DocumentData[] | any | Game>();
  const [gameListId, setGameListId] = useState<DocumentData[] | string[] >();
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setGame(games);
    }, 500);
    setLoading(true);
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
      gameListId?.findIndex((result:any) => result == game?.id) !== -1
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
        style: toastStyle
      });
    }
  };

  return (
    <>
      <Toaster position="bottom-center" />

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
          className={` rounded-sm flex justify-center ml-3 group mb-12 ${
            dark ? "bg-[#1d1c1c]" : " bg-slate-200"
          } items-center`}>
          <div className=" relative flex flex-col justify-center ">
            <div className="relative h-28 min-w-[300px] transition duration-200 ease-in-out ">
              <Image
                className="rounded-t-md object-cover md:rounded"
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
              <div className="flex w-48 text-lg justify-start space-x-1 ">
                {renderPlatformIcons(games?.platforms)}
              </div>
              <div className="flex space-x-2  ">
                <div className="w-full h-auto">
                  {game?.esrb_rating?.name && (
                    <Image
                      src={esrbImages[game?.esrb_rating?.name]}
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
                <h1 className="overflow-scroll max-w-[250px] hover:cursor-pointer max-h-[25px] font-bold ">
                  {game?.name}
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
              className={`absolute -bottom-[200px] hidden group-hover:inline group-hover:z-30  rounded-b-md  h-full ${
                dark ? "bg-[#1d1c1c]" : " bg-slate-200 text-black "
              }  w-full px-2 pt-2 `}>
              <p className="text-sm flex items-center justify-between border-b border-gray-600 mb-3">
                Released Date:{" "}
                <span className="text-[#4a4949] text-xs">{game?.released}</span>
              </p>
              <div className="flex justify-between border-b border-gray-600 mb-3 ">
                <p className=" items-center">Genres: </p>
                <div>
                  {game?.genres.map((genre: Genres) => (
                    <span
                      className=" text-[#4a4949] text-xs w-full"
                      key={genre?.id}>
                      {genre?.name}
                      {", "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-600 mb-3">
                <p className=" items-center">Platforms: </p>
                <div className="">
                  {game?.platforms.map((plat: Platform) => (
                    <span
                      className=" px-1 text-[#4a4949] text-xs w-full "
                      key={plat?.id}>
                      {plat?.platform.name}
                      {", "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-600 mb-3 ">
                <p className=" items-center">Stores: </p>
                <div className="">
                  {game?.stores?.map((store: Stores) => (
                    <span
                      className=" px-1 text-[#4a4949] text-xs w-full "
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
      )}
    </>
  );
}

export default NowTrending;
