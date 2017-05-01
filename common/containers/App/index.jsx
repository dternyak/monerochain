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
        children: PropTypes.node.isRequired,
        location: PropTypes.object,
        handleWindowResize: PropTypes.func,

        router: PropTypes.object,
        isMobile: PropTypes.bool,
    }


    componentWillMount() {
        let {handleWindowResize} = this.props
        window.addEventListener('resize', handleWindowResize)
    }


    render() {
        let {
            children,
            // APP

        } = this.props;



        return (
            <div>
                <Header/>

                <GApp>
                    <div style={{marginTop: '20px'}}>
                    { children}
                    </div>
                    <Footer/>
                </GApp>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {


}

export default connect(mapStateToProps, mapDispatchToProps)(App)
