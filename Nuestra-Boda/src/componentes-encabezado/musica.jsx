import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Music,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const Musica = () => {
  const audioRef = useRef(null);

  const [mostrarModal, setMostrarModal] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.45;

    const alReproducir = () => {
      setReproduciendo(true);
      setCargando(false);
      setError("");
    };

    const alPausar = () => {
      setReproduciendo(false);
      setCargando(false);
    };

    const alCargar = () => {
      setCargando(false);
    };

    const alError = () => {
      setCargando(false);
      setReproduciendo(false);
      setError("No fue posible cargar la música.");
    };

    audio.addEventListener("playing", alReproducir);
    audio.addEventListener("pause", alPausar);
    audio.addEventListener("canplay", alCargar);
    audio.addEventListener("error", alError);

    return () => {
      audio.removeEventListener("playing", alReproducir);
      audio.removeEventListener("pause", alPausar);
      audio.removeEventListener("canplay", alCargar);
      audio.removeEventListener("error", alError);
    };
  }, []);

  useEffect(() => {
    if (mostrarModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mostrarModal]);

  const reproducirMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      setCargando(true);
      setError("");

      audio.muted = false;
      setSilenciado(false);

      await audio.play();

      setReproduciendo(true);
      setMostrarModal(false);
    } catch (errorReproduccion) {
      console.error(
        "No se pudo reproducir la música:",
        errorReproduccion
      );

      setCargando(false);
      setError(
        "No fue posible iniciar la música. Intenta nuevamente."
      );
    }
  };

  const continuarSinMusica = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setReproduciendo(false);
    setCargando(false);
    setError("");
    setMostrarModal(false);
  };

  const alternarReproduccion = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        setCargando(true);
        setError("");

        await audio.play();

        setReproduciendo(true);
      } catch (errorReproduccion) {
        console.error(
          "No se pudo reproducir la música:",
          errorReproduccion
        );

        setCargando(false);
        setError("No fue posible reproducir la música.");
      }
    } else {
      audio.pause();
    }
  };

  const alternarSilencio = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;
    setSilenciado(audio.muted);
  };

  return (
    <>
      {/* Archivo de audio */}
      <audio
        ref={audioRef}
        src="/musica.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Ventana inicial */}
      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              overflow-y-auto
              bg-[#19384B]/65
              px-5
              py-8
              backdrop-blur-md
            "
          >
            {/* Nubes decorativas */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-24
                -top-20
                h-72
                w-96
                rounded-full
                bg-white/20
                blur-3xl
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-24
                -right-20
                h-80
                w-96
                rounded-full
                bg-[#C7DFEC]/25
                blur-3xl
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.95,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                w-full
                max-w-[430px]
                overflow-hidden
                rounded-[2.5rem]
                border
                border-white
                bg-[#FFFDF8]
                px-7
                py-11
                text-center
                shadow-[0_30px_90px_rgba(0,0,0,0.35)]
                sm:px-10
                sm:py-12
              "
            >
              {/* Franja decorativa superior */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-0
                  top-0
                  h-2
                  w-full
                  bg-gradient-to-r
                  from-[#BCD9E8]
                  via-[#6C98B2]
                  to-[#BCD9E8]
                "
              />

              {/* Resplandores internos */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -left-16
                  top-8
                  h-40
                  w-40
                  rounded-full
                  bg-[#DDECF5]/65
                  blur-2xl
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-12
                  -right-16
                  h-44
                  w-44
                  rounded-full
                  bg-[#E9DFCE]/50
                  blur-2xl
                "
              />

              {/* Cerrar */}
              <button
                type="button"
                onClick={continuarSinMusica}
                aria-label="Continuar sin música"
                className="
                  absolute
                  right-5
                  top-5
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#BDD3DF]
                  bg-white/80
                  text-[#496A7D]
                  transition
                  hover:scale-105
                  hover:bg-[#E9F3F7]
                "
              >
                <X size={18} strokeWidth={1.7} />
              </button>

              <div className="relative z-10">
                {/* Icono musical */}
                <motion.div
                  animate={
                    reproduciendo
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={{
                    duration: 8,
                    repeat: reproduciendo ? Infinity : 0,
                    ease: "linear",
                  }}
                  className="
                    mx-auto
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#BBD3E0]
                    bg-gradient-to-br
                    from-[#EDF6FA]
                    to-[#D5E8F2]
                    text-[#5D88A1]
                    shadow-[0_14px_35px_rgba(76,119,144,0.18)]
                  "
                >
                  <Music size={39} strokeWidth={1.4} />
                </motion.div>

                <p
                  className="
                    mt-7
                    font-playfair
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.32em]
                    text-[#78909E]
                  "
                >
                  Una experiencia especial
                </p>

                <h2
                  className="
                    mt-4
                    font-playfair
                    text-3xl
                    font-medium
                    leading-tight
                    text-[#294A62]
                    sm:text-4xl
                  "
                >
                  Música para acompañarte
                </h2>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-[#B8A98F]" />

                  <span className="font-playfair text-lg text-[#A99576]">
                    ✦
                  </span>

                  <span className="h-px w-10 bg-[#B8A98F]" />
                </div>

                <p
                  className="
                    mx-auto
                    mt-6
                    max-w-[320px]
                    font-playfair
                    text-base
                    leading-7
                    text-[#536B79]
                  "
                >
                  Hemos preparado una canción especial para
                  acompañarte mientras descubres la invitación del
                  bautizo de Liam Samuel.
                </p>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="
                      mt-5
                      rounded-xl
                      border
                      border-[#D6ACAC]
                      bg-[#F9EDED]
                      px-4
                      py-3
                      text-sm
                      text-[#874B4B]
                    "
                  >
                    {error}
                  </motion.p>
                )}

                <div className="mt-8 flex flex-col gap-3">
                  <motion.button
                    type="button"
                    onClick={reproducirMusica}
                    disabled={cargando}
                    whileHover={
                      cargando ? undefined : { scale: 1.025 }
                    }
                    whileTap={
                      cargando ? undefined : { scale: 0.97 }
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#6695B2]
                      px-6
                      py-4
                      font-playfair
                      text-base
                      text-white
                      shadow-[0_14px_32px_rgba(73,116,141,0.28)]
                      transition-colors
                      hover:bg-[#4F7F9B]
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                    "
                  >
                    {cargando ? (
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

                        Cargando música
                      </>
                    ) : (
                      <>
                        <Play
                          size={18}
                          fill="currentColor"
                        />

                        Escuchar música
                      </>
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={continuarSinMusica}
                    className="
                      w-full
                      rounded-full
                      border
                      border-[#B9CFDB]
                      bg-transparent
                      px-6
                      py-4
                      font-playfair
                      text-base
                      text-[#496A7D]
                      transition
                      hover:bg-[#EAF3F7]
                    "
                  >
                    Continuar sin música
                  </button>
                </div>

                <p
                  className="
                    mt-6
                    text-xs
                    leading-relaxed
                    text-[#85959D]
                  "
                >
                  Puedes pausar o reactivar la música en cualquier
                  momento.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controles flotantes */}
      <AnimatePresence>
        {!mostrarModal && (
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.9,
            }}
            transition={{ duration: 0.4 }}
            className="
              fixed
              bottom-5
              right-5
              z-[9998]
              flex
              items-center
              gap-1
              rounded-full
              border
              border-[#B9CFDB]
              bg-[#FFFDF8]/95
              p-2
              shadow-[0_14px_38px_rgba(39,74,95,0.22)]
              backdrop-blur-md
            "
          >
            <button
              type="button"
              onClick={alternarReproduccion}
              aria-label={
                reproduciendo
                  ? "Pausar música"
                  : "Reproducir música"
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#6695B2]
                text-white
                transition
                hover:scale-105
                hover:bg-[#4F7F9B]
              "
            >
              {cargando ? (
                <span
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/40
                    border-t-white
                  "
                />
              ) : reproduciendo ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              onClick={alternarSilencio}
              aria-label={
                silenciado
                  ? "Activar sonido"
                  : "Silenciar música"
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-[#658AA0]
                transition
                hover:bg-[#E9F3F7]
              "
            >
              {silenciado ? (
                <VolumeX size={19} />
              ) : (
                <Volume2 size={19} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Musica;