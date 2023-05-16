"use client";

import Image from "next/image";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  height: 100px;
`;

export default function NavBar() {
  return (
    <StyledNavBar>
      <Image
        src={"/../public/home-button.png"}
        width={50}
        height={50}
        alt="home-button"
      />
      <Image
        src={"/../public/play-button.png"}
        width={50}
        height={50}
        alt="placeholder"
      />
      <Image
        src={"/../public/back-button.png"}
        width={50}
        height={50}
        alt="back-button"
      />
    </StyledNavBar>
  );
}
