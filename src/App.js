import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cadastro } from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import { AuthProvider } from './hooks/AuthContext';
import EditarPerfil from './pages/EditarPerfil/EditarPerfil';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/editarperfil' element={<EditarPerfil />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
