import axios from 'axios';


const urlApi = "https://futurocodebackend-ureotn5zxq-uc.a.run.app/empresa"

class  AprendizService {

   

    listar() {
        return axios.get(`${urlApi}`)
    }

    obter(id) {
        return axios.get(`${urlApi}/${id}`)

    }

    gravar(aprendiz) {
    
        if (aprendiz.id) {
          return axios.put(`${urlApi}/${aprendiz.id}`, aprendiz)
        } else {
          return axios.post(`${urlApi}/`, aprendiz)
        }
    }

    apagar(id) {
        return axios.delete(`${urlApi}/${id}`)
    }

}

export default new AprendizService();