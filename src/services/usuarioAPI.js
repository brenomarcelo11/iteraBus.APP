import { HTTPClient } from "./client";

const UsuarioApi = {   
    
    async obterAsync(usuarioId) {
        try {
            const response = await HTTPClient.get(`/Usuario/Obter/${usuarioId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao obter usuário", error);
            throw error;
        }
    },
    
    async listarAsync(ativos) {
        try {
            const response = await HTTPClient.get(`/Usuario/Listar?ativos=${ativos}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao listar usuário", error);
            throw error;
        }
    },
    
    async criarAsync(nome, email, senha, tipoUsuarioId) {
        try {
            const usuarioCriar = {
                TipoUsuarioId: tipoUsuarioId,
                Nome: nome,
                Email: email,
                Senha: senha
            };
            const response = await HTTPClient.post(`/Usuario/Criar`, usuarioCriar);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao criar usuário", error);
            throw error;
        }
    },
    
    async atualizarAsync(id, nome, email, tipoUsuarioId) {
        try {
            const usuarioAtualizar = {                
                Id: id,
                Nome: nome,
                Email: email,
                TipoUsuarioId: tipoUsuarioId
            };
            const response = await HTTPClient.put(`/Usuario/Atualizar`, usuarioAtualizar);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao atualizar usuário", error);
            throw error;
        }
    },
    
    async deletarAsync(usuarioId) {
        try {
            const response = await HTTPClient.delete(`/Usuario/Deletar/${usuarioId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao deletar usuário", error);
            throw error;
        }
    },
   
    async listarTiposUsuarioAsync() {
        try {
            const response = await HTTPClient.get(`/Usuario/ListarTiposUsuario`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao listar tipos de usuário", error);
            throw error;
        }
    },
    
    async alterarSenhaAsync(id, senha, senhaAntiga) {
        try {
            const usuarioAlterarSenha = {
                Id: id,
                Senha: senha,
                SenhaAntiga: senhaAntiga
            };
            const response = await HTTPClient.put(`/Usuario/AlterarSenha`, usuarioAlterarSenha);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao alterar senha do usuário", error);
            throw error;
        }
    },

    async restaurarAsync(usuarioId) {
        try {
            const response = await HTTPClient.put(`/Usuario/Restaurar/${usuarioId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao restaurar usuário", error);
            throw error;
        }
    },

    async favoritarRotaAsync(usuarioId, rotaId) {
        try {
            const response = await HTTPClient.post(`/Usuario/${usuarioId}/favoritar-rota/${rotaId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao favoritar rota", error);
            throw error;
        }
    },

    async desfavoritarRotaAsync(usuarioId, rotaId) {
        try {
            const response = await HTTPClient.delete(`/Usuario/${usuarioId}/desfavoritar-rota/${rotaId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao desfavoritar rota", error);
            throw error;
        }
    }

}

export default UsuarioApi;