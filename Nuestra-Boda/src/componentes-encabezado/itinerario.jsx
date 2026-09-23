import React from "react";
import { motion } from "framer-motion";
import {
  Church,
  Coffee,
  GlassWater,
  Leaf,
  Music2,
  PartyPopper,
  Utensils,
} from "lucide-react";

const eventos = [
  {
    hora: "12:00",
    titulo: "Misa",
    descripcion: "Ceremonia de bautizo",
    icono: Church,
  },
  {
    hora: "14:00",
    titulo: "Recepción",
    descripcion: "Bienvenida a nuestros invitados",
    icono: GlassWater,
  },
  {
    hora: "15:30",
    titulo: "Comida",
    descripcion: "Compartamos juntos la mesa",
    icono: Utensils,
  },
  {
    hora: "16:00",
    titulo: "Baile",
    descripcion: "Comienza la celebración",
    icono: PartyPopper,
  },
  {
    hora: "19:00",
    titulo: "Noche de música",
    descripcion: "Sigamos celebrando juntos",
    icono: Music2,
  },
  {
    hora: "20:00",
    titulo: "Para recargar energía",
    descripcion: "Un momento para disfrutar",
    icono: Coffee,
  },
];

/* Rama decorativa creada con CSS e iconos */
const RamaDecorativa = ({ derecha = false }) => {
  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none
        absolute
        hidden
        h-72
        w-32
        opacity-45
        md:block
        ${derecha ? "-right-4 top-24" : "-left-4 bottom-20"}
      `}
    >
      {/* Tallo */}
      <span
        className={`
          absolute
          left-1/2
          top-5
          h-64
          w-px
          origin-bottom
          bg-[#8FA69D]
          ${derecha ? "-rotate-[24deg]" : "rotate-[24deg]"}
        `}
      />

      {/* Hojas */}
      <Leaf
        className={`
          absolute
          top-9
          text-[#86A398]
          ${derecha ? "left-10 -rotate-12" : "right-10 rotate-12"}
        `}
        size={42}
        strokeWidth={1.2}
      />

      <Leaf
        className={`
          absolute
          top-24
          text-[#A5B8A9]
          ${derecha ? "left-16 rotate-[30deg]" : "right-16 -rotate-[30deg]"}
        `}
        size={48}
        strokeWidth={1.2}
      />

      <Leaf
        className={`
          absolute
          top-40
          text-[#76988F]
          ${derecha ? "left-7 -rotate-12" : "right-7 rotate-12"}
        `}
        size={45}
        strokeWidth={1.2}
      />

      <Leaf
        className={`
          absolute
          top-52
          text-[#A5B8A9]
          ${derecha ? "left-14 rotate-[28deg]" : "right-14 -rotate-[28deg]"}
        `}
        size={40}
        strokeWidth={1.2}
      />
    </div>
  );
};

const Itinerario = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F8F3EA]
        px-4
        py-20
        sm:px-6
        sm:py-24
        md:py-28
      "
    >
      {/* Fondos suaves */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-28
          top-0
          h-96
          w-96
          rounded-full
          bg-[#DCECF5]/60
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-28
          bottom-0
          h-96
          w-96
          rounded-full
          bg-[#CFE4EF]/55
          blur-3xl
        "
      />

      {/* Ramas decorativas laterales */}
      <RamaDecorativa />

      <RamaDecorativa derecha />

      <div className="relative z-10 mx-auto max-w-5xl">
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
            Celebremos juntos
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
            Itinerario
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
            Hemos preparado cada momento con mucho cariño para
            compartirlo contigo.
          </p>
        </motion.div>

        {/* Línea del itinerario */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Línea vertical */}
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-8
              left-[39px]
              top-8
              w-px
              bg-gradient-to-b
              from-[#A8C8DB]/20
              via-[#719BB5]
              to-[#A8C8DB]/20
              sm:left-1/2
              sm:-translate-x-1/2
            "
          />

          <div className="space-y-9 sm:space-y-12">
            {eventos.map((evento, index) => {
              const Icono = evento.icono;
              const eventoDerecha = index % 2 !== 0;

              return (
                <motion.article
                  key={`${evento.hora}-${evento.titulo}`}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, amount: 0.35 }}
                  className="
                    relative
                    grid
                    grid-cols-[80px_1fr]
                    items-center
                    sm:grid-cols-[1fr_96px_1fr]
                  "
                >
                  {/* Información izquierda en escritorio */}
                  <div
                    className={`
                      hidden
                      px-6
                      sm:block
                      ${
                        eventoDerecha
                          ? "sm:col-start-3 sm:text-left"
                          : "sm:col-start-1 sm:row-start-1 sm:text-right"
                      }
                    `}
                  >
                    <p
                      className="
                        font-playfair
                        text-xl
                        font-medium
                        text-[#294A62]
                        md:text-2xl
                      "
                    >
                      {evento.titulo}
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-relaxed
                        text-[#71828B]
                      "
                    >
                      {evento.descripcion}
                    </p>
                  </div>

                  {/* Icono central */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="
                      relative
                      z-10
                      col-start-1
                      row-start-1
                      mx-auto
                      flex
                      h-[78px]
                      w-[78px]
                      items-center
                      justify-center
                      rounded-full
                      border-[5px]
                      border-[#F8F3EA]
                      bg-[#DDECF4]
                      text-[#4F7892]
                      shadow-[0_10px_28px_rgba(72,105,125,0.20)]
                      sm:col-start-2
                      sm:h-[84px]
                      sm:w-[84px]
                    "
                  >
                    <Icono size={31} strokeWidth={1.4} />
                  </motion.div>

                  {/* Información móvil */}
                  <div
                    className="
                      col-start-2
                      row-start-1
                      pl-5
                      sm:hidden
                    "
                  >
                    <p
                      className="
                        font-playfair
                        text-2xl
                        font-medium
                        text-[#294A62]
                      "
                    >
                      {evento.titulo}
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-relaxed
                        text-[#71828B]
                      "
                    >
                      {evento.descripcion}
                    </p>
                  </div>

                  {/* Horario */}
                  <div
                    className={`
                      hidden
                      px-6
                      sm:block
                      ${
                        eventoDerecha
                          ? "sm:col-start-1 sm:row-start-1 sm:text-right"
                          : "sm:col-start-3 sm:text-left"
                      }
                    `}
                  >
                    <p
                      className="
                        font-playfair
                        text-lg
                        font-semibold
                        tracking-[0.08em]
                        text-[#5F849A]
                        md:text-xl
                      "
                    >
                      {evento.hora} hrs.
                    </p>
                  </div>

                  {/* Horario móvil */}
                  <span
                    className="
                      absolute
                      left-[39px]
                      top-[65px]
                      z-20
                      -translate-x-1/2
                      rounded-full
                      bg-[#6F98B0]
                      px-2
                      py-1
                      text-[9px]
                      font-semibold
                      tracking-wide
                      text-white
                      shadow-md
                      sm:hidden
                    "
                  >
                    {evento.hora}
                  </span>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Frase final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.25,
          }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >

          <p
            className="
              mt-3
              font-playfair
              text-xs
              uppercase
              tracking-[0.22em]
              text-[#8A999F]
            "
          >
            Gracias por ser parte de este día tan especial
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Itinerario;