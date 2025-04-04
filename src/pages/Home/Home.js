import MapBox from '../../components/Mapa/Mapbox'
import { Topbar } from '../../components/Topbar/Topbar'
import style from './Home.module.css'

export function Home() {
    return (
        <>
            <Topbar />
            <div className={style.pagina_conteudo}>
                <div className={style.texto_inicial}>
                    <h1>Bem vindo! Saiba aqui onde está seu ônibus</h1>
                </div>
                <div className={style.mapa}>
                    <MapBox />
                </div>
            </div>
        </>
    )

}