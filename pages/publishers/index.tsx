import Head from "next/head";
import { useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../../atoms/darkAtom";
import CardComponent from "../../components/CardComponent";
import { Genres } from "../../typings";

interface Props {
  publishers: Genres[];
}


const Publishers = ({ publishers }: Props) => {
  const dark = useRecoilValue(darkState);
  const sideBar = useRecoilValue(sideBarState);

  return (
    <div
      className={` h-full ${dark ? " bg-[#141414]" : "bg-white"} ${
        sideBar && "!h-screen overflow-hidden"
      }`}>
      <Head>
        <title>Game Land- Publishers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 max-w-[1240px] mx-auto ">
        <section>
          <CardComponent title="Publishers" item={publishers} />
        </section>
      </main>
    </div>
  );
};

export default Publishers;

export const getServerSideProps = async () => {
  const publishers = await fetch(
    `https://api.rawg.io/api/publishers?&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      publishers: publishers.results,
    },
  };
};
