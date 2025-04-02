import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import Logo from "../../assets/1.svg";
import { AuthContext } from "../../hooks/AuthContext"; // Importando o contexto de autenticação

const Login = () => {
    const navigate = useNavigate(); 
    const { setUser } = useContext(AuthContext); // Pegando a função para atualizar o usuário

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5201/api/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("✅ Login bem-sucedido:", data.message);

                // 🔥 Faz a requisição para obter as informações do usuário
                const userResponse = await fetch("http://localhost:5201/api/Auth/user-info", {
                    method: "GET",
                    credentials: "include", // Importante para enviar o token/cookie
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    console.log("✅ Dados do usuário:", userData);

                    // 🔥 Atualiza o contexto com os dados do usuário
                    setUser({ name: userData.nome });

                    // 🔥 Decide para onde redirecionar o usuário
                    const roleResponse = await fetch("http://localhost:5201/api/Auth/user-role", {
                        method: "GET",
                        credentials: "include",
                    });

                    if (roleResponse.ok) {
                        const roleData = await roleResponse.json();
                        const role = roleData.role;

                        if (role === "Usuario") {
                            navigate("/");
                        } else if (role === "Administrador") {
                            navigate("/Home");
                        } else {
                            setError("Categoria de usuário desconhecida.");
                        }
                    } else {
                        setError("Erro ao obter a role do usuário.");
                    }
                } else {
                    setError("Erro ao obter informações do usuário.");
                }
            } else {
                setError("Email ou senha inválidos.");
            }
        } catch (err) {
            setError("Erro no login. Tente novamente.");
            console.error(err);
        }
    };

    return (
        <div className={style.container}>
            <img src={Logo} alt="Logo iteraBus" className={style.logo} />
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                {erro && <p className={style.erro}>{erro}</p>}
                <button type="submit">Entrar</button>
            </form>

            <p className={style.texto}>
                Não tem cadastro?{" "}
                <Link to="/cadastro" className={style.link}>clique aqui</Link>
            </p>
        </div>
    );
};

export default Login;
