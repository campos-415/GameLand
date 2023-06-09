import { DocumentData } from "firebase/firestore";
import React from "react";
import { useRecoilValue } from "recoil";
import { darkState } from "../atoms/statesAtom";
import { Game } from "../typings";
import GameComponent from "./GameComponent";


interface Props {
  item: Game | any | DocumentData[]
  title: string | undefined | string[]
}

function Hero({ item, title }: Props) {
  const dark = useRecoilValue(darkState)

  return (
    <>
      <div className={`flex flex-col items-center justify-between pt-24`}>
        <div className="mb-12 ">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl pt-6 capitalize ${!dark ? "text-black" : " "}`}>{title}</h1>
        </div>

        <div className="mx-auto flex flex-wrap rounded-md items-center space-x-4 justify-center max-w-[1240px]">
          {item?.map((game:Game) => (
            <GameComponent games={game} key={game.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
