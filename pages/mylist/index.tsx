import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../../atoms/statesAtom";
import EmptyPage from "../../components/EmptyPage";
import Hero from "../../components/Hero";
import useAuth from "../../hooks/useAuth";
import useList from "../../hooks/useList";

const MyList = () => {
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

      <main className="relative lg:space-y-24 max-w-[1240px] mx-auto ">
        <section>
          {list?.length > 0 ?  (<Hero item={list} title="My List" />):(<EmptyPage text="please add games to your list" /> )}
        </section>
      </main>
    </div>
  );
};

export default MyList;

