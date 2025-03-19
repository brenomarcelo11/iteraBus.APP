import { HTTPClient } from "./client";

const OnibusApi = {
    async obterRotaPorIdAsync(rotaId) {
        try {
            const response = await HTTPClient.get(`/Rota/Obter/${rotaId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao obter rota", error);
            throw error;
        }
    },

    async listarRotaAsync() {
        try {
            const response = await HTTPClient.get(`Rota/Listar`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao listar rotas", error);
            throw error;
        }
    },

    async adicionarRotaAsync(nome) {
        try {
            const RotaCriar = {
                Nome: nome
            };
            const response = await HTTPClient.post(`/Rota/Adicionar`, RotaCriar);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao criar rota", error);
            throw error;
        }
    },

    async editarRotaAsync(rotaId, nome) {
        try {
            const RotaEditar = {
                Id: rotaId,
                Nome: nome
            };
            const response = await HTTPClient.put(`/Rota/Editar`, RotaEditar);

            return response.data;
        }
        catch (error) {
            console.error("Erro ao editar rota", error);
            throw error;
        }
    },

    async excluirRotaAsync(rotaId) {
        try {
            const response = await HTTPClient.delete(`/Rota/Deletar/${rotaId}`);
            return response.data;
        }
        catch(error) {
            console.error("Erro ao deletar rota", error);
            throw error;
        }
    }
}

export default RotaApi;