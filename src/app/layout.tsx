import "./globals.css";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neumorphic Focus Timer",
  description: "A beautiful focus timer app with neumorphic design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-[#E0E5EC] m-0 p-0 min-h-screen">
        {children}
      </body>
    </html>
  );
}
