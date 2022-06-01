import axios from "axios";
import { API } from "./Endpoints";

//intercepta las llamadas axios y se encarga de el manejo de los tokens
export const axiosInterceptors = ()=>{
    axios.interceptors.request.use(
        async request => {
            if(request.url === API.GET_TOKEN){ // previene bucles infinitos, para que no entre por aca cuando va a buscar el token
                return request;
            }
            if(!window.sessionStorage.getItem("token")){ 
                // no hay token cargado, pide uno
                const data = {
                    username: 'sarah',
                    password: 'connor',
                }
                let res = await axios.post(API.GET_TOKEN, data) 
                .then(res=>{
                    window.sessionStorage.setItem('token', res.data.token);
                })
                .catch(err =>{
                    console.log(err); 
                })
                //continua con la request
                request.headers['Authorization'] = 'Bearer '+ window.sessionStorage.getItem("token");
                return request;
            }
            request.headers['Authorization'] = 'Bearer '+ window.sessionStorage.getItem("token");
            return request;
        },
        error => {
            return Promise.reject(error);
        }
    ) 
 
      axios.interceptors.response.use(
        function (response) {
            return response;
        },
        async err => {
            const originalConfig = err.config;
            if(err.response.status === 401 && err.response.data.message === 'The token has expired'){
                //el token vencio, pedir un nuevo token
                const data = {
                    username: 'sarah',
                    password: 'connor',
                }
                await axios.post(API.GET_TOKEN, data)
                .then(res=>{
                    window.sessionStorage.setItem('token', res.data.token);
                    console.log("token cargado")
                })
                .catch(err =>{
                    console.log(err); 
                })
                //cargar el nuevo token
                originalConfig.headers['Authorization'] = 'Bearer '+ window.sessionStorage.getItem("token");
                //reintentar ajax
                return axios(originalConfig);
            }
            return Promise.reject(err);
        }
    )    
}