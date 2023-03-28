import axios from "axios";
import { DocumentData } from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../atoms/darkAtom";
import Genres from "../components/Genres";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import NowTrending from "../components/NowTrending";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
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
  newGames: Game[] | null | DocumentData[];
}

const Home = ({ newGames }: Props) => {
  const sideBar = useRecoilValue(sideBarState);
  const dark = useRecoilValue(darkState);
  const { user } = useAuth();
  const list: any = useList(user?.uid);
  return (
    <div
      className={` h-full ${dark ? " bg-[#141414]" : "bg-white"} ${
        sideBar && "!h-screen overflow-hidden"
      }`}>
      <Head>
        <title>Master Player - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24  max-w-[1240px] mx-auto">
        <section className="max-w-[1240px] mx-auto flex items-center justify-center">
          <Hero item={newGames} title="New Release" />
        </section>
        <section className="md:space-y-24 ">
          <Hero item={newGames} title="Features" />
          {list?.length > 0 && <Hero item={list} title="My List" />}
        </section>
      </main>
    </div>
  );
};

export default Home;

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
      `https://api.rawg.io/api/games?ordering=-rating&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
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
