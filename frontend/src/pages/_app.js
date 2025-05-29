import { BottomBar } from "@/components/bottomBar";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
// import AppContextProvider from "@/context/appContext";

export default function App({ Component, pageProps }) {
  return (
    // <AppContextProvider>
    // <Layout>
    <>
      <Navbar />
      <div className="pb-[60px] min-h-[calc(100vh-133px)]">
        <Component {...pageProps} />
      </div>
      <BottomBar />
    </>
    // </Layout>
    // </AppContextProvider>
  );
}
