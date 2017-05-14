import React, {Component} from "react";
import Paragraph from "grommet/components/Paragraph";
import Box from "grommet/components/Box";
import GFooter from "grommet/components/Footer";


export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container column">
                <hr className="is-desktop"/>
                <GFooter justify='between'>
                    <Box direction='row'
                         pad={{"between": "medium"}}>
                        <Paragraph margin='none'>
                            © 2017 MoneroChain
                        </Paragraph>
                        <a href="https://github.com/dternyak/monerochain.git" target="_blank">
                            <i className="fa fa-github" aria-hidden="true"></i> Source on GitHub
                        </a>
                    </Box>
                </GFooter>
            </div>
        )
    }
}
