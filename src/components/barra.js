import React, { useState, useEffect } from 'react';


//Uso de la api Fetch 
const SearchComponent = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [csvData, setCsvData] = useState(null);

  // Función para cargar y procesar el archivo CSV
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      setCsvData(result);
    };
    reader.readAsText(file);
  };

  /**
 Función para cargar y procesar el archivo CSV automáticamente
  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch('ruta_hacia_tu_archivo/vacantes1.csv'); // Reemplaza 'ruta_hacia_tu_archivo' con la ruta real de tu archivo
        const csvContent = await response.text();
        setCsvData(csvContent);
      } catch (error) {
        console.error('Error al cargar el archivo CSV:', error);
      }
    };

    fetchCsvData();
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

   */

  // Procesar los datos del archivo CSV
  useEffect(() => {
    if (csvData) {
      const parsedData = csvData.split('\n').map((row) => {
        const columns = row.split(',');
        return {
          nombreVacante: columns[0],
          area: columns[1],
          nivelPuesto: columns[2]
        };
      });
      setUsers(parsedData);
    }
  }, [csvData]);

// Función de búsqueda
const handleSearch = (e) => {
  setSearch(e.target.value.toLowerCase());  // se convierte el valor de busqueda a minusculas para hacer la comparación
};

// Filtrar resultados
const filteredResults = !search
  ? users
  : users.filter((user) => {
      const searchTerm = search.toLowerCase();
      const vacante = user.nombreVacante.toLowerCase();
      const area = user.area.toLowerCase();
      
      // Verificar si la vacante comienza exactamente con el término de búsqueda
      const startsWithSearchTerm = vacante.startsWith(searchTerm);

      // Verificar si la vacante contiene el término de búsqueda en cualquier parte o si el área coincide con el término de búsqueda
      const isMatch = vacante.includes(searchTerm) || area.includes(searchTerm);

      // Verificar si la vacante es similar a la búsqueda (no solo comienza con ella, sino que es similar)
      const isSimilar = vacante.includes(searchTerm);

      // Retornar true si la vacante comienza con el término de búsqueda, es similar a la búsqueda o coincide con el área de búsqueda
      return startsWithSearchTerm || isSimilar || isMatch;
    });




    
  return (
    <div>
      <input
        value={search}
        onChange={handleSearch}
        type="text"
        placeholder="Buscar"
        className="form-control"
      />
      <input type="file" onChange={handleFileUpload} accept=".csv" />
      <table className="table  mt-5 shadow-lg">
        <thead>
          <tr className="bg-curso text-white">

          </tr>
        </thead>
        <tbody>
          {filteredResults.map((user, index) => (
            <tr key={index}>
              <td>{user.nombreVacante}</td>
              <td>{user.area}</td>
              <td>{user.nivelPuesto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchComponent;



