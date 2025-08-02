import "@/styles/globals.css";
import Head from 'next/head'
import { ToastContainer, toast } from "react-toastify";
import {RecoilRoot} from 'recoil'
export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <title>PrepQuest</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        <meta
          name="description"
          content="Web application that contains DSA Problems and article solutions"
        />
      </Head>
      <ToastContainer/>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
