import { useEffect, useState } from "react";
import { Tabla } from "../../componentes";

/**
 *
 * este componente recive un parametro al no recivir ningun parametro
 * este toma el valor por defecto que es un arreglo con un objeto vacio
 */
const TablaConFiltro = ({ data = [{}] }) => {
  /**
   * estados del componentes
   */
  const [filtro, setFiltro] = useState("");
  const [datos, setDatos] = useState(data);
  //aca se utiliza un efecto que se desencadena cuando surge algun cambio en
  //el parametro de entrada de la funcion.
  //y lo asigna al estado del componente
  useEffect(() => {
    setDatos(data);
  }, [data]);

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
    setDatos(tempData);
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
              {Object.keys(data[0]).map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Tabla data={datos} />
      </div>
    </div>
  );
};

export default TablaConFiltro;
