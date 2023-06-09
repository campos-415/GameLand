import { DocumentData } from "firebase/firestore";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../atoms/statesAtom";
import Hero from "../components/Hero";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import { Game } from "../typings";
import WelcomePage from "../components/WelcomePage";

interface Props {
  newGames: Game[] | null 
  classicGames: Game[] | null
}

const Home = ({ newGames, classicGames }: Props) => {
  const sideBar = useRecoilValue(sideBarState);
  const dark = useRecoilValue(darkState);
  const { user } = useAuth();
  const list: any = useList(user!?.uid);
  return (
    <div
      className={` h-full ${dark ? " bg-[#141414]" : "bg-white"} ${
        sideBar && "!h-screen overflow-hidden"
      }`}>
      <Head>
        <title>Game Land - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative md:pt-24 lg:space-y-24  max-w-[1240px] mx-auto">
        <section className="max-w-[1240px] mx-auto flex items-center md:items-start justify-center h-screen">
          <WelcomePage />
        </section>
        <section id="newRelease" className="max-w-[1240px] mx-auto flex items-center justify-center">
          <Hero item={newGames} title="New Release" />
        </section>
        <section className="md:space-y-24 ">
          {list?.length > 0 && <Hero item={list} title="My List" />}
        </section>
        <section className="max-w-[1240px] mx-auto flex items-center justify-center">
          <Hero item={classicGames} title="Classic Games" />
        </section>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [newGames, classicGames] = await Promise.all([
    fetch(
      `https://api.rawg.io/api/games?dates=2023-01-31,2023-12-31&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json()),
    fetch(
      `https://api.rawg.io/api/games?tags=classic&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
    ).then((res) => res.json()),
  ]);
  return {
    props: {
      newGames: newGames.results,
      classicGames: classicGames.results,
    },
  };
};
