import axios from 'axios'

const AFILMES = 'afilmes'
const FILME_API_URL = 'http://localhost:8080'
const AFILMES_API_URL = `${FILME_API_URL}/afilmes/${AFILMES}`

class FilmeDataService {

    retrieveAllFilmes(name) {
        //console.log('executed service')
        return axios.get(`${AFILMES_API_URL}/filmes`);
    }

    retrieveFilme(name, id) {
        //console.log('executed service')
        return axios.get(`${AFILMES_API_URL}/filmes/${id}`);
    }

    deleteFilme(name, id) {
        //console.log('executed service')
        return axios.delete(`${AFILMES_API_URL}/filmes/${id}`);
    }

    updateFilme(name, id, filme) {
        //console.log('executed service')
        return axios.put(`${AFILMES_API_URL}/filmes/${id}`, filme);
    }

    createFilme(name, filme) {
        //console.log('executed service')
        return axios.post(`${AFILMES_API_URL}/filmes/`, filme);
    }
}

export default new FilmeDataService()