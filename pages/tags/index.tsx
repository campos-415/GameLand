import Head from "next/head";
import { useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../../atoms/statesAtom";
import CardComponent from "../../components/CardComponent";
import { Genres } from "../../typings";

interface Props {
  tags: Genres[];
}

const Tags = ({ tags }: Props) => {
  const dark = useRecoilValue(darkState);
  const sideBar = useRecoilValue(sideBarState)

  return (
    <div
      className={` h-full ${dark ? " bg-[#141414]" : "bg-white"} ${
        sideBar && "!h-screen overflow-hidden"
      }`}>
      <Head>
        <title>Master Player - Tags</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative pt-32 lg:space-y-24 max-w-[1240px] mx-auto ">
        <section>
          <CardComponent title="Tags" item={tags} />
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
