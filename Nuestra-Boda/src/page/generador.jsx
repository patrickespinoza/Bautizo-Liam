import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  Link2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UserRound,
} from "lucide-react";

const CLAVE_SECRETA =
  "Liam-Samuel-Chapa-Garabito-2026";

const convertirABase64URL = (bytes) => {
  let binario = "";

  bytes.forEach((byte) => {
    binario += String.fromCharCode(byte);
  });

  return btoa(binario)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const obtenerClaveEncriptacion = async () => {
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
    ["encrypt"]
  );
};

const crearIdEncriptado = async (
  nombreInvitado,
  numeroPases
) => {
  const datos = {
    nombre: nombreInvitado,
    pases: numeroPases,
  };

  const codificador = new TextEncoder();
  const clave = await obtenerClaveEncriptacion();

  const iv = window.crypto.getRandomValues(
    new Uint8Array(12)
  );

  const informacionEncriptada =
    await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      clave,
      codificador.encode(JSON.stringify(datos))
    );

  const datosEncriptados = new Uint8Array(
    informacionEncriptada
  );

  const resultado = new Uint8Array(
    iv.length + datosEncriptados.length
  );

  resultado.set(iv, 0);
  resultado.set(datosEncriptados, iv.length);

  return convertirABase64URL(resultado);
};

const Generador = () => {
  const resultadoRef = useRef(null);

  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("1");

  const [link, setLink] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [error, setError] = useState("");
  const [generando, setGenerando] = useState(false);

  const [linkCopiado, setLinkCopiado] = useState(false);
  const [mensajeCopiado, setMensajeCopiado] =
    useState(false);

  useEffect(() => {
    if (!link || !resultadoRef.current) return;

    /*
      En celular lleva suavemente al usuario
      hasta el enlace recién generado.
    */
    const temporizador = window.setTimeout(() => {
      if (window.innerWidth < 1024) {
        resultadoRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 200);

    return () => window.clearTimeout(temporizador);
  }, [link]);

  const limpiarResultado = () => {
    setLink("");
    setMensaje("");
    setError("");
    setLinkCopiado(false);
    setMensajeCopiado(false);
  };

  const generarLink = async () => {
    const nombreLimpio = nombre.trim();
    const numeroPases = Number.parseInt(pases, 10);

    if (!nombreLimpio) {
      setError(
        "Escribe el nombre del invitado o de la familia."
      );
      return;
    }

    if (
      Number.isNaN(numeroPases) ||
      numeroPases < 1
    ) {
      setError(
        "Ingresa un número válido de lugares."
      );
      return;
    }

    try {
      setError("");
      setGenerando(true);
      setLinkCopiado(false);
      setMensajeCopiado(false);

      const id = await crearIdEncriptado(
        nombreLimpio,
        numeroPases
      );

      const url = `${
        window.location.origin
      }/?id=${encodeURIComponent(id)}`;

      const textoPases =
        numeroPases === 1
          ? "1 lugar reservado"
          : `${numeroPases} lugares reservados`;

      const mensajeWhatsApp = `🕊️ *Invitación especial* 🕊️

Hola, ${nombreLimpio}:

Con mucha alegría queremos invitarte al bautizo de *Liam Samuel Chapa Garabito*.

Hemos reservado especialmente para ti:
🎟️ *${textoPases}*

Podrás consultar todos los detalles de este día tan especial en el siguiente enlace:

${url}

Esperamos contar con tu presencia y compartir juntos este momento lleno de amor y bendiciones. 🤍`;

      setLink(url);
      setMensaje(mensajeWhatsApp);
    } catch (errorGeneracion) {
      console.error(
        "No fue posible generar la invitación:",
        errorGeneracion
      );

      setError(
        "No fue posible generar la invitación. Intenta nuevamente."
      );
    } finally {
      setGenerando(false);
    }
  };

  const copiarTexto = async (
    texto,
    actualizarEstado
  ) => {
    if (!texto) return;

    try {
      await navigator.clipboard.writeText(texto);

      actualizarEstado(true);

      window.setTimeout(() => {
        actualizarEstado(false);
      }, 2000);
    } catch (errorCopiado) {
      console.error(
        "No fue posible copiar el contenido:",
        errorCopiado
      );

      setError(
        "No se pudo copiar automáticamente. Selecciona el texto y cópialo manualmente."
      );
    }
  };

  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        max-w-full
        overflow-x-hidden
        bg-gradient-to-b
        from-[#DCECF5]
        via-[#F8F3EA]
        to-[#EEF5F8]
        px-3
        py-8
        text-[#294A62]
        sm:px-6
        sm:py-12
        lg:px-10
        lg:py-14
      "
    >
      {/* Fondos decorativos */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          -top-32
          h-96
          w-96
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
          -right-40
          top-1/3
          h-96
          w-96
          rounded-full
          bg-[#BEDCEB]/55
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Encabezado */}
        <motion.header
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mb-8
            w-full
            max-w-3xl
            px-2
            text-center
            sm:mb-10
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-[#BDD4E1]
              bg-white/70
              text-[#6690A8]
              shadow-[0_12px_30px_rgba(65,104,127,0.14)]
              sm:h-16
              sm:w-16
            "
          >
            <Sparkles
              size={26}
              strokeWidth={1.4}
            />
          </div>

          <p
            className="
              mt-5
              font-playfair
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-[#78909E]
              sm:text-xs
              sm:tracking-[0.35em]
            "
          >
            Bautizo de Liam Samuel
          </p>

          <h1
            className="
              mt-4
              break-words
              font-playfair
              text-3xl
              font-medium
              leading-tight
              text-[#294A62]
              sm:text-5xl
              lg:text-6xl
            "
          >
            Generador de invitaciones
          </h1>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#B8A98F]" />
            <span className="text-lg text-[#A99576]">✦</span>
            <span className="h-px w-10 bg-[#B8A98F]" />
          </div>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              font-playfair
              text-sm
              leading-6
              text-[#5D7380]
              sm:text-lg
              sm:leading-7
            "
          >
            Personaliza el nombre y los lugares reservados
            para cada invitado o familia.
          </p>
        </motion.header>

        {/* Grid principal */}
        <div
          className="
            grid
            w-full
            min-w-0
            grid-cols-1
            items-start
            gap-8
            lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
            lg:gap-10
          "
        >
          {/* Formulario primero en celular */}
          <motion.section
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="
              order-1
              w-full
              min-w-0
              max-w-full
              overflow-hidden
              rounded-[1.75rem]
              border
              border-white
              bg-[#FFFDF8]/90
              shadow-[0_24px_65px_rgba(55,86,105,0.16)]
              backdrop-blur-xl
              sm:rounded-[2rem]
            "
          >
            <div
              className="
                h-2
                w-full
                bg-gradient-to-r
                from-[#BEDAE9]
                via-[#6D99B2]
                to-[#BEDAE9]
              "
            />

            <div
              className="
                w-full
                min-w-0
                max-w-full
                p-4
                sm:p-7
                md:p-8
              "
            >
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  text-[#78909E]
                  sm:text-xs
                  sm:tracking-[0.28em]
                "
              >
                Datos del invitado
              </p>

              <h2
                className="
                  mt-3
                  font-playfair
                  text-2xl
                  text-[#294A62]
                  sm:text-3xl
                "
              >
                Crear invitación
              </h2>

              {/* Nombre */}
              <div className="mt-7 w-full min-w-0">
                <label
                  htmlFor="nombreInvitado"
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    font-playfair
                    text-sm
                    text-[#536C7A]
                  "
                >
                  <UserRound
                    size={17}
                    className="shrink-0"
                  />

                  <span className="min-w-0">
                    Nombre del invitado o familia
                  </span>
                </label>

                <input
                  id="nombreInvitado"
                  type="text"
                  autoComplete="off"
                  placeholder="Ejemplo: Familia Hernández"
                  value={nombre}
                  onChange={(event) => {
                    setNombre(event.target.value);
                    limpiarResultado();
                  }}
                  className="
                    block
                    w-full
                    min-w-0
                    max-w-full
                    rounded-2xl
                    border
                    border-[#B9CFDB]
                    bg-white
                    px-4
                    py-4
                    font-playfair
                    text-base
                    text-[#294A62]
                    outline-none
                    transition
                    placeholder:text-sm
                    placeholder:text-[#78909E]/55
                    focus:border-[#6695B2]
                    focus:ring-2
                    focus:ring-[#8DB5CA]/30
                    sm:px-5
                  "
                />
              </div>

              {/* Lugares */}
              <div className="mt-5 w-full min-w-0">
                <label
                  htmlFor="numeroPases"
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    font-playfair
                    text-sm
                    text-[#536C7A]
                  "
                >
                  <TicketCheck
                    size={17}
                    className="shrink-0"
                  />
                  Número de lugares
                </label>

                <input
                  id="numeroPases"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={pases}
                  onChange={(event) => {
                    setPases(event.target.value);
                    limpiarResultado();
                  }}
                  className="
                    block
                    w-full
                    min-w-0
                    max-w-full
                    rounded-2xl
                    border
                    border-[#B9CFDB]
                    bg-white
                    px-4
                    py-4
                    font-playfair
                    text-base
                    text-[#294A62]
                    outline-none
                    transition
                    focus:border-[#6695B2]
                    focus:ring-2
                    focus:ring-[#8DB5CA]/30
                    sm:px-5
                  "
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="
                    mt-5
                    max-w-full
                    break-words
                    rounded-xl
                    border
                    border-[#D6ABAB]
                    bg-[#F9EDED]
                    px-4
                    py-3
                    text-sm
                    leading-5
                    text-[#874B4B]
                  "
                >
                  {error}
                </motion.p>
              )}

              {/* Generar */}
              <motion.button
                type="button"
                onClick={generarLink}
                disabled={generando}
                whileHover={
                  generando ? undefined : { scale: 1.02 }
                }
                whileTap={
                  generando ? undefined : { scale: 0.98 }
                }
                className="
                  mt-7
                  flex
                  w-full
                  min-w-0
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#6695B2]
                  px-4
                  py-4
                  text-center
                  font-playfair
                  text-sm
                  text-white
                  shadow-[0_14px_32px_rgba(71,115,141,0.27)]
                  transition-colors
                  hover:bg-[#4F7F9B]
                  disabled:cursor-not-allowed
                  disabled:opacity-65
                  sm:px-6
                  sm:text-base
                "
              >
                {generando ? (
                  <>
                    <span
                      className="
                        h-5
                        w-5
                        shrink-0
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />
                    <span>Encriptando invitación</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck
                      size={20}
                      className="shrink-0"
                    />
                    <span>Generar invitación</span>
                  </>
                )}
              </motion.button>

              {/* Resultado generado */}
              {link && (
                <motion.div
                  ref={resultadoRef}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    mt-8
                    w-full
                    min-w-0
                    max-w-full
                    scroll-mt-5
                  "
                >
                  <p
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      text-[#718995]
                      sm:text-xs
                      sm:tracking-[0.2em]
                    "
                  >
                    <Link2
                      size={16}
                      className="shrink-0"
                    />
                    Enlace personalizado
                  </p>

                  <div
                    className="
                      block
                      w-full
                      min-w-0
                      max-w-full
                      overflow-hidden
                      break-all
                      rounded-2xl
                      border
                      border-[#C1D3DD]
                      bg-[#EDF5F8]
                      p-3
                      text-[11px]
                      leading-5
                      text-[#405E6F]
                      sm:p-4
                      sm:text-xs
                    "
                  >
                    {link}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copiarTexto(link, setLinkCopiado)
                    }
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      border-[#7FA4B8]
                      px-4
                      py-3
                      text-sm
                      text-[#486D82]
                      transition
                      hover:bg-[#E9F3F7]
                    "
                  >
                    {linkCopiado ? (
                      <>
                        <Check size={18} />
                        Enlace copiado
                      </>
                    ) : (
                      <>
                        <Copy size={17} />
                        Copiar enlace
                      </>
                    )}
                  </button>

                  {/* Mensaje editable */}
                  <div
                    className="
                      mt-8
                      w-full
                      min-w-0
                      max-w-full
                      border-t
                      border-[#C7D8E1]
                      pt-7
                    "
                  >
                    <p
                      className="
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        text-[#718995]
                        sm:text-xs
                        sm:tracking-[0.2em]
                      "
                    >
                      <MessageCircle
                        size={16}
                        className="shrink-0"
                      />
                      Mensaje para WhatsApp
                    </p>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-5
                        text-[#748993]
                      "
                    >
                      Puedes editarlo antes de copiarlo.
                    </p>

                    <textarea
                      value={mensaje}
                      onChange={(event) => {
                        setMensaje(event.target.value);
                        setMensajeCopiado(false);
                      }}
                      rows={16}
                      spellCheck="true"
                      className="
                        mt-4
                        block
                        min-h-[360px]
                        w-full
                        min-w-0
                        max-w-full
                        resize-y
                        whitespace-pre-wrap
                        break-words
                        rounded-2xl
                        border
                        border-[#B9CFDB]
                        bg-white
                        p-4
                        text-sm
                        leading-6
                        text-[#294A62]
                        outline-none
                        focus:border-[#6695B2]
                        focus:ring-2
                        focus:ring-[#8DB5CA]/30
                        sm:min-h-[390px]
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        copiarTexto(
                          mensaje,
                          setMensajeCopiado
                        )
                      }
                      className="
                        mt-3
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        bg-[#395F76]
                        px-4
                        py-4
                        text-center
                        font-playfair
                        text-sm
                        text-white
                        transition
                        hover:bg-[#294C61]
                        sm:px-6
                        sm:text-base
                      "
                    >
                      {mensajeCopiado ? (
                        <>
                          <Check size={18} />
                          Mensaje copiado
                        </>
                      ) : (
                        <>
                          <Copy size={17} />
                          Copiar mensaje de WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Fotografía y vista previa */}
          <motion.section
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="
              order-2
              flex
              w-full
              min-w-0
              max-w-full
              flex-col
              items-center
              lg:sticky
              lg:top-8
            "
          >
            <div className="mb-5 text-center">
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-[#78909E]
                  sm:text-xs
                  sm:tracking-[0.3em]
                "
              >
                Invitación
              </p>

              <h2
                className="
                  mt-2
                  font-cursiveDancing
                  text-4xl
                  text-[#294A62]
                "
              >
                Liam Samuel
              </h2>
            </div>

            {/* Fotografía */}
            <div
              className="
                w-full
                min-w-0
                max-w-[430px]
                overflow-hidden
                rounded-[1.75rem]
                border-[6px]
                border-white
                bg-white
                shadow-[0_25px_65px_rgba(46,78,98,0.18)]
                sm:rounded-[2rem]
                sm:border-[8px]
              "
            >
              <img
                src="/portada.jpg"
                alt="Portada del bautizo de Liam Samuel"
                className="
                  block
                  aspect-[4/5]
                  h-auto
                  w-full
                  object-cover
                  object-center
                "
              />
            </div>

            {/* Vista previa de WhatsApp */}
            {link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  mt-10
                  w-full
                  min-w-0
                  max-w-[430px]
                "
              >
                <p
                  className="
                    mb-3
                    text-center
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-[#718995]
                    sm:text-xs
                    sm:tracking-[0.25em]
                  "
                >
                  Vista previa del mensaje
                </p>

                <div
                  className="
                    w-full
                    min-w-0
                    overflow-hidden
                    rounded-[1.5rem]
                    bg-[#E8E3DA]
                    p-3
                    shadow-[0_15px_40px_rgba(44,73,91,0.12)]
                    sm:rounded-[1.75rem]
                    sm:p-4
                  "
                >
                  <div
                    className="
                      ml-auto
                      w-full
                      min-w-0
                      max-w-[94%]
                      overflow-hidden
                      rounded-2xl
                      rounded-tr-sm
                      bg-[#D9FDD3]
                      px-3
                      py-3
                      shadow-sm
                      sm:px-4
                    "
                  >
                    <p
                      className="
                        max-w-full
                        whitespace-pre-wrap
                        break-words
                        text-[12px]
                        leading-5
                        text-[#1D2733]
                        sm:text-[13px]
                      "
                    >
                      {mensaje}
                    </p>

                    <p
                      className="
                        mt-1
                        text-right
                        text-[9px]
                        text-black/40
                        sm:text-[10px]
                      "
                    >
                      12:00 ✓✓
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default Generador;