import { useEffect, useState } from "react";
import "./App.css";
import { TablaConFiltro } from "./componentes";

function App() {
  //estado que permite actualizar el componente cuando se modifican los datos
  const [datosState, setDatosState] = useState();

  //efecto que se ejecuta cuando se monta el componente, este se encarga de traer los datos
  //de la api
  useEffect(() => {
    //funcion de javascript que se auto-ejecuta a si misma;
    (async () => {
      //fetch es una api que sirve para hacer peticiones html
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const json = await res.json();
      setDatosState(json);
    })();
  }, []);

  return (
    //elementos que se dibujan por pantalla
    <div className="container">
      {/* una vez importado el componente se puede usar como si fuese una etiqueta html
        a la cual le tenemos que asignar los atributos que queremos que lleguen en las propiedades
        de el componente
      */}
      <TablaConFiltro data={datosState} />
    </div>
  );
}

export default App;
