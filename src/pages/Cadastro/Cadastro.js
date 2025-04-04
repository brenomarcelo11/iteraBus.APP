import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Cadastro.module.css";
import UsuarioApi from "../../services/usuarioAPI";
import Logo from "../../assets/1.svg"

export function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    async function handleCadastro(event) {
        event.preventDefault(); // Evita o reload da página
        setErro("");
    
        try {
            const resposta = await UsuarioApi.criarAsync(nome, email, senha);
    
            if (typeof resposta === "number" && resposta > 0) {
                alert("Cadastro realizado com sucesso!");
                navigate("/login");
            } else {
                setErro("Erro ao realizar cadastro.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setErro("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div className={style.container}>
            <img src={Logo} alt="Logo iteraBus" className={style.logo} />
            <form onSubmit={handleCadastro}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
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
                <button type="submit">Cadastre-se</button>
            </form>

            <p className={style.texto}>
                Já tem cadastro?{" "}
                <Link to="/login" className={style.link}>clique aqui</Link>
            </p>
        </div>
    );
}
