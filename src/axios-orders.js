import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://max-hamburger-f1b32.firebaseio.com/'
});

export default instance