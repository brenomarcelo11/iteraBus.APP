import { HTTPClient } from "./client";

const PontoDeOnibusApi = {
    async obterPontoPorIdAsync(pontoId) {
        try {
            const response = await HTTPClient.get(`/PontoDeOnibus/Obter/${pontoId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao obter ponto de ônibus", error);
            throw error;
        }
    },

    async listarPontosAsync() {
        try {
            const response = await HTTPClient.get(`PontoDeOnibus/Listar`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao listar pontos de ônibus", error);
            throw error;
        }
    },

    async adicionarPontoAsync(latitude, longitude, nome, rotaId) {
        try {
            const PontoDeOnibusCriar = {
                Latitude: latitude,
                Longitude: longitude,
                Nome: nome,
                RotaId: rotaId
            };
            const response = await HTTPClient.post(`/PontoDeOnibus/Adicionar`, PontoDeOnibusCriar);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao criar ponto de ônibus", error);
            throw error;
        }
    },

    async editarPontoAsync(pontoId, latitude, longitude, nome) {
        try {
            const PontoDeOnibusEditar = {
                Id: pontoId,
                Latitude: latitude,
                Longitude: longitude,
                Nome: nome
            };
            const response = await HTTPClient.put(`/PontoDeOnibus/Editar`, PontoDeOnibusEditar);

            return response.data;
        }
        catch (error) {
            console.error("Erro ao editar ponto de ônibus", error);
            throw error;
        }
    },

    async excluirPontoAsync(pontoId) {
        try {
            const response = await HTTPClient.delete(`/PontoDeOnibus/Deletar/${pontoId}`);
            return response.data;
        }
        catch(error) {
            console.error("Erro ao deletar ponto de ônibus", error);
            throw error;
        }
    }
}

export default PontoDeOnibusApi;