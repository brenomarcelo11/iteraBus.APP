import { Topbar } from '../../components/Topbar/Topbar';
import style from './AdicionarPonto.module.css'
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { MdCancel, MdOutlineSave } from 'react-icons/md';
import PontoDeOnibusApi from '../../services/PontoDeOnibusAPI';
import RotaApi from '../../services/rotaAPI';

const AdicionarPonto = () => {
    const [nome, setNome] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [rota, setRota] = useState('');
    const [rotas, setRotas] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRotas = async () => {
            try {
                const rotas = await RotaApi.listarRotaAsync();
                setRotas(rotas);
            } catch (error) {
                console.error("Erro ao buscar rotas", error)
            }
        };

        fetchRotas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                await PontoDeOnibusApi.adicionarPontoAsync(latitude, longitude, nome, rota)
                setAlertVariant('success');
                setAlertMessage('Ponto de ônibus criado com sucesso!');
                setShowAlert(true);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } catch (error) {
                console.error("Erro ao criar ponto de ônibus", error);
                setAlertVariant('danger');
                setAlertMessage('Erro ao criar ponto de ônibus. Tente novamente.');
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
        return latitude && longitude && nome && rota;
    };
    return (
        <>
            <Topbar />
            <div className={style.pagina_conteudo}>
                <h3>Novo Ponto De Ônibus</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='formNome' className='mb-3'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Digite o nome do ponto de ônibus'
                            name='nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='formLatitude' className='mb-3'>
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Digite a latitude do ponto de ônibus'
                            name='latitude'
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='formLongitude' className='mb-3'>
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Digite a longitude do ponto de ônibus'
                            name='longitude'
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='formRota' className='mb-3'>
                            <Form.Label>Rota</Form.Label>
                            <Form.Control
                                as='select'
                                name='rota'
                                value={rota}
                                onChange={(e) => setRota(e.target.value)}
                                required
                            >
                                <option value="">--Selecione a rota--</option>
                                {rotas.map((rota) => (
                                    <option value={rota.id}>{rota.nome}</option>
                                ))}
                            </Form.Control>
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

export default AdicionarPonto;