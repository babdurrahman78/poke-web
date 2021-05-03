import Topbar from "./Topbar";
import Footer from "./Footer";
import Head from "next/head";
import { css } from "@emotion/react";

const Layout = ({ children }) => {
  return (
    <div
      className="container"
      css={css`
        min-width: 360px;
        max-width: 1366px;
        margin: auto;
        padding: 0;
        overflow: hidden
      `}
    >
      <Head>
        <title> Pokemon App </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
