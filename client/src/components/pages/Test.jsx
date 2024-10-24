import React, { useState } from "react";
import '../styles/Test.css'


const questions = [
  {
    id: 1,
    label: "¿Cuál es tu género?",
    options: ["Masculino", "Femenino"],
  },
  {
    id: 2,
    label: "¿Cuál es tu rango de edad?",
    options: ["Menos de 20", "20-30", "30-40", "40-50", "50-60", "Más de 60"],
  },
  {
    id: 3,
    label: "¿Cuál es tu objetivo?",
    options: ["Ganar fuerza", "Ganar músculo", "Una conbinacion de ambos", "Principalmente perder graza, ganar algo de musculo tmb no estaria mal"],
  },
  {
    id: 4,
    label: "¿Cuál es tu nivel de experiencia?",
    options: ["Menos de 2 años", "2 a 5 años", "Mas de 5 años"],
  },
  {
    id: 5,
    label: "¿Cuántos días puedes entrenar por semana?",
    options: ["3 días", "4 días", "5 días", "6 días"],
  },
  {
    id: 6,
    label: "¿Qué tipo de rutina prefieres?",
    options: ["Full Body", "Upper Lower", "Push Pull Legs", "Da igual"],
  }
];

function Quiz() {

  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [transition, setTransition] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    setTransition(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        console.log("Respuestas finales:", answers);
        alert("Gracias por completar el quiz!");
      }
      setTransition(false);
    }, 250);
  };

  const handlePreviousQuestion = () => {
    setTransition(true);
    setTimeout(() => {
      if (currentQuestion > -1) {
        setCurrentQuestion(currentQuestion - 1);
      }
      setTransition(false);
    }, 250);
  };

  const handleStartQuizWithTransition = () => {
    setTransition(true);   
    setTimeout(() => {
      setCurrentQuestion(0);
      setTransition(false);
    }, 250);
  };

  if (currentQuestion === -1) {
    return (
      <div className={`quiz-container ${transition ? 'fade-out' : 'fade-in'}`}>
        <h2>Encontra el programa perfecto para vos!</h2>
        <p>Con este test podras encontrar el mejor programa de entrenamiento para ti en menos de 10 simples preguntas</p>
        <button className="quiz-option-btn" onClick={handleStartQuizWithTransition}>Comenzar</button>
      </div>
    );
  }

  return (
    <div className={`quiz-container ${transition ? 'fade-out' : 'fade-in'}`}>
      <h3>{questions[currentQuestion].label}</h3>

      <div className="quiz-options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(questions[currentQuestion].id, option)}
            className="quiz-option-btn"
          >
            {option}
          </button>
        ))}
      </div>

      <div className="quiz-navigation">
        {currentQuestion > -1 && (
          <button onClick={handlePreviousQuestion} className="back-btn">
            Volver
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;