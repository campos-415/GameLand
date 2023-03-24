import Head from "next/head";
import { useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../../atoms/darkAtom";
import CardComponent from "../../components/CardComponent";
import { Genres } from "../../typings";

interface Props {
  genre: Genres[];
}

const Genres = ({ genre }: Props) => {
  const dark = useRecoilValue(darkState);
  const sideBar = useRecoilValue(sideBarState);

  return (
    <div
      className={` h-full ${dark ? " bg-[#141414]" : "bg-white"} ${
        sideBar && "!h-screen overflow-hidden"
      }`}>
      <Head>
        <title>Game Land - Genres</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 lg:pl-16 max-w-[1240px] mx-auto">
        <section>
          <CardComponent title="Genres" item={genre} />
        </section>
      </main>
    </div>
  );
};

export default Genres;

export const getServerSideProps = async () => {
  const genre = await fetch(
    `https://api.rawg.io/api/genres?&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      genre: genre.results,
    },
  };
};
