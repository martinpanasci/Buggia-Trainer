import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './styles/InteractiveRoutine.css'; // Podemos agregar un archivo CSS para estilizar el componente
import Modal from './ModalInteractiveRoutine'; // Usaremos un componente Modal para las confirmaciones
import { jwtDecode } from 'jwt-decode'; // Importamos jwt-decode para decodificar el token JWT
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const InteractiveRoutine = () => {
    const { routineId, weekNumber, dayNumber, dayId } = useParams();
    const [exercises, setExercises] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [loadSets, setLoadSets] = useState({ load_set_1: '', load_set_2: '', load_set_3: '', load_set_4: '' });
    const [showModal, setShowModal] = useState(false);
    const [isGoingBack, setIsGoingBack] = useState(false);
    const [userId, setUserId] = useState(null);
    const [exerciseVideos, setExerciseVideos] = useState({});
    const location = useLocation();
    const { routine, uniqueDays } = location.state || { routine: undefined, uniqueDays: undefined };
    const navigate = useNavigate();  
    const [isFinishingDay, setIsFinishingDay] = useState(false);


    // Obtener user_id del token JWT cuando se monta el componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);
        }
    }, []);

    // Cargar los ejercicios del día cuando se monta el componente
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                // Aquí llamaríamos a la API para obtener los ejercicios para el día específico
                const response = await fetch(`http://localhost:3000/getDayExerciseDetails/${dayId}`);
                const data = await response.json();                
                setExercises(data);                
            } catch (error) {
                console.error('Error fetching exercises:', error);

            }
        };
        fetchExercises();
    }, [routineId, weekNumber, dayId]);


    useEffect(() => {
        const fetchExerciseVideos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/getExerciseVideos`);
                if (response.ok) {
                    const data = await response.json();
                    const videoMap = data.reduce((acc, exercise) => {
                        acc[exercise.id] = exercise.video_url;
                        return acc;
                    }, {});
                    setExerciseVideos(videoMap); // Guardamos los videos por id de ejercicio
                }
            } catch (error) {
                console.error('Error al obtener los videos de los ejercicios:', error);
            }
        };

        fetchExerciseVideos();
    }, []);    
    
    // Manejar el evento del botón "Siguiente"
    const handleNextExercise = () => {
        if (currentExerciseIndex < exercises.length - 1) { // Si no es el último ejercicio, sigue al siguiente
            if (Object.values(loadSets).some(value => value !== '')) {
                setShowModal(true);
            } else {
                goToNextExercise();
            }
        } else {            
            handleFinishDay();
        }
    };

    const handleFinishDay = async () => {
        setIsFinishingDay(true);           
        setShowModal(true);        
    };

    const confirmFinishDay = async () => {
        await saveLoadData(); 
        navigate(`/overview/${routineId}`); 
    };

    // Manejar el evento del botón "Previo"
    const handlePreviousExercise = () => {
        if (Object.values(loadSets).some(value => value !== '')) {            
            setIsGoingBack(true);
            setShowModal(true);
        } else {            
            goToPreviousExercise();
        }
    };

    // Ir al siguiente ejercicio
    const goToNextExercise = () => {
        if (currentExerciseIndex < exercises.length - 1) {
            saveLoadData();
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setLoadSets({ load_set_1: '', load_set_2: '', load_set_3: '', load_set_4: '', load_set_5: '', load_set_6: ''  });
        }
    };

    // Ir al ejercicio previo
    const goToPreviousExercise = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
            setLoadSets({ load_set_1: '', load_set_2: '', load_set_3: '', load_set_4: '', load_set_5: '', load_set_6: ''  });
        }
    };

    const handleLoadChange = (setKey, value) => {
        setLoadSets((prevState) => ({
            ...prevState,
            [setKey]: value,
        }));
    };   
        
        
    // Guardar los datos de cargas y repeticiones
    const saveLoadData = async () => {
        if (Object.values(loadSets).some((value) => value !== '')) {
          try {
            const response = await fetch('http://localhost:3000/exerciseLoads', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: userId,
                week_number: weekNumber,
                day_number: dayNumber,
                day_exercise_detail_id: exercises[currentExerciseIndex].day_exercise_detail_id,
                ...loadSets,
                date: new Date().toISOString().split('T')[0],
              }),              
            });
            if (!response.ok) {
              throw new Error('Error saving exercise load data');
            }
          } catch (error) {
            console.error('Error saving load data:', error);
          }
        }
      };
      
    

    // Confirmar acción desde el modal
    const confirmModalAction = () => {
        if (isGoingBack) {
            goToPreviousExercise();
            setIsGoingBack(false);
        } else {
            goToNextExercise();
        }
        if (isFinishingDay) {
            confirmFinishDay();
        }
        setShowModal(false);
        setIsFinishingDay(false);
    };

    // Cancelar acción desde el modal
    const cancelModalAction = () => {
        setShowModal(false);
        setIsGoingBack(false);
    };

    //obtine el dayname del prop
    const filteredDay = uniqueDays.find((day) => day.id === parseInt(dayId));

    const handleBack = (routineId) => {        
        navigate(`/overview/${routineId}`);
    };

    return (
        <div className="interactive-routine">
            
            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
                >
                    {`${Math.round(((currentExerciseIndex + 1) / exercises.length) * 100)}%`}
                </div>
                {/* Flecha para volver */}
            <div className="back-arrow-interactive-routine" onClick={() => handleBack(routineId)}>
                <FontAwesomeIcon icon={faArrowLeft} /> 
            </div>
            </div>
            <div className="routine-header">
                <h2 className="routine-title">Rutina: {routine.name} </h2>
                <h3 className="routine-subtitle">Semana: {weekNumber} - {filteredDay ? `Día: ${filteredDay.day_name}` : 'Día no encontrado'} </h3>
            </div>

            {exercises.length > 0 && (
                <div className="exercise-details">
                    <table className="exercise-table">
                        <tbody>
                            <tr>
                                <td className="exercise-info-label" >Ejercicio:</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="exercise-info-value">{exercises[currentExerciseIndex].exercise_name}</td>
                                <td className="exercise-info-value">
                                    {exerciseVideos[exercises[currentExerciseIndex].exercise_id] ? (
                                        <a
                                            className="exercise-youtube"
                                            href={exerciseVideos[exercises[currentExerciseIndex].exercise_id]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            YouTube
                                        </a>
                                    ) : (
                                        <span style={{ color: '#999', cursor: 'not-allowed' }}>No disponible</span>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="exercise-info-label">Sets de calentamiento:</td>
                                <td className="exercise-info-label">Sets efectivos:</td>
                                <td className="exercise-info-label">Repeticiones:</td>
                            </tr>
                            <tr>
                                <td className="exercise-info-value">{exercises[currentExerciseIndex].warmup_sets}</td>
                                <td className="exercise-info-value">{exercises[currentExerciseIndex].working_sets}</td>
                                <td className="exercise-info-value">{exercises[currentExerciseIndex].reps}</td>
                            </tr>
                            <tr>
                                <td className="exercise-info-label">RPE inicial:</td>
                                <td className="exercise-info-label">RPE último set:</td>
                            </tr>
                            <tr>
                                <td className="exercise-info-value">{exercises[currentExerciseIndex].early_set_rpe}</td>
                                <td className="exercise-info-value">{exercises[currentExerciseIndex].last_set_rpe}</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="exercise-info-label">Técnica del último set:</td>
                                <td className="exercise-info-label">Tiempo de descanso:</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="exercise-info-value" >{exercises[currentExerciseIndex].last_set_technique}</td>
                                <td className="exercise-info-value">{exercises[currentExerciseIndex].rest_time}</td>
                            </tr>
                            <tr>
                                <td className="exercise-info-label" >Notas:</td>
                            </tr>
                            <tr>
                                <td className="exercise-info-value" >{exercises[currentExerciseIndex].notes}</td>
                            </tr>
                            <tr>
                                <td className="exercise-info-label"> Sustituciones: </td>
                            </tr>
                            <tr>
                                <td className="exercise-info-value">
                                    {exercises[currentExerciseIndex].substitution1_name || 'No disponible'}
                                    {exerciseVideos[exercises[currentExerciseIndex].substitution1_id] ? (
                                        <a
                                            href={exerciseVideos[exercises[currentExerciseIndex].substitution1_id]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="exercise-youtube"
                                            style={{ marginLeft: '8px', color: '#FF0000' }}
                                        >
                                            Youtube
                                        </a>
                                    ) : (
                                        <span style={{ color: '#999', marginLeft: '8px' }}>No disponible</span>
                                    )}
                                </td>
                                <td className="exercise-info-value">
                                    {exercises[currentExerciseIndex].substitution2_name || 'No disponible'}
                                    {exerciseVideos[exercises[currentExerciseIndex].substitution2_id] ? (
                                        <a
                                            href={exerciseVideos[exercises[currentExerciseIndex].substitution2_id]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="exercise-youtube"
                                            style={{ marginLeft: '8px', color: '#FF0000' }}
                                        >
                                            Youtube
                                        </a>
                                    ) : (
                                        <span style={{ color: '#999', marginLeft: '8px' }}>No disponible</span>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="exercise-info-label">Set 1</td>
                                <td className="exercise-info-label">Set 2</td>
                                <td className="exercise-info-label">Set 3</td>
                                
                            </tr>
                            <tr>
                                <td className="set-input">
                                    <input type="text" placeholder="Ingresa tus cargas" value={loadSets.load_set_1} onChange={(e) => handleLoadChange('load_set_1', e.target.value)}/>
                                </td>
                                <td className="set-input">
                                    <input type="text" placeholder="Ingresa tus cargas" value={loadSets.load_set_2} onChange={(e) => handleLoadChange('load_set_2', e.target.value)}/>
                                </td>
                                <td className="set-input">
                                    <input type="text" placeholder="Ingresa tus cargas" value={loadSets.load_set_3} onChange={(e) => handleLoadChange('load_set_3', e.target.value)}/>
                                </td>
                                
                            </tr>
                            <tr>
                                <td className="exercise-info-label">Set 4</td>
                                <td className="exercise-info-label">Set 5</td>
                                <td className="exercise-info-label">Set 6</td>
                                
                            </tr>
                            <tr>
                                <td className="set-input">
                                    <input type="text" placeholder="Ingresa tus cargas" value={loadSets.load_set_4} onChange={(e) => handleLoadChange('load_set_4', e.target.value)}/>
                                </td>
                                <td className="set-input">
                                    <input type="text" placeholder="Ingresa tus cargas" value={loadSets.load_set_5} onChange={(e) => handleLoadChange('load_set_5', e.target.value)}/>
                                </td>
                                <td className="set-input">
                                    <input type="text" placeholder="Ingresa tus cargas" value={loadSets.load_set_6} onChange={(e) => handleLoadChange('load_set_6', e.target.value)}/>
                                </td>                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <div className="navigation-buttons">
                <button
                    onClick={handlePreviousExercise}
                    disabled={currentExerciseIndex === 0}
                    className="btn-prev"
                >
                    Previo
                </button>
                <button onClick={handleNextExercise} className="btn-next">
                    {currentExerciseIndex === exercises.length - 1 ? 'Finalizar Día' : 'Siguiente'}
                </button>
            </div>

            {showModal && (
                <Modal
                    message={isGoingBack ? 'Los datos de las cargas no se guardaron y se perderán si no los guarda, ¿desea continuar?' : '¿Desea guardar los datos ingresados y continuar?'}
                    onConfirm={confirmModalAction}
                    onCancel={cancelModalAction}
                />
            )}
        </div>
    );
};

export default InteractiveRoutine;
