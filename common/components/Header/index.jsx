import React, {Component} from "react";
import Box from "grommet/components/Box";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import GHeader from "grommet/components/Header";
import Title from "grommet/components/Title";
import Search from "grommet/components/Search";
import {searchBlockchain} from "api/api";


import {browserHistory, Link} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import "./toastifyExtensions.css";
import "react-toastify/dist/ReactToastify.min.css";


const Greet = ({name}) => <div>No results found :(</div>

function handleBadSearch() {
    toast(<Greet name="Search"/>, {
        type: toast.TYPE.ERROR
    });
}


export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: ''
        }
    }

    searchInputChange(e) {
        console.log(e.target.value)
        let nextState = this.state;
        nextState["searchInput"] = e.target.value
        this.setState(nextState)
    }

    onKeyPress(e) {
        if (e.key === "Enter") {
            console.log("Entered Clicked!")
            if (this.state.searchInput !== '') {
                console.log(this.state.searchInput)
                console.log("Going to search!")
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
                            console.log("not sure")
                            console.log(title)
                        }

                    }
                })
            }
        }

    }

    render() {
        return (
            <div>
                <GHeader style={{
                    backgroundColor: 'orange',
                    // left: 0,
                    // top: 0,
                    // right: 0,
                    // marginTop: '0px',
                    paddingLeft: '2.3em',
                    paddingRight: '2.3em',
                }} fixed={false}>

                    <Link to="/" style={{color: 'black', textDecoration: 'none'}}>
                        <Title style="">
                            MoneroChain (BETA)
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
                        {/*<Menu responsive={true} label='Nodes'>*/}
                            {/*<Anchor href='#'*/}
                                    {/*className='active'>*/}
                                {/*First action*/}
                            {/*</Anchor>*/}
                            {/*<Anchor href='#'>*/}
                                {/*Second action*/}
                            {/*</Anchor>*/}
                            {/*<Anchor href='#'>*/}
                                {/*Third action*/}
                            {/*</Anchor>*/}
                        {/*</Menu>*/}
                    </Box>
                </GHeader>
                <ToastContainer autoClose={3000} position="bottom-right" closeButton={null}/>
            </div>
        )
    }
}
