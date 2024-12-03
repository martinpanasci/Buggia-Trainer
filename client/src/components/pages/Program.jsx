import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Progmain from '../Progmain';
import Progdetails from '../Progdetails';
import Progfaq from '../Progfaq';
//import './styles/ProgramContainer.css'

const Program = () => {
  const { id } = useParams(); // Extrae el ID de la URL
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/getProgramInfo/${id}`); // Reemplaza con tu URL del backend
        setProgram(response.data); // Guarda los datos del programa
        console.log(response.data)
      } catch (error) {
        setError(error.response?.data?.error || 'Error al obtener el programa');
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='program-container-page'>
      <Progmain data={program.data} />
      <Progdetails details={program.details} />
      <Progfaq faqs={program.faqs} />
    </div>
  );
};

export default Program;
