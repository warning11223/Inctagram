"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ReduxProvider } from "../components/ReduxProvider/ReduxProvier";
import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

const googleClientId = "78453806842-gcm0t9icl7ajjh8q97ic2vub6sa91cv0.apps.googleusercontent.com";

export default function RootLayout({ children, params }: { children: ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ReduxProvider>
          <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
