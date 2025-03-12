import style from "./Topbar.module.css"
import Logo from '../../assets/4.svg'

export function Topbar() {
    return (
        <div className={style.topbar_conteudo}>
                <img
                src={Logo}
                alt="Logo-iteraBus"
                className={style.logo}
                />
        </div>
    )
}