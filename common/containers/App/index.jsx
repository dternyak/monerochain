import React, {Component} from "react";
import {connect} from "react-redux";
import {Footer, Header} from "components";
import PropTypes from "prop-types";
import GApp from "grommet/components/App";

class App extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        children: PropTypes.node.isRequired
    }

    render() {
        let {
            children
        } = this.props;

        return (
            <div>
                <Header/>
                <GApp style={{marginBottom: '50px'}}>
                    <div style={{marginTop: '20px'}}>
                        {children}
                    </div>
                </GApp>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
