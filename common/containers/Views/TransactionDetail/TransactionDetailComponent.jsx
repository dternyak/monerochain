import React, {Component} from "react";
import "react-table/react-table.css";
import {buildColumnFromObject, makeDataWithExcludedPropertiesAndFilterBasedOnProperties} from "utils/tableHelpers";
import {TransactionInfo} from "./TransactionInfoComponent";
import {searchBlockchain} from "api/api";
import ReactTable from "react-table";
import ActivityIndicator from "react-activity-indicator";


export default class TransactionDetailComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
            otherColumns: [],
            otherData: [],
            outputsColumns: [],
            outputsData: [],
            inputsData: [],
            inputsColumns: [],
        }
    }

    componentDidMount() {
        let transactionHash = this.props.routeParams.hash
        searchBlockchain(transactionHash).then((data) => {
            let nextState = this.state;

            const customRender = {
                inputs: {
                    render: (row) => {
                        return (
                            <div>
                                {row.row.inputs ? row.row.inputs.length : '0'}
                            </div>
                        )
                    },
                    minWidth: 40
                },
                mixins: {
                    render: (row) => {
                        return (
                            <div>
                                {row.row.inputs ? row.row.inputs.length : '0'}
                            </div>
                        )
                    },
                    minWidth: 40
                },
                outputs: {
                    render: (row) => {
                        return (
                            <div>
                                {row.row.outputs.length}
                            </div>
                        )
                    }
                },
                coinbase: {
                    render: (row) => {
                        return (
                            <div>
                                {String(row.row.coinbase)}
                            </div>
                        )
                    }
                }
            }

            const otherCustomRender = {
                mixins: {
                    render: (row) => {
                        return (
                            <div>
                                {row.row.mixins ? row.row.mixins.length : '0'}
                            </div>
                        )
                    },
                    minWidth: 40
                }
            }

            nextState.data = data.data.data
            nextState.loading = false

            nextState.otherColumns = buildColumnFromObject(nextState.data, [], customRender)
            nextState.otherData = makeDataWithExcludedPropertiesAndFilterBasedOnProperties([nextState.data])

            nextState.outputsColumns = buildColumnFromObject(nextState.data.outputs[0], [], otherCustomRender)
            nextState.outputsData = makeDataWithExcludedPropertiesAndFilterBasedOnProperties(nextState.data.outputs)

            nextState.inputsColumns = nextState.data.inputs ? buildColumnFromObject(nextState.data.inputs[0], [], otherCustomRender) : []
            nextState.inputsData = nextState.data.inputs ? makeDataWithExcludedPropertiesAndFilterBasedOnProperties(nextState.data.inputs) : []

            this.setState(nextState)
        })
    }

    render() {
        return (
            <div style={{fontSize: '0.9em'}}>
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
                    </div> : <div>
                        {
                            <div className="column">
                                <div className="columns">
                                    <div className="column is-half">
                                        <TransactionInfo
                                            keysOfProperties={["confirmations"]}
                                            property={this.state.data}/>
                                        <TransactionInfo
                                            keysOfProperties={["block_height", "coinbase", "current_height", "extra", "mixin", "timestamp_utc", "payment_id", "payment_id8"]}
                                            property={this.state.data}/>
                                    </div>
                                    <div className="column is-half">
                                        <TransactionInfo
                                            keysOfProperties={["tx_hash", "tx_fee", "tx_size", "tx_version"]}
                                            property={this.state.data}/>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            this.state.inputsData.length > 0 && <div>
                                <div className="column">
                                    <h5 style={{marginBottom: '2px '}}><b>Inputs</b></h5>
                                    <ReactTable
                                        className='-striped -highlight'
                                        showPagination={false}
                                        data={this.state.inputsData}
                                        columns={this.state.inputsColumns}
                                        pageSize={this.state.inputsData.length}
                                    />
                                </div>
                            </div>
                        }
                        {
                            this.state.outputsData.length > 0 && <div>
                                <div className="column">
                                    <h5 style={{marginBottom: '2px '}}>
                                        <b>Outputs</b>
                                    </h5>
                                    <ReactTable
                                        className='-striped -highlight'
                                        showPagination={false}
                                        data={this.state.outputsData}
                                        columns={this.state.outputsColumns}
                                        pageSize={this.state.outputsData.length}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}
