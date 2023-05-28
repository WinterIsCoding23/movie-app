import Image from "next/image";

export default function WatchlistButton() {
  return (
    <button type="button">
      <Image
        src={"/../public/director-chair-empty.png"}
        width={30}
        height={30}
        alt={"already-a-favorite"}
      />
      <p>"un-favor movie"</p>
    </button>
  );
}
