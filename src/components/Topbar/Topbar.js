import style from "./Topbar.module.css"
import Logo from '../../assets/4.svg'
import Button from 'react-bootstrap/Button';

export function Topbar() {
    return (
        <div className={style.topbar_conteudo}>
            <img
                src={Logo}
                alt="Logo-iteraBus"
                className={style.logo}
            />
            <div className={style.topbar_botoes}>
                <button className={style.botao_login}>Login</button>
                <button className={style.botao_cadastrar}>Cadastre-se</button>
            </div>
        </div>

    )
}