import React, {Component} from "react";
import Box from "grommet/components/Box";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import GHeader from "grommet/components/Header";
import Title from "grommet/components/Title";
import Search from "grommet/components/Search";
import {getNetworkInfo, getNode, getNodeOptions, searchBlockchain} from "api/api";
import FormFields from "grommet/components/FormFields";
import store from "store2";
import {Link} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import "./toastifyExtensions.css";
import "react-toastify/dist/ReactToastify.min.css";


function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}


const Greet = ({text}) => <div>{text}</div>

function handleBadSearch(text = "No results found :(") {
    toast(<Greet name="Search" text={text}/>, {
        type: toast.TYPE.ERROR
    });
}


function makeThenSetSelectedNodeAndNodeOptions() {
    const defaultNodeOption = "http://explorer.xmr.my"
    store.set('nodeSettings', {
        nodeOptions: [defaultNodeOption],
        selectedNode: defaultNodeOption
    })
    return defaultNodeOption
}


export default class Header extends Component {
    constructor(props) {
        super(props)
        let nodeSettings = store.get('nodeSettings')
        let nodeOptions
        let selectedNode
        if (!nodeSettings) {
            selectedNode = makeThenSetSelectedNodeAndNodeOptions()
            nodeOptions = [selectedNode];
        } else {
            nodeOptions = getNodeOptions()
            selectedNode = getNode()
        }

        this.state = {
            searchInput: '',
            newNodeInput: '',
            nodeOptions: nodeOptions,
            selectedNode: selectedNode,
            nodeSaveDisabled: true
        }
    }

    searchInputChange(e) {
        let nextState = this.state;
        nextState.searchInput = e.target.value
        this.setState(nextState)
    }

    newNodeInputChange(e) {
        let nextState = this.state;
        nextState.newNodeInput = e.target.value
        nextState.nodeSaveDisabled = !validateURL(nextState.newNodeInput)
        this.setState(nextState)
    }

    newNodeSave() {
        let nextState = this.state

        let betterNodeInput = document.createElement('a');
        betterNodeInput.href = nextState.newNodeInput

        if (!nextState.nodeOptions.includes(betterNodeInput.origin)) {
            nextState.nodeSaveDisabled = true
            this.setState(nextState)
            getNetworkInfo(betterNodeInput.origin)
                .then(() => {
                    let nextStoreNodeSettings = store.get('nodeSettings')
                    nextStoreNodeSettings.nodeOptions.push(betterNodeInput.origin)
                    store.set('nodeSettings', nextStoreNodeSettings)
                    nextState.nodeOptions.push(betterNodeInput.origin)
                    nextState.newNodeInput = ''
                    nextState.nodeSaveDisabled = true
                    this.setState(nextState)
                })
                .catch((err) => {
                    nextState.nodeSaveDisabled = false
                    this.setState(nextState)
                    handleBadSearch(String(err))
                })
        } else {
            handleBadSearch(betterNodeInput.origin + " is already an option")
        }
    }

    onKeyPress(e) {
        if (e.key === "Enter") {
            if (this.state.searchInput !== '') {
                searchBlockchain(this.state.searchInput).then((data) => {
                    if (data.data.status === "fail") {
                        let nextState = this.state
                        nextState.searchInput = ''
                        this.setState(nextState)
                        handleBadSearch()
                    } else if (data.data.status === "success") {
                        let title = data.data.data.title
                        let nextState = this.state
                        if (title === "transaction") {
                            location.assign(`/tx/${this.state.searchInput}`);
                            nextState.searchInput = ''
                            this.setState(nextState)
                        } else if (title === "block") {
                            location.assign(`/block/${this.state.searchInput}`);
                            nextState.searchInput = ''
                            this.setState(nextState)
                        } else {
                            handleBadSearch("Something went wrong, but we don't know what. Open a GitHub Issue")
                        }
                    }
                })
            }
        }
    }

    handleNodeSelect(e) {
        let nextState = this.state
        nextState.selectedNode = e
        let nextStoreNodeSettings = store.get('nodeSettings')
        nextStoreNodeSettings.selectedNode = e;
        store.set('nodeSettings', nextStoreNodeSettings)
        location.reload()
    }

    render() {
        return (
            <div>
                <GHeader style={{
                    backgroundColor: 'orange',
                    paddingLeft: '2.3em',
                    paddingRight: '2.3em',
                }} fixed={false}>
                    <Link to="/" style={{color: 'black', textDecoration: 'none'}}>
                        <Title style="">
                            MoneroChain<div style={{color: 'white'}}>beta</div>
                        </Title>
                    </Link>
                    <Box flex={true}
                         justify='end'
                         direction='row'
                         responsive={false}>
                        <Search
                            className="is-hidden-mobile moneroBorderColor"
                            inline={true}
                            iconAlign={'start'}
                            fill={true}
                            value={this.state.searchInput}
                            onDOMChange={(e) => this.searchInputChange(e)}
                            onKeyPress={(e) => this.onKeyPress(e)}
                            size='medium'
                            placeHolder='Search by block height, tx hash, or block hash'
                            dropAlign={{"right": "right"}}/>
                        <Menu responsive={true} label='Nodes' closeOnClick={false}>
                            {
                                this.state.nodeOptions.map((e, i) => {
                                    return (
                                        <Anchor key={i} onClick={() => this.handleNodeSelect(e)}>
                                            {e}
                                        </Anchor>
                                    )
                                })
                            }
                            <Anchor>
                                <FormFields className="form">
                                    <input
                                        value={this.state.newNodeInput}
                                        onChange={(e) => this.newNodeInputChange(e)}
                                    />

                                    <button
                                        className={this.state.nodeSaveDisabled ? "button is-small disabled" : "button is-small"}
                                        onClick={(e) => this.newNodeSave()} disabled={this.state.nodeSaveDisabled}>
                                        Save
                                    </button>
                                </FormFields>
                            </Anchor>
                        </Menu>
                    </Box>
                </GHeader>
                <ToastContainer autoClose={3000} position="bottom-right" closeButton={null}/>
            </div>
        )
    }
}
