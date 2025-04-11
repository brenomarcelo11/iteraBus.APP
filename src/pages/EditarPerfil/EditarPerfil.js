import style from './EditarPerfil.module.css'
import { Topbar } from '../../components/Topbar/Topbar'
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import UsuarioApi from '../../services/usuarioAPI';
import Alert from 'react-bootstrap/Alert';
import { MdCancel, MdOutlineSave } from 'react-icons/md';
import { AuthContext } from '../../hooks/AuthContext';

const EditarPerfil = () => {
    const navigate = useNavigate();
    // const { user, setUser, isLoading } = useContext(AuthContext);
    const {setUser} = React.useContext(AuthContext)
    const location = useLocation();
    const state = location.state; // Aqui você acessa o state passado
    const id = state?.id;

    // const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(true);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                await UsuarioApi.atualizarAsync(id, nome, email); // apenas faz a atualização

                // busca os dados atualizados
                const usuarioAtualizado = await UsuarioApi.obterAsync(id);

                console.log("Usuário atualizado com dados completos:", usuarioAtualizado);

                setUser({
                    id: usuarioAtualizado.id,
                    name: usuarioAtualizado.nome,
                    email: usuarioAtualizado.email,
                });

                setAlertVariant('success');
                setAlertMessage('Usuário atualizado com sucesso!');
                setShowAlert(true);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } catch (error) {
                console.error("Erro ao atualizar usuário", error);
                setAlertVariant('danger');
                setAlertMessage('Erro ao atualizar usuário. Tente novamente.');
                setShowAlert(true);
            }
        } else {
            setAlertVariant('danger');
            setAlertMessage('Por favor, preencha todos os campos corretamente.');
            setShowAlert(true);
        }

        
    };


    const handleCancelar = () => {
        navigate('/');
    }

    useEffect(() => {
        const carregarDadosUsuario = async () => {
                // setId(user.id);
                // // Se os dados no context já estão completos
                // if (user.nome && user.email) {
                //     setNome(user.nome);
                //     setEmail(user.email);
                // } else {
                    // Senão, busca na API os dados completos
                    try {
                        const usuarioCompleto = await UsuarioApi.obterAsync(id);
                        setNome(usuarioCompleto.nome || '');
                        setEmail(usuarioCompleto.email || '');
                    } catch (error) {
                        console.error('Erro ao buscar dados completos do usuário:', error);
                    }
                setLoading(false); // marca como carregado
        };
        carregarDadosUsuario();
    }, []);


    const isFormValid = () => {
        return id && nome && email;
    };

    return (
        <>
            <Topbar />
            <div className={style.pagina_conteudo}>
                <h3>Editar Usuário</h3>
                {!loading ? (
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
                ) : (
                    <p>Carregando dados do usuário...</p>
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
    );
};

export default EditarPerfil;