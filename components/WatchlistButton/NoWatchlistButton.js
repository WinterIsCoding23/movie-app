import Image from "next/image";

export default function NoWatchlistButton() {
  return (
    <button type="button">
      <Image
        src={"/../public/director-chair-filled.png"}
        width={30}
        height={30}
        alt={"no-favorite-yet"}
      />
      <p>"make favorite"</p>
    </button>
  );
}
