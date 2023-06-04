import "./global.css";
import NavBar from "../components/Navbar/NavBar";
//
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   icons: {
//     icon: "",
//   },
// };
//nextjs.org/docs/app/api-reference/functions/generate-metadata#icon
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#icon

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <NavBar />
      </body>
    </html>
  );
}
