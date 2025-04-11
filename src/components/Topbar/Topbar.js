import { useContext, useEffect } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import style from "./Topbar.module.css";
import Logo from '../../assets/4.svg';
import { MdLogout } from "react-icons/md";

export function Topbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Usuário atualizado:", user); // Depuração para ver se o usuário está sendo atualizado
    }, [user]);

    return (
        <div className={style.topbar_conteudo}>
            <img src={Logo} alt="Logo-iteraBus" className={style.logo} />
            <div className={style.topbar_botoes}>
                {user ? (
                    <>
                        <div className={style.botoes_acoes}>
                            <button className={style.botao_acao} onClick={() => navigate('/adicionar-rota')}>
                                Nova Rota
                            </button>
                            <button className={style.botao_acao} onClick={() => navigate('/adicionar-ponto')}>
                                Novo Ponto
                            </button>
                        </div>

                        <div className={style.mensagem}>
                            <span>Olá, </span>
                            <Link
                                to="/editarperfil"
                                state={{ id: Number(user.id) }} // Passando o ID do usuário
                                className={style.nome_usuario}
                            >
                                {user.name}
                            </Link>
                        </div>

                        <Link
                            className={style.botao_deslogar}
                            onClick={() => { logout(); navigate('/login'); }}>
                            <MdLogout />
                        </Link>
                    </>
                ) : (
                    <>
                        <button className={style.botao_login} onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button className={style.botao_cadastrar} onClick={() => navigate('/cadastro')}>
                            Cadastrar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
