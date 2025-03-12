import { Topbar } from '../../components/Topbar/Topbar'
import style from './Home.module.css'

export function Home() {
    return (
        <>
            <Topbar />
            <div className={style.pagina_conteudo}>
                <div className={style.texto_inicial}>
                    <h1>
                        <span className={style.spanBemVindo}>Bem-vindo!</span>
                        <br />
                        <span className={style.spanOnde}>Saiba aqui onde está</span>
                        <br />
                        <span className={style.spanLocal}>seu ônibus</span>
                    </h1>
                </div>
            </div>
        </>
    )

}