import { AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { darkState } from "../atoms/statesAtom";
import { Games, Genres } from "../typings";
import Link from "next/link";
import { CgGames } from "react-icons/cg";

interface Props {
  item: Genres[];
  title: string;
}

function CardComponent({ item, title }: Props) {
  const dark = useRecoilValue(darkState);
  const router = useRouter();
  const id = router.asPath;

  return (
    <>
      <h1
        className={`text-7xl text-center pb-16 font-extrabold ${
          dark ? "" : "text-black"
        }`}>
        {title}
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-12 h-full ">
        {item?.map((element) => (
          <div className="bg-gradient-to-b-light h-full" key={element.id}>
            <div
              className={`relative w-[350px] md:w-[300px] ${
                element?.image
                  ? " h-[450px] md:h-[450px] "
                  : "h-[350px] md:h-[350px]"
              }  opacity-80 rounded-sm`}>
              <Image
                className="object-cover bg-opacity-50  "
                src={element?.image_background}
                fill
                sizes="small"
                alt={`${element.name} Image`}
                priority
              />
              <div
                className={`absolute  ${element?.image ? "" : "pt-8 pb-4"} w-full ${
                  dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
                }`}>
                {element?.image && (
                  <div className="rounded-sm flex items-center overflow-y-hidden object-cover justify-center pt-4 pb-12 ">
                    <Image
                      src={element?.image}
                      width={100}
                      height={100}
                      sizes="small"
                      alt="author imagen"
                      className=" rounded-full h-[100px] object-cover overflow-hidden"
                    />
                  </div>
                )}
                <div
                  className={` z-30 relative flex items-center justify-center flex-col `}>
                  <h2
                    className={` w-full flex items-center justify-center text-center text-4xl ${
                      dark ? "" : "text-black"
                    } `}>
                    {" "}
                    <Link href={`${id}/${element?.slug}`}>
                      <span className=" font-bold hover:underline hover:cursor-pointer text-center">
                        {element?.name}
                      </span>
                    </Link>
                  </h2>{" "}
                  <button
                    onClick={() => router.push(`${id}/${element?.slug}`)}
                    className={` mt-4  rounded bg-black px-8 py-2 text-center hover:bg-[#5156e5] hover:cursor-pointer ${
                      dark
                        ? "bg-black"
                        : "bg-white text-black  hover:text-white"
                    }`}>
                    See More
                  </button>
                  <div
                    className={` bottom-0 space-y-1 w-full pt-12 ${element?.image ? "pb-5" : "pb-9" } ${
                      dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
                    }`}>
                    <div
                      className={`border-b border-gray-700 w-full px-2 ${
                        dark ? "" : "invert border-white"
                      }`}>
                      <p className="relative w-full h-full flex items-center justify-between">
                        Total Games:{" "}
                        <span className="flex items-center">
                          {element?.games_count} <CgGames className="ml-1" />
                        </span>
                      </p>
                    </div>
                    <div className={`${dark ? "" : "invert"} px-2`}>
                      <div className="w-full flex flex-col">
                        {element?.games
                          ?.map((game: Games) => (
                            <div className="py-1" key={game.id}>
                              <Link href={`/${game.id}`}>
                                <div className="flex items-center justify-between h-6 ">
                                  <p className="hover:underline hover:cursor-pointer overflow-hidden w-54">
                                    {game.name}{" "}
                                  </p>
                                  <span className="flex hover:cursor-default items-center space-x-1">
                                    {game.added}
                                    <AiOutlineUser />
                                  </span>
                                </div>
                              </Link>
                            </div>
                          ))
                          .slice(3)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardComponent;
