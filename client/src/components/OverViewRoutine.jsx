import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/OverViewRoutine.css';
import { jwtDecode } from 'jwt-decode';
import DaysTable from './DaysTableOV';
import WeightsMenu from './WeightsMenuOV';
import DayDetails from './DaysDetailsOV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const OverviewRoutine = () => {
    const { routineId } = useParams();
    const [routine, setRoutine] = useState(null);
    const [weeksSchedule, setWeeksSchedule] = useState([]);
    const [uniqueDays, setUniqueDays] = useState([]);
    const [exerciseVideos, setExerciseVideos] = useState({});
    const [completedDays, setCompletedDays] = useState([]);
    const navigate = useNavigate();
    const [showDayDetails, setShowDayDetails] = useState(false);
    const [showWeightsMenu, setShowWeightsMenu] = useState(false);
    const [expandedWeeks, setExpandedWeeks] = useState({});
    const [exerciseLoads, setExerciseLoads] = useState([]);

    useEffect(() => {
        const fetchRoutineDetails = async () => {
            try {
                // Fetch para obtener los datos básicos de la rutina
                const response = await fetch(`http://localhost:3000/getRoutines`);
                if (!response.ok) throw new Error('Error al obtener la rutina');
                const routinesData = await response.json();
                const routineData = routinesData.find(r => r.id === parseInt(routineId));
                setRoutine(routineData);

                // Fetch para obtener el cronograma de la rutina
                const scheduleResponse = await fetch(`http://localhost:3000/getRoutineSchedule/${routineId}`);
                const scheduleData = await scheduleResponse.json();
                setWeeksSchedule(scheduleData);

                // Fetch para obtener los días únicos de la rutina
                const daysResponse = await fetch(`http://localhost:3000/getRoutineDays/${routineId}`);
                const daysData = await daysResponse.json();

                // Fetch de detalles de ejercicios para cada día
                const daysWithDetails = await Promise.all(
                    daysData.map(async (day) => {
                        const exercisesResponse = await fetch(`http://localhost:3000/getDayExerciseDetails/${day.id}`);
                        const exercisesData = await exercisesResponse.json();
                        return { ...day, exercises: exercisesData };
                    })
                );

                setUniqueDays(daysWithDetails);
            } catch (error) {
                console.error('Error al obtener la información de la rutina:', error);
            }
        };

        fetchRoutineDetails();
    }, [routineId]);

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

    // Obtener los días completados desde la base de datos, envuelto en useCallback
    const fetchCompletedDays = useCallback(async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/getCompletedDays/${userId}/${routineId}`);
            const data = await response.json();
            setCompletedDays(data); // Guardamos los días completados filtrados por rutina            
        } catch (error) {
            console.error('Error al obtener los días completados:', error);
        }
    }, [routineId]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;
        const userId = decodedToken ? decodedToken.user_id : null;

        if (userId) {
            fetchCompletedDays(userId);
        }
    }, [routineId, fetchCompletedDays]); // Agrega `fetchCompletedDays` a la lista de dependencias

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? decodedToken.user_id : null;

    // Asegúrate de que `userId` no sea null antes de usarlo
    if (!userId) {
        console.error('No se pudo obtener el userId del token');
    }


    const fetchRoutineData = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = token ? jwtDecode(token) : null;
            const userId = decodedToken ? decodedToken.user_id : null;

            if (!userId) return;

            const response = await fetch(`http://localhost:3000/getAllRoutineData/${userId}/${routineId}`);
            if (!response.ok) throw new Error('Error al obtener los datos completos de la rutina');
            const data = await response.json();
            setExerciseLoads(data);
        } catch (error) {
            console.error('Error al obtener los datos completos de la rutina:', error);
        }
    }, [routineId]);

    useEffect(() => {
        fetchRoutineData(); // Llama a la función cuando cambie routineId
    }, [fetchRoutineData]);
    

        const handleDeleteDay = async (dayNumber, userId, weekNumber, routineId) => {
            console.log("Datos enviados al backend:", { dayNumber, userId, weekNumber, routineId }); // Debug
            if (window.confirm(`¿Seguro que deseas eliminar el Día ${dayNumber} de la Semana ${weekNumber}?`))
            try {
                const response = await fetch(
                    `http://localhost:3000/deleteDayLoads/${dayNumber}/${userId}/${weekNumber}/${routineId}`,
                    {
                        method: 'DELETE',
                    }
                );
                if (response.ok) {
                    alert('Día eliminado correctamente.');
                    fetchRoutineData(); // Refresca los datos en el frontend
                } else {
                    alert('Error al eliminar el día.');
                }
            } catch (error) {
                console.error('Error al eliminar el día:', error);
            }
        };
        
    
    const handleDeleteExercise = async (exerciseName, userId, weekNumber, dayNumber) => {
        console.log("Datos enviados al backend:", { exerciseName, userId, weekNumber, dayNumber }); // Debug
        if (window.confirm(`¿Seguro que deseas eliminar el ejercicio ${exerciseName}?`)) {
            try {
                const response = await fetch(
                    `http://localhost:3000/deleteExerciseloads/${exerciseName}/${userId}/${weekNumber}/${dayNumber}`,
                    {
                        method: 'DELETE',
                    }
                );
                if (response.ok) {
                    alert('Ejercicio eliminado correctamente.');
                    fetchRoutineData(); // Refresca los datos en el frontend
                } else {
                    alert('Error al eliminar el ejercicio.');
                }
            } catch (error) {
                console.error('Error al eliminar el ejercicio:', error);
            }
        }
    };
    


    // Redirigir a InteractiveRoutine al hacer clic en un día
    const handleDayClick = (weekNumber, dayNumber, dayId) => {
        navigate(`/interactiveRoutine/${routineId}/${weekNumber}/${dayNumber}/${dayId}`, {
            state: { routine, uniqueDays },
        });
    };


    const getDayName = (dayId) => {
        const day = uniqueDays.find((d) => d.id === dayId);
        return day ? day.day_name : 'Día Libre';
    };



    const daysCount = weeksSchedule.reduce((max, week) => {
        const weekDaysCount = Object.keys(week).filter((key) => key.startsWith('day_') && week[key]).length;
        return Math.max(max, weekDaysCount);
    }, 0);

    const toggleDayDetails = () => {
        setShowDayDetails((prev) => !prev);
    };

    const toggleWeightsMenu = () => {
        setShowWeightsMenu((prev) => !prev);
    };

    const toggleWeek = (weekNumber) => {
        setExpandedWeeks((prev) => ({
            ...prev,
            [weekNumber]: !prev[weekNumber],
        }));
    };

    const handleBack = () => {
        navigate('/welcome');
    };

    return (
        <div className="overview-routine">
            {/* Flecha para volver */}
            <div className="back-arrow" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} /> 
            </div>

            <h2 className="overview-routine__title">Detalles de la Rutina</h2>
            {routine && <h3>Rutina: {routine.name}</h3>}
            {weeksSchedule.length > 0 && (
                <DaysTable
                    weeksSchedule={weeksSchedule}
                    daysCount={daysCount}
                    completedDays={completedDays}
                    getDayName={getDayName}
                    handleDayClick={handleDayClick}
                />
            )}
            <WeightsMenu
                exerciseLoads={exerciseLoads}
                expandedWeeks={expandedWeeks}
                toggleWeek={toggleWeek}
                toggleWeightsMenu={toggleWeightsMenu}
                showWeightsMenu={showWeightsMenu}
                handleDeleteDay={handleDeleteDay}
                handleDeleteExercise={handleDeleteExercise}
                userId={userId}
                routineId={routineId}               
            />
            <DayDetails
                uniqueDays={uniqueDays}
                exerciseVideos={exerciseVideos}
                toggleDayDetails={toggleDayDetails}
                showDayDetails={showDayDetails}
            />
        </div>
    );
};

export default OverviewRoutine;
