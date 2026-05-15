"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const INTRO_DURATION_MS = 7200;

export function SakuraIntro() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  if (!visible || reduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#160405]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <button
        aria-label="跳过开场"
        className="absolute right-5 top-5 z-[120] rounded-full border border-white/45 bg-black/35 px-4 py-2 text-sm font-semibold text-white shadow-2xl backdrop-blur-md transition hover:bg-black/50"
        onClick={() => setVisible(false)}
      >
        跳过
      </button>

      <motion.div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_54%_26%,rgba(255,214,186,.24),transparent_28%),radial-gradient(circle_at_16%_68%,rgba(127,29,29,.34),transparent_36%),linear-gradient(115deg,#120304_0%,#3f0b0d_52%,#070102_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div className="absolute inset-x-0 bottom-0 z-[1] h-[42vh] bg-gradient-to-t from-black/78 via-black/28 to-transparent" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_52%_43%,transparent_35%,rgba(2,0,1,.62)_100%)]" />

      <motion.div
        className="absolute bottom-[-3vh] left-[-8vw] z-10 h-[min(86vw,82vh)] w-[min(86vw,82vh)] md:bottom-[-5vh] md:left-[1vw] md:h-[min(58vw,86vh)] md:w-[min(58vw,86vh)]"
        initial={{ x: -36, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <Image
          src="/assets/樱花树-cut.webp"
          alt=""
          width={434}
          height={434}
          className="h-full w-full object-contain object-left-bottom"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[-1vh] right-[7vw] z-20 h-[min(74vh,610px)] w-[min(54vh,448px)] drop-shadow-[0_34px_86px_rgba(0,0,0,.92)] md:right-[15vw] md:h-[min(80vh,680px)] md:w-[min(59vh,500px)]"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.95, ease: "easeOut" }}
      >
        <Image
          src="/assets/武士-cut.webp"
          alt=""
          width={288}
          height={392}
          className="h-full w-full object-contain object-bottom"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.72, 0.72, 0.58, 0.28, 0] }}
        transition={{ duration: 6.15, times: [0, 0.14, 0.48, 0.66, 0.86, 1], ease: "easeOut" }}
      >
        <Image
          src="/assets/樱花飘落gif.gif"
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute left-[47%] top-[38%] z-50 h-[260px] w-[253px] max-md:h-[170px] max-md:w-[165px]"
        initial={{ x: "-42vw", y: "-25vh", scale: 0.12, rotate: -30, opacity: 0 }}
        animate={{
          x: ["-42vw", "-34vw", "-25vw", "-16vw", "-8vw", "-2vw", "0vw"],
          y: ["-25vh", "-21vh", "-16vh", "-10vh", "-5vh", "-1vh", "0vh"],
          scale: [0.12, 0.2, 0.36, 0.68, 1.25, 2.35, 4.8],
          rotate: [-30, -24, -16, -7, 2, 1, 0],
          opacity: [0, 0.72, 1, 1, 1, 1, 1],
        }}
        transition={{
          delay: 3.0,
          duration: 2.65,
          times: [0, 0.14, 0.3, 0.48, 0.66, 0.84, 1],
          ease: "easeInOut",
        }}
      >
        <Image
          src="/assets/单片樱花-cut.webp"
          alt=""
          width={253}
          height={260}
          className="h-full w-full object-contain drop-shadow-[0_0_85px_rgba(255,230,230,.84)]"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[58] bg-[#fff1ee]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.88, 1] }}
        transition={{ delay: 5.05, duration: 0.56, times: [0, 0.35, 0.78, 1], ease: "easeOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 z-[80] h-[min(60vw,62vh)] w-[min(160vw,160vh)] origin-center -translate-x-1/2 -translate-y-1/2 -rotate-[31deg]"
        initial={{ x: "-125vw", opacity: 0 }}
        animate={{ x: ["-125vw", "0vw", "32vw"], opacity: [0, 1, 0.92] }}
        transition={{ delay: 5.58, duration: 0.64, times: [0, 0.5, 1], ease: "easeOut" }}
      >
        <Image
          src="/assets/刀光-cut.gif"
          alt=""
          fill
          sizes="160vw"
          unoptimized
          className="object-cover object-center"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[92] bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 0.94, 0] }}
        transition={{ delay: 6.16, duration: 0.86, times: [0, 0.16, 0.36, 0.68, 1], ease: "easeOut" }}
      />
    </motion.div>
  );
}
