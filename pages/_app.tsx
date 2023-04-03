import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AuthProvider } from "../hooks/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <header>
          <Navbar />
        <Sidebar />
        </header>
      <Component {...pageProps} />
      </AuthProvider>
        
    </RecoilRoot>
  );
}

export default MyApp;
