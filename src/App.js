import { useEffect, useState } from "react";
import { BsLayoutWtf, BsLayers, BsSearch, BsTable } from "react-icons/bs";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Abm,
  DataTable,
  Lupa,
  Modal,
  Dashboard,
  SlideMenu,
} from "./componentes";

function App() {
  //estado que permite actualizar el componente cuando se modifican los datos
  const [datosState, setDatosState] = useState();
  let publicUrl = process.env.PUBLIC_URL;
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
                path={publicUrl + "/abm"}
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
                path={publicUrl + "/lupa"}
                exact
                render={() => (
                  <Modal status={true}>
                    <Lupa data={datosState} camposOcultos={["id", "userId"]} />
                  </Modal>
                )}
              />
              <Route
                path={publicUrl + "/DataTable"}
                exact
                render={() => (
                  <div className="row justify-content-center align-items-center vh-100">
                    <div className="col">
                      <DataTable data={datosState} itemsPorPagina={5} />
                    </div>
                  </div>
                )}
              />
              <Route
                path={publicUrl + "/Dashboard"}
                exact
                component={Dashboard}
              />
              <Route path="/" />
            </Switch>

            <SlideMenu
              Items={[
                {
                  to: publicUrl + "/Abm",
                  icono: <BsLayers />,
                  texto: "Abm",
                },
                { to: publicUrl + "/lupa", icono: <BsSearch />, texto: "Lupa" },
                {
                  to: publicUrl + "/DataTable",
                  icono: <BsTable />,
                  texto: "DataTable",
                },
                {
                  to: publicUrl + "/Dashboard",
                  icono: <BsLayoutWtf />,
                  texto: "Dashboard",
                },
                {
                  icono: <BsLayoutWtf />,
                  texto: "Dashboard",
                  sub: [
                    {
                      to: publicUrl + "/Dashboard",
                      icono: <BsLayoutWtf />,
                      texto: "Dashboard",
                    },
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
