import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Church,
  Clock3,
  GlassWater,
  MapPin,
} from "lucide-react";

const ubicaciones = [
  {
    tipo: "Ceremonia religiosa",
    hora: "12:00 p. m.",
    lugar: "Parroquia Santísima Trinidad",
    enlace: "https://maps.app.goo.gl/G4bmPLQyjGVruV6W7",
    icono: Church,
  },
  {
    tipo: "Recepción",
    hora: "2:00 p. m.",
    lugar: "Salón Terraza Pinera",
    enlace: "https://maps.app.goo.gl/xAVkNWEznmTH2tZj8",
    icono: GlassWater,
  },
];

const Celebracion = () => {
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
      {/* Decoración de fondo */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-80
          w-96
          rounded-full
          bg-[#D9EAF4]/75
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          top-1/3
          h-96
          w-96
          rounded-full
          bg-[#C8E0EE]/55
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-1/4
          h-80
          w-[32rem]
          rounded-full
          bg-white/75
          blur-3xl
        "
      />

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
              text-[#718695]
              sm:text-sm
            "
          >
            Acompáñanos en este día especial
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
            Ubicación
          </h2>

          {/* Separador */}
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
            Nos encantará compartir contigo la ceremonia y la
            celebración de este momento tan importante.
          </p>
        </motion.div>

        {/* Fecha general */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            mt-10
            flex
            w-fit
            items-center
            gap-3
            rounded-full
            border
            border-[#B9CEDA]
            bg-white/70
            px-6
            py-3
            shadow-[0_10px_30px_rgba(72,101,120,0.10)]
            backdrop-blur-sm
          "
        >
          <CalendarDays
            size={20}
            strokeWidth={1.6}
            className="text-[#5E88A3]"
          />

          <p
            className="
              font-playfair
              text-sm
              uppercase
              tracking-[0.12em]
              text-[#294A62]
              sm:text-base
            "
          >
            14 de noviembre de 2026
          </p>
        </motion.div>

        {/* Tarjetas de ubicaciones */}
        <div
          className="
            mx-auto
            mt-12
            grid
            max-w-5xl
            grid-cols-1
            gap-7
            md:grid-cols-2
          "
        >
          {ubicaciones.map((ubicacion, index) => {
            const Icono = ubicacion.icono;

            return (
              <motion.article
                key={ubicacion.lugar}
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
                  py-10
                  text-center
                  shadow-[0_20px_55px_rgba(69,98,116,0.15)]
                  backdrop-blur-md
                  sm:px-9
                  sm:py-12
                "
              >
                {/* Detalle azul superior */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    left-0
                    top-0
                    h-2
                    w-full
                    bg-gradient-to-r
                    from-[#BDD8E8]
                    via-[#83AEC8]
                    to-[#BDD8E8]
                  "
                />

                {/* Resplandor decorativo */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-14
                    -top-14
                    h-36
                    w-36
                    rounded-full
                    bg-[#DCECF5]
                    blur-2xl
                  "
                />

                {/* Icono principal */}
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
                    border-[#BAD2E1]
                    bg-[#EAF4F9]
                    shadow-[0_10px_25px_rgba(79,118,142,0.15)]
                  "
                >
                  <Icono
                    size={36}
                    strokeWidth={1.4}
                    className="text-[#4F7892]"
                  />
                </div>

                <p
                  className="
                    mt-7
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    text-[#7591A2]
                    sm:text-sm
                  "
                >
                  {ubicacion.tipo}
                </p>

                <h3
                  className="
                    mt-3
                    font-playfair
                    text-2xl
                    leading-snug
                    text-[#294A62]
                    sm:text-3xl
                  "
                >
                  {ubicacion.lugar}
                </h3>

                {/* Horario */}
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-[#536B79]
                  "
                >
                  <Clock3
                    size={20}
                    strokeWidth={1.6}
                    className="text-[#6994AE]"
                  />

                  <p className="font-playfair text-lg">
                    {ubicacion.hora}
                  </p>
                </div>

                {/* Botón de ubicación */}
                <motion.a
                  href={ubicacion.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    mt-8
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#6695B2]
                    px-8
                    py-3.5
                    font-playfair
                    text-base
                    text-white
                    shadow-[0_12px_30px_rgba(69,115,143,0.28)]
                    transition-colors
                    duration-300
                    hover:bg-[#4E7E9A]
                    sm:text-lg
                  "
                >
                  <MapPin size={19} strokeWidth={1.7} />
                  Ver ubicación
                </motion.a>
              </motion.article>
            );
          })}
        </div>

   
      </div>
    </section>
  );
};

export default Celebracion;