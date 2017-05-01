import React, {Component} from "react";
import {
    buildColumnFromObject,
    formatBytes,
    makeCoinbaseData,
    makeDataWithExcludedPropertiesAndFilterBasedOnProperties,
    makeTransactionData,
    removeObjectProperties,
    removeObjectPropertiesFromListOfObjects
} from "utils/tableHelpers";
import {Link} from "react-router";


import ReactTable from "react-table";
import "react-table/react-table.css";

export default class LatestBlocksComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latestBlocks: [],
            data: []
        }
    }

    componentWillMount() {
        let nextState = this.state;
        const excludedFields = ["coinbase", "timestamp"]
        nextState.latestBlocks = this.props.latestBlocks;
        const customRender = {
            height: {
                render: (row) => {
                    return (
                        <div>
                            <Link to={`/block/${row.row.height}`}>
                                {row.row.height}
                            </Link>
                        </div>
                    )
                }
            },

            hash: {
                render: (row) => {
                    return (
                        <div>
                            <Link to={`/block/${row.row.hash}`}>
                                {row.row.hash}
                            </Link>
                        </div>
                    )
                },
                minWidth: 550
            },

            timestamp_utc: {
                minWidth: 160
            },

            txs: {
                render: (row) => {
                    return (
                        row.row.txs.length
                    )
                }


            },

            size: {
                render: (row) => {
                    return (
                        formatBytes(row.row.size, 2)
                    )
                }
            }
        }
        nextState.columns = buildColumnFromObject(nextState.latestBlocks[0], excludedFields, customRender)
        nextState.data = makeDataWithExcludedPropertiesAndFilterBasedOnProperties(nextState.latestBlocks, excludedFields)
        this.setState(nextState)
    }


    render() {
        return (
            <div className="column">
                {
                    <div>
                        <h5 style={{marginBottom: '2px'}}><b>Latest Blocks ({this.state.data.length})</b></h5>
                        <ReactTable
                            className='-striped -highlight'
                            showPagination={false}
                            data={this.state.data}
                            columns={this.state.columns}
                            pageSize={this.state.data.length}
                        />
                    </div>
                }
            </div>
        )
    }
}


