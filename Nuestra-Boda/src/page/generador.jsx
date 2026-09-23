import React, { useState } from "react";
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

/*
  Esta misma clave deberá utilizarse posteriormente
  en la invitación para desencriptar la información.
*/
const CLAVE_SECRETA = "Liam-Samuel-Chapa-Garabito-2026";

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

  /*
    AES-GCM necesita un vector de inicialización.
    Se genera uno nuevo para cada invitación.
  */
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

  /*
    Guardamos juntos el IV y la información encriptada
    para poder desencriptarlos desde la invitación.
  */
  const resultado = new Uint8Array(
    iv.length + datosEncriptados.length
  );

  resultado.set(iv, 0);
  resultado.set(datosEncriptados, iv.length);

  return convertirABase64URL(resultado);
};

const Generador = () => {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("1");

  const [link, setLink] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [error, setError] = useState("");
  const [generando, setGenerando] = useState(false);

  const [linkCopiado, setLinkCopiado] = useState(false);
  const [mensajeCopiado, setMensajeCopiado] =
    useState(false);

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
        overflow-hidden
        bg-gradient-to-b
        from-[#DCECF5]
        via-[#F8F3EA]
        to-[#EEF5F8]
        px-4
        py-10
        text-[#294A62]
        sm:px-6
        sm:py-14
        lg:px-10
      "
    >
      {/* Nubes decorativas */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-96
          w-[32rem]
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
          bg-[#BEDCEB]/55
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

      <div className="relative z-10">
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
            mb-10
            max-w-3xl
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-[#BDD4E1]
              bg-white/70
              text-[#6690A8]
              shadow-[0_12px_30px_rgba(65,104,127,0.14)]
            "
          >
            <Sparkles size={28} strokeWidth={1.4} />
          </div>

          <p
            className="
              mt-6
              font-playfair
              text-xs
              uppercase
              tracking-[0.35em]
              text-[#78909E]
            "
          >
            Bautizo de Liam Samuel
          </p>

          <h1
            className="
              mt-4
              font-playfair
              text-4xl
              font-medium
              text-[#294A62]
              sm:text-5xl
              lg:text-6xl
            "
          >
            Generador de invitaciones
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#B8A98F]" />
            <span className="text-xl text-[#A99576]">✦</span>
            <span className="h-px w-12 bg-[#B8A98F]" />
          </div>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              font-playfair
              text-base
              leading-7
              text-[#5D7380]
              sm:text-lg
            "
          >
            Personaliza el nombre y los lugares reservados
            para cada invitado o familia.
          </p>
        </motion.header>

        {/* Contenido */}
        <div
          className="
            mx-auto
            grid
            max-w-6xl
            items-start
            gap-8
            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-10
          "
        >
          {/* Formulario */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="
              order-2
              overflow-hidden
              rounded-[2rem]
              border
              border-white
              bg-[#FFFDF8]/90
              shadow-[0_24px_65px_rgba(55,86,105,0.16)]
              backdrop-blur-xl
              lg:order-1
            "
          >
            <div
              className="
                h-2
                bg-gradient-to-r
                from-[#BEDAE9]
                via-[#6D99B2]
                to-[#BEDAE9]
              "
            />

            <div className="p-6 sm:p-8">
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.28em]
                  text-[#78909E]
                "
              >
                Datos del invitado
              </p>

              <h2
                className="
                  mt-3
                  font-playfair
                  text-3xl
                  text-[#294A62]
                "
              >
                Crear invitación
              </h2>

              {/* Nombre */}
              <div className="mt-8">
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
                  <UserRound size={17} />
                  Nombre del invitado o familia
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
                    w-full
                    rounded-2xl
                    border
                    border-[#B9CFDB]
                    bg-white
                    px-5
                    py-4
                    font-playfair
                    text-[#294A62]
                    outline-none
                    transition
                    placeholder:text-[#78909E]/55
                    focus:border-[#6695B2]
                    focus:ring-2
                    focus:ring-[#8DB5CA]/30
                  "
                />
              </div>

              {/* Lugares */}
              <div className="mt-5">
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
                  <TicketCheck size={17} />
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
                    w-full
                    rounded-2xl
                    border
                    border-[#B9CFDB]
                    bg-white
                    px-5
                    py-4
                    font-playfair
                    text-[#294A62]
                    outline-none
                    transition
                    focus:border-[#6695B2]
                    focus:ring-2
                    focus:ring-[#8DB5CA]/30
                  "
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-[#D6ABAB]
                    bg-[#F9EDED]
                    px-4
                    py-3
                    text-sm
                    text-[#874B4B]
                  "
                >
                  {error}
                </p>
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
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#6695B2]
                  px-6
                  py-4
                  font-playfair
                  text-base
                  text-white
                  shadow-[0_14px_32px_rgba(71,115,141,0.27)]
                  transition-colors
                  hover:bg-[#4F7F9B]
                  disabled:cursor-not-allowed
                  disabled:opacity-65
                "
              >
                {generando ? (
                  <>
                    <span
                      className="
                        h-5
                        w-5
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />
                    Encriptando invitación
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    Generar invitación
                  </>
                )}
              </motion.button>

              {/* Enlace */}
              {link && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <p
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-[#718995]
                    "
                  >
                    <Link2 size={16} />
                    Enlace personalizado
                  </p>

                  <div
                    className="
                      break-all
                      rounded-2xl
                      border
                      border-[#C1D3DD]
                      bg-[#EDF5F8]
                      p-4
                      text-xs
                      leading-5
                      text-[#405E6F]
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
                      px-5
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
                </motion.div>
              )}

              {/* Mensaje editable */}
              {link && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    mt-8
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
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-[#718995]
                    "
                  >
                    <MessageCircle size={16} />
                    Mensaje para WhatsApp
                  </p>

                  <p className="mt-2 text-sm text-[#748993]">
                    Puedes editarlo antes de copiarlo.
                  </p>

                  <textarea
                    value={mensaje}
                    onChange={(event) => {
                      setMensaje(event.target.value);
                      setMensajeCopiado(false);
                    }}
                    rows={15}
                    className="
                      mt-4
                      w-full
                      resize-y
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
                      px-6
                      py-4
                      font-playfair
                      text-base
                      text-white
                      transition
                      hover:bg-[#294C61]
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
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Portada y vista previa */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="
              order-1
              flex
              flex-col
              items-center
              lg:order-2
            "
          >
            <div className="mb-5 text-center">
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-[#78909E]
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
                max-w-[430px]
                overflow-hidden
                rounded-[2rem]
                border-[8px]
                border-white
                bg-white
                shadow-[0_25px_65px_rgba(46,78,98,0.18)]
                lg:sticky
                lg:top-8
              "
            >
              <img
                src="/portada.jpg"
                alt="Portada del bautizo de Liam Samuel"
                className="
                  block
                  max-h-[650px]
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
                  max-w-[430px]
                "
              >
                <p
                  className="
                    mb-3
                    text-center
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-[#718995]
                  "
                >
                  Vista previa del mensaje
                </p>

                <div
                  className="
                    rounded-[1.75rem]
                    bg-[#E8E3DA]
                    p-4
                    shadow-[0_15px_40px_rgba(44,73,91,0.12)]
                  "
                >
                  <div
                    className="
                      ml-auto
                      max-w-[94%]
                      rounded-2xl
                      rounded-tr-sm
                      bg-[#D9FDD3]
                      px-4
                      py-3
                      shadow-sm
                    "
                  >
                    <p
                      className="
                        whitespace-pre-wrap
                        break-words
                        text-[13px]
                        leading-5
                        text-[#1D2733]
                      "
                    >
                      {mensaje}
                    </p>

                    <p
                      className="
                        mt-1
                        text-right
                        text-[10px]
                        text-black/40
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