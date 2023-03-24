import React from "react";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
import { Game } from "../typings";
import NowTrending from "./NowTrending";

interface Props {
  features: Game[] | null
  title: string | any
}

function Hero({ features, title }: Props) {
  const [dark, setDark] = useRecoilState(darkState)

  return (
    <>
      <div className="flex flex-col items-center justify-between">
        <div className="mb-12 ">
          <h1 className={`text-2xl md:text-3xl lg:text-6xl pt-6 capitalize ${!dark ? "text-black" : " "}`}>{title}</h1>
        </div>

        <div className="mx-auto flex flex-wrap items-center justify-center max-w-[1240px]">
          {features?.map((game:Game) => (
            <NowTrending games={game} key={game.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
