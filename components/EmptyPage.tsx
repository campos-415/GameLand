import Image from 'next/image'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { darkState } from '../atoms/darkAtom'
import noList from '../public/assets/noList.svg'

function EmptyPage() {
  const dark = useRecoilValue(darkState)
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className={`${!dark ? "text-black": ""} py-24 text-4xl`}>Nothing here</h1>
        <Image src={noList} alt="emptyListImage" width={400} height={400} />
        <p className={`py-12 ${!dark ? "text-[#999fff]" : ""} text-[#333]`}>please add games to your list</p>
      </div>
    </>
  )
}

export default EmptyPage