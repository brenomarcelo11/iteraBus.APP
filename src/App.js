import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cadastro } from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import { AuthProvider } from './hooks/AuthContext';
import EditarPerfil from './pages/EditarPerfil/EditarPerfil';
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/login' element={<Login />} />

          {/* Rotas protegidas */}
          <Route
            path='/editarperfil'
            element={
              <ProtectedRoute>
                <EditarPerfil />
              </ProtectedRoute>
            }
          />

          <Route
            path='/HomeAdmin'
            element={
              <ProtectedRoute>
                <HomeAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
