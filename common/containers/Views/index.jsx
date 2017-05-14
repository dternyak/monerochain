import React, {Component} from "react";
import {connect} from "react-redux";
import MainComponent from "./Main/components";

class Views extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {}

    render() {
        return (
            <MainComponent />
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Views)
