import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { darkState } from "../../atoms/darkAtom";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import NowTrending from "../../components/NowTrending";
import footerImg from "../public/assets/2.png";
import { Game, Genres } from "../../typings";


const Home = () => {
  const router = useRouter();
  const { id } = router.query;
  const [dark, setDark] = useRecoilState(darkState);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  // console.log(id);

  async function fetchGenre() {
    setLoading(true);
    const data = await fetch(
      `https://api.rawg.io/api/games?genres=${id}&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json())
    setGenres(data.results);

    setLoading(false);
  }

  useEffect(() => {
    fetchGenre();
  }, [id]);
  return (
    <div className={` h-full ${dark ? " bg-[#141414]" : "bg-white"}`}>
      <Head>
        <title>Master Player - {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 lg:pl-16 max-w-[1240px] mx-auto">
        <section className="max-w-[1240px] mx-auto flex items-center justify-center">
          <Hero features={genres} title={id} />
        </section>
      </main>
    </div>
  );
};

export default Home;

