import { useEffect, useState } from "react";
import "./App.css";
import { BsLayers, BsList, BsSearch } from "react-icons/bs";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
  Abm,
  CustomCheck,
  Lupa,
  Modal,
  SlideMenu,
  TablaConFiltro,
} from "./componentes";

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
            </Switch>

            <SlideMenu
              Items={[
                <Link to="/abm">
                  <BsLayers />
                  Abm
                </Link>,
                <Link to="/lupa">
                  <BsSearch />
                  Lupa
                </Link>,
              ]}
            />
          </div>
        </div>
      </BrowserRouter>
      {/* <Modal status={true}>
        <Lupa data={datosState} camposOcultos={["id", "userId"]} />
      </Modal> */}
    </div>
  );
}

export default App;
