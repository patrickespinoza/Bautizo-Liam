import React from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

const Regalos = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F8F3EA]
        px-5
        py-20
        sm:px-8
        sm:py-24
        md:py-28
      "
    >
      {/* Decoraciones de fondo */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-28
          -top-24
          h-80
          w-96
          rounded-full
          bg-[#D8EAF4]/70
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-0
          h-96
          w-96
          rounded-full
          bg-[#C8DFEC]/55
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-8rem]
          left-1/3
          h-72
          w-[30rem]
          rounded-full
          bg-white/75
          blur-3xl
        "
      />

      {/* Tarjeta principal */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, amount: 0.25 }}
        className="
          relative
          z-10
          mx-auto
          max-w-4xl
          overflow-hidden
          rounded-[2.5rem]
          border
          border-white
          bg-white/75
          shadow-[0_25px_70px_rgba(62,91,109,0.16)]
          backdrop-blur-xl
        "
      >
        {/* Franja superior */}
        <div
          aria-hidden="true"
          className="
            h-2
            w-full
            bg-gradient-to-r
            from-[#BEDAE9]
            via-[#729DB7]
            to-[#BEDAE9]
          "
        />

        <div
          className="
            relative
            px-6
            py-14
            text-center
            sm:px-12
            sm:py-16
            md:px-16
            md:py-20
          "
        >
          {/* Brillos interiores */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-14
              top-10
              h-40
              w-40
              rounded-full
              bg-[#DCECF5]/60
              blur-2xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-14
              bottom-6
              h-40
              w-40
              rounded-full
              bg-[#E8DECD]/45
              blur-2xl
            "
          />

          <div className="relative z-10">


            <h2
              className="
                mt-4
                font-playfair
                text-4xl
                font-medium
                text-[#294A62]
                sm:text-5xl
                md:text-6xl
              "
            >
              Con mucho cariño
            </h2>

            {/* Separador */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#B8A98F]" />

              <span className="font-playfair text-xl text-[#A99576]">
                ✦
              </span>

              <span className="h-px w-12 bg-[#B8A98F]" />
            </div>

            {/* Icono */}
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 2,
              }}
              transition={{ duration: 0.3 }}
              className="
                relative
                mx-auto
                mt-10
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                border
                border-[#BDD4E1]
                bg-gradient-to-br
                from-[#EDF6FA]
                to-[#D7E9F3]
                shadow-[0_15px_35px_rgba(77,118,141,0.16)]
              "
            >
              <Gift
                size={58}
                strokeWidth={1.25}
                className="text-[#638CA5]"
              />

              <span
                aria-hidden="true"
                className="
                  absolute
                  -right-1
                  top-3
                  text-lg
                  text-[#B3A17E]
                "
              >
                ✦
              </span>

              <span
                aria-hidden="true"
                className="
                  absolute
                  bottom-5
                  left-1
                  text-xs
                  text-[#B3A17E]
                "
              >
                ✦
              </span>
            </motion.div>

            {/* Frase */}
            <p
              className="
                mx-auto
                mt-10
                max-w-2xl
                font-playfair
                text-xl
                leading-9
                text-[#405A69]
                sm:text-2xl
                sm:leading-10
              "
            >
              Tu presencia es el regalo más importante para nosotros,
              pero si deseas obsequiar algo, agradeceremos mucho tu
              detalle.
            </p>

            {/* Adorno inferior */}
            <div
              aria-hidden="true"
              className="
                mx-auto
                mt-9
                flex
                items-center
                justify-center
                gap-3
                text-[#A99576]
              "
            >
              <span className="h-px w-8 bg-[#C2B69E]" />
              <span className="text-lg">♡</span>
              <span className="h-px w-8 bg-[#C2B69E]" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Regalos;