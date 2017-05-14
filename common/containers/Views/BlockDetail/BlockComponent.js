import React, {Component} from "react";
import {searchBlockchain} from "api/api";
import BlockTransactionComponent from "./BlockTransactionComponent";
import ActivityIndicator from "react-activity-indicator";
import {formatBytes} from "utils/tableHelpers";

export default class BlockComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            block: null
        }
    }

    componentDidMount() {
        searchBlockchain(this.props.routeParams.height).then((data) => {
            let nextState = this.state;
            nextState.block = data.data.data
            nextState.loading = false
            this.setState(nextState)
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.block && <div className="column">
                        <div className="columns">
                            <div className="column">
                                <h5 style={{marginBottom: '2px', wordWrap: 'break-word'}}>
                                    <b>hash</b>: {this.state.block.hash}</h5>
                                <h5 style={{marginBottom: '2px'}}><b>block_height</b>: {this.state.block.block_height}
                                </h5>
                                <h5 style={{marginBottom: '2px'}}><b>timestamp_utc</b>: {this.state.block.timestamp_utc}
                                </h5>
                                <h5 style={{marginBottom: '2px'}}><b>size</b>: {formatBytes(this.state.block.size)}</h5>
                            </div>
                        </div>
                    </div>
                }
                {
                    this.state.loading ? <div>
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
                    </div> :
                        <div>
                            <BlockTransactionComponent
                                block={this.state.block}
                                showCoinbase={false}/>
                            <BlockTransactionComponent
                                block={this.state.block}
                                showCoinbase={true}/>
                        </div>
                }
            </div>
        )

    }
}
