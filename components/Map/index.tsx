"use client";
import dynamic from "next/dynamic";

export const Map = () => {
  return <ClientMap />;
};

const ClientMap = dynamic(() => import("./InnerMap").then((m) => m.InnerMap), {
  ssr: false,
});
