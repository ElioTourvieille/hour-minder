import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { Auth0Provider } from "@auth0/auth0-react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hour Minder App",
  description: "Votre application de décompte d'heures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Auth0Provider
          domain="dev-kr4du82ftgqwe2z8.us.auth0.com"
          clientId="WnN9Y0u4xx2MiMIC1cYiC6A4xxhWvZ6w"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
          useRefreshTokens={true}
          cacheLocation="localstorage"
        >
          <ConvexProviderWithAuth0 client={convex}>
            {children}
          </ConvexProviderWithAuth0>
        </Auth0Provider>
      </body>
    </html>
  );
}
