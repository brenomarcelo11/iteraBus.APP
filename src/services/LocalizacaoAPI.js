import { HTTPClient } from "./client";

const LocalizacaoApi = {
    async obterLocalizacaoPorIdAsync(localizacaoId) {
        try {
            const response = await HTTPClient.get(`/Localizacao/Obter/${localizacaoId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao obter ônibus", error);
            throw error;
        }
    },

    async listarLocalizacaoAsync() {
        try {
            const response = await HTTPClient.get(`Localizacao/Listar`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao listar ônibus", error);
            throw error;
        }
    },

    async adicionarLocalizacaoAsync(latitude, longitude, onibusId) {
        try {
            const LocalizacaoCriar = {
                Latitude: latitude,
                Longitude: longitude,
                OnibusId: onibusId
            };
            const response = await HTTPClient.post(`/Localizacao/Adicionar`, LocalizacaoCriar);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao criar ônibus", error);
            throw error;
        }
    },

    async editarLocalizacaoAsync(localizacaoId, latitude, longitude, onibusId) {
        try {
            const LocalizacaoEditar = {
                Id: localizacaoId,
                Latitude: latitude,
                Longitude: longitude,
                OnibusId: onibusId
            };
            const response = await HTTPClient.put(`/Localizacao/Editar`, LocalizacaoEditar);

            return response.data;
        }
        catch (error) {
            console.error("Erro ao editar ônibus", error);
            throw error;
        }
    },

    async excluirLocalizacaoAsync(localizacaoId) {
        try {
            const response = await HTTPClient.delete(`/Localizacao/Deletar/${localizacaoId}`);
            return response.data;
        }
        catch(error) {
            console.error("Erro ao deletar ônibus", error);
            throw error;
        }
    }
}

export default LocalizacaoApi;