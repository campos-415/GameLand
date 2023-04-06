import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PacmanLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import bgImage from "../public/assets/bgImageL.jpeg";
import { darkState } from "../atoms/statesAtom";
import { Oval } from "react-loader-spinner";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const [loginAsGuest, setLoginAsGuest] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const { signIn, signUp, guest, loading, signInAsGuest } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      await signIn(data.email, data.password);
    } else if (loginAsGuest) {
      await signInAsGuest("guest@gl.com", "guestgl");
    } else {
      await signUp(data.email, data.password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>GameLand - Login/SignUp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Image src={bgImage} alt="bgImage" fill className="object-cover" />
      </div>
      <form
        className="relative mt-48 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6">
          <h1 className="text-2xl font-bold">
            Game<span className="text-[#5165e5]">Land</span>
          </h1>
        </div>{" "}
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className={`input ${errors.email && "border-b-2 border-red-500"}`}
              {...register("email")}
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
              {...register("password")}
              placeholder="Password"
              className={`input ${
                errors.password && "border-b-2 border-red-500"
              }`}
            />
            {errors.password && (
              <>
                {" "}
                <p className="p-1 text-[13px] font-light  text-red-500">
                  Your password must contain between 6 and 60 characters.
                </p>
              </>
            )}
          </label>
        </div>
        <button
          className={`w-full rounded bg-[#5165e5] py-3 font-semibold hover:bg-white ${
            loading ? "hover:bg-[#5156e5]" : ""
          } hover:text-[#5165e5] flex items-center justify-center`}
          onClick={() => setLogin(true)}
          type="submit">
          {loading ? <PacmanLoader color="black" size={12} /> : "Sign In"}
        </button>
        <button
          className={`w-full rounded bg-[#5165e5] py-3 font-semibold hover:bg-white ${
            loading ? "hover:bg-[#5156e5]" : ""
          } hover:text-[#5165e5] flex items-center justify-center`}
          onClick={() => setLoginAsGuest(true)}
          type="submit">
          {loginAsGuest ? (
            <PacmanLoader color="black" size={12} />
          ) : (
            "Sign In as Guest"
          )}
        </button>
        <div className="text-[gray] flex items-start space-x-2 ">
          New to GameLand?{" "}
          <button
            className="cursor-pointer text-white hover:underline hover:text-[#5165e5]"
            onClick={() => {
              setLogin(false);
              setSignUpLoading(true);
            }}
            type="submit">
            Sign up now{" "}
          </button>
          <span>
            {signUpLoading ?? (
              <Oval
                ariaLabel="loading-indicator"
                height={30}
                width={30}
                strokeWidth={10}
                strokeWidthSecondary={5}
                color="#5165e5"
                secondaryColor="transparent"
              />
            )}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
