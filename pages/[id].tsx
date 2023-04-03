import { InformationCircleIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaAirbnb, FaGamepad, FaShoppingBag } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkState } from "../atoms/statesAtom";
import {
  Data,
  Game,
  Genres,
  Movie,
  Platform,
  Ratings,
  Stores,
} from "../typings";
import {
  renderPlatformIcons,
  renderPlatformIconsAndNames,
  renderStoreIcons,
} from "../constants/gameConst";
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
import { Toaster, toast } from "react-hot-toast";
import esrb_m from "../public/assets/ratings/esrb-m.svg";
import esrb_t from "../public/assets/ratings/esrb-t.svg";
import esrb_e from "../public/assets/ratings/esrb-e.svg";
import esrb_a from "../public/assets/ratings/esrb-a.svg";
import esrb_10 from "../public/assets/ratings/esrb-10.svg";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";




const esrbImages: { [key: string]: string } = {
  Teen: esrb_t,
  Mature: esrb_m,
  "Everyone 10+": esrb_10,
  Everyone: esrb_e,
  "Adults Only": esrb_a,
  "Rating Pending": esrb_e,
};

const toastStyle = {
  backgound: "white",
  color: "black",
  fontWheigth: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
};

const getMetacriticClassName = (metacritic?: number) => {
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

  return "";
};

function Game() {
  const dark = useRecoilValue(darkState);
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie>();
  const [games, setGames] = useState<Game>();
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [gameList, setGameList] = useState<DocumentData[] | any | Game>();
  const [gameListId, setGameListId] = useState<DocumentData[] | string[]>();
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();

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
  }, [db, games?.id]);

  // CHECKING TO SEE IF THE GAME IS IN THE MYLIST AND CHECKING THE MARK FOR THE GAME IF IT IS
  useEffect(() => {
    setAddedToList(
      gameListId?.findIndex((result: any) => result == games?.id) !== -1
    );
  }, [gameList]);

  //FUNCTION TO ADD OR DELETE GAMES OF MYLIST COLLECTION
  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "users", user!.uid, "myList", games?.id.toString()!)
      );
      setAddedToList(false);

      toast(`${games?.name} has been removed from My List ❌`, {
        duration: 4000,
        style: toastStyle,
      });
    } else {
      await setDoc(
        doc(db, "users", user!.uid, "myList", games?.id.toString()!),
        { ...games }
      );
      setAddedToList(true);

      toast(`${games?.name} has been added to My List ✅`, {
        duration: 4000,
        style: toastStyle,
      });
    }
  };

  async function fetchGame() {
    setLoading(true);
    const games = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json());
    console.log(games);
    setGames(games);

    setLoading(false);
  }

  useEffect(() => {
    fetchGame();
  }, [id]);

  return (
    <>
      <Head>
        <title>Master Player - {games?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href={`/mylist`}>
        <Toaster position="top-center" />
      </Link>

      <div
        className={`scrollbar-hidden flex flex-col space-y-2 pt-96 md:space-y-4 justify-end overflow-x-hidden ${
          dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
        } h-screen`}
        key={games?.id}>
        <div className="absolute top-0 left-0 -z-10 h-screen w-screen overflow-x-hidden">
          <Image
            className="object-cover overflow-x-hidden"
            src={games?.background_image}
            alt="bannerImg"
            fill
          />
        </div>
        <div className="relative flex flex-col items-center justify-center space-y-3 ">
          <div className="px-12 flex items-center space-y-2  space-x-5 justify-center max-w-[1240px] flex-wrap ">
            <div
              className={`${
                dark ? "text-white" : "text-black"
              } flex items-center space-x-1 text-2xl`}>
              {renderPlatformIcons(games?.platforms)}
            </div>
            <div
              className={`flex items-center space-x-1 font-ligh rounded px-1 text-sm ${
                dark ? "bg-white text-black" : "bg-black"
              }`}>
              {games?.released ? games.released : "N/A"}
            </div>
            <div className="flex items-center space-x-1">
              <p className={`${dark ? "text-white" : "text-black"} uppercase`}>
                Average playtime:{" "}
                <span className="text-[#5156e5]">
                  {games?.playtime ? (
                    <>
                      {games.playtime} {"hours"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="max-w-[1240px] space-x-4 items-center flex justify-center px-12 pb-4 ">
            <h1
              className={`${
                !dark ? "text-black" : " "
              } text-2xl md:text-4xl text-center lg:text-7xl `}>
              {games?.name}
            </h1>
          </div>
          <div className="pb-12">
            <button
            className={`${
              dark ? "text-black  bg-slate-200" : "bg-[#141414]"
            } py-4 flex items-center justify-between px-12  space-x-1 rounded-md  `}
            onClick={handleList}>
            {!addedToList ? (
              <>
                <p>Add to my List</p>
                <PlusCircleIcon width={30} height={30} />
              </>
            ) : (
              <>
                <p> Remove from my List</p>
                <CheckCircleIcon width={30} height={30} />
              </>
            )}
          </button>
          </div>
          
        </div>
      </div>
      <div
        className={`relative scrollbar-hidden flex flex-col space-y-2  md:space-y-4 justify-end overflow-x-hidden ${
          dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
        } h-screen`}
        key={games?.id}>
        <div className="flex items-center justify-center flex-col max-h-[120vh]">
          <div className="absolute top-0 left-0 -z-10 h-screen w-screen overflow-x-hidden">
            <Image
              className="object-cover overflow-x-hidden"
              src={games?.background_image_additional}
              alt="bannerImg"
              fill
            />
          </div>
          <div className="flex items-start justify-center pb-12 mt-8 space-x-2 md:space-x-8">
            <div
              className={`max-w-[1240px] flex flex-col items-center justify-center `}>
              <h2
                className={`${
                  dark ? "text-white" : "text-black"
                }  text-lg md:text-4xl pb-4`}>
                Where to Play?
              </h2>
              <div className="space-y-2 flex flex-wrap items-end justify-start flex-col">
                {renderPlatformIconsAndNames(games?.platforms)}
              </div>
            </div>
            <div
              className={`max-w-[1240px] flex flex-col items-center justify-center `}>
              <h2
                className={`${
                  dark ? "text-white" : "text-black"
                }  text-lg md:text-4xl pb-4`}>
                Stores Available
              </h2>
              <div className="space-y-2 flex flex-wrap items-start justify-start flex-col">
                {renderStoreIcons(games?.stores)}
              </div>
            </div>
          </div>

          <div className="max-w-[1000px] flex flex-col items-center justify-center px-4 pb-4  ">
            <h2
              className={`${
                dark ? "" : "text-black"
              } text-2xl md:text-4xl pb-4`}>
              About {games?.name}
            </h2>
            <p className={`${dark ? "" : "text-black"} h-60 overflow-scroll md:h-40 scrollbar-hide`}>
              {games?.description_raw}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
