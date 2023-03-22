import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
import Feature from "../components/Feature";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import NowTrending from "../components/NowTrending";
import footerImg from "../public/assets/2.png";
import { Game } from "../typings";

interface Props {
  action: Game[] | null;
  racing: Game[] | null;
  adventure: Game[] | null;
  sports: Game[] | null;
  shooter: Game[] | null;
  simulation: Game[] | null;
  features: Game[] | null;
  newGames: Game[] | null;
}

const Genres = ({
  racing,
  action,
  adventure,
  sports,
  shooter,
  simulation,
  features,
  newGames,
}: Props) => {
  const [dark, setDark] = useRecoilState(darkState);
  return (
    <div className={` h-full ${dark ? " bg-[#141414]" : "bg-white"}`}>
      <Head>
        <title>Master Player - Genres</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pl-4 pt-32 lg:space-y-24 lg:pl-16 max-w-[1240px] mx-auto">
        <section id="action" className="max-w-[1240px] mx-auto flex items-center justify-center">
          <Hero features={action} title="Action" />
        </section>
        <section id="racing" className="md:space-y-24 ">
          <Hero features={racing} title="Racing" />
        </section>
        <section id="adventure" className="md:space-y-24 ">
          <Hero features={adventure} title="Adventure" />
        </section>
        <section id="sports" className="md:space-y-24 ">
          <Hero features={sports} title="Sports" />
        </section>
        <section id="shooter" className="md:space-y-24 ">
          <Hero features={shooter} title="Shooter" />
        </section>
        <section id="simulation" className="md:space-y-24 ">
          <Hero features={simulation} title="Simulation" />
        </section>
      </main>
    </div>
  );
};

export default Genres;

export const getServerSideProps = async () => {
  const [
    action,
    racing,
    adventure,
    sports,
    shooter,
    simulation,
    features,
    newGames,
  ] = await Promise.all([
    fetch(
      `https://api.rawg.io/api/games?genres=action&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json()),
    fetch(
      `https://api.rawg.io/api/games?genres=racing&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json()),
    fetch(
      `https://api.rawg.io/api/games?genres=adventure&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}&page=2`
    ).then((res) => res.json()),
    fetch(
      `https://api.rawg.io/api/games?genres=sports&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}&page=1`
    ).then((res) => res.json()),
    fetch(
      `https://api.rawg.io/api/games?genres=shooter&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json()),
    fetch(
      `https://api.rawg.io/api/games?genres=simulation&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json()),
    fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}&ordering=-released&page=10`
    ).then((res) => res.json()),
    fetch(
      `https://api.rawg.io/api/games?dates=2023-01-31,2023-03-01&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json()),
  ]);

  return {
    props: {
      action: action.results,
      racing: racing.results,
      adventure: adventure.results,
      sports: sports.results,
      shooter: shooter.results,
      simulation: simulation.results,
      features: features.results,
      newGames: newGames.results,
    },
  };
};
