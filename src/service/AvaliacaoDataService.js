import axios from 'axios'

const AFILMES = 'afilmes'
const FILME_API_URL = 'http://localhost:8080'
const AFILMES_API_URL = `${FILME_API_URL}/afilmes/${AFILMES}`

class AvaliacaoDataService {

    retrieveAllAvaliacoes(name) {
        //console.log('executed service')
        return axios.get(`${AFILMES_API_URL}/avaliacoes`);
    }

    retrieveAvaliacao(name, id) {
        //console.log('executed service')
        return axios.get(`${AFILMES_API_URL}/avaliacoes/${id}`);
    }

    deleteAvaliacao(name, id) {
        //console.log('executed service')
        return axios.delete(`${AFILMES_API_URL}/avaliacoes/${id}`);
    }

    updateAvaliacao(name, id, avaliacao) {
        //console.log('executed service')
        return axios.put(`${AFILMES_API_URL}/avaliacoes/${id}`, avaliacao);
    }

    createAvaliacao(name, avaliacao) {
        //console.log('executed service')
        return axios.post(`${AFILMES_API_URL}/avaliacoes/`, avaliacao);
    }
}

export default new AvaliacaoDataService()