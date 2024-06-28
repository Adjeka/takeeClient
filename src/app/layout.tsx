import { Inconsolata } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss"
import Navbar from "../components/navbar/Navbar";
import classNames from 'classnames';

const font = Inconsolata({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(font.className, styles.antdesign)}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}