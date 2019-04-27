import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://www.swisscom.ch/map-api/onlinenslg/lineinfo/',
  headers: {
    'Accept-Language': 'en-US,en;q=0.9,ta;q=0.8',
    'Access-Control-Allow-Origin':'http://localhost:3000',
    'Access-Control-Allow-Credentials':'true'
  }
});
