import axios from "axios";


let type = { "Content-type": "application/json" };

let productionUrl = 'http://localhost:3001/api/v1';


const fetchProductionUrl = axios.create({
  baseURL: productionUrl,
  headers: type,
});


fetchProductionUrl.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => {
    alert(error);

    return Promise.reject(error);
  }
); 

export {
 
  fetchProductionUrl,

};
