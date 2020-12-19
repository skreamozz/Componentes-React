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
      {/* <Modal status={true}>
        <form
          className="card-body p-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h4>Formulario Prueba</h4>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="abarajame la bañera negra"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="abarajame la bañera negra 2"
            />
          </div>
          <button className="btn btn-outline-primary btn-block">Enviar</button>
        </form>
      </Modal> */}
    </div>
  );
}

export default App;
