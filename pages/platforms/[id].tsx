import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../../atoms/darkAtom";
import Hero from "../../components/Hero";


const Home = () => {
  const router = useRouter();
  const { id } = router.query;
  const dark = useRecoilValue(darkState)
  const sideBar = useRecoilValue(sideBarState)
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState([]);
  // console.log(id);

  async function fetchPlatforms() {
    setLoading(true);
    const data = await fetch(
      `https://api.rawg.io/api/games?platform=${id}&key=af412daef44f4adea51e4375c41a8f92`
    ).then((res) => res.json());
    // console.log(data.results);
    setPlatform(data.results);
    setLoading(false);
  }

  useEffect(() => {
    fetchPlatforms();
  }, [id]);

  return (
    <div className={` h-full ${dark ? " bg-[#141414]" : "bg-white"}`}>
      <Head>
        <title>Platforms - {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 lg:pl-16 max-w-[1240px] mx-auto">
        <section className="max-w-[1240px] mx-auto flex items-center justify-center">
          <Hero item={platform} title={id} />
        </section>
      </main>
    </div>
  );
};

export default Home;
