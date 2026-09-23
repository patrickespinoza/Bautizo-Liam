import React from "react";
import { motion } from "framer-motion";

export default function Portada() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#DCEAF3]">
      {/* Fotografía de portada */}
      <img
        src="/portada.jpg"
        alt="Bautizo de Liam Samuel Chapa Garabito"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      {/* Degradado inferior para mejorar la lectura */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/75
          via-black/10
          to-transparent
        "
      />

      {/* Nombre y fecha */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10
          flex
          min-h-[100svh]
          w-full
          flex-col
          items-center
          justify-end
          px-5
          pb-14
          text-center
          sm:px-8
          sm:pb-20
          md:pb-24
        "
      >
        <h1
          className="
            max-w-5xl
            font-cursiveDancing
            text-5xl
            leading-[1.05]
            text-white
            drop-shadow-[0_3px_12px_rgba(0,0,0,0.65)]
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
          "
        >
          Liam Samuel
          <span
            className="
              mt-2
              block
              font-playfair
              text-xl
              font-normal
              tracking-[0.12em]
              sm:text-2xl
              md:text-3xl
            "
          >
            Chapa Garabito
          </span>
        </h1>

      </motion.div>
    </section>
  );
}