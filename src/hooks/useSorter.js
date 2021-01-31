/**
 *
 * @param {[{}]} data datos a ordenar
 * @param {function} setData metodo que permite la modificacion de la data.
 */
const useSorter = (data, setData) => {
  const handleHeaderSort = (campo) => {
    const { name, direction } = campo;
    if (direction === "") {
      return;
    }
    const sortedData = data.sort((a, b) => {
      if (!direction) return a[name] > b[name] ? -1 : 1;
      return a[name] < b[name] ? -1 : 1;
    });
    setData([...sortedData]);
  };

  return [handleHeaderSort];
};

export default useSorter;
