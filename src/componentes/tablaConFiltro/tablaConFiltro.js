import { useEffect, useState } from "react";
import { Tabla, Paginacion } from "../../componentes";

const obtenerInicioyFin = (actual, cantidadAmostrar) => {
  let inicio = (actual - 1) * cantidadAmostrar;
  let fin = inicio + cantidadAmostrar;
  return [inicio, fin];
};

/**
 *
 * este componente recibe un parametro al no recibir ningun parametro
 * este toma el valor por defecto que es un arreglo con un objeto vacio
 */
const TablaConFiltro = ({ data = [{}] }) => {
  /**
   * estados del componentes
   */
  const [filtro, setFiltro] = useState("");
  const [datos, setDatos] = useState(data);

  /**
   * estados para manejar la paginacion.
   */
  const [PaginaActual, setPaginaActual] = useState(1);
  const [datosPaginados, setDatosPaginados] = useState(datos);
  const ElementosAmostrar = 10;

  useEffect(() => {
    setDatos(data);
  }, [data]);

  useEffect(() => {
    let [inicio, fin] = obtenerInicioyFin(PaginaActual, ElementosAmostrar);
    let datosTemp = datos.slice(inicio, fin);
    setDatosPaginados(datosTemp);
  }, [PaginaActual, ElementosAmostrar, datos]);

  //este controlador revisa los cambios del select y lo guarda
  //en el estado para poder utilizarlo a la hora de aplicar el filtro
  const handleChange = (e) => {
    setFiltro(e.target.value);
  };

  //en este otro controlador que se desencadena cuando ocurre un cambio en el input
  //es donde se aplica el filtro
  const handleChangeInput = (e) => {
    //aca uso destructuring para obtener el valor que contiene el imput
    //es similar a tener e.target.value solo que aislo la variable value para no
    //tener que escribir toda la ruta
    const { value } = e.target;
    //aca aplicamos el filtro correspondiente al arreglo de datos
    let tempData = [];
    tempData = data.filter((dato) =>
      dato[filtro].toString().toUpperCase().includes(value.toUpperCase())
    );
    //comprobamos que haya resultados y que el input contenga texto
    //de lo contrario volvemos al estado por defecto
    if (tempData.length === 0 || value === "") {
      setDatos(data);
      return;
    }
    //si todo sale bien asignamos la nueva tabla de datos ya con los filtros aplicados
    //y reseteamos la paginacion
    setPaginaActual(1);
    setDatos(tempData);
  };
  //controlador de la paginacion
  const handlePaginacion = (key) => (e) => {
    setPaginaActual(key);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <div className="input-group p-2">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
            disabled={filtro === ""}
          />
          <div className="input-group-append">
            <select className="custom-select" onChange={handleChange}>
              <option value="">Elija una clave</option>
              {Object.keys(datos[0]).map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <Paginacion
            cantidadItems={datos.length}
            paginaActual={PaginaActual}
            elementosAMostrar={ElementosAmostrar}
            handlePaginacion={handlePaginacion}
          >
            <Tabla data={datosPaginados} />
          </Paginacion>
        </div>
      </div>
    </div>
  );
};

export default TablaConFiltro;
