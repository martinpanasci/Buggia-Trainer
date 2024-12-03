import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

//context
import { CartProvider } from './components/CartContext.jsx';

//paginas
import Home from './components/pages/Home';
import Programa from './components/pages/Program';
import Selector from './components/pages/Programsselector';
import Alimentacion from './components/pages/Alimentacion';
import Contacto from './components/pages/Contacto';
import Login from './components/pages/LoginPage';
import Register from './components/pages/RegisterPage';
import Test from './components/pages/Test';
import Welcome from './components/WelcomePage';
import PrivateRoute from './components/PrivateRoute';
import ShoppingCart from './components/ShoppingCart';
import Form from './components/pages/Form';
import FormSchedule from './components/pages/FormSchedule';
import ViewRoutines from './components/pages/ViewRoutines';
import AssignRoutine from './components/pages/AssignRoutine';
import InteractiveRoutine from './components/InteractiveRoutine.jsx';
import OverViewRoutine from './components/OverViewRoutine.jsx';
import ProgramForm from './components/pages/ProgramForm.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import ConfirmEmail from './components/ConfirmEmail.jsx';
import DeletePrograms from './components/pages/PageDeletePrograms.jsx';

//componentes
import Header from './components/Header';
import Footer from './components/Footer';




function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/programa/:id" element={<Programa />} />
              <Route path="/programas" element={<Selector />} />
              <Route path="/alimentacion" element={<Alimentacion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/test" element={<Test />} />
              <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />
              <Route path="/carrito" element={<ShoppingCart />} />

              <Route path="/form" element={<PrivateRoute requiredRole="admin"><Form /></PrivateRoute>} />
              <Route path="/schedule" element={<PrivateRoute requiredRole="admin"><FormSchedule /></PrivateRoute>} />
              <Route path="/viewRoutines" element={<PrivateRoute requiredRole="admin"><ViewRoutines /></PrivateRoute>} />
              <Route path="/assignRoutine" element={<PrivateRoute requiredRole="admin"><AssignRoutine /></PrivateRoute>} />
              <Route path="/programForm" element={<PrivateRoute requiredRole="admin"><ProgramForm /></PrivateRoute>} />
              <Route path="/deletePrograms" element={<PrivateRoute requiredRole="admin"><DeletePrograms /></PrivateRoute>} />

              <Route path="/interactiveRoutine/:routineId/:weekNumber/:dayNumber/:dayId" element={<InteractiveRoutine />} />
              <Route path="/overview/:routineId" element={<OverViewRoutine />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              <Route path="/confirmEmail/:token" element={<ConfirmEmail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;