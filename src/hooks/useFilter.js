import { useState, useEffect } from "react";

/**
 * @param {[{}]} data
 */
const useFilter = (data) => {
  const [dataFiltrada, setDataFiltrada] = useState([{}]);
  useEffect(() => {
    setDataFiltrada(data);
  }, [data]);
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

    if (dataFiltradaTemp.length > 0) {
      setDataFiltrada(dataFiltradaTemp);
      return true;
    }
    setDataFiltrada(data);
    return false;
  };

  return [dataFiltrada, setDataFiltrada, filtrar];
};

export default useFilter;
