import axios from "axios";

export function getMemPool(limit = 10) {
    return axios.get(`http://139.162.32.245:8081/api/mempool?limit${limit}`);
}

export function getLatestBlocks() {
    return axios.get('http://139.162.32.245:8081/api/transactions');
}

export function searchBlockchain(searchString) {
    return axios.get(`http://139.162.32.245:8081/api/search/${searchString}`);
}

export function pageToBlock(block = 0) {
    return axios.get(`http://139.162.32.245:8081/api/transactions?page=${block}&limit=25`)
}


export function all(requests) {
    return axios.all(requests)
}


