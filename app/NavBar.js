import Image from "next/image";

export default function NavBar() {
  return (
    <nav>
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
    </nav>
  );
}
