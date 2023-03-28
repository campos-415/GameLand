import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import LogoImage from "../public/assets/2.png";
import { User } from "../typings";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import { TailSpin } from "react-loader-spinner";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../atoms/darkAtom";



function Login() {
  const [loading, setLoading] = useState(false);
  const dark = useRecoilValue(darkState)
  const sideBar = useRecoilValue(sideBarState)
  const router = useRouter();
  const { user, logOut } = useAuth();
  const User = useUser(user!?.uid);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  function handleLoading(data: any) {
    if (data) {
      setLoading(true)
    }
    else {
      setLoading(false)
    }
  }
  const onSubmit: SubmitHandler<User> = async (data) => {
    handleLoading(data)
    if (data) {
      await setDoc(doc(db, "users", user!.uid), data);
      router.push(`/`);

    } else {
      setLoading(false)
    }
    
  };



  return (
    <div
      className={`relative flex h-screen w-screen flex-col md:items-center md:justify-center ${
        dark ? " bg-[#141414]" : "bg-white"
      } ${sideBar && "!h-screen overflow-hidden"}`}>
      <Head>
        <title>GameLand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {User ? (
        <>
          <form
            className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
            onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1 className="text-3xl md:text-4xl">Account</h1>
              <div className="-ml-0.5 flex items-center gap-x-1.5"></div>
            </div>
            <div className="space-y-4">
              <label className="inline-block w-full">
                <input
                  type="text"
                  placeholder={User?.firstName}
                  className={`input ${
                    errors.firstName && "border-b-2 border-red-500"
                  }`}
                  {...register("firstName")}
                />
              </label>
              <label className="inline-block w-full">
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder={User?.lastName}
                  className={`input ${
                    errors.lastName && "border-b-2 border-red-500"
                  }`}
                />
              </label>
            </div>
            <div className="flex items-center justify-center flex-col">
              <button
                className="w-full rounded bg-[#5165e5] py-3 font-semibold hover:bg-white hover:text-[#5165e5] flex items-center justify-center"
                onClick={() => handleSubmit}
                type="submit">
                {loading ? (
                  <TailSpin
                    height="40"
                    width="40"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="0.8"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  "Save"
                )}
              </button>
              <p className={` ${dark ? "text-gray-700" : "text-white"} py-1 `}>
                OR
              </p>
              <button
                className="w-full rounded bg-[#5165e5] py-3 font-semibold hover:bg-white hover:text-[#5165e5]"
                onClick={logOut}
                type="submit">
                Log Out
              </button>
            </div>
          </form>
        </>
      ) : (
        <form
          className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
          onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-4xl font-semibold">Create User</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                type="text"
                placeholder="Name"
                className={`input ${
                  errors.firstName && "border-b-2 border-red-500"
                }`}
                {...register("firstName", { required: true })}
              />
            </label>
            <label className="inline-block w-full">
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Last Name"
                className={`input ${
                  errors.lastName && "border-b-2 border-red-500"
                }`}
              />
            </label>
          </div>
          <div className="flex items-center justify-center flex-col">
            <button
              className="w-full rounded bg-[#5165e5] py-3 font-semibold hover:bg-white hover:text-[#5165e5] flex items-center justify-center"
              onClick={() => setLoading(true)}
              type="submit">
              {loading ? (
                <TailSpin
                  height="40"
                  width="40"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="0.8"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "Save"
              )}
            </button>
            <p className={` ${dark ? "text-gray-700" : "text-white"} py-1 `}>
              OR
            </p>
            <button
              className="w-full rounded bg-[#5165e5] py-3 font-semibold hover:bg-white hover:text-[#5165e5]"
              onClick={logOut}
              type="submit">
              Log Out
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
