import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const unidades = ["Días", "Horas", "Minutos", "Segundos"];

const Contador = ({
  fecha = "2026-11-14T12:00:00-06:00",
}) => {
  const calcularTiempo = () => {
    const diferencia = new Date(fecha).getTime() - Date.now();

    if (diferencia <= 0) {
      return {
        Días: 0,
        Horas: 0,
        Minutos: 0,
        Segundos: 0,
      };
    }

    return {
      Días: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
      Horas: Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
      ),
      Minutos: Math.floor(
        (diferencia / (1000 * 60)) % 60
      ),
      Segundos: Math.floor(
        (diferencia / 1000) % 60
      ),
    };
  };

  const [tiempoRestante, setTiempoRestante] = useState(
    calcularTiempo
  );

  useEffect(() => {
    const actualizarContador = () => {
      setTiempoRestante(calcularTiempo());
    };

    actualizarContador();

    const intervalo = window.setInterval(
      actualizarContador,
      1000
    );

    return () => window.clearInterval(intervalo);
  }, [fecha]);

  const formatearNumero = (numero) => {
    return String(numero).padStart(2, "0");
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#DCECF6]
        via-[#CFE4F1]
        to-[#E8F2F7]
        px-4
        py-20
        sm:px-6
        sm:py-24
        md:py-28
      "
    >
      {/* Nubes superiores */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-20
          -top-20
          h-64
          w-80
          rounded-full
          bg-white/70
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[18%]
          top-8
          h-36
          w-72
          rounded-full
          bg-white/55
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          -top-12
          h-72
          w-96
          rounded-full
          bg-white/75
          blur-3xl
        "
      />

      {/* Nubes inferiores */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-16
          h-64
          w-[28rem]
          rounded-full
          bg-white/75
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-28
          right-[-5rem]
          h-72
          w-[30rem]
          rounded-full
          bg-[#FFFDF8]/80
          blur-3xl
        "
      />

      {/* Brillos suaves */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[32rem]
          w-[32rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/20
          blur-[90px]
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
            Cada día falta menos
          </h2>

          {/* Separador */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#B8A98F]" />

            <span
              className="
                font-playfair
                text-xl
                text-[#A99576]
              "
            >
              ✦
            </span>

            <span className="h-px w-12 bg-[#B8A98F]" />
          </div>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              font-playfair
              text-lg
              italic
              leading-relaxed
              text-[#435B6B]
              sm:text-xl
            "
          >
            Un día lleno de fe, amor y bendiciones está por comenzar.
          </p>
        </motion.div>

        {/* Contador */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="
            mx-auto
            mt-12
            grid
            max-w-4xl
            grid-cols-2
            gap-4
            sm:grid-cols-4
            sm:gap-5
            md:mt-14
          "
        >
          {unidades.map((unidad, index) => (
            <motion.div
              key={unidad}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1 * index,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                transition: { duration: 0.25 },
              }}
              className="
                flex
                min-h-[145px]
                flex-col
                items-center
                justify-center
                rounded-[1.75rem]
                border
                border-white/80
                bg-[#FFFDF8]/90
                px-3
                py-6
                text-center
                shadow-[0_15px_40px_rgba(62,96,120,0.15)]
                backdrop-blur-sm
                sm:min-h-[165px]
              "
            >
              <span
                className="
                  font-playfair
                  text-4xl
                  font-medium
                  leading-none
                  text-[#294A62]
                  sm:text-5xl
                  md:text-6xl
                "
              >
                {formatearNumero(tiempoRestante[unidad])}
              </span>

              <span
                className="
                  mt-4
                  font-playfair
                  text-xs
                  uppercase
                  tracking-[0.16em]
                  text-[#657984]
                  sm:text-sm
                "
              >
                {unidad}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Contador;