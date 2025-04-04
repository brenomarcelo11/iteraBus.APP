import style from './TopbarAdmin.module.css';
import Logo from '../../assets/4.svg';
import { useNavigate } from 'react-router-dom';

const TopbarAdmin = () => {
    const navigate = useNavigate(); 

    return (
        <div className={style.topbar_conteudo}>
            <img src={Logo} alt="Logo-iteraBus" className={style.logo} />
            <button className={style.botao_funcoes} onClick={() => navigate('/login')}>
                Funções Admin
            </button>
        </div>
    );
};

export default TopbarAdmin;
