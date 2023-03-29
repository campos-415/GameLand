import Head from "next/head";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { User } from "../typings";
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from "../firebase";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import { TailSpin } from "react-loader-spinner";
import { useRecoilValue } from "recoil";
import { darkState, sideBarState } from "../atoms/statesAtom";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { PhotographIcon, XIcon } from "@heroicons/react/solid";
import { PacmanLoader } from "react-spinners";

function Login() {
  const [loading, setLoading] = useState(false);
  const [logOutLoading, setLogOutLoading] = useState(false);
  const dark = useRecoilValue(darkState);
  const sideBar = useRecoilValue(sideBarState);
  const router = useRouter();
  const { user, logOut } = useAuth();
  const User = useUser(user!?.uid);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  function handleLoading(data: any) {
    if (data) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }
  const addImageToPost = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const onSubmit: SubmitHandler<User> = async (data) => {
    const imageRef = ref(storage, `users/${user!?.uid}/image`);

    handleLoading(data);
    if (data) {
      await updateDoc(doc(db, "users", user!.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        userImage: User?.userImage ||
          "https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
      });
      if (selectedFile) {
        await uploadString(imageRef, selectedFile, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "users", user!?.uid), {
              userImage:
                downloadURL 
            });
          }
        );
      } 
      router.push(`/`);
    } else {
      setLoading(false);
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
              <h1 className="text-3xl md:text-4xl">
                Account <span className="text-[#5156e5]">Settings</span>
              </h1>
              <div className="-ml-0.5 flex items-center gap-x-1.5"></div>
            </div>
            <div className="space-y-4 flex items-center justify-center flex-col ">
              <div className="relative">
                <img
                  src={User?.userImage}
                  alt="userImg"
                  className="rounded-2xl w-40 object-cover"
                />
                <div>
                  {selectedFile && (
                    <div className="relative">
                      <div
                        className="absolute  -top-36 left-44 w-8 h-8 bg-[#15181c] hover:bg-[#272c26] 
                      bg-opacity-75 rounded-full flex items-center justify-center z-40
                      cursor-pointer"
                        onClick={() => setSelectedFile(null)}>
                        <XIcon className="text-white h-5" />
                      </div>
                      <img
                        src={selectedFile}
                        alt="userImg"
                        className="absolute -top-36 left-44 rounded-2xl max-h-32 md:max-h-40 object-contain"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2.5">
                    <div className="flex items-center">
                      <div
                        className="icon flex space-x-1"
                        onClick={() => filePickerRef.current!.click()!}>
                        <PhotographIcon className="text-[#5156e5] h-[22px]" />
                        <label
                          className={`${!dark ? "text-white" : "text-white"}`}>
                          {" "}
                          Select Profile Picture
                          <input
                            type="file"
                            ref={filePickerRef}
                            hidden
                            onChange={addImageToPost}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                  <>
                    <PacmanLoader color="#36d7b7" />
                  </>
                ) : (
                  "Save"
                )}
              </button>
              <p className={` ${dark ? "text-gray-700" : "text-[#999]"} py-1 `}>
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
              className={`w-full rounded bg-[#5165e5] py-3 font-semibold hover:bg-white ${
                loading ? "hover:bg-[#5156e5]" : ""
              } hover:text-[#5165e5] flex items-center justify-center`}
              onClick={() => setLoading(true)}
              type="submit">
              {loading ? <PacmanLoader color="black" size={12} /> : "Save"}
            </button>
            <p className={` ${dark ? "text-gray-700" : "text-white"} py-1 `}>
              OR
            </p>
            <button
              className={`w-full rounded bg-[#5165e5] py-3 font-semibold hover:bg-white ${
                loading ? "hover:bg-[#5156e5]" : ""
              } hover:text-[#5165e5] flex items-center justify-center`}
                onClick={logOut}
              type="button">
              {loading ? <PacmanLoader color="black" size={12} /> : "Log Out"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
