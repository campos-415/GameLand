import React from 'react'
import { TailSpin } from 'react-loader-spinner';

function Account() {
  return (
    <>
      <main className="pt-24">
        <div>
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-sm font-semibold text-[#555]">Memeber Since:</p>
          </div>
          <TailSpin
            height="40"
            width="40"
            color="#5156e5"
            ariaLabel="tail-spin-loading"
            radius="0.8"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </main>
    </>
  );
}

export default Account