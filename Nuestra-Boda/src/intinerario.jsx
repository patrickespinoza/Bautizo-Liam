import Portada from "./componentes-encabezado/portada";
import Contador from "./componentes-encabezado/Contador";
import Celebracion from "./componentes-encabezado/Ubicacion";
import Regalos from "./componentes-encabezado/Regalos";
import Confirmacion from "./componentes-encabezado/Confirmacion";
import Musica from "./componentes-encabezado/musica";
import Galeria from "./componentes-encabezado/galeria";
import Itinerario from "./componentes-encabezado/itinerario";
import PadresYPadrinos from "./componentes-encabezado/familia";
import FraseFinal from "./componentes-encabezado/frase";

export default function Intinerario() {
  return (
    <div>

      <Musica/>

      <Portada />

      <Contador />

      <Itinerario/>

      <PadresYPadrinos/>

      <Galeria/>

      <Regalos />

      <Confirmacion />

      <FraseFinal/>
    
    </div>
  );
}