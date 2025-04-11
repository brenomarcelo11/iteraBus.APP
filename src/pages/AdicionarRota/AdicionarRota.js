import { useState } from 'react';
import { Topbar } from '../../components/Topbar/Topbar';
import style from './AdicionarRota.module.css'
import RotaApi from '../../services/rotaAPI';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { MdCancel, MdOutlineSave } from 'react-icons/md';

const AdicionarRota = () => {
    const [nome, setNome] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                await RotaApi.adicionarRotaAsync(nome);
                setAlertVariant('success');
                setAlertMessage('Rota criada com sucesso!');
                setShowAlert(true);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } catch (error) {
                console.error("Erro ao criar rota", error);
                setAlertVariant('danger');
                setAlertMessage('Erro ao criar rota. Tente novamente.');
                setShowAlert(true);
            }
        } else {
            setAlertVariant('danger');
            setAlertMessage('Por favor, preencha todos os campos corretamente.');
            setShowAlert(true);
        }
    };

    const handleCancelar = () => {
        navigate('/')
    }

    const isFormValid = () => {
        return nome;
    };
    return (
        <>
            <Topbar />
            <div className={style.pagina_conteudo}>
                <h3>Nova Rota</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='formNome' className='mb-3'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Digite o nome da rota'
                            name='nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className={style.botoes_container}>
                        <button className={style.botao_salvar} type='submit' disabled={!isFormValid()}>
                            <MdOutlineSave /> Salvar
                        </button>
                        <button className={style.botao_cancelar} type='button' onClick={handleCancelar}>
                            <MdCancel /> Cancelar
                        </button>
                    </div>
                </Form>
                {showAlert && (
                    <div className={style.alertContainer}>
                        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                            {alertMessage}
                        </Alert>
                    </div>
                )}
            </div>
        </>
    )
}


export default AdicionarRota;