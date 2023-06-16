import "./global.css";
import NavBar from "../components/Navbar/NavBar";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   icons: {
//     icon: "",
//   },
// };

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
