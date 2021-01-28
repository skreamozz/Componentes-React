import Tabla from "../tabla/Tabla";
import Paginacion from "../paginacion/Paginacion";
import usePaginacion from "../../hooks/usePaginacion";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";

/**
 *
 * @param {{data:object[], camposOcultos:string[], itemsPorPagina:number,onRowClick:()=>{},onRowDemobleClick:()=>{}}} props
 *  data: -arreglo de objetos con el cual se va a rrellenar la tabla.
 *
 *  camposOcultos: -arreglo que representa a los campos que no se van a mostrar.
 *
 *  itemsPorPagina: -numero que representa la cantidad de filas que va a mostrar cada pagina de la tabla.
 *
 *  onRowClick: -manejador del click de las filas.
 *
 *  onRowDobleClick: -manejador del doble click de las filas.
 *
 */
const DataTable = ({
  data,
  camposOcultos = [],
  itemsPorPagina = 10,
  onRowClick,
  onRowDobleClick,
}) => {
  const [dataFiltrada, setDataFiltrada] = useState([{}]);
  const { dataPaginada, paginaActual, handlePaginacion } = usePaginacion(
    itemsPorPagina,
    dataFiltrada
  );
  const [campoFiltro, setCampoFiltro] = useState("");

  useEffect(() => {
    setDataFiltrada(data);
  }, [data]);

  /**
   *
   *  Manejadores
   *
   */

  const handleChangeSelect = (e) => {
    const { value } = e.target;
    setCampoFiltro(value);
    setDataFiltrada(data);
  };
  const handleChangeInput = (e) => {
    const { value } = e.target;
    if (campoFiltro === "") return;
    filtrar(value);
  };
  const handleChangeCheck = (e) => {
    const { checked } = e.target;
    filtrar(checked);
  };
  const handleHeaderSort = (campo) => {
    let campoKey = Object.keys(campo);
    const sortedData = dataFiltrada.sort((a, b) => {
      if (campo[campoKey[0]]) return a[campoKey[0]] > b[campoKey[0]];
      return a[campoKey[0]] < b[campoKey[0]];
    });
    setDataFiltrada([...sortedData]);
  };

  const filtrar = (value) => {
    let filtered = [];
    switch (typeof data[0][campoFiltro]) {
      case "number":
        if (value === "") {
          filtered = data;
        } else {
          filtered = data.filter(
            (dato) => dato[campoFiltro] === parseInt(value)
          );
        }
        break;
      case "boolean":
        filtered = data.filter(
          (dato) => dato[campoFiltro].toString() === value.toString()
        );
        break;
      default:
        filtered = data.filter((dato) =>
          dato[campoFiltro].toUpperCase().includes(value.toUpperCase())
        );
        break;
    }
    if (filtered.length > 0) {
      setDataFiltrada(filtered);
    } else {
      setDataFiltrada([{ error: "no se encontraron coincidencias" }]);
    }
  };
  return (
    <Paginacion
      cantidadItems={dataFiltrada.length}
      paginaActual={paginaActual}
      elementosAMostrar={itemsPorPagina}
      handlePaginacion={handlePaginacion}
    >
      <div className="shadow bg-secondary rounded-top d-flex align-items-center justify-content-end mw-100 ">
        <div className="form-group m-2">
          <div className="input-group">
            <BsSearch color="white" size="20px" className="m-1" />
            {typeof dataPaginada[0][campoFiltro] !== "boolean" ? (
              <input
                onChange={handleChangeInput}
                type="text"
                className="form-control-sm"
                placeholder="filtro..."
              />
            ) : (
              <input
                type="checkbox"
                onChange={handleChangeCheck}
                className="form-control-sm mx-2"
              />
            )}

            <div className="input-group-append">
              <select
                onChange={handleChangeSelect}
                className="custom-select-sm"
              >
                <option value="">Escoja uno...</option>
                {Object.keys(dataPaginada[0])
                  .filter((key) => !camposOcultos.includes(key))
                  .map((key, index) => (
                    <option key={index} value={key}>
                      {key}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <Tabla
        data={dataPaginada}
        onRowClick={onRowClick}
        onRowDobleClick={onRowDobleClick}
        camposOcultos={camposOcultos}
        onHeaderSort={handleHeaderSort}
      />
    </Paginacion>
  );
};
DataTable.defaultProps = {
  data: [{}],
};
export default DataTable;
