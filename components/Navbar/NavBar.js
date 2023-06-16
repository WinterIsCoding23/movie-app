"use client";

import Image from "next/image";
import Link from "next/link";
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
          alt={"home-button"}
          
        />
      </Link>
      <Image
        onClick={() => router.back()}
        src={"/../public/back-button.png"}
        width={50}
        height={50}
        alt="back-button"
            />
    </nav>
  );
}
