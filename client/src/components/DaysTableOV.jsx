import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const DaysTable = ({ weeksSchedule, daysCount, completedDays, getDayName, handleDayClick }) => {
    return (
        <table className="overview-routine__table">
            <thead>
                <tr>
                    <th>Semana</th>
                    {Array.from({ length: daysCount }).map((_, i) => (
                        <th key={i}>Día {i + 1}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {weeksSchedule.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        <td>Semana {week.week_number}</td>
                        {Array.from({ length: daysCount }).map((_, dayIndex) => {
                            const dayId = week[`day_${dayIndex + 1}`];
                            const dayNumber = dayIndex + 1;
                            const isCompleted = completedDays.some(
                                (completedDay) =>
                                    completedDay.week_number === week.week_number &&
                                    completedDay.day_number === dayNumber
                            );
                            const columnClass = dayIndex % 2 === 0 ? "day-column-light" : "day-column-dark";
                            const cellClass = isCompleted ? "day-completed" : columnClass;

                            return dayId ? (
                                <td key={dayIndex} className={cellClass}
                                    onClick={() => handleDayClick(week.week_number, dayNumber, dayId)}>
                                    {getDayName(dayId)} <FontAwesomeIcon icon={faEye} />
                                </td>
                            ) : null;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DaysTable;
