import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
    buildColumnFromObject,
    formatFee,
    makeDataWithExcludedPropertiesAndFilterBasedOnProperties,
    formatBytes,
    makeDataWithExcludedPropertiesAndIncludeBasedOnProperties
} from "utils/tableHelpers";

import {Link} from "react-router";

const coinbaseExcludes = ["coinbase", "xmr_inputs", 'payment_id', 'payment_id8', 'mixin', 'tx_fee']

export default class BlockTransactionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
            coinbaseData: [],
            columns: [],
            coinbaseColumns: []
        }
    }

    executeStateTransform(propsBlock) {
        if (!propsBlock) {
            propsBlock = this.props.block
        }

        if (propsBlock) {
            let nextState = this.state;

            const customTransactionColumn = {
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
                    minWidth: 575
                },
                mixin: {
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
                },
                tx_version: {
                    minWidth: 70
                },
                tx_size: {
                    render: (row) => {
                        return (
                            formatBytes(row.row.tx_size, 2)
                        )
                    },
                    minWidth: 80
                }
            }

            nextState.block = propsBlock
            nextState.columns = buildColumnFromObject(nextState.block.txs[0], ["coinbase", "payment_id8"], customTransactionColumn)
            nextState.data = makeDataWithExcludedPropertiesAndFilterBasedOnProperties(nextState.block.txs, ["coinbase", "payment_id8"], ['coinbase'])
            nextState.coinbaseColumns = buildColumnFromObject(nextState.block.txs[0], coinbaseExcludes, customTransactionColumn)
            nextState.coinbaseData = makeDataWithExcludedPropertiesAndIncludeBasedOnProperties(nextState.block.txs, coinbaseExcludes, ['coinbase'])
            nextState.coinbasePageSize = nextState.coinbaseData.length
            nextState.loading = false
            this.setState(nextState)
        }
    }


    componentDidMount() {
        this.executeStateTransform()
    }

    componentWillReceiveProps(nextProps) {
        this.executeStateTransform(nextProps.block)
    }

    render() {
        if (!this.props.showCoinbase) {
            return (
                <div style={{fontSize: '0.9em'}}>
                    <div className="column">
                        {
                            this.state.data.length > 0 ? <div>
                                <h5 style={{marginBottom: '2px '}}><b>Transactions ({this.state.data.length})</b></h5>
                                <ReactTable
                                    loading={this.state.loading}
                                    showPagination={false}
                                    data={this.state.data}
                                    columns={this.state.columns}
                                    pageSize={this.state.data.length}/>
                            </div> : <div>
                                <h5 style={{marginBottom: '2px '}}><b>Transactions</b></h5>
                                <ReactTable
                                    loading={this.state.loading}
                                    showPagination={false}
                                    defaultPageSize={3}
                                    data={this.state.data}
                                    noDataText='No Transactions in Block!'
                                    columns={this.state.columns}
                                    pageSize={3}/>
                            </div>
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{fontSize: '0.9em', marginTop: '20px'}}>
                    <div className="column">
                        <h5 style={{marginBottom: '2px '}}><b>Coinbase Transaction</b></h5>
                        <ReactTable
                            loading={this.state.loading}
                            data={this.state.coinbaseData}
                            columns={this.state.coinbaseColumns}
                            showPagination={false}
                            defaultPageSize={1}
                            pageSize={this.state.coinbaseData.length}
                        />
                    </div>
                </div>
            )
        }
    }
}

