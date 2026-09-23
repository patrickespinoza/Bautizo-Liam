import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const FraseFinal = () => {
  return (
    <section
      className="
        relative
        flex
        min-h-[65vh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-b
        from-[#F8F3EA]
        via-[#E9F3F8]
        to-[#CFE4F0]
        px-6
        py-24
        sm:px-8
        sm:py-28
      "
    >
      {/* Nubes decorativas */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-28
          -top-24
          h-80
          w-[30rem]
          rounded-full
          bg-white/80
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          top-1/4
          h-96
          w-[30rem]
          rounded-full
          bg-white/60
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-28
          left-1/4
          h-80
          w-[32rem]
          rounded-full
          bg-white/75
          blur-3xl
        "
      />

      {/* Brillo central */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[28rem]
          w-[28rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/30
          blur-[80px]
        "
      />

      {/* Contenido */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, amount: 0.35 }}
        className="
          relative
          z-10
          mx-auto
          max-w-3xl
          text-center
        "
      >
        {/* Icono superior */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-white/65
            text-[#6690A8]
            shadow-[0_15px_35px_rgba(65,103,126,0.15)]
            backdrop-blur-md
          "
        >
          <Sparkles size={34} strokeWidth={1.35} />
        </motion.div>



        {/* Separador */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#B8A98F]" />

          <span className="font-playfair text-xl text-[#A99576]">
            ✦
          </span>

          <span className="h-px w-12 bg-[#B8A98F]" />
        </div>

        {/* Frase */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.25,
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            mt-8
            max-w-3xl
            font-playfair
            text-3xl
            font-normal
            leading-relaxed
            text-[#294A62]
            sm:text-4xl
            sm:leading-relaxed
            md:text-5xl
            md:leading-relaxed
          "
        >
          Gracias por acompañarme y compartir conmigo este día tan
          especial.
        </motion.h2>

        {/* Nombre */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.45,
          }}
          viewport={{ once: true }}
          className="
            mt-9
            font-cursiveDancing
            text-4xl
            text-[#708E9E]
            sm:text-5xl
          "
        >
          Liam Samuel
        </motion.p>

        {/* Corazón decorativo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.6,
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            mt-8
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-10 bg-[#B8AA90]" />

          <Heart
            size={20}
            strokeWidth={1.4}
            className="text-[#A99576]"
          />

          <span className="h-px w-10 bg-[#B8AA90]" />
        </motion.div>

        <p
          className="
            mt-8
            font-playfair
            text-xs
            uppercase
            tracking-[0.25em]
            text-[#78909C]
          "
        >
          14 de noviembre de 2026
        </p>
      </motion.div>
    </section>
  );
};

export default FraseFinal;