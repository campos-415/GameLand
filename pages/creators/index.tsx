import Head from "next/head";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkState } from "../../atoms/darkAtom";
import CardComponent from "../../components/CardComponent";
import { Genres } from "../../typings";

interface Props {
  creators: Genres[];
}

const Creators = ({ creators }: Props) => {
  const dark = useRecoilValue(darkState);
  console.log(creators)

  return (
    <div className={` h-full ${dark ? " bg-[#141414]" : "bg-white"}`}>
      <Head>
        <title>Master Player - Creators</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 max-w-[1240px] mx-auto ">
        <section>
          <CardComponent title="Creators" item={creators} />
        </section>
      </main>
    </div>
  );
};

export default Creators;

export const getServerSideProps = async () => {
  const creators = await fetch(
    `https://api.rawg.io/api/creators?&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      creators: creators.results,
    },
  };
};
