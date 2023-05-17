"use client";

import { useRouter } from "next/navigation";
import Head from "next/head";
import NavBar from "../navbar/NavBar";

export default function DetailPage({ response, params }) {
  const router = useRouter();

  return (
    <>
      <div>Detail Page</div>
      <Head>
        {/* <title>{response.results.title}</title> */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
    </>
  );
}
