import { useNavigate, useParams } from 'react-router-dom';
import style from './EditarRota.module.css'
import { useContext, useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { MdCancel, MdOutlineSave } from 'react-icons/md';
import Form from "react-bootstrap/Form";
import { Topbar } from '../../components/Topbar/Topbar';
import RotaApi from '../../services/rotaAPI';
import { AuthContext } from '../../hooks/AuthContext';

const EditarRota = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                await RotaApi.editarRotaAsync(id, nome);
                setAlertVariant('success'); // Alerta de sucesso
                setAlertMessage('Rota atualizada com sucesso!');
                setShowAlert(true); // Exibe o alerta
                setTimeout(() => {
                    navigate('/'); // Redireciona após 3 segundos
                }, 1000);
            } catch (error) {
                console.error("Erro ao atualizar rota", error);
                setAlertVariant('danger'); // Alerta de erro
                setAlertMessage('Erro ao atualizar rota. Tente novamente.');
                setShowAlert(true); // Exibe o alerta
            }
        } else {
            setAlertVariant('danger'); // Alerta de erro
            setAlertMessage('Por favor, preencha todos os campos corretamente.');
            setShowAlert(true); // Exibe o alerta
        }
    };

    const handleCancelar = () => {
        navigate('/');
    }


    useEffect(() => {
        if (!id) return;
    
        const buscarDadosRota = async () => {
            try {
                const rota = await RotaApi.obterRotaPorIdAsync(id);
                setNome(rota.nome || '');
            } catch (error) {
                console.error('Erro ao buscar dados da rota:', error);
            }
        };
    
        buscarDadosRota();
    }, [id]);

    const isFormValid = () => {
        return nome;
    };

    return (
        <>
            <Topbar />
            <div className={style.pagina_conteudo}>
                <h3>Editar Rota</h3>

                {!id ? (
                    <p>Carregando dados do usuário...</p>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='formNome' className='mb-3'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Digite o novo nome da rota'
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
                )}

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

export default EditarRota;