import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // <- Novo estado

  const fetchUserInfo = () => {
    setIsLoading(true);
  
    axios.get("http://localhost:5201/api/Auth/user-info", {
      withCredentials: true, // <- ESSENCIAL para enviar o cookie!
    })
    .then(response => {
      console.log("✅ Dados do usuário ao carregar a página:", response.data);
      setUser({ id: response.data.id, name: response.data.nome });
    })
    .catch(error => {
      console.error("❌ Erro ao buscar informações do usuário:", error);
      setUser(null);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchUserInfo(); // Sem precisar passar token
  }, []);

  // Debug do estado
  useEffect(() => {
    console.log("🔍 Estado do user no AuthContext:", user);
  }, [user]);

  // Função de login
  const login = (token) => {
    Cookies.set("auth_token", token, { expires: 7 });

    axios.get("http://localhost:5201/api/Auth/user-info", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    })
    .then(response => {
        console.log("✅ Dados do usuário recebidos:", response.data);
        setUser({ 
            id: response.data.id, 
            name: response.data.nome 
        });
    })
    .catch(error => {
        console.error("❌ Erro ao buscar informações do usuário:", error);
        setUser(null);
    });
  };

  // Função de logout
  const logout = () => {
    Cookies.remove("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {isLoading ? <div>Carregando...</div> : children}
    </AuthContext.Provider>
  );
};
