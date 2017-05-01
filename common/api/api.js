import axios from 'axios';

export function getMemPool() {
  return axios.get('http://139.162.32.245:8081/api/mempool');
}

export function getLatestBlocks() {
  return axios.get('http://139.162.32.245:8081/api/transactions');
}

export function searchBlockchain(searchString) {
  return axios.get(`http://139.162.32.245:8081/api/search/${searchString}`);
}

export function all(requests) {
  return axios.all(requests)
}


