import Head from "next/head";
import { useRecoilValue } from "recoil";
import { darkState } from "../../atoms/darkAtom";
import CardComponent from "../../components/CardComponent";
import { Genres } from "../../typings";

interface Props {
  developers: Genres[];
}

const Developers = ({ developers }: Props) => {
  const dark = useRecoilValue(darkState);
  console.log(developers)

  return (
    <div className={` h-full ${dark ? " bg-[#141414]" : "bg-white"}`}>
      <Head>
        <title>Master Player - Stores</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 max-w-[1240px] mx-auto ">
        <section>
          <CardComponent title="Developers" item={developers} />
        </section>
      </main>
    </div>
  );
};

export default Developers;

export const getServerSideProps = async () => {
  const developers = await fetch(
    `https://api.rawg.io/api/developers?&key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      developers: developers.results,
    },
  };
};
