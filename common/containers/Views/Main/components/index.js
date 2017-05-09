import React, {Component} from "react";
import {all, getLatestBlocks, getMemPool} from "api/api";
import MemPoolComponent from "./MemPoolComponent";
import LatestBlocksComponent from "./LatestBlocksComponent";
import ActivityIndicator from "react-activity-indicator";


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
        getMemPool()
            .then((data) => {
                    let nextState = this.state;
                    nextState['mempool'] = data.data.data
                    nextState['memPoolExists'] = true
                    nextState['loading'] = false
                    this.setState(nextState)
                }
            );
    }


    render() {
        return (
            <div>
                <div className="column" style={{fontSize: '0.9em'}}>
                    {
                        this.state.loading ? <div className="has-text-centered">
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
                            </div>
                        </div> : <div>
                            <MemPoolComponent mempool={this.state.mempool}/>
                            <LatestBlocksComponent/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
