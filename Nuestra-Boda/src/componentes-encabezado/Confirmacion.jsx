import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Baby,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const contactos = {
  mama: {
    nombre: "Mamá",
    numero: "524521766760",
  },
  papa: {
    nombre: "Papá",
    numero: "524521019440",
  },
};

const Confirmacion = () => {
  const [nombreInvitado, setNombreInvitado] = useState("");
  const [mensajeInvitado, setMensajeInvitado] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [destino, setDestino] = useState("");

  const seleccionarAsistencia = (respuesta) => {
    setAsistencia(respuesta);
    setError("");
    setEnviado(false);

    if (respuesta === "No podré asistir") {
      setInvitados("");
    }
  };

  const enviarConfirmacion = (contacto) => {
    const nombreLimpio = nombreInvitado.trim();
    const mensajeLimpio = mensajeInvitado.trim();

    if (!nombreLimpio || !asistencia) {
      setError(
        "Escribe tu nombre y selecciona si podrás asistir."
      );
      setEnviado(false);
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      (!invitados || Number(invitados) < 1)
    ) {
      setError(
        "Indica cuántas personas asistirán."
      );
      setEnviado(false);
      return;
    }

    setError("");
    setDestino(contacto.nombre);

    const cantidadInvitados =
      asistencia === "Sí asistiré"
        ? `\n👥 *Número de asistentes:* ${invitados}`
        : "";

    const mensajeAdicional = mensajeLimpio
      ? `\n💌 *Mensaje:* ${mensajeLimpio}`
      : "";

    const textoWhatsApp = `
Hola, quiero confirmar mi asistencia al bautizo de Liam Samuel. 🕊️

👤 *Nombre:* ${nombreLimpio}
✅ *Asistencia:* ${asistencia}${cantidadInvitados}${mensajeAdicional}

Muchas gracias.
    `.trim();

    const enlaceWhatsApp = `https://wa.me/${
      contacto.numero
    }?text=${encodeURIComponent(textoWhatsApp)}`;

    window.open(
      enlaceWhatsApp,
      "_blank",
      "noopener,noreferrer"
    );

    setEnviado(true);
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#DCECF5]
        via-[#EDF5F8]
        to-[#F8F3EA]
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
          -top-28
          h-96
          w-[30rem]
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
          -right-32
          top-1/3
          h-96
          w-96
          rounded-full
          bg-[#BFDCEB]/55
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
          bg-white/80
          blur-3xl
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, amount: 0.15 }}
        className="
          relative
          z-10
          mx-auto
          max-w-3xl
          overflow-hidden
          rounded-[2.5rem]
          border
          border-white
          bg-[#FFFDF8]/90
          shadow-[0_28px_75px_rgba(56,88,108,0.20)]
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
            via-[#6F99B2]
            to-[#BEDAE9]
          "
        />

        <div
          className="
            relative
            px-6
            py-14
            sm:px-10
            sm:py-16
            md:px-16
          "
        >
          {/* Decoración interior */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-16
              top-12
              h-44
              w-44
              rounded-full
              bg-[#DDECF5]/55
              blur-2xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-16
              bottom-12
              h-44
              w-44
              rounded-full
              bg-[#E7DDCB]/40
              blur-2xl
            "
          />

          <div className="relative z-10">
            {/* Encabezado */}
            <div className="text-center">
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
                  bg-[#E7F2F7]
                  text-[#5F879E]
                  shadow-[0_12px_30px_rgba(79,120,145,0.15)]
                "
              >
                <Baby size={38} strokeWidth={1.4} />
              </div>

              <p
                className="
                  mt-7
                  font-playfair
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-[#78909E]
                  sm:text-sm
                "
              >
                RSVP
              </p>

              <h2
                className="
                  mt-4
                  font-playfair
                  text-4xl
                  font-medium
                  leading-tight
                  text-[#294A62]
                  sm:text-5xl
                  md:text-6xl
                "
              >
                Confirmar asistencia
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
                  leading-8
                  text-[#536B79]
                "
              >
                Por favor confirma tu asistencia. Nos encantará
                compartir contigo este día tan especial en la vida
                de Liam Samuel.
              </p>
            </div>

            {/* Formulario */}
            <div className="mt-10 space-y-5">
              <div>
                <label
                  htmlFor="nombreInvitado"
                  className="
                    mb-2
                    block
                    font-playfair
                    text-sm
                    text-[#506A79]
                  "
                >
                  Nombre completo
                </label>

                <input
                  id="nombreInvitado"
                  type="text"
                  autoComplete="name"
                  placeholder="Nombre y apellido"
                  value={nombreInvitado}
                  onChange={(event) => {
                    setNombreInvitado(event.target.value);
                    setError("");
                    setEnviado(false);
                  }}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#B9CFDB]
                    bg-white/85
                    px-5
                    py-4
                    text-[#294A62]
                    outline-none
                    transition
                    placeholder:text-[#78909E]/60
                    focus:border-[#6D98B1]
                    focus:ring-2
                    focus:ring-[#8CB4CA]/30
                  "
                />
              </div>

              {/* Asistencia */}
              <div>
                <p
                  className="
                    mb-2
                    font-playfair
                    text-sm
                    text-[#506A79]
                  "
                >
                  ¿Podrás acompañarnos?
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      seleccionarAsistencia("Sí asistiré")
                    }
                    className={`
                      rounded-2xl
                      border
                      px-4
                      py-4
                      font-playfair
                      transition
                      duration-300
                      ${
                        asistencia === "Sí asistiré"
                          ? "border-[#5C87A0] bg-[#6695B2] text-white shadow-[0_10px_25px_rgba(76,122,148,0.22)]"
                          : "border-[#B9CFDB] bg-white/80 text-[#38566A] hover:bg-[#E9F3F7]"
                      }
                    `}
                  >
                    Sí asistiré
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      seleccionarAsistencia(
                        "No podré asistir"
                      )
                    }
                    className={`
                      rounded-2xl
                      border
                      px-4
                      py-4
                      font-playfair
                      transition
                      duration-300
                      ${
                        asistencia === "No podré asistir"
                          ? "border-[#88959B] bg-[#7E919B] text-white shadow-[0_10px_25px_rgba(68,88,98,0.18)]"
                          : "border-[#B9CFDB] bg-white/80 text-[#38566A] hover:bg-[#E9F3F7]"
                      }
                    `}
                  >
                    No podré asistir
                  </button>
                </div>
              </div>

              {/* Número de invitados */}
              {asistencia === "Sí asistiré" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="invitados"
                    className="
                      mb-2
                      block
                      font-playfair
                      text-sm
                      text-[#506A79]
                    "
                  >
                    Número de asistentes
                  </label>

                  <input
                    id="invitados"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    placeholder="Ejemplo: 2"
                    value={invitados}
                    onChange={(event) => {
                      setInvitados(event.target.value);
                      setError("");
                      setEnviado(false);
                    }}
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#B9CFDB]
                      bg-white/85
                      px-5
                      py-4
                      text-[#294A62]
                      outline-none
                      transition
                      placeholder:text-[#78909E]/60
                      focus:border-[#6D98B1]
                      focus:ring-2
                      focus:ring-[#8CB4CA]/30
                    "
                  />
                </motion.div>
              )}

              {/* Mensaje */}
              <div>
                <label
                  htmlFor="mensajeInvitado"
                  className="
                    mb-2
                    block
                    font-playfair
                    text-sm
                    text-[#506A79]
                  "
                >
                  Mensaje para la familia
                </label>

                <textarea
                  id="mensajeInvitado"
                  placeholder="Escribe un mensaje opcional"
                  value={mensajeInvitado}
                  onChange={(event) => {
                    setMensajeInvitado(event.target.value);
                    setEnviado(false);
                  }}
                  rows={4}
                  className="
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-[#B9CFDB]
                    bg-white/85
                    px-5
                    py-4
                    text-[#294A62]
                    outline-none
                    transition
                    placeholder:text-[#78909E]/60
                    focus:border-[#6D98B1]
                    focus:ring-2
                    focus:ring-[#8CB4CA]/30
                  "
                />
              </div>

              {/* Mensajes */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="
                    rounded-xl
                    border
                    border-[#D4A8A8]
                    bg-[#F8EAEA]
                    px-4
                    py-3
                    text-sm
                    text-[#874B4B]
                  "
                >
                  {error}
                </motion.p>
              )}

              {enviado && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-[#A8CDBB]
                    bg-[#EAF6F0]
                    px-4
                    py-3
                    text-sm
                    text-[#426C58]
                  "
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <p>
                    Se abrió WhatsApp para enviar la confirmación
                    con {destino}.
                  </p>
                </motion.div>
              )}

              {/* Botones de WhatsApp */}
              <div className="grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2">
                <motion.button
                  type="button"
                  onClick={() =>
                    enviarConfirmacion(contactos.mama)
                  }
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#6695B2]
                    px-5
                    py-4
                    font-playfair
                    text-base
                    text-white
                    shadow-[0_14px_32px_rgba(73,116,141,0.28)]
                    transition-colors
                    duration-300
                    hover:bg-[#4F7F9B]
                  "
                >
                  <MessageCircle size={21} strokeWidth={1.7} />
                  Confirmar con mamá
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() =>
                    enviarConfirmacion(contactos.papa)
                  }
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#395F76]
                    px-5
                    py-4
                    font-playfair
                    text-base
                    text-white
                    shadow-[0_14px_32px_rgba(45,80,101,0.28)]
                    transition-colors
                    duration-300
                    hover:bg-[#294C61]
                  "
                >
                  <MessageCircle size={21} strokeWidth={1.7} />
                  Confirmar con papá
                </motion.button>
              </div>

              <p
                className="
                  pt-2
                  text-center
                  text-xs
                  leading-relaxed
                  text-[#718590]
                "
              >
                Selecciona solamente uno de los dos contactos para
                enviar tu confirmación.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Confirmacion;