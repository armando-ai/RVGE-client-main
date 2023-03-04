import { type AppType } from "next/app";

import "../styles/globals.css";
import "../styles/profilestyles.css";
import React from "react";
import { SocketProvider } from "src/components/socket/SocketContext";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <SocketProvider>
      {" "}
      <Component {...pageProps} />
    </SocketProvider>
  );
};

export default MyApp;
