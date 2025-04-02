import style from './EditarPerfil.module.css'
import { Topbar } from '../../components/Topbar/Topbar'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UsuarioApi from '../../services/usuarioAPI';
import Alert from 'react-bootstrap/Alert';
import { MdCancel, MdOutlineSave } from 'react-icons/md';
import { AuthContext } from '../../hooks/AuthContext';

const EditarPerfil = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // const id = user?.id;

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showAlert, setShowAlert] = useState(false); // Estado para controlar o alerta
    const [alertVariant, setAlertVariant] = useState('success'); // Estado para o tipo de alerta
    const [alertMessage, setAlertMessage] = useState(''); // Estado para a mensagem do alerta


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                // Atualiza o usuário
                await UsuarioApi.atualizarAsync(id, nome, email);
                setAlertVariant('success'); // Alerta de sucesso
                setAlertMessage('Usuário atualizado com sucesso!');
                setShowAlert(true); // Exibe o alerta
                setTimeout(() => {
                    navigate('/usuarios'); // Redireciona após 3 segundos
                }, 1000);
            } catch (error) {
                console.error("Erro ao atualizar usuário", error);
                setAlertVariant('danger'); // Alerta de erro
                setAlertMessage('Erro ao atualizar usuário. Tente novamente.');
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
        if (user?.id) {
            setId(user.id);
        } else {
            console.warn("ID do usuário ainda não disponível no contexto.");
        }
    }, [user]);

    useEffect(() => {
        if (!id) return;

        console.log("🔍 Buscando dados do usuário com ID:", id);

        const buscarDadosUsuario = async () => {
            try {
                const usuario = await UsuarioApi.obterAsync(id);
                setNome(usuario.nome || '');
                setEmail(usuario.email || '');
            } catch (error) {
                console.error('❌ Erro ao buscar dados do usuário:', error);
            }
        };

        buscarDadosUsuario();
    }, [id]);

    const isFormValid = () => {
        return nome && email;
    };

    return (
        <>
            <Topbar />
            <div className={style.pagina_conteudo}>
                <h3>Editar Usuário</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='formNome' className='mb-3'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Digite seu nome'
                            name='nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='formEmail' className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Digite seu email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                {/* Alerta personalizado */}
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

export default EditarPerfil;