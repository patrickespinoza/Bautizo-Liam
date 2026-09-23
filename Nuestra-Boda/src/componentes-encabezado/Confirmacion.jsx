import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Baby,
  CheckCircle2,
  LockKeyhole,
  MessageCircle,
  TicketCheck,
  TriangleAlert,
} from "lucide-react";

/*
  Debe ser exactamente la misma clave
  utilizada dentro del generador.
*/
const CLAVE_SECRETA =
  "Liam-Samuel-Chapa-Garabito-2026";

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

const convertirBase64URLABytes = (texto) => {
  let base64 = texto
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  while (base64.length % 4 !== 0) {
    base64 += "=";
  }

  const binario = atob(base64);

  return Uint8Array.from(
    binario,
    (caracter) => caracter.charCodeAt(0)
  );
};

const obtenerClaveDesencriptacion = async () => {
  const codificador = new TextEncoder();

  const hash = await window.crypto.subtle.digest(
    "SHA-256",
    codificador.encode(CLAVE_SECRETA)
  );

  return window.crypto.subtle.importKey(
    "raw",
    hash,
    {
      name: "AES-GCM",
    },
    false,
    ["decrypt"]
  );
};

const desencriptarId = async (id) => {
  const contenido = convertirBase64URLABytes(id);

  if (contenido.length <= 12) {
    throw new Error("El enlace está incompleto.");
  }

  const iv = contenido.slice(0, 12);
  const informacionEncriptada = contenido.slice(12);

  const clave = await obtenerClaveDesencriptacion();

  const informacionDesencriptada =
    await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      clave,
      informacionEncriptada
    );

  const decodificador = new TextDecoder();
  const texto = decodificador.decode(
    informacionDesencriptada
  );

  const datos = JSON.parse(texto);

  if (
    !datos.nombre ||
    typeof datos.nombre !== "string" ||
    !Number.isInteger(Number(datos.pases)) ||
    Number(datos.pases) < 1
  ) {
    throw new Error(
      "Los datos de la invitación no son válidos."
    );
  }

  return {
    nombre: datos.nombre.trim(),
    pases: Number(datos.pases),
  };
};

const Confirmacion = () => {
  const [nombreInvitado, setNombreInvitado] =
    useState("");

  const [pasesPermitidos, setPasesPermitidos] =
    useState(0);

  const [mensajeInvitado, setMensajeInvitado] =
    useState("");

  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");

  const [error, setError] = useState("");
  const [errorEnlace, setErrorEnlace] = useState("");

  const [cargandoInvitacion, setCargandoInvitacion] =
    useState(true);

  const [invitacionValida, setInvitacionValida] =
    useState(false);

  const [enviado, setEnviado] = useState(false);
  const [destino, setDestino] = useState("");

  useEffect(() => {
    let componenteActivo = true;

    const cargarDatosInvitacion = async () => {
      try {
        setCargandoInvitacion(true);
        setErrorEnlace("");
        setInvitacionValida(false);

        const parametros = new URLSearchParams(
          window.location.search
        );

        const id = parametros.get("id");

        if (!id) {
          throw new Error(
            "Esta invitación no contiene datos personalizados."
          );
        }

        const datos = await desencriptarId(id);

        if (!componenteActivo) return;

        setNombreInvitado(datos.nombre);
        setPasesPermitidos(datos.pases);

        /*
          Si solamente tiene un lugar,
          se selecciona automáticamente.
        */
        if (datos.pases === 1) {
          setInvitados("1");
        }

        setInvitacionValida(true);
      } catch (errorLectura) {
        console.error(
          "No se pudo leer la invitación:",
          errorLectura
        );

        if (!componenteActivo) return;

        setNombreInvitado("");
        setPasesPermitidos(0);
        setInvitados("");
        setInvitacionValida(false);

        setErrorEnlace(
          "El enlace de esta invitación no es válido o está incompleto. Solicita un nuevo enlace personalizado."
        );
      } finally {
        if (componenteActivo) {
          setCargandoInvitacion(false);
        }
      }
    };

    cargarDatosInvitacion();

    return () => {
      componenteActivo = false;
    };
  }, []);

  const seleccionarAsistencia = (respuesta) => {
    if (!invitacionValida) return;

    setAsistencia(respuesta);
    setError("");
    setEnviado(false);

    if (respuesta === "No podré asistir") {
      setInvitados("");
    }

    if (
      respuesta === "Sí asistiré" &&
      pasesPermitidos === 1
    ) {
      setInvitados("1");
    }
  };

  const seleccionarInvitados = (cantidad) => {
    setInvitados(cantidad);
    setError("");
    setEnviado(false);
  };

  const enviarConfirmacion = (contacto) => {
    if (!invitacionValida) {
      setError(
        "No es posible confirmar desde un enlace inválido."
      );
      return;
    }

    const nombreLimpio = nombreInvitado.trim();
    const mensajeLimpio = mensajeInvitado.trim();
    const numeroInvitados = Number(invitados);

    if (!asistencia) {
      setError(
        "Selecciona si podrás acompañarnos."
      );
      setEnviado(false);
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      (!Number.isInteger(numeroInvitados) ||
        numeroInvitados < 1)
    ) {
      setError(
        "Selecciona cuántas personas asistirán."
      );
      setEnviado(false);
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      numeroInvitados > pasesPermitidos
    ) {
      setError(
        `Esta invitación tiene un máximo de ${pasesPermitidos} ${
          pasesPermitidos === 1
            ? "lugar"
            : "lugares"
        }.`
      );
      setEnviado(false);
      return;
    }

    setError("");
    setDestino(contacto.nombre);

    const textoLugaresReservados =
      pasesPermitidos === 1
        ? "1 lugar"
        : `${pasesPermitidos} lugares`;

    const cantidadConfirmada =
      asistencia === "Sí asistiré"
        ? `\n👥 *Asistentes confirmados:* ${numeroInvitados}`
        : "";

    const mensajeAdicional = mensajeLimpio
      ? `\n💌 *Mensaje:* ${mensajeLimpio}`
      : "";

    const textoWhatsApp = `
Hola, quiero confirmar mi asistencia al bautizo de Liam Samuel. 🕊️

👤 *Invitación para:* ${nombreLimpio}
🎟️ *Lugares reservados:* ${textoLugaresReservados}
✅ *Respuesta:* ${asistencia}${cantidadConfirmada}${mensajeAdicional}

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

  const opcionesInvitados = Array.from(
    { length: pasesPermitidos },
    (_, index) => index + 1
  );

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

            {/* Cargando datos */}
            {cargandoInvitacion && (
              <div
                className="
                  mt-10
                  flex
                  flex-col
                  items-center
                  justify-center
                  py-8
                  text-[#607D8E]
                "
              >
                <span
                  className="
                    h-8
                    w-8
                    animate-spin
                    rounded-full
                    border-[3px]
                    border-[#B9D2DF]
                    border-t-[#5F8BA4]
                  "
                />

                <p className="mt-4 font-playfair">
                  Leyendo invitación…
                </p>
              </div>
            )}

            {/* Enlace inválido */}
            {!cargandoInvitacion && errorEnlace && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  mt-10
                  rounded-2xl
                  border
                  border-[#DBB3A8]
                  bg-[#FAEEEA]
                  px-5
                  py-5
                  text-[#814F45]
                "
              >
                <div className="flex items-start gap-3">
                  <TriangleAlert
                    size={22}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="font-playfair text-lg">
                      Invitación no válida
                    </p>

                    <p className="mt-2 text-sm leading-6">
                      {errorEnlace}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Formulario */}
            {!cargandoInvitacion &&
              invitacionValida && (
                <div className="mt-10 space-y-5">
                  {/* Nombre bloqueado */}
                  <div>
                    <label
                      htmlFor="nombreInvitado"
                      className="
                        mb-2
                        flex
                        items-center
                        gap-2
                        font-playfair
                        text-sm
                        text-[#506A79]
                      "
                    >
                      Nombre del invitado
                      <LockKeyhole size={14} />
                    </label>

                    <input
                      id="nombreInvitado"
                      type="text"
                      value={nombreInvitado}
                      readOnly
                      className="
                        w-full
                        cursor-not-allowed
                        rounded-2xl
                        border
                        border-[#B9CFDB]
                        bg-[#EAF2F5]
                        px-5
                        py-4
                        font-playfair
                        text-[#294A62]
                        outline-none
                      "
                    />
                  </div>

                  {/* Lugares reservados */}
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-[#BED4DF]
                      bg-[#EDF6F9]
                      px-5
                      py-4
                      text-[#456A7F]
                    "
                  >
                    <TicketCheck
                      size={22}
                      className="shrink-0"
                    />

                    <p className="font-playfair">
                      Esta invitación incluye{" "}
                      <strong>
                        {pasesPermitidos}{" "}
                        {pasesPermitidos === 1
                          ? "lugar"
                          : "lugares"}
                      </strong>
                      .
                    </p>
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
                          seleccionarAsistencia(
                            "Sí asistiré"
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
                            asistencia ===
                            "Sí asistiré"
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
                            asistencia ===
                            "No podré asistir"
                              ? "border-[#88959B] bg-[#7E919B] text-white shadow-[0_10px_25px_rgba(68,88,98,0.18)]"
                              : "border-[#B9CFDB] bg-white/80 text-[#38566A] hover:bg-[#E9F3F7]"
                          }
                        `}
                      >
                        No podré asistir
                      </button>
                    </div>
                  </div>

                  {/* Número de asistentes */}
                  {asistencia === "Sí asistiré" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
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
                        ¿Cuántas personas asistirán?
                      </label>

                      {pasesPermitidos === 1 ? (
                        <div
                          className="
                            w-full
                            rounded-2xl
                            border
                            border-[#B9CFDB]
                            bg-[#EAF2F5]
                            px-5
                            py-4
                            font-playfair
                            text-[#294A62]
                          "
                        >
                          1 persona
                        </div>
                      ) : (
                        <select
                          id="invitados"
                          value={invitados}
                          onChange={(event) =>
                            seleccionarInvitados(
                              event.target.value
                            )
                          }
                          className="
                            w-full
                            rounded-2xl
                            border
                            border-[#B9CFDB]
                            bg-white/85
                            px-5
                            py-4
                            font-playfair
                            text-[#294A62]
                            outline-none
                            transition
                            focus:border-[#6D98B1]
                            focus:ring-2
                            focus:ring-[#8CB4CA]/30
                          "
                        >
                          <option value="">
                            Selecciona una cantidad
                          </option>

                          {opcionesInvitados.map(
                            (cantidad) => (
                              <option
                                key={cantidad}
                                value={cantidad}
                              >
                                {cantidad}{" "}
                                {cantidad === 1
                                  ? "persona"
                                  : "personas"}
                              </option>
                            )
                          )}
                        </select>
                      )}
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
                        setMensajeInvitado(
                          event.target.value
                        );
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

                  {/* Errores */}
                  {error && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
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

                  {/* Confirmación visual */}
                  {enviado && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
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
                        Se abrió WhatsApp para enviar
                        la confirmación con {destino}.
                      </p>
                    </motion.div>
                  )}

                  {/* WhatsApp */}
                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      pt-3
                      sm:grid-cols-2
                    "
                  >
                    <motion.button
                      type="button"
                      onClick={() =>
                        enviarConfirmacion(
                          contactos.mama
                        )
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
                        hover:bg-[#4F7F9B]
                      "
                    >
                      <MessageCircle
                        size={21}
                        strokeWidth={1.7}
                      />

                      Confirmar con mamá
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() =>
                        enviarConfirmacion(
                          contactos.papa
                        )
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
                        hover:bg-[#294C61]
                      "
                    >
                      <MessageCircle
                        size={21}
                        strokeWidth={1.7}
                      />

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
                    Selecciona solamente uno de los dos
                    contactos para enviar tu confirmación.
                  </p>
                </div>
              )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Confirmacion;