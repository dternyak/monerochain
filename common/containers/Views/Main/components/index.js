import React, {Component} from "react";
import {all, getLatestBlocks, getMemPool} from "api/api";
import LatestBlocksComponent from "./LatestBlocksComponent";
import MemPoolComponent from "./MemPoolComponent";
import {formatBytes} from "utils/tableHelpers";
import axios from "axios";
import ActivityIndicator from 'react-activity-indicator'



export default class MainComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mempool: null,
            memPoolExists: false,
            loading: true
        }
    }

    componentDidMount() {
        all([getLatestBlocks(), getMemPool()])
            .then(axios.spread((blocks, mempool) => {
                let nextState = this.state;
                nextState['latestBlocks'] = blocks.data.data.blocks
                nextState['mempool'] = mempool.data.data
                nextState['memPoolExists'] = true
                nextState['loading'] = false
                this.setState(nextState)
            }));
    }


    render() {
        return (
            <div>
                <div className="column" style={{fontSize: '0.9em'}}>
                    {this.state.loading ? <div className="has-text-centered">
                        <div className="column container" style={{height: '500px'}}>
                            <ActivityIndicator
                                number={5}
                                diameter={70}
                                duration={150}
                                activeColor="orange"
                                borderColor="white"
                                borderWidth={10}
                                borderRadius="80%"
                            />
                            {/*<Loading type='bars' color='#black' style={{fontSize: '5em', height: '200px'}}/>*/}
                        </div>
                    </div> : <div>
                        <MemPoolComponent mempool={this.state.mempool}/>
                        <LatestBlocksComponent latestBlocks={this.state.latestBlocks}/>
                    </div>}
                </div>
            </div>
        )
    }
}
