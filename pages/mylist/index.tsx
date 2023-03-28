import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../../atoms/darkAtom";
import CardComponent from "../../components/CardComponent";
import EmptyPage from "../../components/EmptyPage";
import Hero from "../../components/Hero";
import NowTrending from "../../components/NowTrending";
import useAuth from "../../hooks/useAuth";
import useList from "../../hooks/useList";
import { Genres } from "../../typings";

interface Props {
  tags: Genres[];
}

const Tags = () => {
  const dark = useRecoilValue(darkState);
  const sideBar = useRecoilValue(sideBarState)
   const { user } = useAuth();
   const list: any = useList(user?.uid);

  return (
    <div
      className={` h-full ${dark ? " bg-[#141414]" : "bg-white"} ${
        sideBar && "!h-screen overflow-hidden"
      }`}>
      <Head>
        <title>Game Land - My List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 max-w-[1240px] mx-auto ">
        <section>
          {list?.length > 0 ?  (<Hero item={list} title="My List" />):(<EmptyPage /> )}
        </section>
      </main>
    </div>
  );
};

export default Tags;

export const getServerSideProps = async () => {
  const tags = await fetch(
    `https://api.rawg.io/api/tags?&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      tags: tags.results,
    },
  };
};
