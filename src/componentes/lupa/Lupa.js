import React, { useEffect, useState } from "react";
import { Paginacion, Tabla } from "..";
import usePaginacion from "../../hooks/usePaginacion";

/**
 *
 * @param {any} campo
 * @param {any} filtro
 * metodo encargado de aplicar el filtro segun el tipo de dato que contenga
 * el campo
 */
const filtrar = (campo, filtro = "") => {
  if (filtro === "") return true;
  switch (typeof campo) {
    case "string":
      return campo.includes(filtro);
    case "number":
      return campo === parseInt(filtro);
    default:
      return campo.toString().includes(filtro);
  }
};

/**
 *
 * @param {{
 * data:object[],
 * camposOcultos:string[],
 * onRowDobleClick:(row)=>(e)=>{}
 * itemsPorPagina:number
 * }} props
 */
const Lupa = ({
  data,
  camposOcultos,
  onRowDobleClick = () => {},
  itemsPorPagina = 5,
}) => {
  const [campos, setCampos] = useState([]);

  const [dataFiltrada, setDataFiltrada] = useState([{}]);
  const [filtros, setFiltros] = useState({ selectUno: "", selectDos: "" });
  const [inputs, setInputs] = useState({ inputUno: "", inputDos: "" });

  const {
    dataPaginada,
    paginaActual,
    handlePaginacion,
    setPaginaActual,
  } = usePaginacion(itemsPorPagina, dataFiltrada);

  /**
   *
   * efectos
   *
   */

  //efecto desencadenado por los filtros, este se encarga de detectar y aplicar los filtros
  //correspondientes.
  useEffect(() => {
    setPaginaActual(1);
    let dataFiltradaTemp = data
      .filter((row) => filtrar(row[filtros.selectUno], inputs.inputUno))
      .filter((row) => filtrar(row[filtros.selectDos], inputs.inputDos));

    if (dataFiltradaTemp.length === 0) {
      setDataFiltrada([
        { error: "no se encontro ningun campo que coincida con la busqueda." },
      ]);
      return;
    }
    setDataFiltrada(dataFiltradaTemp);
  }, [inputs, filtros, data, setPaginaActual]);

  //efecto encargado de obtener los nombres de los campos excluyendo los que estan ocultos
  //segun el arreglo pasado por propiedades.
  useEffect(() => {
    const keys = Object.keys(data[0]);
    if (keys.length === 0) return;

    const CamposTemp = keys.filter((key) => !camposOcultos.includes(key));
    setCampos(CamposTemp);
    setFiltros({ selectUno: CamposTemp[0], selectDos: CamposTemp[0] });
  }, [camposOcultos, data]);

  /**
   *
   * manejadores de eventos.
   *
   */

  const handleSelectChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Paginacion
            cantidadItems={dataFiltrada.length}
            paginaActual={paginaActual}
            elementosAMostrar={itemsPorPagina}
            handlePaginacion={handlePaginacion}
          >
            {
              <div className="container">
                <div className="row">
                  <div className="col">
                    <Tabla
                      data={dataPaginada}
                      camposOcultos={camposOcultos}
                      onRowDobleClick={onRowDobleClick}
                    />
                    <div className="form-row mb-2">
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            onChange={handleInputChange}
                            value={inputs.inputUno}
                            name="inputUno"
                            className="form-control"
                            type="text"
                          />
                          <div className="input-group-append">
                            <select
                              onChange={handleSelectChange}
                              name="selectUno"
                              value={filtros.selectUno}
                              className="custom-select"
                            >
                              {campos.map((campo) => (
                                <option key={campo} value={campo}>
                                  {campo}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            onChange={handleInputChange}
                            value={inputs.inputDos}
                            name="inputDos"
                            className="form-control"
                            type="text"
                          />
                          <div className="input-group-append">
                            <select
                              onChange={handleSelectChange}
                              name="selectDos"
                              value={filtros.selectDos}
                              className="custom-select"
                            >
                              {campos.map((campo) => (
                                <option key={campo} value={campo}>
                                  {campo}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </Paginacion>
        </div>
      </div>
    </div>
  );
};
Lupa.defaultProps = {
  data: [{}],
  camposOcultos: [],
};

export default Lupa;
