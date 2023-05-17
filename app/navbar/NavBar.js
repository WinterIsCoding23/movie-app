"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledNavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 1rem;
  border: solid 0.2em black;
  border-radius: 2em;

  // position: relative;
  // min-height: 100vh;

  position: sticky;
  z-index: 30;
  bottom: 0;
  background-color: rgb(115, 95, 50);
`;

// const imageStyle = {};

export default function NavBar() {
  // const router = useRouter();

  return (
    <StyledNavBar>
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
      <Image
        src={"/../public/back-button.png"}
        width={50}
        height={50}
        alt="back-button"
        // style={imageStyle}
      />
    </StyledNavBar>
  );
}
