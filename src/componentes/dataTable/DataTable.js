import Tabla from "../tabla/Tabla";
import Paginacion from "../paginacion/Paginacion";
import { usePaginacion, useSorter, useFilter } from "../../hooks";

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
  const [dataFiltrada, setDataFiltrada, filtrar] = useFilter(data);
  const [handleHeaderSort] = useSorter(dataFiltrada, setDataFiltrada);
  const { dataPaginada, paginaActual, handlePaginacion } = usePaginacion(
    itemsPorPagina,
    dataFiltrada
  );

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
