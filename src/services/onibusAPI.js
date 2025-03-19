import { HTTPClient } from "./client";

const OnibusApi = {
    async obterOnibusPorIdAsync(onibusId) {
        try {
            const response = await HTTPClient.get(`/Onibus/Obter/${onibusId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao obter ônibus", error);
            throw error;
        }
    },

    async listarOnibusAsync() {
        try {
            const response = await HTTPClient.get(`Onibus/Listar`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao listar ônibus", error);
            throw error;
        }
    },

    async adicionarOnibusAsync(placa, rotaId) {
        try {
            const onibusCriar = {
                Placa: placa,
                RotaId: rotaId
            };
            const response = await HTTPClient.post(`/Onibus/Adicionar`, onibusCriar);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao criar ônibus", error);
            throw error;
        }
    },

    async editarOnibusAsync(onibusId, placa, rotaId) {
        try {
            const onibusEditar = {
                Id: onibusId,
                Placa: placa,
                RotaId: rotaId
            };
            const response = await HTTPClient.put(`/Onibus/Editar`, onibusEditar);

            return response.data;
        }
        catch (error) {
            console.error("Erro ao editar ônibus", error);
            throw error;
        }
    },

    async excluirOnibusAsync(onibusId) {
        try {
            const response = await HTTPClient.delete(`/Onibus/Deletar/${onibusId}`);
            return response.data;
        }
        catch(error) {
            console.error("Erro ao deletar ônibus", error);
            throw error;
        }
    }
}

export default OnibusApi;