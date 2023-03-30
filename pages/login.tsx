import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PacmanLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import bgImage from "../public/assets/bgImage.jpeg";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {


    if (login) {
      setLoading(true)
      await signIn(data.email, data.password);
    } else {
      setLoading(true)
      await signUp(data.email, data.password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>GameLand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6">
        <h1 className="text-2xl font-bold">
          Game<span className="text-[#5165e5]">Land</span>
        </h1>
      </div>{" "}
      <div>
        <Image src={bgImage} alt="bgImage" fill className="object-cover" />
      </div>
      <form
        className="relative mt-0 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className={`input ${errors.email && "border-b-2 border-red-500"}`}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-red-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className={`input ${
                errors.password && "border-b-2 border-red-500"
              }`}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-red-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#5165e5] py-3 font-semibold hover:bg-white hover:text-[#5165e5]"
          onClick={() => setLogin(true)}
          type="submit">
          {loading ? <PacmanLoader color="black" size={12} /> : "Sign In"}
        </button>
        <div className="text-[gray]">
          New to Game Land?{" "}
          <button
            className="cursor-pointer text-white hover:underline hover:text-[#5165e5]"
            onClick={() => setLogin(false)}
            type="submit">
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

