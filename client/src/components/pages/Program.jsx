import React from 'react';
import { useParams } from 'react-router-dom';
import Progmain from '../Progmain';
import Progdetails from '../Progdetails';
import Progfaq from '../Progfaq';
import programsData from '../../data/programsData';


const Program = () => {
  const { id } = useParams(); // Extrae el ID de la URL
  console.log(id);
  const program = programsData.find(p => p.id === parseInt(id)); // Encuentra el programa por su ID

  // Si el programa no existe, muestra un mensaje de error
  if (!program) {
    return <div>Programa no encontrado</div>;
  }

  return (
    <div>
      <Progmain data={program.data} />
      <Progdetails details={program.details} />
      <Progfaq faqs={program.faqs} />
    </div>
  );
};

export default Program;