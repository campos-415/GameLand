import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { darkState } from "../../atoms/darkAtom";
import CardComponent from "../../components/CardComponent";
import Feature from "../../components/Feature";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import NowTrending from "../../components/NowTrending";
import footerImg from "../public/assets/2.png";
import { Genres } from "../../typings";

interface Props {
  genre: Genres[] ;

}

const Genres = ({
 genre
}: Props) => {
  const [dark, setDark] = useRecoilState(darkState);
  return (
    <div className={` h-full ${dark ? " bg-[#141414]" : "bg-white"}`}>
      <Head>
        <title>Master Player - Genres</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 lg:pl-16 max-w-[1240px] mx-auto">
        <section>
          <CardComponent title="Genres" genres={genre} />
        </section>
      </main>
    </div>
  );
};

export default Genres;

export const getServerSideProps = async () => {
  const genre = await (
    fetch(
      `https://api.rawg.io/api/genres?&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json())
  );

  return {
    props: {
      genre:genre.results,
    },
  };
};
