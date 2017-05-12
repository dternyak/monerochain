import React, {Component} from "react";
import {
    buildColumnFromObject,
    formatBytes,
    formatFee,
    makeDataWithExcludedPropertiesAndFilterBasedOnProperties
} from "utils/tableHelpers";
import {Link} from "react-router";


import ReactTable from "react-table";
import "react-table/react-table.css";

export default class MemPoolComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mempool: [],
            totalMempool: 0,
            data: []
        }
    }

    componentWillMount() {
        let nextState = this.state;
        nextState.mempool = this.props.mempool.txs
        nextState.totalMempool = this.props.mempool.txs_no;
        // determine if we should set data to null
        if (nextState.mempool ? nextState.mempool.length === 0 : true) {
            nextState.columns = []
            nextState.data = []
        }
        else {
            const excludedFields = ["coinbase", "timestamp", "payment_id8",]
            const customRender = {
                tx_size: {
                    render: (row) => {
                        return (
                            formatBytes(row.row.tx_size, 2)
                        )
                    }
                },

                timestamp_utc: {
                    minWidth: 175
                },

                tx_hash: {
                    render: (row) => {
                        return (
                            <div>
                                <Link to={`/tx/${row.row.tx_hash}`}>
                                    {row.row.tx_hash}
                                </Link>
                            </div>
                        )
                    },
                    minWidth: 550
                },

                xmr_outputs: {
                    minWidth: 70
                },

                tx_version: {
                    minWidth: 70
                },

                xmr_inputs: {
                    minWidth: 70
                },

                mixin: {
                    minWidth: 70
                },

                payment_id8: {
                    minWidth: 50
                },

                rct_type: {
                    minWidth: 70
                },

                tx_fee: {
                    render: (row) => {
                        return (
                            formatFee(row.row.tx_fee)
                        )
                    },
                    minWidth: 80
                }
            }
            nextState.columns = buildColumnFromObject(nextState.mempool[0], excludedFields, customRender)
            nextState.data = makeDataWithExcludedPropertiesAndFilterBasedOnProperties(nextState.mempool, excludedFields)
        }
        this.setState(nextState)
    }


    render() {
        return (
            <div className="column">
                {
                    this.state.data.length > 0 ? <div>
                        { this.state.totalMemPool > 10 ?
                            <h5 style={{marginBottom: '2px '}}><b>MemPool (showing {this.state.data.length} of
                                total {this.state.totalMempool})</b></h5> :

                            <h5 style={{marginBottom: '2px '}}><b>MemPool ({this.state.data.length})</b></h5> }
                        <ReactTable
                            className='-striped -highlight'
                            showPagination={false}
                            // defaultPageSize={5}
                            data={this.state.data}
                            columns={this.state.columns}
                            pageSize={this.state.data.length}
                        />
                    </div> : <div><h5 style={{marginBottom: '2px '}}><b>MemPool ({this.state.data.length})</b></h5>

                        <ReactTable
                            className='-striped -highlight'
                            showPagination={false}
                            defaultPageSize={3}
                            data={this.state.data}
                            noDataText='Nothing in Mempool!'
                            columns={this.state.columns}
                            pageSize={3}
                        />
                    </div>
                }
            </div>
        )
    }
}


