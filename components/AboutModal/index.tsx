"use client";
import { motion } from "framer-motion";
import { FC } from "react";
import { Hero } from "../Hero";
import { useRouter } from "next/navigation";

export const AboutModal: FC = () => {
  const { push } = useRouter();
  return (
    <div className="fixed inset-0 z-[1000]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className="bg-offwhite h-[110px] w-[110x] rounded-full z-[1000]"
            onClick={() => push("/")}
          />
        </div>
        <div className="absolute inset-0 text-offwhite bg-primary">
          <Hero />
        </div>
      </motion.div>
    </div>
  );
};
