import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Leaf,
  Sparkles,
  Users,
} from "lucide-react";

const familia = [
  {
    titulo: "Mis padres",
    nombres: [
      "Nora Garabito Arellan",
      "Ulises Chapa García",
    ],
    icono: Heart,
  },
  {
    titulo: "Mis padrinos",
    nombres: [
      "Rosa Garabito Arellan",
      "Roberto Garabito Arellan",
    ],
    icono: Users,
  },
];

const PadresYPadrinos = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#F8F3EA]
        via-[#FDFBF7]
        to-[#DFEDF5]
        px-5
        py-20
        sm:px-8
        sm:py-24
        md:py-28
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
          w-[28rem]
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
          -right-28
          top-1/3
          h-96
          w-96
          rounded-full
          bg-[#C8E0ED]/55
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
          w-[30rem]
          rounded-full
          bg-white/70
          blur-3xl
        "
      />

      {/* Rama izquierda */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-6
          bottom-16
          hidden
          h-72
          w-36
          rotate-[-12deg]
          opacity-40
          md:block
        "
      >
        <span
          className="
            absolute
            bottom-0
            left-1/2
            h-64
            w-px
            rotate-[20deg]
            bg-[#839B91]
          "
        />

        <Leaf
          size={49}
          strokeWidth={1.1}
          className="
            absolute
            left-10
            top-6
            rotate-[25deg]
            text-[#8EA398]
          "
        />

        <Leaf
          size={44}
          strokeWidth={1.1}
          className="
            absolute
            right-1
            top-20
            -rotate-[25deg]
            text-[#A2B5A8]
          "
        />

        <Leaf
          size={47}
          strokeWidth={1.1}
          className="
            absolute
            left-9
            top-36
            rotate-[30deg]
            text-[#78968D]
          "
        />

        <Leaf
          size={41}
          strokeWidth={1.1}
          className="
            absolute
            right-1
            top-52
            -rotate-[30deg]
            text-[#A2B5A8]
          "
        />
      </div>

      {/* Rama derecha */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-6
          top-24
          hidden
          h-72
          w-36
          rotate-[12deg]
          scale-x-[-1]
          opacity-40
          md:block
        "
      >
        <span
          className="
            absolute
            bottom-0
            left-1/2
            h-64
            w-px
            rotate-[20deg]
            bg-[#839B91]
          "
        />

        <Leaf
          size={49}
          strokeWidth={1.1}
          className="
            absolute
            left-10
            top-6
            rotate-[25deg]
            text-[#8EA398]
          "
        />

        <Leaf
          size={44}
          strokeWidth={1.1}
          className="
            absolute
            right-1
            top-20
            -rotate-[25deg]
            text-[#A2B5A8]
          "
        />

        <Leaf
          size={47}
          strokeWidth={1.1}
          className="
            absolute
            left-9
            top-36
            rotate-[30deg]
            text-[#78968D]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, amount: 0.35 }}
          className="text-center"
        >
          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              border
              border-[#BCD3DF]
              bg-white/75
              text-[#678CA2]
              shadow-[0_12px_30px_rgba(72,108,129,0.14)]
            "
          >
            <Sparkles size={34} strokeWidth={1.35} />
          </div>

          <p
            className="
              mt-7
              font-playfair
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#778E9C]
              sm:text-sm
            "
          >
            Con amor y bendición
          </p>

          <h2
            className="
              mx-auto
              mt-4
              max-w-3xl
              font-playfair
              text-4xl
              font-medium
              leading-tight
              text-[#294A62]
              sm:text-5xl
              md:text-6xl
            "
          >
            Padres y padrinos
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#B8A98F]" />

            <span className="font-playfair text-xl text-[#A99576]">
              ✦
            </span>

            <span className="h-px w-12 bg-[#B8A98F]" />
          </div>


        </motion.div>

        {/* Tarjetas */}
        <div
          className="
            mx-auto
            mt-14
            grid
            max-w-5xl
            grid-cols-1
            gap-7
            md:grid-cols-2
          "
        >
          {familia.map((grupo, index) => {
            const Icono = grupo.icono;

            return (
              <motion.article
                key={grupo.titulo}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25 },
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-[2.25rem]
                  border
                  border-white
                  bg-white/80
                  px-6
                  py-11
                  text-center
                  shadow-[0_22px_60px_rgba(63,93,111,0.15)]
                  backdrop-blur-md
                  sm:px-10
                  sm:py-12
                "
              >
                {/* Franja superior */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    left-0
                    top-0
                    h-2
                    w-full
                    bg-gradient-to-r
                    from-[#C3DDEB]
                    via-[#739DB6]
                    to-[#C3DDEB]
                  "
                />

                {/* Resplandor */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-14
                    -top-14
                    h-40
                    w-40
                    rounded-full
                    bg-[#DDECF5]
                    blur-2xl
                  "
                />

                {/* Icono */}
                <div
                  className="
                    relative
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#BCD4E1]
                    bg-[#E7F2F7]
                    text-[#5D849B]
                    shadow-[0_12px_28px_rgba(77,116,139,0.16)]
                  "
                >
                  <Icono size={35} strokeWidth={1.35} />
                </div>


                <h3
                  className="
                    mt-3
                    font-playfair
                    text-3xl
                    font-medium
                    text-[#294A62]
                    sm:text-4xl
                  "
                >
                  {grupo.titulo}
                </h3>

                <div className="mx-auto my-7 h-px w-16 bg-[#C1B397]" />

                {/* Nombres */}
                <div className="space-y-5">
                  {grupo.nombres.map((nombre, nombreIndex) => (
                    <motion.div
                      key={nombre}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay:
                          index * 0.15 +
                          nombreIndex * 0.12 +
                          0.2,
                      }}
                      viewport={{ once: true }}
                    >
                      <p
                        className="
                          font-playfair
                          text-xl
                          leading-relaxed
                          text-[#405D6D]
                          sm:text-2xl
                        "
                      >
                        {nombre}
                      </p>

                      {nombreIndex === 0 && (
                        <span
                          aria-hidden="true"
                          className="
                            mt-4
                            block
                            font-playfair
                            text-base
                            text-[#AF9D7A]
                          "
                        >
                          &
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Frase final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.25,
          }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p
            className="
              font-cursiveDancing
              text-3xl
              text-[#758F9E]
              sm:text-4xl
            "
          >
            Gracias por acompañarme y cuidar siempre de mí
          </p>

          <div
            aria-hidden="true"
            className="
              mx-auto
              mt-6
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
        </motion.div>
      </div>
    </section>
  );
};

export default PadresYPadrinos;