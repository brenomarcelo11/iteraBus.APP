import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Buscar o usuário quando o componente for montado
  const fetchUserInfo = (token) => {
    axios.get("http://localhost:5201/api/Auth/user-info", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    })
    .then(response => {
        console.log("✅ Dados do usuário ao carregar a página:", response.data);
        setUser({ id: response.data.id, name: response.data.nome }); // Adicionando o ID ao estado
    })
    .catch(error => {
        console.error("❌ Erro ao buscar informações do usuário:", error);
        setUser(null);
    });
};

useEffect(() => {
  console.log("🔍 Estado do user no AuthContext:", user);
}, [user]);

  // Chamar a função quando a aplicação iniciar
  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
        fetchUserInfo(token);
    }
  }, []);

  // Função de login
  const login = (token) => {
    Cookies.set("auth_token", token, { expires: 7 });

    axios.get("http://localhost:5201/api/Auth/user-info", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true // 🔥 Garante que cookies são enviados corretamente
    })
    .then(response => {
        console.log("✅ Dados do usuário recebidos:", response.data);
        
        // Armazena o ID do usuário no estado global
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
      {children}
    </AuthContext.Provider>
  );
};
