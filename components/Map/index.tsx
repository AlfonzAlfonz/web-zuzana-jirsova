"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

export const Map: FC<{ children?: ReactNode }> = ({ children }) => {
  const { push } = useRouter();
  return (
    <>
      <ClientMap onCenterClick={() => push("/zuzka")} />
      <div className="h-[100vh] w-[100vw] inset-0 pointer-events-none fixed flex justify-center items-center z-[1000] pointer">
        <div className="bg-primary h-[110px] w-[110px] rounded-full animate-pulseShadow" />
      </div>
      {children}
    </>
  );
};

const ClientMap = dynamic(() => import("./InnerMap").then((m) => m.InnerMap), {
  ssr: false,
});
