import React, {Component} from "react";
import {
    buildColumnFromObject,
    formatBytes,
    makeDataWithExcludedPropertiesAndFilterBasedOnProperties
} from "utils/tableHelpers";
import {Link} from "react-router";
import {pageToBlock} from "api/api";
import ActivityIndicator from "react-activity-indicator";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class LatestBlocksComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latestBlocks: [],
            data: [],
            loading: true,
            currentPage: 0,
            totalPages: -1
        }
    }

    handlePageResults(data) {
        let nextState = this.state;
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

        const excludedFields = ["coinbase", "timestamp"]
        nextState.latestBlocks = data.data.data.blocks
        nextState.totalPages = data.data.data.total_page_no;
        nextState.columns = buildColumnFromObject(nextState.latestBlocks[0], excludedFields, customRender)
        nextState.data = makeDataWithExcludedPropertiesAndFilterBasedOnProperties(nextState.latestBlocks, excludedFields)
        nextState.loading = false;
        nextState.currentPage = data.data.data.page
        nextState.tableLoading = false
        this.setState(nextState)
    }

    componentWillMount() {
        pageToBlock()
            .then((data) => this.handlePageResults(data));
    }

    render() {
        return (
            <div className="column">
                { !this.state.loading ?
                    <div>
                        <h5 style={{marginBottom: '2px'}}><b>Latest Blocks ({this.state.data.length})</b></h5>
                        <ReactTable
                            className='-striped -highlight'
                            showPagination={true}
                            showPageSizeOptions={false}
                            pages={this.state.totalPages}
                            data={this.state.data}
                            columns={this.state.columns}
                            pageSize={this.state.data.length}
                            page={this.state.currentPage}
                            manual
                            loading={this.state.tableLoading}
                            onPageChange={(nextPage) => {
                                // show the loading overlay
                                this.setState({tableLoading: true})
                                // fetch your data
                                pageToBlock(nextPage)
                                    .then((data) => this.handlePageResults(data))
                            }
                            }
                        />
                    </div>
                    : <div style={{marginTop: '200px'}}>
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
                }
            </div>
        )
    }
}


