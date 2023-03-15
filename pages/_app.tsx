import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <header>
        <Navbar />
      </header>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
