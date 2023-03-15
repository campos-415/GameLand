import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms/darkAtom";
import Genres from "../components/Genres";
import Navbar from "../components/Navbar";
import footerImg from "../public/assets/2.png";
import { Game } from "../typings";

interface Props {
  action: Game[] | null;
  racing: Game[] | null;
  adventure: Game[] | null;
  sports: Game[] | null;
  shooter: Game[] | null;
  simulation: Game[] | null;
}

const Home = ({
  racing,
  action,
  adventure,
  sports,
  shooter,
  simulation,
}: Props) => {
  const [dark, setDark] = useRecoilState(darkState)
  return (
    <div className={`flex min-h-screen flex-col py-2 relative h-screen lg:h-[140vh] ${dark ? " bg-gradient-to-b": "bg-white"}`}>
      <Head>
        <title>Master Player - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pl-4 mt-16 pb-24 lg:space-y-24 lg:pl-16">
        <section className="md:space-y-2">
          <Genres title="Action" genre={action} />
          <Genres title="Racing" genre={racing} />
          <Genres title="Adventure" genre={adventure} />
          <Genres title="Sports" genre={sports} />
          <Genres title="Shooter" genre={shooter} />
          <Genres title="Simulation" genre={simulation} />
        </section>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://cesarcampos.dev/"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{" "}
          <Image
            className="invert"
            src={footerImg}
            alt="footer Logo"
            width={80}
            height={16}
            priority
          />
        </a>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [action, racing, adventure, sports, shooter, simulation] =
    await Promise.all([
      fetch(
        `https://api.rawg.io/api/games?genres=action&key=af412daef44f4adea51e4375c41a8f92`
      ).then((res) => res.json()),
      fetch(
        `https://api.rawg.io/api/games?genres=racing&key=af412daef44f4adea51e4375c41a8f92`
      ).then((res) => res.json()),
      fetch(
        `https://api.rawg.io/api/games?genres=adventure&key=af412daef44f4adea51e4375c41a8f92&page=2`
      ).then((res) => res.json()),
      fetch(
        `https://api.rawg.io/api/games?genres=sports&key=af412daef44f4adea51e4375c41a8f92&page=1`
      ).then((res) => res.json()),
      fetch(
        `https://api.rawg.io/api/games?genres=shooter&key=af412daef44f4adea51e4375c41a8f92`
      ).then((res) => res.json()),
      fetch(
        `https://api.rawg.io/api/games?genres=simulation&key=af412daef44f4adea51e4375c41a8f92`
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
    },
  };
};
