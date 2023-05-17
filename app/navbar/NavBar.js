"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className={styles.navBarContainer}>
      <Link href="/">
        <Image
          src={"/../public/home-button.png"}
          width={50}
          height={50}
          alt="home-button"
          // style={imageStyle}
        />
      </Link>
      <Image
        src={"/../public/play-button.png"}
        width={50}
        height={50}
        alt="placeholder"
        // style={imageStyle}
      />
      {/* <button className={styles.backButton} type="button" onClick={() => router.back()}> */}
      <Image
        onClick={() => router.back()}
        src={"/../public/back-button.png"}
        width={50}
        height={50}
        alt="back-button"
        // style={imageStyle}
      />
    </nav>
  );
}
