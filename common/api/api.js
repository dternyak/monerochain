import axios from "axios";
import store from "store2";


export function getNodeOptions() {
    const nodeSettings = store.get('nodeSettings')
    if (!nodeSettings) {
        return null
    } else {
        const nodeOptions = nodeSettings.nodeOptions
        if (!nodeOptions) {
            return null
        } else {
            return nodeOptions
        }
    }
}

export function getNode() {
    const nodeSettings = store.get('nodeSettings')
    if (!nodeSettings) {
        return null
    } else {
        const selectedNode = nodeSettings.selectedNode
        if (!selectedNode) {
            return null
        } else {
            return selectedNode
        }
    }
}

export function getNetworkInfo(origin) {
    return axios.get(`${origin || getNode()}/api/networkinfo`);
}

export function getMemPool(limit = 10) {
    return axios.get(`${getNode()}/api/mempool?limit=${limit}`);
}

export function getLatestBlocks() {
    return axios.get(`${getNode()}/api/transactions`);
}

export function searchBlockchain(searchString) {
    return axios.get(`${getNode()}/api/search/${searchString}`);
}

export function pageToBlock(block = 0) {
    return axios.get(`${getNode()}/api/transactions?page=${block}&limit=25`)
}

export function all(requests) {
    return axios.all(requests)
}
