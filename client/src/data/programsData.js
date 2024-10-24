import g1 from '../assets/images/g1.jpg';
import g2 from '../assets/images/g2.jpg';
import g3 from '../assets/images/g3.jpg';
import g4 from '../assets/images/g4.jpg';
import g5 from '../assets/images/g5.jpg';
import g6 from '../assets/images/g6.jpg';

const programsData = [
    // Programa 1
    {
        id: 1,
        data: [
            {
                id: 1,
                name: "Programa Powerbuilding",
                description: "Este programa está diseñado para aquellos que buscan aumentar su fuerza y tamaño muscular.",
                image: g1,
                categories: ["Para hombres", "Powerbuilding", "Intermedio / Avanzado"],
                price: "$9.99"
            }
        ],
        details: [
            {
                image: g3,
                description: "Este es el detalle del Powerbuilding 1."
            },
            {
                image: g4,
                description: "Este es el detalle del Powerbuilding 2."
            }
        ],
        faqs: [
            {
                question: "¿Cuánto tiempo tarda en verse los resultados?",
                answer: "Los resultados varían según la dedicación, pero suelen notarse en 4 a 6 semanas."
            },
            {
                question: "¿Es adecuado para principiantes?",
                answer: "Recomendamos este programa para personas con experiencia en entrenamiento de fuerza."
            }
        ]
    },
    // Programa 2
    {
        id: 2,
        data: [
            {
                id: 2,
                name: "Programa Cardio y Pérdida de Peso",
                description: "Un programa enfocado en maximizar la quema de calorías y la pérdida de peso de manera saludable.",
                image: g2,
                categories: ["Para mujeres", "Cardio", "Principiante"],
                price: "$7.99"
            }
        ],
        details: [
            {
                image: g5,
                description: "Este es el detalle del Cardio 1."
            },
            {
                image: g6,
                description: "Este es el detalle del Cardio 2."
            }
        ],
        faqs: [
            {
                question: "¿Cuánto tiempo debería durar cada sesión?",
                answer: "Cada sesión debe durar entre 30 y 45 minutos."
            },
            {
                question: "¿Este programa incluye dieta?",
                answer: "No incluye dieta, pero ofrecemos planes nutricionales adicionales."
            }
        ]
    },
    // Programa 3
    {
        id: 3,
        data: [
            {   
                id: 3,
                name: "Programa Bodybuilding",
                description: "Un programa enfocado en maximizar la quema de calorías y la pérdida de peso de manera saludable.",
                image: g3,
                categories: ["Para mujeres", "Cardio", "Principiante"],
                price: "$7.99"
            }
        ],
        details: [
            {
                image: g5,
                description: "Este es el detalle del Cardio 1."
            },
            {
                image: g6,
                description: "Este es el detalle del Cardio 2."
            },
            {
                image: g6,
                description: "Este es el detalle del Cardio 2."
            }
        ],
        faqs: [
            {
                question: "¿Cuánto tiempo debería durar cada sesión?",
                answer: "Cada sesión debe durar entre 30 y 45 minutos."
            },
            {
                question: "¿Este programa incluye dieta?",
                answer: "No incluye dieta, pero ofrecemos planes nutricionales adicionales."
            }
        ]
    },
    // Programa 4
    {
        id: 4,
        data: [
            {
                id: 4,
                name: "Programa Powerbuilding",
                description: "Un programa enfocado en maximizar la quema de calorías y la pérdida de peso de manera saludable.",
                image: g4,
                categories: ["Para mujeres", "Cardio", "Principiante"],
                price: "$7.99"
            }
        ],
        details: [
            {
                image: g5,
                description: "Este es el detalle del Cardio 1."
            },
            {
                image: g6,
                description: "Este es el detalle del Cardio 2."
            },
            {
                image: g6,
                description: "Este es el detalle del Cardio 2."
            }
        ],
        faqs: [
            {
                question: "¿Cuánto tiempo debería durar cada sesión?",
                answer: "Cada sesión debe durar entre 30 y 45 minutos."
            },
            {
                question: "¿Este programa incluye dieta?",
                answer: "No incluye dieta, pero ofrecemos planes nutricionales adicionales."
            }
        ]
    },
    // Programa 5
    {
        id: 5,
        data: [
            {
                id: 5,
                name: "Programa de mujeres enfocado en gluteos",
                description: "Un programa enfocado en maximizar la quema de calorías y la pérdida de peso de manera saludable.",
                image: g5,
                categories: ["Para mujeres", "Cardio", "Principiante"],
                price: "$7.99"
            }
        ],
        details: [
            {
                image: g5,
                description: "Este es el detalle del Cardio 1."
            },
            {
                image: g6,
                description: "Este es el detalle del Cardio 2."
            },
            {
                image: g6,
                description: "Este es el detalle del Cardio 2."
            }
        ],
        faqs: [
            {
                question: "¿Cuánto tiempo debería durar cada sesión?",
                answer: "Cada sesión debe durar entre 30 y 45 minutos."
            },
            {
                question: "¿Este programa incluye dieta?",
                answer: "No incluye dieta, pero ofrecemos planes nutricionales adicionales."
            }
        ]
    },
    // Programa 6
    {
        id: 6,
        data: [
            {
                id: 6,
                name: "Programa fullbody",
                description: "Un programa enfocado en maximizar la quema de calorías y la pérdida de peso de manera saludable.",
                image: g6,
                categories: ["Para mujeres", "Cardio", "Principiante"],
                price: "$7.99"
            }
        ],
        details: [
            {
                image: g5,
                description: "Este es el detalle del Cardio 1."
            },
            {
                image: g6,
                description: "Este es el detalle del Cardio 2."
            }
        ],
        faqs: [
            {
                question: "¿Cuánto tiempo debería durar cada sesión?",
                answer: "Cada sesión debe durar entre 30 y 45 minutos."
            },
            {
                question: "¿Este programa incluye dieta?",
                answer: "No incluye dieta, pero ofrecemos planes nutricionales adicionales."
            }
        ]
    }
];

export default programsData;