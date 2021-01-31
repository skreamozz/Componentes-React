import { useEffect, useState } from "react";
import { BsArchiveFill, BsLayers, BsSearch, BsTable } from "react-icons/bs";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Abm, DataTable, Lupa, Modal, SlideMenu } from "./componentes";

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
      <BrowserRouter>
        <div className="row">
          <div className="col offset-1">
            {/** Switch que contiene las rutas y los componentes a renderizar*/}
            <Switch>
              <Route
                path="/abm"
                exact
                render={() => (
                  <Abm
                    titulo="productos"
                    urls="https://jsonplaceholder.typicode.com/posts"
                    camposOcultos={["id"]}
                    itemsPorPagina={5}
                  />
                )}
              />
              <Route
                path="/lupa"
                exact
                render={() => (
                  <Modal status={true}>
                    <Lupa data={datosState} camposOcultos={["id", "userId"]} />
                  </Modal>
                )}
              />
              <Route
                path="/DataTable"
                exact
                render={() => (
                  <div className="row justify-content-center align-items-center vh-100">
                    <div className="col">
                      <DataTable
                        data={datosState}
                        camposOcultos={[]}
                        itemsPorPagina={5}
                      />
                    </div>
                  </div>
                )}
              />
              <Route path="/" />
            </Switch>

            <SlideMenu
              Items={[
                {
                  to: "/Abm",
                  icono: <BsLayers />,
                  texto: "Abm",
                },
                { to: "/lupa", icono: <BsSearch />, texto: "Lupa" },
                {
                  icono: <BsArchiveFill />,
                  texto: "Files",
                  sub: [
                    {
                      to: "/DataTable",
                      icono: <BsTable />,
                      texto: "DataTable",
                    },
                    { to: "/Abm", icono: <BsLayers />, texto: "Abm" },
                  ],
                },
                {
                  icono: <BsArchiveFill />,
                  texto: "Files",
                  sub: [
                    { to: "/Abm", icono: <BsLayers />, texto: "Abm" },
                    { to: "/Abm", icono: <BsLayers />, texto: "Abm" },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
