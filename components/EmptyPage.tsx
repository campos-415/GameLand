import Image from 'next/image'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { darkState } from '../atoms/statesAtom'
import noList from '../public/assets/noList.svg'

interface Props {
  text: string
}

function EmptyPage({text}: Props) {
  const dark = useRecoilValue(darkState)
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen -mt-12 '>
        <h1 className={`${!dark ? "text-black": ""} pb-12 text-4xl sm:text-7xl`}>Nothing here</h1>
        <Image src={noList} alt="emptyListImage" width={400} height={400} />
        <p className={`py-12 ${!dark ? "text-[#999fff]" : ""} text-[#333]`}>{ text }</p>
      </div>
    </>
  )
}

export default EmptyPage