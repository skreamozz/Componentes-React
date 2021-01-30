import Tabla from "../tabla/Tabla";
import Paginacion from "../paginacion/Paginacion";
import usePaginacion from "../../hooks/usePaginacion";
import useSorter from "../../hooks/useSorter";
import { useEffect, useState } from "react";

/**
 *
 * @param {{data:object[], camposOcultos:string[], itemsPorPagina:number,onRowClick:()=>{},onRowDobleClick:()=>{}}} props
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
  const [handleHeaderSort] = useSorter(dataFiltrada, setDataFiltrada);

  useEffect(() => {
    setDataFiltrada(data);
  }, [data]);

  /**
   *
   *    Metodos
   *
   */

  const filtrar = (value) => {
    const campos = Object.keys(value);
    let dataFiltradaTemp = data;
    campos.forEach((campo) => {
      if (value[campo] === "") return;
      switch (typeof data[0][campo]) {
        case "number":
          dataFiltradaTemp = dataFiltradaTemp.filter(
            (dato) => dato[campo] === parseInt(value[campo])
          );
          break;
        case "boolean":
          dataFiltradaTemp = dataFiltradaTemp.filter(
            (dato) => dato[campo].toString() === value[campo].toString()
          );
          break;
        default:
          dataFiltradaTemp = dataFiltradaTemp.filter((dato) =>
            dato[campo].includes(value[campo])
          );
          break;
      }
    });
    console.log(dataFiltradaTemp.length);
    if (dataFiltradaTemp.length > 0) {
      setDataFiltrada(dataFiltradaTemp);
    } else {
      setDataFiltrada(data);
    }
  };

  return (
    <>
      <Paginacion
        cantidadItems={dataFiltrada.length}
        paginaActual={paginaActual}
        elementosAMostrar={itemsPorPagina}
        handlePaginacion={handlePaginacion}
      >
        <Tabla
          data={dataPaginada}
          onRowClick={onRowClick}
          onRowDobleClick={onRowDobleClick}
          camposOcultos={camposOcultos}
          onHeaderSort={handleHeaderSort}
          onFilter={filtrar}
        />
      </Paginacion>
    </>
  );
};
DataTable.defaultProps = {
  data: [{}],
};
export default DataTable;
