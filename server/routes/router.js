import express from 'express';
import jwt from 'jsonwebtoken';
import { login } from '../controllers/loginController.js';
import { register, confirmEmail, resendConfirmation } from '../controllers/registerController.js';
import { checkout } from '../controllers/cartController.js';
import { form } from '../controllers/formController.js';
import { getRoutines } from '../controllers/getRoutineController.js';
import { getExercises } from '../controllers/getExerciseController.js';
import { addExercise } from '../controllers/addExerciseController.js';
import { saveRoutineSchedule } from '../controllers/saveRoutineSchedule.js';
import { getRoutineDays } from '../controllers/getRoutineDays.js';
import { getRoutineSchedule } from '../controllers/getRoutineSchedule.js';
import { getDayExerciseDetails } from '../controllers/getDayExerciseDetails.js';
import { deleteRoutine, deleteSchedule, deleteDay, deleteDetails } from '../controllers/deleteController.js';
import { deleteExercise } from '../controllers/deleteController.js';
import { assignRoutine, removeRoutine, getUserRoutines } from '../controllers/routineAssignController.js';
import { getUsers } from '../controllers/getUsersController.js';
import { getExerciseVideos } from '../controllers/getExerciseVideos.js';
import { getCompletedDays } from '../controllers/getCompletedDays.js';
import { saveExerciseLoads } from '../controllers/saveExerciseLoads.js';
import { getAllRoutineData } from '../controllers/getAllRoutineData.js';
import { deleteDayLoads, deleteExerciseloads } from '../controllers/deleteLoads.js';
import { saveProgram } from "../controllers/saveProgramController.js";
import { getProgramInfo } from '../controllers/getProgramInfo.js';
import { getAllPrograms } from '../controllers/getAllPrograms.js';
import { saveEditRoutine, saveEditDay, saveEditDetails } from '../controllers/saveDetailsVR.js';
import { getProgramImgByRoutineId } from '../controllers/programImgController.js';
import { forgotPassword, resetPassword } from '../controllers/passwordController.js';
import { getPrograms, deleteProgram } from '../controllers/programsController.js';

import { createOrder, handleSuccess, handleFailure, handlePending, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']; // Esperamos el token en el header
    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRETO, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token.');
        }
        req.user = user; // Guardamos la información del usuario para su uso posterior
        next();
    });
}

// Rutas
router.post('/login', login);
router.post('/register', register);
router.post('/checkout', verifyToken, checkout);
router.post('/form', form);
router.get('/getRoutines', getRoutines);
router.get('/getExercises', getExercises);
router.post('/addExercises', addExercise);
router.post('/saveRoutineSchedule', saveRoutineSchedule);
router.get('/getRoutineDays/:routineId', getRoutineDays);
router.get('/getRoutineSchedule/:routineId', getRoutineSchedule);
router.get('/getDayExerciseDetails/:dayId', getDayExerciseDetails);
router.delete('/deleteRoutine/:id', deleteRoutine);
router.delete('/deleteSchedule/:routineId', deleteSchedule);
router.delete('/deleteDay/:dayId', deleteDay);
router.delete('/deleteDetails/:exerciseId', deleteDetails);
router.delete('/deleteExercise/:id', deleteExercise);
router.post('/assignRoutine', assignRoutine);
router.delete('/removeRoutine/:userId/:routineId', removeRoutine);
router.get('/getUserRoutines/:userId', getUserRoutines);
router.get('/getUsers', getUsers);
router.get('/getExerciseVideos', getExerciseVideos);
router.get('/getCompletedDays/:userId/:routineId', getCompletedDays);
router.post('/exerciseLoads', saveExerciseLoads);
router.get('/getAllRoutineData/:userId/:routineId', getAllRoutineData);
router.delete('/deleteDayLoads/:dayNumber/:userId/:weekNumber/:routineId', deleteDayLoads);
router.delete('/deleteExerciseloads/:exerciseName/:userId/:weekNumber/:dayNumber', deleteExerciseloads);
router.post("/savePrograms", saveProgram);
router.get('/getProgramInfo/:id', getProgramInfo);
router.get('/getAllPrograms', getAllPrograms);
router.get('/saveEditRoutine', saveEditRoutine);
router.get('/saveEditDay', saveEditDay);
router.get('/saveEditDetails', saveEditDetails);
router.get('/getProgramImgByRoutineId/:routineId', getProgramImgByRoutineId);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.get('/confirmEmail/:token', confirmEmail)
router.post('/resendConfirmation', resendConfirmation);
router.get('/getPrograms', getPrograms);
router.delete('/deleteProgram/:id', deleteProgram);

router.post('/create-order', createOrder);
router.get('/success', handleSuccess);
router.get('/failure', handleFailure);
router.get('/pending', handlePending);
router.post('/webhook', handleWebhook);



export default router;
