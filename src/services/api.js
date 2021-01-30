import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backalmoxarifado.herokuapp.com'
});

export default api;