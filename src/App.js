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
import AdicionarRota from './pages/AdicionarRota/AdicionarRota';
import AdicionarPonto from './pages/AdicionarPonto/AdicionarPonto';
import EditarRota from './pages/EditarRota/EditarRota';


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
          <Route
            path='/adicionar-rota'
            element={
              <ProtectedRoute>
                <AdicionarRota />
              </ProtectedRoute>
            }
          />
          <Route
            path='/adicionar-ponto'
            element={
              <ProtectedRoute>
                <AdicionarPonto />
              </ProtectedRoute>
            }
          />
          <Route
            path='/editar-rota/:id'
            element={
              <ProtectedRoute>
                <EditarRota />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
