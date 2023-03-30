import { InformationCircleIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaGamepad, FaShoppingBag } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/statesAtom";
import { Data, Game, Movie, Platform, Stores } from "../typings";
import { renderPlatformIcons, renderPlatformIconsAndNames, renderStoreIcons } from "../constants/gameConst";
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
import { toast } from "react-hot-toast";
import esrb_m from "../public/assets/ratings/esrb-m.svg";
import esrb_t from "../public/assets/ratings/esrb-t.svg";
import esrb_e from "../public/assets/ratings/esrb-e.svg";
import esrb_a from "../public/assets/ratings/esrb-a.svg";
import esrb_10 from "../public/assets/ratings/esrb-10.svg";
import { platform } from "os";

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

function Game() {
  const [dark, setDark] = useRecoilState(darkState);
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie>();
  const [games, setGames] = useState<Game>();
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [game, setGame] = useState<Game>();
  const [gameList, setGameList] = useState<DocumentData[] | any | Game>();
  const [gameListId, setGameListId] = useState<DocumentData[] | string[]>();
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(false);
    setGame(games);
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

  async function fetchGame() {
    setLoading(true);
    const [movies, games] = await Promise.all([
      fetch(
        `https://api.rawg.io/api/games/${id}/movies?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
      ).then((res) => res.json()),
      fetch(
        `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
      ).then((res) => res.json()),
    ]);
    setMovie(movies.results);
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
          />
        </div>
      </div>
    </>
  );
}

export default Game;
