import axios from 'axios';


const urlApi = "https://futurocodebackend-ureotn5zxq-uc.a.run.app/empresa"

class  EmpresaService {

   

    listar() {
        return axios.get(`${urlApi}`)
    }

    obter(id) {
        return axios.get(`${urlApi}/${id}`)

    }

    gravar(empresa) {
    
        if (empresa.id) {
          return axios.put(`${urlApi}/${empresa.id}`, empresa)
        } else {
          return axios.post(`${urlApi}/`, empresa)
        }
    }

    apagar(id) {
        return axios.delete(`${urlApi}/${id}`)
    }

}

export default new EmpresaService();