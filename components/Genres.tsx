import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Game } from "../typings";
import GameImage from "./GameImage";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
interface Props {
  genre: Game[] | null;
  title: string;
}

function Genres({ genre, title }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [dark, setDark] = useRecoilState(darkState);
  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40">
      <h2
        className={`w-56 cursor-pointer text-sm font-semibold  transition duration-200 hover:text-[#5156e5] md:text-2xl ${
          dark ? "text-white" : "text-black"
        }`}>
        {title}
      </h2>
      <div className="group relative">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale- group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
        />
        <div
          ref={rowRef}
          className="relative flex items-center space-x-1.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide">
          {genre?.map((game) => (
            <div
              className="flex flex-col items-center justify-center"
              key={game.id}>
              <GameImage game={game} />
              {/* <p className="text-xs text-center">{game.name}</p> */}
            </div>
          ))}
        </div>
        <ChevronRightIcon
          onClick={() => handleClick("right")}
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale- group-hover:opacity-100`}
        />
      </div>
    </div>
  );
}

export default Genres;
