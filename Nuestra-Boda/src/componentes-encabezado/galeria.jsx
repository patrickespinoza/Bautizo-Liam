import React from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const fotografias = [
  {
    src: "/galeria01.jpeg",
    alt: "Liam Samuel",
    posicion: "object-center",
  },
  {
    src: "/galeria02.jpeg",
    alt: "Un momento especial de Liam Samuel",
    posicion: "object-center",
  },
];

const Galeria = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#E3F0F7]
        via-[#F8F3EA]
        to-[#F8F3EA]
        px-5
        py-20
        sm:px-8
        sm:py-24
        md:py-28
      "
    >
      {/* Nubes y luces decorativas */}
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
          -right-32
          top-1/3
          h-96
          w-96
          rounded-full
          bg-[#C9E1EF]/55
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

      {/* Rama decorativa izquierda */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-5
          bottom-10
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
            text-[#8EA69B]
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
            text-[#A4B7A9]
          "
        />

        <Leaf
          size={48}
          strokeWidth={1.1}
          className="
            absolute
            left-9
            top-36
            rotate-[30deg]
            text-[#76968C]
          "
        />

        <Leaf
          size={42}
          strokeWidth={1.1}
          className="
            absolute
            right-1
            top-52
            -rotate-[30deg]
            text-[#9DAFA5]
          "
        />
      </div>

      {/* Rama decorativa derecha */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-5
          top-28
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
            text-[#8EA69B]
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
            text-[#A4B7A9]
          "
        />

        <Leaf
          size={48}
          strokeWidth={1.1}
          className="
            absolute
            left-9
            top-36
            rotate-[30deg]
            text-[#76968C]
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
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <p
            className="
              font-playfair
              text-xs
              uppercase
              tracking-[0.35em]
              text-[#778E9C]
              sm:text-sm
            "
          >
            Momentos llenos de amor
          </p>

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
            Galería
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#B8A98F]" />

            <span className="font-playfair text-xl text-[#A99576]">
              ✦
            </span>

            <span className="h-px w-12 bg-[#B8A98F]" />
          </div>

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              font-playfair
              text-lg
              italic
              leading-relaxed
              text-[#536B79]
              sm:text-xl
            "
          >
            Pequeños instantes que guardaremos por siempre en el
            corazón.
          </p>
        </motion.div>

        {/* Composición de fotografías */}
        <div
          className="
            relative
            mx-auto
            mt-14
            min-h-[850px]
            max-w-4xl
            sm:min-h-[1020px]
            md:min-h-[700px]
          "
        >
          {/* Primera fotografía */}
          <motion.div
            initial={{
              opacity: 0,
              x: -45,
              rotate: -6,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotate: -3,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{
              rotate: 0,
              scale: 1.02,
              zIndex: 30,
            }}
            className="
              absolute
              left-0
              top-0
              z-10
              w-[88%]
              overflow-hidden
              rounded-[2rem]
              border-[9px]
              border-white
              bg-white
              shadow-[0_25px_60px_rgba(56,82,98,0.22)]
              sm:w-[68%]
              sm:border-[12px]
              md:left-[4%]
              md:w-[56%]
            "
          >
            <img
              src={fotografias[0].src}
              alt={fotografias[0].alt}
              loading="eager"
              className={`
                h-[390px]
                w-full
                object-cover
                sm:h-[500px]
                md:h-[570px]
                ${fotografias[0].posicion}
              `}
            />

            <div
              className="
                flex
                h-16
                items-center
                justify-center
                bg-white
                px-4
                text-center
                sm:h-20
              "
            >
              <p
                className="
                  font-cursiveDancing
                  text-2xl
                  text-[#6F8795]
                  sm:text-3xl
                "
              >
                Liam Samuel
              </p>
            </div>
          </motion.div>

          {/* Segunda fotografía */}
          <motion.div
            initial={{
              opacity: 0,
              x: 45,
              rotate: 6,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotate: 3,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{
              rotate: 0,
              scale: 1.02,
              zIndex: 30,
            }}
            className="
              absolute
              bottom-0
              right-0
              z-20
              w-[82%]
              overflow-hidden
              rounded-[2rem]
              border-[9px]
              border-white
              bg-white
              shadow-[0_25px_60px_rgba(56,82,98,0.24)]
              sm:w-[61%]
              sm:border-[12px]
              md:bottom-2
              md:right-[3%]
              md:w-[49%]
            "
          >
            <img
              src={fotografias[1].src}
              alt={fotografias[1].alt}
              loading="eager"
              className={`
                h-[350px]
                w-full
                object-cover
                sm:h-[440px]
                md:h-[500px]
                ${fotografias[1].posicion}
              `}
            />

            <div
              className="
                flex
                h-16
                items-center
                justify-center
                bg-white
                px-4
                text-center
                sm:h-20
              "
            >
              <p
                className="
                  font-playfair
                  text-sm
                  italic
                  tracking-wide
                  text-[#6F8795]
                  sm:text-base
                "
              >
                Una vida llena de bendiciones
              </p>
            </div>
          </motion.div>

          {/* Cruz decorativa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.5,
            }}
            viewport={{ once: true }}
            aria-hidden="true"
            className="
              absolute
              right-3
              top-10
              hidden
              font-playfair
              text-4xl
              text-[#B8A98F]/65
              sm:block
              md:right-[5%]
            "
          >
            †
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Galeria;