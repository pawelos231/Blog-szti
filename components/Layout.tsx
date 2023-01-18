import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Head from "next/head";
import { useTheme } from "next-themes";
const Layout = ({ children }: { children: any }) => {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400;1,500&family=Hahmlet:wght@100;200;300;500;600&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://blog2-taupe.vercel.app/" />
        <link
          rel="alternate"
          href="https://blog2-taupe.vercel.app/"
          hrefLang="pl-PL"
        />
        <link rel="icon" type="image/png" href="/dawnofthegreg.jpg" />
        <title>Blog Szti</title>

        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta
          name="keywords"
          content="Custom, design, customowe kurtki, customowe buty, customowe bluzki, malowane, ręcznie, style"
        />
        <meta
          name="description"
          content="Strona poświęcona aktualnym wydarzeniom w szti"
        />
        <meta name="author" content="Pawelos" />
        <meta property="og:title" content="Blog Szti" />
        <meta property="og:url" content="https://blog2-taupe.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/dawnofthegreg.jpg" />
        <meta
          property="og:description"
          content="Strona poświęcona aktualnym wydarzeniom w szti"
        />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="BB customs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@LinekPawe" />
        <meta name="twitter:title" content="BB Customs Eccomerce Shop" />
        <meta
          name="twitter:description"
          content="Strona poświęcona aktualnym wydarzeniom w szti"
        />
        <meta name="twitter:image" content="/dawnofthegreg.jpg" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
