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
      withCredentials: true,
    })
      .then(response => {
        console.log("Dados do usuário ao carregar a página:", response.data.id);
        setUser({ id: response.data.id, name: response.data.nome, email: response.data.email });
      })
      .catch(error => {
        console.error("Erro ao buscar informações do usuário:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Debug do estado
  useEffect(() => {
    console.log("Estado do user no AuthContext:", user);
  }, [user]);

  // Função de login
  const login = (token) => {
    setIsLoading(true);
    Cookies.set("auth_token", token, { expires: 7 });

    axios.get("http://localhost:5201/api/Auth/user-info", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    })
      .then(response => {
        console.log("Dados do usuário recebidos:", response.data);
        setUser({
          id: response.data.id,
          name: response.data.nome,
          email: response.data.email
        });
      })
      .catch(error => {
        console.error("Erro ao buscar informações do usuário:", error);
      })
    .finally(() => {
  setIsLoading(false);
});
  };

// Função de logout
const logout = async () => {
  try {
    await axios.post("http://localhost:5201/api/Auth/logout", {}, {
      withCredentials: true, // Necessário para enviar o cookie HttpOnly
    });
    setUser(null);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

return (
  <AuthContext.Provider value={{ user, setUser, login, logout, isLoading, fetchUserInfo }}>
    {isLoading ? <div>Carregando...</div> : children}
  </AuthContext.Provider>
);
};
