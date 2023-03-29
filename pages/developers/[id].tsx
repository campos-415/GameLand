import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  useRecoilValue } from "recoil";
import { darkState } from "../../atoms/statesAtom";
import Hero from "../../components/Hero";



const Home = () => {
  const router = useRouter();
  const { id } = router.query;
  const dark = useRecoilValue(darkState);
  const [loading, setLoading] = useState(false);
  const [developers, setDevelopers] = useState([]);

  async function fetchGenre() {
    setLoading(true);
    const data = await fetch(
      `https://api.rawg.io/api/games?developers=${id}&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json())
    setDevelopers(data.results);
    setLoading(false);
  }

  useEffect(() => {
    fetchGenre();
  }, [id]);
  
  return (
    <div className={` h-full ${dark ? " bg-[#141414]" : "bg-white"}`}>
      <Head>
        <title>Developer- {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 lg:pl-16 max-w-[1240px] mx-auto">
        <section className="max-w-[1240px] mx-auto flex items-center justify-center">
          <Hero item={developers} title={id} />
        </section>
      </main>
    </div>
  );
};

export default Home;

