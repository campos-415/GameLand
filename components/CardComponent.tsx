import { InformationCircleIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FaShoppingBag } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { darkState } from '../atoms/darkAtom';
import { renderPlatformIcons, renderStoreIcons } from '../constants/gameConst';
import { Game, Games, Genres, Movie } from '../typings';

interface Props {
  genres: Genres[] 
}

function CardComponent({genres}:Props) {
   const [dark, setDark] = useRecoilState(darkState);
  const router = useRouter();
  const { game } = router.query;
  const [movie, setMovie] = useState<Movie>();
  const [games, setGames] = useState<Game>();
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showStore, setShowStore] = useState(false);
  console.log(genres);
  return (
    <>
      <div className='flex items-center justify-center flex-wrap gap-12'>
        {genres.map((genre) => (
          <div className="flex items-center justify-center">
            <div
              className={`relative scrollbar-hidden flex flex-col space-y-2 py-16 md:space-y-4 justify-end overflow-x-hidden ${
                dark ? "bg-gradient-to-b-dark" : "bg-gradient-to-b-light"
              } h-[300px] w-[600px]`}
              key={genre?.id}>
              <div className="absolute top-0 left-0 h-full w-full overflow-x-hidden">
                <Image
                  className="object-cover overflow-x-hidden"
                  src={genre?.image_background}
                  alt="bannerImg"
                  fill
                  sizes="small"
                  priority
                />
              </div>
              <div className="relative">
                <div className="max-w-[1240px] space-x-4 items-center flex justify-start px-12 ">
                  <h1
                    className={`${
                      !dark ? "text-black" : " "
                    } text-2xl md:text-4xl lg:text-7xl `}>
                    {genre?.name}
                  </h1>
                </div>
                <div className="  max-w-[1240px] flex flex-col items-start justify-center px-12 ">
                  {/* <div className="flex w-48 text-lg justify-start space-x-1 pt-3 ">
                {renderPlatformIcons(genre?.platforms)}
              </div> */}
                </div>

                <div className="flex space-x-3 px-12 mt-4">
                  <button
                    className="bannerButton bg-white text-black"
                    // onClick={() => setShowStore(!showStore)}
                  >
                    <FaShoppingBag className="h-4 w-4 text-black md:h-7 md:w-7" />{" "}
                    Buy
                  </button>
                  <button
                    onClick={() => {
                      router.push(`/${genre?.id}/#info`);
                    }}
                    className="bannerButton bg-[gray]/70">
                    More Info{" "}
                    <InformationCircleIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
                  </button>
                </div>
                <div className={`${showStore ? "" : "hidden"} px-12 mt-4`}>
                  {/* <div className="flex w-48 text-lg justify-start space-x-1 hover:cursor-pointer">
                {renderStoreIcons(genre?.stores)}
              </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardComponent