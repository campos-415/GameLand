import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Game } from "../typings";
import { FaBeer, FaStar } from "react-icons/fa";
import ReactPlayer from "react-player";

interface Props {
  games: Game[] | null;
}
function Game({ games }: Props) {
  const router = useRouter();
  const   id   = router.asPath
  const [results, setResults] = useState<[]| any>([])
  // console.log(id)

  async function fetchMovie() {
    const data = await fetch(
      `https://api.rawg.io/api/games${id}?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json());
    console.log([data])
    setResults([data])
  }
  useEffect(() => {
    fetchMovie()
  },[])

  // console.log(results);
  return (
    <div>
      {results?.map((game: Game) => (
        <div
          className="px-32 py-12 flex flex-col items-center justify-center max-w-[1240px] mx-auto"
          key={game.id}>
          <h1 className="text-2xl font-bold py-4">{game.name}</h1>
          <p>{ game.description_raw}</p>
          <div className="space-x-8 mt-4 flex w-full">
            {/* <ReactPlayer
              url={game.data.max}
              width="100%"
              height="100%"
              controls
            /> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Game;
export const getServerSideProps = async () => {
  const games = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      games: games.results,
    },
  };
};
