import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { darkState } from "../../atoms/statesAtom";
import Hero from "../../components/Hero";



const Home = () => {
  const router = useRouter();
  const { id } = router.query;
  const dark = useRecoilValue(darkState);
  const [loading, setLoading] = useState(false);
  const [creators, setCreators] = useState([]);

  async function fetchGenre() {
    setLoading(true);
    const data = await fetch(
      `https://api.rawg.io/api/games?creators=${id}&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json())
    setCreators(data.results);
    setLoading(false);
  }

  useEffect(() => {
    fetchGenre();
  }, [id]);
  
  return (
    <div className={` h-full ${dark ? " bg-[#141414]" : "bg-white"}`}>
      <Head>
        <title>Creator - {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 lg:pl-16 max-w-[1240px] mx-auto">
        <section className="max-w-[1240px] mx-auto flex items-center justify-center">
          <Hero item={creators} title={id} />
        </section>
      </main>
    </div>
  );
};

export default Home;

