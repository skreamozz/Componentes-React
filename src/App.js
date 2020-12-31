import { useEffect, useState } from "react";
import "./App.css";
import { Abm, CustomCheck, TablaConFiltro } from "./componentes";

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
      {/* <div className="row justify-content-center">
        <div className="col-md-auto">
          <form
            className="card-body "
            onSubmit={(e) => e.preventDefault()}
            style={{
              background: "#fafafa",
              borderRadius: "10px",
              marginTop: "16px",
              boxShadow: "0px 0px 10px rgba(0,0,0,.08)",
              minWidth: "100%",
            }}
          >
            <h3 className="p-2">Abm de prueba</h3>
            <div className="form-group">
              <label>Title</label>
              <input
                name="titulo"
                maxLength={25}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Completed</label>
              <br />
              <CustomCheck />
            </div>
            <button className="btn btn-outline-primary btn-block">
              Enviar
            </button>
          </form>
        </div>
        <div className="col-md-auto">
          <TablaConFiltro data={datosState} />
        </div>
      </div> */}
      <Abm
        titulo="productos"
        urls="https://jsonplaceholder.typicode.com/todos"
        camposOcultos={["id"]}
        itemsPorPagina={5}
      />
    </div>
  );
}

export default App;
