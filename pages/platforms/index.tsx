import Head from "next/head";
import { useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../../atoms/statesAtom";
import CardComponent from "../../components/CardComponent";
import { Genres } from "../../typings";

interface Props {
  platforms: Genres[];
}

const Platforms = ({ platforms }: Props) => {
  const dark = useRecoilValue(darkState)
  const sideBar = useRecoilValue(sideBarState)
  return (
    <div
      className={` h-full ${dark ? " bg-[#141414]" : "bg-white"} ${
        sideBar && "!h-screen overflow-hidden"
      }`}>
      <Head>
        <title>Game Land- Platforms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 max-w-[1240px] mx-auto">
        <section>
          <CardComponent title="Platforms" item={platforms} />
        </section>
      </main>
    </div>
  );
};

export default Platforms;

export const getServerSideProps = async () => {
  const platforms = await fetch(
    `https://api.rawg.io/api/platforms?&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      platforms: platforms.results,
    },
  };
};
