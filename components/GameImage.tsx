import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Game } from "../typings";
interface Props {
  game: Game;
}

function GameImage({ game }: Props) {
  return (
    <>
      <Link href={`/${game.id}`}>
        <div
          className="group relative h-28 min-w-[180px] cursor-pointer 
      transition duration-200 ease-in-out md:min-w-[260px] md:hover:scale-105 lg:min-w-[150px]">
          {game.background_image ? (
            <>
              <Image
                src={game.background_image}
                fill
                alt="/"
                className="rounded-sm object-cover md:rounded md:hover:-z-10"
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
          <div
            className=" absolute top-0] bg-black left-0 w-full h-full bg-opacity-70 
        z-[-1] hover:z-[4] flex items-center flex-col justify-center transition duration-300 ease-in-out group-hover:opacity ">
            <p className="text-center">{game?.name}</p>
            <div className="flex items-center justify-center w-full space-x-1">
              <p>{game?.rating}</p>
              <StarIcon width={20} height={20} className="text-yellow-500" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default GameImage;
