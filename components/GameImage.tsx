import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Game } from "../typings";
interface Props {
  game: Game[] | any;
}

function GameImage({ game }: Props) {
  const router = useRouter()
  return (
    <>
      <div className=" group relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-in-out md:min-w-[260px] md:hover:scale-105 lg:min-w-[150px]"
      onClick={() => router.push(`${game.id}`)}>
        {game.background_image ? (
          <>
            <Image
              src={game.background_image}
              fill
              alt="/"
              className="rounded-sm object-cover md:rounded hover:opacity-0"
              sizes="medium"
              priority
            />
          </>
        ) : (
          <Image
            src={game.background_image}
            fill
            alt="/"
            className="rounded-sm object-cover md:rounded"
            sizes="medium"
            priority
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[-1] hover:z-[4] transition-opacity hover:scale-150">
          <p>{game?.name}</p>
          <p>{game?.rating}</p>
        </div>
      </div>
    </>
  );
}

export default GameImage;
