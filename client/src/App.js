import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './index.css';

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

//componentes
import Header from './components/Header';
import Footer from './components/Footer';




function App() {
  return (    
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
            <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>}  />
            <Route path="/carrito" element={<ShoppingCart />} />
          </Routes>
          </main>
          <Footer />
        </div>
      </Router>
        
  );
}

export default App;